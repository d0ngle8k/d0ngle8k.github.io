import { useState } from 'react';

type NavLink = { href: string; label: string };

type Props = { links: NavLink[] };

export function MobileNav({ links }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5 text-primary hover:bg-white/10 transition-all"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
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

      {/* Dropdown Menu with smooth animation */}
      <div
        className={`absolute top-full right-0 mt-2 w-56 card rounded-lg p-0 overflow-hidden transition-all duration-300 origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible'
        }`}
      >
        <nav className="px-2 py-3 space-y-1">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-white/10 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
