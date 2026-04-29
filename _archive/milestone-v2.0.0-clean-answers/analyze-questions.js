// 分析questions.js中的问题分布
const fs = require('fs');
const path = require('path');

// 读取questions.js文件
const content = fs.readFileSync(path.join(__dirname, 'questions.js'), 'utf8');

// 提取questionBank数组（简化方法）
// 查找const questionBank = [ ... ] 部分
const startMarker = 'const questionBank = [';
const endMarker = '];';

const startIndex = content.indexOf(startMarker);
const endIndex = content.lastIndexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('无法找到questionBank数组');
    process.exit(1);
}

// 提取数组部分并评估（注意：简化方法，实际应更安全）
const arrayStr = content.substring(startIndex + startMarker.length, endIndex);

// 统计各角色问题数量
const roleCounts = {};
const questionsWithFeedback = [];
const questionsWithoutFeedback = [];

// 简单正则匹配（实际应用应使用JSON解析）
let idMatch;
const idRegex = /"id":\s*(\d+)/g;
const roleRegex = /"role":\s*"([^"]+)"/g;
const scoringKeywordsRegex = /"scoringKeywords":\s*\{/g;
const expectedStructureRegex = /"expectedStructure":\s*\[/g;
const detailedAnalysisRegex = /"detailedAnalysis":\s*\{/g;

// 重置正则索引
let questionBlocks = arrayStr.split(/\},\s*\{/);

console.log(`总问题块数: ${questionBlocks.length + 1}`); // 加1因为分割后块数比原问题数少1

// 分析每个问题块
for (let i = 0; i < Math.min(questionBlocks.length, 100); i++) { // 限制分析前100个以避免性能问题
    const block = (i === 0 ? '{"' : '{"') + questionBlocks[i] + (i === questionBlocks.length - 1 ? '}' : '}');
    
    // 提取角色
    const roleMatch = block.match(/"role":\s*"([^"]+)"/);
    if (roleMatch) {
        const role = roleMatch[1];
        roleCounts[role] = (roleCounts[role] || 0) + 1;
    }
    
    // 检查是否有反馈数据
    const hasScoringKeywords = block.includes('"scoringKeywords": {');
    const hasExpectedStructure = block.includes('"expectedStructure": [');
    const hasDetailedAnalysis = block.includes('"detailedAnalysis": {');
    
    if (hasScoringKeywords && hasExpectedStructure && hasDetailedAnalysis) {
        questionsWithFeedback.push(i);
    } else {
        questionsWithoutFeedback.push(i);
    }
}

console.log('\n=== 问题分布分析 ===');
for (const [role, count] of Object.entries(roleCounts)) {
    console.log(`${role}: ${count} 题`);
}

console.log('\n=== 反馈数据覆盖 ===');
console.log(`完整反馈支持: ${questionsWithFeedback.length} 题`);
console.log(`基础/无反馈: ${questionsWithoutFeedback.length} 题`);
console.log(`反馈覆盖率: ${((questionsWithFeedback.length / (questionsWithFeedback.length + questionsWithoutFeedback.length)) * 100).toFixed(1)}%`);

// 尝试获取角色名称映射
const rolesMatch = content.match(/const roles = \{([^}]+)\}/);
if (rolesMatch) {
    console.log('\n=== 角色名称映射 ===');
    const rolesStr = rolesMatch[1];
    const rolePairs = rolesStr.match(/"([^"]+)":\s*\{[^}]+\}/g);
    if (rolePairs) {
        for (const pair of rolePairs) {
            const roleKeyMatch = pair.match(/"([^"]+)"/);
            const nameMatch = pair.match(/"name":\s*"([^"]+)"/);
            if (roleKeyMatch && nameMatch) {
                console.log(`${roleKeyMatch[1]} -> ${nameMatch[1]}: ${roleCounts[roleKeyMatch[1]] || 0} 题`);
            }
        }
    }
}