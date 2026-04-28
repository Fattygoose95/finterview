/**
 * 高频题列表组件 - 使用统一数据加载器
 * 从根本上解决数据源问题，支持多数据源自动检测和兼容
 */

// 配置
const CONFIG = {
    DEFAULT_INDUSTRY: 'ib',  // 默认显示投资银行题目
    MAX_QUESTIONS: 50        // 最多显示题目数
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

// 状态
let allQuestions = [];
let filteredQuestions = [];
let currentIndustry = CONFIG.DEFAULT_INDUSTRY;
let dataLoader = null;

// DOM元素
const questionsList = document.getElementById('questionsList');
const questionsCount = document.getElementById('questionsCount');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const industryButtons = document.querySelectorAll('.industry-btn');

/**
 * 初始化高频题页面
 */
async function initHighFrequencyList() {
    console.log('[高频题] 初始化页面...');
    
    try {
        // 初始化统一数据加载器
        await initDataLoader();
        
        // 加载题目数据
        await loadQuestions();
        
        // 设置行业筛选
        setupIndustryFilter();
        
        // 设置搜索功能
        setupSearch();
        
        // 初始渲染
        renderQuestions();
        
        console.log('[高频题] 初始化完成');
    } catch (error) {
        console.error('[高频题] 初始化失败:', error);
        showError('页面初始化失败，请刷新重试');
    }
}

/**
 * 初始化统一数据加载器
 */
async function initDataLoader() {
    console.log('[高频题] 初始化数据加载器...');
    
    // 加载统一数据加载器脚本（如果尚未加载）
    if (typeof UnifiedDataLoader === 'undefined') {
        await loadScript('js/unified-data-loader.js');
    }
    
    // 初始化数据加载器
    const result = await UnifiedDataLoader.init();
    
    console.log('[高频题] 数据加载器初始化结果:', result);
    
    if (!result.success) {
        console.warn('[高频题] 数据加载器初始化警告:', result.error);
        // 继续使用，因为有模拟数据后备
    }
    
    dataLoader = UnifiedDataLoader;
}

/**
 * 加载外部脚本
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * 加载题目数据
 */
async function loadQuestions() {
    console.log('[高频题] 加载题目数据...');
    
    try {
        // 从统一数据加载器获取数据
        allQuestions = dataLoader.getAllQuestions();
        
        if (!allQuestions || allQuestions.length === 0) {
            console.warn('[高频题] 未获取到题目数据，使用空数组');
            allQuestions = [];
        }
        
        console.log(`[高频题] 加载完成，共 ${allQuestions.length} 题`);
        
        // 更新数据源显示
        updateDataSourceInfo();
        
    } catch (error) {
        console.error('[高频题] 加载数据失败:', error);
        throw error;
    }
}

/**
 * 更新数据源信息显示
 */
function updateDataSourceInfo() {
    const sourceInfo = document.getElementById('sourceInfo');
    if (!sourceInfo) return;
    
    const source = dataLoader.getCurrentSource();
    const stats = dataLoader.getStats();
    
    let infoText = '';
    if (source) {
        infoText = `数据源: ${source.name} | 题目数: ${stats.totalQuestions}`;
        if (source.name === 'mock') {
            infoText += ' (模拟数据)';
        }
    } else {
        infoText = `题目数: ${stats.totalQuestions}`;
    }
    
    sourceInfo.textContent = infoText;
}

/**
 * 设置行业筛选
 */
function setupIndustryFilter() {
    if (!industryButtons || industryButtons.length === 0) return;
    
    industryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const industry = this.dataset.industry;
            if (industry === currentIndustry) return;
            
            // 更新当前行业
            currentIndustry = industry;
            
            // 更新按钮状态
            industryButtons.forEach(b => {
                b.classList.remove('active');
                if (b.dataset.industry === industry) {
                    b.classList.add('active');
                }
            });
            
            // 重新筛选和渲染
            filterQuestions();
            renderQuestions();
        });
    });
    
    // 设置默认选中
    industryButtons.forEach(btn => {
        if (btn.dataset.industry === currentIndustry) {
            btn.classList.add('active');
        }
    });
}

/**
 * 设置搜索功能
 */
