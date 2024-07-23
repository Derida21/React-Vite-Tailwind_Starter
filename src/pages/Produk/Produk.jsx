import { Thumbnail } from '../../components/home_component/Section/Informasi Publik/Thumbnail';
import Card from '../../components/home_component/Section/Home/News/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Produk() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/produk');
      setData(response.data.data.data);
      console.log(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className='min-h-screen px-5 pt-14 md:px-[60px] md:pt-[120px] md:pb-10 lg:px-[80px] lg:pt-[130px] xl:px-[160px] bg-slate-100'>
      <div className='w-full p-2 md:p-5 bg-white rounded-xl shadow border border-gray-300 flex-col justify-center items-start gap-2 md:gap-8 inline-flex'>
        <div className='flex flex-col gap-8 w-full'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-[Poppins] text-3xl font-semibold text-teal-700 mt-5'>
              Produk UMKM <br />
              <span className='text-[20px] font-normal'>Kampung Eka Sapta</span>
            </h1>
            <p className='font-[Poppins] text-gray-500'>
              Menampilkan produk, jasa, dan hasil bumi Kampung Eka Sapta
            </p>
          </div>
          <div className='flex flex-col gap-5 bg-white shadow-xl md:p-5 border-t rounded-xl'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full '>
              {currentItems.map((item, index) => (
                <Card
                  key={index}
                  container=''
                  wrapper='flex flex-col gap-3 border pb-4 shadow-md rounded-md h-full '
                >
                  <Card.Thumbnail
                    src={item.foto}
                    className='w-full min-h-[150px] rounded-t-md '
                  >
                    haloo
                  </Card.Thumbnail>
                  <Card.Detail
                    className='px-3 flex flex-col justify-between rounded-b-md h-[120px]'
                    title={item.nama_produk}
                    titleclassName='font-[Poppins] font-medium text-gray-700'
                    description={
                      <p
                        dangerouslySetInnerHTML={{ __html: item.deskripsi }}
                      ></p>
                    }
                    descriptionclassName='line-clamp-3 text-justify font-[Poppins] text-gray-500 text-[12px]'
                  >
                    <Link
                      to={`/produk/${item.slug}`}
                      className='w-full text-center '
                    >
                      Detail
                    </Link>
                  </Card.Detail>
                </Card>
              ))}
            </div>
            <div className='flex justify-between mt-4'>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className='px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
              >
                Previous
              </button>
              <div className='flex gap-2'>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    className={`px-3 py-1 rounded ${
                      index + 1 === currentPage
                        ? 'bg-teal-700 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className='px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produk;
