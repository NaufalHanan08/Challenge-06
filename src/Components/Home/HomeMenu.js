import React from 'react';
import SliderHome from '../Menu/SliderHome';
import PopularMovie from '../Movie/PopularMovie';

const HomeMenu = () => (
  <div className="web-movie-app">
    <div>
      <SliderHome />
    </div>

    <div>
      <PopularMovie />
    </div>
  </div>
);

export default HomeMenu;
