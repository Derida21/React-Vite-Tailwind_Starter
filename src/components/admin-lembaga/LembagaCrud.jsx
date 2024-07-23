// LembagaCrud.js
import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import useAppContext from '../../context/useAppContext';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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

const LembagaCrud = () => {
  const [lembagaData, setLembagaData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLembaga, setCurrentLembaga] = useState(null);
  const { axiosInstance } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteLembagaId, setDeleteLembagaId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('lembaga');
      setLembagaData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (lembaga) => {
    setCurrentLembaga(lembaga);
    setIsOpen(true);
  };

  const handleDelete = async (uuid) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`lembaga/${uuid}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    } finally {
      setLoading(false);
      setDeleteConfirmationOpen(false); // Close confirmation modal after deletion
    }
  };

  const handleSave = async (updatedLembaga, setModalLoading) => {
    setModalLoading(true);
    try {
      if (updatedLembaga.uuid !== "") {
        // Update existing lembaga
        await axiosInstance.put(`lembaga/${updatedLembaga.id}`, updatedLembaga);
      } else {
        // Create new lembaga
        await axiosInstance.post('lembaga', updatedLembaga);
      }
      setIsOpen(false);
      fetchData(); // Refresh data after saving
    } catch (error) {
      console.error('Error saving lembaga:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentLembaga(null); // Clear currentLembaga to reset form
    setIsOpen(true);
  };

  const confirmDelete = (uuid) => {
    setDeleteLembagaId(uuid);
    setDeleteConfirmationOpen(true);
  };

  const filteredData = lembagaData.filter((lembaga) =>
    lembaga.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Daftar Lembaga</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari Lembaga"
          className="border px-4 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleAddNew}
        >
          <FaPlus className="mr-2" /> Tambahkan Lembaga
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#3b82f6" loading={loading} size={50} />
          </div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Logo</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Singkatan</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((lembaga) => (
                <tr key={lembaga.uuid}>
                  <td className="border px-4 py-2">
                    <img
                      src={lembaga.logo}
                      alt={lembaga.nama}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border px-4 py-2">{lembaga.nama}</td>
                  <td className="border px-4 py-2">{lembaga.singkatan}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 mb-2 rounded  flex items-center"
                      onClick={() => handleEdit(lembaga)}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                      onClick={() => confirmDelete(lembaga.uuid)}
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Edit Lembaga Modal"
        >
          <EditModal
            lembaga={currentLembaga}
            onClose={() => setIsOpen(false)}
            onSave={handleSave}
          />
        </Modal>
      )}

      {deleteConfirmationOpen && (
        <Modal
          isOpen={deleteConfirmationOpen}
          onRequestClose={() => setDeleteConfirmationOpen(false)}
          style={customStyles}
          contentLabel="Delete Confirmation Modal"
        >
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Apakah Kamu yakin ingin menghapus lembaga ini?  
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(deleteLembagaId)}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setDeleteConfirmationOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LembagaCrud;
