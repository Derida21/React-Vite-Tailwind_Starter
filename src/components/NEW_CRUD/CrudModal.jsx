import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

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

const CrudModal = ({ schema, item, onClose, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      // Initialize form data based on schema for adding new items
      const initialFormData = {};
      schema.forEach((field) => {
        if (field.type === 'array') {
          initialFormData[field.name] = [];
        } else {
          initialFormData[field.name] = '';
        }
      });
      setFormData(initialFormData);
    }
  }, [item, schema]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const handleAddArrayItem = (fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: [...formData[fieldName], {}],
    });
  };

  const handleArrayItemChange = (fieldName, index, subField, value) => {
    const newArray = [...formData[fieldName]];
    newArray[index] = { ...newArray[index], [subField]: value };
    setFormData({
      ...formData,
      [fieldName]: newArray,
    });
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
      contentLabel="Crud Modal"
      style={customStyles}
    >
      <h2 className="text-xl font-bold mb-4">
        {item ? `Edit ${schema.title}` : `Add ${schema.title}`}
      </h2>
      <form onSubmit={handleSubmit}>
        {schema.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-semibold mb-2">{field.label}</label>
            {field.type === 'text' && (
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            )}
            {field.type === 'image' && (
              <input
                type="file"
                name={field.name}
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            )}
            {field.type === 'array' && (
              <>
                {formData[field.name]?.map((item, index) => (
                  <div key={index} className="mb-2">
                    {Object.keys(item).map((subField) => (
                      <input
                        key={subField}
                        type="text"
                        placeholder={subField}
                        value={item[subField] || ''}
                        onChange={(e) =>
                          handleArrayItemChange(field.name, index, subField, e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                      />
                    ))}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem(field.name)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Add {field.label}
                </button>
              </>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CrudModal;
