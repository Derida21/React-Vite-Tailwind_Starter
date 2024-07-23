import React from 'react';
import GenericList from '../reusable_crud/GenericList';
import useAppContext from '../../context/useAppContext';

const fields = [
  { name: 'nama', label: 'Name', type: 'text' },
  { name: 'singkatan', label: 'Abbreviation', type: 'text' },
  { name: 'deskripsi', label: 'Description', type: 'textarea' },
  { name: 'logo', label: 'Logo', type: 'file' },
];

const columns = [
  { name: 'nama', label: 'Name' },
  { name: 'singkatan', label: 'Abbreviation' },
  { name: 'deskripsi', label: 'Description' },
  { name: 'logo', label: 'Logo', render: (value) => value ? <img src={value} alt="Logo" className="w-20 h-20 object-cover rounded" /> : 'No Image' },
];

const endpoint = '/lembaga';

const LembagaList = () => {
  const { axiosInstance } = useAppContext();

  // Custom fetchData method
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(endpoint);
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  };

  // Custom saveData method
  const saveData = async (data) => {
    try {
      if (data.uuid) {
        await axiosInstance.put(`${endpoint}/${data.uuid}`, data);
      } else {
        await axiosInstance.post(endpoint, data);
      }
    } catch (error) {
      console.error('Failed to save data:', error);
      throw error;
    }
  };

  // Custom deleteData method
  const deleteData = async (id) => {
    try {
      await axiosInstance.delete(`${endpoint}/${id}`);
    } catch (error) {
      console.error('Failed to delete data:', error);
      throw error;
    }
  };

  return (
    <GenericList
      endpoint={endpoint}
      fields={fields}
      columns={columns}
      title="Lembaga"
      fetchDataCallback={fetchData}
      onSaveCallback={saveData}
      onDeleteCallback={deleteData}
    />
  );
};

export default LembagaList;
