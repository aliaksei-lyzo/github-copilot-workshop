// GitHub Copilot Workshop - Interactive Scripts

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all expandable sections
  initExpandables();
  
  // Set active nav item based on current page
  setActiveNavItem();
  
  // Mobile menu toggle
  initMobileMenu();
});

/**
 * Initialize expandable sections (hints, prompts, solutions)
 */
function initExpandables() {
  const expandables = document.querySelectorAll('.expandable');
  
  expandables.forEach(expandable => {
    const header = expandable.querySelector('.expandable-header');
    
    if (header) {
      header.addEventListener('click', function() {
        expandable.classList.toggle('open');
        
        // Update icon
        const icon = header.querySelector('.expandable-icon');
        if (icon) {
          icon.textContent = expandable.classList.contains('open') ? '▼' : '▶';
        }
      });
    }
  });
}

/**
 * Set active navigation item based on current page URL
 */
function setActiveNavItem() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        item.classList.add('active');
      }
    }
  });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  // Create mobile menu button if it doesn't exist
  const menuBtn = document.createElement('button');
  menuBtn.className = 'mobile-menu-btn';
  menuBtn.innerHTML = '☰';
  menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
  
  // Add styles for the button
  menuBtn.style.cssText = `
    display: none;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 200;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 20px;
    cursor: pointer;
    color: var(--color-text);
  `;
  
  // Show on mobile
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  function handleMobileChange(e) {
    menuBtn.style.display = e.matches ? 'block' : 'none';
  }
  mediaQuery.addListener(handleMobileChange);
  handleMobileChange(mediaQuery);
  
  document.body.appendChild(menuBtn);
  
  const sidebar = document.querySelector('.sidebar');
  
  menuBtn.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    menuBtn.innerHTML = sidebar.classList.contains('open') ? '✕' : '☰';
  });
  
  // Close sidebar when clicking on a link (mobile)
  if (sidebar) {
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        if (mediaQuery.matches) {
          sidebar.classList.remove('open');
          menuBtn.innerHTML = '☰';
        }
      });
    });
  }
}

/**
 * Expand all sections (useful for printing)
 */
function expandAll() {
  document.querySelectorAll('.expandable').forEach(exp => {
    exp.classList.add('open');
    const icon = exp.querySelector('.expandable-icon');
    if (icon) icon.textContent = '▼';
  });
}

/**
 * Collapse all sections
 */
function collapseAll() {
  document.querySelectorAll('.expandable').forEach(exp => {
    exp.classList.remove('open');
    const icon = exp.querySelector('.expandable-icon');
    if (icon) icon.textContent = '▶';
  });
}

/**
 * Copy code to clipboard
 */
function copyCode(button) {
  const pre = button.closest('.code-block').querySelector('pre');
  const code = pre.textContent;
  
  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy code:', err);
  });
}
