import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('light', stored === 'light');
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');

    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-lg transition-all duration-300 hover:bg-white/10 hover:scale-110 ${
        isAnimating ? 'animate-spin-slow' : ''
      }`}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="transition-all duration-300">
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
