import { Thumbnail } from '../../components/home_component/Section/Informasi Publik/Thumbnail';
import Card from '../../components/home_component/Section/Home/News/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Produk() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://nurul-huda.org/api/produk');
      setData(response.data.data.data);
      console.log(response.data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const headline = data[0];
  const others = data.slice(1);

  return (
    <div className='px-5 pt-14 md:px-[60px] md:pt-[120px] md:pb-10 lg:px-[80px] lg:pt-[130px] xl:px-[160px] bg-slate-100'>
      <div className='w-full p-2 md:p-5 bg-white rounded-xl shadow border border-gray-300 flex-col justify-center items-start gap-2 md:gap-8 inline-flex'>
        {headline && (
          <Link to='' className='w-full'>
            <Thumbnail
              note='Produk Tebaru'
              bg={headline.foto}
              title={headline.nama_produk}
              description={headline.deskripsi}
            />
          </Link>
        )}

        <div className='flex flex-col gap-8 w-full'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center font-[Poppins] text-2xl font-semibold'>
              Produk UMKM <br />
              <span className='text-[16px] font-normal'>Kampung Eka Sapta</span>
            </h1>
            <p>Menampilkan produk, jasa, dan hasil bumi Kampung Eka Sapta</p>
          </div>
          <div className='grid grid-cols-4 gap-6 h-full'>
            {others.map((item, index) => (
              <Card
                key={index}
                container='h-full shadow-xl'
                wrapper='flex flex-col gap-3 border pb-4 rounded-b-md '
              >
                <Card.Thumbnail
                  src={item.foto}
                  className='w-full h-[180px] rounded-t-md'
                >
                  haloo
                </Card.Thumbnail>
                <Card.Detail
                  className='px-3 space-y-3'
                  title={item.nama_produk}
                  description={
                    <p dangerouslySetInnerHTML={{ __html: item.deskripsi }}></p>
                  }
                  descriptionclassName='line-clamp-3 text-justify font-[Poppins] text-gray-500 text-[12px]'
                >
                  <Link to='' className='w-full text-center '>
                    Detail
                  </Link>
                </Card.Detail>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Produk;
