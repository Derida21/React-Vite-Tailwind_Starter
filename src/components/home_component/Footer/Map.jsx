import React from 'react';
export default function Map() {
  return (
    <div className='relative w-full h-52 md:h-[200px] lg:h-[240px]'>
      <iframe
        className='absolute top-0 left-0 w-full h-full'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        src={
          'https://www.google.com/maps/embed/v1/place?q=kampung+eka+sapta&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'
        }
      ></iframe>
    </div>
  );
}
