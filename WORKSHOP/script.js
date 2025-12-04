// GitHub Copilot Workshop - Interactive Scripts

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all expandable sections
  initExpandables();
  
  // Set active nav item based on current page
  setActiveNavItem();
  
  // Mobile menu toggle
  initMobileMenu();
  
  // Initialize task tracking (checkboxes and collapse)
  initTaskTracking();
  
  // Initialize progress display
  initProgressDisplay();
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
 * Initialize task tracking with checkboxes and collapse functionality
 */
function initTaskTracking() {
  const tasks = document.querySelectorAll('.task');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  tasks.forEach((task, index) => {
    const taskId = `${currentPage}-task-${index}`;
    const header = task.querySelector('.task-header');
    
    if (!header) return;
    
    // Add checkbox if not already present
    if (!header.querySelector('.task-checkbox')) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.setAttribute('aria-label', 'Mark task as complete');
      header.insertBefore(checkbox, header.firstChild);
      
      // Add collapse icon
      const collapseIcon = document.createElement('span');
      collapseIcon.className = 'task-collapse-icon';
      collapseIcon.textContent = '▼';
      header.appendChild(collapseIcon);
    }
    
    const checkbox = header.querySelector('.task-checkbox');
    const collapseIcon = header.querySelector('.task-collapse-icon');
    
    // Load saved state
    const savedState = getTaskState(taskId);
    if (savedState.completed) {
      checkbox.checked = true;
      task.classList.add('completed');
    }
    if (savedState.collapsed) {
      task.classList.add('collapsed');
      if (collapseIcon) collapseIcon.textContent = '▶';
    }
    
    // Checkbox click - toggle completion
    checkbox.addEventListener('click', function(e) {
      e.stopPropagation();
      const isCompleted = checkbox.checked;
      task.classList.toggle('completed', isCompleted);
      saveTaskState(taskId, { 
        completed: isCompleted, 
        collapsed: task.classList.contains('collapsed') 
      });
    });
    
    // Header click (not on checkbox) - toggle collapse
    header.addEventListener('click', function(e) {
      if (e.target === checkbox) return;
      
      task.classList.toggle('collapsed');
      const isCollapsed = task.classList.contains('collapsed');
      if (collapseIcon) {
        collapseIcon.textContent = isCollapsed ? '▶' : '▼';
      }
      saveTaskState(taskId, { 
        completed: checkbox.checked, 
        collapsed: isCollapsed 
      });
    });
  });
}

/**
 * Get task state from localStorage
 */
function getTaskState(taskId) {
  try {
    const stored = localStorage.getItem('workshop-tasks');
    if (stored) {
      const tasks = JSON.parse(stored);
      return tasks[taskId] || { completed: false, collapsed: false };
    }
  } catch (e) {
    console.error('Error reading task state:', e);
  }
  return { completed: false, collapsed: false };
}

/**
 * Save task state to localStorage
 */
function saveTaskState(taskId, state) {
  try {
    const stored = localStorage.getItem('workshop-tasks');
    const tasks = stored ? JSON.parse(stored) : {};
    tasks[taskId] = state;
    localStorage.setItem('workshop-tasks', JSON.stringify(tasks));
    updateProgressDisplay();
  } catch (e) {
    console.error('Error saving task state:', e);
  }
}

/**
 * Initialize progress display in sidebar
 */
function initProgressDisplay() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarHeader = sidebar?.querySelector('.sidebar-header');
  
  if (!sidebarHeader || document.querySelector('.progress-section')) return;
  
  const progressSection = document.createElement('div');
  progressSection.className = 'progress-section';
  progressSection.innerHTML = `
    <div class="progress-header">
      <span class="progress-label">Progress</span>
      <span class="progress-count">0 completed</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <button class="reset-progress-btn">Reset Progress</button>
  `;
  
  sidebarHeader.after(progressSection);
  
  // Reset button handler
  progressSection.querySelector('.reset-progress-btn').addEventListener('click', function() {
    if (confirm('Reset all task progress? This cannot be undone.')) {
      localStorage.removeItem('workshop-tasks');
      location.reload();
    }
  });
  
  updateProgressDisplay();
}

/**
 * Update progress display
 */
function updateProgressDisplay() {
  const progressCount = document.querySelector('.progress-count');
  const progressFill = document.querySelector('.progress-fill');
  
  if (!progressCount || !progressFill) return;
  
  try {
    const stored = localStorage.getItem('workshop-tasks');
    if (stored) {
      const tasks = JSON.parse(stored);
      const completedCount = Object.values(tasks).filter(t => t.completed).length;
      const totalTasks = Object.keys(tasks).length;
      
      progressCount.textContent = `${completedCount} completed`;
      
      // Calculate percentage based on tasks user has interacted with
      // Or estimate total tasks across all pages (approximate)
      const estimatedTotal = Math.max(totalTasks, 30); // Assume ~30 total tasks
      const percentage = Math.min(100, Math.round((completedCount / estimatedTotal) * 100));
      progressFill.style.width = `${percentage}%`;
    }
  } catch (e) {
    console.error('Error updating progress:', e);
  }
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
