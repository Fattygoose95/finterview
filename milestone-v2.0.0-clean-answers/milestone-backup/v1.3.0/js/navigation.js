/* finterview 新UI - 导航功能模块 */

// 导航管理器类
class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.historyStack = [];
        this.init();
    }
    
    // 初始化
    init() {
        console.log('导航管理器初始化...');
        
        // 绑定导航事件
        this.bindNavigationEvents();
        
        // 设置当前页面状态
        this.setActiveNavItem();
        
        // 初始化移动端菜单
        this.initMobileMenu();
        
        // 初始化返回按钮
        this.initBackButton();
    }
    
    // 获取当前页面
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === 'index.html' || filename === '' || filename.endsWith('/')) {
            return 'home';
        } else if (filename === 'industry.html') {
            return 'industry';
        } else {
            return 'home';
        }
    }
    
    // 设置活动导航项
    setActiveNavItem() {
        const navItems = document.querySelectorAll('.nav-list a');
        
        navItems.forEach(item => {
            // 移除所有active类
            item.classList.remove('active');
            
            // 根据当前页面设置active类
            const href = item.getAttribute('href');
            
            if (this.currentPage === 'home' && (href === 'index.html' || href === './' || href === '/')) {
                item.classList.add('active');
            } else if (this.currentPage === 'industry' && href === 'industry.html') {
                item.classList.add('active');
            }
        });
    }
    
    // 绑定导航事件
    bindNavigationEvents() {
        // 行业卡片点击事件
        document.querySelectorAll('.industry-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const industryId = card.getAttribute('data-industry');
                this.navigateToIndustry(industryId);
            });
        });
        
        // 导航链接点击事件
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // 如果链接是外部链接或锚点，不处理
                if (href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) {
                    return;
                }
                
                e.preventDefault();
                this.navigateToPage(href);
            });
        });
        
        // 返回按钮事件
        const backButton = document.querySelector('a[href="index.html"]');
        if (backButton && backButton.querySelector('.fa-arrow-left')) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.goBack();
            });
        }
    }
    
    // 导航到行业页面
    navigateToIndustry(industryId) {
        console.log(`导航到行业: ${industryId}`);
        
        // 保存当前状态到历史记录
        this.saveToHistory();
        
        // 构建行业页面URL
        const industryPage = 'industry.html';
        const url = `${industryPage}?industry=${industryId}`;
        
        // 在实际应用中，这里应该跳转到行业页面
        // 为了演示，我们只是显示一个消息
        if (window.location.pathname.includes('industry.html')) {
            // 如果已经在行业页面，更新URL和内容
            this.updateIndustryPage(industryId);
        } else {
            // 否则跳转到行业页面
            window.location.href = url;
        }
    }
    
    // 导航到页面
    navigateToPage(pageUrl) {
        console.log(`导航到页面: ${pageUrl}`);
        
        // 保存当前状态到历史记录
        this.saveToHistory();
        
        // 跳转到页面
        window.location.href = pageUrl;
    }
    
    // 更新行业页面（不刷新页面）
    updateIndustryPage(industryId) {
        console.log(`更新行业页面为: ${industryId}`);
        
        // 更新URL（不刷新页面）
        const newUrl = `${window.location.pathname}?industry=${industryId}`;
        window.history.pushState({ industryId }, '', newUrl);
        
        // 更新页面标题
        this.updateIndustryTitle(industryId);
        
        // 重新加载题目数据
        this.reloadIndustryQuestions(industryId);
    }
    
    // 更新行业标题
    updateIndustryTitle(industryId) {
        const industryMap = {
            'ib': { name: '投资银行', enName: 'Investment Banking' },
            'am': { name: '资产管理', enName: 'Asset Management' },
            'rm': { name: '风险管理', enName: 'Risk Management' },
            'st': { name: '销售交易', enName: 'Sales & Trading' },
            'qf': { name: '量化金融', enName: 'Quant Finance' },
            'pb': { name: '私人银行', enName: 'Private Banking' },
            'cb': { name: '公司银行', enName: 'Corporate Banking' },
            'ins': { name: '保险业', enName: 'Insurance' }
        };
        
        const industry = industryMap[industryId] || industryMap['ib'];
        const titleElement = document.getElementById('industryTitle');
        
        if (titleElement) {
            titleElement.textContent = `${industry.name} (${industry.enName}) 题库`;
        }
    }
    
    // 重新加载行业题目
    reloadIndustryQuestions(industryId) {
        console.log(`重新加载行业 ${industryId} 的题目...`);
        
        // 这里应该从服务器或本地存储重新加载题目数据
        // 暂时只显示一个消息
        alert(`Switched to ${this.getIndustryName(industryId)} question bank, loading questions...`);
        
        // 如果有筛选系统，重置筛选
        if (window.filterSystem) {
            window.filterSystem.clearFilters();
        }
    }
    
    // 获取行业名称
    getIndustryName(industryId) {
        const industryMap = {
            'ib': '投资银行',
            'am': '资产管理',
            'rm': '风险管理',
            'st': '销售交易',
            'qf': '量化金融',
            'pb': '私人银行',
            'cb': '公司银行',
            'ins': '保险业'
        };
        
        return industryMap[industryId] || '投资银行';
    }
    
    // 保存到历史记录
    saveToHistory() {
        const state = {
            page: this.currentPage,
            timestamp: Date.now(),
            url: window.location.href
        };
        
        this.historyStack.push(state);
        
        // 限制历史记录栈大小
        if (this.historyStack.length > 10) {
            this.historyStack.shift();
        }
        
        console.log('保存到历史记录:', state);
    }
    
    // 返回上一页
    goBack() {
        if (this.historyStack.length > 0) {
            const previousState = this.historyStack.pop();
            console.log('返回上一页:', previousState);
            
            // 在实际应用中，这里应该导航回上一页
            // 为了简单，我们只是返回首页
            window.location.href = 'index.html';
        } else {
            // 如果没有历史记录，返回首页
            window.location.href = 'index.html';
        }
    }
    
    // 初始化移动端菜单
    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navList = document.querySelector('.nav-list');
        
        if (menuToggle && navList) {
            menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu(menuToggle, navList);
            });
            
            // 点击菜单外区域关闭菜单
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
                    this.closeMobileMenu(menuToggle, navList);
                }
            });
        }
    }
    
    // 切换移动端菜单
    toggleMobileMenu(menuToggle, navList) {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        
        // 添加动画效果
        if (navList.classList.contains('active')) {
            this.animateMenuIn(navList);
        }
    }
    
    // 关闭移动端菜单
    closeMobileMenu(menuToggle, navList) {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
    }
    
    // 菜单进入动画
    animateMenuIn(navList) {
        // 为每个菜单项添加延迟动画
        const menuItems = navList.querySelectorAll('li');
        
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
    
    // 初始化返回按钮
    initBackButton() {
        // 监听浏览器返回按钮
        window.addEventListener('popstate', (e) => {
            console.log('浏览器返回按钮被点击', e.state);
            
            if (e.state && e.state.industryId) {
                this.updateIndustryPage(e.state.industryId);
            }
        });
    }
    
    // 获取当前行业ID（从URL参数）
    getCurrentIndustryId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('industry') || 'ib';
    }
    
    // 更新面包屑导航
    updateBreadcrumb(industryId) {
        const breadcrumbElement = document.getElementById('breadcrumb');
        
        if (breadcrumbElement) {
            const industryName = this.getIndustryName(industryId);
            
            breadcrumbElement.innerHTML = `
                <a href="index.html">首页</a>
                <span class="mx-2">></span>
                <a href="industry.html?industry=${industryId}">${industryName}题库</a>
            `;
        }
    }
}

// 页面加载完成后初始化导航管理器
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
    
    // 如果是行业页面，更新面包屑
    if (window.navigationManager.currentPage === 'industry') {
        const industryId = window.navigationManager.getCurrentIndustryId();
        window.navigationManager.updateBreadcrumb(industryId);
    }
});

// 通用导航函数（供其他模块调用）
function navigateTo(url, options = {}) {
    const { replace = false, state = {} } = options;
    
    if (replace) {
        window.location.replace(url);
    } else {
        window.location.href = url;
    }
}

function navigateToIndustry(industryId) {
    if (window.navigationManager) {
        window.navigationManager.navigateToIndustry(industryId);
    } else {
        window.location.href = `industry.html?industry=${industryId}`;
    }
}

function goBack() {
    if (window.navigationManager) {
        window.navigationManager.goBack();
    } else {
        window.history.back();
    }
}

// 导出函数供其他模块使用
window.Navigation = {
    navigateTo,
    navigateToIndustry,
    goBack
};