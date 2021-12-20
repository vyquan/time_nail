import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../../redux/actions/news';
import { Link } from 'react-router-dom';

const RelatedNews = ({ id }) => {
  const idParam = parseInt(id);
  const news = useSelector((state) => state.news.news);
  let data = Array.from(news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="section-heading text-center">
            <h2 className="sec__title">BÀI VIẾT KHÁC</h2>
          </div>
        </div>
      </div>
      <div className="row padding-top-60px">
        {data
          .filter((item) => item.id !== idParam)
          .slice(0, 3)
          .map((item, index) => (
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
    </>
  );
};

export default RelatedNews;
