/* finterview 新UI - 筛选功能模块 */

// 筛选系统类
class FilterSystem {
    constructor() {
        this.filters = {
            stars: null,        // 最小星级（1-5）或 null 表示全部
            types: [],          // 题目类型数组 ['technical', 'behavioral', ...]
            difficulties: [],   // 难度数组 ['easy', 'medium', 'hard']
            tags: [],           // 标签数组 ['frequent', 'understanding', ...]
            sortBy: 'rating'    // 排序方式：'rating', 'difficulty', 'popularity'
        };
        
        this.questions = [];    // 当前显示的题目数据
        this.filteredQuestions = []; // 筛选后的题目数据
        
        this.init();
    }
    
    // 初始化
    init() {
        console.log('筛选系统初始化...');
        
        // 绑定UI事件
        this.bindUIEvents();
        
        // 加载题目数据
        this.loadQuestions();
        
        // 应用初始筛选
        this.applyFilters();
    }
    
    // 绑定UI事件
    bindUIEvents() {
        // 星级筛选按钮
        document.querySelectorAll('.star-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.handleStarFilter(e.target);
            });
        });
        
        // 类型筛选复选框
        document.querySelectorAll('input[name="type"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.handleTypeFilter();
            });
        });
        
        // 难度筛选复选框
        document.querySelectorAll('input[name="difficulty"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.handleDifficultyFilter();
            });
        });
        
        // 标签筛选按钮
        document.querySelectorAll('.tag-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleTagFilter(e.target);
            });
        });
        
        // 排序单选按钮
        document.querySelectorAll('input[name="sort"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.handleSortChange(e.target);
            });
        });
        
        // 清除筛选按钮
        const clearButton = document.getElementById('clearFilters');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.clearFilters();
            });
        }
        
        // 移动端筛选切换
        const filterToggle = document.getElementById('mobileFilterToggle');
        if (filterToggle) {
            filterToggle.addEventListener('click', () => {
                this.toggleMobileFilters();
            });
        }
    }
    
    // 处理星级筛选
    handleStarFilter(element) {
        // 移除所有按钮的active类
        document.querySelectorAll('.star-option').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 为当前按钮添加active类
        element.classList.add('active');
        
        // 获取筛选值
        const starsValue = element.getAttribute('data-stars');
        
        if (starsValue === 'all') {
            this.filters.stars = null;
        } else {
            this.filters.stars = parseInt(starsValue);
        }
        
        // 应用筛选
        this.applyFilters();
    }
    
    // 处理类型筛选
    handleTypeFilter() {
        const selectedTypes = [];
        
        document.querySelectorAll('input[name="type"]:checked').forEach(checkbox => {
            selectedTypes.push(checkbox.value);
        });
        
        this.filters.types = selectedTypes;
        this.applyFilters();
    }
    
    // 处理难度筛选
    handleDifficultyFilter() {
        const selectedDifficulties = [];
        
        document.querySelectorAll('input[name="difficulty"]:checked').forEach(checkbox => {
            selectedDifficulties.push(checkbox.value);
        });
        
        this.filters.difficulties = selectedDifficulties;
        this.applyFilters();
    }
    
    // 处理标签筛选
    handleTagFilter(element) {
        // 切换按钮的active状态
        element.classList.toggle('active');
        
        const selectedTags = [];
        
        document.querySelectorAll('.tag-btn.active').forEach(btn => {
            selectedTags.push(btn.getAttribute('data-tag'));
        });
        
        this.filters.tags = selectedTags;
        this.applyFilters();
    }
    
    // 处理排序变化
    handleSortChange(element) {
        this.filters.sortBy = element.value;
        this.applyFilters();
    }
    
    // 加载题目数据
    loadQuestions() {
        // 从URL获取当前行业ID
        const urlParams = new URLSearchParams(window.location.search);
        const industryId = urlParams.get('industry') || 'ib';
        
        // 尝试从DataLoader获取题目数据
        if (typeof DataLoader !== 'undefined' && DataLoader.getStatus().isInitialized) {
            this.questions = DataLoader.getQuestionsByIndustry(industryId);
            console.log(`[FilterSystem] 加载 ${this.questions.length} 道题目，行业: ${industryId}`);
        } else {
            console.warn('[FilterSystem] DataLoader未初始化，使用空题目数组');
            this.questions = [];
        }
    }
    
    // 应用筛选
    applyFilters() {
        console.log('应用筛选条件:', this.filters);
        
        // 筛选题目
        this.filteredQuestions = this.questions.filter(question => {
            return this.passesFilters(question);
        });
        
        // 排序题目
        this.sortQuestions();
        
        // 更新UI
        this.updateUI();
    }
    
    // 检查题目是否通过筛选
    passesFilters(question) {
        // 星级筛选
        if (this.filters.stars !== null && question.overallRating < this.filters.stars) {
            return false;
        }
        
        // 类型筛选 - 使用category字段（与questions.js一致）
        const questionType = question.category || question.type;
        if (this.filters.types.length > 0 && !this.filters.types.includes(questionType)) {
            return false;
        }
        
        // 难度筛选
        if (this.filters.difficulties.length > 0 && !this.filters.difficulties.includes(question.difficulty)) {
            return false;
        }
        
        // 标签筛选
        if (this.filters.tags.length > 0) {
            const hasTag = this.filters.tags.some(tag => question.tags.includes(tag));
            if (!hasTag) {
                return false;
            }
        }
        
        return true;
    }
    
    // 排序题目
    sortQuestions() {
        switch (this.filters.sortBy) {
            case 'rating':
                this.filteredQuestions.sort((a, b) => b.overallRating - a.overallRating);
                break;
                
            case 'difficulty':
                const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
                this.filteredQuestions.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
                break;
                
            case 'popularity':
                // 假设标签中包含'frequent'表示高频题
                this.filteredQuestions.sort((a, b) => {
                    const aIsFrequent = a.tags.includes('frequent') ? 1 : 0;
                    const bIsFrequent = b.tags.includes('frequent') ? 1 : 0;
                    return bIsFrequent - aIsFrequent || b.overallRating - a.overallRating;
                });
                break;
                
            default:
                this.filteredQuestions.sort((a, b) => b.overallRating - a.overallRating);
        }
    }
    
    // 更新UI
    updateUI() {
        // 更新结果计数
        this.updateResultCount();
        
        // 渲染题目卡片
        this.renderQuestionCards();
        
        // 更新筛选状态指示器
        this.updateFilterIndicators();
    }
    
    // 更新结果计数
    updateResultCount() {
        const resultCountElement = document.getElementById('resultCount');
        const totalCountElement = document.getElementById('totalCount');
        
        if (resultCountElement) {
            resultCountElement.textContent = this.filteredQuestions.length;
        }
        
        if (totalCountElement) {
            totalCountElement.textContent = this.questions.length;
        }
    }
    
    // 渲染题目卡片
    renderQuestionCards() {
        const questionGrid = document.getElementById('questionGrid');
        if (!questionGrid) return;
        
        // 清空现有卡片
        questionGrid.innerHTML = '';
        
        // 渲染筛选后的题目
        this.filteredQuestions.forEach(question => {
            const card = this.createQuestionCard(question);
            questionGrid.appendChild(card);
        });
        
        // 如果没有题目匹配筛选条件
        if (this.filteredQuestions.length === 0) {
            this.showNoResultsMessage();
        }
    }
    
    // 创建题目卡片
    createQuestionCard(question) {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.setAttribute('data-id', question.id);
        
        // 生成标签HTML
        const tagsHTML = this.generateTagsHTML(question);
        
        // 生成难度星级
        const difficultyStars = this.generateDifficultyStars(question.difficulty);
        const difficultyText = this.getDifficultyText(question.difficulty);
        
        // 生成综合评分星级
        const overallStars = this.generateStars(question.overallRating);
        
        // 生成维度评分
        const dimensionRatingsHTML = this.generateDimensionRatingsHTML(question.dimensionRatings);
        
        card.innerHTML = `
            <div class="question-header">
                <h4 class="question-title">${question.title}</h4>
                <div class="question-tags">
                    ${tagsHTML}
                </div>
            </div>
            
            <div class="question-meta">
                <div class="difficulty">
                    <span class="label">难度:</span>
                    <span class="stars">${difficultyStars}</span>
                    <span class="text">${difficultyText}</span>
                </div>
                <div class="overall-rating">
                    <span class="label">综合评分:</span>
                    <span class="stars">${overallStars}</span>
                    <span class="score">${question.overallRating.toFixed(1)}/5.0</span>
                </div>
            </div>
            
            <div class="dimension-ratings">
                ${dimensionRatingsHTML}
            </div>
            
            <div class="question-actions">
                <button class="btn btn-view">查看详情</button>
                <button class="btn btn-practice">开始练习</button>
            </div>
        `;
        
        // 绑定事件
        this.bindQuestionCardEvents(card);
        
        return card;
    }
    
    // 生成标签HTML
    generateTagsHTML(question) {
        const typeMap = {
            'technical': { class: 'technical', text: '技术题' },
            'behavioral': { class: 'behavioral', text: '行为题' },
            'case': { class: 'case-study', text: '案例分析' },
            'market': { class: 'market', text: '市场题' }
        };
        
        const tagMap = {
            'frequent': { class: 'frequent', text: '高频题' },
            'understanding': { class: 'understanding', text: '理解题' },
            'calculation': { class: 'calculation', text: '计算题' },
            'concept': { class: 'concept', text: '概念题' }
        };
        
        let html = '';
        
        // 添加类型标签 - 使用category字段（与questions.js一致）
        const questionType = question.category || question.type || 'technical';
        const typeInfo = typeMap[questionType];
        if (typeInfo) {
            html += `<span class="tag ${typeInfo.class}">${typeInfo.text}</span>`;
        }
        
        // 添加其他标签
        if (question.tags && Array.isArray(question.tags)) {
            question.tags.forEach(tag => {
                const tagInfo = tagMap[tag];
                if (tagInfo) {
                    html += `<span class="tag ${tagInfo.class}">${tagInfo.text}</span>`;
                }
            });
        }
        
        return html;
    }
    
    // 生成难度星级
    generateDifficultyStars(difficulty) {
        const difficultyLevels = {
            'easy': 2,
            'medium': 3,
            'hard': 5
        };
        
        const level = difficultyLevels[difficulty] || 3;
        return this.generateStars(level);
    }
    
    // 获取难度文本
    getDifficultyText(difficulty) {
        const textMap = {
            'easy': '简单',
            'medium': '中等',
            'hard': '困难'
        };
        
        return textMap[difficulty] || '中等';
    }
    
    // 生成维度评分HTML
    generateDimensionRatingsHTML(dimensionRatings) {
        let html = '';
        
        if (dimensionRatings.contentAccuracy !== undefined) {
            html += `
                <div class="dimension">
                    <span class="dimension-name">内容准确性:</span>
                    <span class="dimension-stars">${this.generateStars(dimensionRatings.contentAccuracy)}</span>
                </div>
            `;
        }
        
        if (dimensionRatings.structureClarity !== undefined) {
            html += `
                <div class="dimension">
                    <span class="dimension-name">结构清晰度:</span>
                    <span class="dimension-stars">${this.generateStars(dimensionRatings.structureClarity)}</span>
                </div>
            `;
        }
        
        if (dimensionRatings.roleRelevance !== undefined) {
            html += `
                <div class="dimension">
                    <span class="dimension-name">职位相关性:</span>
                    <span class="dimension-stars">${this.generateStars(dimensionRatings.roleRelevance)}</span>
                </div>
            `;
        }
        
        return html;
    }
    
    // 生成星级HTML
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // 添加实心星
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        
        // 添加半星
        if (hasHalfStar) {
            stars += '★';
        }
        
        // 添加空心星
        for (let i = 0; i < emptyStars; i++) {
            stars += '☆';
        }
        
        return stars;
    }
    
    // 绑定题目卡片事件
    bindQuestionCardEvents(card) {
        const viewButton = card.querySelector('.btn-view');
        const practiceButton = card.querySelector('.btn-practice');
        
        if (viewButton) {
            viewButton.addEventListener('click', () => {
                const questionId = card.getAttribute('data-id');
                this.viewQuestionDetails(questionId);
            });
        }
        
        if (practiceButton) {
            practiceButton.addEventListener('click', () => {
                const questionId = card.getAttribute('data-id');
                this.startPractice(questionId);
            });
        }
    }
    
    // 查看题目详情
    viewQuestionDetails(questionId) {
        console.log(`查看题目 ${questionId} 的详情...`);
        alert(`查看题目 ${questionId} 的详情（功能开发中）`);
    }
    
    // 开始练习
    startPractice(questionId) {
        console.log(`开始练习题目 ${questionId}...`);
        alert(`开始练习题目 ${questionId}（功能开发中）`);
    }
    
    // 显示无结果消息
    showNoResultsMessage() {
        const questionGrid = document.getElementById('questionGrid');
        if (!questionGrid) return;
        
        const message = document.createElement('div');
        message.className = 'no-results text-center py-8';
        message.innerHTML = `
            <div class="text-5xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold mb-2">没有找到匹配的题目</h3>
            <p class="text-secondary mb-4">请尝试调整筛选条件</p>
            <button class="btn btn-primary" id="clearFiltersBtn">清除所有筛选</button>
        `;
        
        questionGrid.appendChild(message);
        
        // 绑定清除筛选按钮事件
        const clearButton = document.getElementById('clearFiltersBtn');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.clearFilters();
            });
        }
    }
    
    // 更新筛选状态指示器
    updateFilterIndicators() {
        // 这里可以添加筛选状态指示器逻辑
        // 例如：显示当前激活的筛选条件数量
        const activeFilterCount = this.countActiveFilters();
        
        // 可以在UI上显示筛选器数量
        const filterToggle = document.getElementById('mobileFilterToggle');
        if (filterToggle && activeFilterCount > 0) {
            filterToggle.innerHTML = `<i class="fas fa-filter"></i> 筛选 (${activeFilterCount})`;
        }
    }
    
    // 计算活跃筛选条件数量
    countActiveFilters() {
        let count = 0;
        
        if (this.filters.stars !== null) count++;
        if (this.filters.types.length > 0) count++;
        if (this.filters.difficulties.length > 0) count++;
        if (this.filters.tags.length > 0) count++;
        
        return count;
    }
    
    // 清除所有筛选
    clearFilters() {
        console.log('清除所有筛选条件');
        
        // 重置筛选对象
        this.filters = {
            stars: null,
            types: [],
            difficulties: [],
            tags: [],
            sortBy: 'rating'
        };
        
        // 重置UI状态
        this.resetUIState();
        
        // 应用筛选（实际上是清除筛选）
        this.applyFilters();
    }
    
    // 重置UI状态
    resetUIState() {
        // 星级筛选
        document.querySelectorAll('.star-option').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const allOption = document.querySelector('.star-option[data-stars="all"]');
        if (allOption) {
            allOption.classList.add('active');
        }
        
        // 类型筛选
        document.querySelectorAll('input[name="type"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // 难度筛选
        document.querySelectorAll('input[name="difficulty"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // 标签筛选
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 排序
        document.querySelectorAll('input[name="sort"]').forEach(radio => {
            radio.checked = radio.value === 'rating';
        });
        
        // 更新移动端筛选按钮
        const filterToggle = document.getElementById('mobileFilterToggle');
        if (filterToggle) {
            filterToggle.innerHTML = `<i class="fas fa-filter"></i> 筛选`;
        }
    }
    
    // 切换移动端筛选面板
    toggleMobileFilters() {
        const filterPanel = document.querySelector('.filter-panel');
        const overlay = document.getElementById('filterOverlay');
        
        if (filterPanel && overlay) {
            filterPanel.classList.toggle('open');
            overlay.classList.toggle('open');
            
            // 点击遮罩层关闭筛选面板
            overlay.addEventListener('click', () => {
                filterPanel.classList.remove('open');
                overlay.classList.remove('open');
            });
        }
    }
}

// 页面加载完成后初始化筛选系统
document.addEventListener('DOMContentLoaded', () => {
    // 仅在有筛选面板的页面上初始化
    if (document.querySelector('.filter-panel')) {
        window.filterSystem = new FilterSystem();
    }
});