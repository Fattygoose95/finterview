#!/usr/bin/env python3
"""
更新所有HTML文件中questions.js的引用版本号
"""

import os
import re
import sys

def find_html_files_with_questions_js():
    """查找所有引用questions.js的HTML文件"""
    html_files = []
    
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if 'questions.js' in content:
                            html_files.append(filepath)
                except:
                    continue
    
    return html_files

def update_version_in_file(filepath):
    """更新文件中的版本号"""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 匹配questions.js引用，可能有或没有版本号
    patterns = [
        r'(<script src="questions\.js)(?:[^"]*")',
        r"(<script src='questions\.js)(?:[^']*')",
        r'(<script src=questions\.js)(?:[^>]*>)'
    ]
    
    updated = False
    new_content = content
    
    for pattern in patterns:
        # 查找所有匹配
        matches = list(re.finditer(pattern, new_content, re.IGNORECASE))
        for match in matches:
            old_ref = match.group(0)
            # 提取script标签开始部分
            script_start = match.group(1)
            
            # 构建新的引用
            if '?' in old_ref:
                # 已有版本号，更新它
                new_ref = f'{script_start}?v=20260313_2251"'
            else:
                # 没有版本号，添加它
                if old_ref.endswith('"'):
                    new_ref = f'{script_start}?v=20260313_2251"'
                elif old_ref.endswith("'"):
                    new_ref = f"{script_start}?v=20260313_2251'"
                else:
                    new_ref = f'{script_start}?v=20260313_2251>'
            
            # 替换
            new_content = new_content.replace(old_ref, new_ref)
            updated = True
            print(f"  Updated: {old_ref[:50]}...")
    
    if updated:
        # 创建备份
        backup_path = filepath + '.backup'
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # 写入更新后的内容
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"  ✓ Updated and backed up to {backup_path}")
    else:
        print(f"  ⚠ No questions.js reference found or already updated")
    
    return updated

def main():
    """主函数"""
    print("=== UPDATING ALL QUESTIONS.JS REFERENCES ===")
    
    # 查找所有引用questions.js的HTML文件
    html_files = find_html_files_with_questions_js()
    
    print(f"Found {len(html_files)} HTML files referencing questions.js:")
    for file in html_files:
        print(f"  - {file}")
    
    # 更新每个文件
    updated_count = 0
    for filepath in html_files:
        if update_version_in_file(filepath):
            updated_count += 1
        print()
    
    print(f"\n=== SUMMARY ===")
    print(f"Updated {updated_count} out of {len(html_files)} files")
    print(f"New version: v=20260313_2251")
    
    # 列出关键文件
    key_files = [
        './industry-practice.html',
        './industry.html', 
        './industry-filter.html',
        './index.html',
        './profile.html'
    ]
    
    print("\n=== KEY FILES STATUS ===")
    for file in key_files:
        if os.path.exists(file):
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'questions.js?v=20260313_2251' in content:
                    status = '✓ Updated'
                elif 'questions.js' in content:
                    status = '⚠ Needs update'
                else:
                    status = '✗ No reference'
            print(f"{file}: {status}")
    
    return updated_count > 0

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)