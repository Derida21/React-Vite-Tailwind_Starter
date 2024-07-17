import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo-berau3.png';
import logo2 from '../../../assets/img/barca.png';
import axios from 'axios';

const LembagaDesa = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('');
    } catch {}
  };

  useEffect(() => {
    getData();
  }, []);
  const lembagaList = [
    {
      id: 1,
      title: 'Lembaga sdasd asdsadas asdasdasd adas',
      image: logo,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam maxime eius aut dolorem ipsum sint iste. Ut fugit, ipsum, velit, eius obcaecati necessitatibus impedit in enim iure architecto at illum. Error atque saepe, dolore provident possimus quasi molestias vero soluta similique incidunt aliquam harum hic, sapiente, explicabo cumque assumenda ratione deserunt ut! Quas dolores rem ad distinctio. Rerum, iusto harum. Aperiam omnis saepe porro neque commodi quos voluptatum earum? Accusantium repudiandae eveniet harum blanditiis fugit molestias impedit asperiores iste nemo, officiis cumque sit inventore! Iusto dignissimos ratione saepe tenetur voluptate.',
      slug: 'lembaga-1',
    },
    {
      id: 2,
      title: 'Lembaga sdasd asdsadas asdasdasd adas',
      image: logo2,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam maxime eius aut dolorem ipsum sint iste. Ut fugit, ipsum, velit, eius obcaecati necessitatibus impedit in enim iure architecto at illum. Error atque saepe, dolore provident possimus quasi molestias vero soluta similique incidunt aliquam harum hic, sapiente, explicabo cumque assumenda ratione deserunt ut! Quas dolores rem ad distinctio. Rerum, iusto harum. Aperiam omnis saepe porro neque commodi quos voluptatum earum? Accusantium repudiandae eveniet harum blanditiis fugit molestias impedit asperiores iste nemo, officiis cumque sit inventore! Iusto dignissimos ratione saepe tenetur voluptate.',
      slug: 'lembaga-2',
    },
  ];

  return (
    <section className='px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[24px] font-semibold text-white rounded-t-lg border-b'>
          Lembaga Kampung
        </h1>
        <div className='flex flex-col gap-2 lg:gap-5 px-2 py-4 md:p-5 border bg-white shadow-lg rounded-b-lg '>
          {lembagaList.map((lembaga) => {
            return (
              <div className='md:flex md:gap-5 space-y-2 rounded border border-teal-700 p-3 lg:p-5'>
                <div className='flex w-full border  rounded p-4 items-center justify-center'>
                  <img
                    src={lembaga.image}
                    alt=''
                    className='max-h-32 md:max-h-36 items-center'
                  />
                </div>
                <div className=' md py-2 space-y-1 lg:space-y-2 font-[Poppins]'>
                  <div className='flex md:max-lg:gap-2 lg:items-center justify-between'>
                    <h1 className='text-teal-700 font-medium text-[12px] lg:text-[20px]'>
                      {lembaga.title}
                    </h1>
                    <Link
                      to={`/pemerintahan/lembaga-kampung/detail-lembaga/${lembaga.slug}`}
                      className='cursor-pointer text-[8px] lg:text-[10px] text-white py-1 px-2 bg-teal-700 rounded h-fit'
                    >
                      Detail
                    </Link>
                  </div>
                  <p className='text-gray-500 text-[10px] lg:text-[14px] text-justify line-clamp-2 lg:line-clamp-3'>
                    {lembaga.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default LembagaDesa;
