import { useState, useEffect , Dispatch, SetStateAction} from 'react';

function useDarkMode(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const savedMode = localStorage.getItem('darkMode') === 'enabled';
  const [darkMode, setDarkMode] = useState(savedMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
}

export default useDarkMode;
