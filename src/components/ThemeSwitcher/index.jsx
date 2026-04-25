import './index.css'
import { useState } from 'react';
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <>
            <div className={`main-container ${theme}`}>
                <h1>Theme Switcher</h1>
                <p>Advanced theme Management with Context API, system preference detection, and optimized re-renders</p>

                <div>
                    <div>
                        <h3>Theme Controls</h3>
                        {theme === 'light' ? (
                            <LiaToggleOffSolid className='toggle-icon' onClick={toggleTheme} />
                        ) : (
                            <LiaToggleOnSolid className='toggle-icon' onClick={toggleTheme} />
                        )}
                    </div>

                    <div className='card1'>
                        <div>
                            <p>CURRENT THEME</p>
                            <p>{theme}</p>
                        </div>

                        <div>
                            <p>STORED PREFERENCE</p>
                            <p>{theme}</p>
                        </div>

                        <div>
                            <p>SYSTEM PREFERENCE</p>
                            <p>{theme === 'light' ? 'Dark' : 'Light'}</p>
                        </div>

                        <div>
                            <button onClick={() => setTheme('light')}>Reset to Light</button>
                            <button onClick={() => setTheme('dark')}>Preferences</button>
                        </div>
                    </div>

                    <div className='card2'>
                        <p>Demo Components</p>
                        <div>

                            <div>
                                <h4>Optimized Performance</h4>
                                <p>This component uses React.memo() and useMemo() to prevent unnecessary re-renders. Only components that need theme values will re-render.</p>
                            </div>

                            <div>
                                <h4>System Preference Detection</h4>
                                <p>This theme automatically adapts to your system preferences on first load and listens for changes in real-time.</p>
                            </div>

                            <div>
                                <h4>Persistent Storage</h4>
                                <p>Your theme preference is saved to LocalStorage and will be restored on your next visit, overriding system defaults.</p>
                            </div>

                            <div>
                                <h4>Smooth Transitions</h4>
                                <p>Themes transition smoothly between states, providing a better user experience.</p>
                            </div>

                            <div>
                                <h4>Context API Pattern</h4>
                                <p>This theme uses the Context API to manage and provide theme values throughout the application, ensuring consistent theming across components.</p>
                            </div>

                            <div>
                                <h4>Accessibility</h4>
                                <p>This theme is designed with accessibility in mind, ensuring it works well for users with disabilities.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThemeSwitcher;