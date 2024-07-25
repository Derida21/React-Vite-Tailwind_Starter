import { IconSend, IconArrowBack } from "@tabler/icons-react";
import Form from "./Form";
import { useState } from "react";
import axios from 'axios';

const Form_SKTM_Sekolah = () => {
  const [formData, setFormData] = useState({
    Nama: "",
    NIK: "",
    KK: "",
    WA: "",
    Alamat: "",
    TTL: "",
    ["Jenis Kelamin"]: "",
    Agama: "",
    Pekerjaan: "",
    Tujuan: "", // Input baru
  });
  const [showMessage, setShowMessage] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [allFormData, setAllFormData] = useState({
    step1: {},
    step2: {},
  });

  const options = [
    { value: "Laki - laki", label: "Laki - Laki" },
    { value: "Perempuan", label: "Perempuan" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      if (currentStep === 1) {
        setAllFormData((prevData) => ({
          ...prevData,
          step1: formData,
        }));
      } else if (currentStep === 2) {
        setAllFormData((prevData) => ({
          ...prevData,
          step2: formData,
        }));
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSend = () => {

    let data = {
      nama_pengaju: allFormData.step1.Nama,
      no_wa: allFormData.step1.WA,
      jenis_pelayanan: 1,
      nama_pelayanan: 'SURAT KETERANGAN TIDAK MAMPU SEKOLAH',
      persyaratan: {
        nama_lengkap_pelajar: allFormData.step1.Nama,
        nik_pelajar: allFormData.step1.NIK,
        no_kk_pelajar: allFormData.step1.KK,
        alamat_pelajar: allFormData.step1.Alamat,
        tempat_tanggal_lahir_pelajar: allFormData.step1.TTL,
        pekerjaan_pelajar: allFormData.step1.Pekerjaan,
        jenis_kelamin_pelajar: allFormData.step1['Jenis Kelamin'],
        agama_pelajar: allFormData.step1.Agama,
        keperluan_pelajar: allFormData.step1.Tujuan,
        nama_lengkap_wali: allFormData.step2.Nama,
        nik_wali: allFormData.step2.NIK,
        no_kk_wali: allFormData.step2.KK,
        alamat_wali: allFormData.step2.Alamat,
        tempat_tanggal_lahir_wali: allFormData.step2.TTL,
        pekerjaan_wali: allFormData.step2.Pekerjaan,
        jenis_kelamin_wali: allFormData.step2['Jenis Kelamin'],
        agama_wali: allFormData.step2.Agama,
        keperluan_wali: allFormData.step2.Tujuan,
      }
    };

    axios.post('http://nurul-huda.org/api/pelayanan', data)
      .then(response => {
        const message = `Saya ingin mengkonfirmasikan bahwa saya telah mengisi form pelayanan dengan kode pelayanan :${response.data.data.kode_pelayanan}`;

        const phoneNumber = '+6285852392330';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;

        window.open(whatsappUrl, '_blank');
        setShowMessage(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    // window.open(whatsappUrl, "_blank");
    // setShowMessage(true);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setShowMessage(false);
  };

  const confirmData = () => {
    return (
      <table className="w-full bg-white shadow-md rounded-md">
        <tbody>
          <tr>
            <td className="w-full p-2 border-b border-gray-200 bg-gray-100 font-bold text-gray-700">
              Data Pelajar
            </td>
          </tr>
          {Object.entries(allFormData.step1).map(([key, value]) => (
            <tr key={key}>
              <td className="p-2 border-b border-gray-200">
                {key.charAt(0) + key.slice(1)}
              </td>
              <td className=" p-2 border-b border-gray-200">{value}</td>
            </tr>
          ))}
          <tr>
            <td className="w-full bg-gray-100 p-2 border-b border-gray-200 font-bold text-gray-700">
              Data Orang Tua/Wali Pelajar
            </td>
          </tr>
          {Object.entries(allFormData.step2).map(([key, value]) => (
            <tr key={key}>
              <td className="p-2 border-b border-gray-200">
                {key.charAt(0) + key.slice(1)}
              </td>
              <td className=" p-2 border-b border-gray-200">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {currentStep === 1 && (
        <div className="flex flex-col gap-5 pt-[60px]">
          <h1 className="text-[24px] font-medium text-teal-700">
            Data Pelajar
          </h1>
          <Form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-5 pb-[60px]">
              <Form.Input
                label="Nama"
                name="Nama"
                value={formData.Nama}
                onChange={handleChange}
                placeholder="John Die"
              />
              <Form.Input
                label="NIK"
                name="NIK"
                value={formData.NIK}
                onChange={handleChange}
                placeholder="xxxxx-xxxxx-xxxxx"
              />
              <Form.Input
                label="KK"
                name="KK"
                value={formData.KK}
                onChange={handleChange}
              />
              <Form.Input
                label="No.WA"
                name="WA"
                value={formData.WA}
                onChange={handleChange}
              />
              <Form.Input
                label="Alamat"
                name="Alamat"
                value={formData.Alamat}
                onChange={handleChange}
              />
              <Form.Input
                label="Tempat Tanggal Lahir"
                name="TTL"
                value={formData.TTL}
                onChange={handleChange}
              />
              <Form.Options
                option={options}
                name="Jenis Kelamin"
                value={formData["Jenis Kelamin"]}
                onChange={handleChange}
                label="Jenis Kelamin"
              />
              <Form.Input
                label="Agama"
                name="Agama"
                value={formData.Agama}
                onChange={handleChange}
              />
              <Form.Input
                label="Pekerjaan"
                name="Pekerjaan"
                value={formData.Pekerjaan}
                onChange={handleChange}
              />
              <Form.Input
                label="Tujuan"
                name="Tujuan"
                value={formData.Tujuan}
                onChange={handleChange}
                placeholder="Masukkan tujuan Anda"
              />
            </div>
            <div className="w-full flex justify-end items-center">
              <Form.Button type="submit">Next</Form.Button>
            </div>
          </Form>
        </div>
      )}
      {currentStep === 2 && (
        <div className="flex flex-col gap-5 pt-[60px]">
          <h1 className="text-[24px] font-medium text-teal-700">
            Data Orang Tua/Wali Pelajar
          </h1>
          <Form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-5 pb-[60px]">
              <Form.Input
                label="Nama"
                name="Nama"
                value={formData.Nama}
                onChange={handleChange}
                placeholder="John Die"
              />
              <Form.Input
                label="NIK"
                name="NIK"
                value={formData.NIK}
                onChange={handleChange}
                placeholder="xxxxx-xxxxx-xxxxx"
              />
              <Form.Input
                label="KK"
                name="KK"
                value={formData.KK}
                onChange={handleChange}
              />
              <Form.Input
                label="Alamat"
                name="Alamat"
                value={formData.Alamat}
                onChange={handleChange}
              />
              <Form.Input
                label="Tempat Tanggal Lahir"
                name="TTL"
                value={formData.TTL}
                onChange={handleChange}
              />
              <Form.Options
                option={options}
                name="Jenis Kelamin"
                value={formData["Jenis Kelamin"]}
                onChange={handleChange}
                label="Jenis Kelamin"
              />
              <Form.Input
                label="Agama"
                name="Agama"
                value={formData.Agama}
                onChange={handleChange}
              />
              <Form.Input
                label="Pekerjaan"
                name="Pekerjaan"
                value={formData.Pekerjaan}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <button
                onClick={handleBack}
                className="bg-gray-700 text-white px-4 gap-2 p-2 rounded flex items-center"
              >
                <IconArrowBack className="h-5" />
                Back
              </button>
              <Form.Button type="submit">Next</Form.Button>
            </div>
          </Form>
        </div>
      )}
      {currentStep === 3 && (
        <div className="flex flex-col items-center py-[60px]">
          <div className="mb-4">
            <h2 className="text-center font-bold text-teal-700 text-[20px]">
              Konfirmasi Data Anda
            </h2>
            <p className="text-gray-500">
              Pastikan data yang akan anda kirim sudah benar!!
            </p>
          </div>
          {confirmData()}
          {showMessage && (
            <p className="mt-4 text-center text-teal-700">
              Terima kasih telah menggunakan layanan kami
            </p>
          )}
          <div className="w-full my-4 flex justify-between">
            <button
              onClick={handleBack}
              className="bg-gray-700 text-white px-4 gap-2 p-2 rounded flex items-center"
            >
              <IconArrowBack className="h-5" />
              Back
            </button>
            <button
              onClick={handleSend}
              className="bg-teal-700 text-white px-4 gap-2 rounded flex items-center"
            >
              Kirim
              <IconSend className="h-4 " />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Form_SKTM_Sekolah;
