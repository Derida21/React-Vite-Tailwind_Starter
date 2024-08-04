import axios from 'axios';
import React, { useEffect, useState } from 'react';
export default function Map() {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/profil');
      setData(response.data.data);
    } catch {}
  };

  useEffect(() => {
    getData();
  });
  return (
    <div className='relative w-full h-52 md:h-[200px] lg:h-[240px]'>
      {data && (
        <iframe
          className='absolute top-0 left-0 w-full h-full'
          src={data.peta}
        ></iframe>
      )}
    </div>
  );
}
