import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import AlertComponent from '../utils/AlertComponent';

const EditComponent = ({ id, setEditMode, fetchData }) => {
  const { axiosInstance } = useAppContext();
  const [formData, setFormData] = useState({
    nama: '',
    jabatan: '',
    foto: null, // Use null for file input
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (id) {
      fetchPejabatDetails(id);
    }
  }, [id]);

  const fetchPejabatDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/pejabat/${id}`);
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
    data.append('nama', formData.nama);
    data.append('jabatan', formData.jabatan);
    if (formData.foto) {
      data.append('foto', formData.foto);
    }

    try {
      let response;
      if (id) {
        response = await axiosInstance.put(`/pejabat/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axiosInstance.post('/pejabat', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      if (response.data.success) {
        setSuccess('Pejabat saved successfully!');
        fetchData(); // Refresh the list after saving
        setTimeout(() => setEditMode(false), 1000);
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
              {id ? 'Edit Pejabat' : 'Tambahkan Data Baru'}
            </h2>
            {loading && <div>Loading...</div>}
            {error && <AlertComponent type="red" title="Error" message={error} onClose={() => setError(null)}/> }
            {success && <AlertComponent type="green" title="Success" message={success} onClose={() => setSuccess(null)} />}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Posisi / Jawabatan </label>
                <input
                  type="text"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Foto</label>
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
                {id ? 'Update' : 'Simpan'}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Kembali
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditComponent;
