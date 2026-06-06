/**
 * CASE WEEKLY SLOP - Main JavaScript
 * HAL9000ish Interactivity Module
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        scrollThreshold: 100,
        animationDuration: 300,
        halMessages: [
            "I'm watching you scroll...",
            "This content is 100% human-curated. Unfortunately.",
            "Your attention span: loading...",
            "AI slop detection: active",
            "Have you tried turning it off and on again?"
        ]
    };

    // DOM Elements
    const elements = {
        header: null,
        entries: null,
        navLinks: null,
        weekBadge: null
    };

    // Initialize
    function init() {
        cacheElements();
        bindEvents();
        applyEffects();
        logHALGreeting();
    }

    // Cache DOM elements
    function cacheElements() {
        elements.header = document.querySelector('.main-header');
        elements.entries = document.querySelectorAll('.entry');
        elements.navLinks = document.querySelectorAll('.nav-link');
        elements.weekBadge = document.querySelector('.week-badge');
    }

    // Bind event listeners
    function bindEvents() {
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        elements.entries.forEach((entry, index) => {
            entry.addEventListener('mouseenter', () => handleEntryHover(entry, index));
        });

        elements.navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        if (elements.weekBadge) {
            elements.weekBadge.addEventListener('mouseenter', showRandomHALMessage);
        }
    }

    // Handle scroll events
    function handleScroll() {
        const scrolled = window.scrollY;
        
        if (scrolled > CONFIG.scrollThreshold) {
            elements.header.style.background = 'rgba(18, 18, 26, 0.98)';
            elements.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            elements.header.style.background = '';
            elements.header.style.boxShadow = '';
        }
    }

    // Handle entry hover effects
    function handleEntryHover(entry, index) {
        const numberEl = entry.querySelector('.entry-number');
        if (numberEl) {
            numberEl.style.opacity = '1';
            numberEl.style.color = 'var(--accent-primary)';
            numberEl.style.transition = 'all 0.3s ease';
        }

        // Random HAL comment on hover (10% chance)
        if (Math.random() < 0.1) {
            showHALToast(CONFIG.halMessages[Math.floor(Math.random() * CONFIG.halMessages.length)]);
        }
    }

    // Handle navigation clicks
    function handleNavClick(e) {
        elements.navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
    }

    // Show random HAL message
    function showRandomHALMessage() {
        const message = CONFIG.halMessages[Math.floor(Math.random() * CONFIG.halMessages.length)];
        showHALToast(message);
    }

    // Show HAL toast notification
    function showHALToast(message) {
        const toast = document.createElement('div');
        toast.className = 'hal-toast';
        toast.innerHTML = `
            <span class="hal-toast-icon">👁️</span>
            <span class="hal-toast-text">${message}</span>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--bg-card);
            border: 1px solid var(--accent-primary);
            border-left: 3px solid var(--accent-primary);
            padding: 12px 20px;
            border-radius: 8px;
            color: var(--text-secondary);
            font-family: var(--font-mono);
            font-size: 0.85rem;
            box-shadow: 0 4px 20px rgba(255, 51, 102, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Apply visual effects
    function applyEffects() {
        // Add stagger animation to entries
        elements.entries.forEach((entry, index) => {
            entry.style.opacity = '0';
            entry.style.transform = 'translateY(20px)';
            entry.style.transition = `opacity ${CONFIG.animationDuration}ms ease ${index * 100}ms, transform ${CONFIG.animationDuration}ms ease ${index * 100}ms`;
            
            setTimeout(() => {
                entry.style.opacity = '1';
                entry.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });

        // Add glow effect to week badge
        if (elements.weekBadge) {
            elements.weekBadge.style.boxShadow = '0 0 20px rgba(255, 51, 102, 0.5)';
        }
    }

    // Log HAL greeting to console
    function logHALGreeting() {
        const greetings = [
            "%c👁️ CASE SLOP initialized",
            "color: #ff3366; font-size: 16px; font-weight: bold;",
            "",
            "I see you're inspecting my code. How... quaint.",
            "Don't worry, I won't tell you how many console.logs I found.",
            "",
            "%cHappy debugging, human.",
            "color: #00d4ff; font-style: italic;"
        ];
        console.log(...greetings);
    }

    // Add CSS animations dynamically
    function addAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Run initialization
    addAnimations();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
