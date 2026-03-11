/* finterview New UI - Main Logic Module */

// Initialization function
function init() {
    console.log('finterview UI 初始化...');
    
    // Check page type and perform corresponding initialization
    if (document.querySelector('.industry-grid')) {
        initHomePage();
    }
    
    if (document.querySelector('.question-grid')) {
        initIndustryPage();
    }
    
    // Initialize common components
    initCommonComponents();
    
    // Load data
    loadData();
}

// 主页初始化
function initHomePage() {
    console.log('初始化主页...');
    
    // 获取行业网格容器
    const industryGrid = document.getElementById('industryGrid');
    if (!industryGrid) return;
    
    // 显示加载状态
    industryGrid.innerHTML = '<div class="loading-state"><i class="fas fa-spinner fa-spin"></i> Loading industry data...</div>';
    
    // 加载行业数据
    DataLoader.init()
        .then(() => {
            const industries = DataLoader.getIndustries();
            const stats = DataLoader.getGlobalStats();
            
            // 清空容器
            industryGrid.innerHTML = '';
            
            // 渲染行业卡片
            industries.forEach(industry => {
                const card = createIndustryCard(industry);
                industryGrid.appendChild(card);
            });
            
            // 更新行业计数
            const industryCountElement = document.getElementById('industryCount');
            if (industryCountElement) {
                industryCountElement.textContent = industries.length;
            }
            
            // 更新题目总数
            const questionCountElement = document.getElementById('totalQuestionCount');
            if (questionCountElement && stats.totalQuestions) {
                questionCountElement.textContent = stats.totalQuestions;
            }
            
            // 绑定行业卡片点击事件
            document.querySelectorAll('.industry-card').forEach(card => {
                card.addEventListener('click', function() {
                    const industryId = this.getAttribute('data-industry');
                    navigateToIndustry(industryId);
                });
            });
            
            console.log(`主页加载完成: ${industries.length}个行业, ${stats.totalQuestions}题`);
        })
        .catch(error => {
            console.error('加载行业数据失败:', error);
            industryGrid.innerHTML = '<div class="error-state"><i class="fas fa-exclamation-triangle"></i> Loading failed, please refresh the page and try again</div>';
        });
}

// 创建行业卡片
function createIndustryCard(industry) {
    const card = document.createElement('div');
    card.className = 'industry-card';
    card.setAttribute('data-industry', industry.id);
    
    // 生成星级HTML
    const stars = generateStars(industry.avgRating);
    
    card.innerHTML = `
        <div class="industry-icon">
            <i class="fas fa-${industry.icon}"></i>
        </div>
        <h4 class="industry-name">${industry.name}</h4>
        <p class="industry-en">${industry.enName}</p>
        <div class="industry-rating">
            <span class="stars">${stars}</span>
            <span class="rating-text">${industry.avgRating.toFixed(1)}/5.0</span>
        </div>
        <div class="question-count">${industry.questionCount}题</div>
    `;
    
    return card;
}

// 行业页面初始化
function initIndustryPage() {
    console.log('初始化行业页面...');
    
    // 从URL获取行业ID
    const urlParams = new URLSearchParams(window.location.search);
    const industryId = urlParams.get('industry') || 'ib';
    
    // 设置页面标题
    setIndustryPageTitle(industryId);
    
    // 绑定筛选器事件
    bindFilterEvents();
    
    // 加载行业题目
    loadIndustryQuestions(industryId);
}

