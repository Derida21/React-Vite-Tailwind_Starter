import { useEffect, useState } from 'react';
import Layout from '../Layout';
import imgdefault from '../../../../../../assets/img/bg_sejarah.jpg';
import axios from 'axios';

const Thumbnail = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://nurul-huda.org/api/geografis');
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error.response || error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout className='flex flex-col gap-2'>
      <Layout.Thumbnail
        title='Geografis Kampung'
        src={data.thumbnail || imgdefault}
        alt={data.judul || 'haha Desa'}
      />
      <Layout.Description>{data.isi}</Layout.Description>
    </Layout>
  );
};

export default Thumbnail;
