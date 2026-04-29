# finterview 开发指南

## 项目结构

```
finterview-prototype/
├── index.html              # 新首页 (来自 new-ui/templates/index.html)
├── industry.html           # 行业页面 (来自 new-ui/templates/industry.html)
├── high-frequency-list.html # 高频题模式页面
├── random-list.html        # 随机模式页面
├── mode-selection.html     # 模式选择页面
├── industry-selection.html # 行业选择页面
├── questions.js            # 题目数据 (79题)
├── scoring-engine.js       # 评分引擎
├── netlify.toml           # Netlify 部署配置
├── .gitignore             # Git忽略文件
├── css/                   # 样式文件
│   ├── variables.css     # CSS变量系统
│   ├── layout.css        # 基础布局样式
│   ├── components.css    # 组件样式
│   └── styles.css        # 旧样式 (兼容性保留)
├── js/                    # JavaScript文件
│   ├── data-loader.js    # 数据加载器 (新UI)
│   ├── main.js           # 主逻辑 (新UI)
│   ├── navigation.js     # 导航逻辑 (新UI)
│   ├── filters.js        # 筛选逻辑 (新UI)
│   ├── api-mock.js       # API模拟 (旧功能)
│   ├── high-frequency-list.js # 高频题模式逻辑
│   └── random-list.js    # 随机模式逻辑
└── scripts/              # 自动化脚本
    ├── deploy-check.js   # 部署前检查
    ├── integrate-new-ui.js # 集成new-ui到根目录
    └── verify-deployment.js # 部署后验证
```

## 开发流程

### 1. 开发新功能
- 在 `new-ui/` 目录或对应功能目录中开发
- 遵循现有代码结构和命名规范
- 使用CSS变量系统 (`variables.css`)

### 2. 本地测试
```bash
# 启动本地服务器
python3 -m http.server 8080

# 或者使用Node.js的http-server
npx http-server .

# 运行部署前检查
node scripts/deploy-check.js
```

### 3. 集成测试
```bash
# 将new-ui更改集成到根目录
node scripts/integrate-new-ui.js

# 检查集成结果
node scripts/verify-deployment.js local
```

### 4. 提交推送
```bash
# 添加更改
git add .

# 提交
git commit -m "描述更改内容"

# 推送到远程仓库
git push origin main
```

### 5. 自动部署
- Git推送后，Netlify会自动触发构建
- 构建配置在 `netlify.toml` 中定义
- 构建成功后，网站会自动更新

### 6. 部署验证
```bash
# 检查远程部署状态
node scripts/verify-deployment.js remote
```

## 自动化脚本

### deploy-check.js
部署前检查脚本，确保代码质量：
```bash
node scripts/deploy-check.js
```

检查项目：
- HTML文件结构
- CSS/JS文件引用
- JavaScript语法
- 敏感信息泄露
- Netlify配置

### integrate-new-ui.js
自动将new-ui目录集成到根目录：
```bash
node scripts/integrate-new-ui.js
```

功能：
1. 创建备份
2. 复制文件
3. 调整路径引用
4. 验证集成结果

### verify-deployment.js
验证部署是否成功：
```bash
# 本地验证
node scripts/verify-deployment.js local

# 远程验证（需要设置DEPLOYMENT_URL环境变量）
DEPLOYMENT_URL=https://your-site.netlify.app node scripts/verify-deployment.js remote

# 同时验证
node scripts/verify-deployment.js both
```

## Netlify 部署配置

### 配置说明
- `publish = "."` - 发布根目录
- `command = ""` - 静态网站，无需构建命令
- 重定向规则：所有请求重定向到index.html
- 安全头设置：X-Frame-Options, X-Content-Type-Options等

### 缓存配置
Netlify默认缓存静态资源。如需清除缓存：
1. 在Netlify控制台选择站点
2. 进入 "Deploys"
3. 点击 "Clear cache and deploy site"

### 环境变量
如有需要，可在Netlify控制台设置环境变量：
- `DEPLOYMENT_URL` - 用于验证脚本

## 故障排除

### 新UI未部署
1. 检查 `netlify.toml` 配置
2. 确保文件在正确位置
3. 运行 `deploy-check.js` 检查问题
4. 查看Netlify构建日志

### 部署流程繁琐
1. 使用自动化脚本简化流程
2. 遵循标准开发流程
3. 避免手动调试

### 网站更新延迟
1. 检查Git推送是否成功
2. 查看Netlify构建队列
3. 清除Netlify缓存
4. 配置自动清除缓存选项

## 扩展性

### 支持10000+题目
当前架构支持大规模题目扩展：
1. `questions.js` 采用JSON数组格式
2. 支持按行业、类型、难度筛选
3. 分页加载机制

### 添加新行业
1. 在 `questions.js` 的 `roles` 对象中添加行业定义
2. 更新 `variables.css` 中的行业颜色
3. 添加对应的题目数据

### 添加新功能
1. 在 `new-ui/` 目录中开发原型
2. 使用 `integrate-new-ui.js` 集成
3. 更新相关HTML文件引用

## 性能优化

### 前端优化
- 使用CSS变量实现主题切换
- 按需加载JavaScript模块
- 图片懒加载
- 服务端渲染（未来考虑）

### 部署优化
- Netlify CDN全球分发
- 自动压缩和缓存
- HTTP/2支持
- SSL证书自动管理

## 联系方式

如有问题，请参考：
- Netlify构建日志
- 浏览器开发者工具控制台
- 本开发指南

如需进一步帮助，请联系开发团队。