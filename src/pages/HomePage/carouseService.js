import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { AppRoutes } from '../../helpers/app.routes';
import { getService } from '../../redux/actions/service';


const CarouseService = () => {
  const services = useSelector((state) => state.services.services);
  let dataArr = Array.from(services);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getService());
    //eslint-disable-next-line
  }, []);

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

  return (
    <section className="hotel-area section-padding overflow-hidden ">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading text-center">
              <h2 className="sec__title line-height-55">DỊCH VỤ TIME NAILS</h2>
            </div>
          </div>
        </div>
        <div className="row padding-top-50px">
          <div className="col-lg-12">
            <div className="hotel-card-wrap ">
              <Slider {...settings}>
                {dataArr.slice(0, 10).map((item) => (
                  <div className="card-item " key={item.id}>
                    <div className="card-img ">
                      <Link to={`/services/${item.id}`} className="d-block">
                        <img src={item.image} alt="hotel-img" />
                      </Link>
                    </div>
                    <div className="card-body text-center">
                      <h3 className="card-title">
                        <Link to={`/services/${item.id}`}>{item.name_cate_service}</Link>
                      </h3>
                      <div className="card-rating">
                        <span className="rating__text">{item.note}</span>
                      </div>
                      <div className="nav-btn">
                        <Link to={AppRoutes.booking} className="theme-btn">
                          ĐẶT LỊCH
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouseService;
