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
          <Route path='/profil/sejarah-desa' element={<Sejarah />} />
          <Route path='/profil/visi-misi' element={<VisiMisi />} />
          <Route
            path='/profil/demografi-desa/statistik-penduduk'
            element={<StatistikPenduduk />}
          />
          <Route path='/profil/geografi-desa' element={<GeografisDesa />} />
          {/* Pemerintahan */}
          <Route
            path='/pemerintahan/struktur-organisasi'
            element={<Struktur />}
          />
          <Route
            path='/pemerintahan/perangkat-desa'
            element={<PerangkatDesa />}
          />
          <Route path='/pemerintahan/lembaga-desa' element={<LembagaDesa />} />
          <Route
            path='/pemerintahan/lembaga-desa/detail-lembaga/:slug'
            element={<DetailLembaga />}
          />
          {/* Informasi Publik */}
          <Route
            path='/informasi-publik/agenda-kegiatan'
            element={<AgendaKegiatan />}
          />
          <Route
            path='/informasi-publik/berita-desa'
            element={<BeritaDesa />}
          />
          <Route
            path='/informasi-publik/berita-desa/:slug'
            element={<DetailBerita />}
          />
          {/* Pelayanan */}
          <Route path='/pelayanan/pelayanan' element={<Pelayanan />} />
          <Route path='*' element={<Navigate to='/home' replace />} />
          {/* Produk */}
          <Route path='/produk' element={<Produk />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
