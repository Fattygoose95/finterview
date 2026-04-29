import json
import sys
from collections import Counter

def load_questions(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        start = content.find('const questionBank = [')
        if start == -1:
            return []
        bracket_count = 0
        i = start + len('const questionBank = [')
        while i < len(content):
            if content[i] == '[':
                bracket_count += 1
            elif content[i] == ']':
                if bracket_count == 0:
                    end = i
                    break
                else:
                    bracket_count -= 1
            i += 1
        else:
            return []
        
        array_content = content[start:end+1]
        array_content = array_content.replace('const questionBank = ', '', 1)
        import re
        array_content = re.sub(r'//.*', '', array_content)
        array_content = re.sub(r',\s*}', '}', array_content)
        array_content = re.sub(r',\s*]', ']', array_content)
        try:
            questions = json.loads(array_content)
            return questions
        except Exception as e:
            print(f"Error parsing JSON: {e}")
            return []

def analyze_role(questions, role_name):
    role_questions = [q for q in questions if q.get('role') == role_name]
    print(f"\n{'='*60}")
    print(f"Role: {role_name} (count: {len(role_questions)})")
    if not role_questions:
        return
    
    # Check detailedAnalysis duplicates
    da_strings = []
    for q in role_questions:
        da = q.get('detailedAnalysis', {})
        da_str = json.dumps(da, sort_keys=True)
        da_strings.append(da_str)
    
    da_counter = Counter(da_strings)
    unique_da = len(da_counter)
    duplicate_da = sum(1 for v in da_counter.values() if v > 1)
    print(f"  detailedAnalysis: {unique_da} unique, {duplicate_da} duplicated")
    if duplicate_da > 0:
        # Show most common
        most_common = da_counter.most_common(1)[0]
        if most_common[1] > 1:
            print(f"    Most common (count {most_common[1]}): {json.loads(most_common[0]).get('overview', 'N/A')[:80]}...")
    
    # Check concise answers duplicates
    concise_strings = []
    for q in role_questions:
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        concise_strings.append(concise)
    
    concise_counter = Counter(concise_strings)
    unique_concise = len(concise_counter)
    duplicate_concise = sum(1 for v in concise_counter.values() if v > 1)
    print(f"  concise answers: {unique_concise} unique, {duplicate_concise} duplicated")
    if duplicate_concise > 0:
        most_common = concise_counter.most_common(1)[0]
        if most_common[1] > 1:
            print(f"    Most common (count {most_common[1]}): {most_common[0][:80]}...")
    
    # Check modelAnswer duplicates
    model_strings = []
    for q in role_questions:
        model = q.get('modelAnswer', '').strip()
        model_strings.append(model)
    
    model_counter = Counter(model_strings)
    unique_model = len(model_counter)
    duplicate_model = sum(1 for v in model_counter.values() if v > 1)
    print(f"  modelAnswer: {unique_model} unique, {duplicate_model} duplicated")
    if duplicate_model > 0:
        most_common = model_counter.most_common(1)[0]
        if most_common[1] > 1:
            print(f"    Most common (count {most_common[1]}): {most_common[0][:80]}...")
    
    # Check if detailed answer equals modelAnswer
    same_count = 0
    for q in role_questions:
        model = q.get('modelAnswer', '').strip()
        detailed = q.get('answers', {}).get('detailed', {}).get('answer', '').strip()
        if model and detailed and model == detailed:
            same_count += 1
    print(f"  detailed identical to modelAnswer: {same_count}/{len(role_questions)}")
    
    return role_questions

def main():
    questions = load_questions('questions.js')
    if not questions:
        print("Failed to load questions")
        return
    
    print(f"Total questions: {len(questions)}")
    
    # Get unique roles
    roles = set(q.get('role') for q in questions)
    print(f"Roles found: {sorted(roles)}")
    
    # Analyze each role
    for role in sorted(roles):
        analyze_role(questions, role)
    
    # Also check overall duplicates across all questions
    print(f"\n{'='*60}")
    print("OVERALL DUPLICATES (across all roles):")
    
    # Check concise duplicates across all
    all_concise = []
    for q in questions:
        concise = q.get('answers', {}).get('concise', {}).get('answer', '').strip()
        if concise:
            all_concise.append(concise)
    
    concise_counter = Counter(all_concise)
    top_duplicate = concise_counter.most_common(1)[0]
    if top_duplicate[1] > 1:
        print(f"Most duplicated concise answer (count {top_duplicate[1]}): {top_duplicate[0][:100]}...")
    
    # Check modelAnswer duplicates across all
    all_model = []
    for q in questions:
        model = q.get('modelAnswer', '').strip()
        if model:
            all_model.append(model)
    
    model_counter = Counter(all_model)
    top_duplicate = model_counter.most_common(1)[0]
    if top_duplicate[1] > 1:
        print(f"Most duplicated modelAnswer (count {top_duplicate[1]}): {top_duplicate[0][:100]}...")

if __name__ == '__main__':
    main()