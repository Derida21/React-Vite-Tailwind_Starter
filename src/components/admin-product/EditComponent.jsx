import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import AlertComponent from '../utils/AlertComponent';

const EditComponent = ({ slug, setEditMode, fetchData }) => {
  const { axiosInstance } = useAppContext();
  const [formData, setFormData] = useState({
    nama_produk: '',
    deskripsi: '',
    no_wa: '',
    foto: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (slug) {
      fetchProdukDetails(slug);
    }
  }, [slug]);

  const fetchProdukDetails = async (slug) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/produk/${slug}`);
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
    data.append('nama_produk', formData.nama_produk);
    data.append('deskripsi', formData.deskripsi);
    data.append('no_wa', formData.no_wa);
    if (formData.foto) {
      data.append('foto', formData.foto);
    }

    try {
      let response;
      if (slug) {
        response = await axiosInstance.put(`/produk/${slug}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axiosInstance.post('/produk', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      if (response.data.success) {
        setSuccess('Produk saved successfully!');
        fetchData();
        setTimeout(() => setEditMode(false), 1000); // Close edit mode after a short delay
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
              {slug ? 'Edit Produk' : 'Add New Produk'}
            </h2>
            {loading && <div>Loading...</div>}
            {error && <AlertComponent type="red" title="Error" message={error} onClose={() => setError(null)} />}
            {success && <AlertComponent type="green" title="Success" message={success} onClose={() => setSuccess(null)} />}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="nama_produk"
                  value={formData.nama_produk}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">WhatsApp Number</label>
                <input
                  type="text"
                  name="no_wa"
                  value={formData.no_wa}
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
