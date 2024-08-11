import { Link } from 'react-router-dom';
import React from 'react';
export default function Icon({ href, src, alt, text, description }) {
  return (
    <Link
      to={href}
      className='md:w-full flex flex-col items-center gap-2 lg:gap-4 p-2 md:p-4 xl:p-6 bg-white shadow-lg border-1 border-teal-700 rounded-md cursor-pointer hover:bg-teal-50 hover:duration-500'
    >
      <div className='flex items-center justify-center w-20 h-20'>
        <img src={src} alt={alt} />
      </div>
      <div className='font-[Poppins] flex flex-col gap-2 w-full items-center'>
        <h1 className=' font-medium text-[10px] md:text-xs xl:text-[16px] text-gray-700 md:text-nowrap'>
          {text}
        </h1>
        <p className='text-gray-400 text-[8px] md:text-[10px] lg:text-xs text-justify'>
          {description}
        </p>
      </div>
    </Link>
  );
}
