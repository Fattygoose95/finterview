// 调试scoringKeywords格式
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
    
    console.log(`检查 ${questionBank.length} 个问题的scoringKeywords格式\n`);
    
    // 检查前10个问题
    let arrayFormatCount = 0;
    let objectFormatCount = 0;
    let emptyCount = 0;
    let numericKeyCount = 0;
    
    for (let i = 0; i < Math.min(20, questionBank.length); i++) {
        const q = questionBank[i];
        const keywords = q.scoringKeywords;
        
        console.log(`${i+1}. ${q.title} (${q.role})`);
        
        if (!keywords) {
            console.log('   ❌ 没有scoringKeywords');
            emptyCount++;
        } else if (Array.isArray(keywords)) {
            console.log(`   ⚠️ 数组格式: ${keywords.length}项`);
            console.log(`     示例: ${keywords.slice(0, 3).join(', ')}`);
            arrayFormatCount++;
        } else if (typeof keywords === 'object') {
            const keys = Object.keys(keywords);
            console.log(`   ✅ 对象格式: ${keys.length}个关键词`);
            
            // 检查是否有数字键
            const numericKeys = keys.filter(k => /^\d+$/.test(k));
            if (numericKeys.length > 0) {
                console.log(`   ⚠️ 包含数字键: ${numericKeys.slice(0, 3).join(', ')}`);
                numericKeyCount++;
            }
            
            // 显示一些关键词和权重
            const sampleEntries = Object.entries(keywords).slice(0, 3);
            sampleEntries.forEach(([key, value]) => {
                console.log(`     "${key}": ${value}`);
            });
            
            objectFormatCount++;
        } else {
            console.log(`   ❓ 未知格式: ${typeof keywords}`);
        }
        console.log('');
    }
    
    console.log('\n=== 格式统计 ===');
    console.log(`数组格式: ${arrayFormatCount}`);
    console.log(`对象格式: ${objectFormatCount}`);
    console.log(`空值: ${emptyCount}`);
    console.log(`有数字键的对象: ${numericKeyCount}`);
    
    // 测试关键词匹配逻辑
    console.log('\n=== 测试关键词匹配 ===');
    const testQuestion = questionBank[0];
    if (testQuestion && testQuestion.scoringKeywords) {
        console.log(`测试问题: ${testQuestion.title}`);
        
        // 测试不同答案
        const testAnswers = [
            "The current M&A market is influenced by interest rates and sector trends.",
            "asdfghjkl qwertyuiop 1234567890",
            "M&A market is active."
        ];
        
        testAnswers.forEach((answer, idx) => {
            console.log(`\n测试答案 ${idx+1}: "${answer.substring(0, 30)}..."`);
            
            // 检查是否为废话
            const isNonsense = simulateNonsenseCheck(answer);
            console.log(`  废话检测: ${isNonsense ? '❌ 是废话' : '✅ 不是废话'}`);
            
            if (!isNonsense && testQuestion.scoringKeywords && typeof testQuestion.scoringKeywords === 'object') {
                // 计算关键词匹配
                let matched = 0;
                let total = 0;
                let score = 0;
                let maxScore = 0;
                
                Object.entries(testQuestion.scoringKeywords).forEach(([keyword, weight]) => {
                    total++;
                    maxScore += weight;
                    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                    if (regex.test(answer)) {
                        matched++;
                        score += weight;
                    }
                });
                
                const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
                console.log(`  关键词匹配: ${matched}/${total}`);
                console.log(`  关键词分数: ${score}/${maxScore} (${percentage.toFixed(1)}%)`);
            }
        });
    }
    
} catch (error) {
    console.error('处理错误:', error.message);
}

// 模拟废话检测（简化版）
function simulateNonsenseCheck(text) {
    if (text.length < 50) return false;
    
    // 检查键盘模式
    const keyboardPatterns = [
        'asdfghjkl', 'qwertyuiop', 'zxcvbnm', '1234567890'
    ];
    
    const lowerText = text.toLowerCase();
    for (const pattern of keyboardPatterns) {
        if (lowerText.includes(pattern)) {
            return true;
        }
    }
    
    return false;
}