import { useEffect, useRef, useState } from 'react';
import Table from '../Table';
import axios from 'axios';
import Chart from 'chart.js/auto';

export const Kelompok_Umur = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://nurul-huda.org/api/demografi/umur'
        );
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error(
          error.response
            ? `Error response: ${error.response}`
            : `Network error: ${error}`
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const labels = data.map((data) => data['Kelompok Umur']);
      const maleData = data.map((data) => data['Laki-laki']);
      const femaleData = data.map((data) => data['Perempuan']);

      const ctx = canvasRef.current.getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Laki-laki',
              data: maleData,
              backgroundColor: '#5EEAD4',
              borderColor: '#5EEAD4',
              borderWidth: 1,
            },
            {
              label: 'Perempuan',
              data: femaleData,
              backgroundColor: '#CCFBF1',
              borderColor: '#CCFBF1',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Jumlah Penduduk',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Kelompok Umur',
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className='flex flex-col justify-center gap-5'>
      {data.length > 0 ? (
        <>
          <canvas
            ref={canvasRef}
            id='myChart'
            className='w-full md:max-w-full bg-white p-2 rounded-md '
          ></canvas>
          <Table>
            <thead>
              <tr>
                <Table.Header>Kelompok Umur</Table.Header>
                <Table.Header>Laki-laki</Table.Header>
                <Table.Header>Perempuan</Table.Header>
                <Table.Header>Jumlah</Table.Header>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <Table.Body>{item['Kelompok Umur']}</Table.Body>
                  <Table.Body>{item['Laki-laki']}</Table.Body>
                  <Table.Body>{item['Perempuan']}</Table.Body>
                  <Table.Body>{item.Jumlah}</Table.Body>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <p className='text-center text-white text-2xl'>Data belum tersedia</p>
      )}
    </div>
  );
};
