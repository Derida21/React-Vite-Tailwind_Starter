import GenericCRUD from '../../../components/NEW_CRUDS/GenericCRUD';
import React from 'react';

const ProductComponent = () => {
  const produkSchema = [
    { name: 'foto', label: 'Photo', type: 'image' },
    { name: 'nama_produk', label: 'Nama Produk  ', type: 'text' },
    { name: 'deskripsi', label: 'Deskripsi', type: 'text' },
    { name: 'no_wa', label: 'Nomor HP', type: 'text' },
  ];

  return (
    <GenericCRUD
      endpoint="/produk"
      schema={produkSchema}
      title="Produk"
    />
  );
};

export default ProductComponent;
