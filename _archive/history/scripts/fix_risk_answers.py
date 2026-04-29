#!/usr/bin/env python3
"""
修复Risk Management题目的答案质量
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
        return None, None
    
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
        # 尝试更激进的修复
        try:
            # 移除所有空白字符中的换行（但保留字符串中的）
            lines = array_content.split('\n')
            cleaned_lines = []
            in_string = False
            for line in lines:
                if '"' in line:
                    # 简单处理字符串状态
                    quote_count = line.count('"')
                    if quote_count % 2 == 1:
                        in_string = not in_string
                if not in_string and line.strip().startswith('//'):
                    continue
                cleaned_lines.append(line)
            array_content = '\n'.join(cleaned_lines)
            questions = json.loads(f'[{array_content}]')
            print(f"成功加载 {len(questions)} 个题目（经过修复）")
            return questions, content[:match.start()], content[match.end():]
        except Exception as e2:
            print(f"二次解析失败: {e2}")
            return None, None, None

def save_questions(filepath, questions, prefix, suffix):
    """保存修改后的题目到questions.js"""
    print(f"正在保存到: {filepath}")
    
    # 将题目转换为JSON字符串
    questions_json = json.dumps(questions, indent=2, ensure_ascii=False)
    
    # 构建完整内容
    full_content = prefix + 'const questionBank = ' + questions_json + ';' + suffix
    
    # 备份原文件
    backup_path = filepath + '.backup'
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
    concise_placeholder_added = 0
    
    for q in risk_questions:
        qid = q.get('id', '未知ID')
        title = q.get('title', '未知标题')
        
        # 1. 检查并修复answers.concise
        if 'answers' not in q:
            q['answers'] = {}
        
        if 'concise' not in q['answers']:
            q['answers']['concise'] = {}
            concise_placeholder_added += 1
        
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
        
        is_bad = any(template in current_concise for template in bad_templates)
        
        if is_bad or not current_concise.strip():
            # 标记需要生成新答案
            q['answers']['concise']['answer'] = f"【待生成】{title}的简洁提示答案"
            q['_needs_fix'] = True
            fixed_count += 1
        
        # 2. 移除或清空详细答案
        if 'detailed' in q['answers']:
            # 保留结构但清空内容
            q['answers']['detailed']['answer'] = "需要详细解释？点击右侧的Finance Bro助手获取个性化解答！"
        
        # 3. 简化detailedAnalysis
        if 'detailedAnalysis' in q:
            # 简化为基本提示
            q['detailedAnalysis'] = {
                'tip': '这是一个风险管理题目，确保回答结构清晰、覆盖所有要点。',
                'commonMistakes': '常见错误包括遗漏关键风险类别或混淆不同风险类型。',
                'improvementTips': '练习时尝试用自己的话解释概念，确保真正理解而不仅仅是记忆。'
            }
    
    print(f"标记了 {fixed_count} 个需要修复简洁答案的题目")
    print(f"添加了 {concise_placeholder_added} 个简洁答案占位符")
    
    return questions

def analyze_current_answers(questions):
    """分析当前答案状态"""
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    
    concise_answers = []
    detailed_answers = []
    
    for q in risk_questions[:10]:  # 只分析前10个
        concise = q.get('answers', {}).get('concise', {}).get('answer', '')
        detailed = q.get('answers', {}).get('detailed', {}).get('answer', '')
        
        concise_answers.append(concise[:100])
        detailed_answers.append(detailed[:100])
    
    print("\n=== 当前答案分析（前10个Risk题目）===")
    print(f"简洁答案样本:")
    for i, ans in enumerate(concise_answers[:3]):
        print(f"  {i+1}. {ans}")
    
    print(f"\n详细答案样本:")
    for i, ans in enumerate(detailed_answers[:3]):
        print(f"  {i+1}. {ans}")
    
    # 检查重复
    from collections import Counter
    concise_counter = Counter(concise_answers)
    detailed_counter = Counter(detailed_answers)
    
    print(f"\n重复统计:")
    print(f"  唯一简洁答案: {len(concise_counter)}")
    print(f"  唯一详细答案: {len(detailed_counter)}")
    
    if len(concise_counter) < len(risk_questions[:10]):
        print(f"  警告: 简洁答案有重复！")
    
    if len(detailed_counter) < len(risk_questions[:10]):
        print(f"  警告: 详细答案有重复！")

def main():
    """主函数"""
    filepath = 'questions.js'
    
    # 加载题目
    questions, prefix, suffix = load_questions(filepath)
    if questions is None:
        print("加载失败，退出")
        return
    
    # 分析当前状态
    analyze_current_answers(questions)
    
    # 修复Risk Management题目
    print("\n=== 开始修复Risk Management题目 ===")
    fixed_questions = fix_risk_questions(questions)
    
    # 保存修改
    save = input("\n是否保存修改？(y/n): ").lower().strip()
    if save == 'y':
        save_questions(filepath, fixed_questions, prefix, suffix)
        print("修改已保存")
    else:
        print("取消保存，退出")
    
    # 显示需要修复的题目列表
    risk_to_fix = [q for q in fixed_questions if q.get('role') == 'risk' and q.get('_needs_fix')]
    if risk_to_fix:
        print(f"\n需要生成新简洁答案的题目 ({len(risk_to_fix)}个):")
        for i, q in enumerate(risk_to_fix[:5]):
            print(f"  {i+1}. ID{q.get('id')}: {q.get('title')}")
        if len(risk_to_fix) > 5:
            print(f"  ... 还有{len(risk_to_fix)-5}个题目")

if __name__ == '__main__':
    main()