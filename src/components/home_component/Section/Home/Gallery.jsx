import { useEffect, useState } from 'react';
import React from 'react';
import img from '../../../../../assets/img/mountains-7ddde89.webp';
import axios from 'axios';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  const getGallery = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/galeri');
      setGallery(response.data.data.data);
      console.log(response.data.data.data);
    } catch (error) {
      console.log('Error fetching gallery data:', error);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  const Gallery = gallery.slice(0, 6);

  return (
    <>
      {Gallery.map((item, index) => (
        <div
          key={index}
          className='h-[75px] md:h-[200px] xl:h-[240px] rounded-md hover:scale-105 duration-300 '
          style={{
            backgroundImage: `url(${item.thumbnail})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          {/* <img
            src={item.thumbnail}
            alt=''
            className=' h-full rounded md:rounded-lg hover:scale-105 duration-500 min-w-full'
          /> */}
        </div>
      ))}
    </>
  );
};

function Frame({ gallery }) {
  return <></>;
}

export default Gallery;
