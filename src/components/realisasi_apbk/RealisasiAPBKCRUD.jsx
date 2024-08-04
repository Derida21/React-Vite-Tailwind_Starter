import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import Modal from './Modal';
import EditComponent from './EditComponent';

const RealisasiAPBKCRUD = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit', 'create', 'delete'
  const { axiosInstance } = useAppContext();

  const fetchData = async () => {
    const response = await axiosInstance.get('/realisasi-apbk');
    setDataList(response.data.data.data);
    setFilteredData(response.data.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = dataList.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = async () => {
    await axiosInstance.delete(`/realisasi-apbk/${selectedSlug}`);
    setModalType(null);
    fetchData();
  };

  const handleSelect = (slug) => {
    setSelectedSlug(slug);
    setModalType('edit');
  };

  const handleAddNew = () => {
    setSelectedSlug(null);
    setModalType('create');
  };

  return (
    <div className="p-4">
      <div className="mb-4 mt-10">
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-6 bg-white">
              <div className="pb-4 mb-4 border-b-2 border-gray-200">
                <div className="flex items-center justify-between min-h-10">
                  <div>
                    <h1 className="text-lg font-semibold text-secondary">Realisasi APBK</h1>
                    <button
                      className="bg-teal-500 text-white px-4 py-2 mt-5 rounded-md"
                      onClick={handleAddNew}
                    >
                      Tambahkan Data
                    </button>
                  </div>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by title"
                    className="block mt-11 p-2 text-sm placeholder-gray-400 border-2 border-gray-300 rounded-md shadow-sm appearance-none focus:border-primary focus:outline-none focus:ring-primary w-1/4"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto px-6 pb-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Foto</th>
                    <th className="py-2 px-4 border-b text-left">Title</th>
                    <th className="py-2 px-4 border-b text-left">Slug</th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((data) => (
                      <tr key={data.slug}>
                        <td className="py-2 px-4 border-b">
                          <img src={data.foto} alt={data.title} className="h-10 w-10" />
                        </td>
                        <td className="py-2 px-4 border-b">{data.title}</td>
                        <td className="py-2 px-4 border-b">{data.slug}</td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex space-x-2">
                            <button
                              className="pr-2 text-teal-500 font-body"
                              onClick={() => handleSelect(data.slug)}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                ></path>
                              </svg>
                            </button>
                            <button
                              className="text-red-500 font-body"
                              onClick={() => {
                                setSelectedSlug(data.slug);
                                setModalType('delete');
                              }}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-center">
                        Memuat . . . 
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {modalType === 'edit' && (
        <Modal onClose={() => setModalType(null)}>
          <EditComponent
            slug={selectedSlug}
            setModalType={setModalType}
            fetchData={fetchData}
          />
        </Modal>
      )}

      {modalType === 'create' && (
        <Modal onClose={() => setModalType(null)}>
          <EditComponent
            slug={null}
            setModalType={setModalType}
            fetchData={fetchData}
          />
        </Modal>
      )}

      {modalType === 'delete' && (
        <Modal onClose={() => setModalType(null)}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setModalType(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RealisasiAPBKCRUD;
