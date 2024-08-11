import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';

const EditComponent = ({ slug, setEditMode, fetchData }) => {
  const { axiosInstance } = useAppContext();
  const [formData, setFormData] = useState({
    title: '',
    foto: null, // Use null for file input
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (slug) {
      fetchApbkDetails(slug);
    }
  }, [slug]);

  const fetchApbkDetails = async (slug) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/realisasi-apbk/${slug}`);
      if (response.data.success) {
        setFormData(response.data.data || {});
        setPreview(response.data.data.foto || '');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    if (formData.foto) {
      data.append('foto', formData.foto);
    }

    try {
      let response;
      if (slug) {
        response = await axiosInstance.put(`/realisasi-apbk/${slug}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axiosInstance.post('/realisasi-pbk', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      if (response.data.success) {
        setSuccess('Post saved successfully!');
        fetchData(); // Refresh the list after saving
        setEditMode(false);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-6 bg-white">
            <h2 className="text-2xl font-bold mb-4">
              {slug ? 'Edit Post' : 'Add New Post'}
            </h2>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Photo</label>
                <input
                  type="file"
                  name="foto"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-40 h-40 object-cover rounded"
                  />
                )}
              </div>
              {/* Add other form fields if necessary */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                {slug ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditComponent;
