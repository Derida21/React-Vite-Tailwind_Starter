
import React from 'react';
import { CKEditor } from 'ckeditor4-react';

const Editor = ({ data, onChange }) => {

  const handleEditorChange = (event) => {
    const data = event.editor.getData();
    onChange(data);
  };
  const initData = data;

  return (
    <CKEditor
      initData={initData}
      config={{
        versionCheck: false,
        extraPlugins: 'uploadimage,image2',
        filebrowserUploadUrl: 'http://nurul-huda.org/api/upload?kategori=berita', // Ganti dengan endpoint upload server Anda
        filebrowserUploadMethod: 'form',
        toolbar: [
          {
            name: 'document',
            groups: ['mode', 'document', 'doctools'],
            items: ['Source', '-', 'Print'],
          },
          {
            name: 'clipboard',
            groups: ['clipboard', 'undo'],
            items: [
              'Cut',
              'Copy',
              'Paste',
              'PasteText',
              'PasteFromWord',
              '-',
              'Undo',
              'Redo',
            ],
          },
          {
            name: 'editing',
            groups: ['find', 'selection', 'spellchecker', 'editing'],
            items: ['-', '-'],
          },
          { name: 'forms', groups: ['forms'], items: [''] },
          {
            name: 'insert',
            groups: ['insert'],
            items: [
              'Image',
              'Table',
              'HorizontalRule',
              'SpecialChar',
              'PageBreak',
            ],
          },
          {
            name: 'links',
            groups: ['links'],
            items: ['Link', 'Unlink', 'Anchor'],
          },
          {
            name: 'tools',
            groups: ['tools'],
            items: ['Maximize', 'ShowBlocks'],
          },
          '/',
          {
            name: 'styles',
            groups: ['styles'],
            items: ['Styles', 'Format', 'Font', 'FontSize'],
          },
          {
            name: 'basicstyles',
            groups: ['basicstyles', 'cleanup'],
            items: [
              'Bold',
              'Italic',
              'Underline',
              'Strike',
              'Subscript',
              'Superscript',
              '-',
            ],
          },
          {
            name: 'colors',
            groups: ['colors'],
            items: ['TextColor', 'BGColor'],
          },
          {
            name: 'paragraph',
            groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'],
            items: [
              'NumberedList',
              'BulletedList',
              '-',
              'Outdent',
              'Indent',
              '-',
              'Blockquote',
              'CreateDiv',
              '-',
              'JustifyLeft',
              'JustifyCenter',
              'JustifyRight',
              'JustifyBlock',
              'CodeSnippet',
              '-',
            ],
          },
          { name: 'others', groups: ['others'], items: ['-', 'AddLayout'] },
          { name: 'about', groups: ['about'], items: [''] },
        ],
        removeButtons: '',
        extraPlugins: ['justify', 'colorbutton', 'font', 'codesnippet'],
        codeSnippet_theme: 'monokai_sublime',
        height: 300,
        image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side',
            'linkImage',
          ],
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
        },
      }}
      onChange={handleEditorChange}
    />
  );
};

export default Editor;