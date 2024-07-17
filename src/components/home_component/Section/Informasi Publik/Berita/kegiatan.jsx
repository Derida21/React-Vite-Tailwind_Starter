import axios from 'axios';
import { useEffect, useState } from 'react';
import bg from '../../../../../../assets/img/bg.png';
import { Link } from 'react-router-dom';

const AgendaKegiatan = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/kegiatan');
      setData(response.data.data.data);
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);

  const kegiatan = data.slice(0, 3);

  return (
    <div className='flex flex-col gap-3 lg:gap-5'>
      <h1 className='font-[Poppins] text-[8px] md:text-xs font-medium text-gray-500 '>
        Agenda Kegiatan
      </h1>
      <div className='flex flex-col gap-2'>
        {kegiatan.map((item, index) => (
          <div
            key={index}
            className='border-b-[2px] md:border-gray-300 pb-3 space-y-3'
          >
            <img
              src={item.thumbnail || bg}
              alt=''
              className='rounded max-h-32 w-full'
            />
            <Link
              to={`/informasi-publik/agenda-kegiatan/${item.slug}`}
              className='cursor-pointer font-[Poppins] text-xs text-gray-700 font-medium hover:text-teal-700'
            >
              {item.judul}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaKegiatan;
