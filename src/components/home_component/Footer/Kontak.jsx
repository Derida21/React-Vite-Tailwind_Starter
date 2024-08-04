import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaMailBulk,
  FaPhone,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import Menu from './Menu';
import React from 'react';
const Kontak = () => {
  const [kontak, setkontak] = useState(null);

  const getkontak = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/profil');
      console.log(response);
      setkontak(response.data.data);
    } catch (error) {
      if (!error.response) {
        console.error('Network error:', error);
      } else {
        console.error('Error response:', error.response.data);
      }
    }
  };

  useEffect(() => {
    getkontak();
  }, []);

  return (
    <Menu>
      <Menu.Title text='Kontak' />
      {kontak && (
        <Menu.List>
          {kontak.email && (
            <Menu.Data
              target='_blank'
              href={`mailto:${kontak.email}`}
              text={kontak.email}
            >
              <FaMailBulk />
            </Menu.Data>
          )}
          {kontak.no_hp && (
            <Menu.Data
              target='_blank'
              href={`https://wa.me/${kontak.no_hp}`}
              text={kontak.no_hp}
            >
              <FaPhone />
            </Menu.Data>
          )}
        </Menu.List>
      )}
    </Menu>
  );
};

export default Kontak;
