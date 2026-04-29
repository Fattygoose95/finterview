#!/usr/bin/env python3
"""
分析Risk题目的具体内容，理解需要什么样的简洁答案
"""

import json
import re
import sys

def load_questions(filepath):
    """从questions.js加载题目数据"""
    print(f"Loading questions file: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取questionBank数组
    match = re.search(r'const questionBank = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Error: Could not find questionBank array")
        return None
    
    array_content = match.group(1)
    
    # 清理JavaScript内容以便解析JSON
    array_content = re.sub(r'//.*', '', array_content)
    array_content = re.sub(r'/\*.*?\*/', '', array_content, flags=re.DOTALL)
    array_content = re.sub(r',\s*}', '}', array_content)
    array_content = re.sub(r',\s*]', ']', array_content)
    
    try:
        questions = json.loads(f'[{array_content}]')
        print(f"Successfully loaded {len(questions)} questions")
        return questions
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return None

def analyze_risk_questions(questions):
    """分析Risk题目"""
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    print(f"\n=== RISK MANAGEMENT ANALYSIS ===")
    print(f"Total Risk questions: {len(risk_questions)}")
    
    # 分类分析
    by_category = {}
    by_difficulty = {}
    
    for q in risk_questions:
        category = q.get('category', 'unknown')
        difficulty = q.get('difficulty', 'unknown')
        title = q.get('title', '')
        question = q.get('question', '')
        concise = q.get('answers', {}).get('concise', {}).get('answer', '')
        
        # 按类别分组
        if category not in by_category:
            by_category[category] = []
        by_category[category].append(q)
        
        # 按难度分组
        if difficulty not in by_difficulty:
            by_difficulty[difficulty] = []
        by_difficulty[difficulty].append(q)
    
    print("\n=== BY CATEGORY ===")
    for category, qs in by_category.items():
        print(f"{category}: {len(qs)} questions")
        
        # 显示示例
        print(f"  Examples:")
        for q in qs[:2]:
            title = q.get('title', '')[:50]
            question = q.get('question', '')[:80]
            print(f"    • {title}")
            print(f"      Q: {question}...")
            concise = q.get('answers', {}).get('concise', {}).get('answer', '')[:80]
            if concise:
                print(f"      Current concise: {concise}...")
            print()
    
    print("\n=== BY DIFFICULTY ===")
    for difficulty, qs in by_difficulty.items():
        print(f"{difficulty}: {len(qs)} questions")
    
    # 分析题目类型
    print("\n=== QUESTION TYPES ===")
    
    question_types = {
        'definition': 0,      # What is... Define...
        'explanation': 0,     # Explain... Describe...
        'application': 0,     # How would you apply... How to use...
        'comparison': 0,      # Compare... Contrast...
        'analysis': 0,        # Analyze... Evaluate...
        'behavioral': 0,      # Share an example... Describe a situation...
        'case': 0,            # Design an approach... Given a scenario...
        'technical': 0        # Calculate... Technical aspects...
    }
    
    for q in risk_questions:
        question_text = q.get('question', '').lower()
        category = q.get('category', '').lower()
        
        if 'what is' in question_text or 'define' in question_text or 'what are' in question_text:
            question_types['definition'] += 1
        elif 'explain' in question_text or 'describe' in question_text:
            if 'behavioral' in category:
                question_types['behavioral'] += 1
            else:
                question_types['explanation'] += 1
        elif 'how would' in question_text or 'how to' in question_text or 'apply' in question_text:
            question_types['application'] += 1
        elif 'compare' in question_text or 'contrast' in question_text:
            question_types['comparison'] += 1
        elif 'analyze' in question_text or 'evaluate' in question_text:
            question_types['analysis'] += 1
        elif 'share' in question_text or 'situation' in question_text or 'experience' in question_text:
            question_types['behavioral'] += 1
        elif 'design' in question_text or 'scenario' in question_text or 'given' in question_text:
            question_types['case'] += 1
        elif 'calculate' in question_text or 'technical' in category:
            question_types['technical'] += 1
        else:
            # 默认归类
            if 'behavioral' in category:
                question_types['behavioral'] += 1
            elif 'case' in category:
                question_types['case'] += 1
            elif 'technical' in category:
                question_types['technical'] += 1
            else:
                question_types['explanation'] += 1
    
    for qtype, count in question_types.items():
        if count > 0:
            print(f"{qtype}: {count} questions")
    
    # 显示问题严重的答案
    print("\n=== PROBLEMATIC CONCISE ANSWERS ===")
    problematic = []
    
    for q in risk_questions:
        concise = q.get('answers', {}).get('concise', {}).get('answer', '')
        title = q.get('title', '')
        question = q.get('question', '')
        
        # 检查是否过于泛泛
        generic_phrases = [
            'for behavioral questions',
            'for case questions', 
            'for technical questions',
            'focus on a specific example',
            'structure your answer',
            'framework:'
        ]
        
        is_generic = any(phrase in concise.lower() for phrase in generic_phrases)
        
        if is_generic:
            problematic.append({
                'title': title,
                'question': question[:100],
                'concise': concise[:100]
            })
    
    print(f"Found {len(problematic)} overly generic concise answers")
    if problematic:
        print("\nExamples of problematic answers:")
        for i, p in enumerate(problematic[:5]):
            print(f"\n{i+1}. {p['title']}")
            print(f"   Question: {p['question']}...")
            print(f"   Current concise: {p['concise']}...")
    
    return risk_questions, problematic

def main():
    """主函数"""
    questions = load_questions('questions.js')
    if questions is None:
        return
    
    risk_questions, problematic = analyze_risk_questions(questions)
    
    print("\n=== RECOMMENDATION ===")
    print("Charlie is right - current answers are still too generic.")
    print("Need to create truly specific hints for each question.")
    print("\nGood concise answer should:")
    print("1. Point to the specific concepts in THIS question")
    print("2. Suggest angles relevant to THIS topic")
    print("3. Mention terminology specific to THIS domain")
    print("4. Help with THIS specific interview question")
    print("\nExample transformation:")
    print("BAD: 'For behavioral questions: focus on a specific example...'")
    print("GOOD: 'For VaR behavioral questions: discuss model assumptions validation, communicating limitations to traders, backtesting results, and regulatory reporting requirements.'")

if __name__ == '__main__':
    main()