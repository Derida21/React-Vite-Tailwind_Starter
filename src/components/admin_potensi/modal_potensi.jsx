// import React, { useState, useEffect } from 'react';
// import useAppContext from '../../context/useAppContext';
// import LoadingIndicator from '../loading_indicator/loading_indicator.jsx';

// const ModalPotensi = ({ post, closeModal }) => {
//   const { axiosInstance } = useAppContext();
//   const [loading, setLoading] = useState(true);
//   const [postData, setPostData] = useState(null);

//   useEffect(() => {
//     if (post) {
//       setPostData(post);
//       setLoading(false);
//     }
//   }, [post]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//       setPostData({ ...postData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setLoading(true);
//       try {
//         await axiosInstance.post(`/potensi/${postData.slug}`, postData);
//       setLoading(false);
//       closeModal();
//     } catch (error) {
//       console.error("There was an error updating the data!", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {loading ? (
//         <LoadingIndicator />
//       ) : (
//         <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-md">
//           <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
//           <div className="mb-4">
//             <label className="block text-gray-700">Title</label>
//             <input
//               type="text"
//               name="judul"
//               value={postData.judul}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Content</label>
//             <textarea
//               style={{ height: '200px' }}
//               name="isi"
//               value={postData.isi}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Author</label>
//             <input
//               type="text"
//               name="author"
//               value={postData.author.nama}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//               disabled
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ModalPotensi;
