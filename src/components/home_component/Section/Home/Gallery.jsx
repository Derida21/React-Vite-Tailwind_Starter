import { useEffect, useState } from 'react';
import React from 'react';
import img from '../../../../../assets/img/mountains-7ddde89.webp';

const Gallery = () => {
  const url = '';
  const [gallery, setGallery] = useState([]);

  const getGallery = async () => {
    try {
      const response = await fetch(url);
      const dataGallery = await response.json();
      setGallery(dataGallery);
      console.log(dataGallery);
    } catch (error) {
      console.log('Error fetching gallery data:', error);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  const Galeri = gallery.slice(0, 8);

  return (
    <>
      <Frame gallery={Galeri} />
    </>
  );
};

const defaultImage = {
  id: 0,
  image: 'src/assets/img/mountains-7ddde89.webp',
};

function Frame({ gallery }) {
  const imagesToShow = gallery.length
    ? gallery
    : [
        defaultImage,
        defaultImage,
        defaultImage,
        defaultImage,
        defaultImage,
        defaultImage,
        defaultImage,
        defaultImage,
      ];
  return (
    <>
      {imagesToShow.map((item, index) => (
        <div key={index} className='h-[256px]'>
          <img src={img} alt='' className='object-cover h-full rounded-lg' />
        </div>
      ))}
    </>
  );
}

export default Gallery;
