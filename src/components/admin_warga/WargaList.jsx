import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import EditComponent from './EditComponent'; // Ensure this is correctly imported
import AlertComponent from '../utils/AlertComponent';
import ConfirmationDialog from '../utils/ConfirmationDialog';

const WargaList = () => {
  const { axiosInstance } = useAppContext();
  const [wargaList, setWargaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentWargaId, setCurrentWargaId] = useState(null);
  const [currentWargaName, setCurrentWargaName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    fetchWarga();
  }, [currentPage, searchQuery]);

  const fetchWarga = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/warga?page=${currentPage}&search=${searchQuery}`);
      if (response.data.success) {
        setWargaList(response.data.data || []);
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
    setCurrentWargaId(id);
    setEditMode(true);
  };

  const handleAddNew = () => {
    setCurrentWargaId(null); // Clear current ID for adding new entry
    setEditMode(true);
  };

  const handleDelete = async () => {
    if (!currentWargaId) return;

    try {
      const response = await axiosInstance.delete(`/warga/${currentWargaId}`);
      if (response.data.success) {
        setWargaList((prevList) => prevList.filter((item) => item.id !== currentWargaId));
        setError({ type: 'green', title: 'Success', message: 'Warga deleted successfully!' });
        setShowConfirmDialog(false);
      } else {
        setError({ type: 'red', title: 'Error', message: response.data.message });
      }
    } catch (error) {
      setError({ type: 'red', title: 'Error', message: error.message });
    }
  };

  const confirmDelete = (id, name) => {
    setCurrentWargaId(id);
    setCurrentWargaName(name);
    setShowConfirmDialog(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
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
                      <h1 className="text-lg font-semibold text-secondary">Data Warga</h1>
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
                ) : wargaList.length === 0 ? (
                  <div className="text-center">No warga available</div>
                ) : (
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Photo</th>
                        <th className="py-2 px-4 border-b text-left">Kepala Keluarga</th>
                        <th className="py-2 px-4 border-b text-left">Anggota Keluarga</th>
                        <th className="py-2 px-4 border-b text-left">Link Maps</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wargaList.map((warga) => (
                        <tr key={warga.id}>
                          <td className="py-2 px-4 border-b">
                            <img
                              src={warga.foto || 'default-photo-url'}
                              alt={warga.kepala_keluarga}
                              className="w-20 h-20 object-cover rounded"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">{warga.kepala_keluarga}</td>
                          <td className="py-2 px-4 border-b">
                            {warga.anggota_keluarga && warga.anggota_keluarga.length > 0 ? (
                              <ul>
                                {warga.anggota_keluarga.map((anggota, index) => (
                                  <li key={index}>{`${anggota.nama} (${anggota.status})`}</li>
                                ))}
                              </ul>
                            ) : (
                              <p>Be lum ada Anggota Keluarga</p>
                            )}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {warga.link_maps !== '-' ? (
                              <a
                                href={warga.link_maps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                Lihat di Peta
                              </a>
                            ) : (
                              <p>No link available</p>
                            )}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <div className="flex space-x-2">
                              <button
                                className="text-teal-500 font-body"
                                onClick={() => handleEdit(warga.id)}
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
                                onClick={() => confirmDelete(warga.id, warga.kepala_keluarga)}
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
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Sebelumnya
              </button>
              <span className="text-sm text-gray-700 mx-4">Halaman {currentPage} dari {totalPages}</span>
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
      )}
      {editMode && (
        <EditComponent
          uuid={currentWargaId}
          setEditMode={setEditMode}
          fetchData={fetchWarga}
        />
      )}
      {error && (
        <AlertComponent
          type={error.type}
          title={error.title}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}
      {showConfirmDialog && (
        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmDialog(false)}
          itemName={currentWargaName}
        />
      )}
    </div>
  );
};

export default WargaList;