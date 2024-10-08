import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import PejabatModal from './PejabatModal';
import useAppContext from '../../context/useAppContext';

// Set app element for accessibility
Modal.setAppElement('#root');

const usePejabatData = (axiosInstance) => {
  const [pejabatList, setPejabatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPejabat = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/pejabat');
      if (response.data.success) {
        setPejabatList(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchPejabat();
  }, [fetchPejabat]);

  return { pejabatList, loading, error, fetchPejabat, setError };
};

const PejabatList = () => {
  const { axiosInstance } = useAppContext();
  const { pejabatList, loading, error, fetchPejabat, setError } = usePejabatData(axiosInstance);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPejabat, setCurrentPejabat] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [pejabatToDelete, setPejabatToDelete] = useState(null);

  const openModal = useCallback((pejabat = null) => {
    setCurrentPejabat(pejabat);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setCurrentPejabat(null);
    setIsModalOpen(false);
  }, []);

  const handleSave = useCallback(async (pejabat) => {
    setSaving(true);
    const formData = new FormData();
    formData.append('foto', pejabat.foto);
    formData.append('nama', pejabat.nama);
    formData.append('jabatan', pejabat.jabatan);
    formData.append('alamat', pejabat.alamat);
    formData.append('tugas', pejabat.tugas);

    try {
      let response;
      if (currentPejabat) {
        response = await axiosInstance.put(`/pejabat/${currentPejabat.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axiosInstance.post('/pejabat', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (response.data.success) {
        fetchPejabat();
        closeModal();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }, [axiosInstance, currentPejabat, fetchPejabat, closeModal]);

  const handleDelete = useCallback((pejabat) => {
    setPejabatToDelete(pejabat);
    setIsConfirmingDelete(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    setIsConfirmingDelete(false);
    try {
      const response = await axiosInstance.delete(`/pejabat/${pejabatToDelete.id}`);
      if (response.data.success) {
        fetchPejabat();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [axiosInstance, pejabatToDelete, fetchPejabat]);

  const cancelDelete = useCallback(() => {
    setIsConfirmingDelete(false);
    setPejabatToDelete(null);
  }, []);

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
      <h1 className="text-3xl font-bold mb-5">Daftar Pejabat</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => openModal()}
      >
        Tambah Pejabat
      </button>
      {pejabatList.length === 0 ? (
        <div className="text-center">No pejabat available</div>
      ) : (
        <div className="overflow-x-auto">
          <PejabatTable pejabatList={pejabatList} onEdit={openModal} onDelete={handleDelete} />
        </div>
      )}
      {isModalOpen && (
        <PejabatModal
          pejabat={currentPejabat}
          onClose={closeModal}
          onSave={handleSave}
          saving={saving}
        />
      )}
      {error && <ErrorMessage message={error} />}
      {isConfirmingDelete && (
        <DeleteConfirmation
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

const PejabatTable = ({ pejabatList, onEdit, onDelete }) => (
  <table className="min-w-full bg-white border border-gray-200">
    <thead>
      <tr className="bg-gray-100 border-b">
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Photo
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Nama
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Jabatan
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Alamat
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Tugas
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {pejabatList.map((pejabat) => (
        <tr key={pejabat.id}>
          <td className="px-6 py-4 whitespace-nowrap">
            <img
              src={pejabat.foto || 'default-photo-url'}
              alt={pejabat.nama}
              className="w-20 h-20 object-cover rounded"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {pejabat.nama}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {pejabat.jabatan}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {pejabat.alamat}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {pejabat.tugas}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => onEdit(pejabat)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => onDelete(pejabat)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ErrorMessage = ({ message }) => (
  <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 p-4 rounded-lg shadow-lg w-11/12 max-w-md z-50">
    <p className="text-sm">{message}</p>
  </div>
);

const DeleteConfirmation = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 flex items-center justify-center p-4 z-40">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to delete this pejabat?</p>
      <div className="flex justify-end">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default PejabatList;
