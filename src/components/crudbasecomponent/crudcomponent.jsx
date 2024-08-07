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

    <div className="p-4">
      <div className="mb-4 mt-10">
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="px-6 py-6 bg-white ">
              <div className='pb-4 mb-4 border-b-2 border-gray-200'>
                <div className="flex items-center justify-between min-h-10">
                  <div>
                    <h1 className="text-lg font-semibold text-secondary">{endpoint}</h1>
                    <button
                      className="bg-teal-500 text-white px-4 py-2 mt-5 rounded-md"
                      onClick={handleAddNew}
                    >
                      Tambah data
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Cari"
                    className="block mt-11 p-2 text-sm placeholder-gray-400 border-2 border-gray-300 rounded-md shadow-sm appearance-none focus:border-primary focus:outline-none focus:ring-primary w-1/4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

              </div>
            </div>

            <div className="overflow-x-auto px-6 pb-6">
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
                        <td class="p-3 whitespace-nowrap border px-4 py-2">
                          <div class="flex">
                            <button
                              className="pr-2 text-teal-500 font-body"
                              onClick={() => handleEdit(item)}
                            >
                              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                </path>
                              </svg>
                            </button>
                            <button
                              className="text-red-500 font-body"
                              onClick={() => handleDelete(item.slug)}
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

        </div>
      </div>
    </div >

  );
};

export default CrudComponent;
