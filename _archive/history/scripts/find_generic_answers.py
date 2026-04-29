#!/usr/bin/env python3
"""
找出仍然泛泛的答案
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
    
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    
    generic_phrases = [
        'provide clear definition',
        'explain key concepts',
        'structure your answer',
        'focus on a specific example',
        'for behavioral questions',
        'for case questions',
        'for technical questions'
    ]
    
    print("=== FINDING GENERIC ANSWERS ===")
    generic_questions = []
    
    for q in risk_questions:
        title = q.get('title', '')
        concise = q.get('answers', {}).get('concise', {}).get('answer', '')
        question = q.get('question', '')
        
        if not concise:
            continue
        
        # 检查是否包含泛泛短语
        is_generic = False
        for phrase in generic_phrases:
            if phrase in concise.lower():
                is_generic = True
                break
        
        if is_generic:
            generic_questions.append({
                'title': title,
                'question': question,
                'concise': concise,
                'category': q.get('category', '')
            })
    
    print(f"Found {len(generic_questions)} generic answers")
    print("\n=== GENERIC ANSWERS TO FIX ===")
    
    for i, q in enumerate(generic_questions):
        print(f"\n{i+1}. {q['title']}")
        print(f"   Category: {q['category']}")
        print(f"   Question: {q['question'][:80]}...")
        print(f"   Current answer: {q['concise'][:100]}...")
        
        # 建议改进
        if 'provide clear definition' in q['concise'].lower():
            if 'duration' in q['title'].lower() or 'interest rate risk' in q['question'].lower():
                print(f"   Suggested fix: Explain duration concepts: Macaulay vs. modified duration, calculation methods, interpretation as price sensitivity, limitations (assumes parallel yield curve shifts).")
            elif 'loss given default' in q['title'].lower() or 'lgd' in q['question'].lower():
                print(f"   Suggested fix: Discuss LGD components: recovery rate determination, workout LGD vs. market LGD, factors affecting recovery (collateral, seniority, jurisdiction), estimation challenges.")
            elif 'credit spreads' in q['title'].lower():
                print(f"   Suggested fix: Explain credit spread components: default risk premium, liquidity premium, risk aversion. Factors affecting spreads: economic cycle, industry conditions, firm-specific news.")
        
        elif 'explain key concepts' in q['concise'].lower():
            print(f"   Suggested fix: Identify the specific concepts in this question and provide targeted guidance on how to explain them.")
        
        elif 'structure your answer' in q['concise'].lower():
            print(f"   Suggested fix: Provide a specific structure or framework relevant to this particular question type.")
    
    return generic_questions

if __name__ == '__main__':
    main()