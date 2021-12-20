import React, { useEffect } from 'react';
import { useState } from 'react';
import Slider from 'react-slick';
import SlideAPI from '../../api/slideAPI';
import LeftArrow from '../../assets/icons/left-arrow.svg';
import RightArrow from '../../assets/icons/right-arrow.svg';

const BannerSlider = () => {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    const getSlider = async () => {
      try {
        const { data: slider } = await SlideAPI.getAll();
        setSlider(slider);
      } catch (error) {
        console.log(error);
      }
    };
    getSlider();
  }, []);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div className="btn-prev">
      <img src={LeftArrow} alt="prevArrow" {...props} />
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div className="btn-next">
      <img src={RightArrow} alt="nextArrow" {...props} />
    </div>
  );
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 3000,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  };
  return (
    <section className="hero-wrapper padding-bottom-50px">
      <div className="container-fluid" style={{ padding: '0px' }}>
        <Slider {...settings}>
          {slider.map((item, index) =>(
            <div key={index}>
            <img
              src={item.image}
              className="w-100 h-100"
              alt={item.name_slider}
            />
          </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
export default BannerSlider;
