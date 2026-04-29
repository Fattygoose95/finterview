#!/usr/bin/env python3
"""
简化UI：移除详细答案相关部分
只保留简洁答案显示
"""

import os
import re

def simplify_industry_practice_html():
    """简化industry-practice.html"""
    filepath = 'industry-practice.html'
    
    print(f"Simplifying UI in {filepath}")
    
    # 读取文件
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 备份
    backup_path = filepath + '.backup_before_simplify'
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created backup: {backup_path}")
    
    # 1. 移除Detailed Answer按钮
    # 找到答案切换部分
    answer_toggle_section = '''<div class="answer-toggle-section">
                            <button class="answer-type-btn active" data-answer-type="concise">
                                <i class="fas fa-bars"></i> Concise Answer
                            </button>
                            <button class="answer-type-btn" data-answer-type="detailed">
                                <i class="fas fa-file-alt"></i> Detailed Answer
                            </button>
                        </div>'''
    
    # 替换为只显示简洁答案
    simplified_toggle = '''<div class="answer-toggle-section">
                            <div class="answer-label">
                                <i class="fas fa-bars"></i> Answer
                            </div>
                        </div>'''
    
    if answer_toggle_section in content:
        content = content.replace(answer_toggle_section, simplified_toggle)
        print("✓ Removed Detailed Answer button")
    else:
        print("⚠ Could not find answer toggle section")
    
    # 2. 移除详细答案内容区域
    detailed_answer_section = '''<div class="answer-content detailed" id="detailedAnswerContent" style="display: none;">
                            <!-- Detailed answer will be loaded here -->
                        </div>'''
    
    if detailed_answer_section in content:
        content = content.replace(detailed_answer_section, '')
        print("✓ Removed detailed answer content area")
    else:
        print("⚠ Could not find detailed answer content area")
    
    # 3. 移除Finance Bro提示相关代码（大约1220-1350行）
    # 查找finance bro hint function
    finance_bro_pattern = r'// Finance Bro hint functionality.*?function addFinanceBroStyles\(\) \{.*?\}'
    
    finance_bro_match = re.search(finance_bro_pattern, content, re.DOTALL)
    if finance_bro_match:
        # 移除这个函数
        start = finance_bro_match.start()
        end = finance_bro_match.end()
        
        # 找到下一个函数开始（bindEvents）
        next_function = content.find('function bindEvents() {', end)
        if next_function > 0:
            # 移除从start到next_function的内容
            content = content[:start] + content[next_function:]
            print("✓ Removed Finance Bro hint functionality")
        else:
            print("⚠ Could not find next function after Finance Bro code")
    else:
        print("⚠ Could not find Finance Bro hint functionality pattern")
    
    # 4. 在bindEvents函数中移除详细答案切换逻辑
    bind_events_pattern = r'// Answer type toggle buttons.*?document\.querySelectorAll\(\'\.answer-type-btn\'\).*?\}'
    
    bind_events_match = re.search(bind_events_pattern, content, re.DOTALL)
    if bind_events_match:
        # 替换为简单版本
        new_bind_events = '''                // Answer display (only concise now)
                // No toggle needed since we only have concise answers'''
        
        content = content[:bind_events_match.start()] + new_bind_events + content[bind_events_match.end():]
        print("✓ Simplified answer display logic")
    else:
        print("⚠ Could not find answer toggle event handlers")
    
    # 5. 移除showAnswer函数中的详细答案逻辑
    # 查找showAnswer函数
    show_answer_pattern = r'function showAnswer\(\) \{.*?\}'
    
    show_answer_match = re.search(show_answer_pattern, content, re.DOTALL)
    if show_answer_match:
        show_answer_code = show_answer_match.group(0)
        
        # 移除详细答案相关代码
        # 移除对详细答案内容的操作
        simplified_show_answer = '''function showAnswer() {
                if (!currentQuestion) return;
                
                // Get concise answer
                const conciseAnswer = currentQuestion.answers?.concise?.answer || "No concise answer available.";
                
                // Display concise answer
                const conciseContent = document.getElementById('conciseAnswerContent');
                if (conciseContent) {
                    conciseContent.innerHTML = formatAnswer(conciseAnswer);
                }
                
                // Show answer section
                const answerSection = document.getElementById('answerRevealSection');
                if (answerSection) {
                    answerSection.style.display = 'block';
                }
                
                // Show navigation controls
                const navControls = document.getElementById('navigationControls');
                if (navControls) {
                    navControls.style.display = 'flex';
                }
                
                // Update reveal button
                const revealBtn = document.getElementById('revealAnswerBtn');
                if (revealBtn) {
                    revealBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Answer';
                    revealBtn.dataset.state = 'hide';
                }
            }'''
        
        content = content[:show_answer_match.start()] + simplified_show_answer + content[show_answer_match.end():]
        print("✓ Simplified showAnswer function")
    else:
        print("⚠ Could not find showAnswer function")
    
    # 6. 移除CSS中的相关样式（可选，但先保留）
    # 暂时不删除CSS，以免影响布局
    
    # 7. 更新页面描述（移除详细答案提及）
    if 'with concise and detailed answers' in content:
        content = content.replace('with concise and detailed answers', 'with helpful answer hints')
        print("✓ Updated page description")
    
    # 保存修改
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Simplified UI saved to {filepath}")
    
    return True

def update_other_html_files():
    """更新其他HTML文件"""
    print("\n=== UPDATING OTHER HTML FILES ===")
    
    # 需要检查的文件列表
    files_to_check = [
        'industry.html',
        'industry-filter.html',
        'index.html',
        'profile.html'
    ]
    
    for filepath in files_to_check:
        if not os.path.exists(filepath):
            continue
        
        print(f"\nChecking {filepath}...")
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否有对详细答案的提及
        changes_made = False
        
        # 更新描述（如果有）
        if 'concise and detailed answers' in content:
            content = content.replace('concise and detailed answers', 'helpful answer hints')
            changes_made = True
            print(f"  ✓ Updated description in {filepath}")
        
        if 'detailed answers' in content.lower() and 'helpful answer hints' not in content:
            # 简单替换
            import re
            content = re.sub(r'detailed answers?', 'answer hints', content, flags=re.IGNORECASE)
            changes_made = True
            print(f"  ✓ Updated text in {filepath}")
        
        if changes_made:
            # 备份
            backup_path = filepath + '.backup_before_simplify'
            with open(backup_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            # 保存
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
    
    return True

def main():
    """主函数"""
    print("=== SIMPLIFYING UI - REMOVING DETAILED ANSWERS ===")
    
    # 简化主实践页面
    if not simplify_industry_practice_html():
        return False
    
    # 更新其他HTML文件
    update_other_html_files()
    
    print("\n=== COMPLETE ===")
    print("UI has been simplified:")
    print("1. Removed Detailed Answer button")
    print("2. Removed detailed answer content area")
    print("3. Removed Finance Bro hint functionality")
    print("4. Simplified answer display logic")
    print("5. Updated page descriptions")
    print("\nNext: Test the simplified interface")
    
    return True

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)