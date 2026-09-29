import { useTheme } from "../context/ThemeContext";

type HeaderProps = {
    title: string;
}

function Header({title}:HeaderProps){
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <header>{title}</header>
            <p>Current theme: {theme}</p>
            <p>
                <button onClick={toggleTheme}>
                    Switch to {theme === "light" ? "dark" : "light"}
                </button>
            </p>
        </div>
    );
}

export default Header;