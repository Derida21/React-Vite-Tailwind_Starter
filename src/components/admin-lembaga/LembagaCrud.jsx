import React, { useState, useEffect } from 'react';
import  useAppContext  from '../../context/useAppContext';
import Modal from './Modal';
import EditComponent from './EditComponent';

const LembagaCRUD = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUuid, setSelectedUuid] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { axiosInstance } = useAppContext();

  const fetchData = async () => {
    const response = await axiosInstance.get('/lembaga');
    setDataList(response.data.data);
    setFilteredData(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = dataList.filter((item) =>
      item.nama.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = async () => {
    await axiosInstance.delete(`/lembaga/${selectedUuid}`);
    setModalOpen(false);
    fetchData();
  };

  const handleSelect = (uuid) => {
    setSelectedUuid(uuid);
    setEditMode(true);
  };

  const handleAddNew = () => {
    setSelectedUuid(null);
    setEditMode(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lembaga</h1>
      {!editMode && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by name"
              className="p-2 border rounded w-1/2"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddNew}
            >
              Tambahkan Data
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nama</th>
                <th className="py-2 px-4 border-b">Singkatan</th>
                <th className="py-2 px-4 border-b">Deskripsi</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((data) => (
                  <tr key={data.uuid}>
                    <td className="py-2 px-4 border-b">{data.nama}</td>
                    <td className="py-2 px-4 border-b">{data.singkatan}</td>
                    <td className="py-2 px-4 border-b">{data.deskripsi}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleSelect(data.uuid)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => {
                            setSelectedUuid(data.uuid);
                            setModalOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-2 px-4 text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {editMode && (
        <EditComponent
          uuid={selectedUuid}
          setEditMode={setEditMode}
          fetchData={fetchData}
        />
      )}

      {modalOpen && <Modal handleDelete={handleDelete} setModalOpen={setModalOpen} />}
    </div>
  );
};

export default LembagaCRUD;
