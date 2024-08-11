import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '../../Home/News/Card';
import List from '../Berita/List';

const DetailBerita = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://nurul-huda.org/api/berita/${slug}`
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      if (!error.response) {
        console.error('Network error:', error);
      } else {
        console.error('Error response:', error.response.data);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [slug]);

  return (
    <div className='min-h-screen px-5 pt-14 pb-5 md:px-[60px] md:pt-[120px] md:pb-10 lg:px-[80px] lg:pt-[130px] xl:px-[160px]'>
      <div className='min-h-screen flex flex-col lg:flex-row p-2 md:p-5 bg-white rounded-xl justify-center items-start gap-2 md:gap-5'>
        {data && (
          <div className='w-full flex flex-col drop-shadow-lg bg-white border-l-[1px] border-gray-300 rounded-md'>
            {data.thumbnail && (
              <div
                className='rounded-md min-w-full h-36 md:h-72 lg:h-[350px] xl:h-[450px]'
                style={{
                  backgroundImage: `url(${data.thumbnail})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              ></div>
            )}
            <div className='flex flex-col gap-2 md:gap-5 py-3 md:py-5 md:px-6'>
              <div className='flex'>
                {data.tanggal && (
                  <Card.Date
                    date={data.tanggal || 'dd/mm/yyyy'}
                    svg='stroke-gray-500'
                    dateclassName='font-[Poppins] text-[8px] md:text-[12px] text-gray-500'
                    className='[&>svg]:h-3 md:[&>svg]:h-5 flex justify-center items-end gap-1 px-2 border-r-2'
                  />
                )}
                {data.author.nama && (
                  <Card.Author
                    author={data.author.nama || 'author name'}
                    authorclassName='font-[Poppins] text-[8px] md:text-[12px] text-gray-500'
                    svg='h-3 md:h-5 md:w-4'
                    className='flex items-end [&>svg]:fill-gray-500 gap-1 px-2 border-r-2'
                  />
                )}
              </div>
              <div className='flex flex-col gap-1 px-3 pb-2'>
                {data.judul && (
                  <h1 className='font-[Poppins] font-medium lg:text-3xl text-justify text-gray-700'>
                    {data.judul ||
                      'Lorem ipsum dolor sit amet consectetur.  Enim feugiat dignissim a fringilla vitae vestibulum faucibus'}
                  </h1>
                )}
                {data.isi && (
                  <div className='font-[Poppins] text-[10px] md:text-sm text-justify text-gray-500'>
                    <div dangerouslySetInnerHTML={{ __html: data.isi }}></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <List />
      </div>
    </div>
  );
};

export default DetailBerita;
