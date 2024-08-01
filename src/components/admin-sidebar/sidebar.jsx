import React, { useContext, useState } from 'react';
import { Context } from '../../context';
import { Link } from 'react-router-dom';
import { Data } from '../../dates/jummy';
import { CSSTransition } from 'react-transition-group';
import './transition.css'; // Import CSS transitions

const Sidebar = () => {
  const [activeCat, setActiveCat] = useState('Sales');
  const [expandedSections, setExpandedSections] = useState({});
  const { state, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: 'SET_AUTH', payload: { token: null, user: null } });
    localStorage.removeItem('auth');
    window.location.reload(); // to force re-render and redirect to login
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={`${state.toggleNavbar ? 'block' : 'hidden'}`}>
      <div
        onClick={() => {
          dispatch({ type: 'SET_TOOGLE_NAVBAR', payload: false });
        }}
        className='fixed md:hidden z-40 left-0 top-0 right-0 bottom-0 bg-slate-700 backdrop-blur-3xl opacity-60'
      ></div>
      <div className='h-full z-40 fixed drop-shadow-2xl'>
        <div className=' h-full overflow-hidden md:overflow-auto py-6 bg-white border-r border-neutral-200 flex-col justify-start items-start gap-4 inline-flex'>
          {Data.map((section, sectionIndex) => (
            <div key={sectionIndex} className='w-full'>
              {section.inside ? (
                <div>
                  <div
                    onClick={() => toggleSection(section.icon)}
                    className='self-stretch duration-300 cursor-pointer px-[30px] py-3.5 justify-start items-center gap-3 bg-transparent bg-neutral-200 hover:bg-neutral-300 flex'
                  >
                    <div className='w-8 h-8 flex items-center justify-center p-2 bg-teal-500 rounded-full '>
                      <i className={`text-sm text-white ${section.icon}`}></i>
                    </div>
                    <div className='font-[Poppins] grow shrink basis-0 text-zinc-500 font-normal text-sm leading-tight text-nowrap'>
                      {section.text}
                    </div>
                    <div className='text-zinc-500 ml-auto text-xs'>
                      <i
                        className={`fa-solid ${
                          expandedSections[section.icon]
                            ? 'fa-chevron-up'
                            : 'fa-chevron-down'
                        }`}
                      ></i>
                    </div>
                  </div>
                  <CSSTransition
                    in={expandedSections[section.icon]}
                    timeout={300}
                    classNames='dropdown'
                    unmountOnExit
                  >
                    <div>
                      {section.inside.map(({ text, icon, url }, index) => (
                        <Link
                          to={`/admin-dashboard/${url}`}
                          onClick={() => setActiveCat(text)}
                          key={index}
                          className={`font-[Poppins] duration-300 pl-[74px] ${
                            activeCat === text
                              ? ' bg-opacity-80 '
                              : 'text-zinc-500 hover:bg-neutral-200'
                          } py-3.5 justify-start items-center gap-3 flex`}
                        >
                          <div
                            className={`text-xs  ${
                              activeCat === text
                                ? 'text-black font-bold'
                                : 'text-zinc-500 font-normal'
                            } text-sm leading-tight`}
                          >
                            {text}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CSSTransition>
                </div>
              ) : (
                <Link
                  to={`/admin-dashboard/${section.url}`}
                  onClick={() => setActiveCat(section.text)}
                  className={`self-stretch duration-300 cursor-pointer px-[30px] py-3.5 justify-start items-center gap-3 ${
                    activeCat === section.text
                      ? 'bg-teal-200 '
                      : 'text-zinc-500 hover:bg-neutral-200'
                  } flex`}
                >
                  <div className='w-8 h-8 flex items-center justify-center p-2 bg-teal-500 rounded-full '>
                    <i className={`text-sm text-white ${section.icon}`}></i>
                  </div>
                  <div className='font-[Poppins] grow shrink basis-0 text-zinc-500 font-normal text-sm leading-tight'>
                    {section.text}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
