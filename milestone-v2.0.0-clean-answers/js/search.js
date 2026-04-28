/**
 * finterview Search Functionality
 * Real-time search across all questions with filtering
 * Version: 1.0.0
 */

(function() {
    'use strict';
    
    // DOM elements
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchClose = document.getElementById('search-close');
    const searchFilters = document.getElementById('search-filters');
    
    // State
    let isSearchOpen = false;
    let allQuestions = [];
    let currentFilters = {
        industries: [],
        difficulties: [],
        categories: []
    };
    
    // Initialize search
    function initSearch() {
        // Load questions if available
        if (window.questionBank && Array.isArray(window.questionBank)) {
            allQuestions = window.questionBank;
            console.log(`Search loaded ${allQuestions.length} questions`);
        } else {
            console.warn('Question bank not available for search');
            // Try to load questions.js
            loadQuestions();
        }
        
        // Set up event listeners
        if (searchToggle) {
            searchToggle.addEventListener('click', openSearch);
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', closeSearch);
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', handleSearchInput);
            searchInput.addEventListener('keydown', handleSearchKeydown);
        }
        
        // Close search on overlay click
        if (searchOverlay) {
            searchOverlay.addEventListener('click', closeSearch);
        }
        
        // Close search on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isSearchOpen) {
                closeSearch();
            }
        });
        
        // Initialize filters
        initFilters();
    }
    
    // Load questions from questions.js if not already loaded
    function loadQuestions() {
        // This function would need to load questions.js dynamically
        // For now, we rely on window.questionBank being available
        console.log('Search functionality requires questions.js to be loaded');
    }
    
    // Initialize filter controls
    function initFilters() {
        if (!searchFilters) return;
        
        // Industry filter
        const industryFilter = document.createElement('div');
        industryFilter.className = 'search-filter-group';
        industryFilter.innerHTML = `
            <div class="search-filter-title">Industry</div>
            <div class="search-filter-options" id="industry-filters">
                ${generateIndustryFilterOptions()}
            </div>
        `;
        searchFilters.appendChild(industryFilter);
        
        // Difficulty filter
        const difficultyFilter = document.createElement('div');
        difficultyFilter.className = 'search-filter-group';
        difficultyFilter.innerHTML = `
            <div class="search-filter-title">Difficulty</div>
            <div class="search-filter-options" id="difficulty-filters">
                ${generateDifficultyFilterOptions()}
            </div>
        `;
        searchFilters.appendChild(difficultyFilter);
        
        // Set up filter change events
        setTimeout(() => {
            document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', handleFilterChange);
            });
        }, 0);
    }
    
    // Generate industry filter options
    function generateIndustryFilterOptions() {
        const industries = [
            { id: 'ib', name: 'Investment Banking' },
            { id: 'am', name: 'Asset Management' },
            { id: 'quant', name: 'Quantitative Finance' },
            { id: 'markets', name: 'Sales & Trading' },
            { id: 'risk', name: 'Risk Management' },
            { id: 'corpfin', name: 'Corporate Finance' },
            { id: 'fintech', name: 'FinTech' },
            { id: 'fo', name: 'Family Office' },
            { id: 'general', name: 'General Finance' }
        ];
        
        return industries.map(industry => `
            <label class="filter-option">
                <input type="checkbox" class="filter-checkbox" data-type="industry" value="${industry.id}">
                <span class="filter-label">${industry.name}</span>
            </label>
        `).join('');
    }
    
    // Generate difficulty filter options
    function generateDifficultyFilterOptions() {
        const difficulties = ['easy', 'medium', 'hard'];
        
        return difficulties.map(difficulty => `
            <label class="filter-option">
                <input type="checkbox" class="filter-checkbox" data-type="difficulty" value="${difficulty}">
                <span class="filter-label">${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
            </label>
        `).join('');
    }
    
    // Handle filter changes
    function handleFilterChange(e) {
        const checkbox = e.target;
        const type = checkbox.dataset.type;
        const value = checkbox.value;
        const isChecked = checkbox.checked;
        
        // Update filters
        if (isChecked) {
            if (!currentFilters[type + 's'].includes(value)) {
                currentFilters[type + 's'].push(value);
            }
        } else {
            const index = currentFilters[type + 's'].indexOf(value);
            if (index > -1) {
                currentFilters[type + 's'].splice(index, 1);
            }
        }
        
        // Update search results
        performSearch();
    }
    
    // Open search overlay
    function openSearch() {
        if (isSearchOpen) return;
        
        isSearchOpen = true;
        if (searchOverlay) {
            searchOverlay.classList.add('active');
        }
        
        // Focus search input
        setTimeout(() => {
            if (searchInput) {
                searchInput.focus();
            }
        }, 100);
        
        // Perform initial search if there's input
        if (searchInput && searchInput.value.trim()) {
            performSearch();
        }
    }
    
    // Close search overlay
    function closeSearch() {
        if (!isSearchOpen) return;
        
        isSearchOpen = false;
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
        }
        
        // Clear search input
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Clear results
        if (searchResults) {
            searchResults.innerHTML = '';
        }
    }
    
    // Handle search input
    function handleSearchInput(e) {
        const query = e.target.value.trim();
        
        if (query.length === 0) {
            clearResults();
            return;
        }
        
        if (query.length < 2) {
            showMessage('Type at least 2 characters to search');
            return;
        }
        
        // Debounce search
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            performSearch();
        }, 300);
    }
    
    // Handle search keydown events
    function handleSearchKeydown(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    }
    
    // Perform search
    function performSearch() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        
        if (query.length < 2) {
            showMessage('Type at least 2 characters to search');
            return;
        }
        
        if (allQuestions.length === 0) {
            showMessage('Question data not loaded');
            return;
        }
        
        // Filter questions
        const filtered = allQuestions.filter(question => {
            // Text search
            const matchesText = 
                (question.title && question.title.toLowerCase().includes(query)) ||
                (question.question && question.question.toLowerCase().includes(query)) ||
                (question.modelAnswer && question.modelAnswer.toLowerCase().includes(query));
            
            if (!matchesText) return false;
            
            // Industry filter
            if (currentFilters.industries.length > 0) {
                if (!currentFilters.industries.includes(question.role)) {
                    return false;
                }
            }
            
            // Difficulty filter
            if (currentFilters.difficulties.length > 0) {
                if (!currentFilters.difficulties.includes(question.difficulty)) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Display results
        displayResults(filtered, query);
    }
    
    // Display search results
    function displayResults(results, query) {
        if (!searchResults) return;
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-empty">
                    <i class="fas fa-search"></i>
                    <h3>No results found for "${query}"</h3>
                    <p>Try different keywords or check your filters</p>
                </div>
            `;
            return;
        }
        
        // Sort by relevance (simple implementation)
        const sorted = results.sort((a, b) => {
            // Prioritize title matches over question matches
            const aTitleMatch = a.title.toLowerCase().includes(query);
            const bTitleMatch = b.title.toLowerCase().includes(query);
            
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
            
            // Then by difficulty (easy first)
            const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
        
        // Limit to 50 results
        const limited = sorted.slice(0, 50);
        
        // Generate results HTML
        const resultsHtml = limited.map(question => {
            const industryName = getIndustryName(question.role);
            const industryColor = getIndustryColor(question.role);
            
            // Highlight matching text
            const highlightedTitle = highlightText(question.title, query);
            const highlightedQuestion = highlightText(question.question, query);
            
            return `
                <div class="search-result" data-id="${question.id}">
                    <div class="search-result-header">
                        <span class="search-result-industry" style="background-color: ${industryColor}">
                            ${industryName}
                        </span>
                        <span class="search-result-difficulty ${question.difficulty}">
                            ${question.difficulty}
                        </span>
                    </div>
                    <h4 class="search-result-title">${highlightedTitle}</h4>
                    <p class="search-result-question">${highlightedQuestion}</p>
                    <div class="search-result-actions">
                        <button class="btn btn-sm btn-outline view-question-btn" data-id="${question.id}">
                            <i class="fas fa-eye"></i> View Question
                        </button>
                        <button class="btn btn-sm btn-outline practice-btn" data-id="${question.id}">
                            <i class="fas fa-play-circle"></i> Practice
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        searchResults.innerHTML = `
            <div class="search-results-header">
                <h3>${results.length} results for "${query}"</h3>
                <p class="text-secondary">Showing ${limited.length} of ${results.length}</p>
            </div>
            <div class="search-results-list">
                ${resultsHtml}
            </div>
        `;
        
        // Add event listeners to result buttons
        setTimeout(() => {
            document.querySelectorAll('.view-question-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.closest('.view-question-btn').dataset.id;
                    viewQuestion(id);
                });
            });
            
            document.querySelectorAll('.practice-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.closest('.practice-btn').dataset.id;
                    practiceQuestion(id);
                });
            });
        }, 0);
    }
    
    // Highlight matching text
    function highlightText(text, query) {
        if (!text || !query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    // Get industry name
    function getIndustryName(role) {
        const industries = {
            ib: 'Investment Banking',
            am: 'Asset Management',
            quant: 'Quantitative Finance',
            markets: 'Sales & Trading',
            risk: 'Risk Management',
            corpfin: 'Corporate Finance',
            fintech: 'FinTech',
            fo: 'Family Office',
            general: 'General Finance'
        };
        
        return industries[role] || role;
    }
    
    // Get industry color
    function getIndustryColor(role) {
        const colors = {
            ib: 'var(--industry-ib)',
            am: 'var(--industry-am)',
            quant: 'var(--industry-quant)',
            markets: 'var(--industry-markets)',
            risk: 'var(--industry-risk)',
            corpfin: 'var(--industry-corpfin)',
            fintech: 'var(--industry-fintech)',
            fo: 'var(--industry-fo)',
            general: 'var(--text-secondary)'
        };
        
        return colors[role] || 'var(--text-secondary)';
    }
    
    // View question
    function viewQuestion(id) {
        // Find question
        const question = allQuestions.find(q => q.id == id);
        if (!question) return;
        
        // Navigate to practice mode with this question
        const url = `industry-practice.html?industry=${question.role}&question=${id}`;
        window.location.href = url;
    }
    
    // Practice question
    function practiceQuestion(id) {
        // Same as view for now
        viewQuestion(id);
    }
    
    // Clear results
    function clearResults() {
        if (searchResults) {
            searchResults.innerHTML = '';
        }
    }
    
    // Show message
    function showMessage(message) {
        if (!searchResults) return;
        
        searchResults.innerHTML = `
            <div class="search-message">
                <i class="fas fa-info-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
    
    // Make functions available globally
    window.finterviewSearch = {
        open: openSearch,
        close: closeSearch,
        search: performSearch,
        init: initSearch
    };
    
})();