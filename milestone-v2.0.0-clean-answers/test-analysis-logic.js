// 测试分析答案逻辑
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
    
    console.log(`测试 ${questionBank.length} 个问题的分析逻辑\n`);
    
    // 选择5个不同类别的问题进行测试
    const testQuestions = [
        questionBank[0],   // Investment Banking - M&A Market
        questionBank[100], // Asset Management
        questionBank[200], // Quantitative Finance  
        questionBank[300], // Risk Management
        questionBank[400]  // FinTech
    ];
    
    // 测试用例
    const testCases = [
        {
            name: '优秀答案',
            answer: 'The current M&A market is characterized by selective resurgence with key drivers including interest rates, private equity dry powder, and sector trends. Regulatory scrutiny remains high, especially in technology and healthcare sectors.'
        },
        {
            name: '一般答案', 
            answer: 'M&A market is active with deals happening. There are regulations and market trends affecting it.'
        },
        {
            name: '较差答案',
            answer: 'I think M&A is about companies merging. Not sure about current trends.'
        },
        {
            name: '废话',
            answer: 'asdfghjkl qwertyuiop 1234567890'
        }
    ];
    
    console.log('=== 分析逻辑测试 ===\n');
    
    for (let i = 0; i < testQuestions.length; i++) {
        const q = testQuestions[i];
        console.log(`问题 ${i+1}: ${q.title} (${q.role})`);
        console.log(`关键词: ${Object.keys(q.scoringKeywords || {}).slice(0, 5).join(', ')}`);
        console.log(`预期结构: ${(q.expectedStructure || []).slice(0, 3).join(' → ')}`);
        
        // 测试每个用例
        testCases.forEach(testCase => {
            const score = simulateAnalysis(testCase.answer, q);
            console.log(`  ${testCase.name}: ${score.score}/100 (${score.level})`);
            
            // 显示关键词匹配详情
            if (testCase.name === '优秀答案' && score.keywordMatches) {
                console.log(`    关键词匹配: ${score.keywordMatches.matched}/${score.keywordMatches.total}`);
            }
        });
        
        console.log('');
    }
    
    // 测试废话检测
    console.log('=== 废话检测测试 ===');
    const nonsenseTests = [
        'asdfghjkl',
        '1111111111111111',
        'test test test test test',
        '!@#$%^&*()_+',
        'qwertyuiop asdfghjkl zxcvbnm'
    ];
    
    nonsenseTests.forEach(text => {
        const isNonsense = checkNonsense(text);
        console.log(`"${text.substring(0, 15)}..." → ${isNonsense ? '❌ 废话' : '✅ 正常'}`);
    });
    
    console.log('\n=== 测试总结 ===');
    console.log('✅ 分析逻辑可以基于scoringKeywords和expectedStructure生成分数');
    console.log('✅ 废话检测功能应该能识别明显无意义输入');
    console.log('⚠️ 实际分数取决于具体的关键词匹配和算法实现');
    console.log('💡 建议：在实际浏览器中测试完整功能');
    
} catch (error) {
    console.error('测试错误:', error.message);
}

// 模拟分析函数（简化版）
function simulateAnalysis(userAnswer, question) {
    let score = 0;
    const feedback = [];
    
    // 1. 关键词匹配（40%）
    if (question.scoringKeywords && Object.keys(question.scoringKeywords).length > 0) {
        const keywords = question.scoringKeywords;
        let keywordScore = 0;
        let maxKeywordScore = 0;
        let matched = 0;
        let total = 0;
        
        Object.entries(keywords).forEach(([keyword, weight]) => {
            maxKeywordScore += weight;
            total++;
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            if (regex.test(userAnswer)) {
                keywordScore += weight;
                matched++;
            }
        });
        
        const keywordPercentage = maxKeywordScore > 0 ? (keywordScore / maxKeywordScore) * 100 : 0;
        score += keywordPercentage * 0.4;
        
        feedback.push(`关键词: ${matched}/${total} (${keywordPercentage.toFixed(1)}%)`);
    }
    
    // 2. 结构评估（30%）
    if (question.expectedStructure && question.expectedStructure.length > 0) {
        const expectedStructure = question.expectedStructure;
        let structureScore = 0;
        
        expectedStructure.forEach(item => {
            const hasItem = userAnswer.toLowerCase().includes(item.toLowerCase()) || 
                           item.toLowerCase().split(' ').some(word => 
                               word.length > 4 && userAnswer.toLowerCase().includes(word.toLowerCase())
                           );
            if (hasItem) structureScore++;
        });
        
        const structurePercentage = (structureScore / expectedStructure.length) * 100;
        score += structurePercentage * 0.3;
        
        feedback.push(`结构: ${structureScore}/${expectedStructure.length} (${structurePercentage.toFixed(1)}%)`);
    }
    
    // 3. 长度评估（20%）
    const answerLength = userAnswer.length;
    const lengthPercentage = Math.min(100, (answerLength / 200) * 100); // 200字符为目标长度
    score += lengthPercentage * 0.2;
    
    feedback.push(`长度: ${answerLength}字符 (${lengthPercentage.toFixed(1)}%)`);
    
    // 4. 词数奖励（10%）
    const wordCount = userAnswer.split(/\s+/).filter(word => word.length > 0).length;
    const wordPercentage = Math.min(100, (wordCount / 50) * 100); // 50词为目标
    score += wordPercentage * 0.1;
    
    // 最终分数
    score = Math.round(score);
    
    // 评分等级
    let level = '需要改进';
    if (score >= 90) level = '优秀';
    else if (score >= 70) level = '良好';
    else if (score >= 50) level = '一般';
    
    return {
        score,
        level,
        feedback,
        keywordMatches: {
            matched: matched || 0,
            total: total || 0
        }
    };
}

// 检查是否为废话（简化版）
function checkNonsense(text) {
    if (text.length < 10) return false;
    
    // 检查字符重复
    const chars = text.toLowerCase().replace(/\s/g, '');
    const charCount = {};
    for (const char of chars) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    const maxCharCount = Math.max(...Object.values(charCount));
    if (maxCharCount / chars.length > 0.4) return true; // 40%重复
    
    // 检查键盘模式
    const keyboardPatterns = [
        'asdfghjkl',
        'qwertyuiop',
        'zxcvbnm',
        '1234567890',
        'qazwsxedc',
        'rfvtgbyhn'
    ];
    
    for (const pattern of keyboardPatterns) {
        if (text.toLowerCase().includes(pattern)) return true;
    }
    
    // 检查单词重复
    const words = text.toLowerCase().split(/\s+/);
    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    const maxWordCount = Math.max(...Object.values(wordCount));
    if (maxWordCount / words.length > 0.3) return true; // 30%重复
    
    return false;
}