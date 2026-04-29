#!/usr/bin/env python3
"""
检查修复后的答案质量
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
    """主函数"""
    questions = load_questions('questions.js')
    if not questions:
        return
    
    # 检查Risk题目的答案
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    print(f"Checking {len(risk_questions)} Risk questions")
    
    # 检查几个关键题目
    test_titles = [
        'Types of market risk',
        'Stress Testing Scenarios - Behavioral Question',
        'Counterparty Credit Risk - Case Question',
        'Climate Risk Assessment - Technical Question',
        'Value at Risk (VaR) Calculation & Limitations - Behavioral Question'
    ]
    
    print("\n=== CHECKING FIXED ANSWERS ===")
    
    for title in test_titles:
        for q in risk_questions:
            if title in q.get('title', ''):
                print(f"\n{title}:")
                print(f"  Question: {q.get('question', '')[:80]}...")
                concise = q.get('answers', {}).get('concise', {}).get('answer', '')
                if concise:
                    print(f"  Concise answer: {concise[:120]}...")
                
                # 检查答案质量
                generic_phrases = [
                    'for behavioral questions',
                    'for case questions',
                    'for technical questions',
                    'provide clear definition',
                    'explain key concepts',
                    'structure your answer'
                ]
                
                is_generic = any(phrase in concise.lower() for phrase in generic_phrases)
                if is_generic:
                    print("  ⚠️  Still somewhat generic")
                else:
                    print("  ✅ Seems specific and helpful")
                break
    
    # 统计改进情况
    print("\n=== QUALITY ANALYSIS ===")
    
    generic_count = 0
    specific_count = 0
    
    for q in risk_questions:
        concise = q.get('answers', {}).get('concise', {}).get('answer', '')
        if not concise:
            continue
        
        # 检查是否仍然泛泛
        generic_phrases = [
            'for behavioral questions',
            'for case questions',
            'for technical questions',
            'provide clear definition',
            'explain key concepts',
            'structure your answer',
            'focus on a specific example',
            'key points:',
            'remember the'
        ]
        
        is_generic = any(phrase in concise.lower() for phrase in generic_phrases)
        
        if is_generic:
            generic_count += 1
        else:
            specific_count += 1
    
    print(f"Generic answers: {generic_count}")
    print(f"Specific answers: {specific_count}")
    print(f"Total: {generic_count + specific_count}")
    
    if generic_count > 0:
        print(f"\n⚠️  {generic_count} answers still need improvement")
        print("These answers are still too generic and need to be more specific.")
    else:
        print("\n✅ All answers appear to be specific and helpful")

if __name__ == '__main__':
    main()