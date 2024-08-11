import GenericCRUD from '../../../components/NEW_CRUDS/GenericCRUD';
import React from 'react';

const PejabatPage = () => {
  const wargaSchema = [
    { name: 'foto', label: 'Photo', type: 'image' },
    { name: 'nama', label: 'Nama', type: 'text' },
    { name: 'jabatan', label: 'Jabatan', type: 'text' },
    { name: 'alamat', label: 'Alamat', type: 'text' },
  ];

  return (
    <GenericCRUD
      endpoint="/pejabat"
      schema={wargaSchema}
      title="Pejabat"
    />
  );
};

export default PejabatPage;
