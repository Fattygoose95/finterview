#!/usr/bin/env python3
"""Insert 60 new questions into questions.js"""

import json
import re
import subprocess
import sys

# Read questions.js
with open('/Users/yangjiarong/.openclaw/workspace/finterview-prototype/questions.js', 'r') as f:
    content = f.read()

# Read the 23 existing questions from the generate script (they're embedded as add_q calls)
# Actually, let's just append the remaining 37 questions to the main script data.

# The 23 questions from IDs 2110-2132 are in the Python script as add_q() calls.
# We need to: 1) extract them + 2) add remaining 37 questions

# Strategy: Parse the existing questionBank, append new questions, write back.
# Find the array in questions.js
start_idx = content.index('const questionBank = [')
bracket_start = content.index('[', start_idx)

# Find closing bracket
depth = 0
bracket_end = -1
for i in range(bracket_start, len(content)):
    if content[i] == '[': depth += 1
    if content[i] == ']':
        depth -= 1
        if depth == 0:
            bracket_end = i
            break

print(f"Found questionBank array: positions {bracket_start}-{bracket_end}")

# Parse existing questions
json_str = content[bracket_start:bracket_end+1]
existing = json.loads(json_str)
print(f"Existing questions: {len(existing)}")
print(f"Last existing ID: {existing[-1]['id']}")

# Now we need to generate 37 new questions and add them.
# Let's define them as a JSON array that we'll insert.

# Security: these are the new questions that come from our generator.
# Hard questions 2133-2145 (13 questions: 2 risk + 5 am + 5 pe + 1 fix for 2132)
# Medium questions 2146-2170 (25 questions: 7 corpfin + 7 fintech + 6 fo + 5 pe)

# Check if generate_questions.py has valid questions we can extract
try:
    with open('/Users/yangjiarong/.openclaw/workspace/finterview-prototype/generate_questions.py', 'r') as f:
        gen_content = f.read()
    
    # Extract the JSON-like objects from add_q() calls
    new_questions = []
    
    # Find all add_q({...}) blocks
    pattern = re.compile(r'add_q\(\{(\s*"id":.*?\n\})\s*\)', re.DOTALL)
    matches = pattern.findall(gen_content)
    
    # Actually, we can parse them as Python dicts by extracting the full add_q call
    # Let's use a different approach - parse the add_q calls more carefully
    
    # Simple approach: find each add_q( block and extract JSON
    for m in re.finditer(r'add_q\(\{', gen_content):
        start = m.start()
        # Find the matching closing )
        paren_depth = 0
        brace_depth = 0
        started_brace = False
        for j in range(start + 7, len(gen_content)):
            c = gen_content[j]
            if c == '{': 
                brace_depth += 1
                started_brace = True
            elif c == '}': 
                brace_depth -= 1
            if started_brace and brace_depth == 0:
                # Found closing brace - need to find closing paren
                closing = gen_content.index(')', j)
                block = gen_content[start+7:closing].strip()
                if block.endswith(','):
                    block = block[:-1]
                # Try to fix Python booleans to JSON booleans
                block = block.replace('False', 'false').replace('True', 'true').replace("'", '"')
                try:
                    q = json.loads(block)
                    new_questions.append(q)
                except json.JSONDecodeError as e:
                    print(f"JSON parse error: {e}")
                    print(f"Block snippet: {block[:200]}")
                break
    
    print(f"\nExtracted {len(new_questions)} questions from generate_questions.py")
    for q in new_questions:
        print(f"  ID {q['id']}: {q['role']}/{q['difficulty']} - {q.get('title', '?')[:50]}")
    
except Exception as e:
    print(f"Error extracting: {e}")
    new_questions = []

# If we extracted questions, use them
# Otherwise generate remaining questions inline

processed_ids = {q['id'] for q in new_questions}
print(f"\nExtracted IDs: {sorted(processed_ids)}")

# Now generate the remaining questions we need (IDs 2133-2170)
print("Now generating all remaining questions...")
