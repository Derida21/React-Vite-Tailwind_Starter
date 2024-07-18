import { useEffect, useState } from 'react';
import Layout from '../Layout';
import imgdefault from '../../../../../../assets/img/bg_sejarah.jpg';
import axios from 'axios';
import React from 'react';
const Section = () => {
  const [about, setAbout] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://nurul-huda.org/api/tentang-kami'
        );
        setAbout(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error.response || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout className='flex flex-col gap-2'>
      <Layout.Thumbnail
        title='Tentang Kami'
        src={about.src || imgdefault}
        alt={about.alt || 'Tentang Kami'}
      />
      <Layout.Description>
        <div className='flex flex-col gap-2 lg:gap-5'>
          <LatarBelakang latarbelakang={about.isi} />
        </div>
      </Layout.Description>
    </Layout>
  );
};

const LatarBelakang = ({ latarbelakang }) => (
  <div className='flex flex-col gap-2 lg:gap-5'>
    <h1 className='font-[Poppins] text-[12px] md:text-[24px] font-semibold text-teal-700'>
      Latar Belakang
    </h1>
    <p className='border-l-2 pl-3 md:pl-6 border-teal-700 h-full'>
      {latarbelakang}
    </p>
  </div>
);

export default Section;
