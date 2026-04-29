#!/usr/bin/env python3
"""
修复UI箭头位置问题
"""

import os

def fix_arrow_position():
    """修复箭头位置从60px到40px"""
    ui_file = 'industry-practice.html'
    
    print(f"Fixing arrow position in {ui_file}")
    
    # 读取文件
    with open(ui_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找并替换箭头位置
    old_arrow_style = 'position: absolute;\n                                bottom: -10px;\n                                right: 60px;'
    new_arrow_style = 'position: absolute;\n                                bottom: -10px;\n                                right: 40px;'
    
    if old_arrow_style in content:
        content = content.replace(old_arrow_style, new_arrow_style)
        print("✓ Arrow position fixed from right:60px to right:40px")
    elif new_arrow_style in content:
        print("✓ Arrow position already fixed (right:40px)")
    else:
        print("⚠ Could not find arrow style pattern")
        # 尝试其他可能的格式
        import re
        pattern = r'right:\s*60px'
        if re.search(pattern, content):
            content = re.sub(pattern, 'right: 40px', content)
            print("✓ Arrow position fixed using regex")
        else:
            print("✗ Could not find right:60px pattern")
            return False
    
    # 创建备份
    backup_file = ui_file + '.backup_arrow_fix'
    if not os.path.exists(backup_file):
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(content)  # 保存修复后的内容到备份
        print(f"✓ Created backup: {backup_file}")
    
    # 保存修改
    with open(ui_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✓ UI file updated")
    return True

def check_finance_bro_icon():
    """检查Finance Bro图标是否存在"""
    ui_file = 'industry-practice.html'
    
    with open(ui_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查assistantToggle元素
    if 'assistantToggle' in content:
        print("✓ Finance Bro toggle button found (assistantToggle)")
    else:
        print("⚠ assistantToggle not found")
    
    # 检查呼吸效果样式
    if 'breathing-effect' in content:
        print("✓ Breathing effect CSS found")
    else:
        print("⚠ Breathing effect CSS not found")
    
    # 检查提示功能
    if 'showFinanceBroHint' in content:
        print("✓ showFinanceBroHint function found")
    else:
        print("⚠ showFinanceBroHint function not found")
    
    # 检查localStorage键
    if 'finterview_finance_bro_hint_shown' in content:
        print("✓ localStorage key found")
    else:
        print("⚠ localStorage key not found")

def main():
    """主函数"""
    print("=== FIXING UI ARROW POSITION ===")
    
    # 修复箭头位置
    if not fix_arrow_position():
        print("\nFailed to fix arrow position")
        return False
    
    print("\n=== CHECKING FINANCE BRO FUNCTIONALITY ===")
    check_finance_bro_icon()
    
    print("\n=== SUMMARY ===")
    print("1. Arrow position should now point better to Finance Bro icon")
    print("2. All Finance Bro functionality should be intact")
    print("3. Test by opening industry-practice.html and clicking 'Detailed Answer'")
    print("4. First click should show hint bubble with arrow pointing to bottom right")
    print("5. Finance Bro icon should have breathing effect")
    
    return True

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)