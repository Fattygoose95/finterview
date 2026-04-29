/* 
 * 统一数据加载器 - 从根本上解决数据源问题
 * 智能检测可用数据文件，自动适配不同格式，优雅降级
 */

const UnifiedDataLoader = (function() {
    'use strict';
    
    // 数据源优先级（按顺序尝试）
    const DATA_SOURCES = [
        { 
            name: 'questions.js',
            url: 'questions.js',
            type: 'js-module',
            format: 'modern'
        },
        { 
            name: 'questions_179.js', 
            url: 'questions_179.js',
            type: 'js-legacy',
            format: 'legacy'
        },
        { 
            name: 'unified_questions.json',
            url: 'unified_questions.json', 
            type: 'json',
            format: 'unified'
        }
    ];
    
    // 模块状态
    let currentSource = null;
    let allQuestions = [];
    let industries = {};
    let isInitialized = false;
    let lastError = null;
    
    // 格式转换器 - 将不同格式的数据转换为统一格式
    const formatConverters = {
        // 现代格式 (questions.js)
        'modern': function(data) {
            if (Array.isArray(data)) {
                return data.map(q => ({
                    id: q.id || Math.random().toString(36).substr(2, 9),
                    role: q.role || 'unknown',
                    category: q.category || 'technical',
                    difficulty: q.difficulty || 'medium',
                    title: q.title || '未命名题目',
                    question: q.question || '',
                    answer: q.answers?.detailed?.answer || q.answer || '',
                    conciseAnswer: q.answers?.concise?.answer || q.conciseAnswer || '',
                    frequencyScore: q.metadata?.frequencyScore || 3.0,
                    stars: q.metadata?.stars || 4.0,
                    entryLevel: q.entryLevel || false
                }));
            }
            return [];
        },
        
        // 传统格式 (questions_179.js)
        'legacy': function(data) {
            // questions_179.js的结构不同，需要解析
            if (typeof data === 'object' && data.questions) {
                return data.questions.map((q, index) => ({
                    id: `legacy_${index}`,
                    role: q.role || q.industry || 'ib',
                    category: this.mapCategory(q.category || 'technical'),
                    difficulty: this.mapDifficulty(q.difficulty || 'medium'),
                    title: q.title || `题目 ${index + 1}`,
                    question: q.question || q.text || '',
                    answer: q.answer || q.modelAnswer || '',
                    conciseAnswer: q.conciseAnswer || this.generateConciseAnswer(q.answer),
                    frequencyScore: q.frequencyScore || 3.0,
                    stars: q.stars || 4.0,
                    entryLevel: q.entryLevel || false
                }));
            }
            return [];
        }.bind({
            mapCategory: function(cat) {
                const map = {
                    'technical': 'technical',
                    'behavioral': 'behavioral', 
                    'market': 'market',
                    'case': 'case'
                };
                return map[cat] || 'technical';
            },
            mapDifficulty: function(diff) {
                if (typeof diff === 'number') {
                    if (diff < 2) return 'easy';
                    if (diff < 3) return 'medium';
                    return 'hard';
                }
                return diff || 'medium';
            },
            generateConciseAnswer: function(answer) {
                if (!answer) return '';
                // 从详细答案生成简洁版本
                const sentences = answer.split(/[.!?]+/).filter(s => s.trim().length > 0);
                return sentences.slice(0, 2).map(s => `• ${s.trim()}`).join('\n');
            }
        }),
        
        // 统一格式 (unified_questions.json)
        'unified': function(data) {
            if (Array.isArray(data)) {
                return data.map(q => ({
                    id: q.id,
                    role: q.industry || q.role,
                    category: q.category,
                    difficulty: q.difficulty,
                    title: q.title,
                    question: q.text || q.question,
                    answer: q.answers?.detailed?.answer || q.answer,
                    conciseAnswer: q.answers?.concise?.answer || q.conciseAnswer,
                    frequencyScore: q.metadata?.frequencyScore || q.frequencyScore || 3.0,
                    stars: q.metadata?.stars || q.stars || 4.0,
                    entryLevel: q.entryLevel || false
                }));
            }
            return [];
        }
    };
    
    // 模拟数据（当所有数据源都失败时使用）
    const mockData = [
        {
            id: 'mock_1',
            role: 'ib',
            category: 'technical',
            difficulty: 'medium',
            title: '示例高频题',
            question: '如何准备投资银行面试？',
            answer: '详细答案：1. 准备技术问题 2. 练习行为面试 3. 了解市场动态',
            conciseAnswer: '• 准备技术问题和行为面试\n• 了解最新市场趋势',
            frequencyScore: 4.5,
            stars: 4.2,
            entryLevel: true
        }
    ];
    
    /**
     * 公共API
     */
    const publicAPI = {
        
        /**
         * 初始化数据加载器
         * @returns {Promise} 初始化结果
         */
        init: async function() {
            if (isInitialized) {
                console.log('[UnifiedDataLoader] 已初始化，使用缓存');
                return { success: true, source: currentSource };
            }
            
            console.log('[UnifiedDataLoader] 开始初始化，检测可用数据源...');
            
            try {
                const result = await this.detectAndLoadDataSource();
                isInitialized = true;
                return result;
            } catch (error) {
                console.error('[UnifiedDataLoader] 初始化失败:', error);
                lastError = error;
                
                // 使用模拟数据作为最后手段
                console.warn('[UnifiedDataLoader] 使用模拟数据');
                allQuestions = mockData;
                currentSource = { name: 'mock', url: 'mock', type: 'mock' };
                isInitialized = true;
                
                return { 
                    success: false, 
                    source: currentSource,
                    error: error.message,
                    fallback: 'mock'
                };
            }
        },
        
        /**
         * 检测并加载最佳数据源
         */
        detectAndLoadDataSource: async function() {
            let lastAttemptError = null;
            
            for (const source of DATA_SOURCES) {
                console.log(`[UnifiedDataLoader] 尝试数据源: ${source.name}`);
                
                try {
                    const data = await this.loadSource(source);
                    const convertedData = this.convertData(data, source.format);
                    
                    if (convertedData && convertedData.length > 0) {
                        allQuestions = convertedData;
                        currentSource = source;
                        this.buildIndustries();
                        
                        console.log(`[UnifiedDataLoader] 成功加载数据源: ${source.name}, 题目数: ${allQuestions.length}`);
                        return { 
                            success: true, 
                            source: source,
                            questionCount: allQuestions.length
                        };
                    }
                } catch (error) {
                    console.warn(`[UnifiedDataLoader] 数据源 ${source.name} 失败:`, error.message);
                    lastAttemptError = error;
                }
            }
            
            throw new Error(`所有数据源都失败，最后错误: ${lastAttemptError?.message || '未知错误'}`);
        },
        
        /**
         * 加载单个数据源
         */
        loadSource: async function(source) {
            switch (source.type) {
                case 'js-module':
                case 'js-legacy':
                    return this.loadJSSource(source.url);
                case 'json':
                    return this.loadJSONSource(source.url);
                default:
                    throw new Error(`未知数据源类型: ${source.type}`);
            }
        },
        
        /**
         * 加载JS数据源
         */
        loadJSSource: async function(url) {
            return new Promise((resolve, reject) => {
                // 检查全局变量
                if (url === 'questions.js' && typeof window.questionBank !== 'undefined') {
                    console.log('[UnifiedDataLoader] 使用已加载的window.questionBank');
                    resolve(window.questionBank);
                    return;
                }
                
                if (url === 'questions_179.js' && typeof window.questions !== 'undefined') {
                    console.log('[UnifiedDataLoader] 使用已加载的window.questions');
                    resolve(window.questions);
                    return;
                }
                
                // 通过fetch加载
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                        }
                        return response.text();
                    })
                    .then(jsContent => {
                        // 尝试提取数据
                        const data = this.extractDataFromJS(jsContent, url);
                        if (data) {
                            resolve(data);
                        } else {
                            reject(new Error(`无法从 ${url} 提取数据`));
                        }
                    })
                    .catch(reject);
            });
        },
        
        /**
         * 从JS文件内容中提取数据
         */
        extractDataFromJS: function(jsContent, url) {
            if (url.includes('questions.js')) {
                // 查找 const questionBank = [
                const start = jsContent.indexOf('const questionBank = [');
                if (start !== -1) {
                    const end = this.findMatchingBracket(jsContent, start + 'const questionBank = ['.length);
                    const arrayStr = jsContent.substring(start + 'const questionBank = ['.length, end);
                    try {
                        return eval('[' + arrayStr + ']');
                    } catch (e) {
                        console.warn('直接解析失败，尝试其他方法');
                    }
                }
                
                // 检查是否有全局变量赋值
                if (jsContent.includes('window.questionBank')) {
                    try {
                        // 创建临时环境执行
                        const tempWindow = {};
                        const evalCode = `(function() { ${jsContent}; return window.questionBank; })()`;
                        const data = eval(evalCode.replace(/window\./g, 'tempWindow.'));
                        return data;
                    } catch (e) {
                        // 忽略错误
                    }
                }
            }
            
            if (url.includes('questions_179.js')) {
                // 查找 const questions = {
                if (jsContent.includes('const questions = {')) {
                    try {
                        const tempWindow = {};
                        const evalCode = `(function() { ${jsContent}; return window.questions; })()`;
                        const data = eval(evalCode.replace(/window\./g, 'tempWindow.'));
                        return data;
                    } catch (e) {
                        // 忽略错误
                    }
                }
            }
            
            return null;
        },
        
        /**
         * 查找匹配的方括号
         */
        findMatchingBracket: function(content, startPos) {
            let bracketCount = 0;
            for (let i = startPos; i < content.length; i++) {
                if (content[i] === '[') bracketCount++;
                else if (content[i] === ']') {
                    if (bracketCount === 0) return i;
                    bracketCount--;
                }
            }
            return content.length;
        },
        
        /**
         * 加载JSON数据源
         */
        loadJSONSource: async function(url) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        },
        
        /**
         * 转换数据格式
         */
        convertData: function(data, format) {
            const converter = formatConverters[format];
            if (converter) {
                return converter(data);
            }
            console.warn(`[UnifiedDataLoader] 没有找到格式转换器: ${format}`);
            return [];
        },
        
        /**
         * 构建行业数据
         */
        buildIndustries: function() {
            industries = {};
            allQuestions.forEach(q => {
                if (!industries[q.role]) {
                    industries[q.role] = {
                        name: this.getIndustryName(q.role),
                        count: 0,
                        questions: []
                    };
                }
                industries[q.role].count++;
                industries[q.role].questions.push(q);
            });
        },
        
        /**
         * 获取行业名称
         */
        getIndustryName: function(role) {
            const industryNames = {
                'ib': '投资银行',
                'am': '资产管理', 
                'quant': '量化金融',
                'markets': '销售交易',
                'corpfin': '公司金融',
                'risk': '风险管理',
                'fintech': '金融科技',
                'fo': '家族办公室'
            };
            return industryNames[role] || role;
        },
        
        /**
         * 获取所有题目
         */
        getAllQuestions: function() {
            return allQuestions;
        },
        
        /**
         * 获取行业列表
         */
        getIndustries: function() {
            return industries;
        },
        
        /**
         * 获取当前数据源信息
         */
        getCurrentSource: function() {
            return currentSource;
        },
        
        /**
         * 按行业筛选题目
         */
        getQuestionsByIndustry: function(industry) {
            return allQuestions.filter(q => q.role === industry);
        },
        
        /**
         * 按ID获取题目
         */
        getQuestionById: function(id) {
            return allQuestions.find(q => q.id === id);
        },
        
        /**
         * 获取高频题（按频率评分）
         */
        getHighFrequencyQuestions: function(industry, limit = 20) {
            let filtered = industry ? 
                allQuestions.filter(q => q.role === industry) : 
                allQuestions;
            
            return filtered
                .sort((a, b) => (b.frequencyScore || 0) - (a.frequencyScore || 0))
                .slice(0, limit);
        },
        
        /**
         * 获取随机题目
         */
        getRandomQuestions: function(count = 10) {
            const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        },
        
        /**
         * 获取统计数据
         */
        getStats: function() {
            return {
                totalQuestions: allQuestions.length,
                industries: Object.keys(industries).length,
                currentSource: currentSource?.name || 'unknown',
                hasConciseAnswers: allQuestions.filter(q => q.conciseAnswer && q.conciseAnswer.length > 0).length
            };
        },
        
        /**
         * 重置状态（用于测试）
         */
        reset: function() {
            isInitialized = false;
            currentSource = null;
            allQuestions = [];
            industries = {};
            lastError = null;
        }
    };
    
    return publicAPI;
})();

// 全局可用
if (typeof window !== 'undefined') {
    window.UnifiedDataLoader = UnifiedDataLoader;
}