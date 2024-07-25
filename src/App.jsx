import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import AdminDashboard from './pages/admin-dashboard/adminDashboard';
import LoginPage from './pages/Login';
import RequireAuth from './context/requireAuth';
import Home from './pages/Home';
import About from './pages/Profil/Tentang_Kami';
import Sejarah from './pages/Profil/Sejarah';
import VisiMisi from './pages/Profil/Visi_misi';
import GeografisDesa from './pages/Profil/Geografi_Desa';
import Popup from './components/home_component/Pop-up';
import Struktur from './pages/Pemerintahan/Struktur_Organisasi';
import ScrollToTop from './scrooltop';
import PerangkatDesa from './pages/Pemerintahan/Perangkat_Desa';
import LembagaDesa from './pages/Pemerintahan/Lembaga_Desa';
import Pelayanan from './pages/Pelayanan/Pelayanan';
import BeritaDesa from './pages/Informasi Publik/Berita_Desa';
import DetailBerita from './components/home_component/Section/Informasi Publik/Berita/Detail_Berita';
import AgendaKegiatan from './pages/Informasi Publik/Agenda_Kegiatan';
import StatistikPenduduk from './pages/Profil/Demografi_Desa/Statistik_Penduduk';
import DetailLembaga from './components/home_component/Section/Pemerintahan/Lembaga_Desa/Detail_Lembaga';
import Layout from './Layout';

import React from 'react';
import Produk from './pages/Produk/Produk';
import DetailKegiatan from './components/home_component/Section/Informasi Publik/Agenda_Kegiatan/Detail_Agenda';
import APBK from './pages/Transparansi/APBK';
import APBK_FIX from './pages/Transparansi/APBK-fix';
import DetailProduk from './components/home_component/Section/Produk/Detail-Produk';
import Galeri_Kampung from './pages/Informasi Publik/Galeri_Kampung';
import DataPenduduk from './pages/Profil/Demografi_Desa/Data_Penduduk';
import Pembangunan from './pages/Transparansi/Pembangunan';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Popup />
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path='/admin-dashboard/*' element={<AdminDashboard />} />
          </Route>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Home />} />
          {/* Profil */}
          <Route path='/profil/tentang-kami' element={<About />} />
          <Route path='/profil/sejarah-kampung' element={<Sejarah />} />
          <Route path='/profil/visi-misi' element={<VisiMisi />} />
          <Route
            path='/profil/demografi-kampung/statistik-penduduk'
            element={<StatistikPenduduk />}
          />
          <Route
            path='/profil/demografi-kampung/data-penduduk'
            element={<DataPenduduk />}
          />
          <Route path='/profil/geografi-kampung' element={<GeografisDesa />} />
          {/* Pemerintahan */}
          <Route
            path='/pemerintahan/struktur-organisasi'
            element={<Struktur />}
          />
          <Route
            path='/pemerintahan/perangkat-kampung'
            element={<PerangkatDesa />}
          />
          <Route
            path='/pemerintahan/lembaga-kampung'
            element={<LembagaDesa />}
          />
          <Route
            path='/pemerintahan/lembaga-kampung/:uuid'
            element={<DetailLembaga />}
          />
          {/* Informasi Publik */}
          <Route
            path='/informasi-publik/agenda-kegiatan'
            element={<AgendaKegiatan />}
          />
          <Route
            path='/informasi-publik/agenda-kegiatan/:slug'
            element={<DetailKegiatan />}
          />
          <Route
            path='/informasi-publik/berita-kampung'
            element={<BeritaDesa />}
          />
          <Route
            path='/informasi-publik/berita-kampung/:slug'
            element={<DetailBerita />}
          />
          <Route
            path='/informasi-publik/galeri-kampung'
            element={<Galeri_Kampung />}
          />
          {/* Transparansi */}
          <Route path='/transparansi/apbk' element={<APBK />} />
          <Route path='/transparansi/apbk-terealisasi' element={<APBK_FIX />} />
          <Route
            path='/transparansi/pembangunan-kampung'
            element={<Pembangunan />}
          />

          {/* Pelayanan */}
          <Route path='/pelayanan' element={<Pelayanan />} />
          <Route path='*' element={<Navigate to='/home' replace />} />
          {/* Produk */}
          <Route path='/produk' element={<Produk />} />
          <Route path='/produk/:slug' element={<DetailProduk />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
