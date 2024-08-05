import {
  IconCircleArrowLeftFilled,
  IconCircleArrowRightFilled,
} from '@tabler/icons-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get(`http://nurul-huda.org/api/berita`);
      setSlides(response.data.data.data.slice(0, 3));
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const Next = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const Prev = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className='relative w-full overflow-hidden rounded-lg md:rounded-2xl h-[185px] md:h-[350px] lg:h-[500px] xl:h-[600px] shadow drop-shadow-lg'>
      <div className='relative h-full'>
        {slides.map((item, index) => (
          <div
            key={index}
            className={`absolute h-full w-full flex items-end justify-end  transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            } `}
            style={{
              backgroundImage: `url(${item.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Link
              to={`/informasi-publik/berita-kampung/${item.slug}`}
              className=' flex flex-col w-full p-5 md:p-10'
            >
              <h2 className='text-white bg-gray-500 rounded-t px-3 font-[Poppins] font-semibold text-[12px] md:text-[16px] lg:text-[32px]'>
                {item.judul}
              </h2>
              <div className=' text-white bg-gray-700 bg-opacity-90 rounded-b px-3 text-[8px] md:text-[10px] lg:text-[16px] font-[Poppins] text-justify line-clamp-3 '>
                <p
                  className='h-full'
                  dangerouslySetInnerHTML={{ __html: item.isi }}
                ></p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button
        className='absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded'
        onClick={Prev}
      >
        <IconCircleArrowLeftFilled className='w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8' />
      </button>
      <button
        className='absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded'
        onClick={Next}
      >
        <IconCircleArrowRightFilled className='w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8' />
      </button>

      <div className='absolute bottom-0 left-0 right-0 flex justify-center p-2 space-x-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
