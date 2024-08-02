import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';
import Editor from '../ck-editor/ck-editor.jsx';

const ProfilKampung = () => {
  const [formData, setFormData] = useState({
    logo: null, // Changed to null for file handling
    nama: '',
    alamat: '',
    peta: '',
    no_hp: '',
    email: '',
    fb: '',
    ig: '',
    yt: '',
    struktur_organisasi: '',
  });
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { axiosInstance } = useAppContext();

  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo: file,
    });
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      logo: null,
    }));
    setPreview('');
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/profil`);
      const data = response.data.data;

      setPreview(data.logo);
      setFormData({
        logo: data.logo,
        nama: data.nama,
        alamat: data.alamat,
        peta: data.peta,
        no_hp: data.no_hp,
        email: data.email,
        ig: data.sosial_media.ig,
        fb: data.sosial_media.fb,
        yt: data.sosial_media.yt,
        struktur_organisasi: data.struktur_organisasi,
      });
    } catch (error) {
      toast.error('Error fetching detail');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditorChange = (data) => {
    setFormData((prevState) => ({ ...prevState, struktur_organisasi: data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('nama', formData.nama);
      form.append('email', formData.email);
      form.append('alamat', formData.alamat);
      form.append('peta', formData.peta);
      form.append('no_hp', formData.no_hp);
      form.append('fb', formData.fb);
      form.append('ig', formData.ig);
      form.append('yt', formData.yt);
      form.append('struktur_organisasi', formData.struktur_organisasi);

      if (formData.logo && typeof formData.logo !== 'string') {
        form.append('logo', formData.logo);
      }
      let data = {
        nama: formData.nama,
        email: formData.email,
        alamat: formData.alamat,
        peta: formData.peta,
      };
      console.log('FormData:', data);

      await axiosInstance.put('/profil', form);

      navigate('/admin-dashboard/profil');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 font-[Poppins]">
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-6 text-center">Profil Desa</h2>
        <div className="max-w-md mx-auto mt-10">
          <div className="mb-4">
            <input
              type="file"
              name="logo"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>

          {preview && (
            <div className="relative mb-4">
              <div className="relative w-64 h-64 mx-auto border-4 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  type="button"
                  className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          <div>
            <label className="block text-gray-700">Nama Desa</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Maps Desa</label>
            <input
              type="text"
              name="peta"
              value={formData.peta}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Alamat Desa</label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
        </div>
        <h2 className="mt-6 text-ls font-bold mb-6">Kontak desa</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-gray-700">Email Desa</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Telepon Desa</label>
            <input
              type="text"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
        </div>
        <h2 className="mt-6 text-ls font-bold mb-6">Sosial media</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="block text-gray-700">Instagram</label>
            <input
              type="text"
              name="ig"
              value={formData.ig}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Facebook</label>
            <input
              type="text"
              name="fb"
              value={formData.fb}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">YouTube</label>
            <input
              type="text"
              name="yt"
              value={formData.yt}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
        </div>


        <button
          type="submit"
          className="mt-10 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-700 transition duration-200"
        >
          Update Profil
        </button>
      </form>
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-teal-500 border-solid border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default ProfilKampung;
