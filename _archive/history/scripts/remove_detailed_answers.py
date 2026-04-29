#!/usr/bin/env python3
"""
从questions.js中移除所有detailed answers
只保留concise answers
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

def remove_detailed_answers(questions):
    """移除所有detailed answers，只保留concise"""
    print("\n=== REMOVING DETAILED ANSWERS ===")
    
    removed_count = 0
    kept_concise_count = 0
    no_concise_count = 0
    
    for q in questions:
        # 检查是否有answers字段
        if 'answers' in q:
            # 移除detailed字段
            if 'detailed' in q['answers']:
                del q['answers']['detailed']
                removed_count += 1
            
            # 确保concise存在
            if 'concise' not in q['answers'] or not q['answers']['concise'].get('answer', '').strip():
                # 没有简洁答案或为空
                if 'concise' not in q['answers']:
                    q['answers']['concise'] = {}
                # 标记需要生成简洁答案
                q['answers']['concise']['answer'] = f"[NEEDS CONCISE ANSWER] {q.get('title', 'Question')}"
                q['_needs_concise'] = True
                no_concise_count += 1
            else:
                kept_concise_count += 1
                
            # 如果answers只剩下concise，保持结构
            if len(q['answers']) == 1 and 'concise' in q['answers']:
                # 这是期望的状态
                pass
        else:
            # 完全没有answers，需要添加
            q['answers'] = {'concise': {'answer': f"[NEEDS CONCISE ANSWER] {q.get('title', 'Question')}"}}
            q['_needs_concise'] = True
            no_concise_count += 1
    
    print(f"Removed detailed answers: {removed_count}")
    print(f"Questions with concise answers: {kept_concise_count}")
    print(f"Questions needing concise answers: {no_concise_count}")
    
    return questions, no_concise_count

def save_questions(filepath, questions, prefix, suffix):
    """保存修改后的题目到questions.js"""
    print(f"\nSaving to: {filepath}")
    
    # 备份原文件
    backup_path = filepath + '.backup_before_remove_detailed'
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
    print("=== REMOVING ALL DETAILED ANSWERS ===")
    print("Keeping only concise answers as requested by Charlie")
    
    questions_file = 'questions.js'
    questions, prefix, suffix = load_questions(questions_file)
    if questions is None:
        return False
    
    # 移除detailed answers
    modified_questions, needs_concise_count = remove_detailed_answers(questions)
    
    # 保存修改
    success = save_questions(questions_file, modified_questions, prefix, suffix)
    
    if success:
        print("\n=== COMPLETE ===")
        print("1. Removed ALL detailed answers from all questions")
        print("2. Kept concise answers where they exist")
        print(f"3. {needs_concise_count} questions need concise answers")
        print("\nNext steps:")
        print("1. Update UI to remove detailed answer sections")
        print("2. Generate concise answers for questions that need them")
        print("3. Test the simplified interface")
    
    return success

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)