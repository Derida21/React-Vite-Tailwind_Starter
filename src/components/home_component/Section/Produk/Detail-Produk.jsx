import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import imgdefault from '../../../../../assets/img/apple.png';
import { FaWhatsapp } from 'react-icons/fa';
import { IconCurrencyDollar } from '@tabler/icons-react';

const DetailProduk = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://nurul-huda.org/api/produk/${slug}`
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      if (!error.response) {
        console.error('Network error:', error);
      } else {
        console.error('Error response:', error.response.data);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [slug]);

  return (
    <div className='min-h-screen px-5 pt-14 pb-5 md:px-[60px] md:pt-[120px] md:pb-10 lg:px-[80px] lg:pt-[130px] xl:px-[160px]'>
      {data && (
        <div className='flex flex-col md:flex-row p-2 md:p-5 bg-white rounded-xl shadow border border-gray-300'>
          <div className='w-1/2 bg-gray-100 rounded-md p-10'>
            {data.foto ? (
              <img
                src={data.foto}
                alt='foto-produk'
                className='rounded-md min-w-full max-h-[310px]'
              />
            ) : (
              <img
                src={imgdefault}
                alt='default-foto'
                className='rounded-md min-w-full max-h-[310px]'
              />
            )}
          </div>
          <div className='w-1/2 flex flex-col gap-4 font-[Poppins] px-8'>
            <div className='flex flex-col gap-3 pb-8 border-b-2'>
              <h1 className='font-semibold text-xl text-teal-700'>
                {data.nama_produk}
              </h1>
              <p className='text-justify text-gray-500'>{data.deskripsi}</p>
            </div>
            <div className='flex items-center gap-5'>
              {data.no_wa ? (
                <div className='flex items-center gap-2'>
                  <FaWhatsapp className='text-teal-700 w-5 h-5' />
                  <h1 className='text-sm text-teal-700 font-medium'>
                    {data.no_wa}
                  </h1>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <FaWhatsapp className='text-gray-500 w-5 h-5' />
                  <h1 className='text-sm text-gray-500'>Data belum terisi</h1>
                </div>
              )}
              {data.harga ? (
                <div className='flex items-center gap-2'>
                  <IconCurrencyDollar className='text-teal-700 w-5 h-5' />
                  <h1 className='text-sm text-teal-700 font-medium'>
                    {data.harga}
                  </h1>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <IconCurrencyDollar className='text-gray-500 w-5 h-5' />
                  <h1 className='text-sm text-gray-500'>Data belum terisi</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduk;
