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

const WargaModal = ({ warga, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    foto: '',
    kepala_keluarga: '',
    anggota_keluarga: [],
    link_maps: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (warga) {
      setFormData({
        foto: warga.foto || '',
        kepala_keluarga: warga.kepala_keluarga || '',
        anggota_keluarga: warga.anggota_keluarga ? [...warga.anggota_keluarga] : [], // Handle null and ensure it's an array
        link_maps: warga.link_maps || '',
      });
      setImagePreview(warga.foto || null);
    }
  }, [warga]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      foto: file,
    });
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
      contentLabel="Warga Modal"
      style={customStyles}
    >
      <h2 className="text-xl font-bold mb-4">
        {warga ? 'Edit Warga' : 'Add Warga'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Photo</label>
          <input
            type="file"
            name="foto"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-20 h-20 mt-2" />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Kepala Keluarga</label>
          <input
            type="text"
            name="kepala_keluarga"
            value={formData.kepala_keluarga}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Anggota Keluarga</label>
          {formData.anggota_keluarga && formData.anggota_keluarga.length > 0 ? (
            formData.anggota_keluarga.map((anggota, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  name={`anggota_${index}_nama`}
                  value={anggota.nama}
                  onChange={(e) => {
                    const newAnggota = [...formData.anggota_keluarga];
                    newAnggota[index].nama = e.target.value;
                    setFormData({ ...formData, anggota_keluarga: newAnggota });
                  }}
                  placeholder="Nama"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name={`anggota_${index}_status`}
                  value={anggota.status}
                  onChange={(e) => {
                    const newAnggota = [...formData.anggota_keluarga];
                    newAnggota[index].status = e.target.value;
                    setFormData({ ...formData, anggota_keluarga: newAnggota });
                  }}
                  placeholder="Status"
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                />
              </div>
            ))
          ) : (
            <p>Belum ada Anggota Keluarga</p>
          )}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                anggota_keluarga: [...formData.anggota_keluarga, { nama: '', status: '' }],
              })
            }
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Tambahkan Anggota Keluarga
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Link Maps</label>
          <input
            type="text"
            name="link_maps"
            value={formData.link_maps}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
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
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default WargaModal;
