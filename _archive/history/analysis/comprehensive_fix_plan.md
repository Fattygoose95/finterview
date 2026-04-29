# 全面整改计划

## 用户要求
1. **删掉所有具体答案（detailed answers）**
2. **删掉具体答案的板块（UI部分）**
3. **完善所有简化答案（concise answers）**

## 当前状态分析
- **总题目数**: 668题
- **Risk Management**: 100题 - 简洁答案已修复（具体提示）
- **其他类别**: 568题 - 大部分简洁答案需要修复
- **详细答案**: 全部指向Finance Bro提示

## 整改策略

### 第一阶段：移除详细答案和相关UI
1. **从questions.js中移除所有detailed answers**
   - 移除每个题目的`answers.detailed`字段
   - 只保留`answers.concise`

2. **从industry-practice.html中移除详细答案UI**
   - 移除"Detailed Answer"按钮和切换功能
   - 移除Finance Bro提示气泡和呼吸效果
   - 简化答案显示，只显示简洁答案

3. **更新其他HTML页面**
   - 移除所有对详细答案的引用

### 第二阶段：完善所有简洁答案
1. **Risk Management**: 已基本完成，需要最终检查
2. **其他类别**: 需要全面重新生成简洁答案
   - Corporate Finance (50题)
   - FinTech (50题)
   - Family Office (50题)
   - Asset Management (100题)
   - Sales & Trading (100题)
   - Quantitative Finance (100题)
   - Investment Banking (113题)

### 第三阶段：质量保证
1. **检查所有简洁答案质量**
   - 避免泛泛模板
   - 提供具体提示
   - 基于题目内容
   - 帮助面试准备

2. **测试所有功能**
   - 简洁答案显示正常
   - 导航功能正常
   - 没有残留的详细答案相关功能

## 执行顺序
1. 立即开始：移除详细答案（questions.js + UI）
2. 并行：完善Risk Management简洁答案（最终检查）
3. 批量处理：其他类别简洁答案生成
4. 最终测试：全面验证

## 质量标准
1. **简洁答案要求**：
   - 针对具体问题，不是题型分类
   - 提供实际思考方向
   - 提及相关术语和概念
   - 帮助面试准备
   - 长度：1-3要点，50-150字

2. **禁止内容**：
   - "Provide clear definition..."
   - "Explain key concepts..."
   - "For behavioral questions..."
   - 任何泛泛框架模板

## 时间估计
- 移除详细答案：1小时
- 完善Risk答案：30分钟
- 批量生成其他答案：4-6小时
- 全面测试：1小时

总计：6-8小时