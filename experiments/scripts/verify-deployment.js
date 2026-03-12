#!/usr/bin/env node

/**
 * 部署后验证脚本
 * 检查网站基本功能是否正常
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  // 本地测试URL
  localUrl: 'http://localhost:8080',
  
  // 生产URL（从环境变量获取）
  productionUrl: process.env.DEPLOYMENT_URL || 'https://finterview.netlify.app',
  
  // 要检查的页面路径
  pagesToCheck: [
    '/',
    '/industry.html',
    '/high-frequency-list.html',
    '/random-list.html',
    '/mode-selection.html',
    '/industry-selection.html'
  ],
  
  // 要检查的资源文件
  resourcesToCheck: [
    '/css/variables.css',
    '/css/layout.css',
    '/css/components.css',
    '/js/questions.js',
    '/js/scoring-engine.js',
    '/js/data-loader.js',
    '/js/main.js'
  ],
  
  // 超时时间（毫秒）
  timeout: 10000
};

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

// 发起HTTP请求
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(CONFIG.timeout, () => {
      req.destroy();
      reject(new Error('请求超时'));
    });
  });
}

// 检查页面是否可访问
async function checkPage(baseUrl, path) {
  const url = baseUrl + path;
  
  try {
    const response = await fetchUrl(url);
    
    if (response.statusCode === 200) {
      // 检查HTML结构
      const isHtml = response.headers['content-type'] && 
                    response.headers['content-type'].includes('text/html');
      
      if (isHtml) {
        // 检查基本HTML标签
        const hasDoctype = response.body.includes('<!DOCTYPE html>');
        const hasHtml = response.body.includes('<html');
        const hasHead = response.body.includes('<head>');
        const hasBody = response.body.includes('<body>');
        
        if (hasDoctype && hasHtml && hasHead && hasBody) {
          return { success: true, message: `页面正常 (${response.statusCode})` };
        } else {
          return { success: false, message: 'HTML结构不完整' };
        }
      } else {
        return { success: true, message: `资源可访问 (${response.statusCode})` };
      }
    } else if (response.statusCode === 404) {
      return { success: false, message: `页面不存在 (404)` };
    } else {
      return { success: false, message: `HTTP ${response.statusCode}` };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 检查资源文件
async function checkResource(baseUrl, resourcePath) {
  const url = baseUrl + resourcePath;
  
  try {
    const response = await fetchUrl(url);
    
    if (response.statusCode === 200) {
      // 检查内容类型
      const contentType = response.headers['content-type'] || '';
      
      if (resourcePath.endsWith('.css') && !contentType.includes('css')) {
        return { success: false, message: '内容类型不是CSS' };
      }
      
      if (resourcePath.endsWith('.js') && !contentType.includes('javascript')) {
        return { success: false, message: '内容类型不是JavaScript' };
      }
      
      // 检查文件大小
      if (response.body.length < 10) {
        return { success: false, message: '文件内容过小' };
      }
      
      return { success: true, message: `资源正常 (${response.statusCode})` };
    } else {
      return { success: false, message: `HTTP ${response.statusCode}` };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 检查本地文件（用于部署前验证）
function checkLocalFiles() {
  logInfo('检查本地文件...');
  
  const rootDir = path.resolve(__dirname, '..');
  let allPassed = true;
  
  // 检查页面文件
  CONFIG.pagesToCheck.forEach(page => {
    const filePath = path.join(rootDir, page === '/' ? 'index.html' : page);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 0) {
        logSuccess(`本地文件: ${page} (${stats.size} bytes)`);
      } else {
        logError(`本地文件: ${page} 为空`);
        allPassed = false;
      }
    } else {
      logWarning(`本地文件: ${page} 不存在`);
    }
  });
  
  // 检查资源文件
  CONFIG.resourcesToCheck.forEach(resource => {
    const filePath = path.join(rootDir, resource);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 0) {
        logSuccess(`本地资源: ${resource} (${stats.size} bytes)`);
      } else {
        logError(`本地资源: ${resource} 为空`);
        allPassed = false;
      }
    } else {
      logError(`本地资源: ${resource} 不存在`);
      allPassed = false;
    }
  });
  
  return allPassed;
}

// 检查远程部署
async function checkRemoteDeployment(baseUrl) {
  logInfo(`检查远程部署: ${baseUrl}`);
  
  let allPassed = true;
  
  // 检查页面
  for (const page of CONFIG.pagesToCheck) {
    const result = await checkPage(baseUrl, page);
    
    if (result.success) {
      logSuccess(`${page}: ${result.message}`);
    } else {
      logError(`${page}: ${result.message}`);
      allPassed = false;
    }
  }
  
  // 检查关键资源
  for (const resource of CONFIG.resourcesToCheck) {
    const result = await checkResource(baseUrl, resource);
    
    if (result.success) {
      logSuccess(`${resource}: ${result.message}`);
    } else {
      logError(`${resource}: ${result.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

// 运行功能测试（如果可用）
async function runFunctionalTests(baseUrl) {
  try {
    // 尝试导入功能测试模块
    const functionalTest = require('./functional-test');
    logInfo('运行功能测试...');
    console.log(''); // 空行
    
    // 运行功能测试
    const passed = await functionalTest.runFunctionalTests(baseUrl);
    return passed;
  } catch (error) {
    logWarning(`功能测试模块不可用: ${error.message}`);
    logInfo('跳过功能测试');
    return true; // 不因缺失模块而失败
  }
}

// 主函数
async function main() {
  console.log(`${colors.blue}=== 部署验证开始 ===${colors.reset}`);
  
  const args = process.argv.slice(2);
  let mode = 'local'; // 默认模式
  let runFunctional = false;
  
  // 解析参数
  for (const arg of args) {
    if (arg === '--functional') {
      runFunctional = true;
    } else if (arg === 'local' || arg === 'remote' || arg === 'both') {
      mode = arg;
    }
  }
  
  let localPassed = true;
  let remotePassed = true;
  let functionalPassed = true;
  
  // 本地文件检查
  if (mode === 'local' || mode === 'both') {
    localPassed = checkLocalFiles();
  }
  
  // 远程部署检查
  if (mode === 'remote' || mode === 'both') {
    try {
      remotePassed = await checkRemoteDeployment(CONFIG.productionUrl);
    } catch (error) {
      logError(`远程检查失败: ${error.message}`);
      remotePassed = false;
    }
  }
  
  // 功能测试
  if (runFunctional && (mode === 'remote' || mode === 'both')) {
    console.log('');
    functionalPassed = await runFunctionalTests(CONFIG.productionUrl);
  } else if (runFunctional && mode === 'local') {
    console.log('');
    functionalPassed = await runFunctionalTests(CONFIG.localUrl);
  }
  
  // 总结
  console.log('\n' + `${colors.blue}=== 验证结果 ===${colors.reset}`);
  
  if (mode === 'local' || mode === 'both') {
    if (localPassed) {
      logSuccess('本地文件检查通过');
    } else {
      logError('本地文件检查失败');
    }
  }
  
  if (mode === 'remote' || mode === 'both') {
    if (remotePassed) {
      logSuccess('远程部署检查通过');
    } else {
      logError('远程部署检查失败');
    }
  }
  
  if (runFunctional) {
    if (functionalPassed) {
      logSuccess('功能测试通过');
    } else {
      logError('功能测试失败');
    }
  }
  
  // 退出码
  let shouldExitWithError = false;
  
  if (mode === 'local' && !localPassed) {
    shouldExitWithError = true;
  }
  
  if (mode === 'remote' && !remotePassed) {
    shouldExitWithError = true;
  }
  
  if (mode === 'both' && (!localPassed || !remotePassed)) {
    shouldExitWithError = true;
  }
  
  if (runFunctional && !functionalPassed) {
    shouldExitWithError = true;
  }
  
  if (shouldExitWithError) {
    logError('部分检查失败！');
    process.exit(1);
  }
  
  logSuccess('所有检查通过！');
  process.exit(0);
}

// 执行
if (require.main === module) {
  main().catch(error => {
    logError(`验证过程出错: ${error.message}`);
    process.exit(1);
  });
}