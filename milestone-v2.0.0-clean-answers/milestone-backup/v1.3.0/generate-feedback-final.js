// 最终版反馈数据生成脚本
// 修复关键词提取bug，处理所有问题

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
    
    let updatedCount = 0;
    let fixedArrayFormat = 0;
    let skippedCount = 0;
    
    // 处理所有问题
    for (let i = 0; i < questionBank.length; i++) {
        const q = questionBank[i];
        
        // 检查并修复现有的scoringKeywords（如果是数组格式）
        if (q.scoringKeywords && Array.isArray(q.scoringKeywords)) {
            // 将数组转换为对象格式
            const keywordArray = q.scoringKeywords;
            q.scoringKeywords = {};
            keywordArray.forEach((keyword, index) => {
                if (typeof keyword === 'string' && keyword.trim().length > 0) {
                    // 分配递减权重
                    const weight = 20 - (index * 2);
                    q.scoringKeywords[keyword.trim()] = Math.max(5, weight);
                }
            });
            fixedArrayFormat++;
        }
        
        // 检查是否已有完整的对象格式scoringKeywords
        const hasValidScoringKeywords = q.scoringKeywords && 
                                      typeof q.scoringKeywords === 'object' && 
                                      !Array.isArray(q.scoringKeywords) &&
                                      Object.keys(q.scoringKeywords).length > 0;
        
        const hasExpectedStructure = q.expectedStructure && q.expectedStructure.length > 0;
        const hasDetailedAnalysis = q.detailedAnalysis && Object.keys(q.detailedAnalysis).length > 0;
        
        // 如果已有完整反馈，跳过生成（但可能修复了数组格式）
        if (hasValidScoringKeywords && hasExpectedStructure && hasDetailedAnalysis) {
            skippedCount++;
            continue;
        }
        
        // 生成或完善反馈数据
        generateFinalFeedback(q);
        updatedCount++;
        
        // 每处理50个问题输出进度
        if (updatedCount % 50 === 0) {
            console.log(`  已处理 ${updatedCount} 个问题...`);
        }
    }
    
    console.log(`\n处理完成:`);
    console.log(`- 更新了 ${updatedCount} 个问题的反馈数据`);
    console.log(`- 修复了 ${fixedArrayFormat} 个数组格式的scoringKeywords`);
    console.log(`- 跳过了 ${skippedCount} 个已有完整反馈的问题`);
    
    // 保存更新
    saveFinalUpdate(questionBank);
    
} catch (error) {
    console.error('处理错误:', error.message);
    console.error(error.stack);
}

// 生成最终版反馈数据
function generateFinalFeedback(q) {
    const questionText = q.question || '';
    const modelAnswer = q.modelAnswer || '';
    const title = q.title || '';
    const role = q.role || '';
    const category = q.category || '';
    
    // 1. 生成或完善scoringKeywords
    if (!q.scoringKeywords || Object.keys(q.scoringKeywords).length === 0 || Array.isArray(q.scoringKeywords)) {
        q.scoringKeywords = extractSmartKeywords(modelAnswer, questionText, role);
    }
    
    // 2. 生成或完善expectedStructure
    if (!q.expectedStructure || q.expectedStructure.length === 0) {
        q.expectedStructure = generateSmartStructure(questionText, modelAnswer, role, category);
    }
    
    // 3. 生成或完善detailedAnalysis
    if (!q.detailedAnalysis || Object.keys(q.detailedAnalysis).length === 0) {
        q.detailedAnalysis = generateSmartAnalysis(questionText, modelAnswer, role, title, category);
    }
}

