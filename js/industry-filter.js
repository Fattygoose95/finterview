// finterview Industry Filter System
// Advanced multi-dimensional filtering for finance interview questions
// Version: 1.0.0

(function() {
    'use strict';
    
    console.log('Industry Filter System Initializing...');
    
    // ====================================================================
    // CONFIGURATION
    // ====================================================================
    
    const CONFIG = {
        // Filter categories
        industries: [
            { id: 'ib', name: 'Investment Banking', color: '#1d4ed8', icon: 'fas fa-building' },
            { id: 'am', name: 'Asset Management', color: '#059669', icon: 'fas fa-chart-pie' },
            { id: 'quant', name: 'Quantitative Finance', color: '#7c3aed', icon: 'fas fa-calculator' },
            { id: 'markets', name: 'Sales & Trading', color: '#f59e0b', icon: 'fas fa-chart-line' },
            { id: 'corpfin', name: 'Corporate Finance', color: '#ea580c', icon: 'fas fa-landmark' },
            { id: 'risk', name: 'Risk Management', color: '#dc2626', icon: 'fas fa-shield-alt' },
            { id: 'fintech', name: 'FinTech', color: '#db2777', icon: 'fas fa-mobile-alt' },
            { id: 'fo', name: 'Family Office', color: '#0284c7', icon: 'fas fa-home' }
        ],
        
        difficulties: [
            { id: 'easy', name: 'Easy', color: '#27ae60' },
            { id: 'medium', name: 'Medium', color: '#f39c12' },
            { id: 'hard', name: 'Hard', color: '#e74c3c' }
        ],
        
        types: [
            { id: 'technical', name: 'Technical', color: '#3498db' },
            { id: 'behavioral', name: 'Behavioral', color: '#2ecc71' },
            { id: 'case', name: 'Case Study', color: '#9b59b6' },
            { id: 'market', name: 'Market Insight', color: '#f39c12' }
        ],
        
        frequencies: [
            { id: 'high', name: 'High Frequency', color: '#f72585' },
            { id: 'medium', name: 'Medium Frequency', color: '#4361ee' },
            { id: 'low', name: 'Low Frequency', color: '#6b7280' }
        ],
        
        // Sort options
        sortOptions: {
            relevance: { id: 'relevance', name: 'Relevance', icon: 'fas fa-star' },
            difficulty: { id: 'difficulty', name: 'Difficulty', icon: 'fas fa-chart-line' },
            industry: { id: 'industry', name: 'Industry', icon: 'fas fa-industry' },
            random: { id: 'random', name: 'Random', icon: 'fas fa-random' }
        }
    };
    
    // ====================================================================
    // STATE MANAGEMENT
    // ====================================================================
    
    const State = {
        // All questions loaded from questionBank
        allQuestions: [],
        
        // Current filtered questions
        filteredQuestions: [],
        
        // Active filters
        activeFilters: {
            industry: new Set(),
            difficulty: new Set(),
            type: new Set(),
            frequency: new Set()
        },
        
        // Current sort option
        currentSort: 'relevance',
        
        // UI elements cache
        elements: {}
    };
    
    // ====================================================================
    // FILTER LOGIC
    // ====================================================================
    
    /**
     * Initialize the filter system
     */
    function init() {
        console.log('Initializing Industry Filter...');
        
        // Cache DOM elements
        cacheElements();
        
        // Load questions
        loadQuestions();
        
        // Setup UI
        setupFiltersUI();
        setupEventListeners();
        
        // Check URL parameters
        checkUrlParameters();
        
        // Apply initial filters
        applyFilters();
    }
    
    /**
     * Cache frequently used DOM elements
     */
    function cacheElements() {
        State.elements = {
            // Filter containers
            industryFilter: document.getElementById('industryFilter'),
            difficultyFilter: document.getElementById('difficultyFilter'),
            typeFilter: document.getElementById('typeFilter'),
            frequencyFilter: document.getElementById('frequencyFilter'),
            
            // Results
            questionGrid: document.getElementById('questionGrid'),
            resultsCount: document.getElementById('resultsCount'),
            totalCount: document.getElementById('totalCount'),
            noResults: document.getElementById('noResults'),
            
            // Selected tags
            selectedTags: document.getElementById('selectedTags'),
            
            // Buttons
            clearAllBtn: document.getElementById('clearAllBtn'),
            resetFiltersBtn: document.getElementById('resetFiltersBtn'),
            
            // Sort buttons
            sortBtns: document.querySelectorAll('.sort-btn'),
            
            // URL params info
            urlParamsInfo: document.getElementById('urlParamsInfo'),
            urlParamsText: document.getElementById('urlParamsText'),
            urlParamsClose: document.getElementById('urlParamsClose')
        };
    }
    
    /**
     * Load questions from questionBank
     */
    function loadQuestions() {
        // Check if questions.js is loaded
        if (typeof window.questionBank === 'undefined') {
            showError('Data not loaded. Please check if questions.js is properly loaded.');
            return;
        }
        
        State.allQuestions = window.questionBank;
        if (!Array.isArray(State.allQuestions)) {
            showError('Invalid data format.');
            return;
        }
        
        console.log(`Total questions loaded: ${State.allQuestions.length}`);
        
        // Calculate frequency for each question
        State.allQuestions.forEach(question => {
            question.frequency = calculateFrequency(question);
        });
        
        // Update total count
        State.elements.totalCount.textContent = State.allQuestions.length;
    }
    
    /**
     * Calculate frequency category for a question
     */
    function calculateFrequency(question) {
        // Simple heuristic based on role and category
        let score = 5; // Base score
        
        if (question.difficulty === 'easy') score += 1;
        if (question.difficulty === 'hard') score += 1;
        if (question.category === 'technical') score += 2;
        if (question.role === 'ib' || question.role === 'am') score += 2; // Common roles
        
        // Map score to frequency category
        if (score >= 8) return 'high';
        if (score >= 6) return 'medium';
        return 'low';
    }
    
    /**
     * Setup filter UI elements
     */
    function setupFiltersUI() {
        // Create industry filter tags
        createFilterTags(State.elements.industryFilter, CONFIG.industries, 'industry');
        
        // Create difficulty filter tags
        createFilterTags(State.elements.difficultyFilter, CONFIG.difficulties, 'difficulty');
        
        // Create type filter tags
        createFilterTags(State.elements.typeFilter, CONFIG.types, 'type');
        
        // Create frequency filter tags
        createFilterTags(State.elements.frequencyFilter, CONFIG.frequencies, 'frequency');
    }
    
    /**
     * Create filter tag buttons
     */
    function createFilterTags(container, items, filterType) {
        container.innerHTML = '';
        
        items.forEach(item => {
            const tag = document.createElement('div');
            tag.className = 'filter-tag';
            tag.dataset.filterType = filterType;
            tag.dataset.filterId = item.id;
            tag.dataset.filterName = item.name;
            tag.style.borderColor = item.color;
            tag.style.color = item.color;
            
            // Add icon if present
            if (item.icon) {
                tag.innerHTML = `<i class="${item.icon}"></i> ${item.name}`;
            } else {
                tag.textContent = item.name;
            }
            
            container.appendChild(tag);
        });
    }
    
    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Filter tag clicks + practice/more-industry button clicks (delegated)
        document.addEventListener('click', function(e) {
            const filterTag = e.target.closest('.filter-tag');
            if (filterTag) {
                toggleFilter(
                    filterTag.dataset.filterType,
                    filterTag.dataset.filterId,
                    filterTag.dataset.filterName,
                    filterTag
                );
                return;
            }
            
            // Remove selected tag
            const removeBtn = e.target.closest('.selected-tag-remove');
            if (removeBtn) {
                const tag = removeBtn.closest('.selected-tag');
                const filterType = tag.dataset.filterType;
                const filterId = tag.dataset.filterId;
                removeFilter(filterType, filterId);
                return;
            }
            
            // Practice This Question button
            const practiceBtn = e.target.closest('.practice-card-btn');
            if (practiceBtn) {
                e.stopPropagation();
                const qId = practiceBtn.dataset.questionId;
                if (qId) navigateToPractice(parseInt(qId));
                return;
            }
            
            // More [Industry] button
            const moreBtn = e.target.closest('.more-industry-btn');
            if (moreBtn) {
                e.stopPropagation();
                const industryId = moreBtn.dataset.industry;
                if (industryId) navigateToIndustryPractice(industryId);
                return;
            }
        });
        
        // Clear all filters
        State.elements.clearAllBtn.addEventListener('click', clearAllFilters);
        
        // Reset filters (no results)
        State.elements.resetFiltersBtn.addEventListener('click', clearAllFilters);
        
        // Sort buttons
        State.elements.sortBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                setSort(this.dataset.sort);
            });
        });
        
        // URL params close button
        State.elements.urlParamsClose.addEventListener('click', function() {
            State.elements.urlParamsInfo.classList.add('hidden');
        });
        
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navList = document.querySelector('.nav-list');
        if (menuToggle && navList) {
            menuToggle.addEventListener('click', function() {
                navList.classList.toggle('show');
            });
        }
    }
    
    /**
     * Check and apply URL parameters
     */
    function checkUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        let hasUrlParams = false;
        let paramMessage = 'Filter applied from URL: ';
        const paramParts = [];
        
        // Industry parameter
        const industryParam = urlParams.get('industry');
        if (industryParam) {
            const industry = CONFIG.industries.find(i => i.id === industryParam);
            if (industry) {
                addFilter('industry', industry.id, industry.name);
                paramParts.push(`Industry: ${industry.name}`);
                hasUrlParams = true;
            }
        }
        
        // Difficulty parameter
        const difficultyParam = urlParams.get('difficulty');
        if (difficultyParam) {
            const difficulty = CONFIG.difficulties.find(d => d.id === difficultyParam);
            if (difficulty) {
                addFilter('difficulty', difficulty.id, difficulty.name);
                paramParts.push(`Difficulty: ${difficulty.name}`);
                hasUrlParams = true;
            }
        }
        
        // Type parameter
        const typeParam = urlParams.get('type');
        if (typeParam) {
            const type = CONFIG.types.find(t => t.id === typeParam);
            if (type) {
                addFilter('type', type.id, type.name);
                paramParts.push(`Type: ${type.name}`);
                hasUrlParams = true;
            }
        }
        
        // Show info if URL params were applied
        if (hasUrlParams) {
            State.elements.urlParamsText.textContent = paramMessage + paramParts.join(', ');
            State.elements.urlParamsInfo.classList.remove('hidden');
        }
    }
    
    /**
     * Toggle a filter on/off
     */
    function toggleFilter(filterType, filterId, filterName, element) {
        if (State.activeFilters[filterType].has(filterId)) {
            removeFilter(filterType, filterId);
        } else {
            addFilter(filterType, filterId, filterName);
        }
    }
    
    /**
     * Add a filter
     */
    function addFilter(filterType, filterId, filterName) {
        State.activeFilters[filterType].add(filterId);
        
        // Update UI
        updateFilterTagUI(filterType, filterId, true);
        updateSelectedTagsUI();
        
        // Apply filters
        applyFilters();
    }
    
    /**
     * Remove a filter
     */
    function removeFilter(filterType, filterId) {
        State.activeFilters[filterType].delete(filterId);
        
        // Update UI
        updateFilterTagUI(filterType, filterId, false);
        updateSelectedTagsUI();
        
        // Apply filters
        applyFilters();
    }
    
    /**
     * Clear all filters
     */
    function clearAllFilters() {
        // Clear all filter sets
        Object.keys(State.activeFilters).forEach(filterType => {
            State.activeFilters[filterType].clear();
        });
        
        // Update UI
        updateAllFilterTagsUI();
        updateSelectedTagsUI();
        
        // Apply filters
        applyFilters();
        
        // Hide URL params info
        State.elements.urlParamsInfo.classList.add('hidden');
    }
    
    /**
     * Update filter tag UI state
     */
    function updateFilterTagUI(filterType, filterId, isActive) {
        const selector = `.filter-tag[data-filter-type="${filterType}"][data-filter-id="${filterId}"]`;
        const tag = document.querySelector(selector);
        if (tag) {
            tag.classList.toggle('active', isActive);
        }
    }
    
    /**
     * Update all filter tags UI state
     */
    function updateAllFilterTagsUI() {
        // Reset all filter tags
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
        });
    }
    
    /**
     * Update selected tags UI
     */
    function updateSelectedTagsUI() {
        const container = State.elements.selectedTags;
        container.innerHTML = '';
        
        let hasFilters = false;
        
        // Collect all active filters
        const filters = [];
        
        Object.keys(State.activeFilters).forEach(filterType => {
            State.activeFilters[filterType].forEach(filterId => {
                // Find filter config
                let filterConfig;
                let filterName = filterId;
                let filterColor = '#4361ee';
                
                switch(filterType) {
                    case 'industry':
                        filterConfig = CONFIG.industries.find(i => i.id === filterId);
                        break;
                    case 'difficulty':
                        filterConfig = CONFIG.difficulties.find(d => d.id === filterId);
                        break;
                    case 'type':
                        filterConfig = CONFIG.types.find(t => t.id === filterId);
                        break;
                    case 'frequency':
                        filterConfig = CONFIG.frequencies.find(f => f.id === filterId);
                        break;
                }
                
                if (filterConfig) {
                    filterName = filterConfig.name;
                    filterColor = filterConfig.color;
                }
                
                filters.push({
                    type: filterType,
                    id: filterId,
                    name: filterName,
                    color: filterColor
                });
                
                hasFilters = true;
            });
        });
        
        // Display filters
        if (!hasFilters) {
            container.innerHTML = '<div class="empty-selection">No filters selected. Click tags below to add filters.</div>';
            return;
        }
        
        filters.forEach(filter => {
            const tag = document.createElement('div');
            tag.className = 'selected-tag';
            tag.dataset.filterType = filter.type;
            tag.dataset.filterId = filter.id;
            tag.style.borderColor = filter.color;
            tag.style.color = filter.color;
            
            tag.innerHTML = `
                ${filter.name}
                <span class="selected-tag-remove" data-filter-type="${filter.type}" data-filter-id="${filter.id}">
                    <i class="fas fa-times"></i>
                </span>
            `;
            
            container.appendChild(tag);
        });
    }
    
    /**
     * Set sort option
     */
    function setSort(sortId) {
        if (!CONFIG.sortOptions[sortId]) return;
        
        State.currentSort = sortId;
        
        // Update UI
        State.elements.sortBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sort === sortId);
        });
        
        // Apply sorting
        sortQuestions();
        renderQuestions();
    }
    
    /**
     * Apply all filters and update results
     */
    function applyFilters() {
        console.log('Applying filters...');
        
        // Start with all questions
        let filtered = [...State.allQuestions];
        
        // Apply each filter type
        Object.keys(State.activeFilters).forEach(filterType => {
            const activeSet = State.activeFilters[filterType];
            if (activeSet.size > 0) {
                filtered = filtered.filter(question => {
                    switch(filterType) {
                        case 'industry':
                            return activeSet.has(question.role);
                        case 'difficulty':
                            return activeSet.has(question.difficulty);
                        case 'type':
                            return activeSet.has(question.category);
                        case 'frequency':
                            return activeSet.has(question.frequency);
                        default:
                            return true;
                    }
                });
            }
        });
        
        // Update state
        State.filteredQuestions = filtered;
        
        // Sort questions
        sortQuestions();
        
        // Render results
        renderQuestions();
        
        // Update results count
        updateResultsCount();
    }
    
    /**
     * Sort filtered questions
     */
    function sortQuestions() {
        const questions = State.filteredQuestions;
        
        switch(State.currentSort) {
            case 'relevance':
                // Sort by frequency score (high to low)
                questions.sort((a, b) => {
                    const aScore = getFrequencyScore(a.frequency);
                    const bScore = getFrequencyScore(b.frequency);
                    return bScore - aScore;
                });
                break;
                
            case 'difficulty':
                // Sort by difficulty (easy to hard)
                const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
                questions.sort((a, b) => {
                    const aDiff = difficultyOrder[a.difficulty] || 2;
                    const bDiff = difficultyOrder[b.difficulty] || 2;
                    return aDiff - bDiff;
                });
                break;
                
            case 'industry':
                // Sort by industry (alphabetical)
                questions.sort((a, b) => {
                    const aIndustry = getIndustryName(a.role) || '';
                    const bIndustry = getIndustryName(b.role) || '';
                    return aIndustry.localeCompare(bIndustry);
                });
                break;
                
            case 'random':
                // Shuffle questions
                for (let i = questions.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [questions[i], questions[j]] = [questions[j], questions[i]];
                }
                break;
        }
    }
    
    /**
     * Get frequency score for sorting
     */
    function getFrequencyScore(frequency) {
        const scores = { high: 3, medium: 2, low: 1 };
        return scores[frequency] || 1;
    }
    
    /**
     * Update results count display
     */
    function updateResultsCount() {
        const total = State.allQuestions.length;
        const filtered = State.filteredQuestions.length;
        
        State.elements.resultsCount.textContent = filtered;
        State.elements.totalCount.textContent = total;
        
        // Show/hide no results state
        if (filtered === 0) {
            State.elements.noResults.classList.remove('hidden');
            State.elements.questionGrid.classList.add('hidden');
        } else {
            State.elements.noResults.classList.add('hidden');
            State.elements.questionGrid.classList.remove('hidden');
        }
    }
    
    /**
     * Render filtered questions
     */
    function renderQuestions() {
        const grid = State.elements.questionGrid;
        const questions = State.filteredQuestions;
        
        if (questions.length === 0) {
            grid.innerHTML = '';
            return;
        }
        
        grid.innerHTML = '';
        
        questions.forEach((question, index) => {
            const card = createQuestionCard(question, index + 1);
            grid.appendChild(card);
        });
        
        // Bind answer toggle events
        bindAnswerEvents();
    }
    
    /**
     * Create question card element
     */
    function createQuestionCard(question, number) {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.dataset.questionId = question.id || number;
        
        // Store filter context in sessionStorage before navigating
        function navToPractice(targetId) {
            saveFilterStateToSession();
            window.location.href = `industry-practice.html?questionId=${targetId}`;
        }
        
        // Make card clickable to go to practice mode
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons or links
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            navToPractice(question.id || number);
        });
        
        // Industry color
        const industry = CONFIG.industries.find(i => i.id === question.role);
        const industryColor = industry ? industry.color : '#4361ee';
        
        // Difficulty color
        const difficulty = CONFIG.difficulties.find(d => d.id === question.difficulty);
        const difficultyColor = difficulty ? difficulty.color : '#f39c12';
        
        // Type color
        const type = CONFIG.types.find(t => t.id === question.category);
        const typeColor = type ? type.color : '#3498db';
        
        // Frequency badge
        let frequencyBadge = '';
        if (question.frequency === 'high') {
            frequencyBadge = '<span class="high-frequency-badge">High Frequency</span>';
        }
        
        card.innerHTML = `
            <div class="question-header">
                <h4 class="question-title">
                    ${frequencyBadge}
                    ${number}. ${escapeHtml(question.title || 'Question')}
                </h4>
                <div class="question-tags">
                    <span class="tag" style="background: ${typeColor}20; color: ${typeColor}">
                        ${type ? type.name : question.category || 'technical'}
                    </span>
                    <span class="tag difficulty" style="background: ${difficultyColor}20; color: ${difficultyColor}">
                        ${difficulty ? difficulty.name : question.difficulty || 'medium'}
                    </span>
                    <span class="tag" style="background: ${industryColor}20; color: ${industryColor}">
                        ${industry ? industry.name : question.role || 'general'}
                    </span>
                </div>
            </div>
            
            <div class="question-content">
                <p>${escapeHtml(question.question || '')}</p>
            </div>
            
            <div class="question-meta">
                <div class="difficulty">
                    <span class="label">Frequency:</span>
                    <span class="text">${question.frequency === 'high' ? 'High' : question.frequency === 'medium' ? 'Medium' : 'Low'}</span>
                </div>
                <div class="rating">
                    <span class="label">ID:</span>
                    <span class="text">${question.id || 'N/A'}</span>
                </div>
            </div>
            
            <div class="question-actions" style="margin-top: 1rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <button class="btn btn-primary practice-card-btn" data-question-id="${question.id || number}" style="flex: 1; min-width: 140px; white-space: nowrap;">
                    <i class="fas fa-play"></i> Practice This Question
                </button>
                <button class="btn btn-outline more-industry-btn" data-industry="${question.role || 'ib'}" style="flex: 0 1 auto; min-width: 120px; white-space: nowrap;">
                    <i class="fas fa-industry"></i> More ${getIndustryName(question.role)}
                </button>
            </div>
        `;
        
        return card;
    }
    
    /**
     * Get answer text from question object
     */
    function getAnswer(question) {
        if (question.answers?.concise?.answer) return question.answers.concise.answer;
        if (question.answers?.detailed?.answer) return question.answers.detailed.answer;
        if (question.conciseAnswer) return question.conciseAnswer;
        if (question.modelAnswer) return question.modelAnswer;
        if (question.answer) return question.answer;
        return 'No answer available.';
    }
    
    /**
     * Get industry display name
     */
    function getIndustryName(industryId) {
        const industry = CONFIG.industries.find(i => i.id === industryId);
        return industry ? industry.name : 'Finance';
    }
    
    /**
     * Save current filter state to sessionStorage (avoids URI-too-long errors)
     * Practice mode reads this to maintain filter context
     */
    function saveFilterStateToSession() {
        const filterState = {
            industries: Array.from(State.activeFilters.industry),
            difficulties: Array.from(State.activeFilters.difficulty),
            types: Array.from(State.activeFilters.type),
            frequencies: Array.from(State.activeFilters.frequency),
            sort: State.currentSort,
            filteredIds: State.filteredQuestions.map(q => q.id || q._index).filter(id => id)
        };
        try {
            sessionStorage.setItem('finterview_filter_state', JSON.stringify(filterState));
        } catch (e) {
            // sessionStorage full or unavailable — fall back to minimal URL param
            console.warn('Could not save filter state to sessionStorage:', e.message);
        }
    }
    
    /**
     * Navigate to practice mode with stored filter context
     */
    function navigateToPractice(questionId) {
        saveFilterStateToSession();
        window.location.href = `industry-practice.html?questionId=${questionId}`;
    }
    
    /**
     * Navigate to practice mode filtered by industry
     */
    function navigateToIndustryPractice(industryId) {
        window.location.href = `industry-practice.html?industry=${industryId}`;
    }
    
    /**
     * Bind answer toggle events
     */
    function bindAnswerEvents() {
        // Already bound via inline onclick
    }
    
    /**
     * Show error state
     */
    function showError(message) {
        State.elements.questionGrid.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Questions</h3>
                <p>${escapeHtml(message)}</p>
                <button class="btn btn-primary" onclick="window.location.reload()" style="margin-top: 1rem;">
                    <i class="fas fa-sync-alt"></i> Reload Page
                </button>
            </div>
        `;
    }
    
    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // ====================================================================
    // GLOBAL FUNCTIONS
    // ====================================================================
    
    window.toggleAnswer = function(questionId) {
        // This function is kept for compatibility but no longer needed
        // since answers are not shown in filter view
        console.log('Answer toggling is not available in filter view. Click "Practice This Question" to see answers.');
    };
    
    // ====================================================================
    // INITIALIZATION
    // ====================================================================
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();