import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';

const CallToAction = () => {
  return (
    <section className="low-fare-area padding-bottom-100px">
      <div className="container">
        <div className="row">
          <div className="discount-box">
            <div className="discount-img">
              <img src="/assets/images/scooter.jpg" alt="scooter-img" />
            </div>
            <div className="discount-content">
              <div className="section-heading">
                <p className="sec__desc dancing">Đặt lịch liền tay</p>
                <h2 className="sec__title mb-2 line-height-50 ">HƯỞNG NGAY ƯU ĐÃI</h2>
              </div>
              <div className="btn-box pt-4">
                <Link to={AppRoutes.booking} className="theme-btn border-0">
                  BOOKING ONLINE <i className="la la-arrow-right ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
