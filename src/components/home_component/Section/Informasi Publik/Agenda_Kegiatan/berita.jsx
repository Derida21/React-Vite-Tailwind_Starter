import axios from 'axios';
import { useEffect, useState } from 'react';
import bg from '../../../../../../assets/img/bg.png';
import { Link } from 'react-router-dom';

const Berita = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/berita');
      setData(response.data.data.data);
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);

  const kegiatan = data.slice(0, 3);

  return (
    <div className='flex flex-col gap-3 lg:gap-5'>
      <Link
        to={'/informasi-publik/berita-kampung'}
        className='font-[Poppins] text-[8px] md:text-xs font-medium text-gray-500 hover:text-teal-700'
      >
        Berita Kampung
      </Link>
      <div className='flex flex-col gap-2'>
        {kegiatan.map((item, index) => (
          <div
            key={index}
            className='flex gap-2 border-b-[2px] md:border-gray-300 pb-3 '
          >
            <div
              className='w-1/2 h-[85px]'
              style={{
                backgroundImage: `url(${item.thumbnail})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            ></div>
            <Link
              to={`/informasi-publik/berita-kampung/${item.slug}`}
              className='w-1/2 cursor-pointer font-[Poppins] text-[10px] text-gray-700 font-medium hover:text-teal-700'
            >
              {item.judul}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Berita;
