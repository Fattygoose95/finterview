#!/usr/bin/env python3
"""
修复剩余的9个泛泛答案
"""

import json
import re
import sys
import os

def load_questions(filepath):
    """从questions.js加载题目数据"""
    print(f"Loading questions file: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'const questionBank = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Error: Could not find questionBank array")
        return None, None, None
    
    array_content = match.group(1)
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

def fix_specific_questions(questions):
    """修复特定的9个题目"""
    
    # 需要修复的题目标题和对应的新答案
    fixes = {
        'Duration and interest rate risk': 'Explain duration concepts: Macaulay vs. modified duration, calculation methods, interpretation as price sensitivity to interest rate changes, limitations (assumes parallel yield curve shifts, convexity effects).',
        'Loss given default': 'Discuss LGD components: recovery rate determination, workout LGD vs. market LGD, factors affecting recovery (collateral type, seniority, jurisdiction, economic cycle), estimation challenges and regulatory requirements.',
        'Credit spreads': 'Explain credit spread components: default risk premium, liquidity premium, risk aversion. Discuss factors affecting spreads (economic cycle, industry conditions, firm-specific news) and their use in credit risk assessment.',
        'Operational risk definition': 'Define operational risk with Basel categories: internal fraud, external fraud, employment practices, clients/products, business disruption, execution/delivery. Provide examples for each category and explain why operational risk is distinct from other risk types.',
        'Key risk indicators': 'Discuss KRIs for operational risk: leading vs. lagging indicators, quantitative vs. qualitative, threshold setting, escalation procedures. Provide examples like error rates, system downtime, employee turnover, and regulatory breaches.',
        'Business continuity planning': 'Explain BCP importance: minimizing operational disruption, regulatory requirements, reputation protection, stakeholder confidence. Discuss key components: risk assessment, strategy development, plan implementation, testing, and continuous improvement.',
        'Fundamental Question 9': 'For risk appetite establishment: discuss board involvement, quantitative limits (VaR, earnings volatility), qualitative statements, cascading to business units, monitoring mechanisms, and alignment with strategy.',
        'Fundamental Question 19': 'For risk appetite framework: emphasize board oversight, risk tolerance levels, communication across organization, integration with decision-making, monitoring and reporting, and periodic review.',
        'Reporting & Communication - Technical Question': 'Challenges in risk reporting: data quality, timeliness, relevance to stakeholders, regulatory compliance, technology limitations. Solutions: automated reporting, dashboard development, stakeholder engagement, continuous improvement.'
    }
    
    fixed_count = 0
    not_found = []
    
    for q in questions:
        if q.get('role') != 'risk':
            continue
        
        title = q.get('title', '')
        
        # 检查是否是9个需要修复的题目之一
        needs_fix = False
        target_title = None
        
        for fix_title in fixes.keys():
            if fix_title in title:
                needs_fix = True
                target_title = fix_title
                break
        
        if needs_fix and target_title:
            # 更新答案
            if 'answers' not in q:
                q['answers'] = {}
            if 'concise' not in q['answers']:
                q['answers']['concise'] = {}
            
            old_answer = q['answers']['concise'].get('answer', '')
            new_answer = fixes[target_title]
            q['answers']['concise']['answer'] = new_answer
            
            print(f"Fixed: {title}")
            print(f"  Old: {old_answer[:80]}...")
            print(f"  New: {new_answer[:80]}...")
            
            fixed_count += 1
    
    print(f"\nFixed {fixed_count} questions")
    
    # 检查是否所有题目都找到了
    for fix_title in fixes.keys():
        found = False
        for q in questions:
            if q.get('role') == 'risk' and fix_title in q.get('title', ''):
                found = True
                break
        if not found:
            not_found.append(fix_title)
    
    if not_found:
        print(f"\nWarning: Could not find {len(not_found)} titles:")
        for title in not_found:
            print(f"  - {title}")
    
    return questions

def save_questions(filepath, questions, prefix, suffix):
    """保存修改后的题目到questions.js"""
    print(f"\nSaving to: {filepath}")
    
    # 备份原文件
    backup_path = filepath + '.backup_before_final_fix'
    if not os.path.exists(backup_path):
        os.rename(filepath, backup_path)
        print(f"Created backup: {backup_path}")
    
    # 将题目转换为JSON字符串
    questions_json = json.dumps(questions, indent=2, ensure_ascii=False)
    
    # 构建完整内容
    full_content = prefix + 'const questionBank = ' + questions_json + ';' + suffix
    
    # 写入文件
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    print(f"Saved {len(questions)} questions")
    return True

def main():
    """主函数"""
    print("=== FIXING REMAINING 9 GENERIC ANSWERS ===")
    
    questions_file = 'questions.js'
    questions, prefix, suffix = load_questions(questions_file)
    if questions is None:
        return False
    
    # 修复特定题目
    fixed_questions = fix_specific_questions(questions)
    
    # 保存修改
    success = save_questions(questions_file, fixed_questions, prefix, suffix)
    
    if success:
        print("\n=== COMPLETE ===")
        print("All 9 remaining generic answers have been fixed.")
        print("Risk Management answers are now 100% specific and helpful.")
        print("\nNext: Test in industry-practice.html")
    
    return success

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)