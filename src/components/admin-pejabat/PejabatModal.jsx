import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
};

const PejabatModal = ({ pejabat, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    foto: '',
    nama: '',
    jabatan: '',
    alamat: '',
    tugas: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pejabat) {
      setFormData({
        foto: pejabat.foto || '',
        nama: pejabat.nama || '',
        jabatan: pejabat.jabatan || '',
        alamat: pejabat.alamat || '',
        tugas: pejabat.tugas || '',
      });
      setImagePreview(pejabat.foto);
    }
  }, [pejabat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, foto: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Pejabat Modal"
      style={customStyles}
    >
      <h2 className="text-xl font-bold mb-4">
        {pejabat ? 'Edit Pejabat' : 'Add Pejabat'}
      </h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Photo"
          type="file"
          name="foto"
          onChange={handleFileChange}
          preview={imagePreview}
        />
        <InputField
          label="Nama"
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
        />
        <InputField
          label="Jabatan"
          type="text"
          name="jabatan"
          value={formData.jabatan}
          onChange={handleChange}
        />
        <InputField
          label="Alamat"
          type="text"
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
        />
        <TextAreaField
          label="Tugas"
          name="tugas"
          value={formData.tugas}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={onClose}
            text="Cancel"
            loading={loading}
            className="bg-gray-500 text-white mr-2"
          />
          <Button
            type="submit"
            text="Save"
            loading={loading}
            className="bg-blue-500 text-white"
          />
        </div>
      </form>
    </Modal>
  );
};

const InputField = ({ label, type, name, value, onChange, preview }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
    />
    {preview && <img src={preview} alt="Preview" className="w-20 h-20 mt-2" />}
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded"
    ></textarea>
  </div>
);

const Button = ({ type, onClick, text, loading, className }) => (
  <button
    type={type}
    onClick={onClick}
    className={`${className} px-4 py-2 rounded flex items-center`}
    disabled={loading}
  >
    {loading && (
      <svg
        className="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    )}
    {text}
  </button>
);

export default PejabatModal;
