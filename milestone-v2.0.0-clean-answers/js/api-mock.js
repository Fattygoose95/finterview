/**
 * finterview API 模拟
 * 展示高频题模式和随机模式的API设计
 */

// 模拟题目数据结构
const questionSchema = {
    id: "number",
    text: "string",
    industry: "string",
    // 高频题模式字段
    frequencyScore: "number", // 频率评分 0-5
    frequencyDescription: "string", // 频率描述
    // 随机模式字段
    starRating: "number", // 综合星级 0-5
    difficulty: "string", // "easy", "medium", "hard"
    type: "string", // "简答题", "选择题", "案例分析"
    tags: "array", // ["高频题", "理解题", "权威题"]
    dimensions: {
        clarity: "number", // 清晰度
        depth: "number", // 深度
        relevance: "number" // 相关性
    },
    createdAt: "string", // ISO日期字符串
    updatedAt: "string" // ISO日期字符串
};

// 模拟数据库
const mockDatabase = {
    industries: [
        { id: 1, name: "投资银行", questionCount: 150, avgStarRating: 4.6 },
        { id: 2, name: "科技行业", questionCount: 200, avgStarRating: 4.5 },
        { id: 3, name: "咨询行业", questionCount: 120, avgStarRating: 4.7 },
        { id: 4, name: "金融财务", questionCount: 180, avgStarRating: 4.4 }
    ],
    questions: [
        // 这里使用与high-frequency-list.js和random-list.js相同的数据
        // 实际应用中，这些数据会从数据库获取
    ]
};

/**
 * 模拟API路由
 */
const apiRoutes = {
    // 获取行业列表
    "GET /api/industries": {
        description: "获取所有行业列表",
        response: {
            success: true,
            data: mockDatabase.industries
        }
    },
    
    // 获取高频题模式题目列表
    "GET /api/industries/:industryId/questions?mode=high-frequency&sort=frequency": {
        description: "高频题模式题目列表 - 按频率降序排序",
        parameters: {
            industryId: "行业ID",
            mode: "high-frequency (固定)",
            sort: "frequency (固定)",
            limit: "每页数量 (可选，默认50)",
            offset: "偏移量 (可选，默认0)"
        },
        response: {
            success: true,
            data: [
                {
                    id: 1,
                    text: "请解释DCF模型的三个主要组成部分",
                    frequencyScore: 4.8,
                    frequencyDescription: "极高频率",
                    industry: "投资银行"
                },
                // 更多题目...
            ],
            pagination: {
                total: 150,
                limit: 50,
                offset: 0
            }
        }
    },
    
    // 获取随机模式题目列表
    "GET /api/industries/:industryId/questions?mode=random": {
        description: "随机模式题目列表 - 支持多维度筛选",
        parameters: {
            industryId: "行业ID",
            mode: "random (固定)",
            sort: "排序方式: star-desc(默认), frequency-desc, difficulty-asc, random",
            filters: "筛选条件 (JSON字符串)",
            limit: "每页数量",
            offset: "偏移量"
        },
        filtersExample: {
            starRating: 4, // 最小星级
            type: ["简答题", "选择题"], // 题型数组
            difficulty: ["easy", "medium"], // 难度数组
            tags: ["高频题", "理解题"] // 标签数组
        },
        response: {
            success: true,
            data: [
                {
                    id: 1,
                    text: "请解释DCF模型的三个主要组成部分",
                    starRating: 4.8,
                    frequencyScore: 4.8,
                    difficulty: "medium",
                    type: "简答题",
                    tags: ["高频题", "理解题", "权威题"],
                    industry: "投资银行",
                    dimensions: {
                        clarity: 4.5,
                        depth: 4.7,
                        relevance: 4.9
                    }
                },
                // 更多题目...
            ],
            pagination: {
                total: 150,
                limit: 20,
                offset: 0
            }
        }
    },
    
    // 获取用户偏好
    "GET /api/user/preferences": {
        description: "获取用户偏好设置",
        response: {
            success: true,
            data: {
                defaultMode: "high-frequency", // 或 "random"
                rememberModeChoice: true,
                defaultIndustry: 1,
                // 其他偏好...
            }
        }
    },
    
    // 更新用户偏好
    "POST /api/user/preferences/mode": {
        description: "更新用户默认模式偏好",
        request: {
            mode: "high-frequency | random",
            rememberChoice: true | false
        },
        response: {
            success: true,
            message: "偏好已更新"
        }
    },
    
    // 模式切换统计
    "POST /api/analytics/mode-switch": {
        description: "记录模式切换事件",
        request: {
            fromMode: "high-frequency | random",
            toMode: "high-frequency | random",
            context: "页面位置",
            timestamp: "ISO日期字符串"
        },
        response: {
            success: true
        }
    }
};

/**
 * 模拟API调用函数
 */
