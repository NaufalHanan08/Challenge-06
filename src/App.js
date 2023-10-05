import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick-theme.css';
import { Routes, Route } from 'react-router-dom';
import HomeMenu from './Components/Home/HomeMenu';
import Details from './Components/Fitur/Details';

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<HomeMenu />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
