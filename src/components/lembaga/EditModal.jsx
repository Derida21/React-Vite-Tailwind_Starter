import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';

const PostForm = () => {
  const [formData, setFormData] = useState({
    thumbnail: null,
    judul: '',
    slug: '',
    isi: '',
    author: '',
    type: ''
  });
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { axiosInstance } = useAppContext();

  useEffect(() => {
    if (slug) {
      fetchDetail();
    }
  }, [slug]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/post/${slug}`);
      const data = response.data.data;
      setFormData({
        thumbnail: data.thumbnail,
        judul: data.judul,
        slug: data.slug,
        isi: data.isi,
        author: data.author,
        type: data.type
      });
    } catch (error) {
      console.error('Error fetching detail:', error);
      toast.error('Error fetching detail');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, thumbnail: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('thumbnail', formData.thumbnail);
      form.append('judul', formData.judul);
      form.append('slug', formData.slug);
      form.append('isi', formData.isi);
      form.append('author', formData.author);
      form.append('type', formData.type);

      if (slug) {
        await axiosInstance.post(`/post/${slug}`, form);
      } else {
        await axiosInstance.post('/post', form);
      }

      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
      >
        Back
      </button>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-6 text-center">{slug ? 'Edit Post' : 'Create Post'}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-gray-700">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Judul</label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700">Isi</label>
            <textarea
              name="isi"
              value={formData.isi}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
        </div>
        <button type="submit" className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
          {slug ? 'Update Post' : 'Create Post'}
        </button>
      </form>
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
