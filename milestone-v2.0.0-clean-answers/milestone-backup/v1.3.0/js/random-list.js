/**
 * 随机模式题目列表组件 - 使用真实数据
 * 从unified_questions.json加载，支持多维度筛选和排序
 */

// 配置
const CONFIG = {
    DATA_URL: 'questions.js', // 改为使用questions.js确保文件存在
    DEFAULT_SORT: 'star-desc'  // 默认按星级降序
};

// 行业映射
const INDUSTRY_MAP = {
    ib: '投资银行',
    am: '资产管理',
    quant: '量化金融',
    markets: '销售交易',
    corpfin: '公司金融',
    risk: '风险管理',
    fintech: '金融科技',
    fo: '家族办公室'
};

// 题型映射
const CATEGORY_MAP = {
    technical: '技术题',
    behavioral: '行为题',
    case: '案例分析',
    market: '市场题'
};

// 状态
let allQuestions = [];
let filteredQuestions = [];
let currentFilters = {
    star: 'all',      // 星级筛选
    type: 'all',      // 题型筛选
    difficulty: 'all', // 难度筛选
    tag: 'all',       // 标签筛选
    sort: CONFIG.DEFAULT_SORT
};

// DOM元素
const questionsGrid = document.getElementById('questionsGrid');
const resultsCount = document.getElementById('resultsCount');
const filterPanel = document.getElementById('filterPanel');
const mobileFilterToggle = document.getElementById('mobileFilterToggle');

// 筛选器元素
const starFilter = document.getElementById('starFilter');
const typeFilter = document.getElementById('typeFilter');
const difficultyFilter = document.getElementById('difficultyFilter');
const tagFilter = document.getElementById('tagFilter');
const sortSelect = document.getElementById('sortSelect');
const resetFiltersBtn = document.getElementById('resetFilters');

/**
 * 加载真实题目数据
 */
