import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface AnimatedTitleProps {
  title: string;
  level: 'h2' | 'h3'; // To specify if it should render as h2 or h3
  disableAnimation?: boolean; // New prop to disable animation
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title, level, disableAnimation = false }) => {
  const [displayedTitle, setDisplayedTitle] = useState(disableAnimation ? title : '');
  const isMounted = useRef(true);
  const { isDarkGreen } = useTheme();

  useEffect(() => {
    if (disableAnimation) {
      setDisplayedTitle(title);
      return;
    }
    isMounted.current = true;
    let index = 0;
    let isDeleting = false;

    const type = () => {
      if (!isMounted.current) return;

      const currentText = title;

      const textToDisplay = isDeleting ? currentText.slice(0, index--) : currentText.slice(0, index++);
      setDisplayedTitle(textToDisplay);

      let delay = 0;
      if (!isDeleting && index > currentText.length) {
        // Text is fully typed, now pause for 2 seconds
        isDeleting = true;
        delay = 2000; // 2 second pause
      } else if (isDeleting && index < 0) {
        // Text is fully deleted, pause before typing again
        isDeleting = false;
        index = 0;
        delay = 500; // Pause before starting to type again
      } else {
        // Typing or deleting
        delay = isDeleting ? 100 : 30; // Slightly faster typing/deleting than Hero title
      }

      setTimeout(type, delay);
    };

    type();

    return () => {
      isMounted.current = false; // Cleanup on unmount
    };
  }, [title, disableAnimation]); // Rerun effect if title or disableAnimation changes

  const Tag = level;

  return (
    <Tag className={`font-bold transition-colors duration-300 ${level === 'h2' ? 'text-3xl md:text-4xl mb-4' : 'text-2xl mb-10 text-center'} ${
      (disableAnimation || displayedTitle.length > 0)
        ? (isDarkGreen ? 'text-emerald-700' : 'text-white')
        : 'text-white'
    }`}>
      {displayedTitle}
    </Tag>
  );
};

export default AnimatedTitle; 