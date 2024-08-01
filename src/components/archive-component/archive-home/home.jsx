import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './dropdown';
import Table from './table';
import axios from 'axios';
import useAppContext from '../../../context/useAppContext';
import Layout from '../Layout';

const Home = ({ setCurrentPage }) => {
  const { axiosInstance } = useAppContext();
  const [Perencanaan, setPerencanaan] = useState({ headers: [], rows: [] });
  const [Keuangan, setKeuangan] = useState({
    APBK: { headers: [], rows: [] },
    RKP: { headers: [], rows: [] },
    SPJ: { headers: [], rows: [] },
  });

  useEffect(() => {
    const fetchPerencanaan = async () => {
      try {
        const response = await axiosInstance.get('/arsip/perencanaan');
        const headers = ['Kode Arsip', 'File', 'Nama File', 'Tanggal Upload'];
        const rows = response.data.data
          .slice(0, 10)
          .map((item) => Object.values(item));
        setPerencanaan({ headers, rows });
      } catch (error) {
        console.error('Error fetching planning data:', error);
      }
    };

    const fetchKeuangan = async () => {
      try {
        const apbkResponse = await axiosInstance.get(
          '/arsip/keuangan?subKategori=APBK'
        );
        const rkpResponse = await axiosInstance.get(
          '/arsip/keuangan?subKategori=RKP'
        );
        const spjResponse = await axiosInstance.get(
          '/arsip/keuangan?subKategori=SPJ'
        );

        const processKeuangan = (data) => {
          const headers = ['Kode Arsip', 'File', 'Nama File', 'Tanggal Upload'];
          const rows = data.slice(0, 10).map((item) => Object.values(item));
          return { headers, rows };
        };

        setKeuangan({
          APBK: processKeuangan(apbkResponse.data.data),
          RKP: processKeuangan(rkpResponse.data.data),
          SPJ: processKeuangan(spjResponse.data.data),
        });
      } catch (error) {
        console.error('Error fetching finance data:', error);
      }
    };

    fetchPerencanaan();
    fetchKeuangan();
  }, []);

  return (
    <Layout>
      {/* Perencanaan */}
      <Dropdown
        title='Perencanaan'
        onClick={() => setCurrentPage('Perencanaan')}
        href='#'
      >
        <Table data={Perencanaan} indexColumn={true} />
      </Dropdown>
      {/* Keuangan */}
      <Dropdown
        title='Keuangan'
        className='flex flex-col gap-2 border border-gray-300 rounded p-4'
        onClick={() => setCurrentPage('Keuangan')}
        href='#'
      >
        <Dropdown
          title='APBK'
          onClick={() => setCurrentPage('Perencanaan')}
          href='#'
        >
          <Table data={Keuangan.APBK} indexColumn={true} />
        </Dropdown>
        <Dropdown title='RKP'>
          <Table data={Keuangan.RKP} indexColumn={true} />
        </Dropdown>
        <Dropdown title='SPJ'>
          <Table data={Keuangan.SPJ} indexColumn={true} />
        </Dropdown>
      </Dropdown>
    </Layout>
  );
};

export default Home;
