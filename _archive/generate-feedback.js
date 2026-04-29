// 为finterview问题生成反馈数据
const fs = require('fs');
const path = require('path');

// 读取questions.js文件
const content = fs.readFileSync(path.join(__dirname, 'questions.js'), 'utf8');

// 提取questionBank数组
const startMarker = 'const questionBank = [';
const endMarker = '];';

const startIndex = content.indexOf(startMarker);
let endIndex = content.lastIndexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('无法找到questionBank数组');
    process.exit(1);
}

// 提取并解析
const arraySection = content.substring(startIndex + startMarker.length - 1, endIndex + 1);

try {
    // 修复JSON并解析
    let jsonStr = arraySection
        .replace(/,\s*]/g, ']')
        .replace(/,\s*}/g, '}');
    
    const questionBank = eval(`(${jsonStr})`);
    
    console.log(`加载 ${questionBank.length} 个问题`);
    
    // 统计当前反馈状态
    let updatedCount = 0;
    let skippedCount = 0;
    
    // 处理每个问题
    for (let i = 0; i < questionBank.length; i++) {
        const q = questionBank[i];
        
        // 检查是否已有完整反馈
        const hasScoringKeywords = q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0;
        const hasExpectedStructure = q.expectedStructure && q.expectedStructure.length > 0;
        const hasDetailedAnalysis = q.detailedAnalysis && Object.keys(q.detailedAnalysis).length > 0;
        
        // 如果已有完整反馈，跳过
        if (hasScoringKeywords && hasExpectedStructure && hasDetailedAnalysis) {
            skippedCount++;
            continue;
        }
        
        // 生成反馈数据
        generateFeedbackForQuestion(q);
        updatedCount++;
        
        // 每处理10个问题输出进度
        if (updatedCount % 10 === 0) {
            console.log(`已处理 ${updatedCount} 个问题...`);
        }
    }
    
    console.log(`\n处理完成:`);
    console.log(`- 更新了 ${updatedCount} 个问题的反馈数据`);
    console.log(`- 跳过了 ${skippedCount} 个已有完整反馈的问题`);
    
    // 保存更新后的questionBank
    saveUpdatedQuestions(questionBank);
    
} catch (error) {
    console.error('处理错误:', error.message);
    console.error(error.stack);
}

// 为单个问题生成反馈数据
function generateFeedbackForQuestion(q) {
    const questionText = q.question || '';
    const modelAnswer = q.modelAnswer || '';
    const title = q.title || '';
    const role = q.role || '';
    
    // 1. 生成scoringKeywords（从modelAnswer中提取关键词）
    if (!q.scoringKeywords || Object.keys(q.scoringKeywords).length === 0) {
        q.scoringKeywords = extractScoringKeywords(modelAnswer, questionText, role);
    }
    
    // 2. 生成expectedStructure（基于问题类型）
    if (!q.expectedStructure || q.expectedStructure.length === 0) {
        q.expectedStructure = generateExpectedStructure(questionText, role);
    }
    
    // 3. 生成detailedAnalysis
    if (!q.detailedAnalysis || Object.keys(q.detailedAnalysis).length === 0) {
        q.detailedAnalysis = generateDetailedAnalysis(questionText, role, title);
    }
}

// 从答案中提取评分关键词
function extractScoringKeywords(modelAnswer, questionText, role) {
    const keywords = {};
    
    // 基于角色的通用关键词
    const roleKeywords = {
        'ib': ['valuation', 'modeling', 'M&A', 'due diligence', 'presentation', 'client', 'deal', 'pitch', 'analysis'],
        'am': ['portfolio', 'allocation', 'risk', 'return', 'alpha', 'beta', 'benchmark', 'strategy', 'research'],
        'quant': ['model', 'algorithm', 'statistics', 'probability', 'programming', 'data', 'analysis', 'backtesting'],
        'markets': ['trading', 'liquidity', 'execution', 'market', 'price', 'volume', 'order', 'risk', 'strategy'],
        'risk': ['risk', 'management', 'measurement', 'control', 'compliance', 'regulation', 'capital', 'stress', 'scenario'],
        'corpfin': ['finance', 'corporate', 'capital', 'budgeting', 'planning', 'strategy', 'management', 'decision'],
        'fintech': ['technology', 'digital', 'innovation', 'platform', 'payment', 'blockchain', 'data', 'security'],
        'fo': ['family', 'office', 'wealth', 'management', 'planning', 'succession', 'legacy', 'philanthropy'],
        'general': ['finance', 'business', 'analysis', 'strategy', 'management', 'decision', 'communication']
    };
    
    // 添加角色特定关键词
    if (roleKeywords[role]) {
        roleKeywords[role].forEach((word, index) => {
            keywords[word] = 20 - (index * 2); // 权重递减
        });
    }
    
    // 从问题文本中提取关键词
    const questionWords = questionText.toLowerCase().match(/\b(\w{4,})\b/g) || [];
    const stopWords = ['what', 'how', 'why', 'when', 'where', 'which', 'would', 'could', 'should', 'explain', 'describe'];
    
    for (const word of questionWords) {
        if (!stopWords.includes(word) && word.length > 3) {
            if (!keywords[word]) {
                keywords[word] = 15;
            }
        }
    }
    
    // 限制关键词数量
    const sortedEntries = Object.entries(keywords).sort((a, b) => b[1] - a[1]);
    const limitedKeywords = {};
    sortedEntries.slice(0, 10).forEach(([key, value]) => {
        limitedKeywords[key] = value;
    });
    
    return limitedKeywords;
}

