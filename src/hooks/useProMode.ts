import { useState, useEffect } from 'react';

const PRO_MODE_KEY = 'will-ai-pro-mode';

export const useProMode = () => {
  const [isProMode, setIsProMode] = useState(() => {
    try {
      const saved = localStorage.getItem(PRO_MODE_KEY);
      return saved === 'true';
    } catch (error) {
      console.error('Error loading PRO mode status:', error);
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRO_MODE_KEY, isProMode.toString());
    } catch (error) {
      console.error('Error saving PRO mode status:', error);
    }
  }, [isProMode]);

  const activateProMode = () => {
    setIsProMode(true);
  };

  const deactivateProMode = () => {
    setIsProMode(false);
  };

  return {
    isProMode,
    activateProMode,
    deactivateProMode,
  };
};