#!/usr/bin/env python3
"""
批量分析所有题目，制定修复计划
"""

import json
import re
import sys
from collections import Counter

def load_questions(filepath):
    """从questions.js加载题目数据"""
    print(f"Loading questions file: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取questionBank数组
    match = re.search(r'const questionBank = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Error: Could not find questionBank array")
        return None, None, None
    
    array_content = match.group(1)
    
    # 清理JavaScript内容以便解析JSON
    array_content = re.sub(r'//.*', '', array_content)
    array_content = re.sub(r'/\*.*?\*/', '', array_content, flags=re.DOTALL)
    array_content = re.sub(r',\s*}', '}', array_content)
    array_content = re.sub(r',\s*]', ']', array_content)
    
    try:
        questions = json.loads(f'[{array_content}]')
        print(f"Successfully loaded {len(questions)} questions")
        return questions, content[:match.start()], content[match.end():]
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return None, None, None

def analyze_by_role(questions):
    """按角色分析题目"""
    roles = {}
    
    for q in questions:
        role = q.get('role')
        if role not in roles:
            roles[role] = []
        roles[role].append(q)
    
    print(f"\n{'='*80}")
    print("ROLE ANALYSIS")
    print('='*80)
    
    for role in sorted(roles.keys()):
        role_questions = roles[role]
        print(f"\n{role.upper()} ({len(role_questions)} questions):")
        
        # 检查简洁答案重复率
        concise_answers = []
        for q in role_questions:
            concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
            if concise:
                concise_answers.append(concise)
        
        concise_counter = Counter(concise_answers)
        unique_concise = len(concise_counter)
        
        # 检查详细答案状态
        detailed_answers = []
        for q in role_questions:
            detailed = q.get('answers', {}).get('detailed', {}).get('answer', '').strip()
            detailed_answers.append(detailed)
        
        # 检查是否需要修复
        needs_fix = []
        for q in role_questions:
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
                needs_fix.append(q)
        
        print(f"  - Unique concise answers: {unique_concise}/{len(role_questions)}")
        print(f"  - Needs fix: {len(needs_fix)} questions")
        
        # 显示示例问题
        if needs_fix:
            print(f"  - Example questions needing fix:")
            for q in needs_fix[:3]:
                title = q.get('title', 'No title')
                concise = q.get('answers', {}).get('concise', {}).get('answer', '')[:50]
                print(f"    • {title}")
                print(f"      Concise: {concise}...")
    
    return roles

def get_repair_plan(questions):
    """制定修复计划"""
    roles = {}
    for q in questions:
        role = q.get('role')
        if role not in roles:
            roles[role] = []
        roles[role].append(q)
    
    print(f"\n{'='*80}")
    print("BATCH REPAIR PLAN")
    print('='*80)
    
    # 按优先级排序：重复率高的先处理
    priority_order = ['corpfin', 'fintech', 'fo', 'risk', 'am', 'markets', 'quant', 'ib']
    
    total_to_fix = 0
    plan_details = {}
    
    for role in priority_order:
        if role not in roles:
            continue
            
        role_questions = roles[role]
        needs_fix_count = 0
        
        for q in role_questions:
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
                needs_fix_count += 1
        
        if needs_fix_count > 0:
            plan_details[role] = {
                'total': len(role_questions),
                'needs_fix': needs_fix_count,
                'percentage': (needs_fix_count / len(role_questions)) * 100
            }
            total_to_fix += needs_fix_count
    
    # 显示修复计划
    print(f"\nTotal questions needing repair: {total_to_fix}/{len(questions)}")
    print("\nPriority order:")
    
    for role, stats in plan_details.items():
        role_name = role.upper()
        print(f"\n{role_name}:")
        print(f"  Questions: {stats['total']}")
        print(f"  Need fix: {stats['needs_fix']} ({stats['percentage']:.1f}%)")
        print(f"  Action: Regenerate concise answers + update detailed answers")
    
    # 估计时间
    estimated_time = (total_to_fix * 0.5) / 60  # 每30秒一个题目
    print(f"\nEstimated time: {estimated_time:.1f} hours")
    
    return plan_details

def main():
    """主函数"""
    filepath = 'questions.js'
    
    # 加载题目
    questions, prefix, suffix = load_questions(filepath)
    if questions is None:
        print("Failed to load questions")
        return
    
    # 分析角色分布
    roles = analyze_by_role(questions)
    
    # 制定修复计划
    plan = get_repair_plan(questions)
    
    # 创建批量修复脚本
    print(f"\n{'='*80}")
    print("EXECUTION STRATEGY")
    print('='*80)
    
    print("\n1. Immediate actions:")
    print("   - Complete Risk Management (57 remaining concise answers)")
    print("   - Fix Corporate Finance (50 questions - 100% need fix)")
    print("   - Fix FinTech (50 questions - 100% need fix)")
    print("   - Fix Family Office (50 questions - 100% need fix)")
    
    print("\n2. Batch processing approach:")
    print("   - Generate concise answers in batches of 20-30 questions")
    print("   - Update detailed answers to Finance Bro prompt")
    print("   - Test Finance Bro interaction after each batch")
    
    print("\n3. Quality control:")
    print("   - Ensure all answers are in English")
    print("   - Concise answers: 1-3 bullet points, 50-150 words")
    print("   - Detailed answers: Point to Finance Bro assistant")
    print("   - Maintain professional finance terminology")
    
    # 保存分析结果
    with open('repair_analysis.json', 'w', encoding='utf-8') as f:
        analysis = {
            'total_questions': len(questions),
            'roles': {role: len(qs) for role, qs in roles.items()},
            'repair_plan': plan
        }
        json.dump(analysis, f, indent=2, ensure_ascii=False)
    
    print(f"\nAnalysis saved to repair_analysis.json")

if __name__ == '__main__':
    main()