async function loadRealQuestions() {
    try {
        console.log('正在加载题目数据...', CONFIG.DATA_URL);
        
        // 检查是否已有全局questionBank（如果questions.js已加载）
        if (typeof window.questionBank !== 'undefined') {
            console.log('使用已加载的questionBank');
            return processQuestionBankForRandom(window.questionBank);
        }
        
        // 否则尝试加载数据文件
        const response = await fetch(CONFIG.DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const url = CONFIG.DATA_URL.toLowerCase();
        let questions = [];
        
        if (url.endsWith('.js')) {
            // 加载JavaScript文件 - 需要特殊处理
            const jsContent = await response.text();
            
            // 尝试从JS文件中提取questionBank
            if (jsContent.includes('const questionBank = [')) {
                // 简单提取 - 在实际应用中可能需要更复杂的解析
                console.log('检测到questions.js格式，尝试提取数据...');
                
                // 如果questions.js已经暴露了window.questionBank，应该已经在上面的检查中捕获
                // 如果没有，我们需要执行JS代码
                try {
                    // 创建一个script标签来执行JS
                    const script = document.createElement('script');
                    script.textContent = jsContent;
                    document.head.appendChild(script);
                    document.head.removeChild(script);
                    
                    // 现在检查是否有了questionBank
                    if (typeof window.questionBank !== 'undefined') {
                        return processQuestionBankForRandom(window.questionBank);
                    }
                } catch (jsError) {
                    console.warn('执行JS失败:', jsError);
                }
            }
            
            // 如果JS加载失败，使用模拟数据
            throw new Error('无法从JS文件提取题目数据');
            
        } else if (url.endsWith('.json')) {
            // 加载JSON文件
            const data = await response.json();
            
            // 检查数据结构
            if (data.questions && Array.isArray(data.questions)) {
                // unified_questions.json格式
                questions = data.questions.map(q => convertQuestionFormatForRandom(q));
            } else if (Array.isArray(data)) {
                // 直接是题目数组格式
                questions = data.map(q => convertQuestionFormatForRandom(q));
            } else {
                throw new Error('未知的JSON格式');
            }
        } else {
            throw new Error('不支持的文件格式');
        }
        
        allQuestions = questions;
        console.log(`成功加载 ${allQuestions.length} 道题目`);
        return allQuestions;
        
    } catch (error) {
        console.error('加载题目数据失败:', error);
        // 如果加载失败，使用模拟数据作为后备
        return loadMockQuestions();
    }
}

/**
 * 处理questionBank格式的数据（随机题页面）
 */
function processQuestionBankForRandom(questionBank) {
    allQuestions = questionBank.map(q => convertQuestionFormatForRandom(q));
    console.log(`成功加载 ${allQuestions.length} 道题目 (来自questionBank)`);
    return allQuestions;
}

/**
 * 转换题目格式为随机题页面所需格式
 */
function convertQuestionFormatForRandom(q) {
    return {
        id: q.id,
        text: q.question || q.title || '',
        title: q.title || '',
        question: q.question || '',
        starRating: q.stars || q.metadata?.stars || q.metadata?.starRating || 3.0,
        frequencyScore: q.metadata?.frequencyScore || q.metadata?.weightedScore / 20 || 3.0,
        difficulty: q.difficulty || 'medium',
        type: q.category || 'technical',
        category: q.category,
        tags: q.metadata?.tags || q.tags || [],
        keyPoints: q.keyPoints || [],
        role: q.role,
        industry: INDUSTRY_MAP[q.role] || q.role,
        entryLevel: q.entryLevel || q.metadata?.entryLevel || false,
        dimensions: {
            clarity: q.metadata?.ratingDimensions?.answerClarity || 80,
            depth: q.metadata?.ratingDimensions?.differentiation || 75,
            relevance: q.metadata?.ratingDimensions?.marketRelevance || 80
        },
        answers: q.answers || (q.conciseAnswer ? {
            detailed: q.modelAnswer ? { answer: q.modelAnswer, format: 'detailed', source: 'original' } : undefined,
            concise: { answer: q.conciseAnswer, format: 'concise', source: 'simplified' }
        } : undefined),
        metadata: q.metadata
    };
}

/**
 * 模拟数据（后备）
 */
function loadMockQuestions() {
    // 简化的模拟数据
    return [
        {
            id: 1,
            text: "请解释DCF模型的三个主要组成部分",
            starRating: 4.8,
            frequencyScore: 4.8,
            difficulty: "medium",
            type: "technical",
            tags: ["财务建模", "估值"],
            industry: "投资银行",
            entryLevel: false
        },
        {
            id: 2,
            text: "什么是WACC？如何计算？",
            starRating: 4.2,
            frequencyScore: 4.5,
            difficulty: "easy",
            type: "technical",
            tags: ["财务分析", "估值"],
            industry: "投资银行",
            entryLevel: true
        }
    ];
}

/**
 * 应用筛选器
 */
function applyFilters() {
    let filtered = [...allQuestions];
    
    // 星级筛选
    if (currentFilters.star !== 'all') {
        const starValue = parseFloat(currentFilters.star);
        filtered = filtered.filter(q => q.starRating >= starValue);
    }
    
    // 题型筛选
    if (currentFilters.type !== 'all') {
        filtered = filtered.filter(q => q.type === currentFilters.type);
    }
    
    // 难度筛选
    if (currentFilters.difficulty !== 'all') {
        filtered = filtered.filter(q => q.difficulty === currentFilters.difficulty);
    }
    
    // 标签筛选（简化：如果标签筛选不是'all'，检查是否包含该标签）
    if (currentFilters.tag !== 'all' && currentFilters.tag !== '') {
        filtered = filtered.filter(q => q.tags.includes(currentFilters.tag));
    }
    
    // 应用排序
    filtered = sortQuestions(filtered, currentFilters.sort);
    
    filteredQuestions = filtered;
    renderQuestions(filteredQuestions);
    updateResultsCount();
}

/**
 * 排序题目
 */
function sortQuestions(questions, sortType) {
    const sorted = [...questions];
    
    switch (sortType) {
        case 'star-desc':
            return sorted.sort((a, b) => b.starRating - a.starRating);
        case 'star-asc':
            return sorted.sort((a, b) => a.starRating - b.starRating);
        case 'frequency-desc':
            return sorted.sort((a, b) => b.frequencyScore - a.frequencyScore);
        case 'frequency-asc':
            return sorted.sort((a, b) => a.frequencyScore - b.frequencyScore);
        case 'difficulty-desc':
            const diffOrder = { hard: 3, medium: 2, easy: 1 };
            return sorted.sort((a, b) => diffOrder[b.difficulty] - diffOrder[a.difficulty]);
        case 'difficulty-asc':
            const diffOrderAsc = { easy: 1, medium: 2, hard: 3 };
            return sorted.sort((a, b) => diffOrderAsc[a.difficulty] - diffOrderAsc[b.difficulty]);
        case 'random':
            return shuffleArray(sorted);
        default:
            return sorted;
    }
}

/**
 * 随机打乱数组
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * 更新结果计数
 */
function updateResultsCount() {
    if (resultsCount) {
        resultsCount.textContent = filteredQuestions.length;
    }
}

/**
 * 渲染题目网格
 */
function renderQuestions(questions) {
    questionsGrid.innerHTML = '';
    
    if (questions.length === 0) {
        questionsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>未找到匹配的题目</h3>
                <p>请尝试调整筛选条件，或切换到高频题模式。</p>
            </div>
        `;
        return;
    }
    
    questions.forEach(question => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.dataset.id = question.id;
        card.dataset.role = question.role;
        
        // 星级显示
        const starHtml = renderStars(question.stars || question.metadata?.starRating || 4.0);
        
        // 难度标签
        const difficultyLabel = question.difficulty === 'hard' ? '困难' : 
                               question.difficulty === 'medium' ? '中等' : '简单';
        const difficultyClass = question.difficulty;
        
        // 题型标签
        const typeLabel = CATEGORY_MAP[question.type] || question.type;
        
        // 标签显示（最多3个）
        const tagsHtml = question.tags.slice(0, 3).map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="question-card-header">
                <div class="question-card-title">${question.title || '题目'}</div>
                ${question.entryLevel ? '<span class="entry-level-badge">新手</span>' : ''}
            </div>
            <div class="question-card-body">
                <p class="question-text">${question.question || question.text}</p>
                <div class="question-card-meta">
                    <div class="meta-item">
                        <i class="fas fa-star"></i>
                        <span>${question.stars || question.metadata?.starRating || 4.0.toFixed(1)}</span>
                    </div>
                    <div class="meta-item ${difficultyClass}">
                        <i class="fas fa-signal"></i>
                        <span>${difficultyLabel}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-tag"></i>
                        <span>${typeLabel}</span>
                    </div>
                </div>
                <div class="question-card-tags">
                    ${tagsHtml}
                    ${question.tags.length > 3 ? '<span class="tag-more">...</span>' : ''}
                </div>
            </div>
            <div class="question-card-footer">
                <div class="question-card-actions">
                    <button class="btn-view-answer" data-id="${question.id}">
                        <i class="fas fa-eye"></i> 查看答案
                    </button>
                    <button class="btn-practice" data-id="${question.id}">
                        <i class="fas fa-play-circle"></i> 练习
                    </button>
                </div>
                <div class="question-card-frequency">
                    <span>频率: ${question.metadata?.frequencyScore || 3.5.toFixed(1)}/5</span>
                </div>
            </div>
        `;
        
        // 查看答案按钮事件
        const viewAnswerBtn = card.querySelector('.btn-view-answer');
        viewAnswerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showQuestionAnswer(question);
        });
        
        // 练习按钮事件
        const practiceBtn = card.querySelector('.btn-practice');
        practiceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            startPractice(question.id);
        });
        
        // 点击卡片也可以查看答案
        card.addEventListener('click', () => {
            showQuestionAnswer(question);
        });
        
        questionsGrid.appendChild(card);
    });
}

