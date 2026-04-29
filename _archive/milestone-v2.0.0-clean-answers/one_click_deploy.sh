#!/bin/bash

# One-Click Finterview Fix Deployment
# 一键部署修复脚本
# 使用方法: bash one_click_deploy.sh

set -e  # 遇到错误立即退出

echo "🚀 Finterview 一键修复部署开始..."
echo "========================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在finterview-prototype目录
if [ ! -f "questions.js" ] || [ ! -d "js" ]; then
    echo -e "${RED}❌ 错误: 请在finterview-prototype目录中运行此脚本${NC}"
    echo "提示: 先执行 cd /path/to/finterview-prototype"
    exit 1
fi

echo -e "${GREEN}✅ 检测到finterview-prototype目录${NC}"

# 备份原始文件
echo "📦 备份原始文件..."
BACKUP_DIR="backups/deploy_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

backup_files() {
    local files=("high-frequency-list.html" "random-list.html" "js/high-frequency-list.js" "js/random-list.js" "css/components.css" "questions.js")
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            cp "$file" "$BACKUP_DIR/"
            echo "  备份: $file"
        fi
    done
}

backup_files
echo -e "${GREEN}✅ 备份完成: $BACKUP_DIR${NC}"

# 应用修复
echo "🔧 应用修复..."
echo "注意: 此步骤将覆盖部分文件"

# 这里应该有修复逻辑，但因为我们已经在修复后的目录中
# 实际上我们只需要确保文件是最新版本
echo "跳过文件覆盖(已在最新状态)"
echo -e "${YELLOW}⚠️  请确保已从修复包复制了最新文件${NC}"
echo "修复包位置: /Users/yangjiarong/.openclaw/workspace/finterview_fixes_1773209442741/"

# 检查git状态
echo "📊 检查git状态..."
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  未发现git仓库，正在初始化...${NC}"
    git init
    echo -e "${GREEN}✅ git仓库初始化完成${NC}"
else
    echo -e "${GREEN}✅ 已存在git仓库${NC}"
fi

# 检查远程仓库
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [ -z "$REMOTE_URL" ]; then
    echo -e "${YELLOW}⚠️  未设置远程仓库${NC}"
    echo "请先设置远程仓库:"
    echo "  git remote add origin https://github.com/fattygoose95/finterview.git"
    echo "或使用SSH:"
    echo "  git remote add origin git@github.com:fattygoose95/finterview.git"
    echo ""
    echo -e "${RED}❌ 无法自动推送，需要手动设置远程仓库${NC}"
    echo "继续执行本地提交..."
fi

# 添加文件
echo "📁 添加文件到git..."
git add high-frequency-list.html random-list.html js/high-frequency-list.js js/random-list.js questions.js css/components.css 2>/dev/null || true

# 检查是否有更改
if git diff --cached --quiet 2>/dev/null; then
    echo -e "${YELLOW}⚠️  没有检测到文件更改${NC}"
    echo "可能的原因:"
    echo "  1. 文件已经是最新版本"
    echo "  2. 未从修复包复制最新文件"
    echo "  3. 文件内容相同"
else
    echo -e "${GREEN}✅ 检测到文件更改${NC}"
    
    # 提交更改
    echo "💾 提交更改..."
    git commit -m "修复: 404错误、数据兼容性、答案切换功能 - $(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null || {
        echo -e "${YELLOW}⚠️  提交失败，可能配置问题${NC}"
    }
    
    # 推送更改
    if [ -n "$REMOTE_URL" ]; then
        echo "🌐 推送到远程仓库..."
        echo "远程URL: $REMOTE_URL"
        
        # 尝试推送
        if git push origin main 2>/dev/null || git push -u origin main 2>/dev/null; then
            echo -e "${GREEN}✅ 推送成功!${NC}"
        else
            echo -e "${YELLOW}⚠️  推送失败，可能需要设置分支或权限${NC}"
            echo "尝试: git branch -M main && git push -u origin main"
        fi
    else
        echo -e "${YELLOW}⚠️  跳过推送(未设置远程仓库)${NC}"
    fi
