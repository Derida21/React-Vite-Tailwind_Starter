export const Thumbnail = ({ bg, note, title, description }) => {
  return (
    <div
      className='relative w-full flex flex-col p-3 h-[150px] md:h-[350px] lg:h-[500px] xl:h-[600px] justify-between lg:p-[60px] rounded-[12px]'
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='w-full h-full bg-black absolute left-0 top-0 bg-opacity-50 rounded-xl'></div>
      <h1 className='w-fit z-10 p-2 md:px-5 md:py-3 bg-teal-700 text-[6px] md:text-[12px] lg:text-[14px] rounded md:rounded-md justify-center items-center text-white lg:text-lg font-[Poppins]'>
        {note}
      </h1>
      <div className='flex flex-col gap-3 z-10'>
        <h1 className=' text-[8px] md:text-xs lg:text-[20px] font-bold font-[Poppins] text-white'>
          {title}
        </h1>
        <div className=' text-justify text-white text-[5px] md:text-xs lg:text-sm font-medium font-[Poppins] line-clamp-3'>
          {description}
        </div>
      </div>
    </div>
  );
};
