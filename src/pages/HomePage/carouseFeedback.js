import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import {getFeedback} from '../../redux/actions/feedback';
const CarouseFeedback = () => {

    const feedback = useSelector(state => state.feedback.feedback);
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(getFeedback());
       //eslint-disable-next-line
    },[])

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    cssEase: 'linear',
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <section className="testimonial-area section-padding section-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading text-center mb-0">
              <h2 className="sec__title">CẢM NHẬN VỀ TIME NAILS</h2>
            </div>
          </div>
        </div>
        <div className="row padding-top-50px">
          <div className="col-lg-12">
            <Slider {...settings}>
              {
              // feedback && feedback.user === 4 ?
              feedback.slice(0,3).map((item, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testi-desc-box text-center">
                    <p className="testi__desc">
                      <i className="la la-quote-left"></i> {item.comment} <i className="la la-quote-right"></i>
                    </p>
                  </div>
                  <div className="author-content d-flex justify-content-center">
                    <div>
                      <img className="author-img" src={item.avatar} alt="true" />
                      <div className="author-bio text-center">
                        <h4 className="author__title">{item.full_name}</h4>
                        <span className="ratings d-flex align-items-center mr-1">
                       {
                         (() => {
                            if(item.number_star === 5) {
                            return <>  
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" /></>
                            }
                            else if(item.number_star === 4) {
                              return <>  
                              <i className="la la-star" />
                              <i className="la la-star" />
                              <i className="la la-star" />
                              <i className="la la-star" /></>
                            }
                            else if(item.number_star === 3) {
                              return <>  
                              <i className="la la-star" />
                              <i className="la la-star" />
                              <i className="la la-star" /></>
                            }
                            else if(item.number_star === 2) {
                              return <>  
                              <i className="la la-star" />
                              <i className="la la-star" /></>
                            }
                            else if(item.number_star === 1) {
                              return <>  
                              <i className="la la-star" /></>
                            }
                           
                         })()
                       }
                       
                      </span>
                        <span className="author__meta">{item.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CarouseFeedback;
