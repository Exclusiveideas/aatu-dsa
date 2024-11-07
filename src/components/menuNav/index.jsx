import { Poppins } from 'next/font/google';
import './menuNav.css';
import useHomeStore from '@/store/homeStore';
import { useEffect, useRef, useState } from 'react';


const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500'], 
    display: 'swap',   
  });


const MenuNav = () => {
    const [justLoaded, setJustLoaded] = useState(true)
    const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);
    const setMenuNavRef = useHomeStore((state) => state.setMenuNavRef);
    const setMenuNavWrapperRef = useHomeStore((state) => state.setMenuNavWrapperRef);

    const menuNavRef = useRef(null)
    const menuNavWrapperRef = useRef(null)

  useEffect(() => {
    if(isNavbarOpen) setJustLoaded(false)
  }, [isNavbarOpen])

  useEffect(() => {
    if(menuNavRef.current && menuNavWrapperRef.current) {
      setMenuNavWrapperRef(menuNavWrapperRef.current)
      setMenuNavRef(menuNavRef.current)
    }
  }, [menuNavRef, isNavbarOpen])
  

  return (
    <div ref={menuNavWrapperRef} className={`menuNavWrapper ${justLoaded ? 'justLoaded' : (isNavbarOpen ? 'isOpen' : 'isClose')}`}>
        <div ref={menuNavRef} className={`menuContainer ${poppins.className}  ${isNavbarOpen ? 'isOpen' : 'isClose'}`}>
            <div className="menuItems"><a href="https://tech-u.edu.ng/">Home</a></div>
            <div className="menuItems"><a href="https://tech-u.edu.ng/">Academics</a></div>
            <div className="menuItems"><a href="https://tech-u.edu.ng/">Library</a></div>
            <div className="menuItems"><a href="https://tech-u.edu.ng/">Staff Portal</a></div>
            <div className="menuItems"><a href="https://tech-u.edu.ng/">Contact Us</a></div>
        </div>
    </div>
  )
}

export default MenuNav