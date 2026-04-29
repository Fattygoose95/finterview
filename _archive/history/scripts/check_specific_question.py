#!/usr/bin/env python3
"""
检查特定题目的完整信息
"""

import json
import re
import sys

def load_questions(filepath):
    """从questions.js加载题目数据"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取questionBank数组
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
    except Exception as e:
        print(f"JSON decode error: {e}")
        # 尝试手动解析
        return None

def main():
    questions = load_questions('questions.js')
    if not questions:
        print("Failed to load questions")
        return
    
    # 查找特定题目
    target_title = "Duration and interest rate risk"
    
    for q in questions:
        if target_title in q.get('title', ''):
            print(f"Found: {q.get('title')}")
            print(f"ID: {q.get('id')}")
            print(f"Role: {q.get('role')}")
            print(f"Category: {q.get('category')}")
            print(f"\nQuestion: {q.get('question')}")
            print(f"\nModelAnswer: {q.get('modelAnswer', '')[:200]}...")
            
            # 检查answers结构
            print(f"\nAnswers structure: {q.get('answers', {})}")
            
            concise = q.get('answers', {}).get('concise', {}).get('answer', '')
            if concise:
                print(f"\nConcise answer: {concise}")
                # 检查是否是新答案
                if 'Macaulay' in concise or 'modified duration' in concise:
                    print("✓ This is the NEW concise answer")
                else:
                    print("⚠ This appears to be the OLD concise answer")
            else:
                print("\n✗ No concise answer found")
            
            detailed = q.get('answers', {}).get('detailed', {}).get('answer', '')
            if detailed:
                print(f"\nDetailed answer: {detailed}")
            
            break
    else:
        print(f"Could not find question: {target_title}")
        
    # 也检查其他题目
    print("\n--- Checking other questions ---")
    
    test_titles = [
        "Loss given default",
        "Operational risk definition", 
        "Types of market risk"
    ]
    
    for title in test_titles:
        for q in questions:
            if title in q.get('title', ''):
                concise = q.get('answers', {}).get('concise', {}).get('answer', '')
                print(f"\n{title}:")
                if concise:
                    print(f"  Answer: {concise[:100]}...")
                else:
                    print(f"  No concise answer")
                break

if __name__ == '__main__':
    main()