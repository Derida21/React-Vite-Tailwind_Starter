import { IconMenu2, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import { Link, useLocation } from 'react-router-dom';

const Navmenu = () => {
  const options1 = [
    { label: 'Tentang Kami', href: '/profil/tentang-kami', subOptions: null },
    {
      label: 'Sejarah Kampung',
      href: '/profil/sejarah-kampung',
      subOptions: null,
    },
    { label: 'Visi Misi', href: '/profil/visi-misi', subOptions: null },
    {
      label: 'Demografi Kampung',
      href: null,
      subOptions: [
        {
          label: 'Data Penduduk',
          href: '/profil/demografi-kampung/data-penduduk',
        },
        {
          label: 'Statistik Penduduk',
          href: '/profil/demografi-kampung/statistik-penduduk',
        },
      ],
    },
    {
      label: 'Geografi Kampung',
      href: '/profil/geografi-kampung',
      subOptions: null,
    },
  ];
  const options2 = [
    { label: 'Struktur Organisasi', href: '/pemerintahan/struktur-organisasi' },
    { label: 'Perangkat Kampung', href: '/pemerintahan/perangkat-kampung' },
    { label: 'Lembaga Kampung', href: '/pemerintahan/lembaga-kampung' },
  ];
  const options3 = [
    { label: 'Agenda Kegiatan', href: '/informasi-publik/agenda-kegiatan' },
    { label: 'Berita Kampung', href: '/informasi-publik/berita-kampung' },
    { label: 'Galeri', href: '/informasi-publik/galeri' },
    { label: 'Produk Hukum', href: '/informasi-publik/produk-hukum' },
    { label: 'Download', href: '/informasi-publik/download' },
  ];
  const options4 = [
    { label: 'APBK', href: '#' },
    { label: 'Perancangan Pembangunan', href: '#' },
    { label: 'Pembangunan Kampung', href: '#' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className=''>
      <button
        onClick={handleToggle}
        className='lg:hidden focus:outline-none flex items-center justify-center w-4 h-4 md:w-8 md:h-8'
      >
        {isOpen ? (
          <IconX className='stroke-1' />
        ) : (
          <IconMenu2 className='stroke-1' />
        )}
      </button>
      {/* Mobile & Tablet */}
      <div
        className={`${
          isOpen ? 'flex-col' : 'hidden'
        } absolute flex flex-col lg:hidden w-1/2 right-0 top-10 md:top-[100px] h-screen bg-white shadow-lg rounded-md pt-5 md:max-lg:pl-8 px-5`}
      >
        <Link
          to='/home'
          className='flex w-full items-center py-3 md:pr-[40px] lg:px-3 xl:px-5 font-[Poppins] font-semibold
        text-[10px] md:text-[12px] lg:text-[12px] text-gray-700 hover:text-teal-700 text-nowrap'
        >
          Home
        </Link>
        <Dropdown label='Profil' options={options1} />
        <Dropdown label='Pemerintahan' options={options2} />
        <Dropdown label='Informasi Publik' options={options3} />
        <Dropdown label='Transparansi' options={options4} />
        <a
          href='/pelayanan'
          className='flex w-full items-center py-3 md:pr-[40px] lg:px-3 xl:px-5 font-[Poppins] font-semibold
        text-[10px] md:text-[12px] lg:text-[12px] text-gray-700 hover:text-teal-700 text-nowrap'
        >
          Pelayanan
        </a>
        <a
          href='/produk'
          className='flex w-full items-center py-3 md:pr-[40px] font-[Poppins] font-semibold
        text-[10px] md:text-[12px] lg:text-[12px] text-gray-700 hover:text-teal-700 text-nowrap'
        >
          Produk
        </a>
      </div>
      {/* Dekstop */}
      <div className='hidden lg:flex'>
        <Link
          to='/home'
          className='flex items-center lg:px-3 xl:px-5 font-[Poppins] font-semibold lg:text-[12px] text-gray-700 hover:text-teal-700 text-nowrap'
        >
          Home
        </Link>
        <Dropdown label='Profil' options={options1} />
        <Dropdown label='Pemerintahan' options={options2} />
        <Dropdown label='Informasi Publik' options={options3} />
        <Dropdown label='Transparansi' options={options4} />
        <a
          href='/pelayanan'
          className='flex items-center lg:px-3 xl:px-5 font-[Poppins] font-semibold lg:text-[12px] text-gray-700 hover:text-teal-700 text-nowrap'
        >
          Pelayanan
        </a>
        <a
          href='/produk'
          className='flex items-center lg:px-3 xl:px-5 font-[Poppins] font-semibold lg:text-[12px] text-gray-700 hover:text-teal-700 text-nowrap'
        >
          Produk
        </a>
      </div>
    </div>
  );
};

export default Navmenu;
