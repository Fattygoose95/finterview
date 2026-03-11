/**
 * Random Practice - Unified Design System Version
 * Simplified version with English interface and unified design compatibility
 */

console.log('Random Practice - Unified Version Loading...');

// Configuration
const CONFIG = {
    QUESTIONS_PER_PAGE: 20,
    DEFAULT_SORT: 'random'
};

// State
let allQuestions = [];
let filteredQuestions = [];
let currentFilters = {
    star: 'all',
    type: 'all',
    difficulty: 'all',
    tag: 'all',
    sort: CONFIG.DEFAULT_SORT
};

// DOM Elements
const questionsGrid = document.getElementById('questionsGrid');
const resultsCount = document.getElementById('resultsCount');
const filterPanel = document.getElementById('filterPanel');
const mobileFilterToggle = document.getElementById('mobileFilterToggle');

// Filter elements
const starFilter = document.getElementById('starFilter');
const typeFilter = document.getElementById('typeFilter');
const difficultyFilter = document.getElementById('difficultyFilter');
const tagFilter = document.getElementById('tagFilter');
const sortSelect = document.getElementById('sortSelect');
const resetFiltersBtn = document.getElementById('resetFilters');

/**
 * Initialize the page
 */
async function init() {
    console.log('Initializing random practice...');
    
    // Load questions
    await loadQuestions();
    
    // Initialize filters
    initFilters();
    
    // Apply initial filters
    applyFilters();
    
    // Bind events
    bindEvents();
    
    console.log('Random practice initialized');
}

/**
 * Load questions from questions.js
 */
