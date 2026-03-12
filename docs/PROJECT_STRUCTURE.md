# finterview 项目结构

本项目是一个静态网站，用于金融面试准备平台。以下为项目文件结构说明。

## 根目录文件

| 文件 | 说明 |
|------|------|
| `index.html` | 主页面 - 新UI行业选择界面 |
| `industry.html` | 行业题库页面 - 题目加载和筛选功能 |
| `high-frequency-list.html` | 高频题目列表页面 |
| `random-list.html` | 随机练习页面 |
| `mode-selection.html` | 模式选择页面（旧UI） |
| `industry-selection.html` | 行业选择页面（旧UI） |
| `questions.js` | 题目数据文件，包含所有行业和题目 |
| `scoring-engine.js` | 评分引擎，处理题目评分逻辑 |
| `README.md` | 项目说明文档 |
| `DEVELOPMENT.md` | 开发指南 |
| `DEPLOYMENT_REPORT.md` | 部署报告 |
| `NEW_UI_INTEGRATION_REPORT.md` | 新UI集成报告 |
| `netlify.toml` | Netlify部署配置文件 |
| `.gitignore` | Git忽略文件配置 |
| `app_backup_original.js` | 原始应用程序逻辑备份 |
| `style_backup_original.css` | 原始样式备份 |

## 目录结构

### `/css` - 样式文件
| 文件 | 说明 |
|------|------|
| `variables.css` | CSS变量定义（颜色、字体、间距等） |
| `layout.css` | 布局和响应式样式 |
| `components.css` | 组件样式（按钮、卡片、表单等） |
| `styles.css` | 旧UI样式（备份） |

### `/js` - JavaScript 文件
| 文件 | 说明 |
|------|------|
| `main.js` | 主应用程序逻辑 |
| `data-loader.js` | 题目数据加载器 |
| `filters.js` | 筛选功能逻辑 |
| `navigation.js` | 导航和路由处理 |
| `api-mock.js` | 模拟API响应 |
| `high-frequency-list.js` | 高频题目列表逻辑 |
| `random-list.js` | 随机练习逻辑 |

### `/scripts` - 工具脚本
| 文件 | 说明 |
|------|------|
| `verify-deployment.js` | 部署验证脚本（检查可访问性、资源、功能） |
| `functional-test.js` | 功能测试脚本（测试新UI核心功能） |
| `deploy-check.js` | 部署前检查脚本（HTML语法、资源引用） |
| `integrate-new-ui.js` | 新UI集成脚本 |

### `/backup_20260310_103729` - 备份目录
旧UI文件的完整备份，包含HTML、CSS和JS文件。

## 开发规范

### 1. 文件命名
- HTML文件：小写字母，连字符分隔（如 `industry-selection.html`）
- JS文件：小写字母，连字符分隔（如 `data-loader.js`）
- CSS文件：描述性名称，反映用途

### 2. 代码组织
- **HTML**：使用语义化标签，添加适当的ARIA属性
- **CSS**：采用BEM命名约定，使用CSS变量保持一致性
- **JavaScript**：使用模块化模式，避免全局污染

### 3. 新UI架构
新UI采用以下技术栈：
- 原生JavaScript（无框架）
- 响应式CSS Grid/Flexbox布局
- 移动优先设计
- 客户端数据过滤和搜索

### 4. 部署流程
1. 运行 `node scripts/deploy-check.js` 进行部署前检查
2. 提交代码到Git仓库
3. Netlify自动构建和部署（基于 `netlify.toml` 配置）
4. 运行 `node scripts/verify-deployment.js remote --functional` 验证部署

### 5. 测试策略
- **静态检查**：部署前检查HTML、CSS、JS文件
- **功能测试**：验证核心功能（行业选择、题目加载、筛选）
- **性能测试**：检查页面加载时间和资源大小
- **兼容性测试**：确保主流浏览器支持

## 项目演进

### 旧UI → 新UI
项目已从旧UI迁移到新UI，主要改进包括：
1. 现代化设计语言
2. 改进的行业选择界面（卡片式布局）
3. 增强的筛选功能（星级、类型、难度）
4. 响应式移动端体验
5. 性能优化（减少不必要的重绘）

### 备份策略
保留旧UI文件备份，以便需要时回滚或参考。

## 维护说明

- 定期更新 `questions.js` 中的题目数据
- 部署前运行验证脚本
- 添加新功能时更新相关测试脚本
- 保持CSS变量的一致性以方便主题定制

---

*最后更新: 2026-03-10*