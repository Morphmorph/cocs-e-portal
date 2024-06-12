import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ScrollToTopOnNavigate() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      const currentPath = window.location.pathname;
      const parentPath = currentPath.split('/').slice(0, -1).join('/'); // Get the parent path
      navigate(parentPath, { replace: true }); // Replace the current entry in the history with the parent path
    };

    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [navigate]);

  return null;
}

export default ScrollToTopOnNavigate;
