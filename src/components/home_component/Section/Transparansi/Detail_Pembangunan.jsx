import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../../../assets/img/apple.png';

const Detail_Pembangunan = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  const getDetail = async () => {
    try {
      const response = await axios.get(
        `http://nurul-huda.org/api/pembangunan/${slug}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching detail:', error);
    }
  };

  useEffect(() => {
    getDetail();
  }, [slug]);

  return (
    <section className='min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      {data && (
        <div className='w-full flex flex-col pt-14 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
          {data.judul && (
            <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[20px] font-semibold text-white rounded-t-lg border-b'>
              {data.judul}
            </h1>
          )}
          <div className='h-full flex flex-col gap-3 py-3 md:px-5 lg:p-8 border bg-white shadow-lg rounded-b-lg'>
            <div className='flex flex-col gap-2 lg:gap-5 px-3 md:px-0'>
              {/* Logo */}
              {data.thumbnail ? (
                <div
                  className='h-32 md:h-60 lg:h-80 xl:h-[500px]'
                  style={{
                    backgroundImage: `url(${data.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '6px',
                  }}
                ></div>
              ) : (
                <div className='flex items-center border rounded-md p-5'>
                  <img src={logo} alt='Logo' className='w-full' />
                </div>
              )}
              {/* Detail */}
              <ul role='list' className='w-full font-[Poppins]'>
                <List
                  tag='Deskripsi'
                  detail={
                    typeof data.isi === 'string'
                      ? data.isi
                      : `'Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur minima culpa, tenetur ea, animi laborum quaerat
                  voluptas error esse sint atque! Ab provident magni fugit? Quia
                  possimus praesentium maiores iste. Est hic unde itaque
                  voluptatum nemo vel rem, repudiandae quis aut! Tenetur ipsam
                  nulla ut. Nemo laboriosam iusto dignissimos molestiae quae est
                  nostrum corrupti quidem tempora, debitis porro atque? Officia?'`
                  }
                />
              </ul>
            </div>
            {/* Anggota */}
            <div className='flex flex-col gap-2 px-3 md:px-0'>
              <h1 className='md:min-w-[120px] lg:min-w-[150px] text-teal-700 font-medium text-xs md:text-sm lg:text-lg w-full md:text-center'>
                Progres {data.judul}
              </h1>
              {data.pengurus && data.pengurus.length > 0 ? (
                <table className='w-full font-[Poppins] border-separate'>
                  <thead>
                    <tr>
                      <td className='font-medium text-gray-700 text-center border text-[10px] md:text-sm py-2'>
                        No.
                      </td>
                      <td className='font-medium text-gray-700 text-center border text-[10px] md:text-sm py-2'>
                        Nama
                      </td>
                      <td className='font-medium text-gray-700 text-center border text-[10px] md:text-sm py-2'>
                        Jabatan
                      </td>
                      <td className='font-medium text-gray-700 text-center border text-[10px] md:text-sm py-2'>
                        Pendidikan
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pengurus.map((item, index) => (
                      <tr key={index}>
                        <td className='text-gray-700 text-center border py-2 text-[8px] md:text-xs'>
                          {index + 1}
                        </td>
                        <td className='text-gray-700 text-center border py-2 text-[8px] md:text-xs'>
                          {item.nama}
                        </td>
                        <td className='text-gray-700 text-center border py-2 text-[8px] md:text-xs'>
                          {item.jabatan}
                        </td>
                        <td className='text-gray-700 text-center border py-2 text-[8px] md:text-xs'>
                          {item.pendidikan}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className='font-[Poppins] text-xs lg:text-sm xl:text-[16px] md:text-center font-medium text-gray-500'>
                  Data Belum Tersedia
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const List = ({ tag, detail, className }) => {
  return (
    <li
      className={`${className} flex flex-col justify-center md:items-center w-full`}
    >
      <div className='min-h-full flex items-start'>
        <h1 className=' text-teal-700 font-medium text-xs md:text-sm lg:text-lg'>
          {tag}
        </h1>
      </div>
      <span className='text-gray-500 text-xs lg:text-sm xl:text-[16px] text-justify pt-[5px]'>
        {detail}
      </span>
    </li>
  );
};

export default Detail_Pembangunan;