function setupSearch() {
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        filterQuestions();
        renderQuestions();
    });
    
    // 添加搜索清除按钮
    const clearBtn = document.createElement('button');
    clearBtn.className = 'search-clear-btn';
    clearBtn.innerHTML = '<i class="fas fa-times"></i>';
    clearBtn.style.display = 'none';
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        filterQuestions();
        renderQuestions();
        this.style.display = 'none';
    });
    
    searchInput.parentNode.appendChild(clearBtn);
    
    searchInput.addEventListener('input', function() {
        clearBtn.style.display = this.value ? 'block' : 'none';
    });
}

/**
 * 筛选题目
 */
function filterQuestions() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    // 第一步：按行业筛选
    let filtered = allQuestions;
    if (currentIndustry && currentIndustry !== 'all') {
        filtered = filtered.filter(q => q.role === currentIndustry);
    }
    
    // 第二步：按搜索词筛选
    if (searchTerm) {
        filtered = filtered.filter(q => 
            (q.title && q.title.toLowerCase().includes(searchTerm)) ||
            (q.question && q.question.toLowerCase().includes(searchTerm)) ||
            (q.category && q.category.toLowerCase().includes(searchTerm))
        );
    }
    
    // 第三步：按频率评分排序（高频题模式的核心）
    filtered = filtered.sort((a, b) => {
        const scoreA = a.frequencyScore || 0;
        const scoreB = b.frequencyScore || 0;
        return scoreB - scoreA; // 降序
    });
    
    // 第四步：限制数量
    filteredQuestions = filtered.slice(0, CONFIG.MAX_QUESTIONS);
    
    // 更新计数
    if (questionsCount) {
        questionsCount.textContent = filteredQuestions.length;
    }
}

/**
 * 渲染题目列表
 */
function renderQuestions() {
    if (!questionsList) return;
    
    // 清空列表
    questionsList.innerHTML = '';
    
    if (filteredQuestions.length === 0) {
        showEmptyState();
        return;
    }
    
    // 隐藏空状态
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    // 渲染每个题目
    filteredQuestions.forEach((question, index) => {
        const questionElement = createQuestionElement(question, index + 1);
        questionsList.appendChild(questionElement);
    });
}

/**
 * 创建题目元素
 */
function createQuestionElement(question, index) {
    const div = document.createElement('div');
    div.className = 'question-item';
    
    // 频率评分星级
    const frequencyScore = question.frequencyScore || 0;
    const starCount = Math.min(5, Math.max(1, Math.round(frequencyScore)));
    const starsHtml = '<i class="fas fa-star"></i>'.repeat(starCount);
    
    // 行业标签颜色
    const industryColor = getIndustryColor(question.role);
    
    // 难度标签
    const difficultyLabel = getDifficultyLabel(question.difficulty);
    
    div.innerHTML = `
        <div class="question-card" style="border-left-color: ${industryColor}">
            <div class="question-header">
                <div class="question-index">#${index}</div>
                <div class="question-frequency">
                    <span class="frequency-badge">
                        <i class="fas fa-chart-line"></i>
                        频率: ${frequencyScore.toFixed(1)}
                    </span>
                </div>
            </div>
            
            <div class="question-title">${escapeHtml(question.title)}</div>
            
            <div class="question-content">
                <p>${escapeHtml(question.question)}</p>
            </div>
            
            <div class="question-meta">
                <div class="meta-left">
                    <span class="industry-tag" style="background: ${industryColor}">
                        ${INDUSTRY_MAP[question.role] || question.role}
                    </span>
                    <span class="difficulty-tag ${difficultyLabel.class}">
                        ${difficultyLabel.text}
                    </span>
                    ${question.category ? `<span class="category-tag">${question.category}</span>` : ''}
                </div>
                
                <div class="meta-right">
                    <div class="star-display">
                        ${starsHtml}
                    </div>
                </div>
            </div>
            
            <div class="question-answer" style="display: none;">
                <div class="answer-header">
                    <h4><i class="fas fa-lightbulb"></i> 参考答案</h4>
                    <div class="answer-actions">
                        <button class="answer-toggle-btn" data-type="concise">
                            <i class="fas fa-bolt"></i> 简洁版
                        </button>
                        <button class="answer-toggle-btn active" data-type="detailed">
                            <i class="fas fa-file-alt"></i> 详细版
                        </button>
                    </div>
                </div>
                
                <div class="answer-content detailed">
                    <p>${escapeHtml(question.answer || '暂无详细答案')}</p>
                </div>
                
                <div class="answer-content concise" style="display: none;">
                    <p>${escapeHtml(question.conciseAnswer || '暂无简洁答案')}</p>
                </div>
            </div>
            
            <div class="question-actions">
                <button class="show-answer-btn">
                    <i class="fas fa-eye"></i> 显示答案
                </button>
                <button class="copy-question-btn" data-question="${escapeHtml(question.question)}">
                    <i class="fas fa-copy"></i> 复制题目
                </button>
            </div>
        </div>
    `;
    
    // 添加事件监听器
    const showAnswerBtn = div.querySelector('.show-answer-btn');
    const answerSection = div.querySelector('.question-answer');
    const copyBtn = div.querySelector('.copy-question-btn');
    const toggleBtns = div.querySelectorAll('.answer-toggle-btn');
    
    showAnswerBtn.addEventListener('click', function() {
        const isVisible = answerSection.style.display !== 'none';
        answerSection.style.display = isVisible ? 'none' : 'block';
        this.innerHTML = isVisible ? 
            '<i class="fas fa-eye"></i> 显示答案' : 
            '<i class="fas fa-eye-slash"></i> 隐藏答案';
    });
    
    copyBtn.addEventListener('click', function() {
        const questionText = this.dataset.question;
        navigator.clipboard.writeText(questionText).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> 已复制';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            const answerContents = answerSection.querySelectorAll('.answer-content');
            const buttons = answerSection.querySelectorAll('.answer-toggle-btn');
            
            // 更新按钮状态
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应的答案内容
            answerContents.forEach(content => {
                content.style.display = content.classList.contains(type) ? 'block' : 'none';
            });
        });
    });
    
    return div;
}

