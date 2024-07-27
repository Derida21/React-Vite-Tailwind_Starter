import React from 'react';
import { CKEditor, Image } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKFinder from '@ckeditor/ckeditor5-build-classic';

const Editor = ({ data, onChange, kategori }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      config={{
        ckfinder: {
          uploadUrl: `http://nurul-huda.org/api/upload?kategori=${kategori}`,
        },
        extraPlugins: [CKFinder],
        toolbar: [
          'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'imageUpload', 'ckfinder', 'ckboxImageEdit', 'insertImage'
        ],

      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
};

export default Editor;