import { Thumbnail } from '../../components/home_component/Section/Informasi Publik/Thumbnail';
import bg_img from '../../../assets/img/bg_berita.png';
import Card from '../../components/home_component/Section/Home/News/Card';
import Items from '../../components/home_component/Section/Informasi Publik/Items';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';
import bg from '../../../assets/img/bg_pelayanan.jpg';
import AgendaKegiatan from '../../components/home_component/Section/Informasi Publik/Berita/kegiatan';

export default function BeritaDesa() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/berita');
      setData(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const headline = data[0];
  const others = paginatedData.slice(1);

  return (
    <div className='px-5 pb-5 pt-14 md:px-[60px] md:pt-[120px] md:pb-10 lg:px-[80px] lg:pt-[130px] xl:px-[160px]'>
      <div className='w-full p-2 md:p-5 bg-white rounded-xl shadow border border-gray-300 flex-col justify-center items-start gap-2 md:gap-5 inline-flex'>
        {headline && (
          <Link
            to={`/informasi-publik/berita-kampung/${headline.slug}`}
            className='w-full'
          >
            <Thumbnail
              note='Berita Tebaru'
              bg={headline.thumbnail}
              title={headline.judul}
              description={
                <div dangerouslySetInnerHTML={{ __html: headline.isi }}></div>
              }
            />
          </Link>
        )}

        <div className='w-full flex flex-col md:flex-row justify-between items-start gap-5'>
          {/* Main */}
          <Items
            text='Berita Lainnya'
            className='w-full flex flex-col gap-2 lg:gap-5 md:p-4 md:border md:border-gray-300 rounded-md'
          >
            {others.map((news, index) => (
              <Card key={index} container='md:border-b-2 md:pb-5'>
                <Link
                  to={`/informasi-publik/berita-kampung/${news.slug}`}
                  className='flex flex-col md:flex-row w-full gap-2 md:gap-5'
                >
                  <Card.Thumbnail
                    src={news.thumbnail}
                    className='w-full h-[150px] lg:h-[150px] xl:h-[250px]  rounded-md md:rounded-lg'
                  />
                  <Card.Detail
                    className='w-full'
                    title={news.judul}
                    titleclassName='font-[Poppins] font-semibold text-gray-700 hover:text-teal-700'
                    description={
                      <div dangerouslySetInnerHTML={{ __html: news.isi }}></div>
                    }
                    descriptionclassName='font-[Poppins] text-[10px] md:text-[12px] xl:text-[14px] text-justify text-gray-500 line-clamp-4'
                  />
                </Link>
              </Card>
            ))}
            <div className='flex justify-between'>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='font-[Popppins] text-xs px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
              >
                Kembali
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                className='font-[Popppins] text-xs px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
              >
                Selanjutnya
              </button>
            </div>
          </Items>
          {/* Side */}
          <div className=' p-4 border border-gray-300 rounded-md flex flex-col gap-2 lg:gap-5 md:w-[200px] lg:w-[350px] xl:w-[400px]'>
            {/* Kegiatan */}
            <AgendaKegiatan />
            {/* Galeri */}
            <div className='flex flex-col gap-3 lg:gap-5'>
              <h1 className='font-[Poppins] text-[8px] md:text-xs font-medium text-gray-500'>
                Galeri Kampung
              </h1>
              <div className='grid  md:grid-cols-2 gap-2'>
                <img src={bg} alt='' className='rounded-md' />
                <img src={bg} alt='' className='rounded-md' />
                <img src={bg} alt='' className='rounded-md' />
                <img src={bg} alt='' className='rounded-md' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
