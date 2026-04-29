# 项目清理计划

## 问题分析
用户报告："好像确实已经改了，但我看了一下文件夹，有太多乱七八糟的文件了，我觉得github读取的时候肯定出问题了导致网站没有"

可能的问题：
1. GitHub Pages可能因为文件过多而加载缓慢或出错
2. 某些不必要的文件可能干扰网站的正常加载
3. 备份文件和测试文件增加了项目体积

## 当前文件统计
项目目录包含大量文件，包括：
- 68个Python脚本文件
- 42个HTML文件（许多是测试/备份文件）
- 28个JSON文件
- 多个备份目录和生成文件

## 清理策略

### 核心文件（必须保留）
1. **主HTML文件**：
   - `index.html` - 主页
   - `industry-practice.html` - 练习页面 ✓
   - `finance-bro.html` - Finance Bro页面 ✓
   - `profile.html` - 个人资料页面
   - `industry-filter.html` - 行业筛选页面

2. **样式文件**：
   - `css/`目录所有文件

3. **JavaScript文件**：
   - `js/`目录中的核心文件：
     - `data-loader.js`
     - `main.js`（如果存在）
   - `questions.js` - 核心题目数据 ✓
   - `scoring-engine.js` - 评分引擎

4. **配置文件**：
   - `netlify.toml` - 部署配置
   - `.gitignore` - Git忽略规则
   - `README.md` - 项目说明

5. **文档**：
   - `docs/`目录（如果有用）

### 可清理文件（建议移除或归档）

#### 1. Python脚本文件（全部）
- 所有`.py`文件（分析、修复、生成脚本）
- 这些是开发工具，不是运行必需

#### 2. 备份文件（全部）
- 所有`.backup`文件
- 所有`.bak`文件
- `backups/`目录

#### 3. 测试文件
- 所有`test-*.html`文件
- `validate-*.html`
- `diagnostic*.html`
- `debug-*.js`

#### 4. 生成文件
- `generated/`目录
- 所有`*_generation_batches.json`文件
- `unified_questions.json`（如果questions.js是主数据源）

#### 5. 旧的/重复的HTML文件
- `index-old-design.html.backup`
- `index-unified.html`
- 各种备份版本

#### 6. 临时/分析文件
- `PROJECT_STATUS.md`
- `VALIDATION_GUIDE.md`
- 各种分析报告

## 清理步骤

### 阶段1：安全归档（不删除）
1. 创建`archive/`目录
2. 将可清理文件移动到`archive/`
3. 验证网站功能正常

### 阶段2：Git清理
1. 更新`.gitignore`以忽略更多文件类型
2. 从Git历史中移除大文件（如果需要）
3. 确保GitHub Pages配置正确

### 阶段3：最终清理
1. 确认归档后网站正常运行
2. 可选：删除`archive/`目录或保留为备份

## 预期效果
1. 项目文件数量减少70-80%
2. 项目结构清晰，便于维护
3. GitHub Pages加载更可靠
4. 减少潜在的文件冲突

## 风险与注意事项
1. **备份重要文件**：确保核心文件不受影响
2. **测试功能**：清理后全面测试网站功能
3. **版本控制**：确保Git操作正确
4. **用户确认**：清理前获得用户确认