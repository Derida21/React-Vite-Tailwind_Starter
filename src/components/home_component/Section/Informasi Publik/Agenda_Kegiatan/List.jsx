import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/kegiatan');
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const list = data.slice(-5);

  return (
    <div className='hidden lg:w-1/3 lg:flex lg:flex-col gap-3 rounded-lg border p-3'>
      {list.map((item, index) => (
        <div
          key={index}
          className='flex flex-col border border-gray-200 rounded-lg hover:shadow-xl'
        >
          <img src={item.thumbnail} alt='' className='rounded max-h-[150px]' />
          <div className='flex flex-col gap-2 px-2 py-3'>
            <Link
              to={`/informasi-publik/agenda-kegiatan/${item.slug}`}
              className='cursor-pointer font-[Poppins] text-gray-700 font-medium hover:text-teal-700'
            >
              {item.judul}
            </Link>
            <article className='font-[Poppins] text-gray-500 text-xs line-clamp-2'>
              <div dangerouslySetInnerHTML={{ __html: item.isi }}></div>
            </article>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
