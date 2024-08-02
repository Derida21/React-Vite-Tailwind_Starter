import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';
import Editor from '../ck-editor/ck-editor.jsx';

const TentangKamiPostForm = ({ endpoint, title }) => {
  const [formData, setFormData] = useState({
    thumbnail: null,
    judul: '',
    isi: '',
  });
  const [loading, setLoading] = useState(false);
  const [editorKey, setEditorKey] = useState(0); // Tambahkan state untuk key
  const navigate = useNavigate();
  const { axiosInstance } = useAppContext();

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(endpoint);
        setFormData({
          thumbnail: null,
          judul: data.data.judul,
          isi: data.data.isi,
        });
        setEditorKey(prevKey => prevKey + 1); // Ubah key untuk mereload CKEditor
      } catch (error) {
        console.error('Error fetching detail:', error);
        toast.error('Error fetching detail');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [endpoint, axiosInstance]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEditorChange = (data) => {
    setFormData(prev => ({ ...prev, isi: data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      form.append('_method', 'put');

      await axiosInstance.post(endpoint, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/admin-dashboard/tentang-kami');
      toast.success('Data berhasil diperbarui');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
      >
        Back
      </button>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-6 text-center">{title}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="md:col-span-2">
            <label className="block text-gray-700">Isi</label>
            <Editor key={editorKey} data={formData.isi} onChange={handleEditorChange} />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Update Tentang Kami
        </button>
      </form>
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default TentangKamiPostForm;
