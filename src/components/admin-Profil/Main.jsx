import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';
import Editor from '../ck-editor/ck-editor.jsx';

const ProfilKampung = () => {
  const [formData, setFormData] = useState({
    logo: null,
    nama: '',
    alamat: '',
    peta: '',
    no_hp: '',
    email: '',
    fb: '',
    ig: '',
    yt: '',
    struktur_organisasi: null,
    visi: '',
    misi: '',
  });
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { axiosInstance } = useAppContext();
  const [preview, setPreview] = useState('');
  const [strukturPreview, setStrukturPreview] = useState('');

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/profil`);
      const data = response.data.data;

      setPreview(data.logo);
      setStrukturPreview(data.struktur_organisasi);
      setFormData({
        logo: data.logo,
        nama: data.nama,
        alamat: data.alamat,
        peta: data.peta,
        no_hp: data.no_hp,
        email: data.email,
        fb: data.sosial_media.fb || '',
        ig: data.sosial_media.ig || '',
        yt: data.sosial_media.yt || '',
        struktur_organisasi: data.struktur_organisasi || null,
        visi: data.visi_misi.visi || '',
        misi: data.visi_misi.misi || '',
      });
    } catch (error) {
      toast.error('Error fetching detail');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo: file,
    });
    setPreview(URL.createObjectURL(file));
  };

  const handleStrukturImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      struktur_organisasi: file,
    });
    setStrukturPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      logo: null,
    }));
    setPreview('');
  };

  const handleRemoveStrukturImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      struktur_organisasi: null,
    }));
    setStrukturPreview('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('_method', 'put');
      form.append('nama', formData.nama);
      form.append('email', formData.email);
      form.append('alamat', formData.alamat);
      form.append('peta', formData.peta);
      form.append('no_hp', formData.no_hp);
      form.append('sosial_media[fb]', formData.fb);
      form.append('sosial_media[ig]', formData.ig);
      form.append('sosial_media[yt]', formData.yt);
      form.append('visi_misi[visi]', formData.visi);
      form.append('visi_misi[misi]', formData.misi);

      if (formData.struktur_organisasi && typeof formData.struktur_organisasi !== 'string') {
        form.append('struktur_organisasi', formData.struktur_organisasi);
      }

      if (formData.logo && typeof formData.logo !== 'string') {
        form.append('logo', formData.logo);
      }

      await axiosInstance.post('/profil', form);

      navigate('/admin-dashboard/profil');
      toast.success('Profil updated successfully');
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
        <h2 className="text-xl font-bold mb-6 text-center">Profil Kampung</h2>
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
            <label className="block text-gray-700">Nama Kampung</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Maps Kampung</label>
            <input
              type="text"
              name="peta"
              value={formData.peta}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Alamat Kampung</label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
        </div>
        <h2 className="mt-6 text-ls font-bold mb-6">Kontak Kampung</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-gray-700">Email Kampung</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Telepon Kampung</label>
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

        <h2 className="mt-6 text-ls font-bold mb-6">Struktur Organisasi</h2>
        <div className="max-w-md mx-auto mt-10">
          <div className="mb-4">
            <input
              type="file"
              name="struktur_organisasi"
              onChange={handleStrukturImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>

          {strukturPreview && (
            <div className="relative mb-4">
              <div className="relative w-64 h-64 mx-auto border-4 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={strukturPreview}
                  alt="Struktur Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleRemoveStrukturImage}
                  type="button"
                  className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
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
