import { useEffect, useState, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

const isMobile = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);

const CursorSnake = () => {
  const [mousePosition, setMousePosition] = useState<Point>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(isMobile());
  const [cursorColor, setCursorColor] = useState<'white' | 'black'>('white');
  const requestRef = useRef<number>();

  // Detect mobile device and update on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileDevice(isMobile());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse move and visibility logic
  useEffect(() => {
    if (isMobileDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
      // Detect background color for contrast
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el) {
        const bg = window.getComputedStyle(el).backgroundColor;
        // Simple luminance check for white/black contrast
        let color = 'white';
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0], 10);
            const g = parseInt(rgb[1], 10);
            const b = parseInt(rgb[2], 10);
            // Perceived luminance formula
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            color = luminance > 180 ? 'black' : 'white';
          }
        }
        setCursorColor(color as 'white' | 'black');
      } else {
        setCursorColor('white');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVisible, isMobileDevice]);

  if (isMobileDevice) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ cursor: 'none' }}
    >
      <div
        className={`absolute w-4 h-4 rounded-full ${cursorColor === 'white' ? 'bg-white' : 'bg-black'}`} 
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          opacity: 0.7,
          boxShadow: cursorColor === 'white'
            ? '0 0 10px rgba(255, 255, 255, 0.5)'
            : '0 0 10px rgba(0, 0, 0, 0.5)',
          willChange: 'transform',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
      />
    </div>
  );
};

export default CursorSnake; 