import { Poppins } from 'next/font/google';
import './menuNav.css';
import useHomeStore from '@/store/homeStore';
import { useEffect, useRef } from 'react';
import CTAButton from '../ctaButton';
import ThemeToggleBtn from '../themeToggleBtn';


const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500'], 
    display: 'swap',   
  });


const MenuNav = () => {
  const isNavbarOpen = useHomeStore((state) => state.isNavbarOpen);
  const menuItemClicked = useHomeStore((state) => state.menuItemClicked);
  const setMenuNavRef = useHomeStore((state) => state.setMenuNavRef);
  const setMenuNavWrapperRef = useHomeStore((state) => state.setMenuNavWrapperRef);

  const menuNavRef = useRef(null);
  const menuNavWrapperRef = useRef(null);

  useEffect(() => {
    if (menuNavRef.current && menuNavWrapperRef.current) {
      setMenuNavWrapperRef(menuNavWrapperRef.current);
      setMenuNavRef(menuNavRef.current);
    }
  }, [setMenuNavRef, setMenuNavWrapperRef]);
  
  const wrapperClass = `menuNavWrapper ${menuItemClicked == false ? 'justLoaded' : (isNavbarOpen ? 'isOpen' : 'isClose')}`;
  const containerClass = `menuContainer ${poppins.className} ${isNavbarOpen ? 'isOpen' : 'isClose'}`; 

  return (
    <div ref={menuNavWrapperRef} className={wrapperClass}>
      <div ref={menuNavRef} className={containerClass}>
        {['Home', 'Academics', 'Library', 'Staff Portal', 'Contact Us'].map((item, i) => (
          <div key={i} className={`menuItems ${i < 3 ? 'large' : 'small'} ${i == 3 && 'marginTop '}`}>
            <a href="https://tech-u.edu.ng/">{item}</a>
          </div>
        ))}
        <div className="menuNav_portalBtn_wrap">
          <CTAButton linkTo="/portal/auth">Student Portal</CTAButton>
        </div>
        <div className="menuNav_themeToggle_wrap">
          <ThemeToggleBtn />
        </div>
      </div>
    </div>
  );
}; 

export default MenuNav;