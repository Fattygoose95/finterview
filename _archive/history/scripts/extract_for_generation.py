#!/usr/bin/env python3
"""
提取需要生成简洁答案的题目数据
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

def extract_questions_needing_fix(questions, target_role=None):
    """提取需要修复的题目"""
    questions_needing_fix = []
    
    for q in questions:
        role = q.get('role')
        
        # 如果指定了角色，只提取该角色
        if target_role and role != target_role:
            continue
        
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        detailed = q.get('answers', {}).get('detailed', {}).get('answer', '').strip()
        
        # 检查简洁答案是否需要修复
        bad_templates = [
            'Understand core concepts and principles',
            'Know practical applications',
            'Recognize key terms and definitions',
            'Common mistakes include',
            'Review core concepts and practice',
            '[TO GENERATE]',
            '【待生成】'
        ]
        
        needs_fix_concise = any(template in concise for template in bad_templates) or not concise
        needs_fix_detailed = detailed and ('需要详细解释' in detailed or 'Need detailed explanation' not in detailed)
        
        if needs_fix_concise or needs_fix_detailed:
            questions_needing_fix.append(q)
    
    return questions_needing_fix

def create_generation_batch(questions_needing_fix, batch_size=20):
    """创建批量生成的数据"""
    batches = []
    
    # 按角色分组
    by_role = {}
    for q in questions_needing_fix:
        role = q.get('role')
        if role not in by_role:
            by_role[role] = []
        by_role[role].append(q)
    
    # 为每个角色创建批次
    for role, role_questions in by_role.items():
        print(f"\n{role.upper()}: {len(role_questions)} questions need fix")
        
        # 分批处理
        for i in range(0, len(role_questions), batch_size):
            batch = role_questions[i:i+batch_size]
            
            # 创建生成任务数据
            generation_data = []
            for q in batch:
                item = {
                    'id': q.get('id'),
                    'role': q.get('role'),
                    'title': q.get('title', ''),
                    'question': q.get('question', ''),
                    'modelAnswer': q.get('modelAnswer', ''),
                    'category': q.get('category', ''),
                    'difficulty': q.get('difficulty', ''),
                    'currentConcise': q.get('answers', {}).get('concise', {}).get('answer', '')
                }
                generation_data.append(item)
            
            batches.append({
                'role': role,
                'batch_number': (i // batch_size) + 1,
                'questions': generation_data
            })
            
            print(f"  Batch {(i // batch_size) + 1}: {len(batch)} questions")
    
    return batches

def main():
    """主函数"""
    filepath = 'questions.js'
    
    # 加载题目
    questions = load_questions(filepath)
    if questions is None:
        print("Failed to load questions")
        return
    
    # 提取需要修复的题目
    print("\n=== EXTRACTING QUESTIONS NEEDING FIX ===")
    
    # 先处理Risk Management
    risk_questions = extract_questions_needing_fix(questions, target_role='risk')
    print(f"\nRisk Management needs fix: {len(risk_questions)} questions")
    
    # 显示Risk题目
    if risk_questions:
        print("\nSample Risk questions needing concise answers:")
        for i, q in enumerate(risk_questions[:5]):
            print(f"{i+1}. ID: {q.get('id')}")
            print(f"   Title: {q.get('title')}")
            print(f"   Question: {q.get('question', '')[:80]}...")
            print(f"   Current concise: {q.get('answers', {}).get('concise', {}).get('answer', '')[:80]}...")
            print()
    
    # 创建Risk批次
    risk_batches = create_generation_batch(risk_questions, batch_size=20)
    
    # 保存Risk批次
    if risk_batches:
        with open('risk_generation_batches.json', 'w', encoding='utf-8') as f:
            json.dump(risk_batches, f, indent=2, ensure_ascii=False)
        print(f"\nSaved risk generation batches to risk_generation_batches.json")
    
    # 提取其他紧急类别
    print("\n=== EXTRACTING OTHER HIGH-PRIORITY CATEGORIES ===")
    
    high_priority_roles = ['corpfin', 'fintech', 'fo']
    
    for role in high_priority_roles:
        role_questions = extract_questions_needing_fix(questions, target_role=role)
        print(f"{role.upper()}: {len(role_questions)} questions need fix")
        
        # 创建批次
        if role_questions:
            batches = create_generation_batch(role_questions, batch_size=25)
            output_file = f'{role}_generation_batches.json'
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(batches, f, indent=2, ensure_ascii=False)
            print(f"  Saved to {output_file}")
    
    # 生成AI任务说明
    print("\n=== AI GENERATION TASK INSTRUCTIONS ===")
    print("""
For each question, generate a concise answer in English with these requirements:

1. Format: 1-3 key points, 50-150 words
2. Purpose: Helpful hint, not complete answer
3. Language: English only
4. Professional: Use proper finance terminology
5. Role-specific: Tailor to the finance role

Example:
  Title: "Value at Risk (VaR) Calculation & Limitations"
  Question: "Explain the key concepts and applications of VaR..."
  ModelAnswer: "VaR measures potential loss over time at confidence level..."
  
  Concise Answer: "Remember the three keys of VaR: calculation methods (historical simulation, variance-covariance, Monte Carlo), confidence level & time horizon, limitations (doesn't capture extreme tail risk). Prepare a concise definition and example for interviews."
""")

if __name__ == '__main__':
    main()