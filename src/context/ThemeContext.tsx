import { createContext, type ReactNode, useContext, useState } from "react";


type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProviderProps = {
    children: ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme((previousTheme) => previousTheme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if(!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}

export default ThemeProvider;