class ApiMock {
    /**
     * 模拟获取高频题列表
     * @param {number} industryId - 行业ID
     * @param {object} options - 选项
     * @returns {Promise} 模拟API响应
     */
    static async getHighFrequencyQuestions(industryId, options = {}) {
        const { limit = 50, offset = 0 } = options;
        
        // 模拟网络延迟
        await this.delay(300);
        
        // 在实际应用中，这里会从数据库查询
        // 这里返回模拟数据
        const mockQuestions = [
            { id: 1, text: "请解释DCF模型的三个主要组成部分", frequencyScore: 4.8, frequencyDescription: "极高频率", industry: "投资银行" },
            { id: 2, text: "什么是WACC？如何计算？", frequencyScore: 4.5, frequencyDescription: "高频率", industry: "投资银行" },
            { id: 3, text: "比较股权融资和债权融资的优缺点", frequencyScore: 4.3, frequencyDescription: "高频率", industry: "投资银行" },
            { id: 4, text: "如何评估一家公司的信用风险？", frequencyScore: 4.2, frequencyDescription: "高频率", industry: "投资银行" },
            { id: 5, text: "解释β系数的含义及其在CAPM中的应用", frequencyScore: 4.0, frequencyDescription: "中等频率", industry: "投资银行" },
        ];
        
        return {
            success: true,
            data: mockQuestions,
            pagination: {
                total: 150,
                limit,
                offset
            }
        };
    }
    
    /**
     * 模拟获取随机模式题目列表
     * @param {number} industryId - 行业ID
     * @param {object} options - 选项
     * @returns {Promise} 模拟API响应
     */
    static async getRandomQuestions(industryId, options = {}) {
        const { 
            sort = 'star-desc', 
            filters = {}, 
            limit = 20, 
            offset = 0 
        } = options;
        
        // 模拟网络延迟
        await this.delay(500);
        
        // 在实际应用中，这里会应用筛选和排序逻辑
        // 这里返回模拟数据
        const mockQuestions = [
            { 
                id: 1, 
                text: "请解释DCF模型的三个主要组成部分", 
                starRating: 4.8, 
                frequencyScore: 4.8, 
                difficulty: "medium", 
                type: "简答题", 
                tags: ["高频题", "理解题", "权威题"], 
                industry: "投资银行" 
            },
            // 更多题目...
        ];
        
        return {
            success: true,
            data: mockQuestions,
            pagination: {
                total: 150,
                limit,
                offset
            }
        };
    }
    
    /**
     * 模拟保存用户偏好
     * @param {object} preferences - 用户偏好
     * @returns {Promise} 模拟API响应
     */
    static async saveUserPreferences(preferences) {
        await this.delay(200);
        
        // 在实际应用中，这里会保存到数据库
        localStorage.setItem('finterview-user-preferences', JSON.stringify(preferences));
        
        return {
            success: true,
            message: "偏好已保存"
        };
    }
    
    /**
     * 模拟获取用户偏好
     * @returns {Promise} 模拟API响应
     */
    static async getUserPreferences() {
        await this.delay(150);
        
        // 从本地存储获取或返回默认值
        const stored = localStorage.getItem('finterview-user-preferences');
        const defaultPreferences = {
            defaultMode: 'random',
            rememberModeChoice: true,
            defaultIndustry: 1
        };
        
        return {
            success: true,
            data: stored ? JSON.parse(stored) : defaultPreferences
        };
    }
    
    /**
     * 模拟延迟
     * @param {number} ms - 毫秒数
     * @returns {Promise}
     */
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * 集成建议
 */
const integrationNotes = `
## 与现有系统集成建议

### 1. 数据库迁移
- 在questions表中添加frequency_score字段 (DECIMAL(3,1))
- 确保现有题目数据有默认频率评分
- 考虑添加frequency_calculation_log表记录频率计算历史

### 2. 后端API扩展
- 扩展现有的/questions端点，支持mode参数
- 添加新的排序选项：按频率评分排序
- 确保筛选逻辑与模式兼容
- 添加用户偏好端点

### 3. 前端集成步骤
1. 添加模式选择路由：/industries/:id/mode
2. 创建模式选择组件（参考mode-selection.html）
3. 修改现有题目列表组件，支持两种模式渲染
4. 添加模式切换逻辑和状态管理
5. 更新导航和面包屑路径

### 4. 状态管理
- 使用Redux/Vuex管理当前模式状态
- 将筛选状态与模式关联
- 实现模式切换时的状态重置/保留逻辑

### 5. 渐进式实施策略
1. 第一阶段：实现高频题模式基本功能，不破坏现有随机模式
2. 第二阶段：增强随机模式筛选器，添加模式切换入口
3. 第三阶段：添加用户偏好存储和智能推荐
4. 第四阶段：优化性能和用户体验
`;

// 导出API文档
const apiDocumentation = {
    schema: questionSchema,
    routes: apiRoutes,
    mock: ApiMock,
    integration: integrationNotes
};

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = apiDocumentation;
} else {
    // 浏览器环境
    window.FinterviewAPI = apiDocumentation;
}