import axios from 'axios';
import { useEffect, useState } from 'react';

const List = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/kegiatan');
      setData(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const list = data.slice(-5);

  return (
    <div className='w-1/3 flex flex-col gap-3 rounded-lg border p-3'>
      {list.map((item, index) => (
        <div
          key={index}
          className='flex flex-col border border-gray-200 rounded-lg shadow-xl'
        >
          <img src={item.thumbnail} alt='' className='rounded max-h-[150px]' />
          <div className='flex flex-col gap-2 px-2 py-3'>
            <h1 className='cursor-pointer font-[Poppins] text-gray-700 font-medium hover:text-teal-700'>
              {item.judul}
            </h1>
            <p className='font-[Poppins] text-gray-500 text-xs line-clamp-2'>
              {item.isi}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
