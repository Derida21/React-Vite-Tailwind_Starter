import React, { useState } from 'react';
import { Kelompok_Umur } from './Content/Kelompok_Umur';
import { HubunganKeluarga } from './Content/Hubungan_Keluarga';
import { StatusPerkawinan } from './Content/Status_Perkawinan';
import { Pekerjaan } from './Content/Pekerjaan';
import { Pendidikan } from './Content/Pendidikan';

const Layout = () => {
  const [active, setActive] = useState('umur');

  const items = [
    { id: 'umur', label: 'Kelompok Umur' },
    { id: 'hubungan', label: 'Hubungan Keluarga' },
    { id: 'status', label: 'Status Perkawinan' },
    { id: 'pekerjaan', label: 'Pekerjaan' },
    { id: 'pendidikan', label: 'Pendidikan' },
    { id: 'agama', label: 'Agama' },
  ];

  const handleClick = (id) => {
    setActive(id);
  };

  return (
    <div className='flex flex-col md:flex-row md:gap-2 w-full'>
      <div className='flex md:h-fit md:p-2 md:rounded-md md:border md:border-teal-700 md:gap-2 md:flex-col'>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`py-2 md:rounded-md md:text-nowrap md:justify-start md:p-4 border border-teal-700 w-full flex justify-center items-center font-[Poppins] text-center text-wrap text-[6px] md:text-[10px] lg:text-[12px] cursor-pointer ${
              active === item.id
                ? 'bg-teal-700 text-white duration-300 ease-in-out'
                : 'bg-white md:hover:bg-teal-700 duration-300 ease-in md:hover:text-white text-teal-700'
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className='w-full h-full md:rounded-sm '>
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col md:rounded-md gap-3 px-4 py-3 ${
              active === item.id
                ? 'block bg-teal-700 duration-200 ease-in-out '
                : 'hidden'
            }`}
          >
            <h2 className='w-full text-center font-bold text-white text-[16px]'>
              Statistik Penduduk Desa Berdasarkan {item.label}
            </h2>
            {active === `umur` && <Kelompok_Umur />}
            {active === `hubungan` && <HubunganKeluarga />}
            {active === `status` && <StatusPerkawinan />}
            {active === `pekerjaan` && <Pekerjaan />}
            {/* {active === `pendidikan` && <Pendidikan />} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
