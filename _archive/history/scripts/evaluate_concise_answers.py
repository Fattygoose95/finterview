#!/usr/bin/env python3
"""
评估所有简洁答案的质量
"""

import json
import re
import sys

def load_questions(filepath):
    """从questions.js加载题目数据"""
    print(f"Loading questions file: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'const questionBank = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Error: Could not find questionBank array")
        return None
    
    array_content = match.group(1)
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

def evaluate_concise_answers(questions):
    """评估简洁答案质量"""
    print("\n=== EVALUATING CONCISE ANSWERS ===")
    
    # 分类统计
    by_role = {}
    quality_stats = {
        'excellent': 0,  # 具体、有用、专业
        'good': 0,       # 基本可用，但可改进
        'poor': 0,       # 泛泛、模板化
        'missing': 0,    # 没有简洁答案
        'needs_fix': 0   # 标记为需要修复
    }
    
    # 泛泛模板列表
    generic_templates = [
        'provide clear definition',
        'explain key concepts',
        'structure your answer',
        'focus on a specific example',
        'for behavioral questions',
        'for case questions',
        'for technical questions',
        '[needs concise answer]',
        '[to generate]',
        'remember the',
        'key points:'
    ]
    
    for q in questions:
        role = q.get('role', 'unknown')
        if role not in by_role:
            by_role[role] = {
                'total': 0,
                'excellent': 0,
                'good': 0,
                'poor': 0,
                'missing': 0,
                'needs_fix': 0
            }
        
        by_role[role]['total'] += 1
        
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        
        # 检查质量
        if not concise:
            quality_stats['missing'] += 1
            by_role[role]['missing'] += 1
            continue
        
        if '[needs' in concise.lower() or '[to generate' in concise.lower():
            quality_stats['needs_fix'] += 1
            by_role[role]['needs_fix'] += 1
            continue
        
        # 检查是否泛泛
        is_generic = False
        for template in generic_templates:
            if template in concise.lower():
                is_generic = True
                break
        
        # 检查长度和内容
        word_count = len(concise.split())
        
        if is_generic or word_count < 10:
            quality_stats['poor'] += 1
            by_role[role]['poor'] += 1
        elif word_count >= 20 and not is_generic:
            # 检查是否具体
            # 具体答案通常包含专业术语、具体概念等
            specific_indicators = [
                'macaulay', 'modified', 'duration', 'lgd', 'var', 
                'cvar', 'basel', 'coso', 'iso', 'kri', 'pfe', 'ead',
                'pd', 'cva', 'lcr', 'nsfr', 'tcfd', 'ccar'
            ]
            
            has_specific_terms = any(indicator in concise.lower() for indicator in specific_indicators)
            has_examples = '.' in concise and len(concise.split('.')) > 2
            
            if has_specific_terms or has_examples:
                quality_stats['excellent'] += 1
                by_role[role]['excellent'] += 1
            else:
                quality_stats['good'] += 1
                by_role[role]['good'] += 1
        else:
            quality_stats['good'] += 1
            by_role[role]['good'] += 1
    
    # 打印统计结果
    print(f"\nOverall quality:")
    print(f"  Excellent: {quality_stats['excellent']}")
    print(f"  Good: {quality_stats['good']}")
    print(f"  Poor: {quality_stats['poor']}")
    print(f"  Missing: {quality_stats['missing']}")
    print(f"  Needs fix: {quality_stats['needs_fix']}")
    print(f"  Total: {len(questions)}")
    
    print(f"\nBy role:")
    for role, stats in sorted(by_role.items()):
        print(f"\n{role.upper()}: {stats['total']} questions")
        if stats['total'] > 0:
            print(f"  Excellent: {stats['excellent']} ({stats['excellent']/stats['total']*100:.1f}%)")
            print(f"  Good: {stats['good']} ({stats['good']/stats['total']*100:.1f}%)")
            print(f"  Poor: {stats['poor']} ({stats['poor']/stats['total']*100:.1f}%)")
            print(f"  Missing: {stats['missing']} ({stats['missing']/stats['total']*100:.1f}%)")
            print(f"  Needs fix: {stats['needs_fix']} ({stats['needs_fix']/stats['total']*100:.1f}%)")
    
    # 识别需要修复的题目
    print(f"\n=== IDENTIFYING QUESTIONS NEEDING IMPROVEMENT ===")
    
    needs_improvement = []
    for q in questions:
        role = q.get('role', 'unknown')
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        
        if not concise or '[needs' in concise.lower() or '[to generate' in concise.lower():
            needs_improvement.append(q)
            continue
        
        # 检查是否泛泛
        is_generic = False
        for template in generic_templates:
            if template in concise.lower():
                is_generic = True
                break
        
        if is_generic:
            needs_improvement.append(q)
    
    print(f"Found {len(needs_improvement)} questions needing improvement")
    
    # 按角色分组
    needs_by_role = {}
    for q in needs_improvement:
        role = q.get('role', 'unknown')
        needs_by_role[role] = needs_by_role.get(role, 0) + 1
    
    print(f"\nNeeds improvement by role:")
    for role, count in sorted(needs_by_role.items()):
        total = by_role[role]['total'] if role in by_role else 0
        print(f"  {role.upper()}: {count}/{total} ({count/total*100:.1f}%)")
    
    # 显示示例
    print(f"\n=== EXAMPLES OF PROBLEMATIC ANSWERS ===")
    poor_examples = []
    for q in questions[:20]:  # 检查前20个
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        if concise:
            for template in generic_templates[:5]:  # 检查前5个模板
                if template in concise.lower():
                    poor_examples.append({
                        'role': q.get('role'),
                        'title': q.get('title', '')[:50],
                        'concise': concise[:100] + '...' if len(concise) > 100 else concise
                    })
                    break
    
    for i, example in enumerate(poor_examples[:3]):
        print(f"\n{i+1}. {example['role'].upper()}: {example['title']}")
        print(f"   Answer: {example['concise']}")
    
    return quality_stats, needs_improvement

def main():
    """主函数"""
    questions = load_questions('questions.js')
    if not questions:
        return
    
    quality_stats, needs_improvement = evaluate_concise_answers(questions)
    
    print(f"\n=== ACTION PLAN ===")
    print(f"1. Total questions: {len(questions)}")
    print(f"2. Questions needing improvement: {len(needs_improvement)}")
    print(f"3. Priority order:")
    
    # 按问题严重程度排序角色
    role_stats = {}
    for q in questions:
        role = q.get('role', 'unknown')
        if role not in role_stats:
            role_stats[role] = {'total': 0, 'needs_improvement': 0}
        role_stats[role]['total'] += 1
    
    for q in needs_improvement:
        role = q.get('role', 'unknown')
        role_stats[role]['needs_improvement'] += 1
    
    # 计算需要改进的比例
    role_percentages = []
    for role, stats in role_stats.items():
        if stats['total'] > 0:
            percentage = stats['needs_improvement'] / stats['total'] * 100
            role_percentages.append((role, percentage, stats['needs_improvement'], stats['total']))
    
    # 按比例降序排序
    role_percentages.sort(key=lambda x: x[1], reverse=True)
    
    for role, percentage, needs, total in role_percentages:
        print(f"   - {role.upper()}: {needs}/{total} ({percentage:.1f}%)")
    
    print(f"\n4. Recommended approach:")
    print(f"   - Start with highest percentage roles first")
    print(f"   - Generate specific, helpful concise answers")
    print(f"   - Avoid generic templates")
    print(f"   - Provide practical interview hints")

if __name__ == '__main__':
    main()