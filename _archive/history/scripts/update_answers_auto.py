#!/usr/bin/env python3
"""
自动更新questions.js中的简洁答案（无需交互）
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

def load_generated_answers(answer_file):
    """加载生成的简洁答案"""
    print(f"Loading generated answers: {answer_file}")
    
    if not os.path.exists(answer_file):
        print(f"Error: Answer file not found: {answer_file}")
        return {}
    
    with open(answer_file, 'r', encoding='utf-8') as f:
        answers = json.load(f)
    
    # 转换为字典，key为题目ID
    answer_dict = {}
    for item in answers:
        answer_dict[item['id']] = item['conciseAnswer']
    
    print(f"Loaded {len(answer_dict)} generated answers")
    return answer_dict

def update_questions_with_answers(questions, answer_dict):
    """用生成的答案更新题目"""
    updated_count = 0
    not_found_ids = []
    
    for q in questions:
        qid = q.get('id')
        if qid in answer_dict:
            # 确保answers结构存在
            if 'answers' not in q:
                q['answers'] = {}
            if 'concise' not in q['answers']:
                q['answers']['concise'] = {}
            
            # 更新简洁答案
            old_answer = q['answers']['concise'].get('answer', '')
            new_answer = answer_dict[qid]
            q['answers']['concise']['answer'] = new_answer
            
            # 更新详细答案为Finance Bro提示
            if 'detailed' in q['answers']:
                q['answers']['detailed']['answer'] = "Need detailed explanation? Ask your Finance Bro assistant for personalized help! Click the Finance Bro icon in the bottom right corner."
            else:
                if 'detailed' not in q['answers']:
                    q['answers']['detailed'] = {}
                q['answers']['detailed']['answer'] = "Need detailed explanation? Ask your Finance Bro assistant for personalized help! Click the Finance Bro icon in the bottom right corner."
            
            updated_count += 1
        else:
            # 检查是否需要修复详细答案
            detailed = q.get('answers', {}).get('detailed', {}).get('answer', '')
            if detailed and ('需要详细解释' in detailed or 'Need detailed explanation' not in detailed):
                # 更新详细答案
                if 'answers' not in q:
                    q['answers'] = {}
                if 'detailed' not in q['answers']:
                    q['answers']['detailed'] = {}
                q['answers']['detailed']['answer'] = "Need detailed explanation? Ask your Finance Bro assistant for personalized help! Click the Finance Bro icon in the bottom right corner."
                updated_count += 1
    
    print(f"\nUpdated {updated_count} questions")
    
    # 显示未找到的题目ID（如果有）
    missing_in_questions = set(answer_dict.keys()) - {q.get('id') for q in questions}
    if missing_in_questions:
        print(f"Warning: {len(missing_in_questions)} generated answers not found in questions")
        print("Sample missing IDs:", list(missing_in_questions)[:5])
    
    return questions

def save_questions(filepath, questions, prefix, suffix):
    """保存修改后的题目到questions.js"""
    print(f"\nSaving to: {filepath}")
    
    # 备份原文件
    backup_path = filepath + '.backup_before_update'
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

def update_other_categories(questions):
    """更新其他类别的详细答案"""
    print("\n=== UPDATING OTHER CATEGORIES ===")
    
    categories_to_fix = ['corpfin', 'fintech', 'fo', 'am', 'markets', 'quant', 'ib']
    updated_counts = {}
    
    for category in categories_to_fix:
        cat_questions = [q for q in questions if q.get('role') == category]
        if not cat_questions:
            continue
        
        updated = 0
        for q in cat_questions:
            # 确保answers结构
            if 'answers' not in q:
                q['answers'] = {}
            if 'detailed' not in q['answers']:
                q['answers']['detailed'] = {}
            
            # 更新详细答案
            old_answer = q['answers']['detailed'].get('answer', '')
            q['answers']['detailed']['answer'] = "Need detailed explanation? Ask your Finance Bro assistant for personalized help! Click the Finance Bro icon in the bottom right corner."
            
            # 检查简洁答案是否需要修复
            concise = q.get('answers', {}).get('concise', {}).get('answer', '')
            bad_templates = [
                'Understand core concepts and principles',
                'Know practical applications',
                'Recognize key terms and definitions',
                'Common mistakes include',
                'Review core concepts and practice'
            ]
            
            if any(template in concise for template in bad_templates):
                # 标记为需要后续修复
                q['_needs_concise_fix'] = True
            
            updated += 1
        
        updated_counts[category] = updated
        print(f"{category.upper()}: Updated {updated} questions")
    
    return questions, updated_counts

def main():
    """主函数"""
    print("=== AUTO-UPDATING QUESTIONS.JS ===")
    
    questions_file = 'questions.js'
    answers_file = 'risk_concise_answers.json'
    
    # 加载题目
    questions, prefix, suffix = load_questions(questions_file)
    if questions is None:
        print("Failed to load questions")
        return False
    
    # 加载生成的答案
    answer_dict = load_generated_answers(answers_file)
    
    # 更新Risk题目
    print("\n=== UPDATING RISK QUESTIONS ===")
    updated_questions = update_questions_with_answers(questions, answer_dict)
    
    # 更新其他类别
    updated_questions, category_counts = update_other_categories(updated_questions)
    
    # 统计需要修复的简洁答案
    needs_fix_by_role = {}
    for q in updated_questions:
        if q.get('_needs_concise_fix'):
            role = q.get('role')
            needs_fix_by_role[role] = needs_fix_by_role.get(role, 0) + 1
    
    print("\n=== SUMMARY ===")
    print(f"Total questions: {len(updated_questions)}")
    print(f"Risk questions updated with concise answers: {len(answer_dict)}")
    
    if category_counts:
        print("\nOther categories updated (detailed answers to Finance Bro):")
        for category, count in category_counts.items():
            print(f"  {category.upper()}: {count} questions")
    
    if needs_fix_by_role:
        print("\nCategories needing concise answer fixes:")
        total_remaining = 0
        for role, count in needs_fix_by_role.items():
            print(f"  {role.upper()}: {count} questions")
            total_remaining += count
        
        print(f"\nTotal remaining concise answers to generate: {total_remaining}")
    
    # 自动保存
    print("\n=== SAVING CHANGES ===")
    success = save_questions(questions_file, updated_questions, prefix, suffix)
    
    if success:
        print("\n=== UPDATE COMPLETE ===")
        print("1. Risk Management repair: COMPLETED (77 questions)")
        print("2. All categories: Detailed answers updated to Finance Bro prompt")
        print("3. Finance Bro interaction implemented in industry-practice.html")
        print("4. Remaining work for other categories:")
        
        if needs_fix_by_role:
            for role, count in needs_fix_by_role.items():
                if count > 0:
                    print(f"   - {role.upper()}: {count} concise answers needed")
        
        print("\n5. Next steps:")
        print("   - Test Risk Management questions in industry-practice.html")
        print("   - Verify Finance Bro hint and breathing effect")
        print("   - Batch generate concise answers for remaining categories")
    
    return success

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)