import { useEffect, useState } from 'react';
import imggaleri from '../../../assets/img/bg_berita.png';
import axios from 'axios';

const Galeri_Kampung = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get('http://nurul-huda.org/api/galeri');
    setData(response.data.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <section className='min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col items-centr gap-3 md:gap-0 pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white md:rounded-t-lg'>
          Galeri Kampung
        </h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 md:p-4 xl:p-5 md:border rounded-b-lg '>
          {data.map((item, index) => (
            <div
              key={index}
              className='relative border p-2 lg:p-4 md:rounded-md hover:border-teal-700 '
            >
              <div
                className='flex items-end px-3 py-2 md:rounded hover:scale-110 duration-500 h-[110px] xl:h-[140px] min-w-full'
                style={{
                  backgroundImage: `url(${item.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <h1 className='text-white text-[8px] md:text-[10px] font-[Poppins]'>
                  {item.judul}
                </h1>
              </div>
              {/* <img
                src={item.thumbnail || imggaleri}
                alt='galeri-kampung'
                className='md:rounded hover:scale-110 duration-500 h-[110px] xl:h-[140px] min-w-full'
              />
              <h1 className='absolute bottom-3 left-3 lg:bottom-5 lg:left-6 text-white text-[8px] md:text-[10px] font-[Poppins]'>
                {item.judul}
              </h1> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Galeri_Kampung;
