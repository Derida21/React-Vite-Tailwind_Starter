import React, { useState } from 'react';
import bg from '../../../assets/img/bg.png';
import {
  IconBuildingBank,
  IconChevronsLeft,
  IconClipboard,
  IconCoins,
  IconFileText,
  IconHeart,
  IconHome,
} from '@tabler/icons-react';
import Logo from '../../components/home_component/Logo';
import Home from '../../components/archive-component/archive-home/home';
import Perencanaan from '../../components/archive-component/archive-perencanaan/perencanaan';
import Keuangan from '../../components/archive-component/archive-keuangan/keuangan';
import Pemerintahan from '../../components/archive-component/archive-pemerintahan/pemerintahan';

const EArsip = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  const handleIconClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const list = [
    { id: 1, text: 'Home', icon: <IconHome /> },
    { id: 2, text: 'Perencanaan', icon: <IconFileText /> },
    { id: 3, text: 'Keuangan', icon: <IconCoins /> },
    { id: 4, text: 'Pemerintahan', icon: <IconBuildingBank /> },
    { id: 5, text: 'Kesejahteraan', icon: <IconHeart /> },
    { id: 6, text: 'Pelayanan', icon: <IconClipboard /> },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home />;
      case 'Perencanaan':
        return <Perencanaan />;
      case 'Keuangan':
        return <Keuangan />;
      case 'Pemerintahan':
        return <Pemerintahan />;
      case 'Kesejahteraan':
        return <KesejahteraanPage />;
      case 'Pelayanan':
        return <PelayananPage />;
      default:
        return <Home />;
    }
  };

  return (
    <section className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <div className='absolute lg:static'>
        <div
          className={`h-screen flex flex-col bg-teal-500 relative transition-all ease-in-out duration-300 ${
            isCollapsed ? 'w-[18px]' : ' w-[288px]'
          }`}
        >
          <div
            onClick={handleIconClick}
            className='z-10 absolute p-1 flex items-center justify-center border-2 bg-white top-[154px] right-0 translate-x-1/2 border-teal-500 rounded-full cursor-pointer'
          >
            <IconChevronsLeft
              className={`stroke-teal-500 w-4 h-4 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </div>
          <div
            className={`flex items-center justify-start px-8 ${
              isCollapsed ? 'w-0 overflow-hidden' : 'w-full trantition '
            } `}
          >
            <h1
              className={`font-[Poppins] font-semibold text-white text-[32px] border-b border-white ${
                isCollapsed
                  ? 'w-0 overflow-hidden'
                  : ' w-full  ease-out duration-1000 p-[60px]'
              }`}
            >
              eArsip
            </h1>
          </div>
          <ul
            className={`flex flex-col gap-3 pl-8 py-10 ${
              isCollapsed ? 'w-0 overflow-hidden' : ''
            }`}
          >
            {list.map((item) => (
              <li
                key={item.id}
                className={`flex gap-4 py-4 pl-8 cursor-pointer ${
                  isCollapsed ? 'w-0 overflow-hidden' : ''
                } ${
                  currentPage === item.text
                    ? 'text-teal-500 bg-slate-50 rounded-l-full '
                    : 'text-white hover:bg-teal-700 hover:rounded-l-full'
                }`}
                onClick={() => setCurrentPage(item.text)}
                onChange={handleActive}
              >
                <span>{item.icon}</span>
                <h1
                  className={`font-[Poppins] text-[18px] ${
                    isCollapsed ? 'w-0 overflow-hidden' : ''
                  }`}
                >
                  {item.text}
                </h1>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Main content */}
      <div className='p-5 w-full bg-slate-50 h-screen'>
        <div className='flex flex-col gap-5 h-full '>
          <div
            className='flex items-center justify-center min-h-[200px] rounded-xl'
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              rotate: 90,
            }}
          >
            <Logo
              className='flex gap-2 items-end'
              text='Kampung Eka Sapta'
              addres='Kec. Talisayan Kab. Berau Kalimantan Timur'
            />
          </div>
          <div className='flex flex-col gap-5 h-full overflow-hidden'>
            {renderPage()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EArsip;
