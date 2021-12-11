import React, {  useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import historyBookAPI from '../../api/historyBook';
import { historyBookInfo } from '../../redux/actions/historyBook';
import { Modal, Pagination} from 'antd';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';

const BookingHistory = () => {
  const [HistoryBook, setHistoryBook] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // panigation
  const [total, setTotal] = useState("");
   const [page, setPage] = useState(1);
  const [postPerPage] = useState(5);
  const dispatch = useDispatch();
  const {id} = useParams();
   useEffect(() => {
    const setHistoryss = async () => {
      try {
        const { data } = await historyBookAPI.getHistoryMember(id)
        setHistoryBook(data);
        setTotal(data.length);
        dispatch(historyBookInfo(id));
      } catch (error) {
        console.log(error);
      }      
    };
    setHistoryss();
     //eslint-disable-next-line
   },[])
   // ShowModal
   const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Panagition
    const firstPageIndex = (page - 1) * postPerPage;
    const lastPageIndex = firstPageIndex + postPerPage;
    const curentPosts = HistoryBook?.slice(firstPageIndex, lastPageIndex);
    const [data, setData] = useState([]);
 
  
   const openDetails = id => e  => {
    const found = HistoryBook.find(element => element.id === id);
    console.log(found);
    setData(found);
    }

   


  return (
    <div className="col-lg-9">
      <div className="form-box">
        <div className="form-title-wrap">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h3 className="title">Lịch sử của tôi</h3>
              {/* <p className="font-size-14">Showing 1 to 7 of 17 entries</p> */}
            </div>
          </div>
        </div>
        <div className="form-content">
          <div className="table-form table-responsive">
            {
               HistoryBook && HistoryBook.length > 0 ? 
               (
                <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Ngày</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Nhân viên</th>
                    <th scope="col">Dịch vụ</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Xem thêm</th>
                  </tr>
                </thead>
                <tbody>
                   {
                     curentPosts && 
                     curentPosts.map(item => (
                      <tr key={item.id}>
                      <td>{item.date_work}</td>
                      <td>{item.time_work}</td>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Chu Thị Quỳnh</h3>
                        </div>
                      </td>
                      <td>Sơn móng</td>
                      <td>
                        {
                          (() => {
                            if(item.status_bill === 1) {
                             return <span className="badge badge-warning py-1 px-2">Chờ xác nhận</span>   
                            }else if(item.status_bill === 2) {
                              return <span className="badge badge-danger py-1 px-2">Xác nhận thành công</span>   
                            }else if(item.status_bill === 3) {
                              return <span className="badge badge-info py-1 px-2">Đang làm</span>   
                            }else if(item.status_bill === 4) {
                              return <span className="badge badge-success py-1 px-2">Hoàn thành</span>   
                            }
                            else if(item.status_bill === 5) {
                              return <span className="badge badge-danger py-1 px-2">Hủy</span>   
                            }
                          })()
                        }
                      </td>
                      <td onClick={openDetails(item.id)}>
                      <div className="table-contents">
                        <a href="#/" onClick={showModal} >
                          <i className="la la-eye" />
                        </a>
                      </div>
                      <Modal title="Chi tiết"  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1200}>
                      <div className="form-contents">
                <div className="table-form table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Tổng thời gian</th>
                        <th scope="col">Số lượng người</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Combo</th> 
                        <th scope="col">Mã giảm giá</th> 
                      </tr>
                    </thead>
                    <tbody>
                           <tr key={data.id}>
                          <td>{data.total_time_execution} phút</td>
                           <td>{data.total_people} người</td>
                           <td>{data.total_bill}</td>
                           <td>{data.phone}</td>
                           <td> Sơn Móng + Sơn Gel Gelish+Chà Lớp Bóng Trên Móng</td> 
                           <td>{data.code_discount}</td>
                       </tr>
                        
                    </tbody>
                  </table>
                </div>
              </div>
                  </Modal>
                  </td>
              </tr>
                ))
              }
                </tbody>
              </table>     
               ) : (<div>
                 Bạn chưa đặt lịch <Link to={AppRoutes.booking}>bạn có thể bấm qua link này để đăng ký đặt lịch</Link>
              </div>)
            }
          </div>
        </div>
        {
          HistoryBook && HistoryBook.length > 0 ? (
            <div className='container'>
           <div className='row'>
           <div className='col-lg-6 col-md-6 col-sm-12 col-12 show-left' style={{paddingLeft: "40px"}}>
                <p>Showing {page} to {postPerPage * page} of {HistoryBook.length} entries</p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 show-right" style={{paddingRight: "40px"}}>
            <nav aria-label="Page navigation example">
            <Pagination
            onChange={(value) => setPage(value)}
            pageSize={postPerPage}
            total={total}
            current={page}
            />
            </nav>
          </div>
           </div>
            </div>
          ) : ('')
        }
      </div>
    </div>
  );
};

export default BookingHistory;
