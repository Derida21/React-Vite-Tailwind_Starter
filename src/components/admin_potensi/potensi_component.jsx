import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import useAppContext from '../../context/useAppContext';
import Modal from 'react-modal';
import ModalPotensi from './modal_potensi';
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
    <div className="p-10 min-w-[220px] xl:w-full grow shrink basis-0 rounded-xl drop-shadow justify-start items-start gap-4 bg-white flex">
      <div className="grow shrink basis-0 bg-white rounded-xl flex-col justify-start items-start inline-flex" onClick={openModal}>
        <div className="w-full h-auto px-6 pt-6 pb-4 bg-white rounded-xl shadow flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch justify-start items-center gap-3 inline-flex">
            <div className="grow shrink basis-0 text-zinc-900 text-base font-medium leading-normal">{title}</div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-4 flex">
            <h3 className="text-xl font-semibold">{data.judul}</h3>
            <p className="text-gray-700 mb-4">{data.tanggal}</p>
            <p className="text-gray-700 whitespace-pre-line"><div dangerouslySetInnerHTML={{ __html: data.isi }} /></p>
          </div>
        </div>
        <div className="w-full px-6 py-4 justify-between items-center gap-4 inline-flex">
          <div className="grow shrink basis-0 text-orange-600 text-sm font-semibold leading-tight">Author: {data.author.nama}</div>
          <FaChevronRight className="text-orange-600" />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Modal"
      >
        <div style={customStyles.editorContainer}>
          <CKEditor
            editor={ClassicEditor}
            data={editedContent}
            onChange={handleEditorChange}
          />
        </div>
        <button onClick={saveChanges} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">Save</button>
        <button onClick={closeModal} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200">Close</button>
      </Modal>
    </div>
  );
};

export default DashboardPost;
