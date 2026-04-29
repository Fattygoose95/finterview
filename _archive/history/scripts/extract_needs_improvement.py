#!/usr/bin/env python3
"""
提取需要改进的题目
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

def extract_poor_answers(questions):
    """提取质量差的答案"""
    # 泛泛模板列表
    generic_templates = [
        'provide clear definition',
        'explain key concepts',
        'structure your answer',
        'focus on a specific example',
        'for behavioral questions',
        'for case questions',
        'for technical questions',
        'key points:',
        'remember the'
    ]
    
    poor_questions = []
    
    for q in questions:
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        
        if not concise:
            continue
        
        # 检查是否泛泛
        is_generic = False
        for template in generic_templates:
            if template in concise.lower():
                is_generic = True
                break
        
        if is_generic:
            poor_questions.append(q)
    
    print(f"Found {len(poor_questions)} questions with poor (generic) concise answers")
    
    # 按角色分组
    by_role = {}
    for q in poor_questions:
        role = q.get('role', 'unknown')
        if role not in by_role:
            by_role[role] = []
        by_role[role].append(q)
    
    # 打印统计
    print("\nBy role:")
    for role, qs in sorted(by_role.items()):
        print(f"  {role.upper()}: {len(qs)}")
    
    return poor_questions, by_role

def save_extraction(poor_questions, output_file):
    """保存提取的题目"""
    extraction_data = []
    
    for q in poor_questions:
        extraction_data.append({
            'id': q.get('id'),
            'role': q.get('role'),
            'title': q.get('title', ''),
            'question': q.get('question', ''),
            'modelAnswer': q.get('modelAnswer', ''),
            'category': q.get('category', ''),
            'difficulty': q.get('difficulty', ''),
            'currentConcise': q.get('answers', {}).get('concise', {}).get('answer', '')
        })
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(extraction_data, f, indent=2, ensure_ascii=False)
    
    print(f"\nSaved {len(extraction_data)} questions to {output_file}")
    
    # 显示示例
    print("\nExamples:")
    for i, q in enumerate(extraction_data[:3]):
        print(f"\n{i+1}. {q['role'].upper()}: {q['title']}")
        print(f"   Question: {q['question'][:80]}...")
        print(f"   Current answer: {q['currentConcise'][:100]}...")

def main():
    """主函数"""
    questions = load_questions('questions.js')
    if not questions:
        return
    
    poor_questions, by_role = extract_poor_answers(questions)
    
    # 保存提取结果
    output_file = 'poor_answers_for_improvement.json'
    save_extraction(poor_questions, output_file)
    
    # 提供改进指南
    print("\n=== IMPROVEMENT GUIDELINES ===")
    print("For each question, generate a concise answer that:")
    print("1. Is SPECIFIC to this question, not generic")
    print("2. Provides PRACTICAL hints for answering")
    print("3. Mentions RELEVANT terminology/concepts")
    print("4. Helps with INTERVIEW preparation")
    print("5. Is 1-3 key points, 50-150 words")
    print("\nExamples:")
    print("BAD: 'Provide clear definition, categorize into logical components...'")
    print("GOOD: 'Explain duration concepts: Macaulay vs. modified duration, calculation methods, interpretation as price sensitivity, limitations (assumes parallel yield curve shifts).'")
    print("\nBAD: 'For behavioral questions: focus on a specific example...'")
    print("GOOD: 'Discuss a VaR project: model selection challenges, parameter calibration issues, backtesting results, how you communicated limitations to traders, impact on risk decisions.'")

if __name__ == '__main__':
    main()