// 生成预期结构
function generateExpectedStructure(questionText, role) {
    const structures = {
        'ib': ['Framework Overview', 'Key Components Analysis', 'Practical Application', 'Industry Examples', 'Conclusion & Recommendation'],
        'am': ['Investment Thesis', 'Risk-Return Profile', 'Portfolio Fit', 'Monitoring Plan', 'Exit Strategy'],
        'quant': ['Problem Definition', 'Model Selection', 'Data Requirements', 'Implementation Approach', 'Validation Method'],
        'markets': ['Market Context', 'Trading Strategy', 'Risk Management', 'Execution Plan', 'Performance Metrics'],
        'risk': ['Risk Identification', 'Measurement Methodology', 'Control Framework', 'Monitoring Process', 'Reporting Structure'],
        'corpfin': ['Business Context', 'Financial Analysis', 'Strategic Implications', 'Implementation Plan', 'Expected Outcomes'],
        'fintech': ['Problem Statement', 'Technology Solution', 'Implementation Roadmap', 'User Benefits', 'Business Impact'],
        'fo': ['Family Context', 'Wealth Objectives', 'Strategy Design', 'Implementation Approach', 'Succession Planning'],
        'general': ['Introduction', 'Main Analysis', 'Key Insights', 'Practical Implications', 'Conclusion']
    };
    
    return structures[role] || structures['general'];
}

// 生成详细分析
function generateDetailedAnalysis(questionText, role, title) {
    return {
        overview: `This question assesses understanding of ${title.toLowerCase()} in the context of ${role} roles.`,
        whyWorks: "A strong answer demonstrates both technical knowledge and practical application, showing how theoretical concepts translate to real-world finance scenarios.",
        commonMistakes: [
            "Being too vague or theoretical without concrete examples",
            "Focusing on memorized definitions rather than applied understanding",
            "Neglecting to connect the concept to current market trends or practices",
            "Failing to structure the answer logically for easy comprehension"
        ],
        improvementTips: [
            "Reference recent market examples or case studies",
            "Use a clear framework to structure your response",
            "Connect the concept to practical applications in finance roles",
            "Tailor the depth of explanation to the interviewer's likely expertise level"
        ]
    };
}

// 保存更新后的问题库
function saveUpdatedQuestions(questionBank) {
    // 构建新的questions.js内容
    let newContent = `// finterview Question Bank v0.7
// Finance interview questions categorized by role and question type
// Updated: ${new Date().toISOString().split('T')[0]} - Added feedback data (scoringKeywords, expectedStructure, detailedAnalysis)
// Answer fields set: 2026-03-20

// Role definitions (for filtering)
const roles = {
    "ib": { name: "Investment Banking", color: "#3498db", icon: "fas fa-building" },
    "markets": { name: "Sales & Trading", color: "#9b59b6", icon: "fas fa-chart-line" },
    "quant": { name: "Quantitative Finance", color: "#e74c3c", icon: "fas fa-calculator" },
    "am": { name: "Asset Management", color: "#2ecc71", icon: "fas fa-chart-pie" },
    "corpfin": { name: "Corporate Finance", color: "#f39c12", icon: "fas fa-landmark" },
    "fintech": { name: "FinTech", color: "#1abc9c", icon: "fas fa-mobile-alt" },
    "fo": { name: "Family Office", color: "#34495e", icon: "fas fa-home" },
    "risk": { name: "Risk Management", color: "#e67e22", icon: "fas fa-shield-alt" },
    "general": { name: "General Finance", color: "#95a5a6", icon: "fas fa-globe" }
};

const questionBank = ${JSON.stringify(questionBank, null, 2)};

// Export for browser
if (typeof window !== 'undefined') {
    window.questionBank = questionBank;
    window.roles = roles;
}`;

    // 备份原文件
    const backupPath = path.join(__dirname, `questions.js.backup.${Date.now()}`);
    fs.copyFileSync(path.join(__dirname, 'questions.js'), backupPath);
    console.log(`原文件已备份到: ${backupPath}`);
    
    // 写入新文件
    fs.writeFileSync(path.join(__dirname, 'questions.js'), newContent, 'utf8');
    console.log('已更新 questions.js 文件');
    
    // 更新HTML文件中的版本号
    updateHtmlVersions();
}

// 更新HTML文件中的版本号
function updateHtmlVersions() {
    const htmlFiles = [
        'index.html',
        'finance-bro.html',
        'industry-practice.html',
        'industry-filter.html',
        'profile.html'
    ];
    
    const newVersion = `v${new Date().toISOString().split('T')[0].replace(/-/g, '')}_feedback`;
    
    htmlFiles.forEach(filename => {
        const filePath = path.join(__dirname, filename);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            // 更新版本号（查找类似 v=20260320_2300 的模式）
            content = content.replace(/v=\d{8}_\d+/g, `v=${newVersion}`);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`更新 ${filename} 版本号为: ${newVersion}`);
        }
    });
}