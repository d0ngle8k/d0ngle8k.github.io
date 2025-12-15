import { useState } from 'react';

type NavLink = { href: string; label: string };

type Props = { links: NavLink[] };

export function MobileNav({ links }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-surface/95 backdrop-blur border-b border-white/10 shadow-lg md:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-4 space-y-3">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-white/10 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
