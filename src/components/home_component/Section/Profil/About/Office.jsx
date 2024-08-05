import axios from 'axios';
import { useEffect, useState } from 'react';

const Office = () => {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(`http://nurul-huda.org/api/profil`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-col lg:w-1/2 '>
      <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg'>
        Kantor Kampung
      </h1>
      <div className='rounded-b-lg px-3 py-3 md:p-5 border md:shadow-xl h-full'>
        {data && (
          <table className='table-auto h-fit'>
            <tbody>
              {data.alamat && (
                <tr className='font-[Poppins] text-[10px] align-top '>
                  <td className='text-gray-700 font-medium pb-2'>Alamat</td>
                  <td className='pl-3 pb-2 text-gray-500'>
                    {data.alamat || 'Data belum tersedia'}
                  </td>
                </tr>
              )}
              <tr className='font-[Poppins] text-[10px] align-top '>
                <td className='text-gray-700 font-medium pb-2'>No.Tlp</td>
                <td className='pl-3 pb-2 text-gray-500'>
                  {data.no_hp || 'Data belum tersedia'}
                </td>
              </tr>
              <tr className='font-[Poppins] text-[10px] align-top '>
                <td className='text-gray-700 font-medium pb-2'>Email</td>
                <td className='pl-3 pb-2 text-gray-500'>
                  {data.email || 'Data belum tersedia'}
                </td>
              </tr>
              {/* <tr className='font-[Poppins] text-[10px] align-top '>
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
              </tr> */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Office;
