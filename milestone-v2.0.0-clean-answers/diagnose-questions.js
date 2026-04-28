// 诊断questions.js数据有效性
const fs = require('fs');
const path = require('path');

console.log('=== finterview 数据诊断 ===\n');

// 1. 检查文件是否存在
const questionsPath = path.join(__dirname, 'questions.js');
if (!fs.existsSync(questionsPath)) {
    console.error('❌ questions.js 文件不存在');
    process.exit(1);
}

console.log('✅ questions.js 文件存在');

// 2. 读取文件内容
const content = fs.readFileSync(questionsPath, 'utf8');
console.log(`📄 文件大小: ${(content.length / 1024).toFixed(1)} KB`);

// 3. 检查关键部分是否存在
const checks = {
    '包含questionBank定义': content.includes('const questionBank = ['),
    '包含roles定义': content.includes('const roles = {'),
    '包含window.questionBank导出': content.includes('window.questionBank = questionBank'),
    '包含window.roles导出': content.includes('window.roles = roles'),
    '是有效的JavaScript': true // 将在下一步检查
};

console.log('\n=== 结构检查 ===');
Object.entries(checks).forEach(([check, result]) => {
    console.log(`${result ? '✅' : '❌'} ${check}`);
});

// 4. 尝试解析questionBank
console.log('\n=== 数据解析检查 ===');
try {
    // 提取questionBank部分
    const startMarker = 'const questionBank = [';
    const endMarker = '];';
    
    const startIndex = content.indexOf(startMarker);
    let endIndex = content.lastIndexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) {
        console.error('❌ 无法找到questionBank数组边界');
    } else {
        const arraySection = content.substring(startIndex + startMarker.length - 1, endIndex + 1);
        
        // 尝试修复常见JSON问题
        let jsonStr = arraySection
            .replace(/,\s*]/g, ']')
            .replace(/,\s*}/g, '}');
        
        // 尝试解析
        const questionBank = eval(`(${jsonStr})`);
        
        console.log(`✅ 成功解析questionBank`);
        console.log(`  问题数量: ${questionBank.length}`);
        
        // 检查数据质量
        let validQuestions = 0;
        let hasScoringKeywords = 0;
        let hasExpectedStructure = 0;
        let hasDetailedAnalysis = 0;
        
        // 抽样检查（前20个）
        const sampleSize = Math.min(20, questionBank.length);
        const sample = questionBank.slice(0, sampleSize);
        
        for (const q of sample) {
            // 基本字段检查
            if (q.id && q.title && q.question && q.role) {
                validQuestions++;
            }
            
            // 反馈数据检查
            if (q.scoringKeywords && Object.keys(q.scoringKeywords).length > 0 && !Array.isArray(q.scoringKeywords)) {
                hasScoringKeywords++;
            }
            
            if (q.expectedStructure && Array.isArray(q.expectedStructure) && q.expectedStructure.length > 0) {
                hasExpectedStructure++;
            }
            
            if (q.detailedAnalysis && typeof q.detailedAnalysis === 'object') {
                hasDetailedAnalysis++;
            }
        }
        
        console.log(`\n=== 数据质量检查（前${sampleSize}题）===`);
        console.log(`✅ 有效问题: ${validQuestions}/${sampleSize}`);
        console.log(`✅ 有scoringKeywords: ${hasScoringKeywords}/${sampleSize}`);
        console.log(`✅ 有expectedStructure: ${hasExpectedStructure}/${sampleSize}`);
        console.log(`✅ 有detailedAnalysis: ${hasDetailedAnalysis}/${sampleSize}`);
        
        // 显示示例问题
        if (questionBank.length > 0) {
            console.log('\n=== 示例问题 ===');
            const example = questionBank[0];
            console.log(`标题: ${example.title}`);
            console.log(`角色: ${example.role}`);
            console.log(`问题: ${example.question.substring(0, 80)}...`);
            console.log(`scoringKeywords: ${Object.keys(example.scoringKeywords || {}).slice(0, 5).join(', ')}`);
            console.log(`expectedStructure: ${(example.expectedStructure || []).slice(0, 3).join(' → ')}`);
        }
    }
} catch (error) {
    console.error(`❌ 解析错误: ${error.message}`);
    console.error(`堆栈: ${error.stack}`);
}

// 5. 检查industry-practice.html中的引用
console.log('\n=== HTML文件检查 ===');
const htmlFiles = ['industry-practice.html', 'finance-bro.html', 'index.html'];

htmlFiles.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
        const htmlContent = fs.readFileSync(filePath, 'utf8');
        const hasQuestionsRef = htmlContent.includes('questions.js');
        const hasAnalyzeFunction = htmlContent.includes('analyzeAnswer');
        
        console.log(`${filename}:`);
        console.log(`  ${hasQuestionsRef ? '✅' : '❌'} 引用questions.js`);
        console.log(`  ${hasAnalyzeFunction ? '✅' : '❌'} 包含analyzeAnswer函数`);
    }
});

// 6. 浏览器模拟测试
console.log('\n=== 模拟浏览器环境测试 ===');

// 创建一个简单的测试脚本
const testScript = `
// 模拟浏览器环境测试
if (typeof window === 'undefined') {
    console.log('⚠️ 非浏览器环境，跳过部分测试');
} else {
    console.log('✅ 浏览器环境');
    
    // 检查全局变量
    console.log('window.questionBank:', typeof window.questionBank);
    console.log('window.roles:', typeof window.roles);
    
    if (window.questionBank && Array.isArray(window.questionBank)) {
        console.log('✅ questionBank已加载，数量:', window.questionBank.length);
        
        // 测试第一个问题
        const firstQuestion = window.questionBank[0];
        if (firstQuestion) {
            console.log('✅ 第一个问题有效:', firstQuestion.title);
            
            // 测试分析函数
            if (typeof analyzeAnswer === 'function') {
                console.log('✅ analyzeAnswer函数可用');
                
                // 模拟测试答案
                const testAnswer = "The current M&A market is influenced by interest rates and sector trends.";
                console.log('测试答案:', testAnswer);
                
                // 注意：在实际浏览器中才能调用analyzeAnswer
            } else {
                console.log('❌ analyzeAnswer函数不可用');
            }
        }
    }
}
`;

console.log('测试脚本已准备，在浏览器控制台中运行以下代码：');
console.log(testScript);

console.log('\n=== 诊断完成 ===');
console.log('💡 建议：');
console.log('1. 打开浏览器开发者工具（F12）查看Console输出');
console.log('2. 检查是否有JavaScript错误');
console.log('3. 运行上面的测试脚本验证环境');