import React, { useState, useEffect } from 'react';
import useAppContext from '../../../context/useAppContext';
import AlertComponent from '../../utils/AlertComponent';
import Editor from '../../ck-editor/ck-editor.jsx';
import { toast } from 'react-toastify';

const EditComponent = ({ slug, setEditMode, fetchData }) => {
  const { axiosInstance } = useAppContext();
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    thumbnail: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [preview, setPreview] = useState('');
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchActivityDetails(slug);
    }
  }, [slug]);

  const fetchActivityDetails = async (slug) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/kegiatan/${slug}`);
      setEditorKey(prevKey => prevKey + 1);
      if (response.data.success) {
        setFormData({
          judul: response.data.data.judul,
          isi: response.data.data.isi,
          thumbnail: response.data.data.thumbnail,
        });
        setPreview(response.data.data.thumbnail || '');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail' && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (data) => {
    setFormData((prev) => ({ ...prev, isi: data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('judul', formData.judul);
    data.append('isi', formData.isi);
    if (formData.thumbnail) {
      data.append('thumbnail', formData.thumbnail);
    }

    try {
      let response;
      if (slug) {
        response = await axiosInstance.put(`/kegiatan/${slug}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axiosInstance.post('/kegiatan', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      if (response.data.success) {
        setSuccess('Activity saved successfully!');
        fetchData();
        setTimeout(() => setEditMode(false), 1000); // Close edit mode after a short delay
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-6 bg-white">
            <h2 className="text-2xl font-bold mb-4">
              {slug ? 'Edit Kegiatan' : 'Tambahkan Kegiatan baru'}
            </h2>
            {loading && <div>Loading...</div>}
            {error && <AlertComponent type="red" title="Error" message={error} onClose={() => setError(null)} />}
            {success && <AlertComponent type="green" title="Success" message={success} onClose={() => setSuccess(null)} />}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <Editor
                key={editorKey}
                  data={formData.isi}
                  onChange={handleEditorChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Thumbnail</label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-40 h-40 object-cover rounded"
                  />
                )}
              </div>

              <div className="justify-between">

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    {slug ? 'Update' : 'Save'}
                </button>
                <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                >
                    Kembali
                </button>

              </div>
           
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditComponent;
