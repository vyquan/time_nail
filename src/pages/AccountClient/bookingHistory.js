import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import historyBookAPI from '../../api/historyBook';
import { historyBillDetail, historyBookInfo } from '../../redux/actions/historyBook';
import { Button, Modal, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';

const BookingHistory = React.memo(() => {
  const [HistoryBook, setHistoryBook] = useState([]);
 

  const [isModalVisible, setIsModalVisible] = useState(false);
  // panigation
  const [total, setTotal] = useState('');
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(5);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const setHistoryss = async () => {
      try {
        const { data } = await historyBookAPI.getHistoryMember(id);
        setHistoryBook(data);
        setTotal(data.length);

        dispatch(historyBookInfo(id));
      } catch (error) {
        console.log(error);
      }
    };
    setHistoryss();
    //eslint-disable-next-line
  }, []);
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
    

     const {bill} = useSelector(state => state.listbookHistory.billDetail)
    //  console.log(bill.check_fb)
    // const dtass = Array.from(billDetail)
    //  console.log(dtass.nguoi1.service.map(item => {
    //    return (
    //       <div key={item.id}>
    //         <h3>{item.combo.name_combo}</h3>
    //       </div>
    //    )
    //  }))
   //  console.log(billDetail.bill.check_fb)
      //  const datasss = Object.assign(billDetail)
        // console.log( datasss.bill.map(item => {
        //   return (
        //     <div key={item.id}>
        //          {item.total_bill}
        //     </div>
        //   )
        // }))
      const showDetailBill = async (item) => {
          dispatch(historyBillDetail(item))
      }
   
     
      // console.log(bookDetail.bill.code_bill)
 
  

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
            {HistoryBook && HistoryBook.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Ngày</th>
                    <th scope="col">Thời gian</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col"></th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {curentPosts &&
                    curentPosts.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.date_work}</td>
                        <td>{item.time_work}</td>
                        <td>{item.phone}</td>
                        
                        <td>
                          {item.status_bill === 4 ? (
                            item.check_fb !== null ? (
                              <Link
                                to={`/feedback/${item.id}`}
                                hidden
                                style={{ textDecoration: 'underline'}}
                              >
                                Đánh giá dịch vụ
                              </Link>
                            ) : (
                              <Link
                                to={`/feedback/${item.id}`}
                                style={{ textDecoration: 'underline'}}
                              >
                                Đánh giá dịch vụ
                              </Link>
                            )
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {(() => {
                            if (item.status_bill === 1) {
                              return <span className="badge badge-warning py-1 px-2">Chờ xác nhận</span>;
                            } else if (item.status_bill === 2) {
                              return <span className="badge badge-primary py-1 px-2">Xác nhận thành công</span>;
                            } else if (item.status_bill === 3) {
                              return <span className="badge badge-info py-1 px-2">Đang làm</span>;
                            } else if (item.status_bill === 4) {
                              return <span className="badge badge-success py-1 px-2">Hoàn thành</span>;
                            } else if (item.status_bill === 5) {
                              return <span className="badge badge-danger py-1 px-2">Hủy</span>;
                            }
                          })()}
                        </td>
                        <td onClick={() =>   showDetailBill(item.id)}>
                          <div className="table-contents">
                            <a href="#/" onClick={showModal}>
                              <i className="la la-eye" />
                            </a>
                          </div>
                          <Modal
                            title="Chi tiết"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={800}
                            footer={false}
                          >
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="card-item user-card card-item-list mt-4 mb-0">
                                  <div className="card-body">
                                    <h3 className="card-title">Chi tiết </h3>
                                    <div className="d-flex justify-content-between pt-3">
                                      {/* {
                                        billDetail.bill &&
                                        billDetail.bill.map(item => (
                                        
                                            <ul className="list-items list-items-2 flex-grow-1" key={item.id}>
                                            <li>
                                              <span>Giá:</span>
                                              {item.total_bill?.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                              })}
                                            </li>
                                            <li>
                                              <span>Mã giảm giá:</span>
                                              {item.code_discount}
                                            </li>
                                            <li>
                                              <span>Mã hóa đơn:</span>
                                              {item.code_bill}
                                            </li>
                                            <li>
                                              <span>Feedback:</span>
                                              {item.check_fb}
                                            </li>
                                            <li>
                                              <span>Ghi chú hóa đơn:</span>
                                              {item.note_bill}
                                            </li>
                                          </ul>
                                        
                                        ))
                                      } */}
                                      

                                    </div>
                                  </div>
                                </div>
                                {/* end card-item */}
                              </div>
                              {/* end col-lg-12 */}
                            </div>
                          </Modal>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div>
                Bạn chưa đặt lịch <Link to={AppRoutes.booking}>bạn có thể bấm qua link này để đăng ký đặt lịch</Link>
              </div>
            )}
          </div>
        </div>
        {HistoryBook && HistoryBook.length > 0 ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 show-left" style={{ paddingLeft: '40px' }}>
                <p>
                  Đang xem {page} - {postPerPage * page} trong {HistoryBook.length} mục
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 show-right" style={{ paddingRight: '40px' }}>
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
        ) : (
          ''
        )}
      </div>
    </div>
  );
});

export default BookingHistory;
