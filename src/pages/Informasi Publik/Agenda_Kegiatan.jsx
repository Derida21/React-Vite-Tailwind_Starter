import { Thumbnail } from '../../components/home_component/Section/Informasi Publik/Thumbnail';
import Card from '../../components/home_component/Section/Home/News/Card';
import Items from '../../components/home_component/Section/Informasi Publik/Items';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';
import Berita from '../../components/home_component/Section/Informasi Publik/Agenda_Kegiatan/berita';
import Galeri from '../../components/home_component/Section/Informasi Publik/Galeri';

export default function Agenda_Kegiatan() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/kegiatan');
      setData(response.data.data);
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
    <div className='px-5 pt-14 md:px-[60px] md:pt-[120px] md:pb-10 lg:px-[80px] lg:pt-[130px] xl:px-[160px]'>
      <div className='w-full p-2 md:p-5 bg-white rounded-xl flex-col justify-center items-start gap-2 md:gap-5 inline-flex'>
        {headline && (
          <Link
            to={`/informasi-publik/agenda-kegiatan/${headline.slug}`}
            className='w-full'
          >
            <Thumbnail
              note='Agenda Tebaru'
              bg={headline.thumbnail}
              title={headline.judul}
              description={
                <div dangerouslySetInnerHTML={{ __html: headline.isi }}></div>
              }
            />
          </Link>
        )}

        <div className='w-full h-full flex flex-col md:flex-row justify-between items-start gap-5'>
          {/* Main */}
          <Items className='w-full min-h-full flex flex-col gap-2 lg:gap-5 md:p-4 md:border md:border-gray-300 rounded-md'>
            {others.map((news, index) => (
              <Card key={index} container='md:border-b-2 md:pb-5'>
                <Link
                  to={`/informasi-publik/agenda-kegiatan/${news.slug}`}
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
            <Berita />
            {/* Galeri */}
            <Galeri />
          </div>
        </div>
      </div>
    </div>
  );
}
