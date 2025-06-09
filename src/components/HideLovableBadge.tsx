
import { useEffect } from 'react';

const HideLovableBadge = () => {
  useEffect(() => {
    // Hide the Lovable badge
    const hideBadge = () => {
      const badge = document.querySelector('a[href*="lovable.dev"]');
      if (badge) {
        (badge as HTMLElement).style.display = 'none';
      }
    };

    // Run immediately and also with a delay to catch dynamically added badges
    hideBadge();
    const interval = setInterval(hideBadge, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default HideLovableBadge;
