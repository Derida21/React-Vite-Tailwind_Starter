import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailLembaga = () => {
  const { uuid } = useParams();
  const [detail, setDetail] = useState(null);

  const getDetail = async () => {
    try {
      const response = await axios.get(
        `http://nurul-huda.org/api/lembaga/${uuid}`
      );
      setDetail(response.data.data);
    } catch (error) {
      console.error('Error fetching detail:', error);
    }
  };

  useEffect(() => {
    getDetail();
  }, [uuid]);

  return (
    <section className='px-5 md:px-[60px] lg:px-[80px] xl:px-[160px]'>
      <div className='flex flex-col pt-16 pb-5 md:pt-[120px] md:pb-[40px] lg:pt-[120px] lg:pb-20'>
        {detail && (
          <h1 className='font-[Poppins] py-3 px-4 bg-teal-700 text-[16px] md:text-[20px] font-semibold text-white rounded-t-lg border-b'>
            {detail.nama}
          </h1>
        )}
        <div className='flex flex-col gap-2 lg:gap-5 px-2 py-4 md:p-5 border bg-white shadow-lg rounded-b-lg '></div>
      </div>
    </section>
  );
};

export default DetailLembaga;
