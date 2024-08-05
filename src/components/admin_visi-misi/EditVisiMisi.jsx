import React from 'react';
import Editor from '../ck-editor/ck-editor.jsx';

const EditVisiMisi = ({ formData, handleEditorChange, handleSubmit, loading, onBack }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center">Edit Visi Misi</h2>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
      >
        Kembali
      </button>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-gray-700">Visi</label>
          <Editor data={formData.visi} onChange={(data) => handleEditorChange('visi', data)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700">Misi</label>
          <Editor data={formData.misi} onChange={(data) => handleEditorChange('misi', data)} />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-700 transition duration-200"
      >
        {loading ? 'Updating...' : 'Update Visi Misi'}
      </button>
    </form>
  );
};

export default EditVisiMisi;
