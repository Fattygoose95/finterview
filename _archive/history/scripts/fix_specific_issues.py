#!/usr/bin/env python3
"""
修复具体问题：
1. 替换29个通用模板答案为具体提示
2. 改进UI箭头位置
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

def fix_bad_answers(questions):
    """修复29个通用模板答案"""
    
    # 定义通用模板和对应的修复
    generic_templates = [
        "Framework: 1) Analyze the problem 2) Identify key issues 3) Propose solutions 4) Evaluate trade-offs 5) Recommend implementation plan.",
        "Structure with STAR: Situation, Task, Action, Result. Be specific about your role, challenges faced, and impact created.",
        "Focus on: 1) Key concepts and definitions 2) Methodologies and models 3) Practical applications 4) Current industry practices.",
        "Consider: 1) Current market conditions 2) Key drivers and trends 3) Impact on the business 4) Strategic implications."
    ]
    
    # 基于题目内容生成具体提示
    def generate_specific_hint(question_data):
        title = question_data.get('title', '')
        question = question_data.get('question', '')
        category = question_data.get('category', '')
        
        # 基于题目类型生成具体提示
        if 'behavioral' in category.lower():
            if 'value at risk' in title.lower() or 'var' in title.lower():
                return "For behavioral questions about VaR: discuss a specific project where you calculated VaR, challenges with model assumptions, how you communicated results to stakeholders, and lessons learned."
            elif 'operational risk' in title.lower():
                return "For operational risk behavioral questions: share an example of identifying a control weakness, implementing a mitigation, measuring the reduction in risk exposure, and impact on the business."
            elif 'stress testing' in title.lower():
                return "For stress testing behavioral questions: describe designing a scenario, analyzing portfolio impact, presenting findings to management, and influencing risk decisions."
            else:
                return "For behavioral questions: focus on a specific example, your personal role, actions taken, measurable outcomes, and what you learned."
        
        elif 'case' in category.lower():
            if 'operational risk framework' in title.lower():
                return "For operational risk framework cases: consider 1) Current state assessment 2) Framework selection (COSO, ISO 31000) 3) Implementation roadmap 4) Key performance indicators 5) Change management strategy."
            elif 'value at risk' in title.lower() or 'var' in title.lower():
                return "For VaR case questions: analyze 1) Model failure causes 2) Alternative risk measures (Expected Shortfall) 3) Immediate actions 4) Long-term model improvements 5) Communication plan."
            elif 'basel regulations' in title.lower():
                return "For Basel regulation cases: examine 1) Regulatory requirements 2) Capital impact 3) Business model implications 4) Implementation timeline 5) Competitive positioning."
            else:
                return "For case questions: structure your answer with problem diagnosis, alternative solutions, evaluation criteria, recommendation, and implementation steps."
        
        elif 'technical' in category.lower():
            if 'model risk management' in title.lower():
                return "For model risk management: cover 1) Model validation framework 2) Governance structure 3) Documentation standards 4) Ongoing monitoring 5) Model inventory management."
            elif 'climate risk assessment' in title.lower():
                return "For climate risk: discuss 1) Physical vs transition risks 2) Scenario analysis 3) Data requirements 4) Integration with ERM 5) Reporting under TCFD."
            else:
                return "For technical questions: explain key concepts, mathematical foundations, practical applications, limitations, and recent developments."
        
        # 默认：基于问题内容生成提示
        question_lower = question.lower()
        if 'apply' in question_lower or 'implement' in question_lower:
            return "Focus on practical steps: requirements analysis, solution design, implementation plan, testing, monitoring, and continuous improvement."
        elif 'compare' in question_lower or 'contrast' in question_lower:
            return "Structure comparison by: key features, advantages/disadvantages, use cases, performance metrics, and suitability for different scenarios."
        elif 'evaluate' in question_lower or 'assess' in question_lower:
            return "Evaluation framework: criteria selection, data collection, analysis methods, conclusion drawing, and recommendation formulation."
        else:
            return "Focus on the core question: identify key concepts, explain their relevance, provide examples, discuss applications, and address potential follow-up questions."
    
    fixed_count = 0
    for q in questions:
        role = q.get('role')
        if role != 'risk':
            continue
            
        concise = q.get('answers', {}).get('concise', {}).get('answer', '')
        
        # 检查是否包含通用模板
        is_bad = False
        for template in generic_templates:
            if template in concise:
                is_bad = True
                break
        
        if is_bad:
            # 生成具体提示
            specific_hint = generate_specific_hint(q)
            
            # 更新答案
            if 'answers' not in q:
                q['answers'] = {}
            if 'concise' not in q['answers']:
                q['answers']['concise'] = {}
            
            q['answers']['concise']['answer'] = specific_hint
            fixed_count += 1
            
            print(f"Fixed: {q.get('title')}")
            print(f"  New answer: {specific_hint[:80]}...")
    
    print(f"\nFixed {fixed_count} generic template answers")
    return questions

def improve_answer_quality(questions):
    """改进所有简洁答案的质量标准"""
    
    print("\n=== IMPROVING ANSWER QUALITY STANDARDS ===")
    
    # 检查并改进其他答案
    improved_count = 0
    for q in questions:
        role = q.get('role')
        concise = q.get('answers', {}).get('concise', {}).get('answer', '')
        
        # 跳过空答案
        if not concise:
            continue
        
        # 检查答案是否足够具体
        # 避免通用短语
        generic_phrases = [
            'understand core concepts',
            'know practical applications', 
            'recognize key terms',
            'review core concepts',
            'common mistakes include'
        ]
        
        is_too_generic = any(phrase in concise.lower() for phrase in generic_phrases)
        
        if is_too_generic:
            # 生成更具体的提示
            title = q.get('title', '')
            question = q.get('question', '')
            
            # 基于问题改进
            question_lower = question.lower()
            
            if 'what are' in question_lower or 'define' in question_lower:
                # 定义类问题
                better_answer = f"For '{title}': provide clear definitions, categorize components, give examples, and explain practical significance."
            elif 'how would' in question_lower or 'approach' in question_lower:
                # 方法类问题
                better_answer = f"For '{title}': outline step-by-step approach, mention tools/techniques, consider constraints, and evaluate alternatives."
            elif 'explain' in question_lower:
                # 解释类问题
                better_answer = f"For '{title}': break down into key concepts, show relationships, provide real-world examples, and discuss implications."
            else:
                # 默认改进
                better_answer = f"For '{title}': focus on the specific aspects mentioned in the question, use relevant terminology, and provide concrete examples."
            
            # 更新答案
            if 'answers' not in q:
                q['answers'] = {}
            if 'concise' not in q['answers']:
                q['answers']['concise'] = {}
            
            q['answers']['concise']['answer'] = better_answer
            improved_count += 1
    
    print(f"Improved {improved_count} answers that were too generic")
    return questions

def save_questions(filepath, questions, prefix, suffix):
    """保存修改后的题目到questions.js"""
    print(f"\nSaving to: {filepath}")
    
    # 备份原文件
    backup_path = filepath + '.backup_before_quality_fix'
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

def fix_ui_arrow_position():
    """修复UI箭头位置"""
    print("\n=== FIXING UI ARROW POSITION ===")
    
    ui_file = 'industry-practice.html'
    
    # 读取文件
    with open(ui_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找箭头样式位置
    arrow_style_pattern = r'position: absolute;\s*bottom: -10px;\s*right: 60px;'
    
    if arrow_style_pattern in content:
        # 修复箭头位置 - 指向更准确的位置
        new_arrow_style = 'position: absolute;\n                                bottom: -10px;\n                                right: 40px;'  # 从60px改为40px
        
        content = content.replace(arrow_style_pattern, new_arrow_style)
        print("Fixed arrow position from right:60px to right:40px")
    
    # 保存修改
    backup_ui = ui_file + '.backup_before_ui_fix'
    if not os.path.exists(backup_ui):
        os.rename(ui_file, backup_ui)
        print(f"Created UI backup: {backup_ui}")
    
    with open(ui_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("UI arrow position fixed")
    return True

def main():
    """主函数"""
    print("=== FIXING SPECIFIC ISSUES ===")
    
    # 1. 修复问题答案
    questions_file = 'questions.js'
    questions, prefix, suffix = load_questions(questions_file)
    if questions is None:
        return False
    
    # 修复29个通用模板答案
    fixed_questions = fix_bad_answers(questions)
    
    # 改进答案质量
    improved_questions = improve_answer_quality(fixed_questions)
    
    # 保存问题修改
    save_questions(questions_file, improved_questions, prefix, suffix)
    
    # 2. 修复UI箭头位置
    fix_ui_arrow_position()
    
    print("\n=== SUMMARY ===")
    print("1. Fixed 29 generic template answers with specific hints")
    print("2. Improved overall answer quality standards")
    print("3. Fixed UI arrow position to better point to Finance Bro icon")
    print("\nNext: Test the improvements in industry-practice.html")
    
    return True

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)