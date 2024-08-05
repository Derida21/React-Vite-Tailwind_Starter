import { IconSend, IconArrowBack } from '@tabler/icons-react';
import Form from './Form';
import { useState } from 'react';
import axios from 'axios';

const Form_Pengantar = () => {
  const [formData, setFormData] = useState({
    Nama: '',
    NIK: '',
    KK: '',
    WA: '',
    Alamat: '',
    TTL: '',
    ['Jenis Kelamin']: '',
    Status: '',
    Agama: '',
    Pekerjaan: '',
    Tujuan: '',
  });
  const [showMessage, setShowMessage] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const Gender = [
    { value: 'Laki - laki', label: 'Laki - Laki' },
    { value: 'Perempuan', label: 'Perempuan' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'NIK' || name === 'KK' || name === 'WA') {
      if (!/^[\d-]*$/.test(value)) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleSend = () => {
    let data = {
      nama_pengaju: formData.Nama,
      no_wa: formData.WA,
      jenis_pelayanan: 0,
      nama_pelayanan: 'SURAT PENGANTAR',
      persyaratan: {
        nama_lengkap: formData.Nama,
        nik: formData.NIK,
        no_kk: formData.KK,
        alamat: formData.Alamat,
        tempat_tanggal_lahir: formData.TTL,
        pekerjaan: formData.Pekerjaan,
        status_perkawinan: formData.Status,
        jenis_kelamin: formData['Jenis Kelamin'],
        agama: formData.Agama,
        keperluan: formData.Tujuan,
      },
    };

    axios
      .post('http://nurul-huda.org/api/pelayanan', data)
      .then((response) => {
        const message = `Saya ingin mengkonfirmasikan bahwa saya telah mengisi form pelayanan`;

        const phoneNumber = '+6285852392330';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;
        window.open(whatsappUrl, '_blank');
        setShowMessage(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleBack = () => {
    setCurrentStep(1);
    setShowMessage(false);
    setFormData({
      Nama: '',
      NIK: '',
      KK: '',
      WA: '',
      Alamat: '',
      TTL: '',
      ['Jenis Kelamin']: '',
      Status: '',
      Agama: '',
      Pekerjaan: '',
      Tujuan: '',
    });
  };

  const confirmData = () => {
    return (
      <table className='w-full bg-white shadow-md rounded-md'>
        <tbody>
          {Object.entries(formData).map(([key, value]) => (
            <tr
              key={key}
              className='text-[10px] font-[Poppins] font-medium align-top'
            >
              <td className='text-gray-700 p-2 border-b border-gray-200'>
                {key.charAt(0) + key.slice(1)}
              </td>
              <td className='text-gray-500 p-2 border-b border-gray-200'>
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {currentStep === 1 && (
        <Form onSubmit={handleSubmit}>
          <div className='grid md:grid-cols-2 gap-x-20 gap-y-5 py-10 md:py-[60px]'>
            <Form.Input
              label='Nama'
              name='Nama'
              value={formData.Nama}
              onChange={handleChange}
            />
            <Form.Input
              label='NIK'
              name='NIK'
              value={formData.NIK}
              onChange={handleChange}
            />
            <Form.Input
              label='KK'
              name='KK'
              value={formData.KK}
              onChange={handleChange}
            />
            <Form.Input
              label='No.WA'
              name='WA'
              value={formData.WA}
              onChange={handleChange}
            />
            <Form.Input
              label='Alamat'
              name='Alamat'
              value={formData.Alamat}
              onChange={handleChange}
            />
            <Form.Input
              label='Tempat Tanggal Lahir'
              name='TTL'
              value={formData.TTL}
              onChange={handleChange}
            />
            <Form.Options
              option={Gender}
              name='Jenis Kelamin'
              value={formData['Jenis Kelamin']}
              onChange={handleChange}
              label='Jenis Kelamin'
            />
            <Form.Input
              label='Status Perkawinan'
              name='Status'
              value={formData.Status}
              onChange={handleChange}
            />
            <Form.Input
              label='Agama'
              name='Agama'
              value={formData.Agama}
              onChange={handleChange}
            />
            <Form.Input
              label='Pekerjaan'
              name='Pekerjaan'
              value={formData.Pekerjaan}
              onChange={handleChange}
            />
            <Form.Input
              label='Keperluan'
              name='Tujuan'
              value={formData.Tujuan}
              onChange={handleChange}
            />
          </div>
          <div className='w-full flex justify-center items-center'>
            <Form.Button type='submit'>Next</Form.Button>
          </div>
        </Form>
      )}
      {currentStep === 2 && (
        <div className='flex flex-col items-center py-[60px]'>
          <div className='mb-4'>
            <h2 className='text-center font-bold text-teal-700 text-[20px]'>
              Konfirmasi Data Anda
            </h2>
            <p className='text-gray-500 text-center'>
              Pastikan data yang akan anda kirim sudah benar!!
            </p>
          </div>
          {confirmData()}
          <div className='w-full my-4 flex justify-between'>
            <button
              onClick={handleBack}
              className='bg-gray-700 text-white px-4 gap-2 p-2 rounded flex items-center'
            >
              <IconArrowBack className='h-5' />
              Back
            </button>

            <button
              onClick={handleSend}
              className='bg-teal-700 text-white px-4 gap-2 rounded flex items-center'
            >
              Send
              <IconSend className='h-4 ' />
            </button>
          </div>
          {showMessage && (
            <p className='mt-4 text-center text-teal-700 '>
              Terima kasih telah menggunakan layanan kami
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Form_Pengantar;
