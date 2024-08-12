import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';

const PostMain = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { axiosInstance } = useAppContext();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/berita');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    setLoading(true);

    console.log(slug)
    try {
      await axiosInstance.delete(`/berita/${slug}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Error deleting data');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (slug) => {
    navigate(`${slug}`);
  };

  const handleCreatePost = () => {
    navigate(`new`);
  };

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };


  const stripHtml = (html) => {
    let text = html.replace(/<\/?[^>]+(>|$)/g, "");
    // Ganti entitas HTML
    text = text.replace(/&nbsp;/g, " ");
    return text;
  };

  const truncateString = (str, num) => {
    // Jika panjang string lebih pendek atau sama dengan batas, kembalikan string apa adanya
    if (str.length <= num) {
      return str;
    }
    // Potong string dan tambahkan elipsis
    return str.slice(0, num) + '...';
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Berita</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Tambahkan Berita
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-solid border-t-transparent rounded-full"></div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-6 border-2 border-gray-200 rounded shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
            {item.thumbnail && (
              <img src={item.thumbnail} alt={item.judul} className="mb-4 rounded" />
            )}
            <div>
              <h2 className="text-lg font-bold mb-2">{item.judul}</h2>
              <p className="text-gray-600 mb-2">{item.slug}</p>
              <p className="text-gray-800 mb-2">{truncateString(stripHtml(item.isi), 120)}</p>
              <p className="text-gray-500 mb-4">Author: {item.author.nama}</p>
            </div>
            <div className="flex justify-between mt-auto">
              <button
                onClick={() => handleViewDetail(item.slug)}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200 text-sm"
              >
                Lihat
              </button>
              <button
                onClick={() => handleDelete(item.slug)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200 text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostMain;