// 智能关键词提取
function extractSmartKeywords(modelAnswer, questionText, role) {
    const keywords = {};
    
    // 常见停用词
    const stopWords = new Set([
        'the', 'and', 'for', 'that', 'with', 'this', 'from', 'have', 'which', 'what',
        'how', 'why', 'when', 'where', 'would', 'could', 'should', 'about', 'their',
        'there', 'been', 'they', 'will', 'also', 'more', 'other', 'some', 'such',
        'than', 'then', 'them', 'these', 'those', 'upon', 'very', 'were', 'what',
        'when', 'whom', 'your', 'into', 'over', 'under', 'after', 'before', 'between'
    ]);
    
    // 提取modelAnswer中的单词（过滤停用词、短词、纯数字）
    const words = modelAnswer.toLowerCase()
        .replace(/[^\w\s-]/g, ' ')
        .split(/\s+/)
        .filter(word => {
            // 过滤条件
            if (word.length < 4) return false;
            if (stopWords.has(word)) return false;
            if (/^\d+$/.test(word)) return false; // 过滤纯数字
            if (/^[a-z]$/.test(word)) return false; // 单字母
            return true;
        });
    
    // 统计词频
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // 选择高频词作为关键词（排除太通用的词）
    const sortedWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .filter(([word, freq]) => {
            // 排除过于通用的金融词（根据角色调整）
            const genericFinanceWords = ['financial', 'market', 'company', 'business', 'industry', 'analysis'];
            return !genericFinanceWords.includes(word) || freq > 2;
        })
        .slice(0, 12); // 取前12个高频词
    
    // 分配智能权重（基于频率和位置）
    sortedWords.forEach(([word, freq], index) => {
        // 基础权重：20-8分递减
        let weight = 20 - index;
        
        // 频率加成：出现3次以上加2分
        if (freq >= 3) weight += 2;
        
        // 确保权重在合理范围
        weight = Math.max(8, Math.min(25, weight));
        
        keywords[word] = weight;
    });
    
    // 如果关键词太少，从问题中补充
    if (Object.keys(keywords).length < 5) {
        const questionWords = questionText.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 4 && !stopWords.has(word) && !keywords[word])
            .slice(0, 5);
        
        questionWords.forEach((word, index) => {
            if (!keywords[word]) {
                keywords[word] = 15 - index * 2;
            }
        });
    }
    
    return keywords;
}

// 智能结构生成
function generateSmartStructure(questionText, modelAnswer, role, category) {
    // 分析问题类型
    const questionLower = questionText.toLowerCase();
    let structure = [];
    
    // 基于问题开头判断类型
    if (questionLower.startsWith('compare') || questionLower.startsWith('contrast') || 
        questionLower.includes(' vs ') || questionLower.includes('difference')) {
        structure = [
            'Define first concept',
            'Define second concept',
            'Identify key similarities',
            'Explain key differences',
            'Discuss practical implications'
        ];
    } else if (questionLower.startsWith('explain') || questionLower.startsWith('describe') ||
               questionLower.startsWith('discuss')) {
        structure = [
            'Provide clear definition',
            'Break down key components',
            'Give relevant examples',
            'Explain practical applications',
            'Connect to broader context'
        ];
    } else if (questionLower.startsWith('how') || questionLower.includes('approach') ||
               questionLower.includes('process') || questionLower.includes('step')) {
        structure = [
            'Analyze the problem',
            'Select appropriate methodology',
            'Outline step-by-step process',
            'Identify potential challenges',
            'Describe expected outcomes'
        ];
    } else if (questionLower.startsWith('what') || questionLower.startsWith('why') ||
               questionLower.startsWith('which') || questionLower.startsWith('who')) {
        structure = [
            'Provide direct answer',
            'Elaborate with key points',
            'Support with evidence/examples',
            'Address potential follow-ups',
            'Summarize key takeaways'
        ];
    } else {
        // 基于角色和类别的默认结构
        const roleStructures = {
            'ib': {
                'technical': ['Concept Overview', 'Key Components', 'Application Examples', 'Industry Context', 'Interview Tips'],
                'behavioral': ['Situation Context', 'Actions Taken', 'Results Achieved', 'Skills Demonstrated', 'Lessons Learned'],
                'market': ['Current Landscape', 'Key Drivers', 'Impact Analysis', 'Future Outlook', 'Strategic Implications']
            },
            'am': {
                'default': ['Investment Thesis', 'Risk Assessment', 'Portfolio Fit', 'Monitoring Plan', 'Exit Strategy']
            },
            'quant': {
                'default': ['Problem Formulation', 'Model Selection', 'Data Requirements', 'Implementation', 'Validation']
            },
            'markets': {
                'default': ['Market Context', 'Trading Strategy', 'Risk Management', 'Execution Plan', 'Performance Metrics']
            }
        };
        
        const roleStruct = roleStructures[role] || roleStructures['ib'];
        const categoryStruct = roleStruct[category] || roleStruct['default'] || roleStruct['technical'];
        
        if (Array.isArray(categoryStruct)) {
            structure = categoryStruct;
        } else {
            structure = ['Introduction', 'Main Analysis', 'Key Insights', 'Practical Applications', 'Conclusion'];
        }
    }
    
    return structure;
}

