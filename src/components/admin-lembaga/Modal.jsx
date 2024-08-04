import React from 'react';

const Modal = ({ handleDelete, setModalOpen }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold">Confirm Delete</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-around">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
