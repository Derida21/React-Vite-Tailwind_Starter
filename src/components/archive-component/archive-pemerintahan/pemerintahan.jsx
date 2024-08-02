import React, { useState } from 'react';
import Layout from '../Layout';
import Keterangan from './keterangan/keterangan';
import Pengantar from './pengantar/pengantar';
import Hak from './hak-milik/hak-milik';

const Pemerintahan = () => {
  const [currentView, setCurrentView] = useState('list');

  const handleItemClick = (view) => {
    setCurrentView(view);
  };

  const handleBackClick = () => {
    setCurrentView('list');
  };

  const liststyle =
    'flex text-2xl px-5 py-3 border-2 border-teal-500 rounded-md font-[Poppins] text-teal-500 hover:text-white hover:bg-teal-500 cursor-pointer';

  return (
    <Layout>
      {currentView === 'list' ? (
        <ul className='flex w-full h-full items-center justify-center gap-5'>
          <li
            onClick={() => handleItemClick('Pengantar')}
            className={liststyle}
          >
            Pengantar
          </li>
          <li
            onClick={() => handleItemClick('Keterangan')}
            className={liststyle}
          >
            Keterangan
          </li>
          <li
            onClick={() => handleItemClick('Hak Milik')}
            className={liststyle}
          >
            Hak Milik
          </li>
        </ul>
      ) : (
        <>
          {currentView === 'Pengantar' && (
            <Pengantar handleback={handleBackClick} />
          )}
          {currentView === 'RKP' && <Keterangan handleback={handleBackClick} />}
          {currentView === 'Hak Milik' && <Hak handleback={handleBackClick} />}
        </>
      )}
    </Layout>
  );
};

export default Pemerintahan;
