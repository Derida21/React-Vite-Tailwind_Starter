import Kades from '../../components/home_component/Section/Profil/About/Kades';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VisiMisi = () => {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await axios.get('http://nurul-huda.org/api/profil');
    setData(response.data.data.visi_misi);
    console.log(response.data.data.visi_misi);
  };

  useEffect(() => {
    getData();
  });

  return (
    <section className='min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col items-centr gap-5 pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <div className='flex flex-col'>
          <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg'>
            Visi
          </h1>
          <div className=' rounded-b-lg px-3 py-3 md:p-5 border md:shadow-xl'>
            <p className='font-[Poppins] text-[10px] md:text-[16px] text-gray-500 text-justify px-2'>
              {data
                ? data.visi
                : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem accusamus distinctio tenetur provident ipsam obcaecati voluptas ratione maiores quam, vitae, officiis adipisci ab eos laboriosam deleniti magni blanditiis hic at. Dolores porro dolor natus quae consequatur. Sint dolores fugiat recusandae reprehenderit repellendus iure provident? Hic iusto voluptatibus inventore maxime totam ab minima ratione repellendus delectus possimus! Dolores hic est repellat.Eius unde amet cupiditate dolorum repellendus veritatis ullam consequuntur debitis recusandae laboriosam. Quisquam quam in, inventore voluptate explicabo dolor voluptates pariatur! Aspernatur recusandae iste provident nobis, ad illum sapiente. Quo.'}
            </p>
          </div>
        </div>
        <div className='flex flex-col'>
          <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg'>
            Misi
          </h1>
          <div className=' rounded-b-lg px-3 py-3 md:p-5 border md:shadow-xl'>
            <p className='font-[Poppins] text-[12px] md:text-[16px] text-gray-500 text-justify px-2'>
              {data
                ? data.misi
                : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem accusamus distinctio tenetur provident ipsam obcaecati voluptas ratione maiores quam, vitae, officiis adipisci ab eos laboriosam deleniti magni blanditiis hic at. Dolores porro dolor natus quae consequatur. Sint dolores fugiat recusandae reprehenderit repellendus iure provident? Hic iusto voluptatibus inventore maxime totam ab minima ratione repellendus delectus possimus! Dolores hic est repellat.Eius unde amet cupiditate dolorum repellendus veritatis ullam consequuntur debitis recusandae laboriosam. Quisquam quam in, inventore voluptate explicabo dolor voluptates pariatur! Aspernatur recusandae iste provident nobis, ad illum sapiente. Quo.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
