import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ProductModal from './ProductModal';
import useAppContext from '../../context/useAppContext';

Modal.setAppElement('#root');

const ProductList = () => {
  const { axiosInstance } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/produk');
      if (response.data.success) {
        setProducts(response.data.data.data);
      } else {
        setError(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const openModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentProduct(null);
    setIsModalOpen(false);
  };

  const handleSave = async (product) => {
    setSaving(true);
    const formData = new FormData();
    formData.append('foto', product.foto);
    formData.append('nama_produk', product.nama_produk);
    formData.append('slug', product.slug);
    formData.append('deskripsi', product.deskripsi);
    formData.append('no_wa', product.no_wa);

    try {
      if (currentProduct) {
        const response = await axiosInstance.put(`/produk/${currentProduct.slug}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (!response.data.success) {
          setError(response.data.message);
        }
      } else {
        const response = await axiosInstance.post('/produk', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (!response.data.success) {
          setError(response.data.message);
        }
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsConfirmingDelete(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/produk/${productToDelete.slug}`);
      if (!response.data.success) {
        setError(response.data.message);
      } else {
        fetchProducts();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsConfirmingDelete(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
    setProductToDelete(null);
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 5000); // Hide the error after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [error]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5 relative">
      <h1 className="text-3xl font-bold mb-5">Product List</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => openModal()}
      >
        Add Product
      </button>
      {products.length === 0 ? (
        <div className="text-center">No products available</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.slug}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.foto} alt={product.nama_produk} className="w-20 h-20 object-cover rounded"/>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.nama_produk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.deskripsi.substring(0, 50)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.no_wa}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && (
        <ProductModal
          product={currentProduct}
          onClose={closeModal}
          onSave={handleSave}
          saving={saving}
        />
      )}
      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 p-4 rounded-lg shadow-lg w-11/12 max-w-md z-50">
          <p className="text-sm">{error}</p>
        </div>
      )}
      {isConfirmingDelete && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
