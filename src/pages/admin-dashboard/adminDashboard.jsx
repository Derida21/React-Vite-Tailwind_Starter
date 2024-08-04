import React, { useContext, useEffect, useState } from 'react';
import { useParams, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../../components/admin-navbar/navbar';
import Sidebar from '../../components/admin-sidebar/sidebar';
import Main from '../../components/admin-main/main';
import { Context } from '../../context/index';
import Marketing from '../../components/admin-marketing/marketing';
import { Data } from '../../dates/jummy';

import DataPenduduk from '../../components/admin-penduduk/DataPenduduk';
import LembagaCRUD from '../../components/admin-lembaga/LembagaCrud';
import PostMain from '../../components/admin-berita/PostMain';
import PostForm from '../../components/admin-berita/PostForm';
import PostDetail from '../../components/admin-berita/PostDetail';

import KegiatanPostMain from '../../components/admin-kegiatan/PostMain';
import KegiatanPostForm from '../../components/admin-kegiatan/PostForm';
import KegiatanPostDetail from '../../components/admin-kegiatan/PostDetail';

import PengembanganComponent from '../../components/admin-pengembangan/pengembangan_component';

import BelanjaComponent from '../../components/admin-belanja2/belanja_component';
import BelanjaDetail from '../../components/admin-belanja2/belanja_detail';

import CrudComponent from '../../components/crudbasecomponent/crudcomponent';
import PelayananCrud from '../../components/admin-pelayanan/pelayanan_crud';
import ProductList from '../../components/admin-product/ProductList'; // Import the ProductList component

import WargaList from '../../components/admin_warga/WargaList';
import LembagaList from '../../components/admin-lembaga-2/LembagaList';
import DashboardPost from '../../components/admin_potensi/potensi_component';
import PejabatList from '../../components/admin-pejabat/PejabatList';

import TentangKamiPostForm from '../../components/admin_potensi/post_form';
import ProfilKampung from '../../components/admin-Profil/Main';


import AdminVisiMisi from '../../components/admin_visi-misi/admin_visi_misi';

import RealisasiAPBKCRUD from '../../components/realisasi_apbk/RealisasiAPBKCRUD';
import APBKCRUD from '../../components/admin-apbk/APBKCRUD';
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
        size < 768
            ? dispatch({ type: 'SET_TOGGLE_NAVBAR', payload: false })
            : dispatch({ type: 'SET_TOGGLE_NAVBAR', payload: true });
    }, [size, dispatch]);

    return (
        <div className='bg-slate-50'>
            <div className=''>
                <Navbar />
            </div>
            <div className='main max-w-[2300px] mt-[75px] flex justify-between'>
                <Sidebar />
                <div
                    className={`main ${state.toggle
                        ? state.toggleNavbar
                            ? 'md:ml-[300px]'
                            : 'ml-0'
                        : state.toggleNavbar
                            ? 'md:ml-[90px]'
                            : 'ml-0'
                        } overflow-auto w-full h-full z-10 font-[Poppins]`}
                >
                    <Routes>
                        <Route path='main' element={<Main />} />
                        <Route path='marketing' element={<Marketing />} />
                        <Route path='berita/*' element={<PostRoutes />} />
                        <Route path="lembaga" element={<LembagaCRUD />} />
                        {/* <Route path='lembaga' element={<LembagaList />} /> */}
                        <Route path='belanja/*' element={<BelanjaRoutes />} />
                        <Route path='kegiatan/*' element={<KegiatanRoutes />} />
                        <Route path='produk' element={<ProductList />} />
                        <Route path='keluarga' element={<WargaList />} />
                        <Route path='pejabat' element={<PejabatList />} />
                        <Route path='profil' element={<ProfilKampung />} />
                        <Route path='realisasi-apbk' element = {<RealisasiAPBKCRUD/>}/>
                        <Route path='apbk' element = {<APBKCRUD/>}/>
                        <Route path='visi-misi' element = {<AdminVisiMisi/>}/>
                        {/* <Route
                            path='belanja'
                            element={<CrudComponent endpoint='/belanja-desa' />}
                        /> */}
                        <Route
                            path='pembangunan'
                            element={<CrudComponent endpoint='pembangunan' />}
                        />
                        <Route path='pelayanan' element={<PelayananCrud />} />
                        <Route
                            path='penduduk'
                            element={<DataPenduduk path='/data-penduduk' />}
                        />

                        <Route
                            path='tentang-kampung'
                            element={
                                <DashboardPost endpoint='/tentang-kami' title='Tentang Kami' />
                            }
                        />
                        <Route path='tentang-kampung/post' element={
                            <TentangKamiPostForm endpoint='/tentang-kami' title='Tentang Kami' />
                        } />

                        <Route
                            path='sejarah-kampung'
                            element={
                                <DashboardPost endpoint='/sejarah' title='Sejarah kampung' />
                            }
                        />
                        <Route path='sejarah-kampung/post' element={
                            <TentangKamiPostForm endpoint='/sejarah' title='Tentang Kami' />
                        } />

                        <Route
                            path='geografis-kampung'
                            element={
                                <DashboardPost endpoint='/geografis' title='Geografis kampung' />
                            }
                        />
                        <Route path='geografis-kampung/post' element={
                            <TentangKamiPostForm endpoint='/geografis' title='Geografis kampung' />
                        } />

                        <Route
                            path='potensi-kampung'
                            element={
                                <DashboardPost
                                    endpoint='/potensi-desa'
                                    title='Potensi Kampung'
                                />
                            }
                        />
                 

                        <Route path='potensi-kampung/post' element={
                            <TentangKamiPostForm endpoint='/potensi-desa' title='Potensi Kampung' />
                        } />
                    </Routes>
                </div>
            </div>
        </div>
    );
};
const ProdukRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path=':slug' element={<ProductDetail />} />
        </Routes>
    );
};

const BelanjaRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<BelanjaComponent />} />
            <Route path=':slug' element={<BelanjaDetail />} />
        </Routes>
    );
};

const KegiatanRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<KegiatanPostMain />} />
            <Route path='new' element={<KegiatanPostForm />} />
            <Route path=':slug' element={<KegiatanPostDetail />} />
            <Route path='edit/:slug' element={<KegiatanPostForm />} />
        </Routes>
    );
};

const PostRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<PostMain />} />
            <Route path='new' element={<PostForm />} />
            <Route path=':slug' element={<PostDetail />} />
            <Route path='edit/:slug' element={<PostForm />} />
        </Routes>
    );
};

export default AdminDashboard;
