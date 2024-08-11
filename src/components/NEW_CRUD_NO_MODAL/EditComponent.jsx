import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import { useParams, useNavigate } from 'react-router-dom';

const EditComponent = ({ endpoint, schema, fetchData }) => {
  const { axiosInstance } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (id !== 'new') {
        const response = await axiosInstance.get(`${endpoint}/${id}`);
        setFormData(response.data.data);
      } else {
        const initialData = {};
        schema.forEach(field => {
          initialData[field.name] = field.type === 'array' ? [] : '';
        });
        setFormData(initialData);
      }
    };

    fetchDetail();
  }, [id, endpoint, axiosInstance, schema]);

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

  const handleArrayChange = (index, field, value) => {
    const updatedArray = [...formData[field.name]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [field.name]: updatedArray,
    });
  };

  const handleAddArrayItem = (field) => {
    setFormData({
      ...formData,
      [field.name]: [...formData[field.name], ''],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          formDataToSend.append(`${key}[${index}]`, item);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      if (id === 'new') {
        await axiosInstance.post(endpoint, formDataToSend);
      } else {
        await axiosInstance.post(`${endpoint}/${id}?_method=PUT`, formDataToSend);
      }
      fetchData();
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button className="bg-gray-500 text-white px-4 py-2 rounded mb-4" onClick={() => navigate(-1)}>
        Kembali
      </button>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {schema.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-gray-700">{field.label}</label>
            {field.type === 'text' && (
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            )}
            {field.type === 'textarea' && (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            )}
            {field.type === 'file' && (
              <input
                type="file"
                name={field.name}
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            )}
            {field.type === 'array' && (
              <div>
                {formData[field.name]?.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(index, field, e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => handleAddArrayItem(field)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add {field.label}
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="mt-4 flex justify-around">
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComponent;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import CrudPage from './components/CrudPage';
// import EditComponent from './components/EditComponent';

// function App() {
//   const schema = [
//     { name: 'nama', label: 'Nama', type: 'text' },
//     { name: 'singkatan', label: 'Singkatan', type: 'text' },
//     { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
//     { name: 'logo', label: 'Logo', type: 'file' },
//     { name: 'pengurus', label: 'Pengurus', type: 'array' },
//   ];

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={<CrudPage endpoint="/lembaga" schema={schema} title="Lembaga" />}
//         />
//         <Route
//           path="/edit/:id"
//           element={<EditComponent endpoint="/lembaga" schema={schema} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;