/**
 * 渲染星级
 */
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHtml = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHtml;
}

/**
 * 显示题目答案
 */
function showQuestionAnswer(question) {
    // 创建弹窗（复用高频题页面的弹窗逻辑）
    const modal = document.createElement('div');
    modal.className = 'question-modal';
    
    const conciseAnswer = question.answers?.concise?.answer || ['暂无简洁答案'];
    const answerHtml = Array.isArray(conciseAnswer) 
        ? conciseAnswer.map(point => `<li>${point}</li>`).join('')
        : `<p>${conciseAnswer}</p>`;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${question.title || '题目详情'}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="question-full">
                    <p><strong>问题：</strong>${question.question || question.text}</p>
                                        <!-- 答案切换按钮 -->
                    <div class="answer-toggle-container">
                        <button class="answer-toggle-btn active" data-answer-type="concise">
                            <i class="fas fa-bolt"></i> 简洁答案
                        </button>
                        <button class="answer-toggle-btn" data-answer-type="detailed">
                            <i class="fas fa-file-alt"></i> 详细答案
                        </button>
                    </div>
                    
                    <!-- 简洁答案容器 (默认显示) -->
                    <div class="answer-section concise-answer" style="display: block;">
                        <h4>简洁答案：</h4>
                        <ul>${answerHtml}</ul>
                    </div>
                    
                    <!-- 详细答案容器 (默认隐藏) -->
                    <div class="answer-section detailed-answer" style="display: none;">
                        <h4>详细答案：</h4>
                        <div class="detailed-answer-content">${detailedHtml}</div>
                    </div>
                    <div class="question-meta-full">
                        <div><strong>行业：</strong>${question.role || question.industry}</div>
                        <div><strong>难度：</strong>${question.difficulty}</div>
                        <div><strong>题型：</strong>${typeLabel}</div>
                        <div><strong>星级评分：</strong>${question.stars || question.metadata?.starRating || 4.0.toFixed(1)}</div>
                        <div><strong>频率评分：</strong>${question.metadata?.frequencyScore || 3.5.toFixed(1)}</div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-practice">练习此题</button>
                <button class="btn-close">关闭</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 关闭按钮事件
    const closeButtons = modal.querySelectorAll('.modal-close, .btn-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // 练习按钮事件
        // 答案切换功能
    const toggleButtons = modal.querySelectorAll('.answer-toggle-btn');
    const conciseSection = modal.querySelector('.concise-answer');
    const detailedSection = modal.querySelector('.detailed-answer');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 显示对应的答案
            const answerType = btn.dataset.answerType;
            if (answerType === 'concise') {
                conciseSection.style.display = 'block';
                detailedSection.style.display = 'none';
            } else {
                conciseSection.style.display = 'none';
                detailedSection.style.display = 'block';
            }
        });
    });
    
    const practiceBtn = modal.querySelector('.btn-practice');
    practiceBtn.addEventListener('click', () => {
        startPractice(question.id);
        document.body.removeChild(modal);
    });
}

