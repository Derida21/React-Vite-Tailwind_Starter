import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';

const EditComponent = ({ slug, setModalType, fetchData }) => {
  const [formData, setFormData] = useState({ title: '', foto: '' });
  const { axiosInstance } = useAppContext();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchDetail = async () => {
        const response = await axiosInstance.get(`/apbk/${slug}`);
        setFormData(response.data.data);
      };
      fetchDetail();
    }
  }, [slug, axiosInstance]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    if (file) {
      data.append('foto', file);
    } else {
      data.append('foto', formData.foto);
    }

    if (slug) {
      await axiosInstance.post(`/apbk/${slug}`, data);
    } else {
      await axiosInstance.post('/apbk', data);
    }
    setModalType(null);
    fetchData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Foto</label>
        <input
          type="file"
          name="foto"
          onChange={handleFileChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {formData.foto && !file && (
          <img src={formData.foto} alt="Current" className="mt-2 h-20 w-20 object-cover" />
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => setModalType(null)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded-md"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default EditComponent;
