// 完整分析questions.js中的问题分布
const fs = require('fs');
const path = require('path');

// 读取questions.js文件
const content = fs.readFileSync(path.join(__dirname, 'questions.js'), 'utf8');

// 提取questionBank数组部分
const startMarker = 'const questionBank = [';
const endMarker = '];';

const startIndex = content.indexOf(startMarker);
let endIndex = content.lastIndexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error('无法找到questionBank数组');
    process.exit(1);
}

// 提取数组部分（包含结尾的]）
const arraySection = content.substring(startIndex + startMarker.length - 1, endIndex + 1);

// 尝试解析为JSON
try {
    // 修复常见的JSON问题
    let jsonStr = arraySection
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/,\s*]/g, ']')  // 移除尾随逗号
        .replace(/,\s*}/g, '}'); // 移除对象中的尾随逗号
    
    // 尝试解析
    const questionBank = eval(`(${jsonStr})`);
    
    console.log(`总问题数: ${questionBank.length}`);
    
    // 统计各角色问题数量
    const roleCounts = {};
    const feedbackStats = {
        full: 0,    // 有scoringKeywords、expectedStructure、detailedAnalysis
        partial: 0, // 有部分反馈数据
        none: 0     // 没有反馈数据
    };
    
    // 分类统计
    const questionsByRole = {};
    const questionsWithMissingFeedback = [];
    
    for (const q of questionBank) {
        // 角色统计
        const role = q.role || 'unknown';
        roleCounts[role] = (roleCounts[role] || 0) + 1;
        
        // 按角色分组
        if (!questionsByRole[role]) {
            questionsByRole[role] = [];
        }
        questionsByRole[role].push(q);
        
        // 反馈数据统计
        const hasScoringKeywords = q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0;
        const hasExpectedStructure = q.expectedStructure && q.expectedStructure.length > 0;
        const hasDetailedAnalysis = q.detailedAnalysis && Object.keys(q.detailedAnalysis).length > 0;
        
        if (hasScoringKeywords && hasExpectedStructure && hasDetailedAnalysis) {
            feedbackStats.full++;
        } else if (hasScoringKeywords || hasExpectedStructure || hasDetailedAnalysis) {
            feedbackStats.partial++;
        } else {
            feedbackStats.none++;
        }
        
        // 记录缺少反馈的问题
        if (!hasScoringKeywords || !hasExpectedStructure || !hasDetailedAnalysis) {
            questionsWithMissingFeedback.push({
                id: q.id,
                title: q.title,
                role: q.role,
                missing: []
            });
            if (!hasScoringKeywords) questionsWithMissingFeedback[questionsWithMissingFeedback.length-1].missing.push('scoringKeywords');
            if (!hasExpectedStructure) questionsWithMissingFeedback[questionsWithMissingFeedback.length-1].missing.push('expectedStructure');
            if (!hasDetailedAnalysis) questionsWithMissingFeedback[questionsWithMissingFeedback.length-1].missing.push('detailedAnalysis');
        }
    }
    
    console.log('\n=== 问题分布（按角色）===');
    for (const [role, count] of Object.entries(roleCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`${role.padEnd(10)}: ${count.toString().padStart(3)} 题 (${((count/questionBank.length)*100).toFixed(1)}%)`);
    }
    
    console.log('\n=== 反馈数据覆盖 ===');
    console.log(`完整反馈: ${feedbackStats.full} 题 (${((feedbackStats.full/questionBank.length)*100).toFixed(1)}%)`);
    console.log(`部分反馈: ${feedbackStats.partial} 题 (${((feedbackStats.partial/questionBank.length)*100).toFixed(1)}%)`);
    console.log(`无反馈:   ${feedbackStats.none} 题 (${((feedbackStats.none/questionBank.length)*100).toFixed(1)}%)`);
    
    // 显示角色名称映射（从文件中提取）
    const rolesMatch = content.match(/const roles = \{[\s\S]*?\}/);
    if (rolesMatch) {
        console.log('\n=== 角色名称映射 ===');
        const rolesStr = rolesMatch[0];
        const roleEntries = rolesStr.match(/"([^"]+)":\s*\{[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?\}/g) || [];
        
        for (const entry of roleEntries) {
            const keyMatch = entry.match(/"([^"]+)"/);
            const nameMatch = entry.match(/"name":\s*"([^"]+)"/);
            if (keyMatch && nameMatch) {
                const key = keyMatch[1];
                const name = nameMatch[1];
                const count = roleCounts[key] || 0;
                console.log(`${key.padEnd(10)} -> ${name.padEnd(20)}: ${count} 题`);
            }
        }
    }
    
    // 建议的内容扩展
    console.log('\n=== 内容扩展建议 ===');
    
    const targetCounts = {
        'ib': 100,      // Investment Banking 已接近目标
        'am': 50,       // Asset Management 需要大量增加
        'quant': 40,    // Quantitative Finance 需要大量增加
        'markets': 40,  // Sales & Trading 需要大量增加
        'corpfin': 60,  // Corporate Finance 需要评估
        'fintech': 40,  // FinTech 需要评估
        'fo': 30,       // Family Office 需要评估
        'risk': 40,     // Risk Management 需要评估
        'general': 30   // General Finance 需要评估
    };
    
    console.log('各角色目标题数建议:');
    for (const [role, target] of Object.entries(targetCounts)) {
        const current = roleCounts[role] || 0;
        const needed = Math.max(0, target - current);
        if (needed > 0) {
            console.log(`  ${role.padEnd(10)}: 当前 ${current} 题，需要增加 ${needed} 题达到目标 ${target}`);
        }
    }
    
    // 反馈数据完善建议
    console.log(`\n反馈数据完善: 需要为 ${questionsWithMissingFeedback.length} 题添加完整反馈数据`);
    if (questionsWithMissingFeedback.length > 0) {
        console.log('前10个缺少反馈的问题:');
        for (let i = 0; i < Math.min(10, questionsWithMissingFeedback.length); i++) {
            const q = questionsWithMissingFeedback[i];
            console.log(`  ${q.id} - ${q.title} (${q.role}): 缺少 ${q.missing.join(', ')}`);
        }
    }
    
} catch (error) {
    console.error('解析错误:', error.message);
    console.log('使用简化分析...');
    
    // 简化分析：直接统计角色出现次数
    const roleRegex = /"role":\s*"([^"]+)"/g;
    let match;
    const simpleRoleCounts = {};
    
    while ((match = roleRegex.exec(content)) !== null) {
        const role = match[1];
        simpleRoleCounts[role] = (simpleRoleCounts[role] || 0) + 1;
    }
    
    console.log('\n简化分析结果:');
    for (const [role, count] of Object.entries(simpleRoleCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`${role}: ${count} 题`);
    }
}