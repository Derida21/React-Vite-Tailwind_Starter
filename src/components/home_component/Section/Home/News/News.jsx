import { useEffect, useState } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

const News = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/berita');
      console.log(response.data.data.data);
      setData(response.data.data.data);
    } catch (error) {
      if (!error.response) {
        console.error('Network error:', error);
      } else {
        console.error('Error response:', error.response);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const main = data.slice(0, 2);
  const list = data.slice(2, 6);

  const defaulitems = '';

  return (
    <div className='flex flex-col w-full md:rounded-3xl drop-shadow-xl gap-5 md:gap-0 shadow-gray-800 bg-white py-2 md:px-5 md:pt-0 md:pb-10 lg:px-10 rounded-lg lg:rounded-3xl'>
      {main.map((news, index) => (
        <Main
          key={index}
          index={index}
          judul={news.judul}
          thumbnail={news.thumbnail}
          slug={news.slug}
          isi={news.isi}
          tanggal={news.tanggal}
          author={news.author.nama}
        />
      ))}
      {/* List Berita */}
      <div className='flex flex-col gap-3 border-t-[2px] border-gray-400 px-2 pt-3 lg:px-0 md:border-none'>
        <div className='flex items-end justify-between '>
          <p className='font-[Poppins] text-[12px] font-semibold text-gray-700'>
            Baca Juga
          </p>
          <Link
            to='/informasi-publik/berita-desa'
            className='font-[Poppins] text-[10px] font-light underline underline-offset-4 text-gray-700 hover:text-teal-700'
          >
            Lihat Semua
          </Link>
        </div>
        <div className='flex flex-col md:gap-3 md:flex-row md:px-0'>
          <List listitems={list} />
        </div>
      </div>
    </div>
  );
};

function Main({ judul, thumbnail, isi, author, index, tanggal, slug }) {
  const reverse = index % 2 === 0;
  return (
    <>
      <Card
        wrapper={
          reverse
            ? `flex flex-col md:flex-row gap-3 md:justify-between lg:gap-[30px] px-2`
            : `flex flex-col md:flex-row-reverse gap-3 md:justify-between lg:gap-[30px] px-2`
        }
      >
        <Card.Thumbnail src={thumbnail} />
        <div className='flex flex-col lg:px-0 gap-[10px] md:w-1/2'>
          <div className='flex flex-col gap-2 md:justify-between h-full '>
            <div className='flex justify-between items-center'>
              <Card.Date
                date={tanggal}
                className=' flex gap-2 justify-center'
                svg='h-4 w-4 stroke-gray-500'
                dateclassName='font-[Poppins] text-xs text-gray-500'
              />
              <Card.Author
                author={author}
                className='flex items-center justify-center gap-2'
                svg='w-4 h-3 fill-gray-500'
                authorclassName='font-[Poppins] text-xs text-gray-500'
              />
            </div>
            <Card.Detail
              title={judul}
              description={
                <div dangerouslySetInnerHTML={{ __html: isi }}></div>
              }
            >
              <Link to={`/informasi-publik/berita-desa/${slug}`}>
                Baca Selengkapnya
              </Link>
            </Card.Detail>
          </div>
        </div>
      </Card>
    </>
  );
}

function List({ listitems }) {
  return (
    <>
      {listitems.map((news, index) => (
        <Link
          to={`/informasi-publik/berita-desa/${news.slug}`}
          className='w-full'
          key={index}
        >
          <Card
            container='md:flex md:w-full border-b-2 md:border border-gray-300 md:rounded lg:rounded-md'
            wrapper='w-full flex flex-row md:flex-col py-2 md:p-0 gap-2 md:gap-0'
          >
            <Card.Thumbnail
              className='w-1/2 md:w-full md:h-20 lg:h-[100px] xl:h-[150px] rounded-sm lg:rounded-t-md'
              src={news.thumbnail}
            />
            <div className='w-1/2 md:w-full flex flex-col gap-[10px] md:py-2 lg:py-3'>
              <div className='flex flex-col gap-3 md:gap-2 md:px-2'>
                <div className='flex justify-between items-center'>
                  <Card.Date
                    className='[&>svg]:h-2 [&>svg]:w-2 flex items-center gap-[2px] lg:gap-1 [&>svg]:lg:h-4 [&>svg]:lg:w-4 '
                    date={news.tanggal}
                    dateclassName='text-gray-500 text-[6px] font-medium font-[Poppins] lg:text-[10px] h-2 lg:h-3'
                  />
                  <Card.Author
                    className=' flex items-center gap-[2px] lg:gap-1 [&>svg]:w-2 [&>svg]:lg:h-4 '
                    svg='h-[6px] fill-gray-500'
                    author={news.author.nama}
                    authorclassName='text-gray-500 text-[6px] font-medium font-[Poppins] lg:text-[10px] '
                  />
                </div>
                <Card.Detail
                  className='py-0'
                  title={news.judul}
                  titleclassName='text-[10px] lg:text-[10px] xl:text-[12px] font-[Poppins] line-clamp-2 font-semibold text-gray-800'
                />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </>
  );
}

export default News;
