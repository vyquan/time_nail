import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import GalleryAPI from '../../api/galleryAPI';
import Fancybox from '../../components/Fancybox';
import { getIdGallery } from '../../redux/actions/gallery';
import OtherGallery from './otherGallery';

const GalleryDetail = () => {
  const { id } = useParams();
  const [dataGallery, setDataGallery] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getGallery = async () => {
      try {
        const { data } = await GalleryAPI.get(id);
        setDataGallery(data);
        dispatch(getIdGallery(id));
      } catch (error) {
        console.log(error);
      }
    };
    getGallery();
     //eslint-disable-next-line
  }, []);
  return (
    <div>
      <section className="breadcrumb-area bread-bg-10">
        <div className="breadcrumb-wrap padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-content text-center">
                  <div className="section-heading">
                    <h2 className="sec__title text-white">{dataGallery.tittle}</h2>
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
          <div className="row padding-top-50px">
            <Fancybox>
              {dataGallery.gallery && dataGallery.gallery.map((item)=>(
                <div className="col-lg-4" key={item.id}>
                <div className="gallery-card">
                  <a className="d-block" data-fancybox="gallery" href={item.url}>
                    <img src={item.url} alt="true" />
                  </a>
                </div>
              </div>
              ))}
            </Fancybox>
          </div>
        </div>
      </section>
      <OtherGallery id={id}/>
    </div>
  );
};

export default GalleryDetail;
