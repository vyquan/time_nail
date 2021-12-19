import React, { useEffect, useState } from 'react';
import {getFeedback_Detail} from '../../redux/actions/feedback';
import { useDispatch } from 'react-redux'; 
import { Pagination} from 'antd';
import { useParams } from 'react-router-dom';
import feedbackAPI from '../../api/feedback';


const Review = () => {
  const [feedback, setFeedback] = useState([]);
  const [page, setPage] = useState(1);
 const [postPerPage] = useState(4);
   const {id} = useParams();
  
  const dispatch = useDispatch();
  // Panagition
  const firstPageIndex = (page - 1) * postPerPage;
  const lastPageIndex = firstPageIndex + postPerPage;
  const curentPosts = feedback?.slice(firstPageIndex, lastPageIndex);
  
    useEffect(() => {
       const feedback_detail = async() => {
         try {
           const {data} = await feedbackAPI.getDetail(id);
           setFeedback(data);
           dispatch(getFeedback_Detail(id));
           //eslint-disable-next-line
         } catch (error) {
           console.log(error);
         }
       }
       feedback_detail()
},[])

  return (
    <div className="col-lg-9">
      <div className="form-box">
        <div className="form-title-wrap">
          <h3 className="title">Đánh giá dịch vụ</h3>
          {
            feedback && feedback.length > 0 ?
            (<p className="font-size-14">Đang xem {page} trong {feedback.length} mục</p>) : ('')
          }
        </div>
        {   
           feedback && feedback.length > 0 ?
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
                    <div className="meta-data-inner ">
                      <span className="ratings d-flex align-items-center mr-1">
                       {
                         (() => {
                            if(item.number_star === 5) {
                            return <>  
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" />
                            <i className="la la-star" /></>
                            }
                            else if(item.number_star === 4) {
                              return <>  
                              <i className="la la-star" />
                              <i className="la la-star" />
                              <i className="la la-star" />
                              <i className="la la-star" /></>
                            }
                            else if(item.number_star === 3) {
                              return <>  
                              <i className="la la-star" />
                              <i className="la la-star" />
                              <i className="la la-star" /></>
                            }
                            else if(item.number_star === 2) {
                              return <>  
                              <i className="la la-star" />
                              <i className="la la-star" /></>
                            }
                            else if(item.number_star === 1) {
                              return <>  
                              <i className="la la-star" /></>
                            }
                           
                         })()
                       }
                       
                      </span>
                    <div>
                    <p className="comment__date"><strong>Ngày đánh giá: </strong>{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                   
                    </div>
                  </div>
                  <p className="comment__date ">
                  <strong>Nội dung: </strong>{item.comment}
                  </p>
                </div>
              </div>
              {/* end comments */}
            </div>
            {/* end comments-list */}
          </div>  
           )) : (  <div className='container'>
            Bạn chưa có phản hồi nào về chúng tôi
          </div>)
         }
     
            <div className='container'>
            <nav aria-label="Page navigation example">
           {
             feedback && feedback.length > 0 ?
             (
              <Pagination
              onChange={(value) => setPage(value)}
              pageSize={postPerPage}
              total={feedback.length}
              current={page}
              style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              />
             ) : ('')
           }
            </nav>
            </div>
      </div>
    </div>
  );
};

export default Review;
