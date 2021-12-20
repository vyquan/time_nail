import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { getNews } from '../../redux/actions/news';
// import Moment from 'react-moment';

const NewsPage = () => {
  const news = useSelector((state) => state.news.news);
  let data = Array.from(news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="breadcrumb-area bread-bg-9">
        <div className="breadcrumb-wrap padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="breadcrumb-content">
                  <div className="section-heading">
                    <h2 className="sec__title text-white">Bài viết</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="breadcrumb-list text-right">
                  <ul className="list-items">
                    <li>
                      <Link to={AppRoutes.home}>Trang chủ</Link>
                    </li>
                    <li>
                      <Link to={AppRoutes.news}>Bài viết</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card-area section--padding">
        <div className="container">
          <div className="row">
            {data.map((item, index) => (
              <div className="col-lg-4 responsive-column" key={index}>
                <div className="card-item blog-card">
                  <div className="card-img">
                    <img src={item.image} alt="blog-img" />
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-center text-center">
                    <div className="post-share">
                      <h3 className="card-title line-height-26">
                        <Link to={`/news/${item.id}`} style={{ color: '#000', textTransform: 'uppercase' }}>
                          {item.title}
                        </Link>
                      </h3>
                      {/* <p className="card-meta">
                        <span className="post__date" style={{ color: '#000' }}>
                          <Moment format="DD/MM/YYYY">{item.created_at}</Moment>
                        </span>
                        <span className="post-dot" />
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="btn-box mt-3 text-center">
                <button type="button" className="theme-btn">
                  <i className="la la-refresh mr-1" />
                  XEM THÊM
                </button>
                <p className="font-size-13 pt-2">Showing 1 - 6 of 24 Cruises</p>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default NewsPage;
