#!/usr/bin/env python3
"""
分析Quantitative Finance题目的简洁答案质量
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

def analyze_quant_answers(questions):
    """分析Quantitative Finance题目"""
    print("\n=== ANALYZING QUANTITATIVE FINANCE ANSWERS ===")
    
    quant_questions = [q for q in questions if q.get('role') == 'quant']
    print(f"Found {len(quant_questions)} Quantitative Finance questions")
    
    if not quant_questions:
        print("No Quantitative Finance questions found!")
        return
    
    # 分析答案质量
    quality_categories = {
        'excellent': [],  # 具体、专业、实用
        'good': [],       # 基本可用
        'poor': [],       # 泛泛、模板化
        'missing': []     # 没有答案
    }
    
    # 泛泛模板检查
    generic_patterns = [
        r'^For\s+[\'"].*[\'"]:\s+',  # 以"For '...':"开头
        r'provide clear definition',
        r'explain key concepts',
        r'structure your answer',
        r'focus on a specific example',
        r'for behavioral questions',
        r'for case questions',
        r'for technical questions',
        r'^key points:',
        r'remember the',
        r'provide practical',
        r'categorize into',
        r'break down into',
        r'outline step-by-step',
        r'identify the main',
        r'discuss.*framework'
    ]
    
    for q in quant_questions:
        qid = q.get('id', 'unknown')
        title = q.get('title', '')
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        
        if not concise:
            quality_categories['missing'].append((qid, title, concise))
            continue
        
        # 检查是否泛泛
        is_generic = False
        for pattern in generic_patterns:
            if re.search(pattern, concise.lower()):
                is_generic = True
                break
        
        # 检查是否包含具体量化术语
        quant_terms = [
            'stochastic', 'calculus', 'probability', 'statistics',
            'regression', 'time series', 'machine learning', 'ai',
            'algorithm', 'modeling', 'backtesting', 'var', 'cvar',
            'black-scholes', 'options pricing', 'greeks', 'delta',
            'gamma', 'vega', 'theta', 'monte carlo', 'simulation',
            'optimization', 'linear programming', 'portfolio',
            'risk management', 'quantitative', 'mathematical',
            'programming', 'python', 'r', 'c++', 'sql', 'data'
        ]
        
        has_quant_terms = any(term in concise.lower() for term in quant_terms)
        word_count = len(concise.split())
        
        if is_generic and not has_quant_terms:
            quality_categories['poor'].append((qid, title, concise))
        elif has_quant_terms and word_count >= 15:
            quality_categories['excellent'].append((qid, title, concise))
        else:
            quality_categories['good'].append((qid, title, concise))
    
    # 打印统计结果
    print(f"\nQuality Distribution:")
    print(f"  Excellent: {len(quality_categories['excellent'])}")
    print(f"  Good: {len(quality_categories['good'])}")
    print(f"  Poor: {len(quality_categories['poor'])}")
    print(f"  Missing: {len(quality_categories['missing'])}")
    print(f"  Total: {len(quant_questions)}")
    
    # 显示示例
    if quality_categories['poor']:
        print(f"\n=== EXAMPLES OF POOR ANSWERS (需要改进) ===")
        for i, (qid, title, concise) in enumerate(quality_categories['poor'][:5]):
            print(f"\n{i+1}. ID: {qid} - {title}")
            print(f"   Answer: {concise[:150]}..." if len(concise) > 150 else f"   Answer: {concise}")
    
    if quality_categories['excellent']:
        print(f"\n=== EXAMPLES OF EXCELLENT ANSWERS (优秀示例) ===")
        for i, (qid, title, concise) in enumerate(quality_categories['excellent'][:3]):
            print(f"\n{i+1}. ID: {qid} - {title}")
            print(f"   Answer: {concise[:150]}..." if len(concise) > 150 else f"   Answer: {concise}")
    
    if quality_categories['good']:
        print(f"\n=== EXAMPLES OF GOOD ANSWERS (良好但可改进) ===")
        for i, (qid, title, concise) in enumerate(quality_categories['good'][:3]):
            print(f"\n{i+1}. ID: {qid} - {title}")
            print(f"   Answer: {concise[:150]}..." if len(concise) > 150 else f"   Answer: {concise}")
    
    return quality_categories

def main():
    """主函数"""
    questions = load_questions('questions.js')
    if not questions:
        return
    
    quality_categories = analyze_quant_answers(questions)
    
    if quality_categories:
        print(f"\n=== SUMMARY ===")
        total = sum(len(v) for v in quality_categories.values())
        excellent_pct = len(quality_categories['excellent']) / total * 100 if total > 0 else 0
        poor_pct = len(quality_categories['poor']) / total * 100 if total > 0 else 0
        
        print(f"Quantitative Finance: {total} questions")
        print(f"  Excellent: {len(quality_categories['excellent'])} ({excellent_pct:.1f}%)")
        print(f"  Good: {len(quality_categories['good'])}")
        print(f"  Poor: {len(quality_categories['poor'])} ({poor_pct:.1f}%)")
        print(f"  Missing: {len(quality_categories['missing'])}")
        
        if quality_categories['poor']:
            print(f"\nNeed to improve {len(quality_categories['poor'])} poor answers")

if __name__ == '__main__':
    main()