// 智能分析生成
function generateSmartAnalysis(questionText, modelAnswer, role, title, category) {
    // 确定问题类型
    const questionLower = questionText.toLowerCase();
    let questionType = 'technical';
    let difficulty = 'medium';
    
    if (questionLower.includes('behavioral') || questionLower.includes('experience') || 
        questionLower.includes('situation') || questionLower.includes('tell me about')) {
        questionType = 'behavioral';
    } else if (questionLower.includes('calculate') || questionLower.includes('formula') ||
               questionLower.includes('model') || questionLower.includes('derive') ||
               questionLower.includes('algorithm')) {
        questionType = 'quantitative';
        difficulty = 'hard';
    } else if (questionLower.includes('explain') || questionLower.includes('define') ||
               questionLower.startsWith('what is') || questionLower.startsWith('what are')) {
        questionType = 'conceptual';
        difficulty = questionLower.includes('advanced') ? 'hard' : 'easy';
    } else if (questionLower.includes('market') || questionLower.includes('trend') ||
               questionLower.includes('current') || questionLower.includes('outlook')) {
        questionType = 'market';
        difficulty = 'medium';
    }
    
    // 生成针对性的分析
    return {
        overview: `This ${difficulty} ${questionType} question evaluates ${role} knowledge of ${title || 'key concepts'}.`,
        whyWorks: getSmartWhyWorks(questionType, role, difficulty),
        commonMistakes: getSmartCommonMistakes(questionType, role, difficulty),
        improvementTips: getSmartImprovementTips(questionType, role, difficulty)
    };
}

// 智能辅助函数
function getSmartWhyWorks(type, role, difficulty) {
    const templates = {
        'technical': `Strong answers combine theoretical knowledge with ${role}-specific applications, demonstrating both depth and practical relevance.`,
        'behavioral': `Effective responses use concrete examples to showcase ${role} competencies, following the STAR framework for clarity and impact.`,
        'quantitative': `Clear, logical derivations with attention to detail show the analytical rigor required for ${difficulty} ${role} roles.`,
        'conceptual': `Well-structured explanations that connect fundamentals to current ${role} practices demonstrate both knowledge and critical thinking.`,
        'market': `Insightful analysis that synthesizes data, trends, and ${role} implications shows market awareness and strategic thinking.`
    };
    
    return templates[type] || templates['technical'];
}

function getSmartCommonMistakes(type, role, difficulty) {
    const mistakes = {
        'technical': [
            `Providing generic definitions without ${role}-specific context`,
            `Neglecting current industry developments or regulatory changes`,
            `Overusing jargon without clear explanations for mixed audiences`,
            `Failing to connect concepts to practical ${role} applications`
        ],
        'behavioral': [
            `Giving vague responses without specific, quantifiable examples`,
            `Focusing on personal success rather than team/organizational impact`,
            `Not highlighting relevant ${role} skills or competencies`,
            `Omitting reflection on lessons learned or professional growth`
        ],
        'quantitative': [
            `Skipping intermediate steps or assuming interviewer knowledge`,
            `Not explaining the rationale behind model or formula choices`,
            `Ignoring assumptions, limitations, or sensitivity analysis`,
            `Focusing only on calculations without business context`
        ]
    };
    
    return mistakes[type] || mistakes['technical'];
}