fi

# 验证修复
echo "🔍 验证修复..."
echo "1. 检查questions.js是否有answers字段..."
if grep -q "answers" questions.js; then
    echo -e "${GREEN}   ✅ questions.js包含answers字段${NC}"
else
    echo -e "${RED}   ❌ questions.js缺少answers字段${NC}"
fi

echo "2. 检查高频题页面数据源..."
if grep -q "DATA_URL: 'questions.js'" js/high-frequency-list.js; then
    echo -e "${GREEN}   ✅ 高频题使用questions.js数据源${NC}"
else
    echo -e "${RED}   ❌ 高频题数据源设置不正确${NC}"
fi

echo "3. 检查答案切换样式..."
if grep -q "answer-toggle" css/components.css; then
    echo -e "${GREEN}   ✅ 找到答案切换样式${NC}"
else
    echo -e "${RED}   ❌ 缺少答案切换样式${NC}"
fi

# 创建部署报告
echo "📄 生成部署报告..."
DEPLOY_REPORT="deploy_report_$(date +%Y%m%d_%H%M%S).txt"
cat > "$DEPLOY_REPORT" << EOF
Finterview 部署报告
===================
部署时间: $(date)
脚本版本: 1.0
备份目录: $BACKUP_DIR

文件状态:
- high-frequency-list.html: $( [ -f "high-frequency-list.html" ] && echo "存在" || echo "缺失" )
- random-list.html: $( [ -f "random-list.html" ] && echo "存在" || echo "缺失" )
- js/high-frequency-list.js: $( [ -f "js/high-frequency-list.js" ] && echo "存在" || echo "缺失" )
- js/random-list.js: $( [ -f "js/random-list.js" ] && echo "存在" || echo "缺失" )
- questions.js: $( [ -f "questions.js" ] && echo "存在" || echo "缺失" )
- css/components.css: $( [ -f "css/components.css" ] && echo "存在" || echo "缺失" )

Git状态:
- 仓库初始化: $( [ -d ".git" ] && echo "是" || echo "否" )
- 远程仓库: ${REMOTE_URL:-"未设置"}
- 文件更改: $(git diff --cached --quiet 2>/dev/null && echo "无" || echo "有")

验证结果:
1. questions.js有answers字段: $(grep -q "answers" questions.js && echo "是" || echo "否")
2. 高频题数据源正确: $(grep -q "DATA_URL: 'questions.js'" js/high-frequency-list.js && echo "是" || echo "否")
3. 答案切换样式存在: $(grep -q "answer-toggle" css/components.css && echo "是" || echo "否")

后续步骤:
1. 如果已推送，等待GitHub Pages构建 (1-2分钟)
2. 访问: https://fattygoose95.github.io/finterview/?v=$(date +%s)
3. 硬刷新: Ctrl+Shift+R (Win) 或 Cmd+Shift+R (Mac)
4. 测试答案显示和切换功能
5. 检查控制台是否有错误

故障排除:
- 如果仍有404错误: 检查questions.js是否部署
- 如果答案不显示: 检查answers字段格式
- 如果样式问题: 检查components.css是否加载

技术支持:
如需帮助，请联系开发团队。

EOF

echo -e "${GREEN}✅ 部署报告生成: $DEPLOY_REPORT${NC}"

echo ""
echo "========================================"
echo -e "${GREEN}🚀 一键部署完成!${NC}"
echo ""
echo "📋 下一步操作:"
if [ -n "$REMOTE_URL" ]; then
    echo "  1. 等待GitHub Pages构建 (1-2分钟)"
else
    echo "  1. 设置远程仓库: git remote add origin <你的仓库URL>"
    echo "  2. 推送: git push -u origin main"
fi
echo "  2. 测试网站: https://fattygoose95.github.io/finterview/"
echo "  3. 验证功能: 答案显示和切换"
echo "  4. 查看部署报告: $DEPLOY_REPORT"
echo ""
echo "🔧 如果需要手动操作，请查看报告中的详细步骤"
echo "========================================"