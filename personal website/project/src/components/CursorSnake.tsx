import { useEffect, useState, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

const CursorSnake = () => {
  const [mousePosition, setMousePosition] = useState<Point>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
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
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ cursor: 'none' }}
    >
      <div
        className="absolute w-4 h-4 rounded-full bg-white transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          opacity: 0.7,
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          willChange: 'transform',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default CursorSnake; 