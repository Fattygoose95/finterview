// 验证生成的反馈数据质量
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
    
    console.log(`总问题数: ${questionBank.length}`);
    
    // 检查前20个问题（包含已生成和原有的）
    const checkCount = 20;
    const questionsToCheck = questionBank.slice(0, checkCount);
    
    console.log(`\n检查前 ${checkCount} 个问题:`);
    
    let stats = {
        before: { full: 0, partial: 0, none: 0 },
        after: { full: 0, partial: 0, none: 0 }
    };
    
    for (let i = 0; i < questionsToCheck.length; i++) {
        const q = questionsToCheck[i];
        
        const hasScoringKeywords = q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0;
        const hasExpectedStructure = q.expectedStructure && q.expectedStructure.length > 0;
        const hasDetailedAnalysis = q.detailedAnalysis && Object.keys(q.detailedAnalysis).length > 0;
        
        const feedbackLevel = hasScoringKeywords && hasExpectedStructure && hasDetailedAnalysis ? 'full' :
                             hasScoringKeywords || hasExpectedStructure || hasDetailedAnalysis ? 'partial' : 'none';
        
        stats.after[feedbackLevel]++;
        
        console.log(`\n${i+1}. ${q.title} (${q.role})`);
        console.log(`   反馈级别: ${feedbackLevel}`);
        
        if (hasScoringKeywords) {
            const keywords = Object.keys(q.scoringKeywords);
            console.log(`   scoringKeywords: ${keywords.length}个 (示例: ${keywords.slice(0, 3).join(', ')})`);
        } else {
            console.log(`   scoringKeywords: 无`);
        }
        
        if (hasExpectedStructure) {
            console.log(`   expectedStructure: ${q.expectedStructure.length}项`);
            console.log(`     示例: ${q.expectedStructure.slice(0, 2).join(', ')}`);
        } else {
            console.log(`   expectedStructure: 无`);
        }
        
        if (hasDetailedAnalysis) {
            const analysisKeys = Object.keys(q.detailedAnalysis);
            console.log(`   detailedAnalysis: ${analysisKeys.length}个部分 (${analysisKeys.join(', ')})`);
        } else {
            console.log(`   detailedAnalysis: 无`);
        }
    }
    
    console.log('\n=== 统计汇总 ===');
    console.log(`完整反馈: ${stats.after.full} 题 (${((stats.after.full/checkCount)*100).toFixed(1)}%)`);
    console.log(`部分反馈: ${stats.after.partial} 题 (${((stats.after.partial/checkCount)*100).toFixed(1)}%)`);
    console.log(`无反馈:   ${stats.after.none} 题 (${((stats.after.none/checkCount)*100).toFixed(1)}%)`);
    
    // 测试评分关键词的相关性
    console.log('\n=== 关键词相关性测试 ===');
    const testQuestions = questionBank.slice(0, 5);
    
    for (let i = 0; i < testQuestions.length; i++) {
        const q = testQuestions[i];
        if (q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0) {
            const keywords = Object.keys(q.scoringKeywords);
            const modelAnswer = (q.modelAnswer || '').toLowerCase();
            
            // 检查关键词是否在modelAnswer中出现
            let foundCount = 0;
            keywords.forEach(keyword => {
                if (modelAnswer.includes(keyword.toLowerCase())) {
                    foundCount++;
                }
            });
            
            const relevance = (foundCount / keywords.length) * 100;
            console.log(`${i+1}. ${q.title}: ${keywords.length}个关键词，${foundCount}个在答案中出现 (相关性: ${relevance.toFixed(1)}%)`);
        }
    }
    
} catch (error) {
    console.error('处理错误:', error.message);
}