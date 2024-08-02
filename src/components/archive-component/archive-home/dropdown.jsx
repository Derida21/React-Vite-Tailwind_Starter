import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, children, className, onClick, href }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className='flex flex-col '>
      <div className='flex items-center justify-between w-full'>
        <button
          onClick={toggleDropdown}
          className='w-full flex items-center gap-1 font-[Poppins text-sm font-medium pb-2 border-b border-gray-300'
        >
          {title}
          <span className=''>
            {isOpen ? (
              <IconCaretUpFilled className='w-5 hover:text-teal-500 cursor-pointer' />
            ) : (
              <IconCaretDownFilled className='w-5 hover:text-teal-500 cursor-pointer' />
            )}
          </span>
        </button>
        {isOpen ? (
          <Link
            to={href}
            onClick={onClick}
            className='font-[Poppins] font-medium text-[10px] text-gray-500 hover:text-gray-700 underline underline-offset-4 cursor-pointer'
          >
            Selengkapnya
          </Link>
        ) : (
          ''
        )}
      </div>
      {isOpen && <div className={` ${className}`}>{children}</div>}
    </div>
  );
};

export default Dropdown;
