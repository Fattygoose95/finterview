/**
 * finterview Flashcard Mode
 * Spaced repetition learning for finance interview questions
 * Version: 1.0.0
 */

(function() {
    'use strict';
    
    // DOM elements
    const flashcard = document.getElementById('flashcard');
    const flashcardQuestion = document.getElementById('flashcardQuestion');
    const flashcardIndustry = document.getElementById('flashcardIndustry');
    const flashcardDifficulty = document.getElementById('flashcardDifficulty');
    const flashcardAnswer = document.getElementById('flashcardAnswer');
    const ratingControls = document.getElementById('ratingControls');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const totalCardsEl = document.getElementById('totalCards');
    const reviewedCardsEl = document.getElementById('reviewedCards');
    const masteryRateEl = document.getElementById('masteryRate');
    const industrySelector = document.getElementById('industrySelector');
    
    // Buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const resetBtn = document.getElementById('resetBtn');
    const ratingButtons = document.querySelectorAll('.rating-btn');
    
    // State
    let allQuestions = [];
    let filteredQuestions = [];
    let currentIndex = 0;
    let sessionHistory = [];
    let userProgress = {};
    let currentIndustry = 'all';
    
    // Industry colors mapping
    const industryColors = {
        ib: 'var(--industry-ib)',
        am: 'var(--industry-am)',
        quant: 'var(--industry-quant)',
        markets: 'var(--industry-markets)',
        risk: 'var(--industry-risk)',
        corpfin: 'var(--industry-corpfin)',
        fintech: 'var(--industry-fintech)',
        fo: 'var(--industry-fo)',
        general: 'var(--text-secondary)',
        pe: 'var(--industry-quant)' // Using quant color for PE for now
    };
    
    // Industry names mapping
    const industryNames = {
        ib: 'Investment Banking',
        am: 'Asset Management',
        quant: 'Quantitative Finance',
        markets: 'Sales & Trading',
        risk: 'Risk Management',
        corpfin: 'Corporate Finance',
        fintech: 'FinTech',
        fo: 'Family Office',
        general: 'General Finance',
        pe: 'Private Equity'
    };
    
    // Initialize flashcard mode
    function initFlashcards() {
        // Load questions
        if (window.questionBank && Array.isArray(window.questionBank)) {
            allQuestions = window.questionBank;
            console.log(`Loaded ${allQuestions.length} questions for flashcards`);
        } else {
            console.error('Question bank not available');
            showError('Question data not loaded. Please refresh the page.');
            return;
        }
        
        // Load user progress
        loadUserProgress();
        
        // Initialize industry selector
        initIndustrySelector();
        
        // Filter questions for current industry
        filterQuestions();
        
        // Update statistics
        updateStatistics();
        
        // Display first question
        if (filteredQuestions.length > 0) {
            displayQuestion(currentIndex);
        } else {
            showNoQuestions();
        }
        
        // Set up event listeners
        setupEventListeners();
    }
    
    // Initialize industry selector
    function initIndustrySelector() {
        // Get unique industries from questions
        const industries = [...new Set(allQuestions.map(q => q.role))];
        
        // Create industry tags (excluding 'all' which is already there)
        industries.forEach(industry => {
            if (industryNames[industry]) {
                const tag = document.createElement('div');
                tag.className = 'industry-tag';
                tag.textContent = industryNames[industry];
                tag.dataset.industry = industry;
                tag.style.backgroundColor = industryColors[industry] || 'var(--text-secondary)';
                tag.style.color = '#ffffff';
                
                tag.addEventListener('click', () => {
                    // Update active tag
                    document.querySelectorAll('.industry-tag').forEach(t => {
                        t.classList.remove('active');
                    });
                    tag.classList.add('active');
                    
                    // Update current industry
                    currentIndustry = industry;
                    
                    // Filter questions
                    filterQuestions();
                    
                    // Reset index
                    currentIndex = 0;
                    
                    // Display first question
                    if (filteredQuestions.length > 0) {
                        displayQuestion(currentIndex);
                    } else {
                        showNoQuestions();
                    }
                    
                    // Update statistics
                    updateStatistics();
                });
                
                industrySelector.appendChild(tag);
            }
        });
        
        // Set up 'all' industry click
        const allTag = industrySelector.querySelector('.industry-tag[data-industry="all"]');
        if (allTag) {
            allTag.addEventListener('click', () => {
                currentIndustry = 'all';
                filterQuestions();
                currentIndex = 0;
                if (filteredQuestions.length > 0) {
                    displayQuestion(currentIndex);
                } else {
                    showNoQuestions();
                }
                updateStatistics();
            });
        }
    }
    
    // Filter questions by current industry
    function filterQuestions() {
        if (currentIndustry === 'all') {
            filteredQuestions = [...allQuestions];
        } else {
            filteredQuestions = allQuestions.filter(q => q.role === currentIndustry);
        }
        
        // Shuffle questions initially
        shuffleQuestions();
    }
    
    // Shuffle questions
    function shuffleQuestions() {
        for (let i = filteredQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
        }
    }
    
    // Load user progress from localStorage
    function loadUserProgress() {
        const progressJson = localStorage.getItem('finterview_flashcard_progress');
        if (progressJson) {
            try {
                userProgress = JSON.parse(progressJson);
            } catch (e) {
                console.error('Error parsing progress data:', e);
                userProgress = {};
            }
        }
    }
    
    // Save user progress to localStorage
    function saveUserProgress() {
        localStorage.setItem('finterview_flashcard_progress', JSON.stringify(userProgress));
    }
    
    // Display question at index
    function displayQuestion(index) {
        if (index < 0 || index >= filteredQuestions.length) {
            return;
        }
        
        const question = filteredQuestions[index];
        
        // Update question display
        flashcardQuestion.textContent = question.question;
        
        // Update industry badge
        const industryName = industryNames[question.role] || question.role;
        const industryColor = industryColors[question.role] || 'var(--text-secondary)';
        flashcardIndustry.textContent = industryName;
        flashcardIndustry.style.backgroundColor = industryColor;
        
        // Update difficulty badge
        flashcardDifficulty.textContent = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
        flashcardDifficulty.className = `flashcard-difficulty difficulty-${question.difficulty}`;
        
        // Update answer (truncate if too long)
        const answer = question.modelAnswer || 'No answer available.';
        const maxLength = 1500;
        const displayAnswer = answer.length > maxLength ? 
            answer.substring(0, maxLength) + '...' : answer;
        flashcardAnswer.textContent = displayAnswer;
        
        // Reset card to front
        flashcard.classList.remove('flipped');
        ratingControls.style.display = 'none';
        
        // Update progress display
        updateProgressDisplay();
    }
    
    // Show no questions message
    function showNoQuestions() {
        flashcardQuestion.textContent = 'No questions available for the selected industry.';
        flashcardIndustry.textContent = 'None';
        flashcardDifficulty.textContent = 'N/A';
        flashcardAnswer.textContent = 'Try selecting a different industry.';
        flashcardIndustry.style.backgroundColor = 'var(--text-secondary)';
        flashcardDifficulty.className = 'flashcard-difficulty difficulty-medium';
    }
    
    // Show error message
    function showError(message) {
        flashcardQuestion.textContent = 'Error';
        flashcardIndustry.textContent = 'Error';
        flashcardDifficulty.textContent = 'Error';
        flashcardAnswer.textContent = message;
    }
    
    // Update progress display
    function updateProgressDisplay() {
        const progress = filteredQuestions.length > 0 ? 
            Math.round(((currentIndex + 1) / filteredQuestions.length) * 100) : 0;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${currentIndex + 1}/${filteredQuestions.length}`;
    }
    
    // Update statistics
    function updateStatistics() {
        // Total cards
        totalCardsEl.textContent = filteredQuestions.length;
        
        // Reviewed cards (from progress data)
        const reviewed = Object.keys(userProgress).length;
        reviewedCardsEl.textContent = reviewed;
        
        // Mastery rate (simplified)
        const masteryRate = filteredQuestions.length > 0 ? 
            Math.round((reviewed / filteredQuestions.length) * 100) : 0;
        masteryRateEl.textContent = `${masteryRate}%`;
    }
    
    // Handle rating
    function handleRating(rating) {
        if (currentIndex >= filteredQuestions.length) return;
        
        const question = filteredQuestions[currentIndex];
        const questionId = question.id;
        
        // Update user progress
        userProgress[questionId] = {
            rating: rating,
            lastReviewed: Date.now(),
            nextReview: calculateNextReview(rating)
        };
        
        // Save progress
        saveUserProgress();
        
        // Add to session history
        sessionHistory.push({
            questionId: questionId,
            rating: rating,
            timestamp: Date.now()
        });
        
        // Move to next question
        currentIndex++;
        
        if (currentIndex < filteredQuestions.length) {
            displayQuestion(currentIndex);
        } else {
            // End of session
            showSessionComplete();
        }
        
        // Update statistics
        updateStatistics();
    }
    
    // Calculate next review time based on rating
    function calculateNextReview(rating) {
        const now = Date.now();
        const dayMs = 24 * 60 * 60 * 1000;
        
        switch (rating) {
            case 'easy':
                return now + (7 * dayMs); // Review in 7 days
            case 'medium':
                return now + (3 * dayMs); // Review in 3 days
            case 'hard':
                return now + (1 * dayMs); // Review in 1 day
            default:
                return now + dayMs;
        }
    }
    
    // Show session complete message
    function showSessionComplete() {
        flashcardQuestion.textContent = 'Session Complete!';
        flashcardIndustry.textContent = 'Well Done';
        flashcardDifficulty.textContent = 'Complete';
        flashcardAnswer.textContent = `You've reviewed ${sessionHistory.length} questions in this session. Great job!`;
        
        flashcardIndustry.style.backgroundColor = 'var(--success-color)';
        flashcardDifficulty.className = 'flashcard-difficulty difficulty-easy';
        
        ratingControls.style.display = 'none';
        progressFill.style.width = '100%';
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Flip card on click
        if (flashcard) {
            flashcard.addEventListener('click', () => {
                flashcard.classList.toggle('flipped');
                
                // Show rating controls when card is flipped to back
                if (flashcard.classList.contains('flipped')) {
                    ratingControls.style.display = 'flex';
                } else {
                    ratingControls.style.display = 'none';
                }
            });
        }
        
        // Rating buttons
        ratingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rating = e.currentTarget.dataset.rating;
                handleRating(rating);
            });
        });
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    displayQuestion(currentIndex);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < filteredQuestions.length - 1) {
                    currentIndex++;
                    displayQuestion(currentIndex);
                } else {
                    // End of session
                    showSessionComplete();
                }
            });
        }
        
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                shuffleQuestions();
                currentIndex = 0;
                displayQuestion(currentIndex);
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                // Reset session (not progress)
                currentIndex = 0;
                sessionHistory = [];
                shuffleQuestions();
                displayQuestion(currentIndex);
                updateStatistics();
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                // Space to flip card
                e.preventDefault();
                flashcard.classList.toggle('flipped');
                
                if (flashcard.classList.contains('flipped')) {
                    ratingControls.style.display = 'flex';
                } else {
                    ratingControls.style.display = 'none';
                }
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                // Left arrow for previous
                currentIndex--;
                displayQuestion(currentIndex);
            } else if (e.key === 'ArrowRight' && currentIndex < filteredQuestions.length - 1) {
                // Right arrow for next
                currentIndex++;
                displayQuestion(currentIndex);
            } else if (e.key === '1' || e.key === '2' || e.key === '3') {
                // Number keys for rating
                if (flashcard.classList.contains('flipped')) {
                    const ratings = { '1': 'hard', '2': 'medium', '3': 'easy' };
                    handleRating(ratings[e.key]);
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFlashcards);
    } else {
        initFlashcards();
    }
    
    // Make functions available globally
    window.finterviewFlashcards = {
        init: initFlashcards,
        shuffle: shuffleQuestions,
        resetSession: () => {
            currentIndex = 0;
            sessionHistory = [];
            shuffleQuestions();
            displayQuestion(currentIndex);
            updateStatistics();
        }
    };
    
})();