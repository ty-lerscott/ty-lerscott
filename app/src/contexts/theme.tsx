"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { getCookie, setCookie } from "cookies-next";

type ThemeContextType = {
	isDarkTheme: boolean;
	toggleTheme(): void;
};

export const ThemeContext = createContext<ThemeContextType>({
	isDarkTheme: false,
	toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	useEffect(() => {
		const themeCookie = getCookie("theme");
		const _isDarkTheme = themeCookie === "dark";
		const html = document.querySelector("html");

		setIsDarkTheme(_isDarkTheme);
		html?.classList.toggle("dark", _isDarkTheme);
	});

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
		setCookie("theme", isDarkTheme ? "light" : "dark");

		document.querySelector("html")?.classList.toggle("dark", isDarkTheme);
	};

	return (
		<ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
