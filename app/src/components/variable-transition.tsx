"use client";

import chroma from "chroma-js";
import { useState, useEffect, useRef } from "react";

import { getColorMap, PRIMARY_INDEX, colors } from "@/colors";

const DURATION = 15 * 1000;

const colorNamesArr = Object.keys(colors);

// Helper to get a random index that isn't the same as 'except'
const getRandomIndexExcept = (length: number, except: number) => {
	const randomIndex = Math.floor(Math.random() * (length - 1));
	return randomIndex >= except ? randomIndex + 1 : randomIndex;
};

const VariableTransition = ({
	pause,
	isDark,
}: { pause?: boolean; isDark?: boolean }) => {
	const startTime = useRef<number | null>(null);
	const animationFrame = useRef<number | null>(null);
	const [activeColorIndex, setActiveColorIndex] = useState(PRIMARY_INDEX);
	const [nextColorIndex, setNextColorIndex] = useState(() =>
		getRandomIndexExcept(colorNamesArr.length, PRIMARY_INDEX),
	);

	useEffect(() => {
		if (pause) return;

		let oldColors = getColorMap(activeColorIndex, isDark);
		let newColors = getColorMap(nextColorIndex, isDark);

		const animate = (timestamp: number) => {
			if (!startTime.current) {
				startTime.current = timestamp;
			}
			const ratio = Math.min((timestamp - startTime.current) / DURATION, 1);

			// Collect CSS variable updates
			const cssText = Object.keys(oldColors)
				.map((varKey) => {
					const oldValue = oldColors[varKey];
					const newValue = newColors[varKey];

					if (chroma.valid(oldValue) && chroma.valid(newValue)) {
						const interpolated = chroma.mix(oldValue, newValue, ratio).hex();
						return `--${varKey}: ${interpolated};`;
					}
					return `--${varKey}: ${oldValue};`;
				})
				.join(" ");

			document.documentElement.style.cssText = cssText;

			if (ratio < 1) {
				animationFrame.current = requestAnimationFrame(animate);
			} else {
				// Animation complete
				startTime.current = null;

				// Prepare for next cycle
				setActiveColorIndex(nextColorIndex);
				setNextColorIndex(
					getRandomIndexExcept(colorNamesArr.length, nextColorIndex),
				);

				// Update cached colors
				oldColors = newColors;
				newColors = getColorMap(nextColorIndex, isDark);
			}
		};

		animationFrame.current = requestAnimationFrame(animate);

		return () => {
			if (animationFrame.current) {
				cancelAnimationFrame(animationFrame.current);
			}
		};
	}, [activeColorIndex, nextColorIndex, pause, isDark]);

	return null;
};

export default VariableTransition;
