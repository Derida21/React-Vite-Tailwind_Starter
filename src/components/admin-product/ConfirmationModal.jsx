import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Confirmation Modal"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Confirmation</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Hapus
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
