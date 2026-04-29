# 修复答案质量计划

## 问题分析
1. **简洁答案重复率高**：多个角色有60-80%的题目使用完全相同的简洁答案
2. **详细答案直接复制modelAnswer**：所有题目的`detailed`答案都是`modelAnswer`的简单复制
3. **详细分析模板化**：`detailedAnalysis`都是相同的模板
4. **答案质量低下**：很多答案只是"理解核心概念"这样的空话

## Charlie的建议
- 移除详细答案功能
- UI引导用户"还不明白？问finance bro"
- 题目里只保留简化答案
- 简化答案一定要贴合题目，起到提示的效果

## 实施策略

### 第1阶段：修复答案质量（立即开始）
1. **重新生成所有简洁答案** (668题)
   - 每个题目都有独特、贴合的提示性答案
   - 长度：1-3个要点，50-150字
   - 内容：提示关键点，帮助回忆，不是完整答案
   - 格式：使用项目符号或简短句子

2. **处理详细答案**
   - 选项A：完全移除`answers.detailed`
   - 选项B：改为简短的"需要详细解释？问Finance Bro"
   - 建议：移除，节省空间

3. **简化详细分析**
   - 移除或简化为通用的面试技巧提示
   - 或者完全移除

### 第2阶段：修改UI
1. **练习页面**：
   - 只显示简洁答案
   - 在详细答案位置添加"还不明白？问Finance Bro"按钮
   - 按钮链接到finance-bro.html

2. **Finance Bro集成**：
   - 增强现有Finance Bro AI
   - 使其能够回答具体题目相关问题

### 第3阶段：批量处理顺序
按优先级排序：
1. Risk Management (100题) - 最严重
2. Corporate Finance (50题) - 100%重复
3. FinTech (50题) - 100%重复  
4. Family Office (50题) - 100%重复
5. Asset Management (100题) - 47题重复
6. Sales & Trading (100题) - 79题重复
7. Quantitative Finance (100题) - 68题重复
8. Investment Banking (113题) - 相对较好，但需修复

总计：668题

## 技术方案

### 简洁答案生成模板
对于每个题目，生成简洁答案应包含：
1. **核心要点**：1-3个最关键的概念
2. **记忆提示**：帮助记忆的技巧或关联
3. **应用提示**：如何在实际回答中应用

示例：
- 题目："What are the primary components of market risk?"
- 当前错误答案："• Understand core concepts and principles..."
- 修复后答案："包括五个主要类别：股票风险、利率风险、汇率风险、商品风险和波动性风险。记住这个简单分类法。"

### 数据结构修改
```javascript
{
  "id": 2070,
  "role": "risk",
  "category": "market",
  "difficulty": "easy",
  "title": "Types of market risk",
  "question": "What are the primary components of market risk?",
  "modelAnswer": "Market risk includes: 1) Equity risk (stock prices), 2) Interest rate risk (yield changes), 3) Currency risk (FX rates), 4) Commodity risk (price moves), 5) Volatility risk (options).",
  "answers": {
    "concise": {
      "answer": "包括五个主要类别：股票风险、利率风险、汇率风险、商品风险和波动性风险。记住这个简单分类法。"
    }
    // 移除detailed
  },
  "detailedAnalysis": {
    // 简化为通用提示或移除
    "tip": "这是一个基础概念题，确保你能快速回忆所有五个类别。"
  }
}
```

## 实施步骤

### 立即行动：
1. 创建修复脚本
2. 先修复Risk Management 100题作为样板
3. 展示修复结果给Charlie确认
4. 按优先级批量修复其他类别