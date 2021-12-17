import React from 'react';
import { Link } from 'react-router-dom';
import Fancybox from '../../components/Fancybox';

const GalleryDetail = () => {
  return (
    <div>
      <section className="breadcrumb-area bread-bg-10">
        <div className="breadcrumb-wrap padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-content text-center">
                  <div className="section-heading">
                    <h2 className="sec__title text-white"> VERY GOOD NAIL</h2>
                  </div>
                  <span className="arrow-blink">
                    <i className="la la-arrow-down" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bread-svg-box">
          <svg className="bread-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">
            <polygon points="100 0 50 10 0 0 0 10 100 10" />
          </svg>
        </div>
      </section>
      <section className="gallery-area section--padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading text-center">
                <h2 className="sec__title">Gallery VERY GOOD NAIL</h2>
                <p className="sec__desc pt-2">
                  We used bootstrap grid layout format You can change grid format from 2 to 5 responsive-columns
                </p>
              </div>
            </div>
          </div>
          <div className="row padding-top-50px">
            <Fancybox>
              <div className="col-lg-4">
                <div className="gallery-card">
                  <a className="d-block" data-fancybox="gallery" href="../assets/images/img5.jpg">
                    <img src="../assets/images/img5.jpg" alt="true" />
                  </a>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="gallery-card">
                  <a className="d-block" data-fancybox="gallery" href="../assets/images/img29.jpg">
                    <img src="../assets/images/img29.jpg" alt="true" />
                  </a>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="gallery-card">
                  <a className="d-block" data-fancybox="gallery" href="../assets/images/img30.jpg">
                    <img src="../assets/images/img30.jpg" alt="true" />
                  </a>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="gallery-card">
                  <a className="d-block" data-fancybox="gallery" href="../assets/images/img31.jpg">
                    <img src="../assets/images/img31.jpg" alt="true" />
                  </a>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="gallery-card">
                  <a className="d-block" data-fancybox="gallery" href="../assets/images/img32.jpg" alt="true">
                    <img src="../assets/images/img32.jpg" alt="true" />
                  </a>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="gallery-card">
                  <a className="d-block" data-fancybox="gallery" href="../assets/images/img33.jpg" alt="true">
                    <img src="../assets/images/img33.jpg" alt="true" />
                  </a>
                </div>
              </div>
            </Fancybox>
          </div>
        </div>
      </section>
      <section className="destination-area padding-bottom-80px">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading text-center">
                <h2 className="sec__title">PHOTO ALBUM KHÁC</h2>
              </div>
            </div>
          </div>
          <div className="row padding-top-60px">
            <div className="col-lg-4 responsive-column">
              <div className="card-item flight-card">
                <div className="card-img">
                  <Link to="/gallery-detail" className="d-block">
                    <img src="./assets/images/img15.jpg" alt="true" />
                  </Link>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title">
                    <Link to="/gallery-detail">London to Paris</Link>
                  </h3>
                  <p className="card-meta">
                    12 Ảnh
                    <i className="la la-angle-right" />
                  </p>
                  <div className="card-price d-flex align-items-center justify-content-between"></div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 responsive-column">
              <div className="card-item flight-card">
                <div className="card-img">
                  <Link to="/gallery-detail" className="d-block">
                    <img src="./assets/images/img16.jpg" alt="true" />
                  </Link>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title">
                    <Link to="/gallery-detail">Dubai to Spain</Link>
                  </h3>
                  <p className="card-meta">
                    20 Ảnh <i className="la la-angle-right" />
                  </p>
                  <div className="card-price d-flex align-items-center justify-content-between"></div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 responsive-column">
              <div className="card-item flight-card">
                <div className="card-img">
                  <Link to="/gallery-detail" className="d-block">
                    <img src="./assets/images/img17.jpg" alt="true" />
                  </Link>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title">
                    <Link to="/gallery-detail">Bangkok to Australia</Link>
                  </h3>
                  <p className="card-meta">
                    10 Ảnh <i className="la la-angle-right" />
                  </p>
                  <div className="card-price d-flex align-items-center justify-content-between"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryDetail;
