import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getCombo } from '../../redux/actions/combo';
import { AppRoutes } from '../../helpers/app.routes';

const ComboService = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 3,
    slidesToShow: 3,
    autoplay: true,
    cssEase: 'linear',
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
  const combos = useSelector((state) => state.combos.combos);
  const Arr = Array.from(combos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCombo());
     //eslint-disable-next-line
  }, []);
  return (
    <section className="destination-area section-bg section--padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading text-center">
              <h2 className="sec__title line-height-55">
                COMBO <span style={{ color: '#ffadad' }}>HOT</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row padding-top-50px">
          <div className="col-lg-12">
            <div className="hotel-card-wrap ">
              <Slider {...settings}>
                {Arr.slice(0, 6).map((item) => (
                  <div className="card-item " key={item.id}>
                    <div className="card-img ">
                      <Link to={`/combos/${item.id}`} className="d-block">
                        <img src={item.image} alt="hotel-img" />
                      </Link>
                    </div>
                    <div className="card-body text-center">
                      <h3 className="card-title">
                        <Link to={`/combos/${item.id}`}>{item.name_combo}</Link>
                      </h3>
                      <div className="card-rating">
                        <span className="rating__text">{item.short_description}</span>
                      </div>
                      <div className="nav-btn">
                        <Link to={AppRoutes.booking} className="theme-btn">
                          ĐẶT LỊCH
                        </Link>
                      </div>
                      {/* <div className="card-price d-flex align-items-center justify-content-between">
                        <p>
                          <span className="price__from">Giá </span>
                          <span className="price__num">
                            {item.total_price.toLocaleString('it-IT', { style: 'currency', currency: 'đ' })}
                          </span>
                        </p>
                        <div className="nav-btn">
                          <Link to={AppRoutes.booking} className="btn-text">
                            Xem chi tiết<i class="la la-angle-right"></i>
                          </Link>
                        </div>
                      </div> */}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        {/* <div className="row padding-top-50px">
          {Arr.slice(0, 6).map((item) => (
            <div className="col-lg-4" key={item.id}>
              <div className="card-item destination-card">
                <div className="card-img">
                  <img src={item.image} alt="destination-img" />
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title">
                    <Link to={`/combo-services/${item.id}`}>{item.name_combo}</Link>
                  </h3>
                  
                  <div className="card-price d-flex align-items-center justify-content-between">
                    <p>
                      <span className="price__from">Giá </span>
                      <span className="price__num">{item.total_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default ComboService;
