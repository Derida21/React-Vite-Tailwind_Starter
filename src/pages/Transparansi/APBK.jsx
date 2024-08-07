import { useEffect, useState } from 'react';
import axios from 'axios';
import { IconX } from '@tabler/icons-react';

const APBK = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/galeri');
      setData(response.data.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className='min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px] bg-slate-50'>
      <div className='min-h-screen flex flex-col items-center gap-3 md:gap-0 pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <h1 className='w-full font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white md:rounded-t-lg'>
          Anggaran Pembangunan dan Belanja Kampung
        </h1>
        <div className='flex flex-col w-full md:shadow-md md:bg-white md:p-4 xl:p-5 '>
          <div className='h-full flex flex-col gap-3'>
            {currentItems.map((item, index) => (
              <div
                key={index}
                className='relative h-fit border p-2 lg:p-4 md:rounded-md hover:border-teal-700 cursor-pointer'
                onClick={() => handleClick(indexOfFirstItem + index)}
              >
                <div
                  className=' relative flex items-end px-3 py-2 md:rounded lg:hover:scale-105 duration-500 h-[110px] md:h-80 xl:h-[160px] min-w-full'
                  style={{
                    backgroundImage: `url(${item.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '6px',
                  }}
                >
                  <h1 className='text-white text-[8px] md:text-[10px] font-[Poppins]'>
                    {item.judul}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-between mt-4 w-full'>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className='text-teal-700 border border-teal-700 hover:text-white hover:bg-teal-700 py-2 px-4 rounded-md'
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
              className='text-teal-700 border border-teal-700 hover:text-white hover:bg-teal-700 py-2 px-4 rounded-md'
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {open && currentIndex !== null && (
        <Modal
          item={data[currentIndex]}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
};

const Modal = ({ item, onClose, onNext, onPrev }) => {
  return (
    <div
      className='fixed flex-col inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999999999]'
      onClick={onClose}
    >
      <div
        className='flex relative flex-col gap-3 bg-white p-4 rounded-md max-w-lg w-full'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={onClose}
          className='absolute right-5 top-5 p-1 bg-red-500 hover:bg-red-700 text-white w-fit h-fit rounded-full cursor-pointer'
        >
          <IconX className='h-3 w-3' />
        </div>
        <img src={item.thumbnail} alt='' className='rounded-md' />

        {/* <div
          className='flex justify-end w-full h-[550px] rounded-sm p-3'
          style={{
            backgroundImage: `url(${item.thumbnail})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '6px',
          }}
        >
          <div
            onClick={onClose}
            className='p-2 bg-red-500 hover:bg-red-700 text-white w-fit h-fit rounded-full cursor-pointer'
          >
            <IconX className='h-3 w-3' />
          </div>
        </div> */}
        <div className='flex justify-between'>
          <button
            onClick={onPrev}
            className='bg-teal-700 text-white py-2 px-4 rounded-md'
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className='bg-teal-700 text-white py-2 px-4 rounded-md'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default APBK;
