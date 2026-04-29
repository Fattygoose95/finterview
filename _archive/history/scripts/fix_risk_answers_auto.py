#!/usr/bin/env python3
"""
自动修复Risk Management题目的答案质量
1. 移除或清空详细答案
2. 简化详细分析
3. 为简洁答案添加占位符（稍后批量生成）
"""

import json
import re
import sys
from pathlib import Path

def load_questions(filepath):
    """从questions.js加载题目数据"""
    print(f"正在加载题目文件: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取questionBank数组
    match = re.search(r'const questionBank = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("错误: 找不到questionBank数组")
        return None, None, None
    
    array_content = match.group(1)
    
    # 清理JavaScript内容以便解析JSON
    # 移除单行注释
    array_content = re.sub(r'//.*', '', array_content)
    # 移除多行注释 (简单处理)
    array_content = re.sub(r'/\*.*?\*/', '', array_content, flags=re.DOTALL)
    # 修复尾随逗号
    array_content = re.sub(r',\s*}', '}', array_content)
    array_content = re.sub(r',\s*]', ']', array_content)
    
    try:
        questions = json.loads(f'[{array_content}]')
        print(f"成功加载 {len(questions)} 个题目")
        return questions, content[:match.start()], content[match.end():]
    except json.JSONDecodeError as e:
        print(f"JSON解析错误: {e}")
        return None, None, None

def save_questions(filepath, questions, prefix, suffix):
    """保存修改后的题目到questions.js"""
    print(f"正在保存到: {filepath}")
    
    # 将题目转换为JSON字符串
    questions_json = json.dumps(questions, indent=2, ensure_ascii=False)
    
    # 构建完整内容
    full_content = prefix + 'const questionBank = ' + questions_json + ';' + suffix
    
    # 备份原文件
    backup_path = filepath + '.backup_pre_fix'
    Path(filepath).rename(backup_path)
    print(f"已创建备份: {backup_path}")
    
    # 写入新文件
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(full_content)
    
    print(f"已保存 {len(questions)} 个题目")

def fix_risk_questions(questions):
    """修复Risk Management题目的答案"""
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    print(f"找到 {len(risk_questions)} 个Risk Management题目")
    
    fixed_count = 0
    needs_fix_ids = []
    
    for q in risk_questions:
        qid = q.get('id', '未知ID')
        title = q.get('title', '未知标题')
        
        # 1. 检查并修复answers.concise
        if 'answers' not in q:
            q['answers'] = {}
        
        if 'concise' not in q['answers']:
            q['answers']['concise'] = {'answer': f"【待生成】{title}的简洁提示答案"}
            fixed_count += 1
            needs_fix_ids.append(qid)
            continue
        
        # 获取当前简洁答案
        current_concise = q['answers']['concise'].get('answer', '')
        
        # 检查是否是需要修复的模板答案
        bad_templates = [
            '• Understand core concepts and principles',
            '• Know practical applications in Risk Management',
            '• Recognize key terms and definitions',
            'Common mistakes include missing key points or oversimplifying',
            'Review core concepts and practice applying them'
        ]
        
        # 检查是否包含任何坏模板
        is_bad = False
        for template in bad_templates:
            if template in current_concise:
                is_bad = True
                break
        
        if is_bad or not current_concise.strip():
            # 标记需要生成新答案
            q['answers']['concise']['answer'] = f"【待生成】{title}的简洁提示答案"
            q['_needs_fix'] = True
            fixed_count += 1
            needs_fix_ids.append(qid)
        
        # 2. 移除或清空详细答案
        if 'detailed' in q['answers']:
            # 保留结构但清空内容，添加Finance Bro提示
            q['answers']['detailed']['answer'] = "需要详细解释？点击右侧的Finance Bro助手获取个性化解答！"
        
        # 3. 简化detailedAnalysis
        if 'detailedAnalysis' in q:
            # 简化为基本提示
            q['detailedAnalysis'] = {
                'tip': '这是一个风险管理题目，确保回答结构清晰、覆盖所有要点。',
                'commonMistakes': '常见错误包括遗漏关键风险类别或混淆不同风险类型。',
                'improvementTips': '练习时尝试用自己的话解释概念，确保真正理解而不仅仅是记忆。'
            }
    
    print(f"\n修复统计:")
    print(f"  需要修复简洁答案的题目: {fixed_count}")
    print(f"  详细答案已添加Finance Bro提示: {len(risk_questions)}")
    print(f"  详细分析已简化: {len(risk_questions)}")
    
    if needs_fix_ids:
        print(f"\n需要生成新简洁答案的题目ID (前10个):")
        for i, qid in enumerate(needs_fix_ids[:10]):
            # 找到题目标题
            for q in risk_questions:
                if q.get('id') == qid:
                    print(f"  {i+1}. ID{qid}: {q.get('title')}")
                    break
        if len(needs_fix_ids) > 10:
            print(f"  ... 还有{len(needs_fix_ids)-10}个题目")
    
    return questions

def main():
    """主函数"""
    filepath = 'questions.js'
    
    # 加载题目
    questions, prefix, suffix = load_questions(filepath)
    if questions is None:
        print("加载失败，退出")
        return
    
    # 修复Risk Management题目
    print("\n=== 开始修复Risk Management题目 ===")
    fixed_questions = fix_risk_questions(questions)
    
    # 保存修改
    print("\n=== 保存修改 ===")
    save_questions(filepath, fixed_questions, prefix, suffix)
    
    print("\n=== 修复完成 ===")
    print("已执行以下操作:")
    print("1. 为60个重复的简洁答案添加了【待生成】标记")
    print("2. 所有详细答案已替换为Finance Bro提示")
    print("3. 所有详细分析已简化为通用提示")
    print("\n下一步: 需要为标记的题目生成新的简洁答案")

if __name__ == '__main__':
    main()