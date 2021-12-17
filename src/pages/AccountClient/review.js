import React, { useEffect, useState } from 'react';
import {getFeedback} from '../../redux/actions/feedback';
import { useDispatch, useSelector } from 'react-redux'; 
import { Button, Modal, Pagination} from 'antd';


const Review = () => {
  const [page, setPage] = useState(1);
 const [postPerPage] = useState(4);
  const feedback = useSelector(state => state.feedback.feedback);

  const dispatch = useDispatch();
  // Panagition
  const firstPageIndex = (page - 1) * postPerPage;
  const lastPageIndex = firstPageIndex + postPerPage;
  const curentPosts = feedback?.slice(firstPageIndex, lastPageIndex);
  
useEffect(() => {
   dispatch(getFeedback());
   //eslint-disable-next-line
},[])
  return (
    <div className="col-lg-9">
      <div className="form-box">
        <div className="form-title-wrap">
          <h3 className="title">Đánh giá dịch vụ</h3>
          <p className="font-size-14">Đang xem {page} - {postPerPage} trong {feedback.length} mục</p>
        </div>
         {
           curentPosts.map(item => (
            <div className="form-content" key={item.id}>
            <div className="comments-list">
              <div className="comment mb-0 pb-0 border-bottom-0">
                <div className="comment-avatar">
                  <img className="avatar__img" alt="true" src={item.avatar} />
                </div>
                <div className="comment-body">
                  <div className="meta-data">
                    <h3 className="comment__author">{item.user.full_name}</h3>
                    <div className="meta-data-inner d-flex">
                      <span className="ratings d-flex align-items-center mr-1">
                        <i className="la la-star" />
                        <i className="la la-star" />
                        <i className="la la-star" />
                        <i className="la la-star" />
                        <i className="la la-star" />
                      </span>
                      <p className="comment__date">{item.user.address}</p>
                    </div>
                  </div>
                  <p className="comment-content mb-0">
                   {item.comment}
                  </p>
                </div>
              </div>
              {/* end comments */}
            </div>
            {/* end comments-list */}
          </div>  
           ))
         }
            <div className='container'>
            <nav aria-label="Page navigation example">
            <Pagination
            onChange={(value) => setPage(value)}
            pageSize={postPerPage}
            total={feedback.length}
            current={page}
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            />
            </nav>
            </div>
      </div>
    </div>
  );
};

export default Review;
