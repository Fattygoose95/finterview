#!/usr/bin/env python3
"""
批量生成简洁答案
基于题目内容创建提示性答案模板
"""

import json
import re
import sys

def generate_concise_answer(question_data):
    """基于题目数据生成简洁答案"""
    title = question_data.get('title', '')
    question = question_data.get('question', '')
    role = question_data.get('role', '')
    category = question_data.get('category', '')
    difficulty = question_data.get('difficulty', '')
    
    # 提取问题的核心
    question_lower = question.lower()
    
    # 基于问题类型生成答案
    if 'fundamental question' in title.lower():
        # 基础问题 - 通用提示
        if 'types of financial risk' in question_lower:
            return "Focus on the 5 main categories: market, credit, operational, liquidity, and strategic risk. Mention how they differ and provide examples for each."
        
        elif 'credit risk' in question_lower:
            return "Key points: 1) Definition - risk of loss from borrower default 2) Measurement - PD, LGD, EAD 3) Mitigation - collateral, covenants, diversification."
        
        elif 'value at risk' in question_lower and 'var' in question_lower:
            return "Remember VaR basics: 1) What it measures (potential loss at confidence level) 2) Key parameters (confidence, time horizon) 3) Limitations (tail risk, assumptions)."
        
        elif 'stress testing' in question_lower:
            return "Stress testing involves: 1) Designing extreme scenarios 2) Assessing impact on portfolio 3) Informing risk appetite. Mention regulatory requirements and practical applications."
        
        elif 'basel regulatory framework' in question_lower:
            return "Basel framework pillars: 1) Minimum capital requirements 2) Supervisory review 3) Market discipline. Know the progression from Basel I to III/IV."
        
        elif 'operational risk' in question_lower:
            return "Operational risk categories: people, processes, systems, external events. Measurement approaches: basic indicator, standardized, advanced measurement."
        
        elif 'counterparty risk' in question_lower:
            return "Counterparty risk management: exposure measurement, credit limits, collateralization, netting agreements, credit valuation adjustment (CVA)."
        
        elif 'systematic and unsystematic risk' in question_lower:
            return "Key distinction: Systematic (market-wide, non-diversifiable) vs. unsystematic (firm-specific, diversifiable). CAPM framework: beta measures systematic risk exposure."
        
        elif 'risk appetite' in question_lower:
            return "Risk appetite framework: 1) Define tolerance levels 2) Align with strategy 3) Communicate across organization 4) Monitor compliance."
        
        elif 'role does risk management play' in question_lower:
            return "Risk management supports: 1) Strategic decision-making 2) Capital allocation 3) Regulatory compliance 4) Stakeholder confidence 5) Sustainable growth."
        
        else:
            # 通用基础问题提示
            return "Focus on fundamental concepts, definitions, and practical applications. Structure your answer with clear categories and examples."
    
    # 具体风险管理主题
    elif 'model risk management' in title.lower():
        if 'technical' in category.lower():
            return "Model risk management challenges: model validation, documentation, governance, ongoing monitoring. Address through robust frameworks and independent review."
        elif 'behavioral' in category.lower():
            return "Explain model risk simply: 'garbage in, garbage out' concept. Emphasize importance of understanding model limitations and assumptions."
    
    elif 'operational risk framework' in title.lower():
        if 'technical' in category.lower():
            return "Operational risk frameworks: 1) Identify risks 2) Assess magnitude 3) Control/mitigate 4) Monitor/report. Know key frameworks like COSO, ISO 31000."
        elif 'behavioral' in category.lower():
            return "Share specific example: process improvement that reduced errors, system implementation that enhanced controls, or incident response that minimized losses."
    
    elif 'basel regulations' in title.lower():
        return "Basel principles: risk-based capital, leverage ratio, liquidity requirements. Know the three pillars and their implementation challenges."
    
    elif 'liquidity risk measurement' in title.lower():
        return "Liquidity metrics: LCR, NSFR, liquidity gaps, funding concentration. Stress testing for liquidity scenarios is crucial."
    
    elif 'enterprise risk management' in title.lower():
        return "ERM integrates risk across organization: strategic, operational, financial, compliance risks. Focus on value protection and creation."
    
    elif 'risk appetite statement' in title.lower():
        return "Risk appetite statement should be: 1) Quantitative and qualitative 2) Board-approved 3) Cascaded to business units 4) Regularly reviewed."
    
    elif 'climate risk assessment' in title.lower():
        return "Climate risk approaches: physical (acute/chronic) vs. transition risks. TCFD framework: governance, strategy, risk management, metrics/targets."
    
    elif 'stress testing scenarios' in title.lower():
        return "Scenario design: historical, hypothetical, reverse stress tests. Include market shocks, economic downturns, operational failures."
    
    elif 'counterparty credit risk' in title.lower():
        return "Counterparty risk measures: exposure at default, potential future exposure, credit valuation adjustment. Mitigation via collateral, netting, clearing."
    
    # 通用答案模板
    generic_templates = {
        'technical': "Focus on: 1) Key concepts and definitions 2) Methodologies and models 3) Practical applications 4) Current industry practices.",
        'behavioral': "Structure with STAR: Situation, Task, Action, Result. Be specific about your role, challenges faced, and impact created.",
        'case': "Framework: 1) Analyze the problem 2) Identify key issues 3) Propose solutions 4) Evaluate trade-offs 5) Recommend implementation plan.",
        'market': "Consider: 1) Current market conditions 2) Key drivers and trends 3) Impact on the business 4) Strategic implications."
    }
    
    # 返回适合类别的通用模板
    for cat, template in generic_templates.items():
        if cat in category.lower():
            return template
    
    # 默认通用答案
    return f"Focus on key concepts, practical applications, and industry context for {title}. Structure your answer clearly with main points and examples."

