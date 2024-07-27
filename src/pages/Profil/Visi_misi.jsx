import { useEffect, useState } from 'react';
import Layout from '../../components/home_component/Section/Profil/Layout';
import imgdefault from '../../../assets/img/bg_sejarah.jpg';
import React from 'react';
const VisiMisi = () => {
  const url = '';
  const [visimisi, setVisiMisi] = useState({
    thumbnail: imgdefault,
    alt: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    misi: [{ id: 1, detail: 'Lorem ipsum dolor sit amet' }],
  });

  const getDataVisiMisi = async () => {
    const response = await fetch(url);
    const dataVisiMisi = await response.json();
    setVisiMisi(dataVisiMisi);
    console.log(visimisi);
  };

  useEffect(() => {
    getDataVisiMisi();
  }, []);
  return (
    <section className='px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col items-center gap-3 pt-14 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <Thumbnail thumbnail={visimisi.thumbnail} alt={visimisi.alt} />
        <Visi description={visimisi.description} />
        <Misi misi={visimisi.misi} />
      </div>
    </section>
  );
};

function Thumbnail({ thumbnail, alt }) {
  return (
    <Layout className='flex flex-col gap-2'>
      <Layout.Thumbnail title='Visi Misi Kampung' src={thumbnail} alt={alt} />
    </Layout>
  );
}

function Visi({ description }) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <h1 className='font-[Poppins] text-[12px] md:text-[24px] font-semibold text-teal-700'>
        Visi
      </h1>
      <p className='font-[Poppins] text-gray-500 text-[10px] md:text-[16px] border-l-2 pl-3 md:pl-10 border-teal-700 text-justify'>
        {description}
      </p>
    </div>
  );
}

function Misi({ misi }) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <h1 className='font-[Poppins] text-[12px] md:text-[24px] font-semibold text-teal-700'>
        Misi
      </h1>
      <div className='flex flex-col border-l-2 pl-3 md:pl-10 border-teal-700'>
        <table className=' border-spacing-4'>
          <tbody>
            {misi.map((item) => {
              return (
                <tr
                  key={item.id}
                  className='font-[Poppins] text-gray-500 text-[10px] md:text-[16px] align-top'
                >
                  <td>{idString(item.id)}</td>
                  <td>{item.detail} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function idString(num) {
  const words = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return num >= 0 && num < words.length ? words[num] : num.toString();
}

export default VisiMisi;
