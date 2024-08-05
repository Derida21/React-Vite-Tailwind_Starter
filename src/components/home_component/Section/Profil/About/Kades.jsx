import { useEffect, useState } from 'react';
import imgkades from '../../../../../../assets/img/Kades.png';
import axios from 'axios';

const Kades = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://nurul-huda.org/api/pejabat?title=${'KEPALA KAMPUNG'}`
      );
      if (response.data.success) {
        setData(response.data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-col lg:w-1/2'>
      <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg'>
        Kepala Kampung
      </h1>
      {data && (
        <div className='flex flex-col md:flex-row gap-5 rounded-b-lg px-3 py-3 md:p-5 border md:shadow-xl'>
          <div className='flex items-center justify-center border p-5 rounded-md md:w-1/2 md:max-w-[208px]'>
            <img
              src={data.foto || imgkades}
              alt='Kepala Kampung'
              className='max-h-60 '
            />
          </div>
          <table className='table-auto h-fit'>
            <tbody>
              <tr className='font-[Poppins] text-[10px] align-top '>
                <td className='text-gray-700 font-medium pb-2'>Nama</td>
                <td className='pl-3 pb-2 text-gray-500'>
                  {data.nama || 'Data belum tersedia'}
                </td>
              </tr>
              <tr className='font-[Poppins] text-[10px] align-top '>
                <td className='text-gray-700 font-medium pb-2'>NIP</td>
                <td className='pl-3 pb-2 text-gray-500'>
                  {data.nip || 'Data belum tersedia'}
                </td>
              </tr>
              <tr className='font-[Poppins] text-[10px] align-top '>
                <td className='text-gray-700 font-medium pb-2'>Jabatan</td>
                <td className='pl-3 pb-2 text-gray-500'>
                  {data.jabatan || 'Data belum tersedia'}
                </td>
              </tr>
              <tr className='font-[Poppins] text-[10px] align-top '>
                <td className='text-gray-700 font-medium pb-2'>Alamat</td>
                <td className='pl-3 pb-2 text-gray-500'>
                  {data.alamat || 'Data belum tersedia'}
                </td>
              </tr>
              <tr className='font-[Poppins] text-[10px] align-top '>
                <td className='text-gray-700 font-medium pb-2'>Pendidikan</td>
                <td className='pl-3 pb-2 text-gray-500'>
                  {data.pendidikan || 'Data belum tersedia'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Kades;
