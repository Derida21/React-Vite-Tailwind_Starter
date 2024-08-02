import React, { useState } from 'react';
import Layout from '../Layout';
import Pagination from '../pagination';
import Modal from './APBK/Modal';
import APBK from './APBK/APBK';
import RKP from './RKP/RKP';
import SPJ from './SPJ/SPJ';

const Keuangan = () => {
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
          <li onClick={() => handleItemClick('APBK')} className={liststyle}>
            APBK
          </li>
          <li onClick={() => handleItemClick('RKP')} className={liststyle}>
            RKP
          </li>
          <li onClick={() => handleItemClick('SPJ')} className={liststyle}>
            SPJ
          </li>
        </ul>
      ) : (
        <>
          {currentView === 'APBK' && <APBK handleback={handleBackClick} />}
          {currentView === 'RKP' && <RKP handleback={handleBackClick} />}
          {currentView === 'SPJ' && <SPJ handleback={handleBackClick} />}
        </>
      )}
    </Layout>
  );
};

export default Keuangan;
