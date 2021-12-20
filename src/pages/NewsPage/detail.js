import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getIdNews } from '../../redux/actions/news';
import NewsAPI from '../../api/newsAPI';
import { AppRoutes } from '../../helpers/app.routes';
// import TagCloud from './components/TagCloud';
import RelatedNews from './components/RelatedNews';
import Moment from 'react-moment';
import { truncateString } from '../../helpers/format';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const getNews = async () => {
      try {
        const { data } = await NewsAPI.get(id);
        setNews(data);
        dispatch(getIdNews(id));
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
     //eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className="breadcrumb-area bread-bg-9">
        <div className="breadcrumb-wrap padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="breadcrumb-content">
                  <div className="section-heading">
                    <h2 className="sec__title text-white">Bài Viết</h2>
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
                      <Link to={AppRoutes.news} className="text-uppercase">{truncateString(news.title || '', 20)}</Link>
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
            <div className="col-lg-12">
              <div className="card-item blog-card blog-card-layout-2 blog-single-card mb-5">
                <div className="card-body px-0 pb-0">
                  <h1 className="card-titles text-uppercase">{news.title}</h1>
                  <p className="card-meta pb-3">
                    <span className="post__author">
                      <Link to="#" className="text-gray">
                        By Admin
                      </Link>
                    </span>
                    <span className="post-dot" />
                    <span className="post__date">
                      <Moment format="DD/MM/YYYY">{news.created_at}</Moment>
                    </span>
                  </p>
                  <div dangerouslySetInnerHTML={{__html: news.description}}></div>
                </div>
                <div className="sidebar-widget">
                  <h3 className="title stroke-shape">Follow &amp; Connect</h3>
                  <ul className="social-profile">
                    <li>
                      <Link to="#">
                        <i className="lab la-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="lab la-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="lab la-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="lab la-linkedin-in"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="post-author-wrap"></div>
            </div>

            {/* <div className="col-lg-4">
              <div className="sidebar mb-0">
                <div className="sidebar-widget">
                  <div className="tab-content" id="myTabContent">
                    <h2 className="title">Danh mục bài viết</h2>
                    <div
                      className="tab-pane fade show active"
                      id="popular"
                      role="tabpanel"
                      aria-labelledby="popular-tab"
                    >
                      <div className="card-item card-item-list recent-post-card">
                        <div className="card-img">
                          <Link to="blog-single.html" className="d-block">
                            <img src="/assets/images/blog-img2.jpg" alt="blog-img" />
                          </Link>
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">
                            <Link to="blog-single.html">Cách thức để rở thành nail chuyên nghiệp</Link>
                          </h3>
                          <p className="card-meta">
                            <span className="post__date"> 1 March, 2020</span>
                            <span className="post-dot" />
                            <span className="post__time">3 Mins read</span>
                          </p>
                        </div>
                      </div>

                      <div className="card-item card-item-list recent-post-card">
                        <div className="card-img">
                          <Link to="blog-single.html" className="d-block">
                            <img src="/assets/images/blog-img2.jpg" alt="blog-img" />
                          </Link>
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">
                            <Link to="blog-single.html">Học nghề nail trải qua thất bại để thành công</Link>
                          </h3>
                          <p className="card-meta">
                            <span className="post__date"> 1 March, 2020</span>
                            <span className="post-dot" />
                            <span className="post__time">3 Mins read</span>
                          </p>
                        </div>
                      </div>

                      <div className="card-item card-item-list recent-post-card mb-0">
                        <div className="card-img">
                          <Link to="blog-single.html" className="d-block">
                            <img src="/assets/images/blog-img2.jpg" alt="blog-img" />
                          </Link>
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">
                            <Link to="blog-single.html">Nghề nail, khúc quanh cuộc đời</Link>
                          </h3>
                          <p className="card-meta">
                            <span className="post__date"> 1 March, 2020</span>
                            <span className="post-dot" />
                            <span className="post__time">3 Mins read</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sidebar-widget">
                  <h3 className="title stroke-shape">Archives</h3>
                  <div className="sidebar-list">
                    <ul className="list-items">
                      <li>
                        <i className="la la-dot-circle mr-2 text-color" />
                        <Link to="#">June 2015</Link>
                      </li>
                      <li>
                        <i className="la la-dot-circle mr-2 text-color" />
                        <Link to="#">May 2016</Link>
                      </li>
                      <li>
                        <i className="la la-dot-circle mr-2 text-color" />
                        <Link to="#">April 2017</Link>
                      </li>
                      <li>
                        <i className="la la-dot-circle mr-2 text-color" />
                        <Link to="#">February 2019</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <TagCloud/>
              </div>
            </div> */}
          </div>
          <RelatedNews id={id}/>
        </div>
      </section>
      
    </div>
  );
};

export default NewsDetail;
