import React, { useState, useEffect } from 'react';
import Navmenu from './Navmenu';
import Logo from '../Logo';

function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-[999999] top-0 left-0 w-full flex justify-between items-center px-[20px] py-3 md:py-[30px] md:px-[60px] lg:px-[80px] xl:px-[160px] shadow-md bg-white transition-all duration-300 ${
        hasScrolled ? 'border-b-4 border-teal-700' : ''
      }`}
    >
      <Logo
        className='flex gap-2 justify-end items-end'
        logoclassName='h-6 md:h-9 flex items-center justify-end'
        text='Kampung Eka Sapta'
        addres='Kec. Talisayan Kab. Berau Kalimantan Timur'
        titleclassName='flex flex-col'
        href='/home'
      />
      <Navmenu />
    </div>
  );
}

export default Navbar;