/**
 * 开始练习
 */
function startPractice(questionId) {
    alert(`开始练习题目 ID: ${questionId}\n（练习功能开发中...）`);
}

/**
 * 设置筛选器事件
 */
function setupFilters() {
    // 星级筛选
    if (starFilter) {
        starFilter.addEventListener('change', (e) => {
            currentFilters.star = e.target.value;
            applyFilters();
        });
    }
    
    // 题型筛选
    if (typeFilter) {
        typeFilter.addEventListener('change', (e) => {
            currentFilters.type = e.target.value;
            applyFilters();
        });
    }
    
    // 难度筛选
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', (e) => {
            currentFilters.difficulty = e.target.value;
            applyFilters();
        });
    }
    
    // 标签筛选（简化版）
    if (tagFilter) {
        tagFilter.addEventListener('change', (e) => {
            currentFilters.tag = e.target.value;
            applyFilters();
        });
    }
    
    // 排序选择
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            applyFilters();
        });
    }
    
    // 重置筛选
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            resetFilters();
        });
    }
    
    // 移动端筛选面板切换
    if (mobileFilterToggle) {
        mobileFilterToggle.addEventListener('click', () => {
            filterPanel.classList.toggle('active');
        });
    }
}

/**
 * 重置筛选器
 */
function resetFilters() {
    if (starFilter) starFilter.value = 'all';
    if (typeFilter) typeFilter.value = 'all';
    if (difficultyFilter) difficultyFilter.value = 'all';
    if (tagFilter) tagFilter.value = 'all';
    if (sortSelect) sortSelect.value = CONFIG.DEFAULT_SORT;
    
    currentFilters = {
        star: 'all',
        type: 'all',
        difficulty: 'all',
        tag: 'all',
        sort: CONFIG.DEFAULT_SORT
    };
    
    applyFilters();
}

/**
 * 模式切换功能
 */
function setupModeSwitch() {
    const modeSwitchBtn = document.querySelector('.mode-switch-button');
    if (modeSwitchBtn) {
        modeSwitchBtn.addEventListener('click', () => {
            window.location.href = 'high-frequency-list.html';
        });
    }
    
    const modeSwitchOverlay = document.getElementById('modeSwitchOverlay');
    if (modeSwitchOverlay) {
        modeSwitchOverlay.addEventListener('click', (e) => {
            if (e.target === modeSwitchOverlay || e.target.classList.contains('close-overlay')) {
                modeSwitchOverlay.style.display = 'none';
            }
        });
    }
}

/**
 * 初始化随机题列表
 */
async function initRandomList() {
    try {
        // 加载真实数据
        await loadRealQuestions();
        
        // 初始化筛选器
        setupFilters();
        setupModeSwitch();
        
        // 应用默认筛选和排序
        applyFilters();
        
        console.log('随机题列表初始化完成');
    } catch (error) {
        console.error('初始化随机题列表失败:', error);
        questionsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>加载失败</h3>
                <p>无法加载题目列表，请检查网络连接或稍后重试。</p>
                <p>错误信息: ${error.message}</p>
            </div>
        `;
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRandomList);
} else {
    initRandomList();
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadRealQuestions,
        renderQuestions,
        applyFilters,
        initRandomList
    };
}