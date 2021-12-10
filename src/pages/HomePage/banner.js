import React from 'react';
import Slider from 'react-slick';
import LeftArrow from '../../assets/icons/left-arrow.svg';
import RightArrow from '../../assets/icons/right-arrow.svg';

const BannerSlider = () => {
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
    autoplay: true,
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
          <div>
            <img
              src="https://nailroom.vn/wp-content/uploads/bfi_thumb/Cover-odou4k6zt1b7c8hi14o5t9gbrcgbb5tymcd3a41lii.png"
              className="w-100 h-100"
              alt="true"
            />
          </div>
          <div>
            <img
              src="https://nailroom.vn/wp-content/uploads/bfi_thumb/Linh-NR-pcgaxtm5efv7joestdfq6mmqnlksemeyc95ma0vk16.png"
              className="w-100 h-100"
              alt="true"
            />
          </div>
          <div>
            <img
              src="https://nailroom.vn/wp-content/uploads/bfi_thumb/NR169-HethongNailRoom-Cover-pcgafipabkt7h0zwoym94qwm8hshisr45nu8v20j6y.png"
              className="w-100 h-100"
              alt="true"
            />
          </div>
          <div>
            <img
              src="https://nailroom.vn/wp-content/uploads/bfi_thumb/10-1cover-ped1gcunyj52dj25dseb4ylzit3rg5wgpv17ilbc4q.png"
              className="w-100"
              alt="true"
            />
          </div>
        </Slider>
      </div>
    </section>
  );
};
export default BannerSlider;
