#!/usr/bin/env node

/**
 * 自动集成new-ui到根目录
 * 将new-ui/templates/下的HTML文件、css/、js/复制到对应位置
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  newUiPath: path.resolve(__dirname, '../../Desktop/FinInterviewAI/new-ui'),
  targetPath: path.resolve(__dirname, '..'),
  backupDir: 'backup',
  
  // 映射规则：源文件 -> 目标文件
  copyRules: [
    // HTML文件
    { src: 'templates/index.html', dest: 'index.html' },
    { src: 'templates/industry.html', dest: 'industry.html' },
    
    // CSS目录
    { src: 'css/variables.css', dest: 'css/variables.css' },
    { src: 'css/layout.css', dest: 'css/layout.css' },
    { src: 'css/components.css', dest: 'css/components.css' },
    
    // JS目录
    { src: 'js/data-loader.js', dest: 'js/data-loader.js' },
    { src: 'js/main.js', dest: 'js/main.js' },
    { src: 'js/navigation.js', dest: 'js/navigation.js' },
    { src: 'js/filters.js', dest: 'js/filters.js' }
  ],
  
  // 需要调整路径引用的文件
  adjustPathFiles: [
    'index.html',
    'industry.html'
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

// 检查new-ui目录是否存在
function checkNewUiPath() {
  if (!fs.existsSync(CONFIG.newUiPath)) {
    logError(`new-ui目录不存在: ${CONFIG.newUiPath}`);
    logInfo('请确保new-ui目录位于 ~/Desktop/FinInterviewAI/new-ui');
    return false;
  }
  
  logSuccess(`找到new-ui目录: ${CONFIG.newUiPath}`);
  return true;
}

// 创建备份
function createBackup() {
  const backupPath = path.join(CONFIG.targetPath, CONFIG.backupDir);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const finalBackupPath = `${backupPath}_${timestamp}`;
  
  if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath, { recursive: true });
  }
  
  logInfo(`创建备份到: ${finalBackupPath}`);
  
  // 备份重要文件
  const filesToBackup = [
    'index.html',
    'industry.html',
    'css/',
    'js/'
  ];
  
  filesToBackup.forEach(file => {
    const source = path.join(CONFIG.targetPath, file);
    if (fs.existsSync(source)) {
      const dest = path.join(finalBackupPath, file);
      const destDir = path.dirname(dest);
      
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      if (fs.statSync(source).isDirectory()) {
        copyDir(source, dest);
      } else {
        fs.copyFileSync(source, dest);
      }
      
      logSuccess(`已备份: ${file}`);
    }
  });
  
  return finalBackupPath;
}

// 复制目录
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 执行复制操作
function performCopy() {
  logInfo('开始复制文件...');
  
  CONFIG.copyRules.forEach(rule => {
    const srcFile = path.join(CONFIG.newUiPath, rule.src);
    const destFile = path.join(CONFIG.targetPath, rule.dest);
    const destDir = path.dirname(destFile);
    
    // 确保目标目录存在
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    if (!fs.existsSync(srcFile)) {
      logWarning(`源文件不存在: ${rule.src}`);
      return;
    }
    
    fs.copyFileSync(srcFile, destFile);
    logSuccess(`复制: ${rule.src} -> ${rule.dest}`);
  });
}

// 调整HTML文件中的路径引用
function adjustPathReferences() {
  logInfo('调整HTML文件中的路径引用...');
  
  CONFIG.adjustPathFiles.forEach(fileName => {
    const filePath = path.join(CONFIG.targetPath, fileName);
    
    if (!fs.existsSync(filePath)) {
      logWarning(`文件不存在: ${fileName}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 替换CSS引用: ../css/ -> css/
    content = content.replace(/href="\.\.\/css\/([^"]+)"/g, 'href="css/$1"');
    
    // 替换JS引用: ../js/ -> js/
    content = content.replace(/src="\.\.\/js\/([^"]+)"/g, 'src="js/$1"');
    
    // 替换questions.js引用: ../../questions.js -> questions.js
    content = content.replace(/src="\.\.\/\.\.\/questions\.js"/g, 'src="questions.js"');
    
    fs.writeFileSync(filePath, content, 'utf8');
    logSuccess(`调整路径: ${fileName}`);
  });
}

// 检查复制后的文件完整性
function verifyIntegration() {
  logInfo('验证集成结果...');
  
  const requiredFiles = [
    'index.html',
    'industry.html',
    'css/variables.css',
    'css/layout.css',
    'css/components.css',
    'js/data-loader.js',
    'js/main.js',
    'js/navigation.js',
    'questions.js'
  ];
  
  let allExist = true;
  
  requiredFiles.forEach(file => {
    const filePath = path.join(CONFIG.targetPath, file);
    if (fs.existsSync(filePath)) {
      logSuccess(`文件存在: ${file}`);
    } else {
      logError(`文件缺失: ${file}`);
      allExist = false;
    }
  });
  
  return allExist;
}

// 主函数
async function main() {
  console.log(`${colors.blue}=== 开始集成new-ui到根目录 ===${colors.reset}`);
  
  // 检查new-ui目录
  if (!checkNewUiPath()) {
    process.exit(1);
  }
  
  // 创建备份
  const backupPath = createBackup();
  logInfo(`备份创建完成: ${backupPath}`);
  
  // 执行复制
  performCopy();
  
  // 调整路径引用
  adjustPathReferences();
  
  // 验证集成
  const verified = verifyIntegration();
  
  console.log('\n' + `${colors.blue}=== 集成完成 ===${colors.reset}`);
  
  if (verified) {
    logSuccess('new-ui集成成功！');
    logInfo('请运行部署检查脚本: node scripts/deploy-check.js');
  } else {
    logWarning('集成完成，但部分文件可能缺失');
    logInfo('建议手动检查缺失文件');
  }
}

// 执行
if (require.main === module) {
  main().catch(error => {
    logError(`集成过程出错: ${error.message}`);
    process.exit(1);
  });
}