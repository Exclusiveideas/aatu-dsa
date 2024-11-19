'use client'

import useAuthStore from '@/store/authStore';
import { useEffect } from 'react';

const SetTheme = () => {
    
  const websiteDarkTheme = useAuthStore((state) => state.websiteDarkTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', websiteDarkTheme);
    localStorage.setItem('theme', websiteDarkTheme);
  }, [websiteDarkTheme]);
    

  return (
    <div></div>
  )
}

export default SetTheme;