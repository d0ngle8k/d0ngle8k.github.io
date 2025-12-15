import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const DURATION_SECONDS = 60;
const TARGET_SIZE = 26;
const TRACK_THRESHOLD_MS = 0;

const DIFFICULTY_SPEEDS = {
  easy: 0.22,
  medium: 0.4,
  hard: 0.65
};

// EmailJS Configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

// Voltaic-style aim tracking: hold cursor over target to score points.
export function ArcadeIntro() {
  const areaRef = useRef<HTMLDivElement>(null);
  const trackingRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastFrameTimeRef = useRef<number>(0);
  const scoreIntervalRef = useRef<number | null>(null);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS);
  const [score, setScore] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [hitFrames, setHitFrames] = useState(0);
  const [targetPos, setTargetPos] = useState({ x: 60, y: 60 });
  const [isTracking, setIsTracking] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const randomSpeed = () => (Math.random() * 0.4 + 0.6) * DIFFICULTY_SPEEDS[difficulty];
  
  const setRandomVelocity = () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = randomSpeed();
    velocityRef.current = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
  };

  const animateTarget = () => {
    const area = areaRef.current;
    if (!area || !running) return;

    const rect = area.getBoundingClientRect();
    const padding = 24;

    setTargetPos((prev) => {
      let newX = prev.x + velocityRef.current.x;
      let newY = prev.y + velocityRef.current.y;

      // Bounce off edges with gentle reflection (less jitter)
      if (newX <= padding || newX >= rect.width - TARGET_SIZE - padding) {
        velocityRef.current.x *= -1;
        newX = Math.max(padding, Math.min(rect.width - TARGET_SIZE - padding, newX));
      }
      if (newY <= padding || newY >= rect.height - TARGET_SIZE - padding) {
        velocityRef.current.y *= -1;
        newY = Math.max(padding, Math.min(rect.height - TARGET_SIZE - padding, newY));
      }

      // Rarely adjust heading to keep movement organic without reacting to cursor
      if (Math.random() < 0.004) {
        setRandomVelocity();
      }

      return { x: newX, y: newY };
    });

    animationRef.current = requestAnimationFrame(animateTarget);
  };

  useEffect(() => {
    // Create hit sound (simple beep using Web Audio API)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0.1;

    const playHitSound = () => {
      const oscillator = audioContext.createOscillator();
      oscillator.connect(gainNode);
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.08);
    };

    audioRef.current = { play: playHitSound } as any;
  }, []);

  useEffect(() => {
    if (!running) return;
    setTimeLeft(DURATION_SECONDS);
    setScore(0);
    setTotalFrames(0);
    setHitFrames(0);
    setRandomVelocity();
    setTargetPos({ x: 150, y: 150 });
    animateTarget();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
        scoreIntervalRef.current = null;
      }
    };
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          setGameEnded(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const checkTracking = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!running || !isMouseDown) {
      setIsTracking(false);
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
        scoreIntervalRef.current = null;
      }
      return;
    }

    const target = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - target.left;
    const mouseY = e.clientY - target.top;

    const distance = Math.sqrt(
      Math.pow(mouseX - targetPos.x, 2) + Math.pow(mouseY - targetPos.y, 2)
    );

    setTotalFrames((f) => f + 1);

    if (distance <= TARGET_SIZE / 2) {
      setHitFrames((f) => f + 1);
      if (!isTracking) {
        setIsTracking(true);
        if (audioRef.current) (audioRef.current as any).play();
        
        // Start continuous scoring: 1ms = 1 point
        lastFrameTimeRef.current = Date.now();
        scoreIntervalRef.current = window.setInterval(() => {
          const now = Date.now();
          const elapsed = now - lastFrameTimeRef.current;
          lastFrameTimeRef.current = now;
          setScore((s) => s + elapsed);
        }, 16); // Update every ~16ms (60fps)
      }
    } else {
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
        scoreIntervalRef.current = null;
      }
      setIsTracking(false);
    }
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    if (scoreIntervalRef.current) {
      clearInterval(scoreIntervalRef.current);
      scoreIntervalRef.current = null;
    }
    setIsTracking(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submission = {
      ...formData,
      score,
      timestamp: new Date().toISOString()
    };
    console.log('Game results submitted:', submission);
    // Here you would send to your backend/database
    alert('Thanks for playing! Your score: ' + score);
    setGameEnded(false);
    setFormData({ name: '', age: '', phone: '', email: '' });
  };

  const endGame = () => {
    setRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    showResultsPopup();
  };

  const showResultsPopup = async () => {
    const accuracy = totalFrames > 0 ? ((hitFrames / totalFrames) * 100).toFixed(1) : '0';

    const { value: formValues } = await Swal.fire({
      title: 'Game Over!',
      width: 'min(520px, 92vw)',
      padding: '0',
      position: 'center',
      customClass: {
        popup: 'swal-centered-popup'
      },
      html: `
        <div style="padding: 20px; background: #0f1117; color: #e5e7eb; text-align: left;">
          <div style="background: linear-gradient(135deg, #0b1424, #0f1b2f); border: 1px solid #1f2937; border-radius: 12px; padding: 16px; margin-bottom: 18px; box-shadow: 0 12px 30px rgba(0,0,0,0.35);">
            <div style="font-size: 13px; color: #9ca3af; margin-bottom: 6px;">Session Summary</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div style="background: #0f172a; border-radius: 10px; padding: 12px; border: 1px solid #1f2937;">
                <div style="color: #10b981; font-weight: 700; font-size: 22px;">${score}</div>
                <div style="color: #9ca3af; font-size: 12px;">Score</div>
              </div>
              <div style="background: #0f172a; border-radius: 10px; padding: 12px; border: 1px solid #1f2937;">
                <div style="color: #38bdf8; font-weight: 700; font-size: 22px;">${accuracy}%</div>
                <div style="color: #9ca3af; font-size: 12px;">Accuracy</div>
              </div>
            </div>
            <div style="margin-top: 10px; color: #9ca3af; font-size: 13px;">Difficulty: <span style="color: #e5e7eb; font-weight: 600;">${difficulty}</span></div>
          </div>

          <div style="display: grid; gap: 12px;">
            <input id="swal-name" class="swal2-input" placeholder="Your Name" required style="border-radius: 10px; background: #111827; border: 1px solid #1f2937; color: #e5e7eb;" />
            <input id="swal-age" type="number" min="1" max="150" class="swal2-input" placeholder="Your Age" required style="border-radius: 10px; background: #111827; border: 1px solid #1f2937; color: #e5e7eb;" />
            <input id="swal-phone" class="swal2-input" placeholder="Your Phone" required style="border-radius: 10px; background: #111827; border: 1px solid #1f2937; color: #e5e7eb;" />
            <input id="swal-email" type="email" class="swal2-input" placeholder="Your Email" required style="border-radius: 10px; background: #111827; border: 1px solid #1f2937; color: #e5e7eb;" />
          </div>
        </div>
      `,
      background: '#0b0c10',
      color: '#e5e7eb',
      confirmButtonText: 'Submit Results',
      confirmButtonColor: '#10b981',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#ef4444',
      focusConfirm: false,
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        const firstInput = document.getElementById('swal-name') as HTMLInputElement;
        if (firstInput) firstInput.focus();
      },
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        const age = (document.getElementById('swal-age') as HTMLInputElement).value;
        const phone = (document.getElementById('swal-phone') as HTMLInputElement).value;
        const email = (document.getElementById('swal-email') as HTMLInputElement).value;

        if (!name || !age || !phone || !email) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }

        return { name, age, phone, email };
      }
    });

    if (formValues) {
      await sendEmail(formValues, score, accuracy);
    }
    
    // Reset game
    setScore(0);
    setTotalFrames(0);
    setHitFrames(0);
    setTimeLeft(DURATION_SECONDS);
  };

  const sendEmail = async (userData: any, score: number, accuracy: string) => {
    try {
      const templateParams = {
        // Common contact-style fields used by default EmailJS templates
        to_email: 'trggiathanh2003@gmail.com', // Replace with your Gmail in EmailJS template
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        subject: `Aim Trainer Results - ${userData.name}`,
        message: `Score: ${score}\nAccuracy: ${accuracy}%\nDifficulty: ${difficulty}\nAge: ${userData.age}\nEmail: ${userData.email}\nPhone: ${userData.phone}\nTimestamp: ${new Date().toLocaleString()}`,

        // Detailed fields for custom templates
        player_name: userData.name,
        player_age: userData.age,
        player_phone: userData.phone,
        player_email: userData.email,
        game_score: score,
        game_accuracy: accuracy,
        game_difficulty: difficulty,
        timestamp: new Date().toLocaleString()
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      await Swal.fire({
        title: 'Success!',
        text: 'Your results have been sent!',
        icon: 'success',
        background: '#1a1b26',
        color: '#fff',
        confirmButtonColor: '#10b981'
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      await Swal.fire({
        title: 'Error',
        text: 'Failed to send results. Please try again.',
        icon: 'error',
        background: '#1a1b26',
        color: '#fff',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  if (gameEnded) {
    showResultsPopup();
    setGameEnded(false);
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="mb-3 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm text-secondary">
          <span className="text-primary font-medium">Aim trainer (Voltaic-style)</span>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-primary font-semibold">Score: {score}</span>
            <span className="text-yellow-400">Accuracy: {totalFrames > 0 ? ((hitFrames / totalFrames) * 100).toFixed(1) : 0}%</span>
            <span>Time: {timeLeft}s</span>
            {!running ? (
              <button
                className="btn-primary text-xs"
                onClick={() => setRunning(true)}
              >
                Start
              </button>
            ) : (
              <button
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-1 text-xs transition"
                onClick={endGame}
              >
                End Game
              </button>
            )}
          </div>
        </div>
        {!running && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-secondary">Difficulty:</span>
            <button
              onClick={() => setDifficulty('easy')}
              className={`rounded-full px-3 py-1 text-xs transition ${
                difficulty === 'easy'
                  ? 'bg-green-600 text-white'
                  : 'border border-white/10 bg-white/5 text-secondary hover:bg-white/10'
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty('medium')}
              className={`rounded-full px-3 py-1 text-xs transition ${
                difficulty === 'medium'
                  ? 'bg-yellow-600 text-white'
                  : 'border border-white/10 bg-white/5 text-secondary hover:bg-white/10'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setDifficulty('hard')}
              className={`rounded-full px-3 py-1 text-xs transition ${
                difficulty === 'hard'
                  ? 'bg-red-600 text-white'
                  : 'border border-white/10 bg-white/5 text-secondary hover:bg-white/10'
              }`}
            >
              Hard
            </button>
          </div>
        )}
      </div>

      <div
        ref={areaRef}
        className="relative w-full rounded-lg border border-white/10 bg-[#0d0e12] cursor-crosshair"
        style={{ height: 320 }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={checkTracking}
        onMouseLeave={handleMouseUp}
      >
        {running && (
          <div
            className={`absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full shadow transition-colors pointer-events-none ${
              isTracking ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ left: targetPos.x, top: targetPos.y }}
            aria-label="Aim target"
          />
        )}
      </div>

      {!running && (
        <p className="mt-2 text-xs text-secondary">
          Press start, then hold mouse button while tracking the moving target.
        </p>
      )}
    </div>
  );
}
