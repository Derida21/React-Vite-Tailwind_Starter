import {
  IconDownload,
  IconFileSearch,
  IconPrinter,
  IconTrash,
} from '@tabler/icons-react';
import Layout from '../../Layout';
import useAppContext from '../../../../context/useAppContext';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import Pagination from '../../pagination'; // Import the Pagination component

const Pengantar = ({ handleback }) => {
  const { axiosInstance } = useAppContext();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState();
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPerencanaan();
  }, []);

  const fetchPerencanaan = async () => {
    try {
      const response = await axiosInstance.get(
        '/arsip/keuangan?subKategori=Pengantar'
      );
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const header = [
    { label: ['No.'] },
    { label: ['Kode Arsip'] },
    { label: ['File'] },
    { label: ['Nama File'] },
    { label: ['Tanggal Upload'] },
    { label: ['Aksi'] },
  ];

  const iconstyle =
    'p-1 text-white bg-teal-400 rounded-[3px] stroke-2 cursor-pointer duration-300';

  const listitem = (item, index, customstyle) => (
    <>
      <li className={customstyle[0]}>
        <h1 className='font-[Poppins] text-gray-700 text-xs px-4 py-3'>
          {index + 1}
        </h1>
      </li>
      <li className={customstyle[1]}>
        <h1 className='font-[Poppins] text-gray-700 text-xs px-4 py-3'>
          {item.kode_file}
        </h1>
      </li>
      <li className={customstyle[2]}>
        <h1 className='font-[Poppins] text-gray-700 text-xs px-4 py-3'>
          {item.type_file}
        </h1>
      </li>
      <li className={customstyle[3]}>
        <h1 className='font-[Poppins] text-gray-700 text-xs px-4 py-3'>
          {item.nama_file}
        </h1>
      </li>
      <li className={customstyle[4]}>
        <h1 className='font-[Poppins] text-gray-700 text-xs px-4 py-3'>
          {item.tanggal}
        </h1>
      </li>
      <li className={customstyle[5]}>
        <div className='flex flex-wrap gap-2 px-4 py-3'>
          <IconFileSearch className={`${iconstyle} hover:bg-green-500`} />
          <IconPrinter className={`${iconstyle} hover:bg-blue-500`} />
          <IconDownload className={`${iconstyle} hover:bg-yellow-500`} />
          <IconTrash className={`${iconstyle} hover:bg-red-500 `} />
        </div>
      </li>
    </>
  );

  const handleAddData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(data.length / itemsPerPage))
    );
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout className='border border-slate-50 p-0'>
      <div className='flex items-center gap-2 w-full'>
        <Layout.ButtonBack onClick={handleback} />
        <Layout.ButtonModal onClick={() => setShowModal(true)} />
      </div>
      <Layout.List header={header} data={currentItems} listitem={listitem} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddData}
      />
    </Layout>
  );
};

export default Pengantar;
