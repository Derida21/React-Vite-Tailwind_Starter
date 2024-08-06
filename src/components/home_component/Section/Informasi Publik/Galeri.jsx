import axios from 'axios';
import { useEffect, useState } from 'react';
import bg from '../../../../../assets/img/bg_pelayanan.jpg';
import { Link } from 'react-router-dom';

const Galeri = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get('http://nurul-huda.org/api/galeri');
    setData(response.data.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const limit = data.slice(0, 6);

  return (
    <div className='flex flex-col gap-3 lg:gap-5'>
      <Link
        to={`/informasi-publik/galeri-kampung`}
        className='font-[Poppins] text-[8px] md:text-xs font-medium text-gray-500 hover:text-teal-700'
      >
        Galeri Kampung
      </Link>
      <div className='grid md:grid-cols-2 gap-3'>
        {limit.map((item, index) => (
          <div
            key={index}
            onClick={handleClick}
            className='h-[93px] rounded-md cursor-pointer'
            style={{
              backgroundImage: `url(${item.thumbnail})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Galeri;
