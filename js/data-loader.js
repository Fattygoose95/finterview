/* finterview 数据加载模块 - 第2天任务核心组件 */

/**
 * 数据加载模块 - 负责从questions.js加载、转换和管理题目数据
 * 提供行业统计、题目筛选、数据缓存等功能
 */

const DataLoader = (function() {
    'use strict';
    
    // 模块状态
    let _isInitialized = false;
    let _isLoading = false;
    let _lastLoadTime = null;
    let _cache = {
        industries: null,
        questions: null,
        stats: null,
        industryMap: null
    };
    
    // 默认配置
    const CONFIG = {
        DATA_URL: 'questions.js',  // 相对于new-ui/js目录的数据文件路径
        CACHE_TTL: 5 * 60 * 1000,     // 5分钟缓存时间
        MAX_RETRIES: 3,               // 最大重试次数
        RETRY_DELAY: 1000             // 重试延迟（毫秒）
    };
    
    // 行业元数据映射（来自questions.js的roles对象）
    const INDUSTRY_META = {
        ib: { name: '投资银行', enName: 'Investment Banking', color: '#3498db', icon: 'building' },
        markets: { name: '销售交易', enName: 'Sales & Trading', color: '#9b59b6', icon: 'chart-line' },
        quant: { name: '量化金融', enName: 'Quantitative Finance', color: '#e74c3c', icon: 'calculator' },
        am: { name: '资产管理', enName: 'Asset Management', color: '#2ecc71', icon: 'chart-pie' },
        corpfin: { name: '公司金融', enName: 'Corporate Finance', color: '#f39c12', icon: 'landmark' },
        risk: { name: '风险管理', enName: 'Risk Management', color: '#d35400', icon: 'shield-alt' },
        fintech: { name: '金融科技', enName: 'FinTech', color: '#1abc9c', icon: 'mobile-alt' },
        fo: { name: '家族办公室', enName: 'Family Office / PWM', color: '#16a085', icon: 'home' },
        all: { name: '所有行业', enName: 'All Roles', color: '#7f8c8d', icon: 'briefcase' }
    };
    
    // 题目类型元数据
    const QUESTION_TYPE_META = {
        technical: { name: '技术题', color: '#3498db', weight: 1.0 },
        behavioral: { name: '行为题', color: '#2ecc71', weight: 0.8 },
        case: { name: '案例分析', color: '#9b59b6', weight: 1.2 },
        market: { name: '市场题', color: '#f39c12', weight: 1.1 },
        all: { name: '所有类型', color: '#7f8c8d', weight: 1.0 }
    };
    
    // 难度元数据
    const DIFFICULTY_META = {
        easy: { name: '简单', color: '#27ae60', weight: 1.0, rating: 4.0 },
        medium: { name: '中等', color: '#f39c12', weight: 1.2, rating: 3.5 },
        hard: { name: '困难', color: '#e74c3c', weight: 1.5, rating: 3.0 }
    };
    
    // 标签系统
    const TAG_SYSTEM = {
        frequent: { name: '高频题', color: '#e74c3c', priority: 1 },
        understanding: { name: '理解题', color: '#3498db', priority: 2 },
        calculation: { name: '计算题', color: '#9b59b6', priority: 3 },
        concept: { name: '概念题', color: '#2ecc71', priority: 4 }
    };
    
    /**
     * 公共API
     */
    const publicAPI = {
        
        /**
         * 初始化数据加载模块
         * @returns {Promise} 初始化结果
         */
        init: async function() {
            if (_isInitialized) {
                console.log('[DataLoader] 模块已初始化');
                return true;
            }
            
            try {
                console.log('[DataLoader] 初始化数据加载模块...');
                await this.loadAllData();
                _isInitialized = true;
                console.log('[DataLoader] 初始化完成');
                return true;
            } catch (error) {
                console.error('[DataLoader] 初始化失败:', error);
                throw error;
            }
        },
        
        /**
         * 加载所有数据（题目、行业统计、缓存）
         * @returns {Promise} 加载结果
         */
        loadAllData: async function() {
            if (_isLoading) {
                console.log('[DataLoader] 数据加载中，请稍候...');
                return new Promise(resolve => {
                    const checkInterval = setInterval(() => {
                        if (!_isLoading) {
                            clearInterval(checkInterval);
                            resolve(_cache);
                        }
                    }, 100);
                });
            }
            
            // 检查缓存是否有效
            if (this.isCacheValid()) {
                console.log('[DataLoader] 使用缓存数据');
                return _cache;
            }
            
            _isLoading = true;
            console.log('[DataLoader] 开始加载数据...');
            
            try {
                // 加载原始题目数据
                const rawQuestions = await this.loadRawQuestions();
                
                // 转换数据格式
                const transformedData = this.transformData(rawQuestions);
                
                // 更新缓存
                _cache = {
                    ...transformedData,
                    rawQuestions: rawQuestions,
                    lastUpdated: new Date().toISOString()
                };
                
                _lastLoadTime = Date.now();
                _isLoading = false;
                
                console.log(`[DataLoader] 数据加载完成: ${transformedData.questions.length}题, ${transformedData.industries.length}个行业`);
                return _cache;
            } catch (error) {
                _isLoading = false;
                console.error('[DataLoader] 数据加载失败:', error);
                throw error;
            }
        },
        
        /**
         * 加载原始题目数据
         * @returns {Promise<Array>} 原始题目数组
         */
        loadRawQuestions: async function() {
            // 尝试从全局变量获取（questions.js已加载）
            if (typeof window !== 'undefined' && window.questionBank && Array.isArray(window.questionBank)) {
                console.log('[DataLoader] 从全局变量questionBank加载数据');
                return window.questionBank;
            }
            
            // 尝试加载questions.js文件
            console.log('[DataLoader] 尝试加载questions.js文件');
            return this.loadQuestionsFromFile();
        },
        
        /**
         * 从文件加载questions.js
         * @returns {Promise<Array>} 题目数组
         */
        loadQuestionsFromFile: async function() {
            return new Promise((resolve, reject) => {
                // 创建script标签动态加载questions.js
                const script = document.createElement('script');
                script.src = CONFIG.DATA_URL;
                script.type = 'text/javascript';
                script.async = true;
                
                let retryCount = 0;
                
                const onLoad = () => {
                    console.log('[DataLoader] questions.js加载成功');
                    if (window.questionBank && Array.isArray(window.questionBank)) {
                        resolve(window.questionBank);
                    } else {
                        reject(new Error('questions.js已加载但未找到questionBank变量'));
                    }
                };
                
                const onError = (error) => {
                    retryCount++;
                    console.warn(`[DataLoader] questions.js加载失败 (尝试 ${retryCount}/${CONFIG.MAX_RETRIES})`);
                    
                    if (retryCount < CONFIG.MAX_RETRIES) {
                        setTimeout(() => {
                            script.remove();
                            document.head.appendChild(script);
                        }, CONFIG.RETRY_DELAY);
                    } else {
                        reject(new Error(`加载questions.js失败: ${error.message}`));
                    }
                };
                
                script.onload = onLoad;
                script.onerror = onError;
                
                document.head.appendChild(script);
            });
        },
        
        /**
         * 转换原始数据为UI所需格式
         * @param {Array} rawQuestions 原始题目数组
         * @returns {Object} 转换后的数据结构
         */
        transformData: function(rawQuestions) {
            console.log('[DataLoader] 转换数据格式...');
            
            if (!rawQuestions || !Array.isArray(rawQuestions)) {
                throw new Error('无效的题目数据');
            }
            
            // 1. 按行业分组
            const industryGroups = this.groupByIndustry(rawQuestions);
            
            // 2. 为每个行业计算统计信息
            const industries = this.calculateIndustryStats(industryGroups);
            
            // 3. 为每个题目添加UI字段
            const questions = rawQuestions.map((q, index) => this.enrichQuestion(q, index));
            
            // 4. 创建行业到题目的映射
            const industryMap = this.createIndustryMap(questions);
            
            // 5. 计算全局统计
            const stats = this.calculateGlobalStats(industries, questions);
            
            return {
                industries,
                questions,
                industryMap,
                stats
            };
        },
        
        /**
         * 按行业分组题目
         * @param {Array} questions 题目数组
         * @returns {Object} 按行业分组的题目字典
         */
        groupByIndustry: function(questions) {
            const groups = {};
            
            // 初始化所有行业组（包括'all'）
            Object.keys(INDUSTRY_META).forEach(industryId => {
                groups[industryId] = [];
            });
            
            // 将题目分配到对应行业
            questions.forEach(question => {
                const industryId = question.role || 'all';
                
                if (groups[industryId]) {
                    groups[industryId].push(question);
                } else {
                    // 如果行业不存在，添加到'all'组
                    groups.all.push(question);
                }
                
                // 同时添加到'all'组
                if (industryId !== 'all') {
                    groups.all.push(question);
                }
            });
            
            // 移除重复（因为'all'组可能包含重复）
            groups.all = Array.from(new Set(groups.all));
            
            return groups;
        },
        
        /**
         * 为每个行业计算统计信息
         * @param {Object} industryGroups 按行业分组的题目
         * @returns {Array} 行业统计数组
         */
        calculateIndustryStats: function(industryGroups) {
            const industries = [];
            
            Object.keys(industryGroups).forEach(industryId => {
                const questions = industryGroups[industryId];
                const meta = INDUSTRY_META[industryId] || INDUSTRY_META.all;
                
                if (questions.length === 0 && industryId !== 'all') {
                    return; // 跳过没有题目的行业
                }
                
                // 计算行业统计
                const stats = this.calculateStatsForIndustry(questions);
                
                // 构建行业对象
                const industry = {
                    id: industryId,
                    name: meta.name,
                    enName: meta.enName,
                    color: meta.color,
                    icon: meta.icon,
                    questionCount: questions.length,
                    avgRating: stats.avgRating,
                    typeDistribution: stats.typeDistribution,
                    difficultyDistribution: stats.difficultyDistribution,
                    tagsDistribution: stats.tagsDistribution,
                    questions: questions.map(q => q.id) // 只存储题目ID引用
                };
                
                industries.push(industry);
            });
            
            return industries;
        },
        
        /**
         * 为行业计算详细统计
         * @param {Array} questions 行业下的题目数组
         * @returns {Object} 统计对象
         */
        calculateStatsForIndustry: function(questions) {
            if (questions.length === 0) {
                return {
                    avgRating: 0,
                    typeDistribution: {},
                    difficultyDistribution: {},
                    tagsDistribution: {}
                };
            }
            
            // 计算平均评分
            const totalRating = questions.reduce((sum, q) => {
                return sum + (q.overallRating || this.calculateQuestionRating(q));
            }, 0);
            const avgRating = totalRating / questions.length;
            
            // 计算类型分布
            const typeDistribution = {};
            questions.forEach(q => {
                const type = q.category || 'technical';
                typeDistribution[type] = (typeDistribution[type] || 0) + 1;
            });
            
            // 计算难度分布
            const difficultyDistribution = {};
            questions.forEach(q => {
                const difficulty = q.difficulty || 'medium';
                difficultyDistribution[difficulty] = (difficultyDistribution[difficulty] || 0) + 1;
            });
            
            // 计算标签分布
            const tagsDistribution = {};
            questions.forEach(q => {
                const tags = this.extractQuestionTags(q);
                tags.forEach(tag => {
                    tagsDistribution[tag] = (tagsDistribution[tag] || 0) + 1;
                });
            });
            
            return {
                avgRating: Math.round(avgRating * 10) / 10, // 保留一位小数
                typeDistribution,
                difficultyDistribution,
                tagsDistribution
            };
        },
        
        /**
         * 丰富题目数据，添加UI所需字段
         * @param {Object} question 原始题目对象
         * @param {number} index 题目索引
         * @returns {Object} 丰富后的题目对象
         */
        enrichQuestion: function(question, index) {
            // 确保有基本字段
            question.id = question.id || index + 1;
            question.role = question.role || 'all';
            question.category = question.category || 'technical';
            question.difficulty = question.difficulty || 'medium';
            
            // 计算题目评分（如果不存在）
            if (!question.overallRating) {
                question.overallRating = this.calculateQuestionRating(question);
            }
            
            // 生成维度评分
            if (!question.dimensionRatings) {
                question.dimensionRatings = this.generateDimensionRatings(question);
            }
            
            // 提取标签
            if (!question.tags) {
                question.tags = this.extractQuestionTags(question);
            }
            
            // 添加UI字段
            question.ui = {
                // 难度颜色
                difficultyColor: DIFFICULTY_META[question.difficulty]?.color || '#f39c12',
                difficultyText: DIFFICULTY_META[question.difficulty]?.name || '中等',
                difficultyStars: this.generateDifficultyStars(question.difficulty),
                
                // 类型颜色
                typeColor: QUESTION_TYPE_META[question.category]?.color || '#3498db',
                typeText: QUESTION_TYPE_META[question.category]?.name || '技术题',
                
                // 星级显示
                starsHTML: this.generateStarsHTML(question.overallRating),
                
                // 标签显示
                tagsDisplay: this.generateTagsDisplay(question.tags),
                
                // 行业信息
                industryName: INDUSTRY_META[question.role]?.name || '所有行业',
                industryColor: INDUSTRY_META[question.role]?.color || '#7f8c8d'
            };
            
            return question;
        },
        
        /**
         * 计算题目综合评分
         * @param {Object} question 题目对象
         * @returns {number} 综合评分（1-5）
         */
        calculateQuestionRating: function(question) {
            // 基于难度、类型和其他因素计算评分
            let baseRating = 3.5; // 默认评分
            
            // 根据难度调整
            const difficultyWeight = DIFFICULTY_META[question.difficulty]?.weight || 1.0;
            baseRating *= difficultyWeight;
            
            // 根据类型调整
            const typeWeight = QUESTION_TYPE_META[question.category]?.weight || 1.0;
            baseRating *= typeWeight;
            
            // 确保在1-5范围内
            baseRating = Math.max(1, Math.min(5, baseRating));
            
            // 添加随机性模拟真实数据（±0.5）
            const randomAdjustment = (Math.random() - 0.5) * 0.5;
            baseRating += randomAdjustment;
            
            return Math.round(baseRating * 10) / 10;
        },
        
        /**
         * 生成维度评分
         * @param {Object} question 题目对象
         * @returns {Object} 维度评分对象
         */
        generateDimensionRatings: function(question) {
            const baseRating = question.overallRating || 3.5;
            
            // 生成围绕baseRating的维度评分
            return {
                contentAccuracy: this.generateDimensionRating(baseRating, 0.2),
                structureClarity: this.generateDimensionRating(baseRating, 0.3),
                roleRelevance: this.generateDimensionRating(baseRating, 0.1)
            };
        },
        
        /**
         * 生成单个维度评分
         * @param {number} base 基础评分
         * @param {number} variance 方差
         * @returns {number} 维度评分
         */
        generateDimensionRating: function(base, variance) {
            const adjustment = (Math.random() - 0.5) * variance * 2;
            const rating = base + adjustment;
            return Math.max(1, Math.min(5, Math.round(rating * 10) / 10));
        },
        
        /**
         * 提取题目标签
         * @param {Object} question 题目对象
         * @returns {Array} 标签数组
         */
        extractQuestionTags: function(question) {
            const tags = [];
            
            // 基于题目属性添加标签
            if (question.difficulty === 'hard') {
                tags.push('concept');
            }
            
            if (question.category === 'technical') {
                tags.push('calculation');
            }
            
            if (question.category === 'behavioral') {
                tags.push('understanding');
            }
            
            // 随机添加高频题标签（30%概率）
            if (Math.random() < 0.3) {
                tags.push('frequent');
            }
            
            // 确保至少有一个标签
            if (tags.length === 0) {
                tags.push('understanding');
            }
            
            return tags;
        },
        
        /**
         * 生成难度星级
         * @param {string} difficulty 难度级别
         * @returns {string} 星级HTML
         */
        generateDifficultyStars: function(difficulty) {
            const level = DIFFICULTY_META[difficulty]?.rating || 3;
            return this.generateStarsHTML(level);
        },
        
        /**
         * 生成星级HTML
         * @param {number} rating 评分（1-5）
         * @returns {string} 星级HTML字符串
         */
        generateStarsHTML: function(rating) {
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
        },
        
        /**
         * 生成标签显示HTML
         * @param {Array} tags 标签数组
         * @returns {string} 标签HTML
         */
        generateTagsDisplay: function(tags) {
            return tags.map(tag => {
                const meta = TAG_SYSTEM[tag];
                if (!meta) return '';
                
                return `<span class="tag" style="background-color: ${meta.color}20; color: ${meta.color}; border-color: ${meta.color}">${meta.name}</span>`;
            }).join('');
        },
        
        /**
         * 创建行业到题目的映射
         * @param {Array} questions 题目数组
         * @returns {Object} 行业映射字典
         */
        createIndustryMap: function(questions) {
            const map = {};
            
            questions.forEach(question => {
                const industryId = question.role || 'all';
                
                if (!map[industryId]) {
                    map[industryId] = [];
                }
                
                map[industryId].push(question);
            });
            
            return map;
        },
        
        /**
         * 计算全局统计
         * @param {Array} industries 行业数组
         * @param {Array} questions 题目数组
         * @returns {Object} 全局统计对象
         */
        calculateGlobalStats: function(industries, questions) {
            const totalQuestions = questions.length;
            const totalIndustries = industries.length - 1; // 排除'all'行业
            const avgRating = industries.reduce((sum, industry) => sum + industry.avgRating, 0) / industries.length;
            
            // 计算类型分布
            const typeDistribution = {};
            questions.forEach(q => {
                const type = q.category || 'technical';
                typeDistribution[type] = (typeDistribution[type] || 0) + 1;
            });
            
            // 计算难度分布
            const difficultyDistribution = {};
            questions.forEach(q => {
                const difficulty = q.difficulty || 'medium';
                difficultyDistribution[difficulty] = (difficultyDistribution[difficulty] || 0) + 1;
            });
            
            return {
                totalQuestions,
                totalIndustries,
                avgRating: Math.round(avgRating * 10) / 10,
                typeDistribution,
                difficultyDistribution,
                lastUpdated: new Date().toISOString()
            };
        },
        
        /**
         * 检查缓存是否有效
         * @returns {boolean} 缓存是否有效
         */
        isCacheValid: function() {
            if (!_lastLoadTime || !_cache.industries) {
                return false;
            }
            
            const cacheAge = Date.now() - _lastLoadTime;
            return cacheAge < CONFIG.CACHE_TTL;
        },
        
        /**
         * 获取所有行业数据
         * @returns {Array} 行业数组
         */
        getIndustries: function() {
            if (!_cache.industries) {
                console.warn('[DataLoader] 行业数据未加载，请先调用loadAllData()');
                return [];
            }
            
            return _cache.industries.filter(industry => industry.id !== 'all');
        },
        
        /**
         * 根据行业ID获取题目
         * @param {string} industryId 行业ID
         * @returns {Array} 题目数组
         */
        getQuestionsByIndustry: function(industryId) {
            if (!_cache.industryMap) {
                console.warn('[DataLoader] 行业映射未加载，请先调用loadAllData()');
                return [];
            }
            
            return _cache.industryMap[industryId] || _cache.industryMap['all'] || [];
        },
        
        /**
         * 根据筛选条件获取题目
         * @param {Object} filters 筛选条件对象
         * @returns {Array} 筛选后的题目数组
         */
        getQuestionsByFilters: function(filters = {}) {
            let questions = [];
            
            // 确定题目源
            if (filters.industry && filters.industry !== 'all') {
                questions = this.getQuestionsByIndustry(filters.industry);
            } else {
                questions = _cache.questions || [];
            }
            
            // 应用筛选条件
            return this.applyFilters(questions, filters);
        },
        
        /**
         * 应用筛选条件到题目数组
         * @param {Array} questions 题目数组
         * @param {Object} filters 筛选条件
         * @returns {Array} 筛选后的题目数组
         */
        applyFilters: function(questions, filters) {
            if (!questions || questions.length === 0) {
                return [];
            }
            
            return questions.filter(question => {
                // 星级筛选
                if (filters.minRating && question.overallRating < filters.minRating) {
                    return false;
                }
                
                // 类型筛选
                if (filters.types && filters.types.length > 0) {
                    if (!filters.types.includes(question.category)) {
                        return false;
                    }
                }
                
                // 难度筛选
                if (filters.difficulties && filters.difficulties.length > 0) {
                    if (!filters.difficulties.includes(question.difficulty)) {
                        return false;
                    }
                }
                
                // 标签筛选
                if (filters.tags && filters.tags.length > 0) {
                    const hasTag = filters.tags.some(tag => question.tags.includes(tag));
                    if (!hasTag) {
                        return false;
                    }
                }
                
                // 搜索筛选
                if (filters.searchQuery) {
                    const query = filters.searchQuery.toLowerCase();
                    const titleMatch = question.title?.toLowerCase().includes(query);
                    const questionTextMatch = question.question?.toLowerCase().includes(query);
                    
                    if (!titleMatch && !questionTextMatch) {
                        return false;
                    }
                }
                
                return true;
            });
        },
        
        /**
         * 清除缓存并重新加载数据
         * @returns {Promise} 重新加载结果
         */
        refresh: async function() {
            console.log('[DataLoader] 刷新数据...');
            _cache = {
                industries: null,
                questions: null,
                stats: null,
                industryMap: null
            };
            _lastLoadTime = null;
            
            return await this.loadAllData();
        },
        
        /**
         * 获取模块状态
         * @returns {Object} 状态对象
         */
        getStatus: function() {
            return {
                isInitialized: _isInitialized,
                isLoading: _isLoading,
                lastLoadTime: _lastLoadTime,
                cacheSize: _cache.questions ? _cache.questions.length : 0,
                industriesCount: _cache.industries ? _cache.industries.length : 0
            };
        },
        
        /**
         * 获取全局统计
         * @returns {Object} 全局统计对象
         */
        getGlobalStats: function() {
            return _cache.stats || {};
        }
    };
    
    return publicAPI;
})();

// 全局访问（如果需要）
if (typeof window !== 'undefined') {
    window.DataLoader = DataLoader;
}

export default DataLoader;