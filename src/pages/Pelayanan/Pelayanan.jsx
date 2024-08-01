import bg from '../../../assets/img/bg_pelayanan.jpg';
import Layout from '../../components/home_component/Section/Pelayanan/Layout';
import React from 'react';

const Pelayanan = () => {
  return (
    <>
      <section className='md:pb-[100px] -space-y-6 md:-space-y-[250px] bg-slate-100'>
        <div
          className='flex flex-col items-center justify-center font-[Poppins] gap-6 xl:px-[200px] h-[450px] md:h-[840px]'
          style={{
            background: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h1 className='text-white text-2xl md:text-[64px] text-center font-bold leading-normal'>
            Fitur Pelayanan
            <br />
            <span className='text-lg md:text-[50px] font-medium'>
              Kampung Eka Sapta
            </span>
          </h1>
          <p className='text-white text-xs  md:text-2xl text-center'>
            Form yang di buat untuk mempermudah masyarakat Kampung Eka Sapta
            dalam memenuhi persyaratan administrasi
          </p>
        </div>
        <div className='flex flex-col'>
          <Layout />
        </div>
      </section>
    </>
  );
};

export default Pelayanan;
