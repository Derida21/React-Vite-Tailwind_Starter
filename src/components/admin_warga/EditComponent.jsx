import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import AlertComponent from '../utils/AlertComponent';

const EditComponent = ({ uuid, setEditMode, fetchData }) => {
  const { axiosInstance } = useAppContext();
  const [formData, setFormData] = useState({
    foto: '',
    kepala_keluarga: '',
    anggota_keluarga: [],
    link_maps: '',
  });
  const [logoFile, setLogoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [logoFileName, setLogoFileName] = useState('Belum ada Data');
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState({ type: '', title: '', message: '', duration: 3000 }); // State for AlertComponent

  useEffect(() => {
    const fetchDetail = async () => {
      if (uuid) {
        try {
          const response = await axiosInstance.get(`/warga/${uuid}`);
          const wargaData = response.data.data;
          setFormData({
            ...wargaData,
            anggota_keluarga: wargaData.anggota_keluarga ? [...wargaData.anggota_keluarga] : [],
          });
          if (wargaData.foto) {
            setLogoFileName(wargaData.foto.split('/').pop());
            setImagePreview(wargaData.foto);
          } else {
            setLogoFileName('Belum ada Data');
          }
        } catch (error) {
          console.error('Error fetching warga detail:', error);
          setAlertData({ type: 'red', title: 'Error', message: 'Failed to fetch Warga details.', duration: 3000 });
        }
      }
    };

    fetchDetail();
  }, [uuid, axiosInstance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAnggotaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAnggota = formData.anggota_keluarga.map((anggota, i) =>
      i === index ? { ...anggota, [name]: value } : anggota
    );
    setFormData({ ...formData, anggota_keluarga: updatedAnggota });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setLogoFile(files[0]);
    setLogoFileName(files[0] ? files[0].name : 'Belum ada Data');
    setImagePreview(URL.createObjectURL(files[0]));
  };

  const addAnggota = () => {
    setFormData({
      ...formData,
      anggota_keluarga: [...formData.anggota_keluarga, { nama: '', status: '' }],
    });
  };

  const removeAnggota = (index) => {
    const updatedAnggota = formData.anggota_keluarga.filter((_, i) => i !== index);
    setFormData({ ...formData, anggota_keluarga: updatedAnggota });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = new FormData();
    updatedData.append('kepala_keluarga', formData.kepala_keluarga);
    updatedData.append('link_maps', formData.link_maps);

    formData.anggota_keluarga.forEach((p, index) => {
      updatedData.append(`anggota_keluarga[${index}][nama]`, p.nama);
      updatedData.append(`anggota_keluarga[${index}][status]`, p.status);
    });

    if (logoFile) {
      updatedData.append('foto', logoFile);
    }

    try {
      if (uuid) {
        updatedData.append('_method', 'put');
        await axiosInstance.post(`/warga/${uuid}`, updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setAlertData({ type: 'green', title: 'Success', message: 'Update successful!', duration: 3000 });
      } else {
        await axiosInstance.post('/warga', updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setAlertData({ type: 'green', title: 'Success', message: 'Creation successful!', duration: 3000 });
      }

      setEditMode(false);
      fetchData();
    } catch (error) {
      console.error('Error updating warga:', error);
      setAlertData({ type: 'red', title: 'Error', message: 'There was an error processing your request.', duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <AlertComponent {...alertData} /> {/* AlertComponent instance */}
      <button className="bg-gray-500 text-white px-4 py-2 rounded mb-4" onClick={() => setEditMode(false)}>
        Kembali
      </button>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-4xl">
        <div className="mb-4">
          <label className="block text-gray-700">Photo</label>
          <div className="flex items-center">
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              Choose File
              <input
                type="file"
                name="foto"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="ml-2">{logoFileName}</span>
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Kepala Keluarga</label>
          <input
            type="text"
            name="kepala_keluarga"
            value={formData.kepala_keluarga}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Anggota Keluarga</label>
          {formData.anggota_keluarga.map((anggota, index) => (
            <div key={index} className="mt-2 py-3 flex items-center">
              <input
                type="text"
                name="nama"
                value={anggota.nama}
                onChange={(e) => handleAnggotaChange(index, e)}
                placeholder="Nama"
                className="mr-4 block w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="status"
                value={anggota.status}
                onChange={(e) => handleAnggotaChange(index, e)}
                placeholder="Status"
                className="mr-4 block w-full border border-gray-300 rounded-md p-2"
              />
              <button
                type="button"
                className="z-50 flex items-center justify-center w-6 h-6 p-0.5 text-red-700 bg-red-500 border-2 border-red-500 rounded-full shadow-sm bg-opacity-20 hover:bg-white"
                style={{ position: "relative", zIndex: 50, pointerEvents: "auto" }}
                onClick={() => removeAnggota(index)}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-teal-500 text-white px-4 py-2 rounded mt-2"
            onClick={addAnggota}
          >
            Tambahkan Anggota Keluarga
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Link Maps</label>
          <input
            type="text"
            name="link_maps"
            value={formData.link_maps}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-4 flex justify-around">
          <button
            type="submit"
            className={`bg-teal-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComponent;
