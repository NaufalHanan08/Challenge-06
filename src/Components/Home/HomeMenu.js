import React from 'react';
import { useSelector } from 'react-redux';
import SliderHome from '../Menu/SliderHome';
import PopularMovie from '../Movie/PopularMovie';

const HomeMenu = () => {
  const token = useSelector((state) => state.auth.token);

  const loginMessageStyle = {
    fontSize: '18px',
    marginTop: '100px',
    textAlign: 'center',
  };

  return (
    <div className="web-movie-app">
      <div>
        <SliderHome />
      </div>
      <div>{token ? <PopularMovie /> : <p style={loginMessageStyle}>Silakan login untuk melihat Popular Movies.</p>}</div>
      <footer
        style={{
          textAlign: 'center',
          backgroundColor: '#dc143c',
          color: 'whitesmoke',
          marginTop: 100,
          fontSize: 20,
          fontWeight: 'bold',
          height: 100,
        }}
      >
        <p
          style={{
            textAlign: 'center',
            backgroundColor: '#dc143c',
            color: 'whitesmoke',
            marginTop: 30,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Binar Web Movie ©2023 by Naufal Hanan
        </p>
      </footer>
    </div>
  );
};

export default HomeMenu;
