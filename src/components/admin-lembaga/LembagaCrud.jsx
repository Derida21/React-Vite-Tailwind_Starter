import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import Modal from './Modal';
import EditComponent from './EditComponent';

const LembagaCRUD = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedUuid, setSelectedUuid] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { axiosInstance } = useAppContext();

  const fetchData = async (page = 1) => {
    try {
      console.log(`Fetching data for search query: "${debouncedSearchQuery}" on page ${page}`);
      const response = await axiosInstance.get(`/lembaga?page=${page}&search=${debouncedSearchQuery}`);
      console.log('API response:', response.data);
      
      setDataList(response.data.data);
      setFilteredData(response.data.data);
      setTotalPages(response.data.meta.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, debouncedSearchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDelete = async () => {
    await axiosInstance.delete(`/lembaga/${selectedUuid}`);
    setModalOpen(false);
    fetchData(currentPage);
  };

  const handleSelect = (uuid) => {
    setSelectedUuid(uuid);
    setEditMode(true);
  };

  const handleAddNew = () => {
    setSelectedUuid(null);
    setEditMode(true);
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
    <div className="p-4">
      {!editMode && (
        <div className="mb-4 mt-10">
          <div className="container mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-6 bg-white">
                <div className="pb-4 mb-4 border-b-2 border-gray-200">
                  <div className="flex items-center justify-between min-h-10">
                    <div>
                      <h1 className="text-lg font-semibold text-secondary">Lembaga</h1>
                      <button
                        className="bg-teal-500 text-white px-4 py-2 mt-5 rounded-md"
                        onClick={handleAddNew}
                      >
                        Tambahkan Data
                      </button>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Cari berdasarkan"
                      className="block mt-11 p-2 text-sm placeholder-gray-400 border-2 border-gray-300 rounded-md shadow-sm appearance-none focus:border-primary focus:outline-none focus:ring-primary w-1/4"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto px-6 pb-6">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Nama</th>
                      <th className="py-2 px-4 border-b text-left">Singkatan</th>
                      <th className="py-2 px-4 border-b text-left">Deskripsi</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((data) => (
                        <tr key={data.uuid}>
                          <td className="py-2 px-4 border-b">{data.nama}</td>
                          <td className="py-2 px-4 border-b">{data.singkatan}</td>
                          <td className="py-2 px-4 border-b">{data.deskripsi}</td>
                          <td className="py-2 px-4 border-b">
                            <div className="flex">
                              <button
                                className="pr-2 text-teal-500 font-body"
                                onClick={() => handleSelect(data.uuid)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                              </button>
                              <button
                                className="text-red-500 font-body"
                                onClick={() => {
                                  setSelectedUuid(data.uuid);
                                  setModalOpen(true);
                                }}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-2 px-4 text-center">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* <div className="flex justify-center items-center mt-4 mb-4 ">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Sebelumnya
                </button>
                <span className="text-sm text-gray-700">Halaman {currentPage} dari {totalPages}</span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  Selanjutnya
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
      {editMode && (
        <EditComponent
          uuid={selectedUuid}
          setEditMode={setEditMode}
          fetchData={fetchData}
        />
      )}

      {modalOpen && <Modal handleDelete={handleDelete} setModalOpen={setModalOpen} />}
    </div>
  );
};

export default LembagaCRUD;
