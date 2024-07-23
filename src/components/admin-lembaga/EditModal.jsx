// EditModal.js
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const EditModal = ({ lembaga, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    uuid: lembaga?.uuid || '',
    nama: lembaga?.nama || '',
    singkatan: lembaga?.singkatan || '',
    logo: lembaga?.logo || null ,
    // logoFile: null,
  });
  const [modalLoading, setModalLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          // logoFile: file,
          logo: reader.result,
        }));
        localStorage.setItem('logoURL', reader.result); // Save base64 string to local storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, setModalLoading);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">{lembaga ? 'Edit Lembaga' : 'Tambah Lembaga'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Singkatan</label>
          <input
            type="text"
            name="singkatan"
            value={formData.singkatan}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo</label>
          <input
            type="file"
            name="logoFile"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formData.logo && (
            <img src={formData.logo} alt="Preview" className="mt-2 w-16 h-16 object-cover" />
          )}
        </div>
        <div className="text-right">
          <button type="button" onClick={onClose} className="mr-4 bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={modalLoading}>
            {modalLoading ? <ClipLoader color="#fff" size={20} /> : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
