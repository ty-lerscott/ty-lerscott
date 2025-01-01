"use client";

import chroma from "chroma-js";
import { useState, useEffect, useRef } from "react";

import { getColorMap, PRIMARY_INDEX, colorsArr } from "@/colors";

const DURATION = 10000;

// Function to set color on :root
const setRootVar = (varName: string, hexValue: string) => {
	document.documentElement.style.setProperty(`--${varName}`, hexValue);
};

// Helper to get a random index that isn't the same as 'except'
const getRandomIndexExcept = (length: number, except: number) => {
	let randomIndex = except;
	while (randomIndex === except) {
		randomIndex = Math.floor(Math.random() * length);
	}
	return randomIndex;
};

const VariableTransition = () => {
	const startTime = useRef<number | null>(null);
	const animationFrame = useRef<number | null>(null);
	const [activeColorIndex, setActiveColorIndex] = useState(PRIMARY_INDEX);
	const [nextColorIndex, setNextColorIndex] = useState(() =>
		getRandomIndexExcept(colorsArr.length, PRIMARY_INDEX),
	);

	useEffect(() => {
		const animate = (timestamp: number) => {
			if (!startTime.current) {
				startTime.current = timestamp;
			}
			const elapsed = timestamp - startTime.current;
			const ratio = Math.min(elapsed / DURATION, 1);

			// Get old & new color maps
			const oldColors = getColorMap(activeColorIndex);
			const newColors = getColorMap(nextColorIndex);

			// Interpolate each variable
			for (const varKey of Object.keys(oldColors)) {
				const oldValue = oldColors[varKey];
				const newValue = newColors[varKey];

				if (chroma.valid(oldValue) && chroma.valid(newValue)) {
					const interpolated = chroma.mix(oldValue, newValue, ratio).hex();
					setRootVar(varKey, interpolated);
				} else {
					setRootVar(varKey, oldValue);
				}
			}

			if (ratio < 1) {
				// Still animating, schedule next frame
				animationFrame.current = requestAnimationFrame(animate);
			} else {
				// Animation complete: prepare for next cycle
				startTime.current = null;

				// The color we just animated to becomes the new "from" color
				setActiveColorIndex(nextColorIndex);

				// Choose a new random color as the next "to" color
				const newRandom = getRandomIndexExcept(
					colorsArr.length,
					nextColorIndex,
				);
				setNextColorIndex(newRandom);
			}
		};

		// Kick off the animation
		animationFrame.current = requestAnimationFrame(animate);

		// Cleanup on unmount
		return () => {
			if (animationFrame.current) {
				cancelAnimationFrame(animationFrame.current);
			}
		};
	}, [activeColorIndex, nextColorIndex]);

	return null;
};

export default VariableTransition;
