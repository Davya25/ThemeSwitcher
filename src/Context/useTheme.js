import { useContext } from "react";
import { ThemeActionsContext, ThemeStateContext } from "./theme-context-values";

export const useThemeState = () => {
    const context = useContext(ThemeStateContext);

    if (!context) {
        throw new Error("useThemeState must be used within a ThemeProvider");
    }

    return context;
};

export const useThemeActions = () => {
    const context = useContext(ThemeActionsContext);

    if (!context) {
        throw new Error("useThemeActions must be used within a ThemeProvider");
    }

    return context;
};

export const useTheme = () => ({
    ...useThemeState(),
    ...useThemeActions(),
});
