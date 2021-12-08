import React from 'react';
import BannerSlider from './banner';
import About from './about';
import CarouseFeedback from './carouseFeedback';
import CarouseService from './carouseService';
import ComboService from './comboService';
import News from './news';

const HomePage = () => {
  return (
    <div>
      <BannerSlider />
      <CarouseService />
      <ComboService />
      <News />
      <CarouseFeedback />
      <About />
    </div>
  );
};

export default HomePage;
