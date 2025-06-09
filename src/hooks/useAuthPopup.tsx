
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useAuthPopup = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setShowAuthModal(false);
      return;
    }

    // Show auth modal after 30 seconds if user is not logged in
    const timer = setTimeout(() => {
      if (!user) {
        setShowAuthModal(true);
      }
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [user]);

  return {
    showAuthModal,
    setShowAuthModal,
  };
};
