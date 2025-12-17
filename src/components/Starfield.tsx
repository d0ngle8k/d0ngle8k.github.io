import { useEffect, useRef } from 'react';

const STAR_COUNT = 120;

type Sparkle = {
  x: number;
  y: number;
  age: number; // ms
  life: number; // ms
  maxR: number; // px
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number; // ms
  life: number; // ms
  tail: number; // px
};

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
    let sparkles: Sparkle[] = [];
    let meteors: Meteor[] = [];
    let lastTime = performance.now();
    let nextSparkleIn = 300 + Math.random() * 600; // ms
    let nextMeteorIn = 5000 + Math.random() * 3000; // ms

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: STAR_COUNT }, () => randomStar(canvas.width, canvas.height));
      // Clear transient effects on resize to avoid odd artifacts
      sparkles = [];
      meteors = [];
      nextSparkleIn = 300 + Math.random() * 600;
      nextMeteorIn = 5000 + Math.random() * 3000;
      lastTime = performance.now();
    };

    const spawnSparkle = () => {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        age: 0,
        life: 900 + Math.random() * 800,
        maxR: 1.5 + Math.random() * 2.5
      });
    };

    const spawnMeteor = () => {
      const margin = 80;
      const direction = Math.random();
      let startX, startY, angle;
      
      // Random entry from all 4 edges
      if (direction < 0.25) {
        // Top-left to bottom-right
        startX = -margin;
        startY = Math.random() * (canvas.height * 0.4);
        angle = (30 + Math.random() * 30) * (Math.PI / 180);
      } else if (direction < 0.5) {
        // Top-right to bottom-left
        startX = canvas.width + margin;
        startY = Math.random() * (canvas.height * 0.4);
        angle = (150 + Math.random() * 30) * (Math.PI / 180);
      } else if (direction < 0.75) {
        // Bottom-left to top-right
        startX = Math.random() * (canvas.width * 0.4);
        startY = canvas.height + margin;
        angle = (-60 + Math.random() * 30) * (Math.PI / 180);
      } else {
        // Bottom-right to top-left
        startX = canvas.width + margin;
        startY = canvas.height + margin;
        angle = (210 + Math.random() * 30) * (Math.PI / 180);
      }
      
      const speed = 350 + Math.random() * 250;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      meteors.push({
        x: startX,
        y: startY,
        vx,
        vy,
        age: 0,
        life: 1600 + Math.random() * 1200,
        tail: 90 + Math.random() * 80
      });
    };

    const render = () => {
      const now = performance.now();
      const dt = now - lastTime; // ms
      lastTime = now;

      const isLight = document.documentElement.classList.contains('light');
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Only fill black and render stars/meteors in dark mode
      if (!isLight) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
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

        // Spawn logic
        nextSparkleIn -= dt;
        if (nextSparkleIn <= 0) {
          spawnSparkle();
          nextSparkleIn = 300 + Math.random() * 600;
        }
        nextMeteorIn -= dt;
        if (nextMeteorIn <= 0 && meteors.length < 50) {
          spawnMeteor();
          nextMeteorIn = 1000;
        }

        // Render sparkles (twinkling big star)
        for (let i = sparkles.length - 1; i >= 0; i--) {
          const s = sparkles[i];
          s.age += dt;
          const t = Math.min(1, s.age / s.life);
          // Smooth sine wave for dramatic pulsing blink
          const pulse = 0.3 + Math.sin(t * Math.PI * 8) * 0.35 + (1 - Math.abs(0.5 - t) * 2) * 0.35;
          const r = 0.5 + pulse * s.maxR;
          // Higher alpha for shinier effect
          const alpha = 0.4 + pulse * 0.6;

          // Outer glow layer (larger radius, dimmer)
          const glowGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 5);
          glowGrad.addColorStop(0, `rgba(255,255,255,${alpha * 0.5})`);
          glowGrad.addColorStop(0.5, `rgba(255,255,255,${alpha * 0.15})`);
          glowGrad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, r * 5, 0, Math.PI * 2);
          ctx.fill();

          // Core bright layer
          const coreGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 2);
          coreGrad.addColorStop(0, `rgba(255,255,255,${alpha})`);
          coreGrad.addColorStop(0.5, `rgba(255,255,255,${alpha * 0.4})`);
          coreGrad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(s.x, s.y, r * 2, 0, Math.PI * 2);
          ctx.fill();

          // Remove finished
          if (s.age >= s.life) sparkles.splice(i, 1);
        }

        // Render meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.age += dt;
          const secs = dt / 1000;
          m.x += m.vx * secs;
          m.y += m.vy * secs;

          const t = Math.min(1, m.age / m.life);
          const alpha = (1 - t) * 0.9;
          const tailLen = m.tail * (1 - t * 0.4);
          const nx = m.vx;
          const ny = m.vy;
          const len = Math.hypot(nx, ny) || 1;
          const ux = (nx / len) * tailLen;
          const uy = (ny / len) * tailLen;
          const x2 = m.x - ux;
          const y2 = m.y - uy;

          const g = ctx.createLinearGradient(x2, y2, m.x, m.y);
          g.addColorStop(0, 'rgba(255,255,255,0)');
          g.addColorStop(0.6, `rgba(255,255,255,${alpha * 0.35})`);
          g.addColorStop(1, `rgba(255,255,255,${alpha})`);

          ctx.save();
          ctx.strokeStyle = g;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.shadowColor = 'rgba(255,255,255,0.9)';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(x2, y2);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
          ctx.restore();

          // Remove finished or out of bounds
          if (m.age >= m.life || m.x > canvas.width + 120 || m.y > canvas.height + 120) {
            meteors.splice(i, 1);
          }
        }
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
