/**
 * finterview Theme Toggle
 * Dark/light mode switching with system preference detection
 * Version: 1.0.0
 */

(function() {
    'use strict';
    
    // DOM elements
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Theme constants
    const THEMES = {
        LIGHT: 'light',
        DARK: 'dark'
    };
    
    // Initialize theme
    function initTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Determine initial theme
        let theme;
        if (savedTheme) {
            theme = savedTheme;
        } else if (systemPrefersDark) {
            theme = THEMES.DARK;
        } else {
            theme = THEMES.LIGHT;
        }
        
        // Apply theme
        applyTheme(theme);
        
        // Update toggle state
        updateToggleState(theme);
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                // Only auto-switch if user hasn't set a preference
                const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
                applyTheme(newTheme);
                updateToggleState(newTheme);
            }
        });
    }
    
    // Apply theme to document
    function applyTheme(theme) {
        if (theme === THEMES.DARK) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
    
    // Update toggle button state
    function updateToggleState(theme) {
        if (!themeToggle || !themeIcon) return;
        
        if (theme === THEMES.DARK) {
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to light mode';
        } else {
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to dark mode';
        }
    }
    
    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? THEMES.LIGHT : THEMES.DARK;
        
        // Apply new theme
        applyTheme(newTheme);
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Update toggle
        updateToggleState(newTheme);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
    
    // Make functions available globally if needed
    window.finterviewTheme = {
        toggle: toggleTheme,
        init: initTheme,
        applyTheme: applyTheme
    };
    
})();