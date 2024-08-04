import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';

const EditComponent = ({ uuid, setEditMode, fetchData }) => {
  const { axiosInstance } = useAppContext();
  const [formData, setFormData] = useState({
    nama: '',
    singkatan: '',
    deskripsi: '',
    dasar_hukum: '',
    visi_misi: { visi: '', misi: '' },
    pengurus: [{ jabatan: '', nama: '', pendidikan: '' }],
    struktur: null,
    logo: null,
  });
  const [logoFile, setLogoFile] = useState(null);
  const [strukturFile, setStrukturFile] = useState(null);
  const [logoFileName, setLogoFileName] = useState('Belum ada Data');
  const [strukturFileName, setStrukturFileName] = useState('Belum ada Data');

  useEffect(() => {
    const fetchDetail = async () => {
      if (uuid) {
        const response = await axiosInstance.get(`/lembaga/${uuid}`);
        const lembagaData = response.data.data;
        setFormData({
          ...lembagaData,
          visi_misi: lembagaData.visi_misi || { visi: '', misi: '' },
          pengurus: lembagaData.pengurus || [{ jabatan: '', nama: '', pendidikan: '' }],
        });
        setLogoFileName(lembagaData.logo ? lembagaData.logo.name : 'Belum ada Data');
        setStrukturFileName(lembagaData.struktur ? lembagaData.struktur.name : 'Belum ada Data');
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

  const handleVisiMisiChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      visi_misi: {
        ...formData.visi_misi,
        [name]: value,
      },
    });
  };

  const handlePengurusChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPengurus = formData.pengurus.map((pengurus, i) =>
      i === index ? { ...pengurus, [name]: value } : pengurus
    );
    setFormData({ ...formData, pengurus: updatedPengurus });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'logo') {
      setLogoFile(files[0]);
      setLogoFileName(files[0] ? files[0].name : 'Belum ada Data');
    } else if (name === 'struktur') {
      setStrukturFile(files[0]);
      setStrukturFileName(files[0] ? files[0].name : 'Belum ada Data');
    }
  };

  const addPengurus = () => {
    setFormData({
      ...formData,
      pengurus: [...formData.pengurus, { jabatan: '', nama: '', pendidikan: '' }],
    });
  };

  const removePengurus = (index) => {
    const updatedPengurus = formData.pengurus.filter((_, i) => i !== index);
    setFormData({ ...formData, pengurus: updatedPengurus });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append('nama', formData.nama);
    updatedData.append('singkatan', formData.singkatan);
    updatedData.append('deskripsi', formData.deskripsi);
    updatedData.append('dasar_hukum', formData.dasar_hukum);
    updatedData.append('visi_misi[visi]', formData.visi_misi.visi);
    updatedData.append('visi_misi[misi]', formData.visi_misi.misi);

    formData.pengurus.forEach((p, index) => {
      updatedData.append(`pengurus[${index}][jabatan]`, p.jabatan);
      updatedData.append(`pengurus[${index}][nama]`, p.nama);
      updatedData.append(`pengurus[${index}][pendidikan]`, p.pendidikan);
    });

    if (logoFile) {
      updatedData.append('logo', logoFile);
    }

    if (strukturFile) {
      updatedData.append('struktur', strukturFile);
    }

    if (uuid) {

      updatedData.append('_method', 'put');
      await axiosInstance.post(`/lembaga/${uuid}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      await axiosInstance.post('/lembaga', updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    setEditMode(false);
    fetchData();
  };

  return (
    <div className="p-4">
      <button className="bg-gray-500 text-white px-4 py-2 rounded mb-4" onClick={() => setEditMode(false)}>
        Kembali
      </button>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Logo</label>
          <div className="flex items-center">
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              Choose File
              <input
                type="file"
                name="logo"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="ml-2">{logoFileName}</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Singkatan</label>
          <input
            type="text"
            name="singkatan"
            value={formData.singkatan}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dasar Hukum</label>
          <textarea
            name="dasar_hukum"
            value={formData.dasar_hukum}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Visi</label>
          <input
            type="text"
            name="visi"
            value={formData.visi_misi.visi || ''}
            onChange={handleVisiMisiChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Misi</label>
          <textarea
            name="misi"
            value={formData.visi_misi.misi || ''}
            onChange={handleVisiMisiChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Struktur</label>
          <div className="flex items-center">
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              Choose File
              <input
                type="file"
                name="struktur"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="ml-2">{strukturFileName}</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pengurus</label>
          {formData.pengurus.map((pengurus, index) => (
            <div key={index} className="mt-2 py-3 flex items-center">
              <input
                type="text"
                name="jabatan"
                value={pengurus.jabatan}
                onChange={(e) => handlePengurusChange(index, e)}
                placeholder="Jabatan"
                className="mr-4 block w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="nama"
                value={pengurus.nama}
                onChange={(e) => handlePengurusChange(index, e)}
                placeholder="Nama"
                className="mr-4 block w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="pendidikan"
                value={pengurus.pendidikan}
                onChange={(e) => handlePengurusChange(index, e)}
                placeholder="Pendidikan"
                className="mr-4 block w-full border border-gray-300 rounded-md p-2"
              />
              {/* <button type="button"
                className="flex items-center justify-center w-6 h-6 p-0.5 text-red-700 bg-red-500 border-2 border-red-500 rounded-full shadow-sm bg-opacity-20 hover:bg-white"
                onClick={() => removePengurus(index)}
              >
              </button> */}
              <button
                type="button"
                className="flex items-center justify-center w-24  p-2 text-red-700 bg-red-500 border-2 border-red-500 rounded-full shadow-sm bg-opacity-20 hover:bg-white"
                onClick={() => removePengurus(index)}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>


            </div>
          ))}
          <div className="relative py-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 bg-white">
                <button type="button" className="flex items-center justify-center w-6 h-6 p-0.5 border-2 rounded-full shadow-sm border-primary text-primary bg-primary bg-opacity-20 hover:bg-white" onClick={addPengurus}>
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-around">
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComponent;
