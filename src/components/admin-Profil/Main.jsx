// src/components/ProfilKampung.js

import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import useAppContext from '../../context/useAppContext';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    width: '90%',
    padding: '20px',
  },
};

Modal.setAppElement('#root');

const ProfilKampung = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetail();
  });

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(endpoint);
      const data = response.data.data;
      console.log(data);
      setFormData({
        thumbnail: data.thumbnail,
        judul: data.judul,
        isi: data.isi,
      });
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching detail:', error);
      toast.error('Error fetching detail');
    } finally {
      setLoading(false);
    }
  };


  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  // if (!data) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <p className="text-red-500">Failed to load data.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500">Profil Kampung.</p>
    </div>
  );
};

export default ProfilKampung;
