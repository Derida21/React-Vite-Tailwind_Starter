import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Set app element for accessibility
Modal.setAppElement('#root');

const GenericModal = ({
  data,
  onClose,
  onSave,
  fields,
  title,
  submitButtonText = 'Save',
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
      );
    }
  }, [data, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      contentLabel={title}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1050, // Ensure modal content is above other content
          background: 'white',
          borderRadius: '8px',
          padding: '20px',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1040, // Ensure overlay is above other content but below the modal
        },
      }}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-sm font-semibold mb-2">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
              />
            ) : field.type === 'file' ? (
              <input
                type="file"
                name={field.name}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.files[0] })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            )}
          </div>
        ))}
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
            {submitButtonText}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GenericModal;
