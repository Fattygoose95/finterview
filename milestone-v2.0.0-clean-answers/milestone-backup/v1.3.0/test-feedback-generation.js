// 测试反馈数据生成
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
    
    // 只测试前5个问题
    const testQuestions = questionBank.slice(0, 5);
    
    console.log('\n=== 测试前5个问题 ===');
    
    for (let i = 0; i < testQuestions.length; i++) {
        const q = testQuestions[i];
        console.log(`\n问题 ${i+1}: ${q.title} (${q.role})`);
        
        // 检查当前状态
        const hasScoringKeywords = q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0;
        const hasExpectedStructure = q.expectedStructure && q.expectedStructure.length > 0;
        const hasDetailedAnalysis = q.detailedAnalysis && Object.keys(q.detailedAnalysis).length > 0;
        
        console.log(`当前状态:`);
        console.log(`  scoringKeywords: ${hasScoringKeywords ? '有' : '无'} (${q.scoringKeywords ? Object.keys(q.scoringKeywords).length : 0}个)`);
        console.log(`  expectedStructure: ${hasExpectedStructure ? '有' : '无'} (${q.expectedStructure ? q.expectedStructure.length : 0}个)`);
        console.log(`  detailedAnalysis: ${hasDetailedAnalysis ? '有' : '无'}`);
        
        // 生成反馈数据
        if (!hasScoringKeywords) {
            q.scoringKeywords = extractScoringKeywords(q.modelAnswer || '', q.question || '', q.role || '');
            console.log(`  生成 scoringKeywords: ${Object.keys(q.scoringKeywords).length}个关键词`);
        }
        
        if (!hasExpectedStructure) {
            q.expectedStructure = generateExpectedStructure(q.question || '', q.role || '');
            console.log(`  生成 expectedStructure: ${q.expectedStructure.length}个结构项`);
        }
        
        if (!hasDetailedAnalysis) {
            q.detailedAnalysis = generateDetailedAnalysis(q.question || '', q.role || '', q.title || '');
            console.log(`  生成 detailedAnalysis: 完成`);
        }
        
        // 显示生成的内容
        console.log(`生成的内容示例:`);
        console.log(`  scoringKeywords:`, Object.keys(q.scoringKeywords).slice(0, 3));
        console.log(`  expectedStructure:`, q.expectedStructure.slice(0, 3));
        console.log(`  detailedAnalysis keys:`, Object.keys(q.detailedAnalysis));
    }
    
    console.log('\n=== 测试完成 ===');
    
} catch (error) {
    console.error('处理错误:', error.message);
    console.error(error.stack);
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