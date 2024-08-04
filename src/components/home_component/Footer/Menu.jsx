import { Link } from 'react-router-dom';
import React from 'react';
function Menu({ children }) {
  return <div className='flex flex-col gap-3 lg:gap-5'>{children}</div>;
}

function Title({ text }) {
  return (
    <h1 className='font-[Poppins] font-bold text-white text-[12px] md:text-[8px] lg:text-[10px] xl:text-[12px]'>
      {text}:
    </h1>
  );
}

function List({ children }) {
  return <div className='flex flex-col gap-5'>{children}</div>;
}

function Data({ children, href, text, target }) {
  return (
    <div className='[&>svg]:fill-white [&>svg]:md:max-lg:h-3 [&>svg]:md:max-lg:w-3 flex items-center gap-3 md:gap-1 lg:gap-3'>
      {children}
      <Link
        to={href}
        target={target}
        className='font-[Poppins] text-white text-[10px] md:text-[6px] lg:text-[8px] xl:text-[12px] cursor-pointer hover:text-gray-400'
      >
        {text}
      </Link>
    </div>
  );
}

Menu.Title = Title;
Menu.List = List;
Menu.Data = Data;

export default Menu;
