// 随机抽样检查反馈数据覆盖
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
    
    // 随机选择50个问题
    const sampleSize = 50;
    const sampleIndices = new Set();
    while (sampleIndices.size < sampleSize) {
        sampleIndices.add(Math.floor(Math.random() * questionBank.length));
    }
    
    const sample = Array.from(sampleIndices).map(i => questionBank[i]);
    
    console.log(`\n随机抽样 ${sample.length} 个问题进行分析:`);
    
    // 统计
    let fullFeedback = 0;
    let partialFeedback = 0;
    let noFeedback = 0;
    
    const feedbackByRole = {};
    
    for (const q of sample) {
        const hasScoringKeywords = q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0;
        const hasExpectedStructure = q.expectedStructure && q.expectedStructure.length > 0;
        const hasDetailedAnalysis = q.detailedAnalysis && Object.keys(q.detailedAnalysis).length > 0;
        
        const role = q.role || 'unknown';
        if (!feedbackByRole[role]) {
            feedbackByRole[role] = { full: 0, partial: 0, none: 0, total: 0 };
        }
        feedbackByRole[role].total++;
        
        if (hasScoringKeywords && hasExpectedStructure && hasDetailedAnalysis) {
            fullFeedback++;
            feedbackByRole[role].full++;
        } else if (hasScoringKeywords || hasExpectedStructure || hasDetailedAnalysis) {
            partialFeedback++;
            feedbackByRole[role].partial++;
        } else {
            noFeedback++;
            feedbackByRole[role].none++;
        }
    }
    
    console.log('\n=== 抽样结果 ===');
    console.log(`完整反馈: ${fullFeedback} 题 (${((fullFeedback/sampleSize)*100).toFixed(1)}%)`);
    console.log(`部分反馈: ${partialFeedback} 题 (${((partialFeedback/sampleSize)*100).toFixed(1)}%)`);
    console.log(`无反馈:   ${noFeedback} 题 (${((noFeedback/sampleSize)*100).toFixed(1)}%)`);
    
    console.log('\n=== 按角色分布 ===');
    for (const [role, stats] of Object.entries(feedbackByRole)) {
        console.log(`${role.padEnd(10)}: 完整 ${stats.full.toString().padStart(2)} | 部分 ${stats.partial.toString().padStart(2)} | 无 ${stats.none.toString().padStart(2)} | 总计 ${stats.total}`);
    }
    
    // 显示一些无反馈的示例
    console.log('\n=== 无反馈问题示例 ===');
    let examplesShown = 0;
    for (const q of sample) {
        const hasScoringKeywords = q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0;
        const hasExpectedStructure = q.expectedStructure && q.expectedStructure.length > 0;
        const hasDetailedAnalysis = q.detailedAnalysis && Object.keys(q.detailedAnalysis).length > 0;
        
        if (!hasScoringKeywords && !hasExpectedStructure && !hasDetailedAnalysis && examplesShown < 5) {
            console.log(`- ${q.title} (${q.role}): ${q.question.substring(0, 80)}...`);
            examplesShown++;
        }
    }
    
    // 推断整体情况
    console.log('\n=== 推断整体情况 ===');
    console.log(`基于抽样，估计:`);
    console.log(`- 完整反馈: ${Math.round((fullFeedback/sampleSize)*questionBank.length)} 题 (±${Math.round(questionBank.length*0.05)})`);
    console.log(`- 部分反馈: ${Math.round((partialFeedback/sampleSize)*questionBank.length)} 题 (±${Math.round(questionBank.length*0.05)})`);
    console.log(`- 无反馈:   ${Math.round((noFeedback/sampleSize)*questionBank.length)} 题 (±${Math.round(questionBank.length*0.05)})`);
    
} catch (error) {
    console.error('处理错误:', error.message);
}