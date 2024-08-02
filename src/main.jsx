// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Helmet } from 'react-helmet';

// import '@/index.css';
// import App from '@/App';

// ReactDOM.render(
//   <React.StrictMode>
//     <Helmet
//       defaultTitle='Vite React Tailwind Starter'
//       titleTemplate='%s | Vite React Tailwind Starter'
//     >
//       <meta charSet='utf-8' />
//       <html lang='id' amp />
//     </Helmet>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

//import App from '@/App';

import React from 'react';
import ReactDOM from 'react-dom/client';
import '../assets/main.css';

import App from './App.jsx';
import Provider from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider>
    <App />
  </Provider>
  // </React.StrictMode>
);
