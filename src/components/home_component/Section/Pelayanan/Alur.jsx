import alur1 from '../../../../../assets/img/alur/alur1.png';
import alur2 from '../../../../../assets/img/alur/alur2.png';
import alur3 from '../../../../../assets/img/alur/alur3.png';

const alur = [
  {
    img: alur1,
    text: 'Pada bagian dropdown pilih salah satu jenis pelayanan',
    className: 'w-[175px]',
  },
  {
    img: alur2,
    text: 'Setelah memilih salah satu jenis pelayanan input data sesuai dokumen resmi pemerintah',
    className: 'w-[345px]',
  },
  {
    img: alur3,
    text: 'Jika sudah mengisi data klik next untuk melanjutkan proses pengajuan, pastikan data yang di input sudah benar',
    className: 'w-[345px]',
  },
  {
    img: null,
    text: 'Klik send untuk mengkonfirmasi pengajuan via Whatsapp',
    className: 'w-[345px]',
  },
];

export default function Alur() {
  return (
    <div className="'w-full flex flex-col items-center gap-6 min-h-[654px] xl:w-[1040px] bg-teal-700 px-5 md:px-20 pb-20 pt-9 md:rounded-md lg:rounded-2xl">
      <h1 className='font-[Poppins] text-white font-semibold text-xl md:text-3xl'>
        Alur Pengajuan Form
      </h1>
      <div className='w-full border border-white rounded-xl h-full'>
        <ul className=' flex flex-col items-center gap-5 p-5'>
          {alur.map((item, index) => (
            <li key={index} className='flex flex-col items-center gap-3'>
              <p className='text-sm font-[Poppins] text-white'>{item.text}</p>
              <img src={item.img} alt='' className={item.className} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
