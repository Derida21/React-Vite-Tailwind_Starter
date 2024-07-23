import React, { useState, useEffect, useCallback } from 'react';
import GenericModal from './GenericModal';
import useAppContext from '../../context/useAppContext';
import Modal from 'react-modal';
// Set app element for accessibility
Modal.setAppElement('#root');

const GenericList = ({
  endpoint,
  fields,
  columns,
  title,
  fetchDataCallback,
  onSaveCallback,
  onDeleteCallback,
}) => {
  const { axiosInstance } = useAppContext();
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDataCallback();
      setDataList(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [fetchDataCallback]);

  const handleSave = async (data) => {
    setSaving(true);
    try {
      await onSaveCallback(data);
      await fetchData();
      closeModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDeleteCallback(id);
      await fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openModal = (data = null) => {
    setCurrentData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentData(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    setIsConfirmingDelete(false);
    try {
      await handleDelete(dataToDelete.id);
    } catch (error) {
      setError(error.message);
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
    setDataToDelete(null);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5 relative">
      <h1 className="text-3xl font-bold mb-5">{title}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => openModal()}
      >
        Add {title}
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 table-fixed">
          <thead>
            <tr className="bg-gray-100 border-b">
              {columns.map((col) => (
                <th
                  key={col.name}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataList.map((data) => (
              <tr key={data.id}>
                {columns.map((col) => (
                  <td
                    key={col.name}
                    className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
                  >
                    {col.render ? col.render(data[col.name], data) : data[col.name]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => openModal(data)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setDataToDelete(data);
                      setIsConfirmingDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <GenericModal
          data={currentData}
          onClose={closeModal}
          onSave={handleSave}
          fields={fields}
          title={title}
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
              Are you sure you want to delete this {title}?
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

export default GenericList;
