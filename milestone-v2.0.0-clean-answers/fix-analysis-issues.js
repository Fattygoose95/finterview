// 修复分析功能问题
const fs = require('fs');
const path = require('path');

// 读取industry-practice.html文件
const htmlPath = path.join(__dirname, 'industry-practice.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

console.log('修复分析功能问题...\n');

// 修复1: 改进废话检测的反馈 - 确保用户知道为什么没有分析结果
// 查找isNonsenseInput函数中被调用的部分
const nonsenseCheckPattern = /if \(isNonsenseInput\(userAnswer\)\) \{[\s\S]*?\/\/ Don't proceed to analysis[\s\S]*?return;/;

if (nonsenseCheckPattern.test(htmlContent)) {
    console.log('✅ 找到废话检测逻辑');
    
    // 在废话检测后添加更明确的反馈
    const improvedNonsenseCheck = `if (isNonsenseInput(userAnswer)) {
                        const inputHint = document.getElementById('inputHint');
                        const answerFeedbackSection = document.getElementById('answerFeedbackSection');
                        const nonsenseMessage = getNonsenseMessage();
                        
                        if (inputHint) {
                            inputHint.className = 'input-hint error';
                            inputHint.innerHTML = \`<i class="fas fa-grin-beam-sweat"></i> \${nonsenseMessage}\`;
                        }
                        
                        if (answerTextarea) {
                            answerTextarea.className = 'answer-textarea error';
                            answerTextarea.focus();
                            
                            // Briefly shake the textarea for emphasis (幽默效果)
                            answerTextarea.classList.add('shake-animation');
                            setTimeout(() => {
                                answerTextarea.classList.remove('shake-animation');
                            }, 500);
                        }
                        
                        // Show feedback section with explanation
                        if (answerFeedbackSection) {
                            answerFeedbackSection.style.display = 'block';
                            
                            // Clear previous feedback
                            const scoreValue = document.getElementById('scoreValue');
                            const scoreDescription = document.getElementById('scoreDescription');
                            const keywordsList = document.getElementById('keywordsList');
                            const structureList = document.getElementById('structureList');
                            const tipsContent = document.getElementById('tipsContent');
                            const analysisContent = document.getElementById('analysisContent');
                            
                            if (scoreValue) scoreValue.textContent = 'N/A';
                            if (scoreDescription) scoreDescription.textContent = nonsenseMessage;
                            if (keywordsList) keywordsList.innerHTML = '<div class="empty-state">Input detected as random typing. Please provide a meaningful answer.</div>';
                            if (structureList) structureList.innerHTML = '<div class="empty-state">No structure analysis for random input.</div>';
                            if (tipsContent) tipsContent.innerHTML = '<div class="tip"><strong>Tip:</strong> Try answering with actual finance concepts or examples.</div>';
                            if (analysisContent) analysisContent.innerHTML = '<div class="empty-state">Cannot analyze random keyboard input.</div>';
                        }
                        
                        // Don't proceed to analysis
                        return;
                    }`;
    
    htmlContent = htmlContent.replace(nonsenseCheckPattern, improvedNonsenseCheck);
    console.log('✅ 改进废话检测反馈');
} else {
    console.log('⚠️ 未找到废话检测逻辑');
}

// 修复2: 在analyzeAnswer函数开始时添加调试日志
const analyzeAnswerStartPattern = /function analyzeAnswer\(userAnswer, question\) \{[\s\S]*?\/\/ Initialize feedback elements/;
if (analyzeAnswerStartPattern.test(htmlContent)) {
    const debugAddition = `function analyzeAnswer(userAnswer, question) {
                console.log('=== analyzeAnswer called ===');
                console.log('User answer length:', userAnswer.length);
                console.log('Question:', question.title);
                console.log('Question has scoringKeywords:', question.scoringKeywords && Object.keys(question.scoringKeywords).length > 0);
                console.log('Question has expectedStructure:', question.expectedStructure && question.expectedStructure.length > 0);
                console.log('Question has detailedAnalysis:', question.detailedAnalysis && Object.keys(question.detailedAnalysis).length > 0);
                
                // Initialize feedback elements`;
    
    htmlContent = htmlContent.replace(/function analyzeAnswer\(userAnswer, question\) \{[\s\S]*?\/\/ Initialize feedback elements/, debugAddition);
    console.log('✅ 添加分析调试日志');
}

// 修复3: 确保即使分数为0也显示关键词匹配情况
// 在关键词匹配部分，确保即使没有匹配也显示所有关键词
const keywordDisplayPattern = /\/\/ Display keyword matches[\s\S]*?keywordsList\.innerHTML = '';/;
if (keywordDisplayPattern.test(htmlContent)) {
    const improvedKeywordDisplay = `// Display keyword matches
                    keywordsList.innerHTML = '';
                    
                    // Always show all keywords, not just matched ones
                    const allKeywords = Object.entries(keywords);
                    
                    if (allKeywords.length === 0) {
                        keywordsList.innerHTML = '<div class="empty-state">No keyword data available for this question</div>';
                    } else {
                        // Show matched keywords first
                        matchedKeywords.forEach(item => {
                            const keywordEl = document.createElement('div');
                            keywordEl.className = 'keyword-item matched';
                            keywordEl.innerHTML = \`<i class="fas fa-check"></i> \${item.keyword} <span class="keyword-weight">\${item.weight}pts</span>\`;
                            keywordsList.appendChild(keywordEl);
                        });
                        
                        // Then show missing keywords
                        missingKeywords.forEach(item => {
                            const keywordEl = document.createElement('div');
                            keywordEl.className = 'keyword-item missing';
                            keywordEl.innerHTML = \`<i class="fas fa-times"></i> \${item.keyword} <span class="keyword-weight">\${item.weight}pts</span>\`;
                            keywordsList.appendChild(keywordEl);
                        });
                        
                        // Add summary
                        const summaryEl = document.createElement('div');
                        summaryEl.className = 'keyword-summary';
                        summaryEl.innerHTML = \`Matched \${matchedKeywords.length} of \${allKeywords.length} keywords (\${keywordPercentage}%)\`;
                        keywordsList.appendChild(summaryEl);
                    }`;
    
    htmlContent = htmlContent.replace(/\/\/ Display keyword matches[\s\S]*?keywordsList\.innerHTML = '';[\s\S]*?\} else \{[\s\S]*?keywordsList\.innerHTML = '<div class="empty-state">No keyword data available for this question<\/div>';\}/, improvedKeywordDisplay);
    console.log('✅ 改进关键词显示逻辑');
}

// 修复4: 在页面加载时添加数据加载状态显示
const loadQuestionsPattern = /function loadQuestions\(industryId\) \{/;
if (loadQuestionsPattern.test(htmlContent)) {
    const loadStatusAddition = `// Add data loading status indicator
            function updateDataLoadingStatus() {
                const statusElement = document.getElementById('dataLoadingStatus');
                if (!statusElement) return;
                
                if (typeof window.questionBank === 'undefined') {
                    statusElement.innerHTML = '<span style=\"color: #ef4444;\"><i class=\"fas fa-exclamation-circle\"></i> Data not loaded. questions.js may not be properly loaded.</span>';
                    console.error('window.questionBank is undefined');
                } else if (!Array.isArray(window.questionBank)) {
                    statusElement.innerHTML = '<span style=\"color: #ef4444;\"><i class=\"fas fa-exclamation-circle\"></i> Invalid data format.</span>';
                    console.error('window.questionBank is not an array:', typeof window.questionBank);
                } else {
                    statusElement.innerHTML = \`<span style=\"color: #10b981;\"><i class=\"fas fa-check-circle\"></i> Data loaded: \${window.questionBank.length} questions</span>\`;
                    console.log('Data loaded successfully:', window.questionBank.length, 'questions');
                }
            }
            
            // Call status update on load
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(updateDataLoadingStatus, 1000);
            });
            
            function loadQuestions(industryId) {`;
    
    htmlContent = htmlContent.replace(/function loadQuestions\(industryId\) \{/, loadStatusAddition);
    console.log('✅ 添加数据加载状态显示');
}

// 修复5: 在页面底部添加数据状态元素
const bodyEndPattern = /<\/body>/;
if (bodyEndPattern.test(htmlContent)) {
    const statusElement = `
    <!-- Data loading status -->
    <div style="position: fixed; bottom: 10px; right: 10px; background: #f8f9fa; padding: 8px 12px; border-radius: 6px; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 1000;">
        <div id="dataLoadingStatus">Checking data status...</div>
    </div>
</body>`;
    
    htmlContent = htmlContent.replace(/<\/body>/, statusElement);
    console.log('✅ 添加数据状态显示元素');
}

// 备份原文件
const backupPath = path.join(__dirname, `industry-practice.html.backup.fixes-${Date.now()}`);
fs.copyFileSync(htmlPath, backupPath);
console.log(`\n📁 备份原文件到: ${backupPath}`);

// 保存修复后的文件
fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('✅ 已保存修复后的 industry-practice.html');

// 创建测试页面
createTestPage();

console.log('\n=== 修复总结 ===');
console.log('1. 改进废话检测反馈 - 显示分析面板并解释原因');
console.log('2. 添加分析调试日志 - 帮助诊断问题');
console.log('3. 改进关键词显示 - 即使分数为0也显示所有关键词');
console.log('4. 添加数据加载状态显示 - 实时查看数据加载情况');
console.log('5. 创建测试页面 - 用于快速验证功能');

console.log('\n🚀 请重新加载 industry-practice.html 测试修复效果');
console.log('💡 建议：打开浏览器开发者工具（F12）查看Console输出');

function createTestPage() {
    const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>finterview - Analysis Test</title>
    <link rel="stylesheet" href="css/unified-design.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .test-container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
        }
        .test-section {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .test-button {
            background: #4361ee;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            margin: 5px;
        }
        .test-button:hover {
            background: #3a0ca3;
        }
        .test-result {
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #4361ee;
        }
    </style>
</head>
<body>
    <div class="test-container">
        <h1>finterview 分析功能测试</h1>
        
        <div class="test-section">
            <h3>数据加载测试</h3>
            <button class="test-button" onclick="testDataLoad()">测试数据加载</button>
            <div id="dataTestResult" class="test-result"></div>
        </div>
        
        <div class="test-section">
            <h3>废话检测测试</h3>
            <button class="test-button" onclick="testNonsense('asdfghjkl qwertyuiop')">测试键盘输入</button>
            <button class="test-button" onclick="testNonsense('This is a valid finance answer about M&A markets')">测试有效答案</button>
            <div id="nonsenseTestResult" class="test-result"></div>
        </div>
        
        <div class="test-section">
            <h3>分析功能测试</h3>
            <p>使用第一个问题进行测试：</p>
            <div id="questionInfo" class="test-result"></div>
            <textarea id="testAnswer" style="width:100%; height:100px; padding:10px; margin:10px 0;" placeholder="输入测试答案..."></textarea>
            <button class="test-button" onclick="testAnalysis()">测试分析</button>
            <div id="analysisTestResult" class="test-result"></div>
        </div>
    </div>
    
    <script src="questions.js"></script>
    <script>
        // 从industry-practice.html复制的函数
        function isNonsenseInput(text) {
            if (text.length < 50) return false;
            
            // 简化版本，只检查明显键盘模式
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
        
        // 测试函数
        function testDataLoad() {
            const result = document.getElementById('dataTestResult');
            if (typeof window.questionBank === 'undefined') {
                result.innerHTML = '<span style="color:#ef4444">❌ window.questionBank未定义</span>';
                console.error('questions.js未正确加载');
            } else if (!Array.isArray(window.questionBank)) {
                result.innerHTML = '<span style="color:#ef4444">❌ window.questionBank不是数组</span>';
                console.error('数据格式错误:', typeof window.questionBank);
            } else {
                result.innerHTML = \`<span style="color:#10b981">✅ 数据加载成功: \${window.questionBank.length}个问题</span>\`;
                console.log('数据:', window.questionBank);
                
                // 显示第一个问题信息
                const questionInfo = document.getElementById('questionInfo');
                if (window.questionBank.length > 0) {
                    const q = window.questionBank[0];
                    questionInfo.innerHTML = \`
                        <strong>测试问题:</strong> \${q.title}<br>
                        <strong>关键词:</strong> \${Object.keys(q.scoringKeywords || {}).slice(0,5).join(', ')}<br>
                        <strong>预期结构:</strong> \${(q.expectedStructure || []).slice(0,3).join(' → ')}
                    \`;
                }
            }
        }
        
        function testNonsense(text) {
            const result = document.getElementById('nonsenseTestResult');
            const isNonsense = isNonsenseInput(text);
            result.innerHTML = \`
                <strong>测试文本:</strong> "\${text.substring(0, 30)}..."<br>
                <strong>检测结果:</strong> \${isNonsense ? '<span style="color:#ef4444">❌ 被检测为废话</span>' : '<span style="color:#10b981">✅ 正常文本</span>'}<br>
                <strong>说明:</strong> \${isNonsense ? '包含键盘模式，不会执行分析' : '可以通过分析'}
            \`;
        }
        
        function testAnalysis() {
            const answer = document.getElementById('testAnswer').value;
            const result = document.getElementById('analysisTestResult');
            
            if (!answer.trim()) {
                result.innerHTML = '<span style="color:#f59e0b">⚠️ 请输入测试答案</span>';
                return;
            }
            
            if (typeof window.questionBank === 'undefined' || window.questionBank.length === 0) {
                result.innerHTML = '<span style="color:#ef4444">❌ 数据未加载，请先运行数据加载测试</span>';
                return;
            }
            
            const question = window.questionBank[0];
            
            // 简化版分析
            let score = 0;
            let feedback = [];
            
            // 关键词匹配
            if (question.scoringKeywords && Object.keys(question.scoringKeywords).length > 0) {
                let matched = 0;
                let total = 0;
                let keywordScore = 0;
                let maxKeywordScore = 0;
                
                Object.entries(question.scoringKeywords).forEach(([keyword, weight]) => {
                    total++;
                    maxKeywordScore += weight;
                    const regex = new RegExp(\`\\\\b\${keyword}\\\\b\`, 'i');
                    if (regex.test(answer)) {
                        matched++;
                        keywordScore += weight;
                    }
                });
                
                const keywordPercentage = maxKeywordScore > 0 ? Math.round((keywordScore / maxKeywordScore) * 100) : 0;
                score += keywordPercentage * 0.4;
                feedback.push(\`关键词匹配: \${matched}/\${total} (\${keywordPercentage}%)\`);
            }
            
            // 最终分数
            score = Math.min(100, Math.max(0, Math.round(score)));
            
            result.innerHTML = \`
                <strong>分析结果:</strong><br>
                <strong>分数:</strong> \${score}/100<br>
                <strong>反馈:</strong> \${feedback.join('<br>')}<br>
                <strong>调试信息:</strong><br>
                - 答案长度: \${answer.length}字符<br>
                - 问题标题: \${question.title}<br>
                - 有关键词数据: \${question.scoringKeywords ? '是' : '否'}<br>
                - 有结构数据: \${question.expectedStructure ? '是' : '否'}
            \`;
            
            console.log('测试分析结果:', { score, feedback, question: question.title });
        }
    </script>
</body>
</html>`;
    
    const testPath = path.join(__dirname, 'analysis-test.html');
    fs.writeFileSync(testPath, testHtml, 'utf8');
    console.log(`📄 创建测试页面: ${testPath}`);
}