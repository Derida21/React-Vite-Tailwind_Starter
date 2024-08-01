import React from 'react';

const Table = ({ data, indexColumn = false }) => (
  <table className='w-full'>
    <thead className=''>
      <tr className='bg-teal-500 rounded-xl'>
        {indexColumn && (
          <th className='w-8 p-2 font-medium font-[Poppins] text-[10px] text-slate-50'>
            No.
          </th>
        )}
        {data.headers.map((header, index) => (
          <th
            key={index}
            className='min-w-[100px] w-[200px] p-2 font-medium font-[Poppins] text-[10px] text-slate-50'
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className=''>
      {data.rows.map((row, rowIndex) => (
        <tr key={rowIndex} className='border-b bg-teal-100'>
          {indexColumn && (
            <td className='w-fit p-2 text-center text-[10px] text-gray-500'>
              {(rowIndex + 1).toString()}
            </td>
          )}
          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className=' p-2 text-center text-[10px] text-gray-500'
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
