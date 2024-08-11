
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrudPage from '../../../components/NEW_CRUD_NO_MODAL/CurdPage';
import EditComponent from '../../../components/NEW_CRUD_NO_MODAL/EditComponent';

import CrudTable from '../../../components/NEW_CRUD/CrudTable';


const LembagaComponent = () => {
    const schema = [
      { name: 'nama', label: 'Nama', type: 'text' },
      { name: 'singkatan', label: 'Singkatan', type: 'text' },
      { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { name: 'logo', label: 'Logo', type: 'file' },
      { name: 'pengurus', label: 'Pengurus', type: 'array' },
    ];
  
    return (
      <CrudTable
        endpoint="/lembaga"
        schema={schema}
        title="Lembaga"
      />
    );
  };
  
export default LembagaComponent;