// src/components/CrudComponent.js

import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Modal from 'react-modal';
import EditModal from './EditModal';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';

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

const CrudComponent = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const { axiosInstance } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(endpoint);
      setData(response.data.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    setCurrentData(data);
    setIsOpen(true);
  };

  const handleDelete = async (slug) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`${endpoint}/${slug}`);
      fetchData(); // Refresh data after deletion
      toast.success('Data deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Error deleting data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedData, setModalLoading) => {
    setModalLoading(true);
    try {
      const formData = new FormData();
      formData.append('judul', updatedData.judul);
      formData.append('isi', updatedData.isi);
      formData.append('slug', updatedData.slug);
      if (updatedData.thumbnail) formData.append('thumbnail', updatedData.thumbnail);

      if (currentData) {
        formData.append('slug', updatedData.slug);
        formData.append('_method', 'put');
        await axiosInstance.post(`${endpoint}/${currentData.slug}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Create new data
        await axiosInstance.post(endpoint, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setIsOpen(false);
      fetchData(); // Refresh data after saving
      toast.success('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Error saving data');
    } finally {
      setModalLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentData(null); // Clear currentData to reset form
    setIsOpen(true);
  };

  const filteredData = data.filter(item => item.judul.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">{endpoint}</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari"
          className="border px-4 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleAddNew}
        >
          <FaPlus className="mr-2" /> Add New Data
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
                <th className="border px-4 py-2">Judul</th>
                <th className="border px-4 py-2">Isi</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.slug}>
                  <td className="border px-4 py-2">{item.judul}</td>
                  <td className="border px-4 py-2">{item.isi}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-500 h-8 text-white px-4 py-2 rounded mr-2 flex items-center"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      className="bg-red-500 mt-2 h-8 text-white px-4 py-2 rounded flex items-center"
                      onClick={() => handleDelete(item.slug)}
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
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} contentLabel="Edit Modal">
          <EditModal
            data={currentData}
            onClose={() => setIsOpen(false)}
            onSave={handleSave}
          />
        </Modal>
      )}
    </div>
  );
};

export default CrudComponent;