async function loadQuestions() {
    console.log('Loading questions...');
    
    // Show loading state
    if (questionsGrid) {
        questionsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #3498db;"></i>
                <h3>Loading Questions</h3>
                <p>Preparing your random practice session...</p>
            </div>
        `;
    }
    
    // Check if questions.js is loaded
    if (typeof window.questionBank === 'undefined') {
        console.error('questionBank not loaded. Make sure questions.js is loaded.');
        showError('Data not loaded. Please check if questions.js is properly loaded.');
        return;
    }
    
    const qb = window.questionBank;
    if (!Array.isArray(qb)) {
        console.error('questionBank is not an array:', typeof qb);
        showError('Invalid data format.');
        return;
    }
    
    // Process questions
    allQuestions = qb.map(q => ({
        id: q.id || Math.random().toString(36).substr(2, 9),
        title: q.title || 'Untitled Question',
        question: q.question || '',
        role: q.role || 'general',
        category: q.category || 'technical',
        difficulty: q.difficulty || 'medium',
        stars: q.metadata?.stars || q.overallRating || 4.0,
        tags: q.tags || [],
        answer: getQuestionAnswer(q),
        conciseAnswer: q.conciseAnswer || (q.answers?.concise?.answer) || '',
        detailedAnswer: q.modelAnswer || (q.answers?.detailed?.answer) || ''
    }));
    
    console.log(`Loaded ${allQuestions.length} questions`);
    
    // Update results count
    updateResultsCount(allQuestions.length);
}

/**
 * Get answer from question object
 */
function getQuestionAnswer(question) {
    if (question.answers?.concise?.answer) return question.answers.concise.answer;
    if (question.answers?.detailed?.answer) return question.answers.detailed.answer;
    if (question.conciseAnswer) return question.conciseAnswer;
    if (question.modelAnswer) return question.modelAnswer;
    if (question.answer) return question.answer;
    return 'No answer available.';
}

/**
 * Initialize filter options
 */
function initFilters() {
    console.log('Initializing filters...');
    
    // Update filter option display text to English
    updateFilterOptions();
}

/**
 * Update filter options to English
 */
function updateFilterOptions() {
    // Star filter options are already in English (★★★★★ etc.)
    // Type filter
    if (typeFilter) {
        const typeOptions = typeFilter.querySelectorAll('.filter-option');
        typeOptions.forEach(option => {
            const value = option.getAttribute('data-value');
            switch(value) {
                case 'technical': option.textContent = 'Technical'; break;
                case 'behavioral': option.textContent = 'Behavioral'; break;
                case 'case': option.textContent = 'Case Study'; break;
                default: break;
            }
        });
    }
    
    // Difficulty filter
    if (difficultyFilter) {
        const difficultyOptions = difficultyFilter.querySelectorAll('.filter-option');
        difficultyOptions.forEach(option => {
            const value = option.getAttribute('data-value');
            switch(value) {
                case 'easy': option.textContent = 'Easy'; break;
                case 'medium': option.textContent = 'Medium'; break;
                case 'hard': option.textContent = 'Hard'; break;
                default: break;
            }
        });
    }
}

/**
 * Apply current filters
 */
function applyFilters() {
    console.log('Applying filters:', currentFilters);
    
    // Start with all questions
    filteredQuestions = [...allQuestions];
    
    // Apply star filter
    if (currentFilters.star !== 'all') {
        const minStars = parseFloat(currentFilters.star);
        filteredQuestions = filteredQuestions.filter(q => q.stars >= minStars);
    }
    
    // Apply type filter
    if (currentFilters.type !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.category === currentFilters.type);
    }
    
    // Apply difficulty filter
    if (currentFilters.difficulty !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.difficulty === currentFilters.difficulty);
    }
    
    // Apply tag filter (simplified)
    if (currentFilters.tag !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => {
            if (currentFilters.tag === 'high-frequency') {
                return q.tags.includes('高频') || q.tags.includes('高频题') || q.tags.includes('high-frequency');
            }
            if (currentFilters.tag === 'interview') {
                return q.tags.includes('面试') || q.tags.includes('面试题') || q.tags.includes('interview');
            }
            return true;
        });
    }
    
    // Apply sorting
    applySorting();
    
    console.log(`After filtering: ${filteredQuestions.length} questions`);
    
    // Update results count
    updateResultsCount(filteredQuestions.length);
    
    // Render questions
    renderQuestions();
}

/**
 * Apply sorting to filtered questions
 */
function applySorting() {
    switch(currentFilters.sort) {
        case 'random':
            // Shuffle array
            for (let i = filteredQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
            }
            break;
            
        case 'star-desc':
            filteredQuestions.sort((a, b) => b.stars - a.stars);
            break;
            
        case 'difficulty-asc':
            const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
            filteredQuestions.sort((a, b) => 
                (difficultyOrder[a.difficulty] || 2) - (difficultyOrder[b.difficulty] || 2)
            );
            break;
            
        case 'difficulty-desc':
            const difficultyOrderDesc = { easy: 1, medium: 2, hard: 3 };
            filteredQuestions.sort((a, b) => 
                (difficultyOrderDesc[b.difficulty] || 2) - (difficultyOrderDesc[a.difficulty] || 2)
            );
            break;
            
        case 'industry':
            filteredQuestions.sort((a, b) => a.role.localeCompare(b.role));
            break;
            
        default:
            // Default to random
            for (let i = filteredQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
            }
    }
}

/**
 * Render questions to the grid
 */
function renderQuestions() {
    if (!questionsGrid) {
        console.error('Questions grid not found');
        return;
    }
    
    if (filteredQuestions.length === 0) {
        questionsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px;">
                <i class="fas fa-search" style="font-size: 2rem; color: #95a5a6;"></i>
                <h3>No Questions Found</h3>
                <p>No questions match your filter criteria.</p>
                <button class="btn btn-primary" onclick="resetFilters()" style="margin-top: 1rem;">
                    Reset Filters
                </button>
            </div>
        `;
        return;
    }
    
    // Clear grid
    questionsGrid.innerHTML = '';
    
    // Take first N questions (pagination)
    const displayQuestions = filteredQuestions.slice(0, CONFIG.QUESTIONS_PER_PAGE);
    
    // Render each question
    displayQuestions.forEach((question, index) => {
        const card = createQuestionCard(question, index + 1);
        questionsGrid.appendChild(card);
    });
    
    // If there are more questions, show a note
    if (filteredQuestions.length > CONFIG.QUESTIONS_PER_PAGE) {
        const note = document.createElement('div');
        note.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; font-size: 0.9rem;';
        note.textContent = `Showing ${CONFIG.QUESTIONS_PER_PAGE} of ${filteredQuestions.length} questions. Use filters to narrow down results.`;
        questionsGrid.appendChild(note);
    }
}

