"use client";

import { useTheme } from "@/contexts/theme";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const iconStyles =
	"fill-transparent group-hover:fill-[--foreground] transition-all duration-300";

const ThemeToggle = () => {
	const { toggleTheme, isDarkTheme } = useTheme();

	return (
		<div className="absolute bottom-0 right-0 m-2">
			<Button variant="ghost" className="group" onClick={toggleTheme}>
				{isDarkTheme ? (
					<Sun className={iconStyles} />
				) : (
					<Moon className={iconStyles} />
				)}
			</Button>
		</div>
	);
};

export default ThemeToggle;
