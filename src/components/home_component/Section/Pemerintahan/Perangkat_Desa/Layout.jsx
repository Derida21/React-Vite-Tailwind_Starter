import { useEffect, useState } from 'react';
import profil from '../../../../../../assets/img/Kades.png';
import axios from 'axios';

const Layout = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);

  const getData = async () => {
    const response = await axios.get('http://nurul-huda.org/api/pejabat');
    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <div className='flex flex-row md:gap-2 w-full'>
      <div className='flex flex-col md:h-fit md:p-2 md:rounded-md md:border md:border-teal-700 md:gap-2 md:flex-col'>
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`py-2 lg:w-40 md:rounded-md md:text-nowrap md:justify-start p-2 md:p-4 border border-teal-700 w-full flex font-[Poppins] text-nowrap text-[8px] md:text-[10px] lg:text-[12px] cursor-pointer ${
              active === index
                ? 'bg-teal-700 text-white duration-300 ease-in-out'
                : 'bg-white md:hover:bg-teal-700 duration-300 ease-in md:hover:text-white text-teal-700'
            }`}
          >
            {item.jabatan}
          </div>
        ))}
      </div>
      <div className='w-full h-full md:rounded-sm '>
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col bg-teal-700 md:rounded-md gap-3 px-4 py-3 ${
              active === index ? 'block duration-200 ease-in-out ' : 'hidden'
            }`}
          >
            {active === index && (
              <div className='space-y-2 p-3 rounded bg-white'>
                <h1 className='font-[Poppins] font-medium text-sm md:text-[18px] text-teal-700'>
                  Detail Perangkat Desa
                </h1>
                <div className='w-full flex flex-col gap-2 lg:gap-5 md:flex-row '>
                  <img
                    src={item.foto || profil}
                    alt=''
                    className='md:w-1/3 rounded md:p-2 lg:p-5 md:border'
                  />
                  <table className='md:w-full font-[Poppins] text-gray-500 text-[7px] lg:text-[12px] text-nowrap'>
                    <tbody>
                      <Row text='Nama' data={item.nama} />
                      <Row text='Jabatan' data={item.jabatan} />
                      <Row
                        text='Alamat'
                        data={item.alamat || 'Jl. Sumbersari'}
                      />
                      <Row text='NIP' data={item.nip || 'NIP'} />
                      <Row text='TTL' data={item.ttl || 'dd-mm-yyy'} />
                      <Row text='Pendidikan' data={item.pendidikan || 'S+'} />
                    </tbody>
                  </table>
                </div>
                <div className='space-y-2 font-[Poppins] '>
                  <h1 className='font-medium text-sm md:text-[18px] text-teal-700'>
                    Tugas {item.jabatan}
                  </h1>
                  <p className='text-justify text-[10px] lg:text-sm text-gray-500'>
                    {item.tugas ||
                      `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quos deserunt pariatur et voluptates neque mollitia hic
                    maiores nisi sint id illum, optio quaerat blanditiis aperiam
                    iusto recusandae ipsum quas alias! Ipsam sed tempora eveniet
                    at aspernatur iste maiores, odio iusto aliquam ipsa,
                    doloribus esse voluptatum magnam, enim nostrum quod aut
                    ipsum expedita! Unde inventore sunt nisi autem iste qui
                    exercitationem`}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
const Row = (props) => {
  return (
    <tr className='border-b'>
      <td className='py-2 md:py-0 font-bold'>{props.text}</td>
      <td className='py-2 md:py-0'>{props.data}</td>
    </tr>
  );
};
export default Layout;
