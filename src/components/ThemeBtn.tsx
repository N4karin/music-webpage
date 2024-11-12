"use client";

import { Button } from "@headlessui/react";
import { useTheme } from "./ThemeContext";
import { useEffect, useState } from "react";

export default function ThemeBtn() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // State for tooltip visibility
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }


    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        setDarkMode((prev) => !prev);
        document.body.classList.toggle('dark', !darkMode);
    };

    return (
        <div className="relative flex p-2  bg-gradient-to-tr from-[#A7C6ED] to-[#B9E4C9] dark:bg-gradient-to-tr dark:from-[#2b1a3c] dark:to-[#1b3a4f] rounded-lg z-10">
            <h1 className="text-xl"></h1>
            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Button
                    onClick={toggleTheme}
                    className="dark:bg-[#315f7e] bg-[#B9E4C9] px-4 rounded-lg font-semibold text-lg"
                >
                    {theme === 'light' ? 'ひる' : 'よる'}
                </Button>
                {isHovered && (
                    <div className="absolute top-full left-1/2 transform mt-3 -translate-x-1/2 mb-2 bg-gray-700 text-white text-sm rounded py-1 px-2">
                        {theme === 'light' ? 'Day' : 'Night'}
                    </div>
                )}
            </div>
        </div>
    );
}
