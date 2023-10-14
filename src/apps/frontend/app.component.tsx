import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { Config } from './helpers';
import { About, Login, NotFound, SignUp, Home } from './pages';
import InspectLet from './vendor/inspectlet';

import './app.global.scss';

export default function App(): React.ReactElement {
  useEffect(() => {
    const inspectletKey = Config.getConfigValue('inspectletKey');

    if (inspectletKey) {
      InspectLet();
    }
  }, []);

  return (
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </div>
      </Router>
  );
}
