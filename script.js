// script.js — interactions: smooth scroll, menu toggle, theme, reveal animations, CV download handler

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navList = document.getElementById('nav-list');
  const menuToggle = document.getElementById('menu-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const downloadCv = document.getElementById('download-cv');
  const yearSpan = document.getElementById('year');

  // Set current year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      // Toggle visibility based on computed style for robustness
      if (window.getComputedStyle(navList).display === 'none') {
        navList.style.display = 'flex';
      } else {
        navList.style.display = 'none';
      }
    });
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
          // close mobile menu if open
          if (window.innerWidth < 720 && window.getComputedStyle(navList).display === 'flex') {
            navList.style.display = 'none';
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // Theme toggle (light/dark) persisted to localStorage
  const THEME_KEY = 'pref-theme';
  const applyTheme = (theme) => {
    if (theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  };
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) applyTheme(saved);
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // Download CV handler (keeps path relative)
  if (downloadCv) {
    downloadCv.addEventListener('click', () => {
      // Analytics hook or console log
      console.info('CV download initiated');
      // default anchor with download attribute will handle the file saving
    });
  }

  // IntersectionObserver for reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    revealEls.forEach(el => io.observe(el));
  } else {
    // fallback
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // simple keyboard accessibility: close nav on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.innerWidth < 720) {
      navList.style.display = 'none';
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
