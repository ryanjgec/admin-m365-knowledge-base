
import { useState, useEffect } from 'react';

interface TypingEffectProps {
  phrases: string[];
  className?: string;
}

const TypingEffect = ({ phrases, className = "" }: TypingEffectProps) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setCurrentText(phrase.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }
      } else {
        setCurrentText(phrase.substring(0, currentText.length + 1));
        
        if (currentText === phrase) {
          setIsPaused(true);
        }
      }
    }, isDeleting ? 50 : isPaused ? 1500 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, phrases, currentPhrase]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypingEffect;
