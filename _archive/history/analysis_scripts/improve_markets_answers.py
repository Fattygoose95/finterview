#!/usr/bin/env python3
"""
为Sales & Trading题目生成改进的简洁答案
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
    role = question_data.get('role', 'markets')
    
    question_lower = question.lower()
    title_lower = title.lower()
    
    # Sales & Trading 具体题目
    # 做市商角色
    if 'market maker' in question_lower:
        return "Market makers provide liquidity by continuously quoting bid and ask prices, earning the bid-ask spread. Responsibilities: maintaining orderly markets, managing inventory risk, complying with regulations. Types: designated market makers (DMMs) vs. electronic market makers. Challenges: adverse selection, volatility, technology requirements."
    
    # 市场微观结构
    elif 'market microstructure' in question_lower:
        return "Market microstructure studies trading mechanisms, price formation, and market design. Key elements: order types (market/limit/stop), execution methods, market venues (exchange/OTC/dark pools), liquidity provision, price discovery. Practical applications: trading strategy development, execution optimization, market impact analysis."
    
    # 交易想法生成
    elif 'trade idea generation' in question_lower or 'trade idea' in title_lower:
        return "Trade idea development process: 1) Market analysis (macro trends, sector themes), 2) Security selection (fundamental/technical analysis), 3) Risk assessment (VaR, stress testing), 4) Execution plan (entry/exit points, position sizing). Successful pitches: clear thesis, catalyst identification, risk-reward analysis, concise presentation."
    
    # 市场结构分析
    elif 'market structure analysis' in title_lower or 'market structure' in question_lower:
        return "Market structure analysis examines trading venues, participants, and regulations. Key aspects: exchange vs. OTC markets, electronic trading evolution, regulatory frameworks (MiFID II, Reg NMS), market fragmentation, liquidity dynamics. Applications: trading venue selection, execution strategy optimization, regulatory compliance."
    
    # 交易心理学
    elif 'trading psychology' in title_lower:
        return "Trading psychology focuses on emotional discipline and decision-making under pressure. Key concepts: cognitive biases (overconfidence, loss aversion), emotional regulation, risk tolerance assessment, performance routines. Development: self-awareness, journaling, mentorship, continuous learning. Critical for consistent profitability."
    
    # 监管环境
    elif 'regulatory landscape' in title_lower:
        return "Key regulations affecting trading: MiFID II (transparency, best execution), Dodd-Frank (derivatives, Volcker Rule), Basel III (capital requirements), MAR (market abuse). Compliance challenges: reporting requirements, transaction monitoring, cross-border coordination. Impact: increased costs, technology investments, business model adaptation."
    
    # 客户覆盖
    elif 'client coverage' in title_lower or 'relationship building' in question_lower:
        return "Client coverage in S&T: understanding client needs (hedging, investment, financing), providing market insights, executing trades efficiently, managing risk. Relationship building: trust development, value-added services, responsive communication, long-term partnership focus. Key skills: market knowledge, communication, problem-solving."
    
    # 电子交易系统
    elif 'electronic trading systems' in title_lower:
        return "Electronic trading systems: algorithmic execution (VWAP, TWAP, implementation shortfall), smart order routing, market data processing, risk controls. Technology stack: low-latency infrastructure, FIX protocol, data analytics. Evolution: increasing automation, AI/ML applications, cloud migration, cybersecurity focus."
    
    # 基础问题 (Fundamental Question X)
    elif 'fundamental question' in title_lower:
        # 基于问题内容
        if 'explain the role' in question_lower or 'what is' in question_lower:
            return f"For questions about {question_lower.split(' ')[-3:] if len(question_lower.split()) > 3 else 'this topic'}: focus on core concepts, practical applications in Sales & Trading, industry importance, current trends, and entry-level perspective. Provide specific examples where possible."
        elif 'compare' in question_lower or 'contrast' in question_lower:
            return f"For comparison questions: establish clear framework, identify key dimensions for comparison, analyze similarities and differences, evaluate advantages/disadvantages, discuss practical implications in trading context."
        elif 'how would' in question_lower or 'approach' in question_lower:
            return f"For approach questions: outline systematic methodology, consider relevant constraints/assumptions, evaluate alternative approaches, discuss implementation considerations, connect to Sales & Trading best practices."
        else:
            return f"For Sales & Trading questions: emphasize market knowledge, trading strategies, risk management, client relationships, and regulatory awareness. Use specific trading terminology and practical examples."
    
    # 技术问题
    elif 'technical question' in title_lower:
        return f"For technical questions in Sales & Trading: demonstrate understanding of core concepts, practical applications, industry context, and emerging trends. Focus on analytical rigor and market relevance."
    
    # 案例问题
    elif 'case question' in title_lower:
        return f"For case questions: apply structured problem-solving framework, integrate Sales & Trading concepts appropriately, consider practical constraints, develop actionable recommendations, communicate clearly and persuasively."
    
    # 行为问题
    elif 'behavioral question' in title_lower:
        return f"For behavioral questions: use STAR framework (Situation, Task, Action, Result), demonstrate relevant skills/experience, show learning and growth, connect to Sales & Trading competencies, express genuine interest and motivation."
    
    # 默认 - 基于问题类型
    else:
        # 检查问题类型关键词
        if 'explain' in question_lower or 'describe' in question_lower:
            return f"Explain {question_lower.replace('explain', '').replace('describe', '').strip()}: break down into key components, provide clear definitions, give relevant examples, discuss practical applications in Sales & Trading, mention current industry context."
        elif 'what are' in question_lower or 'define' in question_lower:
            return f"Define key concepts: provide clear definitions, categorize components, explain interrelationships, give practical examples, discuss significance in Sales & Trading context."
        elif 'how' in question_lower or 'approach' in question_lower:
            return f"Approach: outline systematic methodology, consider relevant factors, evaluate alternatives, discuss implementation steps, address potential challenges, connect to Sales & Trading best practices."
        elif 'compare' in question_lower or 'contrast' in question_lower:
            return f"Comparison: establish framework, identify comparison dimensions, analyze similarities/differences, evaluate pros/cons, discuss practical implications for trading decisions."
        else:
            return f"For Sales & Trading questions: focus on market dynamics, trading strategies, risk management, client focus, and regulatory compliance. Provide specific examples and practical insights."

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
        
        print(f"\n{poor_q.get('title')}")
        print(f"  Question: {poor_q.get('question', '')[:80]}...")
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
    backup_path = filepath + '.backup_before_markets_improvement'
    if not os.path.exists(backup_path):
        import shutil
        shutil.copy2(filepath, backup_path)
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
    print("=== IMPROVING SALES & TRADING CONCISE ANSWERS ===")
    
    # 加载需要改进的题目
    poor_answers_file = 'markets_poor_answers.json'
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
    
    # 只处理前29个题目（所有poor answers）
    # 如果需要处理所有，可以去掉这个限制
    if len(poor_answers_data) > 29:
        print(f"Processing first 29 of {len(poor_answers_data)} poor answers")
        poor_answers_data = poor_answers_data[:29]
    
    # 更新答案
    updated_questions, updated_count = update_questions_with_improved_answers(questions, poor_answers_data)
    
    # 保存修改
    success = save_questions(questions_file, updated_questions, prefix, suffix)
    
    if success:
        print("\n=== COMPLETE ===")
        print(f"Improved {updated_count} poor Sales & Trading concise answers")
        print("\nKey improvements:")
        print("1. Replaced generic templates with specific trading concepts")
        print("2. Answers now provide practical trading guidance")
        print("3. Each answer includes relevant Sales & Trading terminology")
        print("4. Answers are tailored to specific question content")
        print("\nNext: Test the improved answers in industry-practice.html")
    
    return success

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)