import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { Gallery } from '../../redux/actions/gallery';

const GalleryPage = () => {
  const getGallery = useSelector((state) => state.gallery.gallery);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Gallery());
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className="breadcrumb-area bread-bg-3">
        <div className="breadcrumb-wrap padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="breadcrumb-content">
                  <div className="section-heading">
                    <h2 className="sec__title text-white">Gallery</h2>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="breadcrumb-list text-right">
                  <ul className="list-items">
                    <li>
                      <Link to={AppRoutes.home}>Trang chủ</Link>
                    </li>
                    <li>Gallery</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bread-svg-box"></div>
        {/* end bread-svg */}
      </section>
      <section className="destination-area padding-top-100px padding-bottom-80px">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading text-center">
                <h2 className="sec__title">PHOTO ALBUM</h2>
              </div>
            </div>
          </div>
          <div className="row padding-top-60px">
            {getGallery && getGallery.length > 0 ? getGallery.map((item) => (
              <div className="col-lg-4 responsive-column" key={item.id}>
                <div className="card-item flight-card">
                  <div className="card-img">
                    <Link to={`/gallery/${item.id}`} className="d-block">
                      <img src={item.avatar} alt="destination-img" />
                    </Link>
                  </div>
                  <div className="card-body text-center">
                    <h3 className="card-title">
                      <Link to={`/gallery/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="card-meta">
                      {item.gallery.length} Ảnh
                      <i className="la la-angle-right" />
                    </p>
                    <div className="card-price d-flex align-items-center justify-content-between"></div>
                  </div>
                </div>
              </div>
            )):''}
          </div>

          {/* <div className="row">
            <div className="col-lg-12">
              <div className="btn-box mt-3 text-center">
                <button type="button" className="theme-btn">
                  <i className="la la-refresh mr-1" />
                  XEM THÊM
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
