#!/usr/bin/env python3
"""
分析Sales & Trading (markets)题目的简洁答案质量
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

def analyze_markets_answers(questions):
    """分析Sales & Trading题目"""
    print("\n=== ANALYZING SALES & TRADING (MARKETS) ANSWERS ===")
    
    markets_questions = [q for q in questions if q.get('role') == 'markets']
    print(f"Found {len(markets_questions)} Sales & Trading questions")
    
    if not markets_questions:
        print("No Sales & Trading questions found!")
        return
    
    # 分析答案质量
    quality_categories = {
        'excellent': [],  # 具体、专业、实用
        'good': [],       # 基本可用
        'poor': [],       # 泛泛、模板化
        'missing': []     # 没有答案
    }
    
    # 更严格的泛泛模板检查
    generic_patterns = [
        r'^For\s+[\'"].*[\'"]:\s+',  # 以"For '...':"开头
        r'provide clear definition',
        r'explain key concepts',
        r'structure your answer',
        r'focus on a specific example',
        r'for behavioral questions',
        r'for case questions',
        r'for technical questions',
        r'^key points:',
        r'remember the',
        r'provide practical',
        r'categorize into',
        r'break down into',
        r'outline step-by-step',
        r'identify the main',
        r'discuss.*framework'
    ]
    
    for q in markets_questions:
        qid = q.get('id', 'unknown')
        title = q.get('title', '')
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        
        if not concise:
            quality_categories['missing'].append((qid, title, concise))
            continue
        
        # 检查是否泛泛（更严格）
        is_generic = False
        for pattern in generic_patterns:
            if re.search(pattern, concise.lower()):
                is_generic = True
                break
        
        # 检查是否包含具体交易术语
        trading_terms = [
            'market making', 'arbitrage', 'liquidity', 'bid-ask spread',
            'volatility', 'derivatives', 'options', 'futures', 'swaps',
            'fixed income', 'equity', 'fx', 'foreign exchange',
            'risk management', 'var', 'value at risk', 'stress testing',
            'execution', 'algorithmic trading', 'high frequency',
            'portfolio', 'hedging', 'speculation', 'market microstructure',
            'order types', 'limit order', 'market order', 'stop loss'
        ]
        
        has_trading_terms = any(term in concise.lower() for term in trading_terms)
        word_count = len(concise.split())
        
        if is_generic and not has_trading_terms:
            quality_categories['poor'].append((qid, title, concise))
        elif has_trading_terms and word_count >= 15:
            quality_categories['excellent'].append((qid, title, concise))
        else:
            quality_categories['good'].append((qid, title, concise))
    
    # 打印统计结果
    print(f"\nQuality Distribution:")
    print(f"  Excellent: {len(quality_categories['excellent'])}")
    print(f"  Good: {len(quality_categories['good'])}")
    print(f"  Poor: {len(quality_categories['poor'])}")
    print(f"  Missing: {len(quality_categories['missing'])}")
    print(f"  Total: {len(markets_questions)}")
    
    # 显示示例
    if quality_categories['poor']:
        print(f"\n=== EXAMPLES OF POOR ANSWERS (需要改进) ===")
        for i, (qid, title, concise) in enumerate(quality_categories['poor'][:5]):
            print(f"\n{i+1}. ID: {qid} - {title}")
            print(f"   Answer: {concise[:150]}..." if len(concise) > 150 else f"   Answer: {concise}")
    
    if quality_categories['excellent']:
        print(f"\n=== EXAMPLES OF EXCELLENT ANSWERS (优秀示例) ===")
        for i, (qid, title, concise) in enumerate(quality_categories['excellent'][:3]):
            print(f"\n{i+1}. ID: {qid} - {title}")
            print(f"   Answer: {concise[:150]}..." if len(concise) > 150 else f"   Answer: {concise}")
    
    if quality_categories['good']:
        print(f"\n=== EXAMPLES OF GOOD ANSWERS (良好但可改进) ===")
        for i, (qid, title, concise) in enumerate(quality_categories['good'][:3]):
            print(f"\n{i+1}. ID: {qid} - {title}")
            print(f"   Answer: {concise[:150]}..." if len(concise) > 150 else f"   Answer: {concise}")
    
    # 保存需要改进的题目
    if quality_categories['poor']:
        poor_data = []
        for qid, title, concise in quality_categories['poor']:
            # 找到完整题目信息
            full_q = next((q for q in markets_questions if str(q.get('id')) == str(qid)), None)
            if full_q:
                poor_data.append({
                    'id': qid,
                    'title': title,
                    'question': full_q.get('question', ''),
                    'modelAnswer': full_q.get('modelAnswer', ''),
                    'currentConcise': concise
                })
        
        with open('markets_poor_answers.json', 'w', encoding='utf-8') as f:
            json.dump(poor_data, f, indent=2, ensure_ascii=False)
        print(f"\nSaved {len(poor_data)} poor answers to 'markets_poor_answers.json'")
    
    return quality_categories

def generate_improvement_guidelines():
    """生成改进指南"""
    print("\n=== IMPROVEMENT GUIDELINES FOR SALES & TRADING ===")
    print("\nSales & Trading答案应该包含以下元素:")
    print("1. 具体交易概念 (market making, arbitrage, liquidity, bid-ask spread等)")
    print("2. 市场结构知识 (exchange vs OTC, order types, execution methods)")
    print("3. 风险管理术语 (VaR, stress testing, position limits, hedging)")
    print("4. 产品知识 (equity, fixed income, derivatives, structured products)")
    print("5. 实际交易场景 (如何应对市场波动, 客户互动, 风险管理)")
    
    print("\n示例改进:")
    print("\nBAD: 'For equity trading questions: provide clear definition...'")
    print("GOOD: 'Discuss equity trading: market structure (exchange vs dark pools), order types (market, limit, stop), execution strategies (VWAP, TWAP), liquidity considerations, risk management (position limits, VaR).'")
    
    print("\nBAD: 'For fixed income questions: explain key concepts...'")
    print("GOOD: 'Explain fixed income trading: bond pricing (clean vs dirty price, yield to maturity), market structure (OTC, matrix pricing), risk measures (duration, convexity), trading strategies (curve trades, relative value), liquidity challenges.'")

def main():
    """主函数"""
    questions = load_questions('questions.js')
    if not questions:
        return
    
    quality_categories = analyze_markets_answers(questions)
    
    if quality_categories:
        print(f"\n=== ACTION PLAN ===")
        print(f"1. Total Sales & Trading questions: {sum(len(v) for v in quality_categories.values())}")
        print(f"2. Need improvement (Poor): {len(quality_categories['poor'])}")
        
        total = sum(len(v) for v in quality_categories.values())
        excellent_pct = len(quality_categories['excellent']) / total * 100 if total > 0 else 0
        print(f"3. Excellent percentage: {excellent_pct:.1f}%")
        
        print(f"4. Priority order:")
        print(f"   - Fix poor answers first ({len(quality_categories['poor'])})")
        print(f"   - Then improve good answers ({len(quality_categories['good'])})")
        print(f"   - Finally enhance excellent answers ({len(quality_categories['excellent'])})")
        
        generate_improvement_guidelines()

if __name__ == '__main__':
    main()