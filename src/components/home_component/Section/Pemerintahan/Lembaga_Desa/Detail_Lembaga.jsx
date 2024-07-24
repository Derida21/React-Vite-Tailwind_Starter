import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../../../../assets/img/logo-berau3.png';

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
    <section className=' min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      {data && (
        <div className='w-full flex flex-col pt-14 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
          {data.nama && (
            <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[20px] font-semibold text-white rounded-t-lg border-b'>
              {data.nama}({data.singkatan})
            </h1>
          )}
          <div className=' flex flex-col md:flex-row gap-3 md:gap-5 px-2 py-4 md:px-5 border bg-white shadow-lg rounded-b-lg '>
            {data.logo ? (
              <div className='w-full xl:w-1/3 md:py-5'>
                <div className='flex items-center justify-center p-5 rounded-xl border border-teal-700'>
                  <img
                    src={data.logo}
                    alt={data.nama}
                    className='min-h-[177px] max-w-[175px]'
                  />
                </div>
              </div>
            ) : (
              <div className='md:w-1/3 md:py-5'>
                <div className=' flex items-center justify-center p-5 rounded-xl border border-teal-700'>
                  <img
                    src={logo}
                    alt='Logo-lembaga'
                    className='min-h-[177px] max-w-[175px]'
                  />
                </div>
              </div>
            )}
            <div className='flex flex-col md:p-5 md:border-l gap-3'>
              {data.deskripsi ? (
                <Label text='Deskripsi Lembaga'>
                  <p>{data.deskripsi}</p>
                </Label>
              ) : (
                <Label text='Deskripsi Lembaga' className='lg:items-center'>
                  <p>Data Belum Tersedia</p>
                </Label>
              )}
              {data.visi_misi ? (
                <>
                  {data.visi_misi.visi ? (
                    <Label text='Visi' className='lg:items-center'>
                      <p>{data.visi_misi.visi}</p>
                    </Label>
                  ) : (
                    <Label text='Visi'>
                      <p>Data Belum tersedia</p>
                    </Label>
                  )}
                  {data.visi_misi.misi ? (
                    <Label text='Misi' className='lg:items-center'>
                      <p>{data.visi_misi.misi}</p>
                    </Label>
                  ) : (
                    <Label text='Misi'>
                      <p>Data Belum tersedia</p>
                    </Label>
                  )}
                </>
              ) : (
                <div className='flex flex-col gap-3'>
                  <Label text='Visi' className='lg:items-center'>
                    <p>Data Belum tersedia</p>
                  </Label>
                  <Label text='Misi' className='lg:items-center'>
                    <p>Data Belum tersedia</p>
                  </Label>
                </div>
              )}
              {data.alamat ? (
                <Label text='Alamat' className='lg:items-center'>
                  <p>{data.alamat}</p>
                </Label>
              ) : (
                <Label text='Alamat' className='lg:items-center'>
                  <p>Data Belum Tersedia</p>
                </Label>
              )}
              {data.pengurus ? (
                <Label text='Anggota'>
                  {data.pengurus && (
                    <table className=' text-center border-collapse border  '>
                      <thead className='w-full  font-normal'>
                        <tr className='text-[10px] lg:text-sm'>
                          <th className='px-2 lg:px-5 py-3 border border-gray-500'>
                            No.
                          </th>
                          <th className='px- lg:px-5 py-3 border border-gray-500'>
                            Nama
                          </th>
                          <th className='px- lg:px-5 py-3 border border-gray-500'>
                            Jabatan
                          </th>
                          <th className='px- lg:px-5 py-3 border border-gray-500'>
                            Pendidikan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.pengurus.map((item, index) => (
                          <tr key={index}>
                            <td className='px- lg:px-5 py-3 border border-gray-500'>
                              {index + 1}
                            </td>
                            <td className='px- lg:px-5 py-3 border border-gray-500'>
                              {item.nama}
                            </td>
                            <td className='px- lg:px-5 py-3 border border-gray-500'>
                              {item.jabatan}
                            </td>
                            <td className='px- lg:px-5 py-3 border border-gray-500'>
                              {item.pendidikan}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </Label>
              ) : (
                <Label text='Anggota' className='lg:items-center'>
                  <p>Data Belum tersedia</p>
                </Label>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function Label({ text, deskripsi, children, className }) {
  return (
    <div
      className={`${className} flex flex-col md:flex-row gap-3 lg:gap-5 pb-3 border-b`}
    >
      <h1 className='min-w-[97px] xl:min-w-[154px] font-[Poppins] md:text-[10px] lg:text-xs xl:text-[16px] font-medium text-teal-700'>
        {text}
      </h1>
      <div className='font-[Poppins] text-xs md:text-[10px] lg:text-sm text-gray-500 text-justify'>
        {deskripsi || children}
      </div>
    </div>
  );
}

export default DetailLembaga;
