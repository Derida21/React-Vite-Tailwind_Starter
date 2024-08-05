import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../../../../assets/img/apple.png';

const DetailLembaga = () => {
  const { uuid } = useParams();
  const [data, setData] = useState(null);

  const getDetail = async () => {
    try {
      const response = await axios.get(
        `http://nurul-huda.org/api/lembaga/${uuid}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching detail:', error);
    }
  };

  useEffect(() => {
    getDetail();
  }, [uuid]);

  return (
    <section className='min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      {data && (
        <div className='w-full flex flex-col pt-14 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
          {data.nama && (
            <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[20px] font-semibold text-white rounded-t-lg border-b'>
              {data.nama} ({data.singkatan})
            </h1>
          )}
          <div className='h-full flex flex-col gap-4 py-3 md:px-5 lg:p-8 border bg-white shadow-lg rounded-b-lg'>
            <div className='flex flex-col md:flex-row md:gap-5 px-3 md:px-0'>
              {/* Logo */}
              {data.logo ? (
                <div className='flex items-center md:w-1/2 lg:min-w-[351px] max-w-[351px] lg:min-h-[351px] border rounded-md p-5'>
                  <img src={data.logo} alt='Logo' className='w-full' />
                </div>
              ) : (
                <div className='flex items-center md:w-1/2 lg:min-w-[351px] max-w-[351px] lg:min-h-[351px] border rounded-md p-5'>
                  <img src={logo} alt='Logo' className='w-full' />
                </div>
              )}
              {/* Detail */}
              <ul role='list' className='w-full font-[Poppins]'>
                <List
                  tag='Deskripsi'
                  detail={
                    typeof data.deskripsi === 'string'
                      ? data.deskripsi
                      : 'Data Belum Tersedia'
                  }
                />
                <List
                  tag='Alamat'
                  detail={
                    typeof data.alamat === 'string'
                      ? data.alamat
                      : 'Data Belum Tersedia'
                  }
                  className='md:items-center'
                />
                <List
                  tag='Dasar Hukum'
                  detail={
                    typeof data.dasar_hukum === 'string'
                      ? data.dasar_hukum
                      : 'Data Belum Tersedia'
                  }
                />
                <List
                  tag='Visi Misi'
                  detail={
                    typeof data.visi_misi === 'string'
                      ? data.visi_misi
                      : 'Data Belum Tersedia'
                  }
                />
              </ul>
            </div>
            {/* Anggota */}
            <div className='flex flex-col gap-2 px-3'>
              <h1 className='md:min-w-[120px] lg:min-w-[150px] text-teal-700 font-medium text-xs md:text-sm lg:text-lg'>
                Daftar Anggota
              </h1>
              {data.pengurus && data.pengurus.length > 0 ? (
                <table className='w-full font-[Poppins] mt-1 border-separate'>
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
                <p>Data belum Tersedia</p>
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
      className={`${className} flex flex-col md:flex-row w-full border-b py-3`}
    >
      <h1 className='md:min-w-[120px] lg:min-w-[150px] text-teal-700 font-medium text-xs md:text-sm lg:text-lg'>
        {tag}
      </h1>
      <span className='text-gray-500 text-xs lg:text-[16px]'>{detail}</span>
    </li>
  );
};

export default DetailLembaga;
