import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import CustomModal from './CustomModal';
import AlertComponent from '../utils/AlertComponent';

const EditComponent = ({ item, schema, setEditMode, fetchData, endpoint }) => {
  const { axiosInstance } = useAppContext();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (item) {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`${endpoint}/${item.id || item.uuid}`);
          setFormData(response.data.data);
        } catch (error) {
          setErrorModalOpen(true);
        } finally {
          setLoading(false);
        }
      } else {
        const initialFormData = {};
        schema.forEach((field) => {
          initialFormData[field.name] = field.type === 'array' ? [] : '';
        });
        setFormData(initialFormData);
      }
    };

    fetchItemDetails();
  }, [item, endpoint, schema, axiosInstance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedData = new FormData();
      Object.keys(formData).forEach((key) => {
        updatedData.append(key, formData[key]);
      });

      let response;
      if (item) {
        updatedData.append('_method', 'put');
        response = await axiosInstance.put(`${endpoint}/${item.id || item.uuid}`, updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axiosInstance.post(endpoint, updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      setAlertMessage({ type: 'green', title: 'Success', message: response.data.message || 'Operation successful!' });
      setEditMode(false);
      fetchData();
    } catch (error) {
      setAlertMessage({
        type: 'red',
        title: 'Error',
        message: error.response?.data?.message || 'There was an issue processing your request.',
      });
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {alertMessage && (
        <AlertComponent
          type={alertMessage.type}
          title={alertMessage.title}
          message={alertMessage.message}
          duration={5000} // Customizable duration in milliseconds
          onClose={() => setAlertMessage(null)}
        />
      )}
      <button className="bg-gray-500 text-white px-4 py-2 rounded mb-4" onClick={() => setEditMode(false)}>
        Kembali
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          {schema.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-gray-700">{field.label}</label>
              {field.type === 'text' && (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              )}
              {field.type === 'textarea' && (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              )}
              {field.type === 'image' && (
                <div className="flex items-center">
                  <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                    Choose File
                    <input
                      type="file"
                      name={field.name}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="ml-2">
                    {formData[field.name]?.name || 'No file selected'}
                  </span>
                </div>
              )}
              {field.type === 'array' && (
                <>
                  {formData[field.name]?.map((item, index) => (
                    <div key={index} className="mt-2 py-3 flex items-center">
                      <input
                        type="text"
                        name={`${field.name}[${index}]`}
                        value={item || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.name]: formData[field.name].map((i, idx) =>
                              idx === index ? e.target.value : i
                            ),
                          })
                        }
                        className="mr-4 block w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-teal-500 text-white px-4 py-2 rounded mt-2"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        [field.name]: [...formData[field.name], ''],
                      })
                    }
                  >
                    Add {field.label}
                  </button>
                </>
              )}
            </div>
          ))}
          <div className="mt-4 flex justify-around">
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      )}

      <CustomModal isOpen={errorModalOpen} onRequestClose={() => setErrorModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p>There was an issue processing your request. Please try again.</p>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setErrorModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default EditComponent;
