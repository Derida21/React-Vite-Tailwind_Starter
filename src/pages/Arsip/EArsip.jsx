import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logodefault from '../../../assets/img/Article1.png';
import axios from 'axios';

const EArsip = () => {

  return (
    <section className=' min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg border-b'>
          Halaman E-Arsip
        </h1>

      </div>
    </section>
  );
};
export default EArsip;
