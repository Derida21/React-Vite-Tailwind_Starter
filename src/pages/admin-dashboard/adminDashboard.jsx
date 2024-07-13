import React, { useContext, useEffect, useState } from 'react';
import { useParams, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../../components/admin-navbar/navbar';
import Sidebar from '../../components/admin-sidebar/sidebar';
import Main from '../../components/admin-main/main';
import { Context } from '../../context/index';
import Marketing from '../../components/admin-marketing/marketing';
import { Data } from '../../dates/jummy';

import DataPenduduk from '../../components/admin-penduduk/DataPenduduk';
import LembagaCrud from '../../components/lmbg/LembagaCrud';
import PostMain from '../../components/admin-berita/PostMain';
import PostForm from '../../components/admin-berita/PostForm';
import PostDetail from '../../components/admin-berita/PostDetail';

import KegiatanPostMain from '../../components/admin-kegiatan/PostMain';
import KegiatanPostForm from '../../components/admin-kegiatan/PostForm';
import KegiatanPostDetail from '../../components/admin-kegiatan/PostDetail';

import PengembanganComponent from '../../components/admin-pengembangan/pengembangan_component';

import BelanjaComponent from '../../components/admin-belanja2/belanja_component';
import BelanjaDetail from '../../components/admin-belanja2/belanja_detail';

import ModalPotensi from '../../components/admin_potensi/modal_potensi';
import PotensiComponent from '../../components/admin_potensi/potensi_component';
import CrudComponent from '../../components/crudbasecomponent/crudcomponent';
import PelayananCrud from '../../components/admin-pelayanan/pelayanan_crud';


const AdminDashboard = () => {
    const { category } = useParams();
    let cat = Data.find((categ) => categ.url === parseInt(category));

    const { state, dispatch } = useContext(Context);
    const [size, setSize] = useState(1000);

    useEffect(() => {
        const handleResize = (e) => {
            setSize(e.currentTarget.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        size < 768 ? dispatch({ type: 'SET_TOGGLE_NAVBAR', payload: false }) : dispatch({ type: 'SET_TOGGLE_NAVBAR', payload: true });
    }, [size, dispatch]);

    return (
        <div className='bg-slate-50'>
            <div className=""><Navbar /></div>
            <div className="main max-w-[2300px] mt-[76px] flex flex-1 justify-between">
                <Sidebar />
                <div className={`main ${state.toggle ? (state.toggleNavbar ? 'md:ml-[310px]' : 'ml-0') : (state.toggleNavbar ? 'md:ml-[90px]' : 'ml-0')} overflow-auto w-full h-full z-10`}>
                    <Routes>
                        <Route path="main" element={<Main />} />
                        <Route path="marketing" element={<Marketing />} />
                        <Route path="berita/*" element={<PostRoutes />} />
                        <Route path="lmbg" element={<LembagaCrud />} />
                        {/* <Route path="pembangunan" element={<PengembanganComponent />} /> */}
                        <Route path="belanja/*" element={<BelanjaRoutes />} />
                        <Route path="potensi/*" element={<PotensiRoutes/>} />
                        <Route path="kegiatan/*" element={<KegiatanRoutes/>} />
                        {/* <Route path="belanja/*" element={<KegiatanRoutes/>} /> */}

                        <Route path="belanja" element={<CrudComponent endpoint="/belanja-desa"/>} />
                        <Route path="pembangunan" element={<CrudComponent endpoint="/pembangunan"/>} />

                        <Route path="pelayanan" element={<PelayananCrud />} /> 
                        <Route path="penduduk" element={<DataPenduduk path="/data-penduduk"/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};


const PotensiRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PotensiComponent/>} />
            <Route path=":slug" element={<ModalPotensi/>} />
        </Routes>
    );
};

const BelanjaRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<BelanjaComponent/>} />
            <Route path=":slug" element={<BelanjaDetail />} />
        </Routes>
    );
};


const KegiatanRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<KegiatanPostMain />} />
            <Route path="new" element={<KegiatanPostForm />} />
            <Route path=":slug" element={<KegiatanPostDetail />} />
            <Route path="edit/:slug" element={<KegiatanPostForm />} />
        </Routes>
    );
};



const PostRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PostMain />} />
            <Route path="new" element={<PostForm />} />
            <Route path=":slug" element={<PostDetail />} />
            <Route path="edit/:slug" element={<PostForm />} />
        </Routes>
    );
};

export default AdminDashboard;