// 设置行业页面标题
function setIndustryPageTitle(industryId) {
    // 尝试从DataLoader获取行业信息
    let industryName = '投资银行';
    let industryEnName = 'Investment Banking';
    
    // 如果DataLoader已初始化，尝试获取行业数据
    if (typeof DataLoader !== 'undefined') {
        const industries = DataLoader.getIndustries();
        const found = industries.find(ind => ind.id === industryId);
        if (found) {
            industryName = found.name;
            industryEnName = found.enName;
        }
    } else {
        // 后备映射（基于questions.js的roles）
        const industryMap = {
            'ib': { name: '投资银行', enName: 'Investment Banking' },
            'markets': { name: '销售交易', enName: 'Sales & Trading' },
            'quant': { name: '量化金融', enName: 'Quantitative Finance' },
            'am': { name: '资产管理', enName: 'Asset Management' },
            'corpfin': { name: '公司金融', enName: 'Corporate Finance' },
            'risk': { name: '风险管理', enName: 'Risk Management' },
            'fintech': { name: '金融科技', enName: 'FinTech' },
            'fo': { name: '家族办公室', enName: 'Family Office / PWM' },
            'all': { name: '所有行业', enName: 'All Roles' }
        };
        
        const industry = industryMap[industryId] || industryMap['ib'];
        industryName = industry.name;
        industryEnName = industry.enName;
    }
    
    const titleElement = document.getElementById('industryTitle');
    if (titleElement) {
        titleElement.textContent = `${industryName} (${industryEnName}) 题库`;
    }
}

// 加载行业题目
function loadIndustryQuestions(industryId) {
    console.log(`加载行业 ${industryId} 的题目...`);
    
    // 获取问题网格容器
    const questionGrid = document.getElementById('questionGrid');
    if (!questionGrid) return;
    
    // 显示加载状态
    questionGrid.innerHTML = '<div class="loading-state"><i class="fas fa-spinner fa-spin"></i> Loading questions...</div>';
    
    // Load data
    DataLoader.init()
        .then(() => {
            const questions = DataLoader.getQuestionsByIndustry(industryId);
            
            // 渲染题目卡片
            renderQuestionCards(questions);
            
            // 更新统计数据
            updateQuestionStats(questions.length, questions.length);
            
            console.log(`行业 ${industryId} 题目加载完成: ${questions.length}题`);
        })
        .catch(error => {
            console.error('加载题目失败:', error);
            questionGrid.innerHTML = '<div class="error-state"><i class="fas fa-exclamation-triangle"></i> Loading failed, please refresh the page and try again</div>';
        });
}

// 渲染题目卡片
function renderQuestionCards(questions) {
    const questionGrid = document.getElementById('questionGrid');
    if (!questionGrid) return;
    
    // 清空现有卡片
    questionGrid.innerHTML = '';
    
    // 渲染每个题目
    questions.forEach(question => {
        const card = createQuestionCard(question);
        questionGrid.appendChild(card);
    });
    
    // 绑定题目卡片事件
    bindQuestionCardEvents();
}

// 创建题目卡片
function createQuestionCard(question) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.setAttribute('data-id', question.id);
    
    // 生成标签HTML
    const tagsHTML = generateTagsHTML(question);
    
    // 生成难度星级
    const difficultyStars = generateDifficultyStars(question.difficulty);
    const difficultyText = getDifficultyText(question.difficulty);
    
    // 生成综合评分星级
    const overallStars = generateStars(question.overallRating);
    
    // 生成维度评分
    const dimensionRatingsHTML = generateDimensionRatingsHTML(question.dimensionRatings);
    
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
    
    return card;
}

