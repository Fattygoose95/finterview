#!/usr/bin/env node

/**
 * 功能测试脚本 - 测试新UI核心功能
 * 检查行业选择、题目加载、筛选等功能
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
  
  // 超时时间（毫秒）
  timeout: 15000,
  
  // 测试用例
  testCases: [
    {
      name: '首页行业选择',
      path: '/',
      checks: [
        { type: 'element', selector: '.industry-grid', description: '行业网格容器' },
        { type: 'element', selector: '.industry-card', minCount: 1, description: '行业卡片' },
        { type: 'element', selector: '#searchInput', description: '搜索输入框' },
        { type: 'element', selector: '#searchButton', description: '搜索按钮' },
        { type: 'element', selector: '#industryCount', description: '行业计数' },
        { type: 'element', selector: '.main-nav', description: '导航菜单' }
      ]
    },
    {
      name: '行业题库页面',
      path: '/industry.html',
      checks: [
        { type: 'element', selector: '#industryTitle', description: '行业标题' },
        { type: 'element', selector: '#industryStats', description: '题目统计' },
        { type: 'element', selector: '.filter-panel', description: '筛选面板' },
        { type: 'element', selector: '.question-list', description: '题目列表容器' },
        { type: 'element', selector: '.question-card', minCount: 1, description: '题目卡片' },
        { type: 'element', selector: '.star-options', description: '星级筛选' },
        { type: 'element', selector: '.type-filters', description: '类型筛选' },
        { type: 'element', selector: '.difficulty-filters', description: '难度筛选' },
        { type: 'element', selector: '#clearFilters', description: '清除筛选按钮' }
      ]
    },
    {
      name: '高频题目页面',
      path: '/high-frequency-list.html',
      checks: [
        { type: 'element', selector: '.frequency-list', description: '高频列表容器' },
        { type: 'element', selector: '.frequency-item', minCount: 1, description: '高频题目项' }
      ]
    },
    {
      name: '随机练习页面',
      path: '/random-list.html',
      checks: [
        { type: 'element', selector: '.random-question', description: '随机题目容器' },
        { type: 'element', selector: '#nextQuestion', description: '下一题按钮' }
      ]
    }
  ]
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

// 简单HTML元素检查（通过正则表达式）
function checkElementInHtml(html, selector, minCount = 1) {
  // 简单的选择器匹配逻辑
  // 对于ID选择器
  if (selector.startsWith('#')) {
    const id = selector.substring(1);
    // 查找 id="id" 或 id='id'
    const idRegex = new RegExp(`id=["']${id}["']`, 'i');
    const count = (html.match(idRegex) || []).length;
    return count >= minCount;
  }
  
  // 对于类选择器
  if (selector.startsWith('.')) {
    const className = selector.substring(1);
    // 查找 class="... className ..." 或 class='...'
    const classRegex = new RegExp(`class=["'][^"']*${className}[^"']*["']`, 'i');
    const count = (html.match(classRegex) || []).length;
    return count >= minCount;
  }
  
  // 对于标签名
  const tagRegex = new RegExp(`<${selector}[\\s>]`, 'gi');
  const count = (html.match(tagRegex) || []).length;
  return count >= minCount;
}

// 测试单个页面
async function testPage(baseUrl, testCase) {
  const url = baseUrl + testCase.path;
  
  try {
    logInfo(`测试: ${testCase.name} (${url})`);
    
    const response = await fetchUrl(url);
    
    if (response.statusCode !== 200) {
      logError(`  HTTP ${response.statusCode} - 页面不可访问`);
      return false;
    }
    
    const html = response.body;
    let allPassed = true;
    
    // 执行所有检查
    for (const check of testCase.checks) {
      const passed = checkElementInHtml(html, check.selector, check.minCount || 1);
      
      if (passed) {
        logSuccess(`  ${check.description}: 存在`);
      } else {
        logError(`  ${check.description}: 未找到元素 "${check.selector}"`);
        allPassed = false;
      }
    }
    
    // 检查页面是否包含基本结构
    if (!html.includes('<!DOCTYPE html>')) {
      logWarning(`  HTML缺少DOCTYPE声明`);
    }
    
    if (!html.includes('<body>') && !html.includes('<body ')) {
      logError(`  HTML缺少<body>标签`);
      allPassed = false;
    }
    
    return allPassed;
    
  } catch (error) {
    logError(`  测试失败: ${error.message}`);
    return false;
  }
}

// 测试响应式设计（简单检查）
async function testResponsive(baseUrl) {
  logInfo('测试响应式设计...');
  
  // 通过检查viewport meta标签来验证响应式支持
  try {
    const response = await fetchUrl(baseUrl + '/');
    const html = response.body;
    
    const hasViewport = html.includes('name="viewport"') && 
                       (html.includes('width=device-width') || html.includes('initial-scale=1'));
    
    if (hasViewport) {
      logSuccess('  Viewport meta标签配置正确');
    } else {
      logWarning('  Viewport meta标签可能缺失或配置不正确');
    }
    
    // 检查是否使用了响应式CSS类（如container, grid等）
    const hasResponsiveClasses = html.includes('container') || 
                                html.includes('grid-cols') ||
                                html.includes('md:') ||
                                html.includes('lg:');
    
    if (hasResponsiveClasses) {
      logSuccess('  检测到响应式CSS类');
    } else {
      logWarning('  未检测到明显的响应式CSS类');
    }
    
    return hasViewport;
    
  } catch (error) {
    logError(`  响应式测试失败: ${error.message}`);
    return false;
  }
}

// 测试导航链接
async function testNavigation(baseUrl) {
  logInfo('测试导航链接...');
  
  // 要测试的导航链接
  const navLinks = [
    { path: '/', expectedTitle: 'finterview' },
    { path: '/industry.html', expectedTitle: '题库' },
    { path: '/high-frequency-list.html', expectedTitle: '高频' },
    { path: '/random-list.html', expectedTitle: '随机' }
  ];
  
  let allPassed = true;
  
  for (const link of navLinks) {
    try {
      const response = await fetchUrl(baseUrl + link.path);
      
      if (response.statusCode === 200) {
        // 检查标题是否包含预期关键词
        const hasTitle = response.body.includes('<title>') && 
                        response.body.toLowerCase().includes(link.expectedTitle.toLowerCase());
        
        if (hasTitle) {
          logSuccess(`  ${link.path}: 可访问且标题正确`);
        } else {
          logWarning(`  ${link.path}: 可访问但标题可能不正确`);
        }
      } else {
        logError(`  ${link.path}: HTTP ${response.statusCode}`);
        allPassed = false;
      }
    } catch (error) {
      logError(`  ${link.path}: ${error.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

// 测试加载性能（简单版本）
async function testPerformance(baseUrl) {
  logInfo('测试页面加载性能...');
  
  const testPaths = ['/', '/industry.html'];
  let allPassed = true;
  
  for (const path of testPaths) {
    try {
      const startTime = Date.now();
      const response = await fetchUrl(baseUrl + path);
      const endTime = Date.now();
      
      const loadTime = endTime - startTime;
      
      if (response.statusCode === 200) {
        if (loadTime < 3000) {
          logSuccess(`  ${path}: 加载时间 ${loadTime}ms (良好)`);
        } else if (loadTime < 5000) {
          logWarning(`  ${path}: 加载时间 ${loadTime}ms (较慢)`);
        } else {
          logError(`  ${path}: 加载时间 ${loadTime}ms (太慢)`);
          allPassed = false;
        }
        
        // 检查页面大小
        const pageSize = Buffer.byteLength(response.body, 'utf8');
        if (pageSize < 500000) { // 小于500KB
          logSuccess(`  ${path}: 页面大小 ${(pageSize / 1024).toFixed(2)}KB (合理)`);
        } else {
          logWarning(`  ${path}: 页面大小 ${(pageSize / 1024).toFixed(2)}KB (较大)`);
        }
      } else {
        logError(`  ${path}: HTTP ${response.statusCode}`);
        allPassed = false;
      }
    } catch (error) {
      logError(`  ${path}: ${error.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

// 主测试函数
async function runFunctionalTests(baseUrl) {
  console.log(`${colors.blue}=== 功能测试开始 ===${colors.reset}`);
  console.log(`测试地址: ${baseUrl}`);
  
  let allTestsPassed = true;
  
  // 运行所有页面测试
  for (const testCase of CONFIG.testCases) {
    const passed = await testPage(baseUrl, testCase);
    if (!passed) {
      allTestsPassed = false;
    }
    console.log(); // 空行分隔
  }
  
  // 测试响应式设计
  const responsivePassed = await testResponsive(baseUrl);
  if (!responsivePassed) {
    allTestsPassed = false;
  }
  
  console.log(); // 空行分隔
  
  // 测试导航链接
  const navigationPassed = await testNavigation(baseUrl);
  if (!navigationPassed) {
    allTestsPassed = false;
  }
  
  console.log(); // 空行分隔
  
  // 测试性能
  const performancePassed = await testPerformance(baseUrl);
  if (!performancePassed) {
    allTestsPassed = false;
  }
  
  console.log(); // 空行分隔
  
  // 总结
  console.log(`${colors.blue}=== 功能测试结果 ===${colors.reset}`);
  
  if (allTestsPassed) {
    logSuccess('所有功能测试通过！');
  } else {
    logError('部分功能测试失败，请检查上述问题');
  }
  
  return allTestsPassed;
}

// 命令行接口
async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'local'; // 'local', 'remote'
  
  const baseUrl = mode === 'remote' ? CONFIG.productionUrl : CONFIG.localUrl;
  
  try {
    const passed = await runFunctionalTests(baseUrl);
    process.exit(passed ? 0 : 1);
  } catch (error) {
    logError(`测试执行出错: ${error.message}`);
    process.exit(1);
  }
}

// 导出函数供其他脚本使用
if (require.main === module) {
  main();
} else {
  module.exports = {
    runFunctionalTests,
    testPage,
    testResponsive,
    testNavigation,
    testPerformance
  };
}