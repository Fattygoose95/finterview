// 调试问题11
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
    
    // 检查问题11（索引10）
    const q = questionBank[10];
    
    console.log('问题11详情:');
    console.log('标题:', q.title);
    console.log('角色:', q.role);
    console.log('问题:', q.question);
    console.log('modelAnswer长度:', (q.modelAnswer || '').length);
    console.log('modelAnswer前200字符:', (q.modelAnswer || '').substring(0, 200));
    console.log('\n当前scoringKeywords:', q.scoringKeywords);
    console.log('关键词类型:', typeof q.scoringKeywords);
    console.log('关键词键:', Object.keys(q.scoringKeywords));
    
    // 测试提取函数
    console.log('\n=== 测试提取函数 ===');
    const keywords = extractTechnicalKeywords(q.modelAnswer || '', q.question || '', q.role || '');
    console.log('提取的关键词:', keywords);
    
} catch (error) {
    console.error('处理错误:', error.message);
}

// 复制提取函数进行调试
function extractTechnicalKeywords(modelAnswer, questionText, role) {
    const keywords = {};
    
    // 常见停用词
    const stopWords = new Set([
        'the', 'and', 'for', 'that', 'with', 'this', 'from', 'have', 'which', 'what',
        'how', 'why', 'when', 'where', 'would', 'could', 'should', 'about', 'their',
        'there', 'been', 'they', 'will', 'also', 'more', 'other', 'some', 'such',
        'than', 'then', 'them', 'these', 'those', 'upon', 'very', 'were', 'what',
        'when', 'whom', 'your', 'into', 'over', 'under', 'after', 'before'
    ]);
    
    console.log('modelAnswer长度:', modelAnswer.length);
    console.log('modelAnswer示例:', modelAnswer.substring(0, 100));
    
    // 提取modelAnswer中的单词
    const words = modelAnswer.toLowerCase()
        .replace(/[^\w\s-]/g, ' ') // 替换标点为空格
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.has(word));
    
    console.log('过滤后单词数:', words.length);
    console.log('前10个单词:', words.slice(0, 10));
    
    // 统计词频
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    console.log('词频统计键:', Object.keys(wordFreq).slice(0, 10));
    
    // 选择高频词作为关键词
    const sortedWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15); // 取前15个高频词
    
    console.log('排序后前5个:', sortedWords.slice(0, 5));
    
    // 分配权重（基于频率和重要性）
    let maxWeight = 20;
    sortedWords.forEach(([word, freq], index) => {
        // 权重递减：第一个词20分，最后一个词5分
        const weight = Math.max(5, maxWeight - index);
        keywords[word] = weight;
    });
    
    return keywords;
}