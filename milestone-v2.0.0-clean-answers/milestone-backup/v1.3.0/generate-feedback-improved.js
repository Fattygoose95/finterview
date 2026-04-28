// 改进的反馈数据生成脚本
// 基于问题内容和modelAnswer生成相关反馈数据

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
    
    // 先处理前100个问题作为测试
    const processCount = 100; // 先测试100题
    const questionsToProcess = questionBank.slice(0, processCount);
    
    console.log(`\n处理前 ${processCount} 个问题...`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    // 处理每个问题
    for (let i = 0; i < questionsToProcess.length; i++) {
        const q = questionsToProcess[i];
        
        // 检查是否已有完整反馈
        const hasScoringKeywords = q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0;
        const hasExpectedStructure = q.expectedStructure && q.expectedStructure.length > 0;
        const hasDetailedAnalysis = q.detailedAnalysis && Object.keys(q.detailedAnalysis).length > 0;
        
        // 如果已有完整反馈，跳过
        if (hasScoringKeywords && hasExpectedStructure && hasDetailedAnalysis) {
            skippedCount++;
            continue;
        }
        
        // 生成改进的反馈数据
        generateImprovedFeedback(q);
        updatedCount++;
        
        // 每处理10个问题输出进度
        if (updatedCount % 10 === 0) {
            console.log(`  已处理 ${updatedCount} 个问题...`);
        }
    }
    
    console.log(`\n处理完成:`);
    console.log(`- 更新了 ${updatedCount} 个问题的反馈数据`);
    console.log(`- 跳过了 ${skippedCount} 个已有完整反馈的问题`);
    
    // 保存更新后的questionBank（只更新处理过的部分）
    savePartialUpdate(questionBank, processCount);
    
} catch (error) {
    console.error('处理错误:', error.message);
    console.error(error.stack);
}

// 生成改进的反馈数据
function generateImprovedFeedback(q) {
    const questionText = q.question || '';
    const modelAnswer = q.modelAnswer || '';
    const title = q.title || '';
    const role = q.role || '';
    const category = q.category || '';
    
    // 1. 生成scoringKeywords（从modelAnswer中提取关键术语）
    if (!q.scoringKeywords || Object.keys(q.scoringKeywords).length === 0) {
        q.scoringKeywords = extractTechnicalKeywords(modelAnswer, questionText, role);
    }
    
    // 2. 生成expectedStructure（基于问题类型和内容）
    if (!q.expectedStructure || q.expectedStructure.length === 0) {
        q.expectedStructure = generateQuestionStructure(questionText, modelAnswer, role);
    }
    
    // 3. 生成detailedAnalysis（针对具体问题）
    if (!q.detailedAnalysis || Object.keys(q.detailedAnalysis).length === 0) {
        q.detailedAnalysis = generateQuestionAnalysis(questionText, modelAnswer, role, title, category);
    }
}

// 从答案中提取技术关键词
function extractTechnicalKeywords(modelAnswer, questionText, role) {
    const keywords = {};
    
    // 常见停用词
    const stopWords = new Set([
        'the', 'and', 'for', 'that', 'with', 'this', 'from', 'have', 'which', 'what',
        'how', 'why', 'when', 'where', 'would', 'could', 'should', 'about', 'their',
        'there', 'been', 'they', 'will', 'also', 'more', 'other', 'some', 'such',
        'than', 'then', 'them', 'these', 'those', 'upon', 'very', 'were', 'what',
        'when', 'whom', 'your', 'into', 'over', 'under', 'after', 'before'
    ]);
    
    // 提取modelAnswer中的单词
    const words = modelAnswer.toLowerCase()
        .replace(/[^\w\s-]/g, ' ') // 替换标点为空格
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.has(word));
    
    // 统计词频
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // 选择高频词作为关键词
    const sortedWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15); // 取前15个高频词
    
    // 分配权重（基于频率和重要性）
    let maxWeight = 20;
    sortedWords.forEach(([word, freq], index) => {
        // 权重递减：第一个词20分，最后一个词5分
        const weight = Math.max(5, maxWeight - index);
        keywords[word] = weight;
    });
    
    // 从问题文本中添加重要术语
    const questionWords = questionText.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 4 && !stopWords.has(word) && !keywords[word]);
    
    questionWords.slice(0, 5).forEach((word, index) => {
        if (!keywords[word]) {
            keywords[word] = 15 - index * 2; // 15, 13, 11, 9, 7
        }
    });
    
    return keywords;
}

