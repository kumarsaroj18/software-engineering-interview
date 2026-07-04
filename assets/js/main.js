/**
 * Senior Backend Interview Handbook — Main JavaScript
 * Features: Theme toggle, search, expand/collapse, copy code, sidebar tracking, mobile menu
 */

(function () {
  'use strict';

  // ==========================================================================
  // Theme Toggle (Dark/Light) with localStorage
  // ==========================================================================
  const ThemeManager = {
    STORAGE_KEY: 'interview-handbook-theme',
    DARK: 'dark',
    LIGHT: 'light',

    init() {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (prefersDark ? this.DARK : this.LIGHT);
      this.apply(theme);
      this.bindToggle();
    },

    apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      this.updateIcon(theme);
    },

    toggle() {
      const current = document.documentElement.getAttribute('data-theme') || this.DARK;
      const next = current === this.DARK ? this.LIGHT : this.DARK;
      this.apply(next);
      localStorage.setItem(this.STORAGE_KEY, next);
    },

    updateIcon(theme) {
      const btn = document.querySelector('.theme-toggle');
      if (btn) {
        btn.textContent = theme === this.DARK ? '☀️' : '🌙';
        btn.setAttribute('aria-label', `Switch to ${theme === this.DARK ? 'light' : 'dark'} mode`);
      }
    },

    bindToggle() {
      const btn = document.querySelector('.theme-toggle');
      if (btn) {
        btn.addEventListener('click', () => this.toggle());
      }
    }
  };

  // ==========================================================================
  // Keyword Search with Highlighting
  // ==========================================================================
  const SearchManager = {
    init() {
      this.input = document.querySelector('.search-input');
      if (!this.input) return;

      this.contentArea = document.querySelector('.content') || document.body;
      this.debounceTimer = null;
      this.currentMatchIndex = -1;
      this.matches = [];

      // Create search navigation UI
      this.createSearchNav();

      // Global keyboard shortcut: Ctrl+K / Cmd+K to focus search
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.input.focus();
          this.input.select();
        }
        // Also support "/" key (when not typing in an input)
        if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
          e.preventDefault();
          this.input.focus();
          this.input.select();
        }
      });

      this.input.addEventListener('input', () => {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this.performSearch(), 250);
      });

      // Keyboard navigation: Enter = next, Shift+Enter = prev
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (e.shiftKey) {
            this.goToPrev();
          } else {
            this.goToNext();
          }
        }
        if (e.key === 'Escape') {
          this.input.value = '';
          this.performSearch();
          this.input.blur();
        }
      });
    },

    createSearchNav() {
      const container = this.input.parentElement;
      const nav = document.createElement('div');
      nav.className = 'search-nav';
      nav.innerHTML = `
        <span class="search-count"></span>
        <button class="search-nav-btn" data-dir="prev" aria-label="Previous match">&#9650;</button>
        <button class="search-nav-btn" data-dir="next" aria-label="Next match">&#9660;</button>
      `;
      container.appendChild(nav);

      this.countDisplay = nav.querySelector('.search-count');
      nav.querySelector('[data-dir="prev"]').addEventListener('click', () => this.goToPrev());
      nav.querySelector('[data-dir="next"]').addEventListener('click', () => this.goToNext());
    },

    performSearch() {
      const query = this.input.value.trim().toLowerCase();
      this.clearHighlights();
      this.matches = [];
      this.currentMatchIndex = -1;

      if (query.length < 2) {
        this.updateCounter();
        return;
      }

      const textNodes = this.getTextNodes(this.contentArea);

      textNodes.forEach(node => {
        const text = node.textContent.toLowerCase();
        if (text.includes(query)) {
          this.highlightNode(node, query);
        }
      });

      // Collect all highlighted marks
      this.matches = Array.from(this.contentArea.querySelectorAll('mark.highlight'));

      // Auto-expand details containing matches
      if (this.matches.length > 0) {
        this.expandMatchingDetails();
        this.currentMatchIndex = 0;
        this.goToMatch(0);
      }

      this.updateCounter();
    },

    goToNext() {
      if (this.matches.length === 0) return;
      this.currentMatchIndex = (this.currentMatchIndex + 1) % this.matches.length;
      this.goToMatch(this.currentMatchIndex);
    },

    goToPrev() {
      if (this.matches.length === 0) return;
      this.currentMatchIndex = (this.currentMatchIndex - 1 + this.matches.length) % this.matches.length;
      this.goToMatch(this.currentMatchIndex);
    },

    goToMatch(index) {
      // Remove active class from all
      this.matches.forEach(m => m.classList.remove('highlight-active'));

      // Add active class to current
      const match = this.matches[index];
      if (!match) return;
      match.classList.add('highlight-active');

      // Ensure parent details is open
      let parent = match.closest('details');
      while (parent) {
        parent.open = true;
        parent = parent.parentElement.closest('details');
      }

      // Scroll to match
      match.scrollIntoView({ behavior: 'smooth', block: 'center' });

      this.updateCounter();
    },

    updateCounter() {
      if (!this.countDisplay) return;
      if (this.matches.length === 0) {
        this.countDisplay.textContent = this.input.value.trim().length >= 2 ? 'No matches' : '';
      } else {
        this.countDisplay.textContent = `${this.currentMatchIndex + 1} of ${this.matches.length}`;
      }
    },

    getTextNodes(root) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || parent.classList.contains('highlight')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.textContent.trim().length === 0) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      const nodes = [];
      let current;
      while ((current = walker.nextNode())) {
        nodes.push(current);
      }
      return nodes;
    },

    highlightNode(textNode, query) {
      const text = textNode.textContent;
      const lowerText = text.toLowerCase();
      const parts = [];
      let lastIndex = 0;
      let index;

      while ((index = lowerText.indexOf(query, lastIndex)) !== -1) {
        if (index > lastIndex) {
          parts.push(document.createTextNode(text.slice(lastIndex, index)));
        }
        const mark = document.createElement('mark');
        mark.className = 'highlight';
        mark.textContent = text.slice(index, index + query.length);
        parts.push(mark);
        lastIndex = index + query.length;
      }

      if (lastIndex < text.length) {
        parts.push(document.createTextNode(text.slice(lastIndex)));
      }

      if (parts.length > 0) {
        const fragment = document.createDocumentFragment();
        parts.forEach(p => fragment.appendChild(p));
        textNode.parentNode.replaceChild(fragment, textNode);
      }
    },

    clearHighlights() {
      const marks = this.contentArea.querySelectorAll('mark.highlight');
      marks.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      });
    },

    expandMatchingDetails() {
      const details = this.contentArea.querySelectorAll('details');
      details.forEach(detail => {
        if (detail.querySelector('mark.highlight')) {
          detail.open = true;
        }
      });
    }
  };

  // ==========================================================================
  // Expand All / Collapse All
  // ==========================================================================
  const CollapseManager = {
    init() {
      const expandBtn = document.querySelector('[data-action="expand-all"]');
      const collapseBtn = document.querySelector('[data-action="collapse-all"]');

      if (expandBtn) {
        expandBtn.addEventListener('click', () => this.setAll(true));
      }
      if (collapseBtn) {
        collapseBtn.addEventListener('click', () => this.setAll(false));
      }
    },

    setAll(open) {
      const contentArea = document.querySelector('.content') || document.body;
      const details = contentArea.querySelectorAll('details');
      details.forEach(d => { d.open = open; });
    }
  };

  // ==========================================================================
  // Smooth Scroll to Anchor Links
  // ==========================================================================
  const SmoothScroll = {
    init() {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (!target) return;

        e.preventDefault();
        const offset = 80; // Account for sticky header
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top, behavior: 'smooth' });

        // Update URL without triggering scroll
        history.pushState(null, '', `#${targetId}`);
      });
    }
  };

  // ==========================================================================
  // Copy-to-Clipboard for Code Blocks
  // ==========================================================================
  const CopyCode = {
    init() {
      // Add copy buttons to all pre > code blocks
      const codeBlocks = document.querySelectorAll('pre');
      codeBlocks.forEach(pre => {
        // Skip if already has a copy button
        if (pre.querySelector('.copy-btn')) return;

        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = '📋 Copy';
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        btn.addEventListener('click', () => this.copy(pre, btn));

        // If pre is inside a wrapper, add to wrapper; otherwise make relative
        const wrapper = pre.closest('.code-block-wrapper');
        if (wrapper) {
          wrapper.appendChild(btn);
        } else {
          pre.style.position = 'relative';
          pre.appendChild(btn);
        }
      });
    },

    async copy(pre, btn) {
      const code = pre.querySelector('code') || pre;
      const text = code.textContent;

      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = '📋 Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = '📋 Copy';
          btn.classList.remove('copied');
        }, 2000);
      }
    }
  };

  // ==========================================================================
  // Active Section Tracking in Sidebar (Intersection Observer)
  // ==========================================================================
  const SidebarTracker = {
    init() {
      this.navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
      if (this.navLinks.length === 0) return;

      const headings = document.querySelectorAll('.content h2[id], .content h3[id]');
      if (headings.length === 0) return;

      const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.setActive(entry.target.id);
          }
        });
      }, observerOptions);

      headings.forEach(h => this.observer.observe(h));
    },

    setActive(id) {
      this.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
          // Scroll link into view within sidebar if needed
          link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    }
  };

  // ==========================================================================
  // Mobile Hamburger Menu
  // ==========================================================================
  const MobileMenu = {
    init() {
      this.hamburger = document.querySelector('.hamburger');
      this.sidebar = document.querySelector('.sidebar');
      this.overlay = document.querySelector('.sidebar-overlay');

      if (!this.hamburger || !this.sidebar) return;

      this.hamburger.addEventListener('click', () => this.toggle());

      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.close());
      }

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.close();
      });

      // Close on nav link click (mobile)
      this.sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.close();
          }
        });
      });
    },

    toggle() {
      const isOpen = this.sidebar.classList.toggle('open');
      this.hamburger.setAttribute('aria-expanded', isOpen);
      if (this.overlay) {
        this.overlay.classList.toggle('active', isOpen);
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    },

    close() {
      this.sidebar.classList.remove('open');
      this.hamburger.setAttribute('aria-expanded', 'false');
      if (this.overlay) {
        this.overlay.classList.remove('active');
      }
      document.body.style.overflow = '';
    }
  };

  // ==========================================================================
  // Initialize Everything on DOM Ready
  // ==========================================================================
  function init() {
    ThemeManager.init();
    SearchManager.init();
    CollapseManager.init();
    SmoothScroll.init();
    CopyCode.init();
    SidebarTracker.init();
    MobileMenu.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
