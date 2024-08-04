import { IconMap, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DataPenduduk = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const getData = async () => {
    try {
      const response = await axios.get(`http://nurul-huda.org/api/warga`);
      setData(response.data.data.data);
      setFilteredData(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const searchLower = searchTerm.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.kepala_keluarga.toLowerCase().includes(searchLower) ||
        item.anggota_keluarga.some((anggota) =>
          anggota.nama.toLowerCase().includes(searchLower)
        )
    );
    setFilteredData(filtered);
    setCurrentPage(currentPage);
  }, [searchTerm, data]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className='min-h-screen px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col items-center gap-3 md:gap-0 pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <div className='w-full flex flex-col gap-3 md:gap-0 md:flex-row items-center justify-between py-3 px-4 bg-teal-700 rounded-lg md:rounded-b-none md:rounded-t-lg'>
          <h1 className='font-[Poppins] text-[16px] md:text-[24px] font-semibold text-white'>
            Data Penduduk
          </h1>
          <form
            action=''
            className='relative w-full md:w-fit flex items-center'
          >
            <input
              type='text'
              placeholder='Cari Nama'
              value={searchTerm}
              onChange={handleSearchChange}
              className='text-xs rounded-full w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-teal-700'
            />
            <button
              type='submit'
              className='border-l-[1px] px-2 absolute right-0'
            >
              <IconSearch className='stroke-gray-500 w-4 hover:stroke-teal-700' />
            </button>
          </form>
        </div>
        <div className='flex flex-col justify-between w-full gap-4 md:p-5 md:border rounded-b-lg min-h-screen '>
          <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 '>
            {currentData.map((item) => (
              <div
                key={item.id}
                className='flex flex-col gap-4 p-3 border border-teal-700 rounded-lg'
              >
                <div className='flex flex-col gap-2 h-full'>
                  {/* Foto */}
                  <div
                    className='h-[140px] rounded-md'
                    style={{
                      backgroundImage: `url(${item.foto})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  {/* Detail */}
                  <div className='flex flex-col gap-1'>
                    <div className='flex justify-between font-[Poppins] text-gray-700 text-[10px] font-semibold'>
                      <h1>Kepala Keluarga : </h1>
                      <span>{item.kepala_keluarga}</span>
                    </div>
                    <div className='flex flex-col gap-2 h-full'>
                      <h1 className='font-[Poppins] text-gray-700 text-[10px]'>
                        Anggota Keluarga :
                      </h1>
                      <table className='table-auto text-center font-[Poppins] text-gray-500 text-[8px] border'>
                        <thead>
                          <tr>
                            <th className='border py-1'>No.</th>
                            <th className='border py-1'>Nama</th>
                            <th className='border py-1'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.anggota_keluarga.map((anggota, index) => (
                            <tr key={index}>
                              <td className='border py-1'>{index + 1}</td>
                              <td className='border py-1'>{anggota.nama}</td>
                              <td className='border py-1'>{anggota.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <Link
                    to={item.link_maps}
                    target='_blank'
                    className='flex items-center font-[Poppins] text-[8px] text-teal-700 border border-teal-700 p-2 rounded hover:text-white hover:bg-teal-700'
                  >
                    <IconMap className='h-4' />
                    <span>Lihat di Maps</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className='flex items-center justify-between w-full '>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className='mx-1 px-3 py-1 border bg-white text-teal-700 rounded-md border-teal-700 hover:text-white hover:bg-teal-700 cursor-pointer'
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 border rounded-md   ${
                  currentPage === index + 1
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-teal-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='mx-1 px-3 py-1 border bg-white text-teal-700 rounded-md border-teal-700 hover:text-white hover:bg-teal-700 cursor-pointer'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataPenduduk;
