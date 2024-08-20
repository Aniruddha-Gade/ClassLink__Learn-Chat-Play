import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from 'next/image'



export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex-center">
            {theme === "light" ? (
                <Image
                    src="/assets/icons/moon-icon.png"
                    onClick={() => setTheme("dark")}
                    className="cursor-pointer"
                    width={30}
                    height={30}
                    alt="Dark theme icon"
                />
            ) : (
                <Image
                    src="/assets/icons/sun-icon.png"
                    onClick={() => setTheme("light")}
                    width={38}
                    height={38}
                    className="cursor-pointer w-9 h-9 800px:w-10 800px:h-10 object-contain"
                    alt="Light theme icon"
                />
            )}
        </div>
    );
};
