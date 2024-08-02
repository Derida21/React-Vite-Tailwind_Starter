const Panel = ({ text }) => {
  return (
    <div className='w-full px-20 -mt-8'>
      <div className='flex w-full font-[Poppins] text-gray-500 text-sm font-medium px-8 py-5 bg-white/50 rounded-xl shadow backdrop-blur-[10px] flex-col justify-center items-start '>
        E-Arsip / {text}
      </div>
    </div>
  );
};

export default Panel;
