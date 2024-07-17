import React, { useEffect, useState } from 'react';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import Form_SKTMBPJS from './Form/Form-SKTM-BPJS';
import Form_SKTM_Sekolah from './Form/Form-SKTM-Sekolah';
import Alur from './Alur';
import Form_Pengantar from './Form/Form-Pengantar';

const Layout = () => {
  const [active, setActive] = useState(null);
  const [dropdownMenu, setdropdownMenu] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const items = [
    { id: 'alur', label: 'Alur Pengajuan Form' },
    { id: 'pelayanan', label: 'Pilih Jenis Pelayanan' },
  ];

  const services = [
    { id: 'SKTM BPJS', label: 'SKTM BPJS' },
    { id: 'SKTM Sekolah', label: 'SKTM Sekolah' },
    { id: 'Pengantar Kecamatan', label: 'Pengantar Kecamatan' },
  ];

  const handleClick = (id) => {
    setActive(id);
    if (id === 'pelayanan') {
      setDropdownOpen(!dropdownOpen);
    } else {
      setDropdownOpen(false);
      setdropdownMenu('');
    }
  };

  const handleServiceChange = (serviceId) => {
    setdropdownMenu(serviceId);
    setDropdownOpen(false);
  };

  useEffect(() => {
    setdropdownMenu('');
  }, []);

  return (
    <div className='flex flex-col items-center gap-3 md:gap-8 xl:px-[200px]'>
      <div className='flex flex-row gap-3 font-[Poppins]'>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`relative flex items-center text-[8px] md:text-[20px] font-semibold px-4 md:px-8 py-4 rounded-md cursor-pointer ${
              active === item.id
                ? 'bg-white text-teal-700 duration-300 ease-in-out'
                : 'bg-teal-700 md:bg-opacity-60 md:hover:bg-opacity-100 duration-300 ease-in md:hover:text-white text-white'
            }`}
          >
            {item.label}
            {item.id === 'pelayanan' && (
              <>
                {dropdownOpen ? (
                  <IconChevronUp className='inline ml-3 h-4 w-4 md:h-6 md:w-6 border border-white rounded-full' />
                ) : (
                  <IconChevronDown className='inline ml-3 border h-4 w-4 md:h-6 md:w-6 border-white rounded-full' />
                )}
              </>
            )}
            {item.id === 'pelayanan' && active === 'pelayanan' && (
              <div
                className={`absolute top-full left-0 w-full mt-2 bg-white rounded-md shadow-lg z-10  ${
                  dropdownOpen ? '' : 'hidden'
                }`}
              >
                <ul>
                  {services.map((service) => (
                    <li
                      key={service.id}
                      onClick={() => handleServiceChange(service.id)}
                      className='px-8 py-3 rounded-md cursor-pointer hover:bg-gray-200 md:text-[16px] font-normal'
                    >
                      {service.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='w-full h-full md:rounded-sm flex justify-center'>
        {active === 'alur' && <Alur />}
        {active === 'pelayanan' && dropdownMenu && (
          <div className='w-full md:rounded-md lg:rounded-2xl px-5 md:px-20 xl:px-[100px] min-h-[654px] xl:w-[1040px] bg-white md:pb-20 shadow-lg'>
            {dropdownMenu === 'SKTM BPJS' && <Form_SKTMBPJS />}
            {dropdownMenu === 'SKTM Sekolah' && <Form_SKTM_Sekolah />}
            {dropdownMenu === 'Pengantar Kecamatan' && <Form_Pengantar />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
