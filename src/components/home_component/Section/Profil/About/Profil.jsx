import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profil = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://nurul-huda.org/api/profil');
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  return data ? (
    React.Children.map(children, (child) => {
      return React.cloneElement(child, { data });
    })
  ) : (
    <p>Loading...</p>
  );
};

const Logo = ({
  data,
  className = 'flex gap-1 md:justify-between items-end',
  titleclassName = 'flex flex-col',

  addres,
  textclassName = 'capitalize text-gray-700 font-bold text-[12px] md:text-[20px] font-[Poppins] text-nowrap',
  addresclassName = 'text-gray-700 font-medium text-[5px] md:text-[8px] font-[Poppins] tracking-[.35px] md:tracking-[.75px] text-nowrap',
  logoclassName = 'h-[24px] md:h-[40px] ',
}) => {
  return data.logo ? (
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
  ) : null;
};

const Alamat = ({ data }) => {
  return <p>{data.alamat}</p>;
};

const Sosmed = ({ data }) => {
  return data.sosmed ? (
    <div>
      <a href={data.sosmed.facebook}>Facebook</a>
      <a href={data.sosmed.instagram}>Instagram</a>
      <a href={data.sosmed.twitter}>Twitter</a>
    </div>
  ) : null;
};

const Kontak = ({ data }) => {
  return (
    <div>
      <p>Email: {data.kontak?.email}</p>
      <p>Phone: {data.kontak?.phone}</p>
    </div>
  );
};

const Struktur = ({ data }) => {
  return (
    <div>
      <p>Email: {data.kontak?.email}</p>
      <p>Phone: {data.kontak?.phone}</p>
    </div>
  );
};

Profil.Logo = Logo;
Profil.Alamat = Alamat;
Profil.Sosmed = Sosmed;
Profil.Kontak = Kontak;
Profil.Struktur = Struktur;

export default Profil;
