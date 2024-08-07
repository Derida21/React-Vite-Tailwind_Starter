import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import WargaModal from './WargaModal';
import useAppContext from '../../context/useAppContext';


Modal.setAppElement('#root');

const WargaList = () => {
  const { axiosInstance } = useAppContext();
  const [wargaList, setWargaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWarga, setCurrentWarga] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [wargaToDelete, setWargaToDelete] = useState(null);

  useEffect(() => {
    fetchWarga();
  }, []);

  const fetchWarga = async () => {
    try {
      const response = await axiosInstance.get('/warga');
      if (response.data.success) {
        // Log the response data to debug
        console.log(response.data.data);
        // Ensure data is an array
        setWargaList(response.data.data.data);
      } else {
        setError(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const openModal = (warga = null) => {
    setCurrentWarga(warga);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentWarga(null);
    setIsModalOpen(false);
  };

  const handleSave = async (warga) => {
    setSaving(true);
    const formData = new FormData();
    formData.append('foto', warga.foto);
    formData.append('kepala_keluarga', warga.kepala_keluarga);
    formData.append('link_maps', warga.link_maps);


    warga.anggota_keluarga.forEach((anggota, index) => {
      formData.append(`anggota_keluarga[${index}][nama]`, anggota.nama);
      formData.append(`anggota_keluarga[${index}][status]`, anggota.status);
    });

    try {
      if (currentWarga) {
        const response = await axiosInstance.put(`/warga/${currentWarga.id}`, formData);
        if (response.data.success) {
          fetchWarga();
          closeModal();
        } else {
          setError(response.data.message);
        }
      } else {
        console.log(warga)
        const response = await axiosInstance.post('/warga', warga);
        if (response.data.success) {
          fetchWarga();
          closeModal();
        } else {
          setError(response.data.message);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (warga) => {
    setWargaToDelete(warga);
    setIsConfirmingDelete(true);
  };

  const confirmDelete = async () => {
    setIsConfirmingDelete(false);
    try {
      const response = await axiosInstance.delete(`/warga/${wargaToDelete.id}`);
      if (response.data.success) {
        fetchWarga();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
    setWargaToDelete(null);
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 mt-10">
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="container mx-auto p-5 relative">
              <div class="px-6 py-6 bg-white ">
                <div className="pb-4 mb-4 border-b-2 border-gray-200">
                  <div className="flex items-center justify-between min-h-10">
                    <div>
                      <h1 className="text-lg font-semibold text-secondary">Daftar Warga</h1>
                      <button
                        className="bg-teal-500 text-white px-4 py-2 mt-5 rounded"
                        onClick={() => openModal()}
                      >
                        Tambah Warga
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto px-6 pb-6">
                {wargaList.length === 0 ? (
                  <div className="text-center">No warga available</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead>
                        <tr className="bg-gray-100 border-b">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Photo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kepala Keluarga
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Anggota Keluarga
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Link Maps
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {wargaList.map((warga) => (
                          <tr key={warga.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img
                                src={warga.foto || 'default-photo-url'} // Handle missing photo
                                alt={warga.kepala_keluarga}
                                className="w-20 h-20 object-cover rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {warga.kepala_keluarga}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <ul>
                                {warga.anggota_keluarga.map((anggota, index) => (
                                  <li key={index}>{anggota.nama} ({anggota.status})</li>
                                ))}
                              </ul>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <a
                                href={warga.link_maps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-500 hover:underline"
                              >
                                View on Maps
                              </a>
                            </td>
                            <td class="p-3 whitespace-nowrap">
                              <div class="flex">
                                <button
                                  className="pr-2 text-teal-500 font-body"
                                  onClick={() => openModal(warga)}
                                >
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                    </path>
                                  </svg>
                                </button>
                                <button
                                  className="text-red-500 font-body"
                                  onClick={() => handleDelete(warga)}
                                >
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                  </svg>
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {isModalOpen && (
                  <WargaModal
                    warga={currentWarga}
                    onClose={closeModal}
                    onSave={handleSave}
                    saving={saving}
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
                        Are you sure you want to delete this warga?
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

            </div>
          </div>
        </div>
      </div>


    </div>

  );
};

export default WargaList;