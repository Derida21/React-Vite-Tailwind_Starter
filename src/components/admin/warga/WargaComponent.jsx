import CrudTable from '../../../components/NEW_CRUD/CrudTable';
import React from 'react';

const WargaPage = () => {
  const wargaSchema = [
    { name: 'foto', label: 'Photo', type: 'image' },
    { name: 'kepala_keluarga', label: 'Kepala Keluarga', type: 'text' },
    { name: 'anggota_keluarga', label: 'Anggota Keluarga', type: 'array' },
    { name: 'link_maps', label: 'Link Maps', type: 'text' },
  ];

  return (
    <CrudTable
      endpoint="/warga"
      schema={wargaSchema}
      title="Warga"
    />
  );
};

export default WargaPage;
