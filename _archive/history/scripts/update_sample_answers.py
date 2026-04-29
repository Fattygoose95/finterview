#!/usr/bin/env python3
"""
更新前3个Risk题目的简洁答案作为示例
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

def save_questions(filepath, questions, prefix, suffix):
    """保存修改后的题目到questions.js"""
    print(f"正在保存到: {filepath}")
    
    # 将题目转换为JSON字符串
    questions_json = json.dumps(questions, indent=2, ensure_ascii=False)
    
    # 构建完整内容
    full_content = prefix + 'const questionBank = ' + questions_json + ';' + suffix
    
    # 写入文件
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    print(f"已保存 {len(questions)} 个题目")

def update_sample_answers(questions):
    """更新前3个Risk题目的简洁答案"""
    
    # 定义要更新的题目ID和对应的简洁答案
    updates = {
        'sys_risk_1773307473011_0': {
            'title': 'Value at Risk (VaR) Calculation & Limitations - Technical Question',
            'concise_answer': '记住VaR的三个关键：计算方法（历史模拟、方差-协方差、蒙特卡洛）、置信水平与时间范围、局限性（不处理极端尾部风险）。面试时准备一个简明的定义和例子。'
        },
        'sys_risk_1773307473011_1': {
            'title': 'Stress Testing Scenarios - Behavioral Question',
            'concise_answer': '压力测试的关键：设计合理场景（历史、假设、反向）、评估影响、制定应对措施。提到如何保持更新：阅读监管文件、行业报告、参加专业会议。'
        },
        'sys_risk_1773307473011_2': {
            'title': 'Counterparty Credit Risk - Case Question',
            'concise_answer': '处理交易对手信用风险的框架：识别风险暴露、评估信用质量、设置抵押品要求、监控风险变化。面试时展示结构化的问题解决方法。'
        }
    }
    
    updated_count = 0
    
    for q in questions:
        qid = q.get('id')
        if qid in updates:
            # 确保answers结构存在
            if 'answers' not in q:
                q['answers'] = {}
            if 'concise' not in q['answers']:
                q['answers']['concise'] = {}
            
            # 更新简洁答案
            old_answer = q['answers']['concise'].get('answer', '')
            new_answer = updates[qid]['concise_answer']
            q['answers']['concise']['answer'] = new_answer
            
            print(f"更新题目 {qid}:")
            print(f"  标题: {updates[qid]['title']}")
            print(f"  旧答案: {old_answer[:80]}...")
            print(f"  新答案: {new_answer}")
            print()
            
            updated_count += 1
    
    print(f"成功更新 {updated_count} 个题目的简洁答案")
    
    # 如果没有找到所有题目，显示警告
    if updated_count < len(updates):
        found_ids = [q.get('id') for q in questions if q.get('id') in updates]
        missing_ids = set(updates.keys()) - set(found_ids)
        print(f"警告: 未找到以下题目ID: {missing_ids}")
    
    return questions

def main():
    """主函数"""
    filepath = 'questions.js'
    
    # 加载题目
    questions, prefix, suffix = load_questions(filepath)
    if questions is None:
        print("加载失败，退出")
        return
    
    # 更新示例答案
    print("\n=== 更新前3个Risk题目的简洁答案 ===")
    updated_questions = update_sample_answers(questions)
    
    # 保存修改
    print("\n=== 保存修改 ===")
    save_questions(filepath, updated_questions, prefix, suffix)
    
    print("\n=== 完成 ===")
    print("已更新前3个Risk题目的简洁答案作为示例。")
    print("现在可以打开industry-practice.html查看效果。")

if __name__ == '__main__':
    main()