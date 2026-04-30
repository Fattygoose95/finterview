/**
 * nav.js - Shared Navigation Component
 * Single source of truth for header + footer nav across all pages.
 * Edit NAV_ITEMS and FOOTER_ITEMS to update every page at once.
 */

(function() {
  'use strict';

  // ── Canonical Navigation Data ──
  // Edit this to update nav across ALL pages
  const NAV_ITEMS = [
    { href: 'index.html', label: 'Home' },
    {
      label: 'Practice',
      isDropdown: true,
      children: [
        { href: 'industry-practice.html', label: 'Practice Mode', desc: 'Flashcards & questions' },
        { href: 'flashcard.html', label: 'Flashcards', desc: 'Quick review' },
        { href: 'industry-filter.html', label: 'Advanced Filters', desc: 'Browse all questions' }
      ]
    },
    { href: 'mock-interview.html', label: 'Mock Interview' },
    { href: 'finance-bro.html', label: 'Finance Bro AI' },
    { href: 'profile.html', label: 'Profile' }
  ];

  const FOOTER_ITEMS = [
    { href: 'index.html', label: 'Home' },
    { href: 'industry-practice.html', label: 'Practice' },
    { href: 'mock-interview.html', label: 'Mock Interview' },
    { href: 'finance-bro.html', label: 'Finance Bro AI' },
    { href: 'profile.html', label: 'Profile' }
  ];

  // ── Utilities ──
  function getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
  }

  function isActive(href) {
    const current = getCurrentPage();
    if (href === 'index.html' && current === 'index.html') return true;
    if (href !== 'index.html' && current === href) return true;
    return false;
  }

  function escHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  // ── CSS Injection ──
  function injectNavCSS() {
    if (document.getElementById('shared-nav-css')) return;
    const css = document.createElement('style');
    css.id = 'shared-nav-css';
    css.textContent = `
      .nav-dropdown { position: relative; }
      .nav-dropdown > a { cursor: pointer; }
      .nav-dropdown-arrow {
        font-size: 0.6rem;
        margin-left: 2px;
        transition: transform 0.2s;
      }
      .nav-dropdown:hover .nav-dropdown-arrow { transform: rotate(180deg); }
      .nav-dropdown-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: var(--white, #fff);
        border: 1px solid var(--light-border, #e5e7eb);
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        min-width: 220px;
        padding: 0.5rem 0;
        z-index: 100;
        list-style: none;
      }
      .nav-dropdown:hover .nav-dropdown-menu { display: block; }
      .nav-dropdown-menu a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.6rem 1rem;
        color: var(--text-primary, #111827) !important;
        text-decoration: none;
        font-size: 0.85rem;
        transition: background 0.15s;
        white-space: nowrap;
      }
      .nav-dropdown-menu a:hover { 
        background: var(--light-bg, #f3f4f6) !important; 
        border-radius: 0 !important;
      }
      .nav-desc {
        font-size: 0.7rem;
        color: var(--text-light, #9ca3af);
        margin-left: 1rem;
      }
      @media (max-width: 768px) {
        .nav-dropdown-menu {
          position: static;
          transform: none;
          box-shadow: none;
          border: none;
          background: transparent;
          padding-left: 0;
        }
        .nav-list.show .nav-dropdown-menu { display: block; }
        .nav-dropdown.open .nav-dropdown-menu { display: block; }
        .nav-desc { display: none; }
      }
    `;
    document.head.appendChild(css);
  }

  // ── Render Header Nav ──
  function renderHeaderNav() {
    const navList = document.querySelector('.main-nav .nav-list');
    if (!navList) return;

    // Remove all li items (keep search/theme toggles if present)
    const searchItem = navList.querySelector('.search-toggle-item');
    const themeItem = navList.querySelector('.theme-toggle-item');
    
    // Clear only the nav links, preserve toggle items
    const items = navList.querySelectorAll('li:not(.search-toggle-item):not(.theme-toggle-item)');
    items.forEach(li => li.remove());

    // Insert before search/theme if they exist
    const insertBefore = searchItem || themeItem || null;

    // Build nav items in reverse (insertBefore inserts before reference)
    const fragment = document.createDocumentFragment();
    
    NAV_ITEMS.forEach(item => {
      const li = document.createElement('li');
      
      if (item.isDropdown) {
        li.className = 'nav-dropdown';
        const toggle = document.createElement('a');
        toggle.href = '#';
        toggle.className = 'nav-dropdown-toggle';
        toggle.innerHTML = `${escHtml(item.label)} <i class="fas fa-chevron-down nav-dropdown-arrow"></i>`;
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.innerWidth <= 768) {
            li.classList.toggle('open');
          }
        });
        li.appendChild(toggle);

        const menu = document.createElement('ul');
        menu.className = 'nav-dropdown-menu';
        item.children.forEach(child => {
          const childLi = document.createElement('li');
          const a = document.createElement('a');
          a.href = child.href;
          a.innerHTML = `${escHtml(child.label)} ${child.desc ? '<span class="nav-desc">' + escHtml(child.desc) + '</span>' : ''}`;
          if (isActive(child.href)) a.classList.add('active');
          childLi.appendChild(a);
          menu.appendChild(childLi);
        });
        li.appendChild(menu);
      } else {
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        if (isActive(item.href)) a.classList.add('active');
        li.appendChild(a);
      }

      fragment.appendChild(li);
    });

    // Insert the nav items before search/theme toggles
    if (insertBefore) {
      navList.insertBefore(fragment, insertBefore);
    } else {
      navList.appendChild(fragment);
    }
  }

  // ── Render Footer Nav ──
  function renderFooterNav() {
    const footers = document.querySelectorAll('.main-footer .nav-list');
    footers.forEach(navList => {
      // Clear and rebuild
      navList.innerHTML = '';
      FOOTER_ITEMS.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        if (isActive(item.href)) a.classList.add('active');
        li.appendChild(a);
        navList.appendChild(li);
      });
    });
  }

  // ── Close dropdowns on outside click ──
  function bindOutsideClick() {
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
      }
    });
  }

  // ── Theme icon sync ──
  function syncThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (icon && localStorage.getItem('theme') === 'dark') {
      icon.className = 'fas fa-sun';
    }
  }

  // ── Init ──
  function init() {
    injectNavCSS();
    renderHeaderNav();
    renderFooterNav();
    bindOutsideClick();
    syncThemeIcon();
  }

  // Run on DOMContentLoaded or immediately if already fired
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