/**
 * Create a question card
 */
function createQuestionCard(question, index) {
    const card = document.createElement('div');
    card.className = 'question-card random-mode';
    card.dataset.id = question.id;
    card.dataset.index = index;
    
    // Difficulty color
    const difficulty = question.difficulty || 'medium';
    const difficultyText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    const difficultyColor = getDifficultyColor(difficulty);
    
    // Stars
    const stars = Math.min(5, Math.max(1, Math.round(question.stars || 4)));
    const starsHTML = '★'.repeat(stars) + '☆'.repeat(5 - stars);
    
    // Industry name
    const industryName = getIndustryName(question.role);
    
    card.innerHTML = `
        <div class="question-header">
            <h4 class="question-title">${index}. ${escapeHtml(question.title)}</h4>
            <div class="question-tags">
                <span class="tag ${question.category || 'technical'}">${question.category || 'technical'}</span>
                <span class="tag difficulty" style="background: ${difficultyColor}">${difficultyText}</span>
                <span class="tag" style="background: #e0f2fe; color: #0369a1;">${industryName}</span>
            </div>
        </div>
        
        <div class="question-content">
            <p>${escapeHtml(question.question)}</p>
        </div>
        
        <div class="question-meta">
            <div class="difficulty">
                <span class="label">Rating:</span>
                <span class="stars">${starsHTML}</span>
                <span class="score">${question.stars?.toFixed(1) || '4.0'}/5.0</span>
            </div>
            <div class="rating">
                <span class="label">Industry:</span>
                <span class="text">${industryName}</span>
            </div>
        </div>
        
        <div class="answer-section" style="display: none;" id="answer-${question.id}">
            <div class="answer-toggle-section">
                <button class="answer-type-btn active" data-answer-type="concise" onclick="toggleAnswerType('${question.id}', 'concise')">
                    <i class="fas fa-bars"></i> Concise Answer
                </button>
                <button class="answer-type-btn" data-answer-type="detailed" onclick="toggleAnswerType('${question.id}', 'detailed')">
                    <i class="fas fa-file-alt"></i> Detailed Answer
                </button>
            </div>
            
            <div class="concise-answer" id="concise-${question.id}" style="display: block; margin-top: 15px;">
                <h5><i class="fas fa-lightbulb"></i> Concise Answer</h5>
                <div class="answer-text">${escapeHtml(question.conciseAnswer || question.answer)}</div>
            </div>
            
            <div class="detailed-answer" id="detailed-${question.id}" style="display: none; margin-top: 15px;">
                <h5><i class="fas fa-file-alt"></i> Detailed Answer</h5>
                <div class="answer-text">${escapeHtml(question.detailedAnswer || question.answer)}</div>
            </div>
        </div>
        
        <div class="question-actions" style="margin-top: 15px;">
            <button class="btn btn-primary" onclick="toggleAnswer('${question.id}')">
                <i class="fas fa-eye"></i> Show Answer
            </button>
            <button class="btn btn-outline" onclick="practiceQuestion('${question.id}')" style="margin-left: 10px;">
                <i class="fas fa-play"></i> Practice
            </button>
        </div>
    `;
    
    return card;
}

/**
 * Get difficulty color
 */
function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'easy': return '#27ae60';
        case 'hard': return '#e74c3c';
        default: return '#f39c12';
    }
}

/**
 * Get industry name
 */
function getIndustryName(industryId) {
    const industries = {
        'ib': 'Investment Banking',
        'am': 'Asset Management',
        'quant': 'Quantitative Finance',
        'markets': 'Sales & Trading',
        'corpfin': 'Corporate Finance',
        'risk': 'Risk Management',
        'fintech': 'FinTech',
        'fo': 'Family Office'
    };
    return industries[industryId] || 'Finance';
}

