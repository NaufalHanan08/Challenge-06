import React from 'react';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick-theme.css';
import { Routes, Route } from 'react-router-dom';
import HomeMenu from './Components/Home/HomeMenu';
import Details from './Components/Fitur/Details';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="604818404990-r0vci8876jbjc2ajmgd5f5lijo7eo09d.apps.googleusercontent.com">
        <div>
          <Routes>
            <Route index element={<HomeMenu />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
