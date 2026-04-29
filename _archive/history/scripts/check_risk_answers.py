import json
import sys

def load_questions(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        # Find the questionBank array
        start = content.find('const questionBank = [')
        if start == -1:
            print("Could not find questionBank array")
            return []
        # Find the end of the array
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
            print("Could not find end of array")
            return []
        
        array_content = content[start:end+1]
        # Remove the const declaration
        array_content = array_content.replace('const questionBank = ', '', 1)
        # Parse as JSON
        try:
            questions = json.loads(array_content)
            return questions
        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}")
            # Try to fix common issues
            # Replace JavaScript comments
            import re
            array_content = re.sub(r'//.*', '', array_content)
            # Remove trailing commas
            array_content = re.sub(r',\s*}', '}', array_content)
            array_content = re.sub(r',\s*]', ']', array_content)
            try:
                questions = json.loads(array_content)
                return questions
            except:
                print("Still failed")
                return []

def main():
    questions = load_questions('questions.js')
    if not questions:
        print("No questions loaded")
        return
    
    risk_questions = [q for q in questions if q.get('role') == 'risk']
    print(f"Total risk questions: {len(risk_questions)}")
    
    # Check for duplicate detailedAnalysis
    detailed_analysis_set = set()
    for q in risk_questions[:10]:  # Check first 10
        da = q.get('detailedAnalysis', {})
        da_str = json.dumps(da, sort_keys=True)
        detailed_analysis_set.add(da_str)
        print(f"Question ID {q.get('id')}:")
        print(f"  Title: {q.get('title')}")
        print(f"  detailedAnalysis keys: {list(da.keys()) if da else 'None'}")
        if da:
            print(f"  overview: {da.get('overview', 'N/A')[:50]}...")
        print()
    
    print(f"Unique detailedAnalysis in first 10: {len(detailed_analysis_set)}")
    
    # Check answers
    answers_set = set()
    for q in risk_questions[:10]:
        answers = q.get('answers', {})
        answers_str = json.dumps(answers, sort_keys=True)
        answers_set.add(answers_str)
        print(f"Question ID {q.get('id')}:")
        print(f"  Answers keys: {list(answers.keys())}")
        if 'detailed' in answers:
            print(f"  detailed answer length: {len(answers['detailed'].get('answer', ''))}")
        if 'concise' in answers:
            print(f"  concise answer length: {len(answers['concise'].get('answer', ''))}")
        print()
    
    print(f"Unique answers in first 10: {len(answers_set)}")
    
    # Check if all detailedAnalysis are the same template
    if len(detailed_analysis_set) == 1:
        print("WARNING: All checked detailedAnalysis are identical!")
        sample = json.loads(list(detailed_analysis_set)[0])
        print("Sample detailedAnalysis:")
        for k, v in sample.items():
            print(f"  {k}: {v[:100] if isinstance(v, str) else v}")
    
    if len(answers_set) == 1:
        print("WARNING: All checked answers are identical!")
        sample = json.loads(list(answers_set)[0])
        print("Sample answers:")
        print(json.dumps(sample, indent=2)[:500])

if __name__ == '__main__':
    main()