import React, { useState, useEffect } from 'react';
import useAppContext from '../../context/useAppContext';
import { toast } from 'react-toastify';
import EditVisiMisi from './EditVisiMisi'; // Import the EditVisiMisi component

const AdminVisiMisi = () => {
  const [visiMisi, setVisiMisi] = useState({
    visi: '',
    misi: '',
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { axiosInstance } = useAppContext();

  useEffect(() => {
    fetchVisiMisi();
  }, []);

  const fetchVisiMisi = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/profil');
      const data = response.data.data;

      setVisiMisi({
        visi: data.visi_misi.visi || '',
        misi: data.visi_misi.misi || '',
      });
    } catch (error) {
      toast.error('Error fetching Visi Misi');
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (field, data) => {
    setVisiMisi((prev) => ({ ...prev, [field]: data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('_method', 'put');
      form.append('visi_misi[visi]', visiMisi.visi);
      form.append('visi_misi[misi]', visiMisi.misi);

      await axiosInstance.post('/profil', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setEditMode(false);
      toast.success('Visi Misi updated successfully');
      fetchVisiMisi();
    } catch (error) {
      toast.error('Error updating Visi Misi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 font-[Poppins]">
      {editMode ? (
        <EditVisiMisi
          formData={visiMisi}
          handleEditorChange={handleEditorChange}
          handleSubmit={handleSubmit}
          loading={loading}
          onBack={() => setEditMode(false)}
        />
      ) : (
        <div
          className="mb-8 bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
          onClick={() => setEditMode(true)}
        >
              <div className=" mx-auto text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Visi</h3>
            <p className="text-3xl text-gray-700 mb-6">{visiMisi.visi}</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Misi</h3>
            <p className="text-3xl text-gray-700 mb-6">{visiMisi.misi}</p>
        
          </div>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-teal-500 border-solid border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default AdminVisiMisi;
