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
        except:
            return []

def main():
    questions = load_questions('questions.js')
    if not questions:
        print("No questions loaded")
        return
    
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    print(f"Total risk questions: {len(risk_questions)}")
    
    # Check modelAnswer duplicates
    model_answers = []
    for q in risk_questions:
        model_answers.append(q.get('modelAnswer', '').strip())
    
    counter = Counter(model_answers)
    duplicates = {k: v for k, v in counter.items() if v > 1}
    print(f"Unique modelAnswers: {len(counter)}")
    print(f"Duplicate modelAnswers (count > 1): {len(duplicates)}")
    if duplicates:
        print("Top duplicates:")
        for answer, count in list(duplicates.items())[:5]:
            print(f"  Count {count}: {answer[:100]}...")
    
    # Check answers.duplicate
    detailed_answers = []
    concise_answers = []
    for q in risk_questions:
        answers = q.get('answers', {})
        detailed = answers.get('detailed', {}).get('answer', '').strip()
        concise = answers.get('concise', {}).get('answer', '').strip()
        detailed_answers.append(detailed)
        concise_answers.append(concise)
    
    detailed_counter = Counter(detailed_answers)
    concise_counter = Counter(concise_answers)
    
    detailed_duplicates = {k: v for k, v in detailed_counter.items() if v > 1}
    concise_duplicates = {k: v for k, v in concise_counter.items() if v > 1}
    
    print(f"\nUnique detailed answers: {len(detailed_counter)}")
    print(f"Duplicate detailed answers: {len(detailed_duplicates)}")
    if detailed_duplicates:
        print("Sample duplicate detailed answers:")
        for answer, count in list(detailed_duplicates.items())[:3]:
            print(f"  Count {count}: {answer[:100]}...")
    
    print(f"\nUnique concise answers: {len(concise_counter)}")
    print(f"Duplicate concise answers: {len(concise_duplicates)}")
    if concise_duplicates:
        print("Sample duplicate concise answers:")
        for answer, count in list(concise_duplicates.items())[:3]:
            print(f"  Count {count}: {answer[:100]}...")
    
    # Check if answers are just copies of modelAnswer
    same_as_model = 0
    for q in risk_questions:
        model = q.get('modelAnswer', '').strip()
        detailed = q.get('answers', {}).get('detailed', {}).get('answer', '').strip()
        if model and detailed and model == detailed:
            same_as_model += 1
    
    print(f"\nDetailed answers identical to modelAnswer: {same_as_model}/{len(risk_questions)}")

if __name__ == '__main__':
    main()