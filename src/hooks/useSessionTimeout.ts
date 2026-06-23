import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TIMEOUT_DURATION = 10 * 60 * 1000; // 10 minutes of inactivity

const useSessionTimeout = () => {
  const navigate = useNavigate();

  const resetTimer = useCallback(() => {
    // Clear existing timer
    if (window.sessionTimer) clearTimeout(window.sessionTimer);

    // Start a fresh 8 hour countdown
    window.sessionTimer = setTimeout(() => {
      navigate('/');
    }, TIMEOUT_DURATION);
  }, [navigate]);

  useEffect(() => {
    // Events that count as user activity
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'click'];

    // Attach listeners
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Start the initial timer
    resetTimer();

    // Cleanup on unmount
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (window.sessionTimer) clearTimeout(window.sessionTimer);
    };
  }, [resetTimer]);
};

export default useSessionTimeout;