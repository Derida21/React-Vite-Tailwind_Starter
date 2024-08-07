import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import useAppContext from '../../context/useAppContext';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


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
    maxHeight: '80vh', // Adjust the maximum height of the modal
    overflow: 'hidden', // Hide overflow initially
  },
  editorContainer: {
    maxHeight: '60vh', // Set a maximum height for the editor container
    overflowY: 'auto', // Enable vertical scrolling
  },
};

Modal.setAppElement('#root');

const DashboardPost = ({ endpoint, title }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const { axiosInstance } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(endpoint);
        setData(response.data.data);
        setEditedContent(response.data.data.isi); // Initialize edited content
        setThumbnail(response.data.data.thumbnail); // Initialize thumbnail
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, axiosInstance]);

  const openModal = () => {
    navigate('post')
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditedContent(data);
  };

  const saveChanges = async () => {
    try {
      await axiosInstance.post(`${endpoint}`, { ...data, isi: editedContent, thumbnail });
      closeModal();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Failed to load data.</p>
      </div>
    );
  }

  return (


    <div className="p-10">

      <ToastContainer position="bottom-left" />
      <div className="container mx-auto" onClick={openModal}>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="px-6 py-6 bg-white ">
            <div className="pb-4 mb-4 border-b-2 border-gray-200">
              <div className="flex items-center justify-between min-h-10">
                <div>
                  <h1 className="text-lg font-semibold text-secondary">{title}</h1>
                </div>

              </div>
            </div>
          </div>
          <div className="overflow-x-auto px-6 pb-6">
            <div className="self-stretch flex-col justify-start items-start gap-4 flex">
              <p className="text-gray-700 whitespace-pre-line"><div dangerouslySetInnerHTML={{ __html: data.isi }} /></p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPost;