// 基于问题类型生成结构
function generateQuestionStructure(questionText, modelAnswer, role) {
    // 分析问题类型
    const questionLower = questionText.toLowerCase();
    
    // 判断问题类型
    let structure = [];
    
    if (questionLower.includes('compare') || questionLower.includes('contrast')) {
        structure = [
            'Definition of first concept',
            'Definition of second concept', 
            'Key similarities',
            'Key differences',
            'Practical implications'
        ];
    } else if (questionLower.includes('explain') || questionLower.includes('describe')) {
        structure = [
            'Concept definition',
            'Key components or mechanisms',
            'Practical applications',
            'Examples or case studies',
            'Importance in finance context'
        ];
    } else if (questionLower.includes('how would') || questionLower.includes('how do')) {
        structure = [
            'Problem analysis',
            'Methodology or approach',
            'Step-by-step process',
            'Expected outcomes',
            'Risk considerations'
        ];
    } else if (questionLower.includes('what are') || questionLower.includes('what is')) {
        structure = [
            'Direct answer/definition',
            'Key characteristics',
            'Contextual relevance',
            'Practical implications',
            'Related concepts'
        ];
    } else {
        // 默认结构基于角色
        const roleStructures = {
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
        
        structure = roleStructures[role] || roleStructures['general'];
    }
    
    return structure;
}

// 生成问题分析
function generateQuestionAnalysis(questionText, modelAnswer, role, title, category) {
    // 分析问题特点
    const questionLower = questionText.toLowerCase();
    let difficulty = 'medium';
    let questionType = 'technical';
    
    if (questionLower.includes('behavioral') || questionLower.includes('experience') || 
        questionLower.includes('situation') || questionLower.includes('team')) {
        questionType = 'behavioral';
    } else if (questionLower.includes('calculate') || questionLower.includes('formula') ||
               questionLower.includes('model') || questionLower.includes('algorithm')) {
        questionType = 'quantitative';
        difficulty = 'hard';
    } else if (questionLower.includes('explain') || questionLower.includes('define') ||
               questionLower.includes('what is') || questionLower.includes('describe')) {
        questionType = 'conceptual';
        difficulty = 'easy';
    }
    
    // 根据问题类型生成分析
    const analysis = {
        overview: `This ${questionType} question tests understanding of ${title.toLowerCase()} in ${role} contexts.`,
        whyWorks: getWhyWorksText(questionType, role),
        commonMistakes: getCommonMistakes(questionType, role),
        improvementTips: getImprovementTips(questionType, role)
    };
    
    // 添加特定于类别的内容
    if (category) {
        analysis.overview += ` Focuses on ${category} aspects.`;
    }
    
    return analysis;
}

// 辅助函数
function getWhyWorksText(questionType, role) {
    const texts = {
        'technical': `A strong answer demonstrates both theoretical knowledge and practical application, showing how ${role} concepts translate to real-world scenarios.`,
        'behavioral': `Effective responses use the STAR (Situation, Task, Action, Result) framework to provide concrete examples of ${role} competencies.`,
        'quantitative': `Clear, step-by-step explanations with correct calculations show analytical rigor and attention to detail in ${role} work.`,
        'conceptual': `Structured explanations that connect fundamental concepts to current ${role} practices demonstrate both knowledge and critical thinking.`
    };
    
    return texts[questionType] || texts['technical'];
}

function getCommonMistakes(questionType, role) {
    const mistakes = {
        'technical': [
            "Providing generic definitions without ${role}-specific applications",
            "Neglecting to mention current industry trends or regulatory changes",
            "Focusing on theory without connecting to practical implementation",
            "Using jargon without clear explanations for non-specialist interviewers"
        ],
        'behavioral': [
            "Giving vague responses without specific examples or outcomes",
            "Failing to highlight relevant ${role} skills or competencies",
            "Focusing on personal success rather than team or organizational impact",
            "Not reflecting on lessons learned or growth from the experience"
        ],
        'quantitative': [
            "Skipping steps or assuming the interviewer knows intermediate calculations",
            "Not explaining the rationale behind formula or model choices",
            "Failing to discuss assumptions, limitations, or sensitivity analysis",
            "Focusing only on the answer without contextualizing its business implications"
        ],
        'conceptual': [
            "Providing textbook definitions without practical ${role} context",
            "Failing to compare or contrast with related concepts",
            "Not providing concrete examples or case studies",
            "Being too abstract without connecting to real-world applications"
        ]
    };
    
    return mistakes[questionType] || mistakes['technical'];
}

function getImprovementTips(questionType, role) {
    const tips = {
        'technical': [
            "Reference recent ${role} deals, products, or market developments",
            "Use frameworks (e.g., 3-statement models, valuation multiples) to structure answers",
            "Connect concepts to specific ${role} job functions and responsibilities",
            "Tailor technical depth to the interviewer's likely background"
        ],
        'behavioral': [
            "Use the STAR framework consistently for all behavioral questions",
            "Quantify achievements with metrics relevant to ${role} (e.g., deal size, returns, efficiency gains)",
            "Highlight ${role}-specific skills like financial modeling, client presentation, or risk assessment",
            "Show progression from initial challenges to learned competencies"
        ],
        'quantitative': [
            "Walk through calculations step-by-step, explaining each transformation",
            "Discuss alternative approaches and why you chose your method",
            "Connect quantitative results to business decisions in ${role} context",
            "Practice common ${role} calculations until they become second nature"
        ],
        'conceptual': [
            "Start with a clear definition, then expand with ${role} applications",
            "Compare and contrast with 2-3 related concepts to show breadth of knowledge",
            "Use analogies or visual explanations for complex ${role} concepts",
            "Link historical context with current ${role} practices and future trends"
        ]
    };
    
    return tips[questionType] || tips['technical'];
}

// 保存部分更新
function savePartialUpdate(questionBank, processCount) {
    // 只备份questions.js
    const backupPath = path.join(__dirname, `questions.js.backup.before-feedback-${Date.now()}`);
    fs.copyFileSync(path.join(__dirname, 'questions.js'), backupPath);
    console.log(`\n原文件已备份到: ${backupPath}`);
    
    // 读取原文件内容
    let originalContent = fs.readFileSync(path.join(__dirname, 'questions.js'), 'utf8');
    
    // 构建新的questionBank数组字符串
    const newQuestionBankStr = JSON.stringify(questionBank, null, 2);
    
    // 替换原文件中的questionBank部分
    // 找到const questionBank = [ 的位置
    const bankStart = originalContent.indexOf('const questionBank = [');
    const bankEnd = originalContent.lastIndexOf('];') + 2; // 包含'];
    
    if (bankStart !== -1 && bankEnd !== -1) {
        const beforeBank = originalContent.substring(0, bankStart);
        const afterBank = originalContent.substring(bankEnd);
        
        // 构建新内容
        const newContent = beforeBank + 'const questionBank = ' + newQuestionBankStr + ';' + afterBank;
        
        // 写入文件
        fs.writeFileSync(path.join(__dirname, 'questions.js'), newContent, 'utf8');
        console.log(`已更新 questions.js 文件（处理了前 ${processCount} 个问题）`);
        
        // 更新版本号
        updateVersionTag();
    } else {
        console.error('无法找到questionBank定义位置');
    }
}

// 更新版本号
function updateVersionTag() {
    const htmlFiles = [
        'index.html',
        'finance-bro.html', 
        'industry-practice.html',
        'industry-filter.html',
        'profile.html'
    ];
    
    const newVersion = `v${new Date().toISOString().split('T')[0].replace(/-/g, '')}_feedback_partial`;
    
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
    
    console.log('\n⚠️ 注意: 只处理了前100个问题作为测试');
    console.log('运行完整生成请使用: node generate-feedback-full.js');
}