import { IconArrowBackUp, IconPlus } from '@tabler/icons-react';

function Layout({ children, className = '' }) {
  return (
    <div
      className={`flex flex-col gap-2 p-5 border border-gray-300 rounded-lg h-full${className}`}
    >
      {children}
    </div>
  );
}

const ButtonBack = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <IconArrowBackUp className='w-6 flex items-center justify-center p-1 bg-gray-200 rounded-md hover:bg-white hover:stroke-teal-500 hover:border hover:border-teal-500 cursor-pointer' />
    </div>
  );
};

const ButtonModal = ({ type, onClick }) => {
  return (
    <div className='flex gap-2 items-center'>
      <span className='font-[Poppins] text-xs'>Upload File</span>
      <button
        onClick={onClick}
        type={type}
        className='p-1 rounded-full border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white'
      >
        <IconPlus className='w-[10px] h-[10px]' />
      </button>
    </div>
  );
};

const customstyle = [
  'w-full max-w-[50px] flex justify-center',
  'w-full max-w-[180px] ',
  'w-full max-w-[180px]',
  'w-full ',
  'w-full ',
  'w-full ',
];

const List = ({ header, data, listitem }) => {
  return (
    <div className='flex flex-col gap-2 max-h-full pr-3 overflow-hidden overflow-y-scroll'>
      {/* Header */}
      <ul className='flex items-center justify-between bg-teal-500 rounded-md'>
        {header.map((headers, index) => (
          <li key={index} className={customstyle[index]}>
            <h1
              className='font-[Poppins] text-white text-xs font-semibold px-4 py-3
'
            >
              {headers.label.join('/')}
            </h1>
          </li>
        ))}
      </ul>
      {/* Body */}
      <ul className='flex flex-col gap-2 h-full max-h-screen '>
        {data.map((item, index) => (
          <li key={index} className=''>
            <ul
              className={`flex items-center justify-between rounded-md ${
                index % 2 == 0 ? 'bg-teal-100' : 'bg-teal-200'
              }`}
            >
              {listitem(item, index, customstyle)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

Layout.ButtonBack = ButtonBack;
Layout.ButtonModal = ButtonModal;
Layout.List = List;

export default Layout;
