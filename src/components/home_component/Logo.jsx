import { Link } from 'react-router-dom';
import React from 'react';
import logo from '../../../assets/img/logo-berau3.png';

const Logo = (props) => {
  const {
    className = 'flex gap-1 md:justify-between items-end',
    titleclassName = 'flex flex-col',
    text,
    addres,
    textclassName = 'text-gray-700 font-bold text-[12px] md:text-[20px] font-[Poppins] text-nowrap',
    addresclassName = 'text-gray-700 font-medium text-[5px] md:text-[8px] font-[Poppins] tracking-[.35px] md:tracking-[.75px] text-nowrap',
    logoclassName = 'h-[24px] md:h-[40px] ',
    href,
  } = props;
  return (
    <Link to={href} className={className}>
      <div className='h-full flex items-end justify-end'>
        <img className={logoclassName} src={logo} alt='' />
      </div>
      <div className={titleclassName}>
        <span className={textclassName}>{text}</span>
        <span className={addresclassName}>{addres}</span>
      </div>
    </Link>
  );
};

export default Logo;
