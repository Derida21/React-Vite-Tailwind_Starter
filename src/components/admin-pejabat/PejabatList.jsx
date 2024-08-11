import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import EditComponent from './EditComponent';
import AlertComponent from '../utils/AlertComponent';
import ConfirmationDialog from '../utils/ConfirmationDialog';

const PejabatList= () => {
  const { axiosInstance } = useAppContext();
  const [pejabatList, setPejabatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPejabatId, setCurrentPejabatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPejabatName, setCurrentPejabatName] = useState('');

  useEffect(() => {
    fetchPejabat();
  }, [currentPage, searchQuery]);

  const fetchPejabat = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/pejabat?page=${currentPage}&search=${searchQuery}`);
      if (response.data.success) {
        setPejabatList(response.data.data || []);
        setTotalPages(response.data.meta?.last_page || 1);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setCurrentPejabatId(id);
    setEditMode(true);
  };

  const handleAddNew = () => {
    setCurrentPejabatId(null);
    setEditMode(true);
  };

  const handleDelete = async () => {
    if (!currentPejabatId) return;

    try {
      const response = await axiosInstance.delete(`/pejabat/${currentPejabatId}`);
      if (response.data.success) {
        setPejabatList((prevList) => prevList.filter((item) => item.id !== currentPejabatId));
        setError({ type: 'green', title: 'Success', message: 'Pejabat deleted successfully!' });
      } else {
        setError({ type: 'red', title: 'Error', message: response.data.message });
      }
    } catch (error) {
      setError({ type: 'red', title: 'Error', message: error.message });
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const confirmDelete = (id, name) => {
    setCurrentPejabatId(id);
    setCurrentPejabatName(name);
    setShowConfirmDialog(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
    <div className="p-4">
      {!editMode && (
        <div className="mb-4 mt-10">
          <div className="container mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-6 bg-white">
                <div className="pb-4 mb-4 border-b-2 border-gray-200">
                  <div className="flex items-center justify-between min-h-10">
                    <div>
                      <h1 className="text-lg font-semibold text-secondary">Pejabat</h1>
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
                      placeholder="Cari berdasarkan Nama"
                      className="block mt-11 p-2 text-sm placeholder-gray-400 border-2 border-gray-300 rounded-md shadow-sm appearance-none focus:border-primary focus:outline-none focus:ring-primary w-1/4"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto px-6 pb-6">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : pejabatList.length === 0 ? (
                  <div className="text-center">No pejabat available</div>
                ) : (
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Photo</th>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Position</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pejabatList.map((pejabat) => (
                        <tr key={pejabat.id}>
                          <td className="py-2 px-4 border-b">
                            <img
                              src={pejabat.foto || 'default-photo-url'}
                              alt={pejabat.nama}
                              className="w-20 h-20 object-cover rounded"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">{pejabat.nama}</td>
                          <td className="py-2 px-4 border-b">{pejabat.jabatan}</td>
                          <td className="py-2 px-4 border-b">
                            <div className="flex space-x-2">
                              <button
                                className="text-teal-500 font-body"
                                onClick={() => handleEdit(pejabat.id)}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  ></path>
                                </svg>
                              </button>
                              <button
                                className="text-red-500 font-body"
                                onClick={() => confirmDelete(pejabat.id, pejabat.nama)}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center mt-4 mb-4">
              {/* <button
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
              </button> */}
            </div>
          </div>
        </div>
      )}
      {editMode && (
        <EditComponent
          id={currentPejabatId}
          setEditMode={setEditMode}
          fetchData={fetchPejabat}
        />
      )}
      {error && (
        <AlertComponent
          type={error.type || 'red'}
          title={error.title || 'Error'}
          message={error.message || 'Something went wrong!'}
          onClose={() => setError(null)}
        />
      )}
      {showConfirmDialog && (
        <ConfirmationDialog
          isOpen={showConfirmDialog}
          itemName={currentPejabatName}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </div>
  );
};

export default PejabatList;