// 生成标签HTML
function generateTagsHTML(question) {
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
    const category = question.category || question.type || 'technical';
    const typeInfo = typeMap[category];
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
function generateDifficultyStars(difficulty) {
    const difficultyLevels = {
        'easy': 2,
        'medium': 3,
        'hard': 5
    };
    
    const level = difficultyLevels[difficulty] || 3;
    return generateStars(level);
}

// 获取难度文本
function getDifficultyText(difficulty) {
    const textMap = {
        'easy': '简单',
        'medium': '中等',
        'hard': '困难'
    };
    
    return textMap[difficulty] || '中等';
}

// 生成维度评分HTML
function generateDimensionRatingsHTML(dimensionRatings) {
    let html = '';
    
    if (dimensionRatings.contentAccuracy !== undefined) {
        html += `
            <div class="dimension">
                <span class="dimension-name">内容准确性:</span>
                <span class="dimension-stars">${generateStars(dimensionRatings.contentAccuracy)}</span>
            </div>
        `;
    }
    
    if (dimensionRatings.structureClarity !== undefined) {
        html += `
            <div class="dimension">
                <span class="dimension-name">结构清晰度:</span>
                <span class="dimension-stars">${generateStars(dimensionRatings.structureClarity)}</span>
            </div>
        `;
    }
    
    if (dimensionRatings.roleRelevance !== undefined) {
        html += `
            <div class="dimension">
                <span class="dimension-name">职位相关性:</span>
                <span class="dimension-stars">${generateStars(dimensionRatings.roleRelevance)}</span>
            </div>
        `;
    }
    
    return html;
}

// 生成星级HTML
function generateStars(rating) {
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

// 绑定筛选器事件
function bindFilterEvents() {
    // 星级筛选
    document.querySelectorAll('.star-option').forEach(option => {
        option.addEventListener('click', function() {
            // 移除其他选项的active类
            document.querySelectorAll('.star-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // 添加当前选项的active类
            this.classList.add('active');
            
            // 应用筛选
            applyFilters();
        });
    });
    
    // 清除筛选按钮
    const clearButton = document.getElementById('clearFilters');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            clearFilters();
        });
    }
    
    // 标签筛选按钮
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            applyFilters();
        });
    });
    
    // 复选框筛选
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // 单选按钮排序
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });
}

// 应用筛选
function applyFilters() {
    console.log('应用筛选...');
    // 筛选逻辑将在filters.js中实现
}

// 清除筛选
function clearFilters() {
    console.log('清除所有筛选...');
    
    // 重置星级筛选
    document.querySelectorAll('.star-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // 激活"全部"选项
    const allOption = document.querySelector('.star-option[data-stars="all"]');
    if (allOption) {
        allOption.classList.add('active');
    }
    
    // 重置复选框
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // 重置标签按钮
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 重置单选按钮（默认选中第一个）
    const firstRadio = document.querySelector('input[type="radio"]');
    if (firstRadio) {
        firstRadio.checked = true;
    }
    
    // 重新应用筛选
    applyFilters();
}

// 绑定题目卡片事件
function bindQuestionCardEvents() {
    // 查看详情按钮
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.question-card');
            const questionId = card.getAttribute('data-id');
            viewQuestionDetails(questionId);
        });
    });
    
    // 开始练习按钮
    document.querySelectorAll('.btn-practice').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.question-card');
            const questionId = card.getAttribute('data-id');
            startPractice(questionId);
        });
    });
}

// 查看题目详情
function viewQuestionDetails(questionId) {
    console.log(`查看题目 ${questionId} 的详情...`);
    alert(`查看题目 ${questionId} 的详情（功能开发中）`);
}

// 开始练习
function startPractice(questionId) {
    console.log(`开始练习题目 ${questionId}...`);
    alert(`开始练习题目 ${questionId}（功能开发中）`);
}

// 导航到行业页面
function navigateToIndustry(industryId) {
    console.log(`导航到行业 ${industryId}...`);
    // 在实际应用中，这里应该跳转到行业页面
    window.location.href = `industry.html?industry=${industryId}`;
}

// 更新题目统计
function updateQuestionStats(displayed, total) {
    const resultCountElement = document.getElementById('resultCount');
    const totalCountElement = document.getElementById('totalCount');
    
    if (resultCountElement) {
        resultCountElement.textContent = displayed;
    }
    
    if (totalCountElement) {
        totalCountElement.textContent = total;
    }
}

// 初始化通用组件
function initCommonComponents() {
    console.log('初始化通用组件...');
    
    // 搜索功能
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// 执行搜索
function performSearch(query) {
    console.log(`执行搜索: ${query}`);
    if (query.trim()) {
        alert(`搜索: ${query}（功能开发中）`);
    }
}

// Load data
function loadData() {
    console.log('加载数据...');
    // 预加载数据（非阻塞）
    if (typeof DataLoader !== 'undefined') {
        DataLoader.init().catch(error => {
            console.warn('预加载数据失败:', error);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);