import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import imgdefault from '../../../../../assets/img/apple.png';
import { FaWhatsapp } from 'react-icons/fa';

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
        <div className='flex flex-col gap-3 md:gap-0 md:flex-row p-2 md:p-5 bg-white rounded-xl shadow border border-teal-700'>
          <div className='flex items-center md:w-1/2 border-r border-teal-700 md:p-5 lg:p-10'>
            {data.foto ? (
              <img
                src={data.foto}
                alt='foto-produk'
                className='rounded-md min-w-full max-h-[185px] lg:max-h-[225px] xl:max-h-[310px]'
              />
            ) : (
              <img
                src={imgdefault}
                alt='default-foto'
                className='rounded-md min-w-full max-h-[310px]'
              />
            )}
          </div>
          <div className='md:w-1/2 flex flex-col gap-4 font-[Poppins] md:px-5 lg:px-8 '>
            <div className='flex flex-col gap-1 md:gap-3 pb-4 border-b-2'>
              <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-[12px] lg:text-lg text-teal-700'>
                  {data.nama_produk}
                </h1>
                {data.harga ? (
                  <div className='flex items-center gap-1'>
                    <h1 className='text-teal-700 text-[10px] lg:text-[12px] font-[Poppins] underline underline-offset-4'>
                      {data.harga}
                    </h1>
                  </div>
                ) : (
                  <div className='flex items-center gap-1 '>
                    <h1 className='text-teal-700 text-[10px] lg:text-[12px] font-[Poppins] underline underline-offset-4'>
                      Data belum terisi
                    </h1>
                  </div>
                )}
              </div>
              <p className='text-justify text-[10px] lg:text-sm text-gray-500'>
                {data.deskripsi}
              </p>
            </div>
            <div className='flex flex-col items-center gap-5 w-full justify-center'>
              {data.no_wa && (
                <a
                  href={`https://wa.me/${data.no_wa}`}
                  target='_blank'
                  className='flex items-center gap-2 text-teal-700 py-2 px-3 border border-teal-700 rounded-md hover:text-white hover:bg-teal-700'
                >
                  <FaWhatsapp className='w-5 h-5' />
                  <h1 className='text-xs font-[Poppins] font-medium'>
                    Hubungi Penjual
                  </h1>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduk;
