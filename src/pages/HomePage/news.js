import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { getNews } from '../../redux/actions/news';

const News = () => {
  const news = useSelector((state) => state.news.news);
  let data = Array.from(news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
     //eslint-disable-next-line
  }, []);
  return (
    <>
      <section className="card-area section--padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading text-center">
                <h2 className="sec__title">BÀI VIẾT</h2>
              </div>
            </div>
          </div>
          <div className="row padding-top-50px">
            {data.slice(0, 3).map((item) => (
              <div className="col-lg-4 responsive-column" key={item.id}>
                <div className="card-item blog-card">
                  <div className="card-img">
                    <img src={item.image} alt="blog-img" />
                  </div>
                  <div className="card-footer d-flex align-items-center justify-content-center text-center">
                    <div className="author-content d-flex align-items-center">
                      <div className="author-bio">
                        <Link to={`/news/${item.id}`} className="author__title" style={{textTransform: 'uppercase'}}>
                          {item.title}
                        </Link>
                      </div>
                    </div>
                    {/* <div className="post-share">
                      <ul>
                        <li>
                          <i className="la la-share icon-element" />
                          <ul className="post-share-dropdown d-flex align-items-center">
                            <li>
                              <Link to="#">
                                <i className="lab la-facebook-f" />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="lab la-twitter" />
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="lab la-instagram" />
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="btn-box mt-3 text-center">
                <Link to={AppRoutes.news.list} type="button" className="theme-btn">
                  DANH SÁCH BÀI VIẾT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section-block"></div>
    </>
  );
};

export default News;
