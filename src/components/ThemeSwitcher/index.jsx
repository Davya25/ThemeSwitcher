import { memo } from "react";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import { useThemeActions, useThemeState } from "../../Context/useTheme";
import "./index.css";

const labelFor = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const ThemeControls = memo(() => {
    const { theme, preference, isSystemPreference } = useThemeState();
    const { setThemePreference, toggleTheme, resetToSystem } = useThemeActions();
    const isDark = theme === "dark";

    return (
        <section className="theme-panel" aria-labelledby="theme-controls-title">
            <div className="theme-panel__header">
                <div>
                    <p className="eyebrow">Theme Controls</p>
                    <h2 id="theme-controls-title">Choose how this app looks</h2>
                </div>

                <button
                    className="theme-toggle"
                    type="button"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                    aria-pressed={isDark}
                    title={`Switch to ${isDark ? "light" : "dark"} theme`}
                >
                    {isDark ? (
                        <LiaToggleOnSolid aria-hidden="true" focusable="false" />
                    ) : (
                        <LiaToggleOffSolid aria-hidden="true" focusable="false" />
                    )}
                    <span>{labelFor(theme)}</span>
                </button>
            </div>

            <div className="preference-group" role="group" aria-label="Theme preference">
                <button
                    className={preference === "light" ? "preference-button active" : "preference-button"}
                    type="button"
                    onClick={() => setThemePreference("light")}
                    aria-pressed={preference === "light"}
                >
                    Light
                </button>
                <button
                    className={preference === "dark" ? "preference-button active" : "preference-button"}
                    type="button"
                    onClick={() => setThemePreference("dark")}
                    aria-pressed={preference === "dark"}
                >
                    Dark
                </button>
                <button
                    className={isSystemPreference ? "preference-button active" : "preference-button"}
                    type="button"
                    onClick={resetToSystem}
                    aria-pressed={isSystemPreference}
                >
                    System
                </button>
            </div>
        </section>
    );
});

ThemeControls.displayName = "ThemeControls";

const ThemeStatus = memo(() => {
    const { theme, preference, systemTheme } = useThemeState();
    const storedPreference = preference === "system" ? "None" : labelFor(preference);

    return (
        <section className="status-grid" aria-label="Current theme details">
            <article>
                <p>Current Theme</p>
                <strong>{labelFor(theme)}</strong>
            </article>
            <article>
                <p>Stored Preference</p>
                <strong>{storedPreference}</strong>
            </article>
            <article>
                <p>System Preference</p>
                <strong>{labelFor(systemTheme)}</strong>
            </article>
        </section>
    );
});

ThemeStatus.displayName = "ThemeStatus";

const featureCards = [
    {
        title: "Optimized Performance",
        text: "Context values are memoized, actions are stable, and display sections are memoized so only theme-aware UI updates on changes.",
    },
    {
        title: "System Preference Detection",
        text: "First-time visitors inherit their OS preference and the app follows runtime system changes until a manual preference is selected.",
    },
    {
        title: "Persistent Storage",
        text: "Manual choices are saved in localStorage and restored on reload. Resetting to System removes that override.",
    },
    {
        title: "Smooth Transitions",
        text: "Global CSS variables update the interface with motion that respects reduced-motion preferences.",
    },
    {
        title: "Context API Pattern",
        text: "Theme state and theme actions are separated into focused contexts for predictable, low-noise updates.",
    },
    {
        title: "Accessibility",
        text: "Controls are semantic buttons with keyboard support, pressed states, labels, and visible focus styles.",
    },
];

const DemoComponents = memo(() => (
    <section className="demo-section" aria-labelledby="demo-components-title">
        <p className="eyebrow">Demo Components</p>
        <h2 id="demo-components-title">Production-ready theme behavior</h2>

        <div className="feature-grid">
            {featureCards.map(({ title, text }) => (
                <article className="feature-card" key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </article>
            ))}
        </div>
    </section>
));

DemoComponents.displayName = "DemoComponents";

const ThemeSwitcher = () => {
    return (
        <main className="main-container">
            <section className="hero" aria-labelledby="page-title">
                <p className="eyebrow">React Context API</p>
                <h1 id="page-title">Theme Switcher</h1>
                <p>
                    Global light and dark theming with persistence, system preference support,
                    accessible controls, and render-conscious React patterns.
                </p>
            </section>

            <div className="theme-layout">
                <ThemeControls />
                <ThemeStatus />
                <DemoComponents />
            </div>
        </main>
    );
};

export default ThemeSwitcher;
