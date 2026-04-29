#!/usr/bin/env python3
"""
分析Corporate Finance题目的简洁答案质量
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

def analyze_corpfin_answers(questions):
    """分析Corporate Finance题目"""
    print("\n=== ANALYZING CORPORATE FINANCE ANSWERS ===")
    
    corpfin_questions = [q for q in questions if q.get('role') == 'corpfin']
    print(f"Found {len(corpfin_questions)} Corporate Finance questions")
    
    if not corpfin_questions:
        print("No Corporate Finance questions found!")
        return
    
    # 分析答案质量
    quality_categories = {
        'excellent': [],  # 具体、专业、实用
        'good': [],       # 基本可用
        'poor': [],       # 泛泛、模板化
        'missing': []     # 没有答案
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
        'key points:',
        'remember the',
        'provide practical',
        'categorize into'
    ]
    
    for q in corpfin_questions:
        qid = q.get('id', 'unknown')
        title = q.get('title', '')
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        
        if not concise:
            quality_categories['missing'].append((qid, title, concise))
            continue
        
        # 检查是否泛泛
        is_generic = False
        for template in generic_templates:
            if template in concise.lower():
                is_generic = True
                break
        
        # 检查长度和内容
        word_count = len(concise.split())
        
        if is_generic:
            quality_categories['poor'].append((qid, title, concise))
        elif word_count >= 20 and not is_generic:
            # 检查是否具体
            # Corporate Finance具体术语
            specific_indicators = [
                'wacc', 'npv', 'irr', 'roic', 'roa', 'roe', 'ev', 'ebitda',
                'capital structure', 'working capital', 'cash conversion',
                'dividend policy', 'share buyback', 'cost of capital',
                'financial planning', 'treasury management', 'risk management'
            ]
            
            has_specific_terms = any(indicator in concise.lower() for indicator in specific_indicators)
            has_examples = '.' in concise and len(concise.split('.')) > 2
            
            if has_specific_terms or has_examples:
                quality_categories['excellent'].append((qid, title, concise))
            else:
                quality_categories['good'].append((qid, title, concise))
        else:
            quality_categories['good'].append((qid, title, concise))
    
    # 打印统计结果
    print(f"\nQuality Distribution:")
    print(f"  Excellent: {len(quality_categories['excellent'])}")
    print(f"  Good: {len(quality_categories['good'])}")
    print(f"  Poor: {len(quality_categories['poor'])}")
    print(f"  Missing: {len(quality_categories['missing'])}")
    print(f"  Total: {len(corpfin_questions)}")
    
    # 显示示例
    print(f"\n=== EXAMPLES OF POOR ANSWERS (需要改进) ===")
    for i, (qid, title, concise) in enumerate(quality_categories['poor'][:5]):
        print(f"\n{i+1}. ID: {qid} - {title}")
        print(f"   Answer: {concise[:150]}..." if len(concise) > 150 else f"   Answer: {concise}")
    
    print(f"\n=== EXAMPLES OF EXCELLENT ANSWERS (优秀示例) ===")
    for i, (qid, title, concise) in enumerate(quality_categories['excellent'][:3]):
        print(f"\n{i+1}. ID: {qid} - {title}")
        print(f"   Answer: {concise[:150]}..." if len(concise) > 150 else f"   Answer: {concise}")
    
    print(f"\n=== EXAMPLES OF GOOD ANSWERS (良好但可改进) ===")
    for i, (qid, title, concise) in enumerate(quality_categories['good'][:3]):
        print(f"\n{i+1}. ID: {qid} - {title}")
        print(f"   Answer: {concise[:150]}..." if len(concise) > 150 else f"   Answer: {concise}")
    
    # 保存需要改进的题目
    if quality_categories['poor']:
        poor_data = []
        for qid, title, concise in quality_categories['poor']:
            # 找到完整题目信息
            full_q = next((q for q in corpfin_questions if str(q.get('id')) == str(qid)), None)
            if full_q:
                poor_data.append({
                    'id': qid,
                    'title': title,
                    'question': full_q.get('question', ''),
                    'modelAnswer': full_q.get('modelAnswer', ''),
                    'currentConcise': concise
                })
        
        with open('corpfin_poor_answers.json', 'w', encoding='utf-8') as f:
            json.dump(poor_data, f, indent=2, ensure_ascii=False)
        print(f"\nSaved {len(poor_data)} poor answers to 'corpfin_poor_answers.json'")
    
    return quality_categories

def generate_improvement_guidelines():
    """生成改进指南"""
    print("\n=== IMPROVEMENT GUIDELINES FOR CORPORATE FINANCE ===")
    print("\nCorporate Finance答案应该包含以下元素:")
    print("1. 具体概念和术语 (WACC, NPV, IRR, ROIC, capital structure等)")
    print("2. 实际应用示例 (公司如何应用这些概念)")
    print("3. 计算或分析方法 (如何计算WACC, 评估项目等)")
    print("4. 实际考虑因素 (行业差异, 公司规模, 经济环境等)")
    print("5. 常见错误或陷阱 (避免什么)")
    
    print("\n示例改进:")
    print("\nBAD: 'Provide clear definition, categorize into logical components...'")
    print("GOOD: 'Explain WACC: components (cost of equity via CAPM, cost of debt, weights), calculation methods, use in capital budgeting and valuation, factors affecting WACC (business risk, financial risk, market conditions), limitations.'")
    
    print("\nBAD: 'For capital budgeting questions: focus on a specific example...'")
    print("GOOD: 'Discuss NPV vs IRR: calculation methods, reinvestment rate assumptions, multiple IRR issues, mutually exclusive project conflicts, practical considerations (cash flow estimation, risk adjustment, strategic alignment).'")

def main():
    """主函数"""
    questions = load_questions('questions.js')
    if not questions:
        return
    
    quality_categories = analyze_corpfin_answers(questions)
    
    if quality_categories:
        print(f"\n=== ACTION PLAN ===")
        print(f"1. Total Corporate Finance questions: {sum(len(v) for v in quality_categories.values())}")
        print(f"2. Need improvement (Poor): {len(quality_categories['poor'])}")
        print(f"3. Priority order:")
        print(f"   - Fix poor answers first ({len(quality_categories['poor'])})")
        print(f"   - Then improve good answers ({len(quality_categories['good'])})")
        print(f"   - Finally check excellent answers for consistency ({len(quality_categories['excellent'])})")
        
        generate_improvement_guidelines()

if __name__ == '__main__':
    main()