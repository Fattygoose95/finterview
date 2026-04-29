#!/usr/bin/env python3
"""
分析糟糕的简洁答案，识别通用模板
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

def analyze_bad_answers(questions):
    """分析糟糕答案"""
    
    # 定义通用模板（废话）
    generic_templates = [
        "Framework: 1) Analyze the problem 2) Identify key issues 3) Propose solutions 4) Evaluate trade-offs 5) Recommend implementation plan.",
        "Focus on: 1) Key concepts and definitions 2) Methodologies and models 3) Practical applications 4) Current industry practices.",
        "Structure with STAR: Situation, Task, Action, Result. Be specific about your role, challenges faced, and impact created.",
        "Consider: 1) Current market conditions 2) Key drivers and trends 3) Impact on the business 4) Strategic implications.",
        "Focus on fundamental concepts, definitions, and practical applications. Structure your answer with clear categories and examples."
    ]
    
    bad_answers_by_role = {}
    total_bad = 0
    
    for q in questions:
        role = q.get('role')
        concise = q.get('answers', {}).get('concise', {}).get('answer', '')
        
        # 检查是否包含通用模板
        is_bad = False
        for template in generic_templates:
            if template in concise:
                is_bad = True
                break
        
        if is_bad:
            total_bad += 1
            if role not in bad_answers_by_role:
                bad_answers_by_role[role] = []
            
            bad_answers_by_role[role].append({
                'id': q.get('id'),
                'title': q.get('title'),
                'concise': concise[:100] + '...' if len(concise) > 100 else concise,
                'question': q.get('question', '')[:80] + '...' if len(q.get('question', '')) > 80 else q.get('question', '')
            })
    
    print(f"\n=== BAD ANSWER ANALYSIS ===")
    print(f"Total bad answers (generic templates): {total_bad}/{len(questions)}")
    
    for role, answers in bad_answers_by_role.items():
        print(f"\n{role.upper()}: {len(answers)} bad answers")
        if len(answers) > 0:
            print("  Examples:")
            for i, ans in enumerate(answers[:3]):
                print(f"  {i+1}. {ans['title']}")
                print(f"     Question: {ans['question']}")
                print(f"     Current answer: {ans['concise']}")
    
    # 统计各角色题目总数
    role_counts = {}
    for q in questions:
        role = q.get('role')
        role_counts[role] = role_counts.get(role, 0) + 1
    
    print(f"\n=== ROLE DISTRIBUTION ===")
    for role, count in sorted(role_counts.items()):
        bad_count = len(bad_answers_by_role.get(role, []))
        print(f"{role.upper()}: {bad_count}/{count} bad answers ({bad_count/count*100:.1f}%)")
    
    return bad_answers_by_role, total_bad

def main():
    """主函数"""
    questions = load_questions('questions.js')
    if questions is None:
        return
    
    bad_answers, total_bad = analyze_bad_answers(questions)
    
    print(f"\n=== RECOMMENDATION ===")
    print("1. These 'generic framework' answers need to be replaced with specific hints.")
    print("2. Good concise answers should:")
    print("   - Point to specific aspects of the question")
    print("   - Suggest concrete angles or considerations")
    print("   - Mention relevant terminology or concepts")
    print("   - Be helpful for interview preparation")
    print("\n3. Example improvement:")
    print("   BAD: 'Framework: 1) Analyze the problem 2) Identify key issues...'")
    print("   GOOD: 'For M&A deals, consider: strategic rationale, valuation methods (DCF, comparable companies), financing structure, integration challenges, and synergies.'")

if __name__ == '__main__':
    main()