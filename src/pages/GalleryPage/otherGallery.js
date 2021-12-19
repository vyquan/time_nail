import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Gallery } from '../../redux/actions/gallery';

const OtherGallery = ({ id }) => {
  const idParam = parseInt(id);
  const getGallery = useSelector((state) => state.gallery.gallery);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Gallery());
    //eslint-disable-next-line
  }, []);
  return (
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
          {getGallery && getGallery.length > 0 ? getGallery.filter(gallery => gallery.id !== idParam).slice(0,3).map((item) => {
            if(item.id !== id){
              return (
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
              )
            }else{

            }
          }):''}
        </div>
      </div>
    </section>
  );
};

export default OtherGallery;
