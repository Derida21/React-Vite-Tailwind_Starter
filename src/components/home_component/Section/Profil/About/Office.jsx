import { useEffect, useState } from 'react';
import imgkantor from '../../../../../../assets/img/Slide1.png';

const defaultOffice = [
  {
    id: 1,
    data: 'Alamat',
    detail:
      'Jl. Pulau Dewata RT.001 Kampung Eka Sapta Kec. Talisayan Kab. Berau Kalimantan Timur',
  },
  {
    id: 2,
    data: 'No.Tlp',
    detail: '08666474465',
  },
];

const Office = () => {
  const url = '';
  const [office, setOffice] = useState(defaultOffice);

  const getDataOffice = async () => {
    const response = await fetch(url);
    const dataOffice = await response.json();
    setOffice(dataOffice);
    console.log(office);
  };
  useEffect(() => {
    getDataOffice();
  }, []);

  return (
    <div className='flex flex-col gap-2 lg:gap-5'>
      <h1 className='font-[Poppins] text-[12px] md:text-[24px] font-semibold text-teal-700'>
        Kantor Desa
      </h1>
      {/* Detail Kantor Desa */}
      <div className='border-l-2 pl-3 md:pl-6 border-teal-700 h-full'>
        <table className='table-auto'>
          <tbody>
            {office.map((office) => {
              return (
                <TableRow
                  key={office.id}
                  data={office.data}
                  detail={office.detail}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function TableRow(props) {
  return (
    <tr
      key={props.id}
      className='font-[Poppins] text-gray-500 text-[10px] md:text-[12px] align-top  '
    >
      <td className='pb-2 w-[60px] md:w-1/4'>{props.data}</td>
      <td className='pb-2 '>{props.detail}</td>
    </tr>
  );
}

export default Office;
