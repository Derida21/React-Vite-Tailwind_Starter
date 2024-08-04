import { useEffect, useState } from 'react';
import ImgOrganiasi from '../../../assets/img/Organisasi.jpg';
import axios from 'axios';

export default function Struktur() {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/profil');
      setData(response.data.data);
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);
  const defaultImage = ImgOrganiasi;

  return (
    <section className='min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col items-centr gap-3 md:gap-0 pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg'>
          Struktur Organisasi
        </h1>
        {data && (
          <img
            src={data.struktur_organisasi}
            alt='Default'
            className='w-full rounded-b-lg md:p-5 md:border md:shadow-xl'
          />
        )}
      </div>
    </section>
  );
}