function getSmartImprovementTips(type, role, difficulty) {
    const tips = {
        'technical': [
            `Reference recent ${role} deals, products, or regulatory changes`,
            `Use established frameworks to structure complex ${role} concepts`,
            `Balance depth with clarity for interviewers of varying expertise`,
            `Connect theory to specific ${role} job functions and responsibilities`
        ],
        'behavioral': [
            `Prepare 3-5 versatile examples using the STAR framework`,
            `Quantify achievements with ${role}-relevant metrics (deal size, returns, efficiency)`,
            `Tailor examples to highlight ${role} competencies being assessed`,
            `Show progression from challenge to solution to learned competency`
        ],
        'quantitative': [
            `Practice common ${role} calculations until they become automatic`,
            `Explain each step clearly, highlighting key assumptions`,
            `Discuss alternative approaches and justify your chosen method`,
            `Always contextualize quantitative results within business decisions`
        ]
    };
    
    return tips[type] || tips['technical'];
}

// 保存最终更新
function saveFinalUpdate(questionBank) {
    // 备份
    const backupPath = path.join(__dirname, `questions.js.backup.final-${Date.now()}`);
    fs.copyFileSync(path.join(__dirname, 'questions.js'), backupPath);
    console.log(`\n原文件已备份到: ${backupPath}`);
    
    // 构建新内容
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const newVersion = `v${today}_feedback_final`;
    
    let newContent = `// finterview Question Bank v0.8
// Finance interview questions categorized by role and question type
// Updated: ${new Date().toISOString().split('T')[0]} - Complete feedback data (scoringKeywords, expectedStructure, detailedAnalysis)
// Generated by: feedback data generation script

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

    // 写入文件
    fs.writeFileSync(path.join(__dirname, 'questions.js'), newContent, 'utf8');
    console.log(`已更新 questions.js 文件 (v0.8)`);
    
    // 更新HTML版本号
    updateAllHtmlVersions(newVersion);
    
    // 最终统计
    console.log('\n=== 最终统计 ===');
    const stats = { full: 0, partial: 0, none: 0 };
    questionBank.forEach(q => {
        const hasScoringKeywords = q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0 && !Array.isArray(q.scoringKeywords);
        const hasExpectedStructure = q.expectedStructure && q.expectedStructure.length > 0;
        const hasDetailedAnalysis = q.detailedAnalysis && Object.keys(q.detailedAnalysis).length > 0;
        
        if (hasScoringKeywords && hasExpectedStructure && hasDetailedAnalysis) {
            stats.full++;
        } else if (hasScoringKeywords || hasExpectedStructure || hasDetailedAnalysis) {
            stats.partial++;
        } else {
            stats.none++;
        }
    });
    
    console.log(`完整反馈: ${stats.full} 题 (${((stats.full/questionBank.length)*100).toFixed(1)}%)`);
    console.log(`部分反馈: ${stats.partial} 题 (${((stats.partial/questionBank.length)*100).toFixed(1)}%)`);
    console.log(`无反馈:   ${stats.none} 题 (${((stats.none/questionBank.length)*100).toFixed(1)}%)`);
}

// 更新所有HTML文件版本号
function updateAllHtmlVersions(newVersion) {
    const htmlFiles = [
        'index.html',
        'finance-bro.html', 
        'industry-practice.html',
        'industry-filter.html',
        'profile.html'
    ];
    
    htmlFiles.forEach(filename => {
        const filePath = path.join(__dirname, filename);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            // 更新版本号
            content = content.replace(/v=\d{8}_[a-z_]+/g, `v=${newVersion}`);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`更新 ${filename} 版本号为: ${newVersion}`);
        }
    });
}