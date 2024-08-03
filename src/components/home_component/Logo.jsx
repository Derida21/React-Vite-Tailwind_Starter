import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import logo from '../../../assets/img/logo-berau3.png';
import axios from 'axios';

const Logo = (props) => {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/profil');
      setData(response.data.data);
    } catch {}
  };

  useEffect(() => {
    getData();
  });
  const {
    className = 'flex gap-1 md:justify-between items-end',
    titleclassName = 'flex flex-col',
    text,
    addres,
    textclassName = 'text-gray-700 font-bold text-[12px] md:text-[20px] font-[Poppins] text-nowrap',
    addresclassName = 'text-gray-700 font-medium text-[5px] md:text-[8px] font-[Poppins] tracking-[.35px] md:tracking-[.75px] text-nowrap',
    logoclassName = 'h-[24px] md:h-[40px] ',
    href,
  } = props;
  return (
    <Link to={`/Home`} className={className}>
      <div className='h-full flex items-end justify-end'>
        {data && <img className={logoclassName} src={data.logo} alt='' />}
      </div>
      <div className={titleclassName}>
        {data && (
          <span className={textclassName}>{data.nama || 'Nama Kampung'}</span>
        )}
        <span className={addresclassName}>{addres}</span>
      </div>
    </Link>
  );
};

export default Logo;
