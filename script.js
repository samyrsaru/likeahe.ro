const themes = ['system', 'light', 'dark'];

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-theme', effectiveTheme);
  document.documentElement.setAttribute('data-theme-mode', theme);
  
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    const newMeta = document.createElement('meta');
    newMeta.name = 'theme-color';
    document.head.appendChild(newMeta);
  }
  document.querySelector('meta[name="theme-color"]').setAttribute(
    'content', effectiveTheme === 'dark' ? '#111' : '#fafafa'
  );
  
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'system';
  const theme = themes.includes(saved) ? saved : 'system';
  setTheme(theme);
}

document.getElementById('themeToggle').addEventListener('click', () => {
  const current = localStorage.getItem('theme') || 'system';
  const idx = themes.indexOf(current);
  const next = themes[(idx + 1) % themes.length];
  setTheme(next);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (localStorage.getItem('theme') === 'system') {
    setTheme('system');
  }
});

initTheme();
