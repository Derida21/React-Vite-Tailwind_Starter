import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import WargaModal from './WargaModal';
import useAppContext from '../../context/useAppContext';

// Set app element for accessibility
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

    // Append anggota_keluarga fields
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
    <div className="container mx-auto p-5 relative">
      <h1 className="text-3xl font-bold mb-5">Daftar Warga</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => openModal()}
      >
        Tambah Warga
      </button>
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
                      className="text-blue-500 hover:underline"
                    >
                      View on Maps
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => openModal(warga)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(warga)}
                    >
                      Delete
                    </button>
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
  );
};

export default WargaList;