/**
 * finterview Core Module
 * Search, filter, progress tracking, and UI utilities
 * Version: 1.0.0
 */

const FinterviewCore = (function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        PROGRESS_STORAGE_KEY: 'finterview_progress',
        HELP_STORAGE_KEY: 'finterview_hide_help',
        DEBOUNCE_DELAY: 300
    };
    
    // State
    let state = {
        currentQuestions: [],
        currentIndex: 0,
        currentFilters: {
            search: '',
            difficulty: 'all',
            type: 'all'
        },
        userProgress: {},
        answerRevealed: false
    };
    
    // DOM Elements (to be initialized)
    let elements = {};
    
    // Initialize module
    function init(config = {}) {
        console.log('FinterviewCore initializing...');
        
        // Merge config
        Object.assign(CONFIG, config);
        
        // Load progress
        loadProgress();
        
        // Initialize elements if selectors provided
        if (config.elementSelectors) {
            initElements(config.elementSelectors);
        }
        
        return {
            applyFilters,
            refreshQuestions,
            loadQuestion,
            markQuestionViewed,
            markQuestionAnswered,
            toggleBookmark,
            getQuestionProgress,
            updateProgressBar,
            handleKeyboardShortcuts,
            getState: () => ({ ...state }),
            getElements: () => ({ ...elements })
        };
    }
    
    // Initialize DOM elements
    function initElements(selectors) {
        elements = {};
        for (const [key, selector] of Object.entries(selectors)) {
            const el = document.querySelector(selector);
            if (el) elements[key] = el;
        }
    }
    
    // Progress tracking
    function loadProgress() {
        try {
            const saved = localStorage.getItem(CONFIG.PROGRESS_STORAGE_KEY);
            if (saved) {
                state.userProgress = JSON.parse(saved);
                console.log('Loaded user progress:', Object.keys(state.userProgress).length, 'items');
            }
        } catch (e) {
            console.error('Failed to load progress:', e);
            state.userProgress = {};
        }
    }
    
    function saveProgress() {
        try {
            localStorage.setItem(CONFIG.PROGRESS_STORAGE_KEY, JSON.stringify(state.userProgress));
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    }
    
    function getQuestionKey(question) {
        return `${question.role}_${question.id}`;
    }
    
    function markQuestionViewed(question) {
        const key = getQuestionKey(question);
        if (!state.userProgress[key]) {
            state.userProgress[key] = { viewed: true, viewedAt: new Date().toISOString() };
        } else {
            state.userProgress[key].viewed = true;
            state.userProgress[key].viewedAt = new Date().toISOString();
        }
        saveProgress();
        updateProgressBar();
    }
    
    function markQuestionAnswered(question, userAnswer = '') {
        const key = getQuestionKey(question);
        if (!state.userProgress[key]) {
            state.userProgress[key] = { answered: true, answeredAt: new Date().toISOString() };
        } else {
            state.userProgress[key].answered = true;
            state.userProgress[key].answeredAt = new Date().toISOString();
        }
        if (userAnswer) {
            state.userProgress[key].userAnswer = userAnswer.substring(0, 500);
        }
        saveProgress();
        updateProgressBar();
    }
    
    function toggleBookmark(question) {
        const key = getQuestionKey(question);
        if (!state.userProgress[key]) {
            state.userProgress[key] = { bookmarked: true, bookmarkedAt: new Date().toISOString() };
        } else {
            state.userProgress[key].bookmarked = !state.userProgress[key].bookmarked;
            state.userProgress[key].bookmarkedAt = state.userProgress[key].bookmarked ? new Date().toISOString() : null;
        }
        saveProgress();
        updateProgressBar();
        console.log(`Question ${question.id} bookmarked: ${state.userProgress[key].bookmarked}`);
    }
    
    function getQuestionProgress(question) {
        const key = getQuestionKey(question);
        return state.userProgress[key] || {};
    }
    
    // Filtering functions
    function applyFilters(allQuestions, filters, industryId) {
        let filtered = allQuestions.filter(q => q.role === industryId);
        
        // Apply search filter
        if (filters.search && filters.search.trim()) {
            const searchTerm = filters.search.toLowerCase().trim();
            filtered = filtered.filter(q => 
                (q.question && q.question.toLowerCase().includes(searchTerm)) ||
                (q.title && q.title.toLowerCase().includes(searchTerm)) ||
                (q.modelAnswer && q.modelAnswer.toLowerCase().includes(searchTerm))
            );
        }
        
        // Apply difficulty filter
        if (filters.difficulty !== 'all') {
            filtered = filtered.filter(q => q.difficulty === filters.difficulty);
        }
        
        // Apply type filter
        if (filters.type !== 'all') {
            filtered = filtered.filter(q => q.category === filters.type);
        }
        
        return filtered;
    }
    
    // Update questions based on current filters
    function refreshQuestions(allQuestions, industryId) {
        if (!Array.isArray(allQuestions)) return;
        
        // Apply filters
        const filtered = applyFilters(allQuestions, state.currentFilters, industryId);
        state.currentQuestions = filtered;
        
        // Reset index if out of bounds
        if (state.currentIndex >= state.currentQuestions.length) {
            state.currentIndex = Math.max(0, state.currentQuestions.length - 1);
        }
        
        return filtered;
    }
    
    // Load a specific question
    function loadQuestion(index) {
        if (index < 0 || index >= state.currentQuestions.length) {
            console.error('Invalid question index:', index);
            return null;
        }
        
        const question = state.currentQuestions[index];
        state.currentIndex = index;
        state.answerRevealed = false;
        
        // Mark as viewed
        markQuestionViewed(question);
        
        return question;
    }
    
    // Progress bar
    function updateProgressBar() {
        if (!elements.progressBar || !state.currentQuestions.length) return;
        
        const questions = state.currentQuestions;
        let viewed = 0;
        let answered = 0;
        let bookmarked = 0;
        
        questions.forEach(q => {
            const progress = getQuestionProgress(q);
            if (progress.viewed) viewed++;
            if (progress.answered) answered++;
            if (progress.bookmarked) bookmarked++;
        });
        
        const total = questions.length;
        const answeredPercent = total > 0 ? Math.round((answered / total) * 100) : 0;
        
        // Update progress bar
        if (elements.progressBar) {
            elements.progressBar.style.width = `${answeredPercent}%`;
        }
        
        // Update text elements
        if (elements.progressTextSmall) {
            elements.progressTextSmall.textContent = `${answered}/${total}`;
        }
        
        if (elements.viewedCount) {
            elements.viewedCount.textContent = `${viewed} viewed`;
        }
        
        if (elements.answeredCount) {
            elements.answeredCount.textContent = `${answered} answered`;
        }
        
        if (elements.bookmarkedCount) {
            elements.bookmarkedCount.textContent = `${bookmarked} bookmarked`;
        }
    }
    
    // Keyboard shortcuts
    function handleKeyboardShortcuts(e, callbacks = {}) {
        // Don't trigger if typing in input/textarea
        if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
            return;
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                if (callbacks.onPrev && state.currentIndex > 0) {
                    callbacks.onPrev();
                    e.preventDefault();
                }
                break;
            case 'ArrowRight':
                if (callbacks.onNext && state.currentIndex < state.currentQuestions.length - 1) {
                    callbacks.onNext();
                    e.preventDefault();
                }
                break;
            case ' ':
                if (callbacks.onToggleAnswer) {
                    callbacks.onToggleAnswer();
                    e.preventDefault();
                }
                break;
            case '1':
                if (callbacks.onConciseAnswer) {
                    callbacks.onConciseAnswer();
                }
                break;
            case '2':
                if (callbacks.onDetailedAnswer) {
                    callbacks.onDetailedAnswer();
                }
                break;
        }
    }
    
    // Filter summary
    function updateFilterSummary(originalCount, filteredCount, filters, elements) {
        if (!elements.filterSummary) return;
        
        const { filterSummary, totalCount, filteredCountEl, activeFilters } = elements;
        
        if (originalCount === filteredCount && 
            filters.search === '' && 
            filters.difficulty === 'all' && 
            filters.type === 'all') {
            filterSummary.classList.add('hidden');
            return;
        }
        
        filterSummary.classList.remove('hidden');
        if (totalCount) totalCount.textContent = originalCount;
        if (filteredCountEl) filteredCountEl.textContent = filteredCount;
        
        // Show active filters
        const activeFiltersList = [];
        if (filters.search) activeFiltersList.push(`Search: "${filters.search}"`);
        if (filters.difficulty !== 'all') activeFiltersList.push(`Difficulty: ${filters.difficulty}`);
        if (filters.type !== 'all') activeFiltersList.push(`Type: ${filters.type}`);
        
        if (activeFilters) {
            if (activeFiltersList.length > 0) {
                activeFilters.textContent = `(${activeFiltersList.join(', ')})`;
            } else {
                activeFilters.textContent = '';
            }
        }
    }
    
    // Public API
    return {
        init,
        applyFilters,
        refreshQuestions,
        loadQuestion,
        markQuestionViewed,
        markQuestionAnswered,
        toggleBookmark,
        getQuestionProgress,
        updateProgressBar,
        handleKeyboardShortcuts,
        updateFilterSummary,
        CONFIG
    };
})();

// Export for use in browser
if (typeof window !== 'undefined') {
    window.FinterviewCore = FinterviewCore;
}