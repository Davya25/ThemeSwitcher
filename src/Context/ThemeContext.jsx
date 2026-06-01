import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { ThemeActionsContext, ThemeStateContext } from "./theme-context-values";

const STORAGE_KEY = "theme-preference";
const THEMES = ["light", "dark"];
const PREFERENCES = [...THEMES, "system"];

const canUseDOM = () => typeof window !== "undefined" && typeof document !== "undefined";

const getSystemTheme = () => {
    if (!canUseDOM() || typeof window.matchMedia !== "function") {
        return "light";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getStoredPreference = () => {
    if (!canUseDOM()) {
        return "system";
    }

    try {
        const storedPreference = window.localStorage.getItem(STORAGE_KEY);
        return PREFERENCES.includes(storedPreference) ? storedPreference : "system";
    } catch {
        return "system";
    }
};

const persistPreference = (nextPreference) => {
    if (!canUseDOM()) {
        return;
    }

    try {
        if (nextPreference === "system") {
            window.localStorage.removeItem(STORAGE_KEY);
        } else {
            window.localStorage.setItem(STORAGE_KEY, nextPreference);
        }
    } catch {
        // Storage can be unavailable in private browsing or restricted environments.
    }
};

const applyTheme = (theme) => {
    if (!canUseDOM()) {
        return;
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
};

export const ThemeProvider = ({ children }) => {
    const [preference, setPreference] = useState(getStoredPreference);
    const [systemTheme, setSystemTheme] = useState(getSystemTheme);

    const resolvedTheme = preference === "system" ? systemTheme : preference;

    useEffect(() => {
        applyTheme(resolvedTheme);
    }, [resolvedTheme]);

    useEffect(() => {
        if (!canUseDOM() || typeof window.matchMedia !== "function") {
            return undefined;
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (event) => {
            setSystemTheme(event.matches ? "dark" : "light");
        };

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }

        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    const setThemePreference = useCallback((nextPreference) => {
        if (!PREFERENCES.includes(nextPreference)) {
            return;
        }

        persistPreference(nextPreference);
        setPreference(nextPreference);
    }, []);

    const toggleTheme = useCallback(() => {
        setPreference((currentPreference) => {
            const currentResolvedTheme = currentPreference === "system" ? getSystemTheme() : currentPreference;
            const nextPreference = currentResolvedTheme === "dark" ? "light" : "dark";
            persistPreference(nextPreference);
            return nextPreference;
        });
    }, []);

    const resetToSystem = useCallback(() => {
        persistPreference("system");
        setPreference("system");
        setSystemTheme(getSystemTheme());
    }, []);

    const stateValue = useMemo(() => ({
        theme: resolvedTheme,
        preference,
        systemTheme,
        isSystemPreference: preference === "system",
    }), [preference, resolvedTheme, systemTheme]);

    const actionsValue = useMemo(() => ({
        setThemePreference,
        toggleTheme,
        resetToSystem,
    }), [resetToSystem, setThemePreference, toggleTheme]);

    return (
        <ThemeStateContext.Provider value={stateValue}>
            <ThemeActionsContext.Provider value={actionsValue}>
                {children}
            </ThemeActionsContext.Provider>
        </ThemeStateContext.Provider>
    );
};
