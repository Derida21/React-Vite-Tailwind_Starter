import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenericModal from './GenericModal';
import GenericTable from './GenericTable';
import useAppContext from '../../context/useAppContext';

const GenericCRUD = ({ endpoint, columns, fields }) => {
  const { axiosInstance } = useAppContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(endpoint);
      if (response.data.success) {
        setData(response.data.data.data);
      } else {
        setError(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
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
    setSaving(true);
    const formData = new FormData();
    fields.forEach(field => formData.append(field.name, item[field.name]));

    try {
      if (currentItem) {
        const response = await axiosInstance.put(`${endpoint}/${currentItem.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (!response.data.success) {
          setError(response.data.message);
        }
      } else {
        const response = await axiosInstance.post(endpoint, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (!response.data.success) {
          setError(response.data.message);
        }
      }
      fetchData();
      closeModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setIsConfirmingDelete(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(`${endpoint}/${itemToDelete.id}`);
      if (!response.data.success) {
        setError(response.data.message);
      } else {
        fetchData();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsConfirmingDelete(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
    setItemToDelete(null);
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 5000); // Hide the error after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [error]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5 relative">
      <h1 className="text-3xl font-bold mb-5">Item List</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => openModal()}
      >
        Add Item
      </button>
      {data.length === 0 ? (
        <div className="text-center">No items available</div>
      ) : (
        <GenericTable
          data={data}
          columns={columns}
          onEdit={openModal}
          onDelete={handleDelete}
        />
      )}
      {isModalOpen && (
        <GenericModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          initialData={currentItem}
          fields={fields}
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
            <p className="mb-4">Are you sure you want to delete this item?</p>
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

export default GenericCRUD;