/**
 * 显示空状态
 */
function showEmptyState() {
    if (!questionsList) return;
    
    questionsList.innerHTML = '';
    
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-state';
    emptyDiv.innerHTML = `
        <i class="fas fa-search"></i>
        <h3>未找到匹配的题目</h3>
        <p>尝试更换行业筛选条件或调整搜索关键词</p>
        <button class="reset-filters-btn" onclick="resetFilters()">
            <i class="fas fa-redo"></i> 重置筛选
        </button>
    `;
    
    questionsList.appendChild(emptyDiv);
}

/**
 * 显示错误信息
 */
function showError(message) {
    if (!questionsList) return;
    
    questionsList.innerHTML = '';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-state';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <h3>加载失败</h3>
        <p>${escapeHtml(message)}</p>
        <button class="retry-btn" onclick="window.location.reload()">
            <i class="fas fa-sync-alt"></i> 重新加载
        </button>
    `;
    
    questionsList.appendChild(errorDiv);
}

/**
 * 重置筛选
 */
function resetFilters() {
    if (searchInput) {
        searchInput.value = '';
        const clearBtn = searchInput.parentNode.querySelector('.search-clear-btn');
        if (clearBtn) clearBtn.style.display = 'none';
    }
    
    currentIndustry = CONFIG.DEFAULT_INDUSTRY;
    
    // 重置按钮状态
    industryButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.industry === currentIndustry) {
            btn.classList.add('active');
        }
    });
    
    filterQuestions();
    renderQuestions();
}

/**
 * 获取行业颜色
 */
function getIndustryColor(industry) {
    const colorMap = {
        ib: '#3498db',
        am: '#2ecc71',
        quant: '#e74c3c',
        markets: '#9b59b6',
        corpfin: '#f39c12',
        risk: '#d35400',
        fintech: '#1abc9c',
        fo: '#16a085'
    };
    return colorMap[industry] || '#7f8c8d';
}

/**
 * 获取难度标签
 */
function getDifficultyLabel(difficulty) {
    const labels = {
        easy: { text: '简单', class: 'difficulty-easy' },
        medium: { text: '中等', class: 'difficulty-medium' },
        hard: { text: '困难', class: 'difficulty-hard' }
    };
    return labels[difficulty] || { text: '中等', class: 'difficulty-medium' };
}

/**
 * HTML转义
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 导出全局函数
window.resetFilters = resetFilters;

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHighFrequencyList);
} else {
    initHighFrequencyList();
}