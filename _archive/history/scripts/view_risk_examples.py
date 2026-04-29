#!/usr/bin/env python3
"""
查看Risk题目示例
"""

import json
import re
import sys

def load_questions(filepath):
    """从questions.js加载题目数据"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'const questionBank = \[(.*?)\];', content, re.DOTALL)
    if not match:
        return None
    
    array_content = match.group(1)
    array_content = re.sub(r'//.*', '', array_content)
    array_content = re.sub(r'/\*.*?\*/', '', array_content, flags=re.DOTALL)
    array_content = re.sub(r',\s*}', '}', array_content)
    array_content = re.sub(r',\s*]', ']', array_content)
    
    try:
        questions = json.loads(f'[{array_content}]')
        return questions
    except:
        return None

def main():
    questions = load_questions('questions.js')
    if not questions:
        return
    
    # 查找不同类型的Risk题目
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    
    print("=== EXAMPLES OF RISK QUESTIONS ===")
    
    # 示例1：基础定义题
    print("\n1. BASIC DEFINITION QUESTION:")
    for q in risk_questions:
        if 'Types of market risk' in q.get('title', ''):
            print(f"Title: {q.get('title')}")
            print(f"Question: {q.get('question')}")
            print(f"ModelAnswer: {q.get('modelAnswer', '')[:100]}...")
            print(f"Concise answer: {q.get('answers', {}).get('concise', {}).get('answer', '')}")
            print(f"Category: {q.get('category')}")
            break
    
    # 示例2：行为面试题
    print("\n2. BEHAVIORAL QUESTION:")
    for q in risk_questions:
        if 'Stress Testing Scenarios - Behavioral Question' in q.get('title', ''):
            print(f"Title: {q.get('title')}")
            print(f"Question: {q.get('question')}")
            print(f"ModelAnswer: {q.get('modelAnswer', '')[:100]}...")
            print(f"Concise answer: {q.get('answers', {}).get('concise', {}).get('answer', '')}")
            print(f"Category: {q.get('category')}")
            break
    
    # 示例3：案例题
    print("\n3. CASE QUESTION:")
    for q in risk_questions:
        if 'Counterparty Credit Risk - Case Question' in q.get('title', ''):
            print(f"Title: {q.get('title')}")
            print(f"Question: {q.get('question')}")
            print(f"ModelAnswer: {q.get('modelAnswer', '')[:100]}...")
            print(f"Concise answer: {q.get('answers', {}).get('concise', {}).get('answer', '')}")
            print(f"Category: {q.get('category')}")
            break
    
    # 示例4：技术题
    print("\n4. TECHNICAL QUESTION:")
    for q in risk_questions:
        if 'Climate Risk Assessment - Technical Question' in q.get('title', ''):
            print(f"Title: {q.get('title')}")
            print(f"Question: {q.get('question')}")
            print(f"ModelAnswer: {q.get('modelAnswer', '')[:100]}...")
            print(f"Concise answer: {q.get('answers', {}).get('concise', {}).get('answer', '')}")
            print(f"Category: {q.get('category')}")
            break
    
    # 分析问题
    print("\n=== ANALYSIS OF CURRENT CONCISE ANSWERS ===")
    print("Problem: Answers are still too generic or just rephrase the modelAnswer.")
    print("\nWhat a GOOD concise answer should do:")
    print("1. For definition questions: Suggest the key categories/classification framework")
    print("2. For behavioral questions: Point to specific aspects to highlight in examples")
    print("3. For case questions: Suggest a framework or considerations for analysis")
    print("4. For technical questions: Mention key methodologies or calculations")
    
    print("\n=== SUGGESTED IMPROVEMENTS ===")
    
    # 为每个示例提供改进建议
    examples = []
    for q in risk_questions:
        title = q.get('title', '')
        if any(x in title for x in ['Types of market risk', 'Stress Testing', 'Counterparty', 'Climate Risk']):
            examples.append(q)
    
    for q in examples[:4]:
        print(f"\n{q.get('title')}:")
        question = q.get('question', '')
        current = q.get('answers', {}).get('concise', {}).get('answer', '')
        
        # 生成改进建议
        if 'Types of market risk' in q.get('title', ''):
            improved = "Focus on the 5 standard categories (equity, interest rate, currency, commodity, volatility) and mention how they differ in terms of drivers, measurement, and hedging techniques."
        elif 'Stress Testing' in q.get('title', ''):
            improved = "For staying updated on stress testing: mention regulatory developments (e.g., CCAR), academic research, industry working groups, software tools, and lessons from recent market events."
        elif 'Counterparty' in q.get('title', ''):
            improved = "Design approach should include: exposure measurement (PFE, EAD), collateral management, netting agreements, credit limits, stress testing of counterparty concentration, and CVA calculation."
        elif 'Climate Risk' in q.get('title', ''):
            improved = "Compare approaches: physical risk models (historical data vs. climate projections) vs. transition risk models (policy scenarios, technology adoption). Discuss data challenges and integration with existing risk frameworks."
        else:
            improved = "Provide specific guidance based on the question content."
        
        print(f"  Current: {current[:80]}...")
        print(f"  Improved: {improved}")

if __name__ == '__main__':
    main()