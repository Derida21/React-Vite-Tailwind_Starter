import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import PelayananModal from './pelayanan_modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '90%',
    padding: '20px',
  },
};

Modal.setAppElement('#root');

const PelayananCrud = () => {
  const [pelayananData, setPelayananData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPelayanan, setCurrentPelayanan] = useState(null);
  const { axiosInstance } = useAppContext();

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/pelayanan?page=${currentPage}&search=${search}`);
      setPelayananData(response.data.data || []);
      setTotalPages(response.data.meta?.last_page || 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = (pelayanan) => {
    setCurrentPelayanan(pelayanan);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentPelayanan(null);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedPelayanan, setModalLoading) => {
    setModalLoading(true);
    try {
      if (currentPelayanan) {
        const response = await axiosInstance.put(
          `pelayanan/${currentPelayanan.kode_pelayanan}/proses`,
          { nomor: updatedPelayanan.nomor },
          { responseType: 'blob' }
        );
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        await axiosInstance.post('pelayanan', updatedPelayanan);
      }
      setIsOpen(false);
      fetchData();
      toast.success('Pelayanan processed successfully');
    } catch (error) {
      console.error('Error processing pelayanan:', error);
      toast.error('Error processing pelayanan');
    } finally {
      setModalLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-4 h-screen">
      {!isOpen && (
        <div className="mb-4 mt-10">
          <div className="container mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-6 bg-white">
                <div className="pb-4 mb-4 border-b-2 border-gray-200">
                  <div className="flex items-center justify-between min-h-100">
                    <div className="flex items-center">
                      <button
                        onClick={handleAddNew}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold"
                      >
                        <FaPlus className="mr-2" /> Add New
                      </button>
                      <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search by name"
                        className="block ml-4 p-2 text-sm placeholder-gray-400 border-2 border-gray-300 rounded-md shadow-sm appearance-none focus:border-primary focus:outline-none focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto px-6 pb-6">
                {loading ? (
                  <div className="text-center">
                    <ClipLoader color="#3b82f6" loading={loading} size={50} />
                  </div>
                ) : pelayananData.length === 0 ? (
                  <div className="text-center">No pelayanan available</div>
                ) : (
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Kode Pelayanan</th>
                        <th className="py-2 px-4 border-b text-left">Jenis Pelayanan</th>
                        <th className="py-2 px-4 border-b text-left">Nama Pelayanan</th>
                        <th className="py-2 px-4 border-b text-left">Nama Pengaju</th>
                        <th className="py-2 px-4 border-b text-left">No WA</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pelayananData.map((item) => (
                        <tr key={item.kode_pelayanan}>
                          <td className="py-2 px-4 border-b">{item.kode_pelayanan}</td>
                          <td className="py-2 px-4 border-b">{item.jenis_pelayanan}</td>
                          <td className="py-2 px-4 border-b">{item.nama_pelayanan}</td>
                          <td className="py-2 px-4 border-b">{item.nama_pengaju}</td>
                          <td className="py-2 px-4 border-b">{item.no_wa}</td>
                          <td className="py-2 px-4 border-b">{item.status}</td>
                          <td className="py-2 px-4 border-b">
                            <div className="flex space-x-2">
                              <button
                                className="text-teal-500 font-body"
                                onClick={() => handleProcess(item)}
                              >
                                <FaEdit className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="flex justify-center items-center mt-4 mb-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700 mx-4">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} contentLabel="Pelayanan Modal">
          <PelayananModal
            pelayanan={currentPelayanan}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave} 
          />
        </Modal>
      )}
    </div>
  );
};

export default PelayananCrud;