/**
 * Bind event listeners
 */
function bindEvents() {
    // Filter option clicks
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function() {
            const filterType = this.parentElement.id.replace('Filter', '');
            const value = this.getAttribute('data-value');
            
            // Update selected state
            this.parentElement.querySelectorAll('.filter-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // Update filter state
            currentFilters[filterType] = value;
            
            // Apply filters
            applyFilters();
        });
    });
    
    // Sort select change
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentFilters.sort = this.value;
            applyFilters();
        });
    }
    
    // Reset filters button
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            resetFilters();
        });
    }
    
    // Mobile filter toggle
    if (mobileFilterToggle && filterPanel) {
        mobileFilterToggle.addEventListener('click', function() {
            filterPanel.classList.toggle('active');
        });
    }
}

/**
 * Reset all filters
 */
function resetFilters() {
    console.log('Resetting filters...');
    
    // Reset filter state
    currentFilters = {
        star: 'all',
        type: 'all',
        difficulty: 'all',
        tag: 'all',
        sort: CONFIG.DEFAULT_SORT
    };
    
    // Reset UI
    document.querySelectorAll('.filter-option').forEach(option => {
        option.classList.remove('selected');
        if (option.getAttribute('data-value') === 'all') {
            option.classList.add('selected');
        }
    });
    
    if (sortSelect) {
        sortSelect.value = CONFIG.DEFAULT_SORT;
    }
    
    // Apply filters
    applyFilters();
}

/**
 * Update results count
 */
function updateResultsCount(count) {
    if (resultsCount) {
        resultsCount.textContent = count;
    }
}

/**
 * Show error message
 */
function showError(message) {
    if (questionsGrid) {
        questionsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px; background: #fee2e2; border-radius: 12px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #e74c3c;"></i>
                <h3 style="color: #991b1b;">Error Loading Questions</h3>
                <p style="color: #7f1d1d;">${escapeHtml(message)}</p>
                <button class="btn btn-primary" onclick="window.location.reload()" style="margin-top: 1rem;">
                    <i class="fas fa-sync-alt"></i> Reload Page
                </button>
            </div>
        `;
    }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Toggle answer visibility
 */
window.toggleAnswer = function(questionId) {
    const answerSection = document.getElementById(`answer-${questionId}`);
    if (!answerSection) return;
    
    const isVisible = answerSection.style.display !== 'none';
    answerSection.style.display = isVisible ? 'none' : 'block';
    
    // Find and update button
    const card = answerSection.closest('.question-card');
    if (card) {
        const button = card.querySelector('.btn-primary');
        if (button) {
            button.innerHTML = isVisible ? 
                '<i class="fas fa-eye"></i> Show Answer' : 
                '<i class="fas fa-eye-slash"></i> Hide Answer';
        }
    }
};

/**
 * Toggle answer type (concise/detailed)
 */
window.toggleAnswerType = function(questionId, type) {
    const conciseEl = document.getElementById(`concise-${questionId}`);
    const detailedEl = document.getElementById(`detailed-${questionId}`);
    const conciseBtn = document.querySelector(`#answer-${questionId} [data-answer-type="concise"]`);
    const detailedBtn = document.querySelector(`#answer-${questionId} [data-answer-type="detailed"]`);
    
    if (conciseEl && detailedEl && conciseBtn && detailedBtn) {
        if (type === 'concise') {
            conciseEl.style.display = 'block';
            detailedEl.style.display = 'none';
            conciseBtn.classList.add('active');
            detailedBtn.classList.remove('active');
        } else {
            conciseEl.style.display = 'none';
            detailedEl.style.display = 'block';
            conciseBtn.classList.remove('active');
            detailedBtn.classList.add('active');
        }
    }
};

/**
 * Practice a specific question
 */
window.practiceQuestion = function(questionId) {
    alert(`Practice mode for question ${questionId} would open here. This feature is coming soon!`);
};

/**
 * Refresh random questions
 */
window.refreshRandomQuestions = function() {
    console.log('Refreshing random questions...');
    currentFilters.sort = 'random';
    applyFilters();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}