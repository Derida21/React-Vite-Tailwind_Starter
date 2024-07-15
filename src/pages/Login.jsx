import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAppContext from '../context/useAppContext';
import bg from '../../assets/img/bg.png';
import Logo from '../components/home_component/Logo';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'http://nurul-huda.org/api/auth/login',
        { email, password }
      );
      const data = response.data;

      if (response.status === 200) {
        const authData = {
          token: data.data.token,
          user: data.data.user,
        };

        dispatch({
          type: 'SET_AUTH',
          payload: authData,
        });

        console.log('Token:', data.data.token);
        console.log('AuthData:', authData);
        toast.success('Login successful!');
        navigate('/admin-dashboard/main');
      } else {
        toast.error(data.message || 'Login failed!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' flex items-center justify-center bg-slate-50 md:px-[60px] lg:px-20 md:pt-36 md:pb-20 xl:p-[160px] '>
      <div className='flex flex-col md:flex-row rounded-lg shadow-lg w-full'>
        <div
          className='w-full md:rounded-l-xl flex items-center justify-center pt-20 pb-5 md:py-[120px]'
          style={{
            backgroundImage: `url(${bg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <Logo
            className='flex flex-col items-center gap-3'
            logoclassName='w-[120px]'
            titleclassName='flex flex-col items-center lg:gap-2'
            text='Kampung Eka Sapta'
            textclassName='font-[Poppins] text-[20px] lg:text-[36px] font-bold text-white'
            addres='Kec. Talisayan Kab. Berau Kalimantan Timur'
            addresclassName='font-[Poppins] text-[10px] lg:text-[17px] font-normal text-white'
          />
        </div>
        <div className='w-full flex items-center justify-center bg-white rounded-r-xl'>
          <form onSubmit={handleLogin} className='space-y-6 py-5 xl:w-[348px]'>
            <div className='space-y-2'>
              <label className='block text-gray-700 text-sm font-[Poppins]'>
                Email
              </label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='py-2 px-5 border text-gray-500 border-gray-300 w-full rounded-2xl focus:outline-none focus:ring-1 focus:ring-teal-500'
                required
              />
            </div>
            <div className='space-y-2'>
              <label className='block text-gray-700 text-sm font-[Poppins]'>
                Password
              </label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='py-2 px-5 border text-gray-500 border-gray-300 w-full rounded-2xl focus:outline-none focus:ring-1 focus:text-gray-200 focus:ring-teal-500'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full border border-teal-500 text-teal-500 bg-white py-3 text-[10px] rounded-xl hover:bg-teal-500 hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
              disabled={loading}
            >
              {loading ? (
                <div className='flex justify-center items-center'>
                  <svg
                    className='animate-spin h-5 w-5 text-white mr-3'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.042.623 3.937 1.688 5.482l2.312-2.191zm5.291-2.291l-2.291 2.291C8.104 16.968 9.437 17.5 11 17.5v-4h-4v2h2z'
                    ></path>
                  </svg>
                  Harap tunggu sebentar
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
