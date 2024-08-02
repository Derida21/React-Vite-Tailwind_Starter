import { useState } from 'react';

const Modal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    kode_arsip: '',
    file: null,
    nama_file: '',
    tanggal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className='fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className='text-xl mb-4'>Add New Data</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm'>Kode Arsip</label>
            <input
              type='text'
              name='kode_arsip'
              value={formData.kode_arsip}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm'>Nama File</label>
            <input
              type='text'
              name='nama_file'
              value={formData.nama_file}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm'>Tanggal</label>
            <input
              type='date'
              name='tanggal'
              value={formData.tanggal}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm'>File</label>
            <input
              type='file'
              name='file'
              onChange={handleFileChange}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='mr-2 px-4 py-2 bg-gray-300 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-teal-500 text-white rounded'
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
