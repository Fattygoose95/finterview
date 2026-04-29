#!/usr/bin/env python3
"""
更新Risk题目的答案为英文
1. 将详细答案改为英文提示
2. 将已生成的3个简洁答案改为英文
3. 为其他待生成的简洁答案准备英文占位符
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

def update_risk_questions(questions):
    """更新Risk题目的答案"""
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    print(f"找到 {len(risk_questions)} 个Risk Management题目")
    
    # 更新详细答案为英文
    detailed_updated = 0
    for q in risk_questions:
        if 'answers' in q and 'detailed' in q['answers']:
            current_answer = q['answers']['detailed'].get('answer', '')
            # 如果是中文提示，改为英文
            if '需要详细解释' in current_answer:
                q['answers']['detailed']['answer'] = "Need detailed explanation? Ask your Finance Bro assistant for personalized help! Click the Finance Bro icon in the bottom right corner."
                detailed_updated += 1
    
    print(f"更新了 {detailed_updated} 个详细答案为英文")
    
    # 更新已生成的3个简洁答案为英文
    concise_updates = {
        'sys_risk_1773307473011_0': {
            'title': 'Value at Risk (VaR) Calculation & Limitations - Technical Question',
            'english_answer': 'Remember the three keys of VaR: calculation methods (historical simulation, variance-covariance, Monte Carlo), confidence level & time horizon, limitations (doesn\'t capture extreme tail risk). Prepare a concise definition and example for interviews.'
        },
        'sys_risk_1773307473011_1': {
            'title': 'Stress Testing Scenarios - Behavioral Question',
            'english_answer': 'Key aspects of stress testing: design realistic scenarios (historical, hypothetical, reverse), assess impacts, develop response measures. Mention how you stay updated: read regulatory docs, industry reports, attend conferences.'
        },
        'sys_risk_1773307473011_2': {
            'title': 'Counterparty Credit Risk - Case Question',
            'english_answer': 'Framework for counterparty credit risk: identify exposure, assess credit quality, set collateral requirements, monitor risk changes. Show structured problem-solving in interviews.'
        }
    }
    
    concise_updated = 0
    for q in risk_questions:
        qid = q.get('id')
        if qid in concise_updates:
            if 'answers' not in q:
                q['answers'] = {}
            if 'concise' not in q['answers']:
                q['answers']['concise'] = {}
            
            old_answer = q['answers']['concise'].get('answer', '')
            new_answer = concise_updates[qid]['english_answer']
            q['answers']['concise']['answer'] = new_answer
            concise_updated += 1
            print(f"更新简洁答案 {qid}: {new_answer[:80]}...")
    
    print(f"更新了 {concise_updated} 个简洁答案为英文")
    
    # 更新其他待生成的简洁答案占位符为英文
    placeholder_updated = 0
    for q in risk_questions:
        qid = q.get('id')
        if qid not in concise_updates:
            concise_answer = q.get('answers', {}).get('concise', {}).get('answer', '')
            if '【待生成】' in concise_answer:
                # 改为英文占位符
                title = q.get('title', 'Question')
                q['answers']['concise']['answer'] = f"[TO GENERATE] Concise hint for {title}"
                placeholder_updated += 1
    
    print(f"更新了 {placeholder_updated} 个占位符为英文")
    
    return questions

def main():
    """主函数"""
    filepath = 'questions.js'
    
    # 加载题目
    questions, prefix, suffix = load_questions(filepath)
    if questions is None:
        print("加载失败，退出")
        return
    
    # 更新Risk题目答案
    print("\n=== 更新Risk题目答案为英文 ===")
    updated_questions = update_risk_questions(questions)
    
    # 保存修改
    print("\n=== 保存修改 ===")
    save_questions(filepath, updated_questions, prefix, suffix)
    
    print("\n=== 完成 ===")
    print("已将所有Risk题目的答案更新为英文。")
    print("下一步：需要为剩余的57个Risk题目生成英文简洁答案。")

if __name__ == '__main__':
    main()