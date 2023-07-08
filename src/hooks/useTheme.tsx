import { useState, useEffect } from "react";

type useThemeReturnTypes = {
	theme: string;
	toggleTheme: () => void;
};

const useTheme = (): useThemeReturnTypes => {
	const prevTheme = localStorage.getItem("theme");
	const [theme, setTheme] = useState(() => {
		if (prevTheme) {
			return prevTheme;
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "dark";
	});

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.add("dark");
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "dark"));
	};
	return {
		theme,
		toggleTheme,
	};
};

export default useTheme;
