import { useEffect, useState } from 'react';
import imgkades from '../../../../../../assets/img/Kades.png';
import axios from 'axios';

const Kades = () => {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await axios.get('http://nurul-huda.org/api/tentang-kami');
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    getData();
  });

  return (
    <div className='flex flex-col'>
      <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg'>
        Kepala Desa
      </h1>
      <div className=' rounded-b-lg px-3 py-3 md:p-5 border md:shadow-xl'>
        <p className='font-[Poppins] text-[12px] md:text-[16px] text-gray-500 text-justify px-2'>
          {data
            ? data.isi
            : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem accusamus distinctio tenetur provident ipsam obcaecati voluptas ratione maiores quam, vitae, officiis adipisci ab eos laboriosam deleniti magni blanditiis hic at. Dolores porro dolor natus quae consequatur. Sint dolores fugiat recusandae reprehenderit repellendus iure provident? Hic iusto voluptatibus inventore maxime totam ab minima ratione repellendus delectus possimus! Dolores hic est repellat.Eius unde amet cupiditate dolorum repellendus veritatis ullam consequuntur debitis recusandae laboriosam. Quisquam quam in, inventore voluptate explicabo dolor voluptates pariatur! Aspernatur recusandae iste provident nobis, ad illum sapiente. Quo.'}
        </p>
      </div>
    </div>
  );
};

export default Kades;
