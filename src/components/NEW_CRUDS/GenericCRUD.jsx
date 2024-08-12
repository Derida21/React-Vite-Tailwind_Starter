import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import CustomModal from './CustomModal';
import EditComponent from './EditComponent';
import AlertComponent from '../utils/AlertComponent';

const GenericCRUD = ({ title, endpoint, schema }) => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [alertMessage, setAlertMessage] = useState(null);
  const { axiosInstance } = useAppContext();

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${endpoint}?page=${page}&search=${debouncedSearchQuery}`);
      setDataList(response.data.data);
      setFilteredData(response.data.data);
      setTotalPages(response.data.data.meta.total_pages);
      setCurrentPage(page);
    } catch (error) {
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
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
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`${endpoint}/${selectedItem.id || selectedItem.uuid}`);
      setModalOpen(false);
      setAlertMessage({ type: 'green', title: 'Deleted', message: response.data.message || 'Item deleted successfully.' });
      fetchData(currentPage);
    } catch (error) {
      setAlertMessage({
        type: 'red',
        title: 'Error',
        message: error.response?.data?.message || 'There was an issue deleting the item.',
      });
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setEditMode(true);
  };

  const handleAddNew = () => {
    setSelectedItem(null);
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
      {alertMessage && (
        <AlertComponent
          type={alertMessage.type}
          title={alertMessage.title}
          message={alertMessage.message}
          duration={5000} // Customizable duration in milliseconds
          onClose={() => setAlertMessage(null)}
        />
      )}
      {!editMode && (
        <div className="mb-4 mt-10">
          <div className="container mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-6 bg-white">
                <div className="pb-4 mb-4 border-b-2 border-gray-200">
                  <div className="flex items-center justify-between min-h-10">
                    <div>
                      <h1 className="text-lg font-semibold text-secondary">{title}</h1>
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
                      placeholder="Search by name"
                      className="block mt-11 p-2 text-sm placeholder-gray-400 border-2 border-gray-300 rounded-md shadow-sm appearance-none focus:border-primary focus:outline-none focus:ring-primary w-1/4"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto px-6 pb-6">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        {schema.map((field) => (
                          <th key={field.name} className="py-2 px-4 border-b text-left">
                            {field.label}
                          </th>
                        ))}
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((data) => (
                          <tr key={data.uuid}>
                            {schema.map((field) => (
                              <td key={field.name} className="py-2 px-4 border-b">
                                {field.type === 'image' ? (
                                  <img src={data[field.name]} alt={data[field.name]} className="h-10 w-10" />
                                ) : (
                                  data[field.name]
                                )}
                              </td>
                            ))}
                            <td className="py-2 px-4 border-b">
                              <div className="flex">
                                <button
                                  className="pr-2 text-teal-500 font-body"
                                  onClick={() => handleSelect(data)}
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                  </svg>
                                </button>
                                <button
                                  className="text-red-500 font-body"
                                  onClick={() => {
                                    setSelectedItem(data);
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
                          <td colSpan={schema.length + 1} className="py-2 px-4 text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="flex justify-center items-center mt-4 mb-4 ">
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
              </div>
            </div>
          </div>
        </div>
      )}
      {editMode && (
        <EditComponent
          item={selectedItem}
          schema={schema}
          setEditMode={setEditMode}
          fetchData={fetchData}
          endpoint={endpoint}
        />
      )}

      <CustomModal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this item?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </CustomModal>

      <CustomModal isOpen={errorModalOpen} onRequestClose={() => setErrorModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p>Ada Kesalahan </p>
          <div className="mt-4 flex justify-end">
        
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default GenericCRUD;
