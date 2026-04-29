/**
 * 行业页面 - 简单直接的解决方案
 * 绕过复杂的DataLoader，直接从questions.js加载和显示题目
 */

(function() {
    'use strict';
    
    console.log('行业页面 - 简单解决方案初始化');
    
    // 等待DOM加载
    document.addEventListener('DOMContentLoaded', function() {
        initIndustryPageSimple();
    });
    
    function initIndustryPageSimple() {
        console.log('初始化行业页面（简单版）...');
        
        // 1. 获取URL参数
        const urlParams = new URLSearchParams(window.location.search);
        const industryId = urlParams.get('industry') || 'ib';
        console.log(`当前行业ID: ${industryId}`);
        
        // 2. 设置页面标题
        setPageTitle(industryId);
        
        // 3. 加载并显示题目
        loadAndDisplayQuestions(industryId);
        
        // 4. 绑定筛选器事件（简化版）
        bindSimpleFilters(industryId);
    }
    
    function setPageTitle(industryId) {
        // 简单的行业名称映射
        const industryNames = {
            'ib': { name: '投资银行', enName: 'Investment Banking' },
            'am': { name: '资产管理', enName: 'Asset Management' },
            'quant': { name: '量化金融', enName: 'Quantitative Finance' },
            'markets': { name: '销售交易', enName: 'Sales & Trading' },
            'corpfin': { name: '公司金融', enName: 'Corporate Finance' },
            'risk': { name: '风险管理', enName: 'Risk Management' },
            'fintech': { name: '金融科技', enName: 'FinTech' },
            'fo': { name: '家族办公室', enName: 'Family Office' }
        };
        
        const industry = industryNames[industryId] || industryNames['ib'];
        
        // 更新标题元素
        const titleElement = document.getElementById('industryTitle');
        const statsElement = document.getElementById('industryStats');
        
        if (titleElement) {
            titleElement.textContent = `${industry.name} (${industry.enName}) Questions`;
        }
        
        if (statsElement) {
            statsElement.textContent = `Loading questions...`;
        }
    }
    
    function loadAndDisplayQuestions(industryId) {
        console.log(`加载行业 ${industryId} 的题目...`);
        
        const questionGrid = document.getElementById('questionGrid');
        if (!questionGrid) {
            console.error('找不到questionGrid元素');
            return;
        }
        
        // 显示加载状态
        questionGrid.innerHTML = '<div class="loading-state"><i class="fas fa-spinner fa-spin"></i> Loading questions...</div>';
        
        // 检查questions.js是否已加载
        if (typeof window.questionBank === 'undefined') {
            console.error('questionBank未定义，questions.js可能未加载');
            showError(questionGrid, 'Data not loaded. Please refresh the page.');
            return;
        }
        
        // 简单的过滤：按role字段筛选
        const allQuestions = window.questionBank;
        console.log(`总题目数: ${allQuestions.length}`);
        
        const industryQuestions = allQuestions.filter(q => {
            return q.role === industryId;
        });
        
        console.log(`行业 ${industryId} 题目数: ${industryQuestions.length}`);
        
        // 更新统计
        updateStats(industryQuestions.length, allQuestions.length);
        
        if (industryQuestions.length === 0) {
            showNoQuestions(questionGrid, industryId);
            return;
        }
        
        // 渲染题目
        renderQuestions(questionGrid, industryQuestions);
    }
    
    function updateStats(industryCount, totalCount) {
        const statsElement = document.getElementById('industryStats');
        if (statsElement) {
            statsElement.textContent = `Total ${industryCount} questions (${totalCount} in total database)`;
        }
    }
    
    function renderQuestions(container, questions) {
        console.log(`渲染 ${questions.length} 个题目`);
        
        // 清空容器
        container.innerHTML = '';
        
        // 渲染每个题目
        questions.forEach((question, index) => {
            const card = createQuestionCard(question, index + 1);
            container.appendChild(card);
        });
        
        // 绑定题目卡片事件
        bindQuestionCardEvents();
    }
    
    function createQuestionCard(question, index) {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.setAttribute('data-id', question.id || index);
        
        // 生成难度标签
        const difficulty = question.difficulty || 'medium';
        const difficultyText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        const difficultyColor = getDifficultyColor(difficulty);
        
        // 生成星级（如果有评分）
        const rating = question.metadata?.stars || question.overallRating || 4.0;
        const starsHTML = generateStarsHTML(rating);
        
        // 获取答案（支持多种格式）
        const answer = getQuestionAnswer(question);
        
        card.innerHTML = `
            <div class="question-header">
                <h4 class="question-title">${escapeHtml(question.title || `Question ${index}`)}</h4>
                <div class="question-tags">
                    <span class="tag ${question.category || 'technical'}">${question.category || 'technical'}</span>
                    <span class="tag difficulty" style="background: ${difficultyColor}">${difficultyText}</span>
                    ${question.frequencyScore ? `<span class="tag frequent">High Frequency</span>` : ''}
                </div>
            </div>
            
            <div class="question-content">
                <p>${escapeHtml(question.question || '')}</p>
            </div>
            
            <div class="question-meta">
                <div class="difficulty">
                    <span class="label">Difficulty:</span>
                    <span class="stars">${starsHTML}</span>
                    <span class="text">${difficultyText}</span>
                </div>
                <div class="overall-rating">
                    <span class="label">Rating:</span>
                    <span class="stars">${starsHTML}</span>
                    <span class="score">${rating.toFixed(1)}/5.0</span>
                </div>
            </div>
            
            <div class="question-answer" style="display: none;">
                <div class="answer-header">
                    <h5><i class="fas fa-lightbulb"></i> Answer</h5>
                </div>
                <div class="answer-content">
                    <p>${escapeHtml(answer)}</p>
                </div>
            </div>
            
            <div class="question-actions">
                <button class="btn btn-view" data-action="toggle-answer">
                    <i class="fas fa-eye"></i> Show Answer
                </button>
                <button class="btn btn-practice" data-action="practice">
                    <i class="fas fa-play"></i> Practice
                </button>
            </div>
        `;
        
        return card;
    }
    
    function getDifficultyColor(difficulty) {
        const colors = {
            easy: '#27ae60',
            medium: '#f39c12',
            hard: '#e74c3c'
        };
        return colors[difficulty] || '#f39c12';
    }
    
    function generateStarsHTML(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
        if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < emptyStars; i++) stars += '<i class="far fa-star"></i>';
        
        return stars;
    }
    
    function getQuestionAnswer(question) {
        // 支持多种答案格式
        if (question.answers) {
            if (question.answers.concise && question.answers.concise.answer) {
                return question.answers.concise.answer;
            }
            if (question.answers.detailed && question.answers.detailed.answer) {
                return question.answers.detailed.answer;
            }
        }
        
        if (question.conciseAnswer) {
            return question.conciseAnswer;
        }
        
        if (question.modelAnswer) {
            return question.modelAnswer;
        }
        
        if (question.answer) {
            return question.answer;
        }
        
        return 'No answer available.';
    }
    
    function bindQuestionCardEvents() {
        // 绑定"显示答案"按钮
        document.querySelectorAll('[data-action="toggle-answer"]').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.question-card');
                const answerSection = card.querySelector('.question-answer');
                const isVisible = answerSection.style.display !== 'none';
                
                answerSection.style.display = isVisible ? 'none' : 'block';
                this.innerHTML = isVisible ? 
                    '<i class="fas fa-eye"></i> Show Answer' : 
                    '<i class="fas fa-eye-slash"></i> Hide Answer';
            });
        });
        
        // 绑定"练习"按钮
        document.querySelectorAll('[data-action="practice"]').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.question-card');
                const questionId = card.getAttribute('data-id');
                alert(`Practice mode for question ${questionId} (coming soon)`);
            });
        });
    }
    
    function bindSimpleFilters(industryId) {
        // 简化筛选器绑定
        const clearButton = document.getElementById('clearFilters');
        if (clearButton) {
            clearButton.addEventListener('click', function() {
                loadAndDisplayQuestions(industryId);
            });
        }
        
        // 星级筛选
        document.querySelectorAll('.star-option').forEach(option => {
            option.addEventListener('click', function() {
                // 简化版本：重新加载所有题目
                loadAndDisplayQuestions(industryId);
            });
        });
        
        // 类型筛选
        document.querySelectorAll('input[name="type"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // 简化版本：重新加载所有题目
                loadAndDisplayQuestions(industryId);
            });
        });
    }
    
    function showError(container, message) {
        container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Questions</h3>
                <p>${escapeHtml(message)}</p>
                <button class="retry-btn" onclick="window.location.reload()">
                    <i class="fas fa-sync-alt"></i> Retry
                </button>
            </div>
        `;
    }
    
    function showNoQuestions(container, industryId) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No Questions Found</h3>
                <p>No questions available for ${industryId}.</p>
                <p>Try another industry or check back later.</p>
                <button class="back-btn" onclick="window.history.back()">
                    <i class="fas fa-arrow-left"></i> Back to Industries
                </button>
            </div>
        `;
    }
    
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // 全局导出（如果需要）
    window.IndustryPageSimple = {
        init: initIndustryPageSimple,
        reload: function() {
            const urlParams = new URLSearchParams(window.location.search);
            const industryId = urlParams.get('industry') || 'ib';
            loadAndDisplayQuestions(industryId);
        }
    };
    
})();