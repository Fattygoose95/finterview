// 验证最终反馈数据质量
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
    
    console.log(`验证 ${questionBank.length} 个问题的反馈数据质量`);
    
    // 随机抽样30个问题
    const sampleSize = 30;
    const sampleIndices = new Set();
    while (sampleIndices.size < sampleSize) {
        sampleIndices.add(Math.floor(Math.random() * questionBank.length));
    }
    
    const sample = Array.from(sampleIndices).map(i => questionBank[i]);
    
    console.log('\n=== 抽样验证结果 ===');
    
    let validCount = 0;
    let issues = [];
    
    for (let i = 0; i < sample.length; i++) {
        const q = sample[i];
        const qIssues = [];
        
        // 检查scoringKeywords
        if (!q.scoringKeywords || typeof q.scoringKeywords !== 'object' || Array.isArray(q.scoringKeywords)) {
            qIssues.push('scoringKeywords格式错误');
        } else {
            const keys = Object.keys(q.scoringKeywords);
            if (keys.length === 0) {
                qIssues.push('scoringKeywords为空');
            } else {
                // 检查是否有数字作为键（错误）
                const numericKeys = keys.filter(k => /^\d+$/.test(k));
                if (numericKeys.length > 0) {
                    qIssues.push(`scoringKeywords包含数字键: ${numericKeys.slice(0, 3).join(',')}`);
                }
                
                // 检查权重是否合理
                const weights = Object.values(q.scoringKeywords);
                const invalidWeights = weights.filter(w => typeof w !== 'number' || w < 5 || w > 30);
                if (invalidWeights.length > 0) {
                    qIssues.push(`scoringKeywords权重不合理: ${invalidWeights.slice(0, 3).join(',')}`);
                }
            }
        }
        
        // 检查expectedStructure
        if (!q.expectedStructure || !Array.isArray(q.expectedStructure)) {
            qIssues.push('expectedStructure格式错误');
        } else if (q.expectedStructure.length === 0) {
            qIssues.push('expectedStructure为空');
        } else if (q.expectedStructure.length < 3) {
            qIssues.push(`expectedStructure过短: ${q.expectedStructure.length}项`);
        }
        
        // 检查detailedAnalysis
        if (!q.detailedAnalysis || typeof q.detailedAnalysis !== 'object') {
            qIssues.push('detailedAnalysis格式错误');
        } else {
            const requiredFields = ['overview', 'whyWorks', 'commonMistakes', 'improvementTips'];
            const missingFields = requiredFields.filter(f => !q.detailedAnalysis[f]);
            if (missingFields.length > 0) {
                qIssues.push(`detailedAnalysis缺少字段: ${missingFields.join(',')}`);
            }
        }
        
        if (qIssues.length === 0) {
            validCount++;
        } else {
            issues.push({
                id: q.id,
                title: q.title,
                role: q.role,
                issues: qIssues
            });
        }
    }
    
    console.log(`有效数据: ${validCount}/${sampleSize} (${((validCount/sampleSize)*100).toFixed(1)}%)`);
    
    if (issues.length > 0) {
        console.log(`\n发现问题: ${issues.length}个`);
        issues.slice(0, 5).forEach(issue => {
            console.log(`- ${issue.title} (${issue.role}): ${issue.issues.join('; ')}`);
        });
        
        if (issues.length > 5) {
            console.log(`  ...还有${issues.length - 5}个问题`);
        }
    } else {
        console.log('✅ 所有抽样问题反馈数据格式正确');
    }
    
    // 统计各角色数据质量
    console.log('\n=== 按角色统计 ===');
    const roleStats = {};
    
    sample.forEach(q => {
        const role = q.role || 'unknown';
        if (!roleStats[role]) {
            roleStats[role] = { total: 0, valid: 0 };
        }
        roleStats[role].total++;
        
        // 检查该问题是否有效
        const hasValidScoringKeywords = q.scoringKeywords && typeof q.scoringKeywords === 'object' && 
                                      !Array.isArray(q.scoringKeywords) && Object.keys(q.scoringKeywords).length > 0;
        const hasValidExpectedStructure = q.expectedStructure && Array.isArray(q.expectedStructure) && q.expectedStructure.length >= 3;
        const hasValidDetailedAnalysis = q.detailedAnalysis && q.detailedAnalysis.overview && q.detailedAnalysis.whyWorks;
        
        if (hasValidScoringKeywords && hasValidExpectedStructure && hasValidDetailedAnalysis) {
            roleStats[role].valid++;
        }
    });
    
    for (const [role, stats] of Object.entries(roleStats)) {
        const validity = stats.total > 0 ? ((stats.valid/stats.total)*100).toFixed(1) : 0;
        console.log(`${role.padEnd(10)}: ${stats.valid}/${stats.total} (${validity}%) 有效`);
    }
    
    // 显示一些成功示例
    console.log('\n=== 成功示例 ===');
    const successExamples = sample.filter(q => {
        const hasValidScoringKeywords = q.scoringKeywords && typeof q.scoringKeywords === 'object' && 
                                      !Array.isArray(q.scoringKeywords) && Object.keys(q.scoringKeywords).length > 0;
        return hasValidScoringKeywords;
    }).slice(0, 3);
    
    successExamples.forEach((q, idx) => {
        console.log(`${idx+1}. ${q.title} (${q.role})`);
        const keywords = Object.keys(q.scoringKeywords || {}).slice(0, 5);
        console.log(`   关键词: ${keywords.join(', ')}...`);
        console.log(`   结构: ${(q.expectedStructure || []).slice(0, 3).join(' → ')}`);
    });
    
} catch (error) {
    console.error('验证错误:', error.message);
}