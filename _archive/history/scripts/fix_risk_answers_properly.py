#!/usr/bin/env python3
"""
为Risk题目生成真正有用的简洁答案
基于具体题目内容，提供针对性提示
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

def generate_specific_hint(question_data):
    """为具体题目生成有用的提示"""
    title = question_data.get('title', '')
    question = question_data.get('question', '')
    model_answer = question_data.get('modelAnswer', '')
    category = question_data.get('category', '')
    
    question_lower = question.lower()
    title_lower = title.lower()
    
    # 分析问题类型和内容
    is_definition = any(x in question_lower for x in ['what is', 'define', 'what are', 'types of', 'components of'])
    is_explanation = any(x in question_lower for x in ['explain', 'describe', 'discuss'])
    is_application = any(x in question_lower for x in ['how would', 'how to', 'apply', 'use'])
    is_comparison = any(x in question_lower for x in ['compare', 'contrast', 'difference between'])
    is_behavioral = 'behavioral' in category.lower() or any(x in question_lower for x in ['share', 'experience', 'situation', 'stayed updated'])
    is_case = 'case' in category.lower() or any(x in question_lower for x in ['design', 'approach', 'scenario', 'given'])
    is_technical = 'technical' in category.lower()
    
    # 基于具体题目内容生成提示
    # 市场风险类题目
    if 'types of market risk' in title_lower or 'primary components of market risk' in question_lower:
        return "Focus on the 5 standard categories: equity, interest rate, currency, commodity, volatility. For each, mention typical drivers, measurement approaches, and common hedging techniques."
    
    elif 'beta as market risk measure' in title_lower or 'beta used to measure' in question_lower:
        return "Explain beta in CAPM context: systematic risk measure, calculation methodology, interpretation (β=1, >1, <1), limitations, and practical use in portfolio management."
    
    elif 'stress testing' in title_lower:
        if is_behavioral:
            return "For staying updated: mention regulatory developments (CCAR, DFAST), industry forums (SR 15-18), academic research, software tools (RiskManager, Algo), and lessons from recent crises."
        elif is_case:
            return "Scenario design should consider: historical events (2008, COVID), hypothetical shocks (rate hikes, defaults), reverse stress tests, regulatory requirements, and business-specific vulnerabilities."
        elif is_technical:
            return "Compare stress testing approaches: regulatory vs. internal, sensitivity analysis vs. scenario analysis, bottom-up vs. top-down, qualitative vs. quantitative."
    
    elif 'counterparty credit risk' in title_lower or 'counterparty risk' in question_lower:
        if is_case:
            return "Design approach: 1) Exposure measurement (PFE, EPE) 2) Credit assessment (ratings, CDS) 3) Collateral management 4) Netting agreements 5) CVA calculation 6) Concentration limits."
        elif is_technical:
            return "Key metrics: exposure at default (EAD), probability of default (PD), loss given default (LGD), credit valuation adjustment (CVA), potential future exposure (PFE)."
    
    elif 'operational risk framework' in title_lower:
        if is_behavioral:
            return "Example should highlight: risk identification process, control implementation, measurement (loss data, KRIs), reporting improvements, and business impact quantification."
        elif is_case:
            return "Implementation framework: 1) Risk assessment 2) Control design 3) Measurement methodology 4) Reporting structure 5) Governance model 6) Continuous improvement."
    
    elif 'basel regulations' in title_lower or 'capital requirements' in question_lower:
        return "Basel framework evolution: Basel I (credit risk), II (three pillars), III (liquidity, leverage), IV (output floor). Discuss impact on business models and implementation challenges."
    
    elif 'model risk management' in title_lower:
        return "Focus on: model validation framework, governance structure, documentation standards, ongoing monitoring, challenger models, and regulatory expectations (SR 11-7)."
    
    elif 'liquidity risk measurement' in title_lower:
        return "Key metrics: liquidity coverage ratio (LCR), net stable funding ratio (NSFR), liquidity gaps, funding concentration, contingency funding plan. Stress testing for liquidity scenarios."
    
    elif 'enterprise risk management' in title_lower or 'erm' in question_lower:
        return "ERM components: risk identification, assessment, response, monitoring, reporting. Integration with strategy, alignment with COSO/ISO frameworks, value creation focus."
    
    elif 'risk appetite statement' in title_lower:
        return "Development process: 1) Board involvement 2) Quantitative limits 3) Qualitative statements 4) Cascading to business units 5) Monitoring and reporting 6) Link to strategy."
    
    elif 'climate risk assessment' in title_lower:
        return "Compare: physical risk (acute/chronic, location-specific) vs. transition risk (policy, technology, market). TCFD framework implementation challenges and data requirements."
    
    elif 'value at risk' in title_lower or 'var' in question_lower:
        if is_behavioral:
            return "Discuss specific project: model selection (historical/parametric/Monte Carlo), parameter calibration, backtesting results, limitations communication, and business impact."
        elif is_case:
            return "For model failures: 1) Root cause analysis 2) Alternative measures (Expected Shortfall) 3) Model adjustments 4) Validation enhancements 5) Communication plan."
        elif is_technical:
            return "VaR methodologies: historical simulation, variance-covariance, Monte Carlo. Key parameters: confidence level, time horizon, limitations: tail risk, normality assumptions."
    
    # 基础风险管理概念
    elif 'systematic and unsystematic risk' in question_lower:
        return "Key distinction: systematic (market-wide, non-diversifiable) measured by beta vs. unsystematic (firm-specific, diversifiable). Portfolio diversification principles and implications."
    
    elif 'credit risk' in question_lower and ('components' in question_lower or 'types' in question_lower):
        return "Credit risk components: default risk, exposure risk, recovery risk. Measurement: PD, LGD, EAD. Mitigation: collateral, covenants, credit derivatives, diversification."
    
    elif 'operational risk' in question_lower and ('types' in question_lower or 'categories' in question_lower):
        return "Operational risk categories: internal fraud, external fraud, employment practices, clients/products, business disruption, execution/delivery. Measurement approaches: BIA, SA, AMA."
    
    # 基于问题类型的通用提示
    if is_definition:
        return "Provide clear definition, categorize into logical components, give concrete examples, explain practical significance, and mention related concepts."
    
    elif is_explanation:
        if is_technical:
            return "Break down into key concepts, explain theoretical foundations, describe methodologies, discuss practical applications, and mention limitations/alternatives."
        else:
            return "Structure explanation logically, use relevant examples, connect to broader context, highlight key insights, and anticipate follow-up questions."
    
    elif is_application:
        return "Outline step-by-step approach, mention relevant tools/techniques, consider constraints/assumptions, evaluate alternatives, and discuss implementation challenges."
    
    elif is_comparison:
        return "Establish comparison framework, identify key dimensions, analyze similarities/differences, evaluate advantages/disadvantages, and discuss practical implications."
    
    elif is_behavioral:
        return "Select specific, relevant example. Structure with context, your role, actions taken, measurable outcomes, and lessons learned. Focus on risk management aspects."
    
    elif is_case:
        return "Problem analysis framework: 1) Understand context 2) Identify issues 3) Generate options 4) Evaluate alternatives 5) Recommend solution 6) Implementation plan."
    
    elif is_technical:
        return "Explain key concepts, mathematical foundations, calculation methodologies, practical applications, limitations, and recent developments in the field."
    
    # 默认：基于题目内容
    return f"For '{title}': focus on the specific aspects mentioned, use relevant terminology, provide concrete examples, and structure your answer logically."

def fix_risk_answers(questions):
    """修复Risk题目的简洁答案"""
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    print(f"\nFound {len(risk_questions)} Risk Management questions")
    
    fixed_count = 0
    improvements = []
    
    for q in risk_questions:
        qid = q.get('id')
        title = q.get('title', '')
        current_answer = q.get('answers', {}).get('concise', {}).get('answer', '')
        
        # 生成新的具体提示
        new_answer = generate_specific_hint(q)
        
        # 检查答案是否需要改进
        needs_fix = False
        
        # 检查是否过于泛泛
        generic_phrases = [
            'for behavioral questions',
            'for case questions',
            'for technical questions',
            'focus on a specific example',
            'structure your answer',
            'framework:',
            'key points:',
            'remember the'
        ]
        
        # 检查是否只是modelAnswer的简化
        model_answer = q.get('modelAnswer', '')
        if model_answer and len(current_answer) > 20:
            # 如果当前答案包含modelAnswer的大部分内容，需要改进
            model_keywords = set(model_answer.lower().split()[:20])
            current_keywords = set(current_answer.lower().split()[:20])
            overlap = len(model_keywords.intersection(current_keywords)) / len(model_keywords) if model_keywords else 0
            if overlap > 0.7:  # 70%重叠
                needs_fix = True
        
        # 检查是否包含泛泛短语
        if any(phrase in current_answer.lower() for phrase in generic_phrases):
            needs_fix = True
        
        if needs_fix or not current_answer:
            # 更新答案
            if 'answers' not in q:
                q['answers'] = {}
            if 'concise' not in q['answers']:
                q['answers']['concise'] = {}
            
            q['answers']['concise']['answer'] = new_answer
            fixed_count += 1
            
            improvements.append({
                'title': title,
                'old': current_answer[:80] + '...' if len(current_answer) > 80 else current_answer,
                'new': new_answer[:80] + '...' if len(new_answer) > 80 else new_answer
            })
    
    print(f"\nFixed {fixed_count} Risk answers")
    
    # 显示改进示例
    if improvements:
        print("\n=== IMPROVEMENT EXAMPLES ===")
        for i, imp in enumerate(improvements[:5]):
            print(f"\n{i+1}. {imp['title']}")
            print(f"   Old: {imp['old']}")
            print(f"   New: {imp['new']}")
    
    return questions

def save_questions(filepath, questions, prefix, suffix):
    """保存修改后的题目到questions.js"""
    print(f"\nSaving to: {filepath}")
    
    # 备份原文件
    backup_path = filepath + '.backup_before_proper_fix'
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
    print("=== FIXING RISK ANSWERS PROPERLY ===")
    print("Generating specific, useful hints for each Risk Management question")
    
    questions_file = 'questions.js'
    questions, prefix, suffix = load_questions(questions_file)
    if questions is None:
        return False
    
    # 修复Risk答案
    fixed_questions = fix_risk_answers(questions)
    
    # 保存修改
    success = save_questions(questions_file, fixed_questions, prefix, suffix)
    
    if success:
        print("\n=== COMPLETE ===")
        print("Risk Management answers have been properly fixed.")
        print("\nNew concise answers provide:")
        print("1. Specific guidance for each question")
        print("2. Useful hints for interview preparation")
        print("3. Relevant terminology and concepts")
        print("4. Practical angles to consider")
        print("\nTest in industry-practice.html to see the improvements.")
    
    return success

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)