def process_batch(batch_file, output_file):
    """处理批次文件并生成答案"""
    print(f"Processing batch: {batch_file}")
    
    with open(batch_file, 'r', encoding='utf-8') as f:
        batches = json.load(f)
    
    generated_answers = []
    
    for batch in batches:
        role = batch.get('role', 'unknown')
        batch_num = batch.get('batch_number', 1)
        questions = batch.get('questions', [])
        
        print(f"\n{role.upper()} - Batch {batch_num}: {len(questions)} questions")
        
        for q in questions:
            qid = q.get('id')
            title = q.get('title', '')
            
            # 生成简洁答案
            concise_answer = generate_concise_answer(q)
            
            generated_answers.append({
                'id': qid,
                'title': title,
                'conciseAnswer': concise_answer,
                'role': role,
                'batch': batch_num
            })
            
            print(f"  ✓ {qid}: {title[:50]}...")
    
    # 保存生成的答案
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(generated_answers, f, indent=2, ensure_ascii=False)
    
    print(f"\nGenerated {len(generated_answers)} concise answers")
    print(f"Saved to {output_file}")
    
    return generated_answers

def main():
    """主函数"""
    print("=== BATCH CONCISE ANSWER GENERATION ===")
    
    # 处理Risk Management批次
    risk_answers = process_batch('risk_generation_batches.json', 'risk_concise_answers.json')
    
    # 显示示例
    print("\n=== SAMPLE GENERATED ANSWERS ===")
    for i, ans in enumerate(risk_answers[:5]):
        print(f"\n{i+1}. {ans['title']}")
        print(f"   Answer: {ans['conciseAnswer']}")
    
    # 提供更新脚本
    print("\n=== NEXT STEPS ===")
    print("1. Review generated answers in risk_concise_answers.json")
    print("2. Run update_answers.py to apply these answers to questions.js")
    print("3. Test the updated questions in industry-practice.html")

if __name__ == '__main__':
    main()