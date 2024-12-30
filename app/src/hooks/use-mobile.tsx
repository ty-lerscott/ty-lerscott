"use client";

import { useEffect, useState } from "react";

import SCREENS from "~/app/tailwind.screens.config";

const MOBILE_BREAKPOINT = Number(SCREENS.lg.replace("px", ""));

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		mql.addEventListener("change", onChange);

		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

		return () => mql.removeEventListener("change", onChange);
	}, []);

	return Boolean(isMobile);
}
