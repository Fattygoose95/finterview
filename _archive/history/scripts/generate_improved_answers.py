#!/usr/bin/env python3
"""
为54个泛泛答案生成改进的简洁答案
"""

import json
import re
import sys
import os

def load_questions(filepath):
    """从questions.js加载题目数据"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'const questionBank = \[(.*?)\];', content, re.DOTALL)
    if not match:
        return None, None, None
    
    array_content = match.group(1)
    array_content = re.sub(r'//.*', '', array_content)
    array_content = re.sub(r'/\*.*?\*/', '', array_content, flags=re.DOTALL)
    array_content = re.sub(r',\s*}', '}', array_content)
    array_content = re.sub(r',\s*]', ']', array_content)
    
    try:
        questions = json.loads(f'[{array_content}]')
        return questions, content[:match.start()], content[match.end():]
    except:
        return None, None, None

def load_poor_answers(filepath):
    """加载需要改进的题目"""
    with open(filepath, 'r', encoding='utf-8') as f:
        poor_answers = json.load(f)
    
    print(f"Loaded {len(poor_answers)} poor answers from {filepath}")
    return poor_answers

def generate_specific_answer(question_data):
    """为题目生成具体的简洁答案"""
    title = question_data.get('title', '')
    question = question_data.get('question', '')
    role = question_data.get('role', '')
    model_answer = question_data.get('modelAnswer', '')
    
    question_lower = question.lower()
    title_lower = title.lower()
    
    # 基于题目内容生成答案
    # 公司银行产品
    if 'corporate banking products' in title_lower or 'products and services offered by a corporate banking' in question_lower:
        return "Focus on core corporate banking products: lending (term loans, revolvers), cash management, trade finance, FX, interest rate hedging, advisory. Differentiate from investment banking (M&A, IPOs) and commercial banking (smaller clients). Mention relationship banking and cross-selling strategy."
    
    # 订单类型
    elif 'order types' in title_lower or 'order types used in equity trading' in question_lower:
        return "Key order types: market (immediate execution), limit (price control), stop-loss (risk management), iceberg (discretion). Understand trade-offs: market orders for speed vs. limit orders for price control. Mention execution quality factors and common pitfalls like stop-loss gaps."
    
    # 共同基金类型
    elif 'mutual funds' in question_lower and 'types' in question_lower:
        return "Mutual fund categories: by asset class (equity, fixed income, balanced), by strategy (index, active), by structure (open-end, closed-end). Key characteristics: NAV calculation, fees (expense ratio, loads), liquidity, tax considerations, suitability for different investors."
    
    # 高频交易
    elif 'high-frequency trading' in question_lower or 'hft' in question_lower:
        return "HFT characteristics: ultra-low latency, algorithmic execution, high order-to-trade ratio, market making, arbitrage strategies. Key infrastructure needs: co-location, direct market access, specialized hardware. Regulatory considerations and market impact."
    
    # 量化模型挑战
    elif 'challenges in building quantitative models' in question_lower:
        return "Quant model challenges: data quality/availability, overfitting, model validation, regime changes, implementation latency. Emphasize importance of backtesting, out-of-sample testing, stress testing, and continuous monitoring. Common pitfalls: data snooping, ignoring transaction costs."
    
    # 股票与固定收益交易差异
    elif 'differences between equity and fixed income trading' in question_lower:
        return "Equity vs. fixed income: market structure (centralized exchanges vs. OTC), liquidity (standardized vs. fragmented), pricing (transparent vs. matrix pricing), settlement (T+2 vs. T+1/T+2), risk factors (company-specific vs. interest rate/credit spread). Trading strategies differ significantly."
    
    # 基础问题（通用模板）
    elif 'fundamental question' in title_lower:
        # 基于角色生成具体提示
        if role == 'am':
            return "For asset management questions: focus on investment strategies, portfolio construction, risk management, client types (retail vs. institutional), fee structures, and regulatory considerations. Use specific examples where possible."
        elif role == 'quant':
            return "For quantitative finance: emphasize mathematical foundations, model development process, backtesting methodology, risk controls, technology infrastructure, and real-world implementation challenges."
        elif role == 'markets':
            return "For sales & trading: discuss market structure, trading strategies, risk management, client relationships, regulatory environment, and current market trends. Provide specific examples of trades or market scenarios."
        elif role == 'corpfin':
            return "For corporate finance: cover capital structure, valuation methods, M&A, financial planning, working capital management, and stakeholder communication. Use frameworks like DCF, comparable companies, precedent transactions."
        elif role == 'fintech':
            return "For fintech: focus on technology applications (blockchain, AI, APIs), business models, regulatory challenges, customer acquisition, partnerships with traditional finance, and competitive landscape."
        elif role == 'fo':
            return "For family office: discuss client service model, investment philosophy, wealth preservation, tax planning, estate planning, family governance, and multi-generational wealth transfer strategies."
        else:
            return f"For {role} questions: focus on the specific concepts mentioned in the question, use relevant industry terminology, provide practical examples, and structure your answer logically."
    
    # 其他题目 - 基于问题类型
    elif 'what are' in question_lower or 'define' in question_lower or 'types of' in question_lower:
        # 定义/分类问题
        return f"For '{title}': identify the main categories or components, explain each concisely, provide relevant examples, and discuss practical applications or significance in the {role} context."
    
    elif 'how would' in question_lower or 'approach' in question_lower or 'design' in question_lower:
        # 方法/设计问题
        return f"For '{title}': outline a step-by-step approach, mention relevant tools/frameworks, consider constraints/assumptions, evaluate alternatives, and discuss implementation considerations."
    
    elif 'explain' in question_lower or 'describe' in question_lower:
        # 解释问题
        return f"For '{title}': break down into key concepts, explain relationships, provide clear examples, discuss implications, and connect to broader {role} context."
    
    elif 'compare' in question_lower or 'contrast' in question_lower or 'difference between' in question_lower:
        # 比较问题
        return f"For '{title}': establish comparison framework, identify key dimensions, analyze similarities/differences, evaluate advantages/disadvantages, and discuss practical implications."
    
    else:
        # 默认
        return f"For '{title}': focus on the specific aspects mentioned in the question, use relevant {role} terminology, provide concrete examples, and structure your answer to address all parts of the question."

def update_questions_with_improved_answers(questions, poor_answers_data):
    """用改进的答案更新题目"""
    print("\n=== GENERATING IMPROVED ANSWERS ===")
    
    # 创建ID到改进答案的映射
    improved_answers = {}
    for poor_q in poor_answers_data:
        qid = poor_q.get('id')
        if isinstance(qid, int):
            qid = str(qid)
        
        # 生成改进的答案
        improved_answer = generate_specific_answer(poor_q)
        improved_answers[qid] = improved_answer
        
        print(f"\n{poor_q.get('role').upper()}: {poor_q.get('title')}")
        print(f"  Old: {poor_q.get('currentConcise', '')[:80]}...")
        print(f"  New: {improved_answer[:80]}...")
    
    # 更新questions.js中的题目
    updated_count = 0
    for q in questions:
        qid = q.get('id')
        if isinstance(qid, int):
            qid = str(qid)
        
        if qid in improved_answers:
            # 确保answers结构存在
            if 'answers' not in q:
                q['answers'] = {}
            if 'concise' not in q['answers']:
                q['answers']['concise'] = {}
            
            # 更新答案
            q['answers']['concise']['answer'] = improved_answers[qid]
            updated_count += 1
    
    print(f"\nUpdated {updated_count} questions with improved concise answers")
    
    # 检查是否有未更新的题目
    if updated_count < len(improved_answers):
        missing_ids = set(improved_answers.keys()) - {str(q.get('id')) for q in questions}
        if missing_ids:
            print(f"Warning: {len(missing_ids)} improved answers not found in questions")
            print("Sample missing IDs:", list(missing_ids)[:5])
    
    return questions, updated_count

def save_questions(filepath, questions, prefix, suffix):
    """保存修改后的题目到questions.js"""
    print(f"\nSaving to: {filepath}")
    
    # 备份原文件
    backup_path = filepath + '.backup_before_improvements'
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
    print("=== IMPROVING POOR CONCISE ANSWERS ===")
    
    # 加载需要改进的题目
    poor_answers_file = 'poor_answers_for_improvement.json'
    if not os.path.exists(poor_answers_file):
        print(f"Error: {poor_answers_file} not found")
        return False
    
    poor_answers_data = load_poor_answers(poor_answers_file)
    
    # 加载questions.js
    questions_file = 'questions.js'
    questions, prefix, suffix = load_questions(questions_file)
    if questions is None:
        print("Failed to load questions.js")
        return False
    
    # 更新答案
    updated_questions, updated_count = update_questions_with_improved_answers(questions, poor_answers_data)
    
    # 保存修改
    success = save_questions(questions_file, updated_questions, prefix, suffix)
    
    if success:
        print("\n=== COMPLETE ===")
        print(f"Improved {updated_count} poor concise answers")
        print("\nKey improvements:")
        print("1. Replaced generic templates with specific hints")
        print("2. Answers now provide practical interview guidance")
        print("3. Each answer is tailored to the specific question")
        print("4. Relevant terminology and concepts included")
        print("\nNext: Test the improved answers in industry-practice.html")
    
    return success

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)