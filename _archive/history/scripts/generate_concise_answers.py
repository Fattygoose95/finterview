#!/usr/bin/env python3
"""
为Risk Management题目生成简洁答案
读取questions.js，为标记为【待生成】的题目生成新的简洁答案
"""

import json
import re
import sys

def load_questions(filepath):
    """从questions.js加载题目数据"""
    print(f"正在加载题目文件: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取questionBank数组
    match = re.search(r'const questionBank = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("错误: 找不到questionBank数组")
        return None, None, None
    
    array_content = match.group(1)
    
    # 清理JavaScript内容以便解析JSON
    array_content = re.sub(r'//.*', '', array_content)
    array_content = re.sub(r'/\*.*?\*/', '', array_content, flags=re.DOTALL)
    array_content = re.sub(r',\s*}', '}', array_content)
    array_content = re.sub(r',\s*]', ']', array_content)
    
    try:
        questions = json.loads(f'[{array_content}]')
        print(f"成功加载 {len(questions)} 个题目")
        return questions, content[:match.start()], content[match.end():]
    except json.JSONDecodeError as e:
        print(f"JSON解析错误: {e}")
        return None, None, None

def extract_risk_questions_needing_fix(questions):
    """提取需要修复的Risk Management题目"""
    risk_questions = []
    
    for q in questions:
        if q.get('role') == 'risk':
            concise = q.get('answers', {}).get('concise', {}).get('answer', '')
            if '【待生成】' in concise:
                risk_questions.append(q)
    
    print(f"找到 {len(risk_questions)} 个需要生成简洁答案的Risk题目")
    return risk_questions

def generate_concise_answer_template(question):
    """为题目生成简洁答案模板"""
    qid = question.get('id', '未知ID')
    title = question.get('title', '未知标题')
    question_text = question.get('question', '')
    model_answer = question.get('modelAnswer', '')
    category = question.get('category', '')
    difficulty = question.get('difficulty', '')
    
    print(f"\n=== 题目: {title} ===")
    print(f"问题: {question_text[:100]}...")
    print(f"类别: {category}, 难度: {difficulty}")
    print(f"当前简洁答案: {question.get('answers', {}).get('concise', {}).get('answer', '')[:100]}...")
    
    # 基于题目内容生成简洁答案的提示
    # 这里只是示例模板，实际需要AI生成
    template = f"【AI待生成】{title}的简洁提示：基于问题'{question_text[:50]}...'"
    
    return template

def main():
    """主函数"""
    filepath = 'questions.js'
    
    # 加载题目
    questions, prefix, suffix = load_questions(filepath)
    if questions is None:
        print("加载失败，退出")
        return
    
    # 提取需要修复的Risk题目
    risk_to_fix = extract_risk_questions_needing_fix(questions)
    
    if not risk_to_fix:
        print("没有找到需要修复的Risk题目")
        return
    
    # 显示前5个需要修复的题目
    print("\n=== 需要生成简洁答案的题目 (前5个) ===")
    for i, q in enumerate(risk_to_fix[:5]):
        print(f"{i+1}. ID{q.get('id')}: {q.get('title')}")
        print(f"   问题: {q.get('question', '')[:80]}...")
        print(f"   当前答案: {q.get('answers', {}).get('concise', {}).get('answer', '')[:80]}...")
        print()
    
    # 生成简洁答案的任务描述
    print("\n=== 生成简洁答案的任务 ===")
    print(f"需要为 {len(risk_to_fix)} 个Risk Management题目生成简洁答案。")
    print("\n简洁答案要求:")
    print("1. 提示性，不是完整答案")
    print("2. 帮助回忆关键点")
    print("3. 1-3个要点，50-150字")
    print("4. 使用中文（用户中文母语）")
    print("5. 基于题目内容和modelAnswer")
    print("\n示例:")
    print("  题目: 'What are the primary components of market risk?'")
    print("  modelAnswer: 'Market risk includes: 1) Equity risk, 2) Interest rate risk, 3) Currency risk, 4) Commodity risk, 5) Volatility risk.'")
    print("  简洁答案: '记住五个主要类别：股票风险、利率风险、汇率风险、商品风险和波动性风险。这是市场风险的基础框架。'")
    
    # 创建批量处理的数据
    batch_data = []
    for q in risk_to_fix[:10]:  # 先处理前10个
        item = {
            'id': q.get('id'),
            'title': q.get('title'),
            'question': q.get('question', ''),
            'modelAnswer': q.get('modelAnswer', ''),
            'category': q.get('category', ''),
            'difficulty': q.get('difficulty', ''),
            'currentConcise': q.get('answers', {}).get('concise', {}).get('answer', '')
        }
        batch_data.append(item)
    
    print(f"\n创建了 {len(batch_data)} 个题目的批量处理数据")
    
    # 保存为JSON文件，供AI处理
    output_file = 'risk_questions_for_ai.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(batch_data, f, indent=2, ensure_ascii=False)
    
    print(f"已保存到 {output_file}")
    print("\n下一步: 使用AI为这些题目生成简洁答案")

if __name__ == '__main__':
    main()