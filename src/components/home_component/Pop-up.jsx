import { IconMessageDots, IconUserFilled, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Popup = () => {
  const [showContacts, setShowContacts] = useState(false);

  const handleButtonClick = () => {
    setShowContacts(!showContacts);
  };

  return (
    <div className='z-[999999] fixed h-screen right-2 lg:right-5 xl:right-10 flex items-end justify-end py-5'>
      <div className='relative'>
        <div
          className={`transition-all duration-500 ease-in-out mt-6 ${
            showContacts ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
          } overflow-hidden`}
        >
          {showContacts && (
            <div className='flex flex-col gap-2 items-center pb-2 '>
              <Link
                to='/Home'
                className='bg-white rounded-full shadow-lg p-2 border hover:border-teal-700 [&>svg]:hover:fill-teal-700'
              >
                <IconUserFilled className='flex fill-gray-700' />
              </Link>
              <Link
                to='/Profil/Sejarah Desa'
                className='bg-white rounded-full shadow-lg p-2 border hover:border-teal-700 [&>svg]:hover:fill-teal-700'
              >
                <IconUserFilled className='flex fill-gray-700' />
              </Link>
            </div>
          )}
        </div>
        <button
          onClick={handleButtonClick}
          className='flex justify-center items-center w-[50px] h-[50px] bg-white outline-1 rounded-full shadow-lg transition-all duration-300 '
        >
          {showContacts ? <IconX /> : <IconMessageDots />}
        </button>
      </div>
    </div>
  );
};

export default Popup;
