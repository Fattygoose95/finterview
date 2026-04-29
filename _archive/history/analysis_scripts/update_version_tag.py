#!/usr/bin/env python3
"""
更新所有HTML文件中的版本标签
"""

import os
import re

def update_version_in_file(filepath, old_version, new_version):
    """更新文件中的版本标签"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 替换版本标签
        updated_content = content.replace(old_version, new_version)
        
        if updated_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"  Updated: {filepath}")
            return True
        else:
            # 尝试正则表达式匹配
            pattern = r'questions\.js\?v=\d{8}_\d{4}'
            if re.search(pattern, content):
                updated_content = re.sub(pattern, f'questions.js?v={new_version}', content)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                print(f"  Updated (regex): {filepath}")
                return True
            else:
                print(f"  No version tag found: {filepath}")
                return False
    except Exception as e:
        print(f"  Error updating {filepath}: {e}")
        return False

def main():
    """主函数"""
    print("=== UPDATING VERSION TAGS IN HTML FILES ===")
    
    old_version = "20260313_2251"
    new_version = "20260314_0200"
    
    html_files = [
        'index.html',
        'industry-practice.html',
        'finance-bro.html',
        'profile.html',
        'industry-filter.html'
    ]
    
    updated_count = 0
    for html_file in html_files:
        if os.path.exists(html_file):
            print(f"\nProcessing: {html_file}")
            if update_version_in_file(html_file, old_version, new_version):
                updated_count += 1
        else:
            print(f"\nFile not found: {html_file}")
    
    print(f"\n=== SUMMARY ===")
    print(f"Updated version tag in {updated_count}/{len(html_files)} files")
    print(f"Old version: {old_version}")
    print(f"New version: {new_version}")
    
    if updated_count > 0:
        print("\n=== IMPORTANT ===")
        print("Users must force refresh browser cache to see updates:")
        print("- Windows/Linux: Ctrl+F5")
        print("- Mac: Cmd+Shift+R")
        print("- Or clear browser cache manually")
    
    return updated_count > 0

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)