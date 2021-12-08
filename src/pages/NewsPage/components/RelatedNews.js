import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../../redux/actions/news';
import { Link } from 'react-router-dom';

const RelatedNews = () => {
  const news = useSelector((state) => state.news.news);
  let data = Array.from(news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
     //eslint-disable-next-line
  }, []);
  return (
    <>
      <h2 className="title">Bài viết liên quan</h2>
      <div className="row pt-4">
        {data.slice(0,3).map((item, index) => (
          <div className="col-lg-4 responsive-column" key={index}>
            <div className="card-item blog-card">
              <div className="card-img">
                <img src="/assets/images/blog-img.jpg" alt="blog-img" />
              </div>
              <div className="card-footer d-flex align-items-center justify-content-center text-center">
                <div className="post-share">
                  <h3 className="card-title line-height-26">
                    <Link to={`/news-detail/${item.id}`} style={{ color: '#000', textTransform: 'uppercase' }}>
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
