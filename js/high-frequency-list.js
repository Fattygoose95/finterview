/**
 * 高频题列表组件 - 使用真实数据
 * 从unified_questions.json加载，按频率评分降序排列
 */

// 配置
const CONFIG = {
    DATA_URL: 'questions.js', // 改为使用questions.js确保文件存在
    DEFAULT_INDUSTRY: 'ib'  // 默认显示投资银行题目
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

// DOM元素
const questionsList = document.getElementById('questionsList');
const questionsCount = document.getElementById('questionsCount');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');

/**
 * 加载真实题目数据
 */
async function loadRealQuestions() {
    try {
        console.log('正在加载题目数据...', CONFIG.DATA_URL);
        
        // 检查是否已有全局questionBank（如果questions.js已加载）
        if (typeof window.questionBank !== 'undefined') {
            console.log('使用已加载的questionBank');
            return processQuestionBank(window.questionBank);
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
                        return processQuestionBank(window.questionBank);
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
                questions = data.questions.map(q => ({
                    id: q.id,
                    text: q.question || q.title,
                    title: q.title,
                    question: q.question,
                    frequencyScore: q.metadata?.frequencyScore || 3.0,
                    frequencyDescription: getFrequencyDescription(q.metadata?.frequencyScore || 3.0),
                    tags: q.tags || [],
                    keyPoints: q.keyPoints || [],
                    role: q.role,
                    industry: INDUSTRY_MAP[q.role] || q.role,
                    category: q.category,
                    difficulty: q.difficulty,
                    entryLevel: q.metadata?.entryLevel || false,
                    answers: q.answers
                }));
            } else if (Array.isArray(data)) {
                // 直接是题目数组格式
                questions = data.map(q => convertQuestionFormat(q));
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
 * 处理questionBank格式的数据
 */
function processQuestionBank(questionBank) {
    allQuestions = questionBank.map(q => convertQuestionFormat(q));
    console.log(`成功加载 ${allQuestions.length} 道题目 (来自questionBank)`);
    return allQuestions;
}

/**
 * 转换题目格式为高频题页面所需格式
 */
function convertQuestionFormat(q) {
    return {
        id: q.id,
        text: q.question || q.title || '',
        title: q.title || '',
        question: q.question || '',
        frequencyScore: q.metadata?.frequencyScore || q.metadata?.weightedScore / 20 || 3.0,
        frequencyDescription: getFrequencyDescription(q.metadata?.frequencyScore || q.metadata?.weightedScore / 20 || 3.0),
        tags: q.metadata?.tags || q.tags || [],
        keyPoints: q.keyPoints || [],
        role: q.role,
        industry: INDUSTRY_MAP[q.role] || q.role,
        category: q.category,
        difficulty: q.difficulty,
        entryLevel: q.entryLevel || q.metadata?.entryLevel || false,
        answers: q.answers || (q.conciseAnswer ? {
            detailed: q.modelAnswer ? { answer: q.modelAnswer, format: 'detailed', source: 'original' } : undefined,
            concise: { answer: q.conciseAnswer, format: 'concise', source: 'simplified' }
        } : undefined)
    };
}

/**
 * 获取频率描述
 */
function getFrequencyDescription(score) {
    if (score >= 4.5) return '极高频率';
    if (score >= 4.0) return '高频率';
    if (score >= 3.0) return '中等频率';
    if (score >= 2.0) return '低频率';
    return '极低频率';
}

/**
 * 模拟数据（后备）
 */
function loadMockQuestions() {
    return [
        {
            id: 1,
            text: "请解释DCF模型的三个主要组成部分",
            frequencyScore: 4.8,
            frequencyDescription: "极高频率",
            tags: ["财务建模", "估值"],
            industry: "投资银行"
        },
        {
            id: 2,
            text: "什么是WACC？如何计算？",
            frequencyScore: 4.5,
            frequencyDescription: "高频率",
            tags: ["财务分析", "估值"],
            industry: "投资银行"
        }
    ];
}

/**
 * 按行业筛选题目
 */
function filterByIndustry(questions, industry) {
    if (industry === 'all') return questions;
    return questions.filter(q => q.role === industry);
}

/**
 * 按频率评分排序
 */
function sortByFrequency(questions) {
    return [...questions].sort((a, b) => b.frequencyScore - a.frequencyScore);
}

/**
 * 渲染题目列表
 */
function renderQuestions(questions) {
    questionsList.innerHTML = '';
    
    if (questions.length === 0) {
        emptyState.style.display = 'block';
        questionsList.style.display = 'none';
        questionsCount.textContent = '0';
        return;
    }
    
    emptyState.style.display = 'none';
    questionsList.style.display = 'block';
    questionsCount.textContent = questions.length;
    
    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.className = 'question-item';
        li.dataset.id = question.id;
        li.dataset.role = question.role;
        
        // 频率评分颜色
        let frequencyColor = '#4CAF50'; // 默认绿色
        if (question.metadata?.frequencyScore || 3.5 >= 4.5) {
            frequencyColor = '#f72585'; // 高频红色
        } else if (question.metadata?.frequencyScore || 3.5 >= 4.0) {
            frequencyColor = '#FF9800'; // 中高频橙色
        } else {
            frequencyColor = '#4361ee'; // 中频蓝色
        }
        
        // 难度标签
        const difficultyLabel = question.difficulty === 'hard' ? '困难' : 
                               question.difficulty === 'medium' ? '中等' : '简单';
        
        li.innerHTML = `
            <div class="question-content">
                <div class="question-text">
                    <span class="question-index">${index + 1}.</span>
                    ${question.question || question.question || question.text}
                    ${question.entryLevel ? '<span class="entry-level-badge">新手</span>' : ''}
                </div>
                <div class="question-meta">
                    <span class="meta-industry">${question.role || question.industry}</span>
                    <span class="meta-difficulty ${question.difficulty}">${difficultyLabel}</span>
                    <span class="meta-tags">${question.tags.slice(0, 3).join(' · ')}</span>
                </div>
            </div>
            <div class="frequency-score" style="background: linear-gradient(135deg, ${frequencyColor}, ${frequencyColor}dd)">
                <i class="fas fa-chart-line"></i>
                <div class="frequency-info">
                    <span class="frequency-value">${question.metadata?.frequencyScore || 3.5.toFixed(1)}</span>
                    <span class="frequency-desc">${question.frequencyDescription}</span>
                </div>
            </div>
        `;
        
        // 点击题目显示答案
        li.addEventListener('click', () => {
            showQuestionAnswer(question);
        });
        
        questionsList.appendChild(li);
    });
}

/**
 * 显示题目答案 (支持简洁/详细切换)
 */
function showQuestionAnswer(question) {
    // 创建弹窗
    const modal = document.createElement('div');
    modal.className = 'question-modal';
    
    // 获取两种答案
    const conciseAnswer = question.answers?.concise?.answer || question.conciseAnswer || ['暂无简洁答案'];
    const detailedAnswer = question.answers?.detailed?.answer || question.modelAnswer || '暂无详细答案';
    
    const conciseHtml = Array.isArray(conciseAnswer) 
        ? conciseAnswer.map(point => `<li>${point}</li>`).join('')
        : `<p>${conciseAnswer}</p>`;
    
    const detailedHtml = Array.isArray(detailedAnswer)
        ? detailedAnswer.map(point => `<li>${point}</li>`).join('')
        : `<div class="detailed-answer-text">${detailedAnswer}</div>`;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${question.title || '题目详情'}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="question-full">
                    <p><strong>问题：</strong>${question.question || question.question || question.text}</p>
                    
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
                        <ul>${conciseHtml}</ul>
                    </div>
                    
                    <!-- 详细答案容器 (默认隐藏) -->
                    <div class="answer-section detailed-answer" style="display: none;">
                        <h4>详细答案：</h4>
                        <div class="detailed-answer-content">${detailedHtml}</div>
                    </div>
                    
                    <div class="question-meta-full">
                        <div><strong>行业：</strong>${question.role || question.industry}</div>
                        <div><strong>难度：</strong>${question.difficulty}</div>
                        <div><strong>题型：</strong>${question.category}</div>
                        <div><strong>频率评分：</strong>${question.metadata?.frequencyScore || 3.5.toFixed(1)} (${question.frequencyDescription})</div>
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
    const practiceBtn = modal.querySelector('.btn-practice');
    practiceBtn.addEventListener('click', () => {
        alert('练习功能开发中...');
    });
}

/**
 * 筛选题目
 */
function filterQuestions(searchTerm) {
    if (!searchTerm.trim()) {
        filteredQuestions = sortByFrequency(filterByIndustry(allQuestions, currentIndustry));
        renderQuestions(filteredQuestions);
        return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = allQuestions.filter(question => {
        const questionText = (question.question || question.text || '').toLowerCase();
        const title = question.title?.toLowerCase() || '';
        const tags = question.metadata?.tags || question.tags || [];
        const role = (question.role || question.industry || '').toLowerCase();
        const scoringKeywords = question.scoringKeywords || [];
        
        return questionText.includes(term) ||
               title.includes(term) ||
               tags.some(tag => tag.toLowerCase().includes(term)) ||
               role.includes(term) ||
               scoringKeywords.some(keyword => keyword.toLowerCase().includes(term));
    });
    
    filteredQuestions = sortByFrequency(filterByIndustry(filtered, currentIndustry));
    renderQuestions(filteredQuestions);
}

/**
 * 搜索功能
 */
function setupSearch() {
    if (searchInput) {
        // 实时搜索
        searchInput.addEventListener('input', (e) => {
            filterQuestions(e.target.value);
        });
        
        // 清除搜索按钮
        const clearBtn = document.querySelector('.search-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                filterQuestions('');
            });
        }
    }
}

/**
 * 模式切换功能
 */
function setupModeSwitch() {
    const modeSwitchBtn = document.querySelector('.mode-switch-button');
    if (modeSwitchBtn) {
        modeSwitchBtn.addEventListener('click', () => {
            window.location.href = 'random-list.html';
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
 * 初始化高频题列表
 */
async function initHighFrequencyList() {
    try {
        // 加载真实数据
        await loadRealQuestions();
        
        // 初始筛选和排序
        filteredQuestions = sortByFrequency(filterByIndustry(allQuestions, currentIndustry));
        
        // 渲染
        renderQuestions(filteredQuestions);
        
        // 设置交互功能
        setupSearch();
        setupModeSwitch();
        
        console.log('高频题列表初始化完成');
    } catch (error) {
        console.error('初始化高频题列表失败:', error);
        questionsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>加载失败</h3>
                <p>无法加载题目列表，请检查网络连接或稍后重试。</p>
                <p>错误信息: ${error.message}</p>
            </div>
        `;
    }
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .entry-level-badge {
        display: inline-block;
        background: #10b981;
        color: white;
        font-size: 0.7rem;
        padding: 2px 6px;
        border-radius: 4px;
        margin-left: 8px;
        vertical-align: middle;
    }
    .question-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .modal-content {
        background: white;
        border-radius: 12px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e5e7eb;
    }
    .modal-header h3 {
        margin: 0;
        color: #1f2937;
    }
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
    }
    .modal-body {
        padding: 20px;
    }
    .answer-section {
        background: #f8fafc;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
    }
    .answer-section ul {
        margin: 10px 0;
        padding-left: 20px;
    }
    .answer-section li {
        margin: 5px 0;
    }
    .question-meta-full {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px dashed #e5e7eb;
    }
    .modal-footer {
        padding: 20px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
    .btn-practice, .btn-close {
        padding: 10px 20px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        font-weight: 500;
    }
    .btn-practice {
        background: #3b82f6;
        color: white;
    }
    .btn-close {
        background: #e5e7eb;
        color: #374151;
    }
    .frequency-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .frequency-value {
        font-size: 1.2rem;
        font-weight: bold;
    }
    .frequency-desc {
        font-size: 0.8rem;
        opacity: 0.9;
    }
    .meta-difficulty {
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
    }
    .meta-difficulty.easy { background: #d1fae5; color: #065f46; }
    .meta-difficulty.medium { background: #fef3c7; color: #92400e; }
    .meta-difficulty.hard { background: #fee2e2; color: #991b1b; }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHighFrequencyList);
} else {
    initHighFrequencyList();
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadRealQuestions,
        renderQuestions,
        filterQuestions,
        initHighFrequencyList
    };
}