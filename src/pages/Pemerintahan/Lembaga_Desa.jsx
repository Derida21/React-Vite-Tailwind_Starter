import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logodefault from '../../../assets/img/logo-berau3.png';
import axios from 'axios';

const LembagaDesa = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`http://nurul-huda.org/api/lembaga`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching detail:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className=' min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg border-b'>
          Lembaga Kampung
        </h1>
        <div className='flex flex-col gap-2 lg:gap-5 px-2 py-4 md:p-5 border bg-white shadow-lg rounded-b-lg '>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className='md:flex md:gap-5 space-y-2 rounded border border-teal-700 p-3 lg:p-5'
              >
                <div className='flex w-full md:max-w-[255px] lg:max-w-[300px] border  rounded p-4 items-center justify-center'>
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt=''
                      className='max-h-32 md:max-h-36 items-center'
                    />
                  ) : (
                    <img
                      src={logodefault}
                      alt=''
                      className='max-h-32 md:max-h-36 items-center'
                    />
                  )}
                </div>
                <div className='w-full flex flex-col  gap-1 lg:gap-2 font-[Poppins]'>
                  <div className='flex md:max-lg:gap-2 lg:items-center justify-between'>
                    <h1 className='text-teal-700 font-medium text-[12px] lg:text-[20px]'>
                      {item.nama} ({item.singkatan})
                    </h1>
                    <Link
                      to={`/pemerintahan/lembaga-kampung/${item.uuid}`}
                      className='cursor-pointer text-[8px] lg:text-[10px] py-1 px-2 text-teal-700 border border-teal-700 hover:text-white hover:bg-teal-700 hover:duration-300 rounded h-fit'
                    >
                      Detail
                    </Link>
                  </div>
                  <p className='text-gray-500 text-[10px] lg:text-[14px] text-justify line-clamp-2 lg:line-clamp-3'>
                    {item.deskripsi ||
                      'Quo aut laboriosam rerum suscipit libero nemo. Qui repudiandae sunt eos exercitationem itaque nisi. Alias dignissimos nihil maiores eaque voluptatem'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default LembagaDesa;
