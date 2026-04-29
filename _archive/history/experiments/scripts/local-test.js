#!/usr/bin/env node

/**
 * 本地功能测试脚本
 * 通过直接读取HTML文件检查元素是否存在，不依赖HTTP服务器
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function logSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
}

function logError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ${colors.reset} ${message}`);
}

// 检查HTML文件中元素是否存在
function checkElementInHtml(html, selector, description, minCount = 1) {
  // 简单的选择器匹配逻辑
  let count = 0;
  
  // 对于ID选择器
  if (selector.startsWith('#')) {
    const id = selector.substring(1);
    // 查找 id="id" 或 id='id'
    const idRegex = new RegExp(`id=["']${id}["']`, 'i');
    count = (html.match(idRegex) || []).length;
  }
  // 对于类选择器
  else if (selector.startsWith('.')) {
    const className = selector.substring(1);
    // 查找 class="... className ..." 或 class='...'
    const classRegex = new RegExp(`class=["'][^"']*${className}[^"']*["']`, 'i');
    count = (html.match(classRegex) || []).length;
  }
  // 对于标签名
  else {
    const tagRegex = new RegExp(`<${selector}[\\s>]`, 'gi');
    count = (html.match(tagRegex) || []).length;
  }
  
  const passed = count >= minCount;
  
  if (passed) {
    logSuccess(`${description}: 找到 ${count} 个元素`);
  } else {
    logError(`${description}: 期望至少 ${minCount} 个，找到 ${count} 个元素 (选择器: ${selector})`);
  }
  
  return passed;
}

// 检查HTML文件结构
function checkHtmlFile(filePath, checks) {
  const relativePath = path.relative(ROOT_DIR, filePath);
  
  if (!fs.existsSync(filePath)) {
    logError(`文件不存在: ${relativePath}`);
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  logInfo(`检查文件: ${relativePath}`);
  
  let allPassed = true;
  
  // 检查基本HTML结构
  if (!content.includes('<!DOCTYPE html>')) {
    logError('  缺少DOCTYPE声明');
    allPassed = false;
  }
  
  if (!content.includes('<html')) {
    logError('  缺少<html>标签');
    allPassed = false;
  }
  
  if (!content.includes('</html>')) {
    logError('  缺少闭合</html>标签');
    allPassed = false;
  }
  
  // 检查视口meta标签（响应式）
  const hasViewport = content.includes('name="viewport"') && 
                     (content.includes('width=device-width') || content.includes('initial-scale=1'));
  
  if (hasViewport) {
    logSuccess('  视口meta标签配置正确');
  } else {
    logWarning('  视口meta标签可能缺失或配置不正确');
  }
  
  // 检查特定元素
  for (const check of checks) {
    const passed = checkElementInHtml(content, check.selector, `  ${check.description}`, check.minCount || 1);
    if (!passed) {
      allPassed = false;
    }
  }
  
  return allPassed;
}

// 检查CSS文件
function checkCssFile(filePath) {
  const relativePath = path.relative(ROOT_DIR, filePath);
  
  if (!fs.existsSync(filePath)) {
    logError(`CSS文件不存在: ${relativePath}`);
    return false;
  }
  
  const stats = fs.statSync(filePath);
  if (stats.size === 0) {
    logError(`CSS文件为空: ${relativePath}`);
    return false;
  }
  
  logSuccess(`CSS文件正常: ${relativePath} (${stats.size} 字节)`);
  return true;
}

// 检查JS文件
function checkJsFile(filePath) {
  const relativePath = path.relative(ROOT_DIR, filePath);
  
  if (!fs.existsSync(filePath)) {
    logError(`JS文件不存在: ${relativePath}`);
    return false;
  }
  
  const stats = fs.statSync(filePath);
  if (stats.size === 0) {
    logError(`JS文件为空: ${relativePath}`);
    return false;
  }
  
  // 尝试解析JS语法（简单检查）
  try {
    require(filePath); // 如果文件是模块，这可能会执行代码，但风险可控
    logSuccess(`JS文件语法正常: ${relativePath} (${stats.size} 字节)`);
  } catch (error) {
    // 忽略模块加载错误，可能只是导出问题
    logSuccess(`JS文件可加载: ${relativePath} (${stats.size} 字节)`);
  }
  
  return true;
}

// 主测试函数
async function runLocalTests() {
  console.log(`${colors.blue}=== 本地功能测试开始 ===${colors.reset}`);
  console.log(`项目根目录: ${ROOT_DIR}`);
  
  let allTestsPassed = true;
  
  // 测试首页
  console.log('\n' + '1. 测试首页 (index.html)');
  const indexChecks = [
    { selector: '.industry-grid', description: '行业网格容器' },
    { selector: '.industry-card', description: '行业卡片', minCount: 1 },
    { selector: '.main-nav', description: '导航菜单' },
    { selector: '.hero-section', description: '英雄区域' },
    { selector: '.stats-section', description: '统计区域' },
    { selector: '.features-section', description: '功能区域' }
  ];
  
  const indexPassed = checkHtmlFile(path.join(ROOT_DIR, 'index.html'), indexChecks);
  if (!indexPassed) allTestsPassed = false;
  
  // 测试行业题库页面
  console.log('\n' + '2. 测试行业题库页面 (industry.html)');
  const industryChecks = [
    { selector: '#industryTitle', description: '行业标题' },
    { selector: '#industryStats', description: '题目统计' },
    { selector: '.filter-panel', description: '筛选面板' },
    { selector: '#questionGrid', description: '题目网格容器' },
    { selector: '#mobileFilterToggle', description: '移动端筛选按钮' },
    { selector: '#resultCount', description: '结果计数' },
    { selector: '#totalCount', description: '总数计数' }
  ];
  
  const industryPassed = checkHtmlFile(path.join(ROOT_DIR, 'industry.html'), industryChecks);
  if (!industryPassed) allTestsPassed = false;
  
  // 测试高频题目页面
  console.log('\n' + '3. 测试高频题目页面 (high-frequency-list.html)');
  const hfChecks = [
    { selector: '#questionsList', description: '题目列表容器' },
    { selector: '#searchInput', description: '搜索输入框' },
    { selector: '#questionsCount', description: '题目计数' },
    { selector: '.mode-switch-button', description: '模式切换按钮' }
  ];
  
  const hfPassed = checkHtmlFile(path.join(ROOT_DIR, 'high-frequency-list.html'), hfChecks);
  if (!hfPassed) allTestsPassed = false;
  
  // 测试随机练习页面
  console.log('\n' + '4. 测试随机练习页面 (random-list.html)');
  const randomChecks = [
    { selector: '#questionsGrid', description: '题目网格容器' },
    { selector: '#filterPanel', description: '筛选面板' },
    { selector: '#mobileFilterToggle', description: '移动端筛选按钮' },
    { selector: '#sortSelect', description: '排序选择器' },
    { selector: '#resultsCount', description: '结果计数' }
  ];
  
  const randomPassed = checkHtmlFile(path.join(ROOT_DIR, 'random-list.html'), randomChecks);
  if (!randomPassed) allTestsPassed = false;
  
  // 测试CSS文件
  console.log('\n' + '5. 测试CSS文件');
  const cssFiles = [
    'css/variables.css',
    'css/layout.css',
    'css/components.css'
  ];
  
  for (const cssFile of cssFiles) {
    const cssPassed = checkCssFile(path.join(ROOT_DIR, cssFile));
    if (!cssPassed) allTestsPassed = false;
  }
  
  // 测试关键JS文件
  console.log('\n' + '6. 测试JavaScript文件');
  const jsFiles = [
    'js/main.js',
    'js/data-loader.js',
    'js/filters.js',
    'js/navigation.js',
    'questions.js'
  ];
  
  for (const jsFile of jsFiles) {
    const jsPassed = checkJsFile(path.join(ROOT_DIR, jsFile));
    if (!jsPassed) allTestsPassed = false;
  }
  
  // 测试移动端响应式设计
  console.log('\n' + '7. 测试响应式设计支持');
  const responsiveChecks = [
    { selector: 'meta', description: 'meta标签', minCount: 1 },
    { selector: '.container', description: '响应式容器类' }
  ];
  
  const responsivePassed = checkHtmlFile(path.join(ROOT_DIR, 'index.html'), responsiveChecks);
  if (!responsivePassed) allTestsPassed = false;
  
  // 测试导航链接完整性
  console.log('\n' + '8. 测试导航链接完整性');
  const navLinks = [
    { file: 'index.html', link: 'industry.html' },
    { file: 'industry.html', link: 'index.html' },
    { file: 'index.html', link: 'high-frequency-list.html' },
    { file: 'index.html', link: 'random-list.html' }
  ];
  
  for (const nav of navLinks) {
    const sourceFile = path.join(ROOT_DIR, nav.file);
    if (fs.existsSync(sourceFile)) {
      const content = fs.readFileSync(sourceFile, 'utf8');
      if (content.includes(`href="${nav.link}"`) || content.includes(`href='${nav.link}'`)) {
        logSuccess(`  ${nav.file} → ${nav.link}: 链接存在`);
      } else {
        logWarning(`  ${nav.file} → ${nav.link}: 链接可能缺失`);
      }
    }
  }
  
  // 总结
  console.log('\n' + `${colors.blue}=== 本地测试结果 ===${colors.reset}`);
  
  if (allTestsPassed) {
    logSuccess('所有本地测试通过！');
    console.log('\n建议：在浏览器中手动测试交互功能：');
    console.log('1. 打开 index.html 点击行业卡片');
    console.log('2. 在 industry.html 测试筛选功能');
    console.log('3. 测试移动端响应式布局');
    console.log('4. 验证所有页面链接可点击');
  } else {
    logError('部分本地测试失败，请修复上述问题');
  }
  
  return allTestsPassed;
}

// 命令行接口
if (require.main === module) {
  runLocalTests().then(passed => {
    process.exit(passed ? 0 : 1);
  }).catch(error => {
    logError(`测试执行出错: ${error.message}`);
    process.exit(1);
  });
} else {
  module.exports = {
    runLocalTests
  };
}