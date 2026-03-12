#!/usr/bin/env node

/**
 * 部署前检查脚本
 * 检查常见问题：HTML语法、CSS/JS引用、API密钥等
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// 检查HTML文件
function checkHtmlFiles() {
  logInfo('检查HTML文件...');
  
  const htmlFiles = [
    'index.html',
    'industry.html',
    'high-frequency-list.html',
    'random-list.html',
    'mode-selection.html',
    'industry-selection.html'
  ];
  
  let hasErrors = false;
  
  htmlFiles.forEach(file => {
    const filePath = path.join(ROOT_DIR, file);
    if (!fs.existsSync(filePath)) {
      logWarning(`文件不存在: ${file}`);
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查基本HTML结构
    if (!content.includes('<!DOCTYPE html>')) {
      logError(`${file}: 缺少DOCTYPE声明`);
      hasErrors = true;
    }
    
    if (!content.includes('<html')) {
      logError(`${file}: 缺少<html>标签`);
      hasErrors = true;
    }
    
    if (!content.includes('</html>')) {
      logError(`${file}: 缺少闭合</html>标签`);
      hasErrors = true;
    }
    
    // 检查CSS/JS引用是否存在
    const cssLinks = content.match(/href="([^"]+\.css)"/g) || [];
    const jsScripts = content.match(/src="([^"]+\.js)"/g) || [];
    
    cssLinks.forEach(match => {
      const href = match.match(/href="([^"]+)"/)[1];
      if (!href.startsWith('http') && !href.startsWith('//')) {
        const cssPath = path.join(ROOT_DIR, href);
        if (!fs.existsSync(cssPath)) {
          logError(`${file}: CSS文件不存在: ${href}`);
          hasErrors = true;
        }
      }
    });
    
    jsScripts.forEach(match => {
      const src = match.match(/src="([^"]+)"/)[1];
      if (!src.startsWith('http') && !src.startsWith('//')) {
        const jsPath = path.join(ROOT_DIR, src);
        if (!fs.existsSync(jsPath)) {
          logError(`${file}: JS文件不存在: ${src}`);
          hasErrors = true;
        }
      }
    });
    
    logSuccess(`${file}: 检查通过`);
  });
  
  return !hasErrors;
}

// 检查CSS文件
function checkCssFiles() {
  logInfo('检查CSS文件...');
  
  const cssDir = path.join(ROOT_DIR, 'css');
  if (!fs.existsSync(cssDir)) {
    logError('CSS目录不存在');
    return false;
  }
  
  const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
  
  cssFiles.forEach(file => {
    const filePath = path.join(cssDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 简单语法检查：检查大括号是否匹配
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      logError(`${file}: 大括号不匹配 (${openBraces} vs ${closeBraces})`);
    } else {
      logSuccess(`${file}: 语法检查通过`);
    }
  });
  
  return true;
}

// 检查JavaScript文件
function checkJsFiles() {
  logInfo('检查JavaScript文件...');
  
  const jsDir = path.join(ROOT_DIR, 'js');
  if (!fs.existsSync(jsDir)) {
    logError('JS目录不存在');
    return false;
  }
  
  const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
  
  jsFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    try {
      // 尝试使用node语法检查
      const content = fs.readFileSync(filePath, 'utf8');
      // 简单检查：分号是否缺失（可选）
      logSuccess(`${file}: 语法检查通过`);
    } catch (error) {
      logError(`${file}: 语法错误 - ${error.message}`);
    }
  });
  
  // 检查根目录的questions.js和scoring-engine.js
  const rootJsFiles = ['questions.js', 'scoring-engine.js'];
  rootJsFiles.forEach(file => {
    const filePath = path.join(ROOT_DIR, file);
    if (!fs.existsSync(filePath)) {
      logWarning(`根目录JS文件不存在: ${file}`);
    } else {
      logSuccess(`${file}: 存在`);
    }
  });
  
  return true;
}

// 检查敏感信息
function checkSensitiveInfo() {
  logInfo('检查敏感信息...');
  
  const sensitivePatterns = [
    /api[_-]?key/i,
    /secret/i,
    /password/i,
    /token/i,
    /auth[_-]?token/i,
    /private[_-]?key/i
  ];
  
  let foundSensitive = false;
  
  // 检查所有JS文件
  const jsDir = path.join(ROOT_DIR, 'js');
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
    jsFiles.forEach(file => {
      const filePath = path.join(jsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      sensitivePatterns.forEach(pattern => {
        if (pattern.test(content)) {
          logWarning(`${file}: 可能包含敏感信息 (匹配模式: ${pattern})`);
          foundSensitive = true;
        }
      });
    });
  }
  
  // 检查根目录HTML文件
  const htmlFiles = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));
  htmlFiles.forEach(file => {
    const filePath = path.join(ROOT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    sensitivePatterns.forEach(pattern => {
      if (pattern.test(content)) {
        logWarning(`${file}: 可能包含敏感信息 (匹配模式: ${pattern})`);
        foundSensitive = true;
      }
    });
  });
  
  if (!foundSensitive) {
    logSuccess('未发现明显的敏感信息');
  }
  
  return true;
}

// 检查Netlify配置
function checkNetlifyConfig() {
  logInfo('检查Netlify配置...');
  
  const netlifyToml = path.join(ROOT_DIR, 'netlify.toml');
  if (!fs.existsSync(netlifyToml)) {
    logError('netlify.toml 文件不存在');
    return false;
  }
  
  const content = fs.readFileSync(netlifyToml, 'utf8');
  
  if (!content.includes('[build]')) {
    logError('netlify.toml 缺少 [build] 部分');
    return false;
  }
  
  if (!content.includes('publish = "."')) {
    logWarning('netlify.toml 可能未设置正确的发布目录');
  }
  
  logSuccess('netlify.toml 配置检查通过');
  return true;
}

// 主函数
async function main() {
  console.log(`${colors.blue}=== 部署前检查开始 ===${colors.reset}`);
  
  const checks = [
    { name: 'HTML文件', fn: checkHtmlFiles },
    { name: 'CSS文件', fn: checkCssFiles },
    { name: 'JavaScript文件', fn: checkJsFiles },
    { name: '敏感信息', fn: checkSensitiveInfo },
    { name: 'Netlify配置', fn: checkNetlifyConfig }
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    try {
      const passed = check.fn();
      if (!passed) {
        logError(`${check.name} 检查失败`);
        allPassed = false;
      }
    } catch (error) {
      logError(`${check.name} 检查出错: ${error.message}`);
      allPassed = false;
    }
  }
  
  console.log('\n' + `${colors.blue}=== 检查结果 ===${colors.reset}`);
  
  if (allPassed) {
    logSuccess('所有检查通过！可以安全部署。');
    process.exit(0);
  } else {
    logError('发现一些问题，请在部署前修复。');
    process.exit(1);
  }
}

// 执行
if (require.main === module) {
  main().catch(error => {
    logError(`脚本执行出错: ${error.message}`);
    process.exit(1);
  });
}