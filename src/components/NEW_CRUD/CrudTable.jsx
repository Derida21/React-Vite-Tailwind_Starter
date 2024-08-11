import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CrudModal from './CrudModal';
import useAppContext from '../../context/useAppContext';

const CrudTable = ({ endpoint, schema, title }) => {
  const { axiosInstance } = useAppContext();
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedSearchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${endpoint}?page=${currentPage}&search=${debouncedSearchQuery}`);
      if (response.data.success) {
        setDataList(response.data.data?.data || []);
        setCurrentPage(response.data.data?.meta?.current_page || 1);
        setTotalPages(response.data.data?.meta?.last_page || 1);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item = null) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };

  const handleSave = async (item) => {
    try {
      let response;
      if (currentItem) {
        response = await axiosInstance.put(`${endpoint}/${currentItem.id}`, item);
      } else {
        response = await axiosInstance.post(endpoint, item);
      }
      if (response.data.success) {
        fetchData();
        closeModal();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setIsConfirmingDelete(true);
  };

  const confirmDelete = async () => {
    setIsConfirmingDelete(false);
    try {
      const response = await axiosInstance.delete(`${endpoint}/${itemToDelete.id}`);
      if (response.data.success) {
        fetchData();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
    setItemToDelete(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
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
                      onClick={() => openModal()}
                    >
                      Tambahkan {title}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={`Cari ${title} / Nama`}
                    className="block mt-11 p-2 text-sm placeholder-gray-400 border-2 border-gray-300 rounded-md shadow-sm appearance-none focus:border-primary focus:outline-none focus:ring-primary w-1/4"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto px-6 pb-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    {schema.map((field) => (
                      <th key={field.name} className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {field.label}
                      </th>
                    ))}
                    <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={schema.length + 1} className="text-center p-4">
                        Loading...
                      </td>
                    </tr>
                  ) : dataList.length === 0 ? (
                    <tr>
                      <td colSpan={schema.length + 1} className="text-center p-4">
                        No {title} available
                      </td>
                    </tr>
                  ) : (
                    dataList.map((item) => (
                      <tr key={item.id}>
                        {schema.map((field) => (
                          <td key={field.name} className="py-2 px-4 border-b text-left text-sm text-gray-500 max-w-xs truncate">
                            {field.type === 'image' ? (
                              <img src={item[field.name] || 'default-photo-url'} alt={item[field.name]} className="w-20 h-20 object-cover rounded" />
                            ) : field.type === 'array' ? (
                              <ul>
                                {item[field.name]?.map((subItem, index) => (
                                  <li key={index} className="truncate">{`${subItem.nama} (${subItem.status})`}</li>
                                ))}
                              </ul>
                            ) : (
                              <span className="truncate">{item[field.name] || '-'}</span>
                            )}
                          </td>
                        ))}
                        <td className="py-2 px-4 border-b text-left">
                          <div className="flex">
                            <button
                              className="pr-2 text-teal-500 font-body"
                              onClick={() => openModal(item)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                              </svg>
                            </button>
                            <button
                              className="text-red-500 font-body"
                              onClick={() => {
                                setItemToDelete(item);
                                setIsConfirmingDelete(true);
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
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
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
      {isModalOpen && (
        <CrudModal
          schema={schema}
          item={currentItem}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 p-4 rounded-lg shadow-lg w-11/12 max-w-md z-50">
          <p className="text-sm">{error}</p>
        </div>
      )}
      {isConfirmingDelete && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this {title}?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudTable;
