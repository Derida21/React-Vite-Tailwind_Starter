import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import Modal from './Modal'; // Reusable Modal Component
import { useNavigate } from 'react-router-dom';

const CrudPage = ({ endpoint, schema, title }) => {
  const { axiosInstance } = useAppContext();
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axiosInstance.get(endpoint);
    setDataList(response.data.data);
    setFilteredData(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = dataList.filter((item) =>
      schema.some((field) => item[field.name]?.toLowerCase().includes(e.target.value.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const handleDelete = async () => {
    await axiosInstance.delete(`${endpoint}/${selectedId}`);
    setModalOpen(false);
    fetchData();
  };

  const handleSelect = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAddNew = () => {
    navigate(`/edit/new`);
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
                    <h1 className="text-lg font-semibold text-secondary">{title}</h1>
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
                    placeholder={`Search by ${schema.map(s => s.label).join(', ')}`}
                    className="block mt-11 p-2 text-sm placeholder-gray-400 border-2 border-gray-300 rounded-md shadow-sm appearance-none focus:border-primary focus:outline-none focus:ring-primary w-1/4"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto px-6 pb-6">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    {schema.map((field) => (
                      <th key={field.name} className="py-2 px-4 border-b text-left">{field.label}</th>
                    ))}
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((data) => (
                      <tr key={data.id}>
                        {schema.map((field) => (
                          <td key={field.name} className="py-2 px-4 border-b">{data[field.name]}</td>
                        ))}
                        <td className="py-2 px-4 border-b">
                          <div className="flex">
                            <button
                              className="pr-2 text-teal-500 font-body"
                              onClick={() => handleSelect(data.id)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                              </svg>
                            </button>
                            <button
                              className="text-red-500 font-body"
                              onClick={() => {
                                setSelectedId(data.id);
                                setModalOpen(true);
                              }}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={schema.length + 1} className="py-2 px-4 text-center">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && <Modal handleDelete={handleDelete} setModalOpen={setModalOpen} />}
    </div>
  );
};

export default CrudPage;
