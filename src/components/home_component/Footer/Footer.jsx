import Logo from '../Logo';
import Kontak from './Kontak';
import Map from './Map';
import React, { useEffect, useState } from 'react';
import Sosmed from './Sosmed';
import axios from 'axios';

export default function Footer() {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/profil');
      setData(response.data.data);
    } catch {}
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col pt-5 px-5 md:px-[60px] md:pt-10 lg:gap-[50px] lg:px-20 xl:px-[160px] lg:pt-20 bg-teal-900'>
        <div className='flex flex-col pb-10 md:flex-row gap-10 md:gap-0 md:justify-between '>
          {/* Logo & Map */}
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1 lg:gap-2'>
              <Logo
                className='flex items-center justify-center gap-3 lg:gap-5'
                titleclassName='flex flex-col'
                logoclassName='h-[40px] w-[33px] md:h-[50px] md:w-[40px] lg:h-[60px] lg:w-[50px] xl:h-[70px] xl:w-[60px]'
                addres='Kec. Talisayan Kab. Berau Kalimantan Timur'
                textclassName='text-white font-bold text-[22px] md:text-[26px] lg:text-[32px] xl:text-[40px] font-[Poppins] text-nowrap'
                addresclassName='font-[Poppins] font-semibold text-white text-[10px] md:text-[12px] lg:text-[14px] xl:text-[18px]'
                href='/home'
              />
              {data && (
                <span className='text-white text-[7px] md:text-[8px] lg:text-[10px] xl:text-[12px] font-inter text-center lg:tracking-wide '>
                  {data.alamat}
                </span>
              )}
            </div>
            <div className='flex'>
              <Map />
            </div>
          </div>
          {/* Sosmed & Kontak */}
          <div className='flex flex-col lg:gap md:pt-3'>
            <div></div>
            <div className='flex flex-col md:flex-row gap-3 xl:gap-6'>
              <Sosmed />
              <Kontak />
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center py-5 border-t-[1px] border-white'>
          <span className='text-[8px] text-white font-[Poppins]'>
            Powered by LoopDev
          </span>
        </div>
      </div>
    </div>
  );
}
