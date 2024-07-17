import Layout from '../../components/home_component/Section/Pemerintahan/Perangkat_Desa/Layout';
import React from 'react';
export default function PerangkatDesa() {
  return (
    <section className='px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg border-b'>
          Perangkat Kampung
        </h1>
        <div className='flex flex-row gap-4 md:p-5 md:border rounded-b-lg '>
          <Layout />
        </div>
      </div>
    </section>
  );
}
