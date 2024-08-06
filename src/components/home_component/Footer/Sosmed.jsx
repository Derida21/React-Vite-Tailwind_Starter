import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React from 'react';
import Menu from './Menu';

const Sosmed = () => {
  const [sosmed, setSosmed] = useState(null);

  const getSosmed = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/profil');
      console.log(response);
      setSosmed(response.data.data.sosial_media);
    } catch (error) {
      if (!error.response) {
        console.error('Network error:', error);
      } else {
        console.error('Error response:', error.response.data);
      }
    }
  };

  useEffect(() => {
    getSosmed();
  }, []);

  useEffect(() => {
    console.log(sosmed);
  }, [sosmed]);

  return (
    <Menu>
      <Menu.Title text='Media Sosial' />
      {sosmed && (
        <Menu.List>
          {sosmed.fb && (
            <Menu.Data
              target='_blank'
              href={`https://facebook.com/${sosmed.fb}`}
              text={sosmed.fb}
            >
              <FaFacebook />
            </Menu.Data>
          )}
          {sosmed.ig && (
            <Menu.Data
              target='_blank'
              href={`https://instagram.com/${sosmed.ig}`}
              text={sosmed.ig}
            >
              <FaInstagram />
            </Menu.Data>
          )}
        </Menu.List>
      )}
    </Menu>
  );
};

export default Sosmed;
