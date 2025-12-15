import { useEffect, useRef } from 'react';

const STAR_COUNT = 120;

function randomStar(width: number, height: number) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * width
  };
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let stars = Array.from({ length: STAR_COUNT }, () => randomStar(canvas.width, canvas.height));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: STAR_COUNT }, () => randomStar(canvas.width, canvas.height));
    };

    const render = () => {
      const isLight = document.documentElement.classList.contains('light');
      
      // Clear with theme-appropriate background
      ctx.fillStyle = isLight ? '#ffffff' : '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Only render stars in dark mode
      if (!isLight) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        stars.forEach((star) => {
          const brightness = 0.5 + Math.random() * 0.5;
          ctx.fillStyle = `rgba(255,255,255,${brightness})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, 1 + Math.random() * 1.2, 0, Math.PI * 2);
          ctx.fill();
          star.y += 0.05;
          if (star.y > canvas.height) star.y = 0;
        });
      }

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full transition-opacity duration-500 pointer-events-none" aria-hidden />;
}
