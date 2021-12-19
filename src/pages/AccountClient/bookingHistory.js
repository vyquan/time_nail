import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import historyBookAPI from '../../api/historyBook';
import { historyBillDetail, historyBookInfo, cancelBill } from '../../redux/actions/historyBook';
import {  Modal, Pagination } from 'antd';
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
  const curentPosts = HistoryBook && HistoryBook.length > 0 ? HistoryBook?.slice(firstPageIndex, lastPageIndex) : '';
    

     const dataBill = useSelector(state => state.listbookHistory.billDetail)
      const showDetailBill = async (item) => {
          dispatch(historyBillDetail(item))
      }
      // const history = useHistory();
       const canbile = (item) => {
           const canel = window.confirm('Bạn có chắc chắn muốn hủy không');
           if(canel) {
            dispatch(cancelBill(item))
           }
          // window.location.reload()
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
                          {
                            item.status_bill === 1 ? 
                            (
                  
                                <div onClick={() => canbile(item.id)}
                              style={{ textDecoration: 'underline', cursor: 'pointer'}} >
                                         Hủy lịch đặt
                                       </div>
 
          
                          
                            ) : (
                              <div hidden
                              onClick={() => dispatch(cancelBill(item.id))}
                            style={{ textDecoration: 'underline', cursor: 'pointer'}}
                          >
                            Hủy lịch đặt
                          </div>
                            )
                          }
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
                        <td onClick={() => showDetailBill(item.id)}>
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
                            height={100}
                            footer={true}
                            style={{ width: "100%", resize: "none" }}
                          >
                          
                                <div className="card-item user-card card-item-list mt-2 mb-0">
                                  <div className="card-body">
                                                          
                                    <ul className="list-items list-items-2 flex-grow-1" key={item.id}>
                                        <li>
                                          <span><strong>Trạng thái bill:</strong></span>
                                         
                                          {
                                            (() => {
                                              if(dataBill.bill ? dataBill.bill.status_bill === 1 : '' ) {
                                                return <span className='ml-2'>Chờ xác nhận.</span>;
                                              }
                                              else if(dataBill.bill ? dataBill.bill.status_bill === 2 : '') {
                                                return <span className='ml-2'>Xác nhận thành công.</span>;
                                              }
                                              else if(dataBill.bill ? dataBill.bill.status_bill === 3 : '') {
                                                return <span className='ml-2'>Đang làm.</span>;
                                              }
                                              else if(dataBill.bill ? dataBill.bill.status_bill === 4 : '') {
                                                return <span className='ml-2'>Hoàn thành.</span>;
                                              }
                                              else if(dataBill.bill ? dataBill.bill.status_bill === 5 : '') {
                                                return <span className='ml-2'>Hủy.</span>;
                                              }
                                            })()
                                          }
                                        </li>
                                            {
                                              (() => {
                                                if(dataBill.bill && dataBill.bill.status_bill) {
                                                  return (
                                                   <>
                                                    <li>
                                                    <span><strong>Ngày làm: </strong>{dataBill.bill.date_work}.</span>
                                                    </li>
                                                    <li>
                                                    <span><strong>Giờ làm: </strong>{dataBill.bill.time_work}.</span>
                                                    </li>
                                                    <li>
                                                    <span><strong>Số điện thoại: </strong>{dataBill.bill.phone}.</span>
                                                    </li>
                                                    <li>
                                                    <span><strong>Tổng tiền: </strong>{dataBill.bill.total_bill.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}.</span>
                                                    </li>
                                                    <li>
                                                    <span><strong>Ghi chú: </strong>{dataBill.bill.note_bill}.</span>
                                                    </li></>
                                                  )
                                                }
                                              })()
                                            }
                                        </ul>
                                       <div className='person1 mt-3'>
                                       <h3 className='card-title'>Khách 1</h3>
                                              {
                                               (() => {
                                                 if(dataBill.nguoi1) {
                                                   return <div className='d-flex justify-content-between '>
                                                     <div >
                                                      <h6 className='ml-2'><strong>Combo:</strong></h6>
                                                       {
                                                         dataBill.nguoi1.combo === null ? 
                                                         ('')
                                                         :
                                                       dataBill.nguoi1.combo.map(item => (
                                                        <div key={item.id} className='ml-2'>
                                                        <p>{ item.name_combo}.</p>
                                                        <p> {  item.total_time_work} phút.</p>
                                                        <p> {  item.total_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}.</p>
                                                       </div>
                                                       )) 
                                                     }
                                                     </div>
                                            
                                                    <div>
                                                    <h6 className='ml-2'><strong>Dịch vụ:</strong></h6>
                                                      {
                                                        dataBill.nguoi1.service === null ? 
                                                        ('')
                                                        :
                                                      dataBill.nguoi1.service.map(item => (
                                                       <div key={item.id} className='ml-2'>
                                                       <p>{ item.name_service}.</p>
                                                       <p> {  item.total_time_work} phút.</p>
                                                        <p> {  item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}.</p>
                                                      </div>
                                                      )) 
                                                    }
                                                    </div>
                                                    
                                                      
                                                    <div>
                                                    <h6 className='ml-2'><strong>Nhân viên:</strong></h6>
                                                       <div className='ml-2'>
                                                       <p>{ dataBill.nguoi1.staff === null ?
                                                        ('')
                                                        :
                                                       dataBill.nguoi1.staff.full_name}.</p>
                                                      </div>
                                                    </div>
                                                   </div>
                                                 }

                                               })()
                                            }    
                                       </div>
                                       {
                                         dataBill.nguoi2  === null  ? ('') 
                                         :
                                          (
                                            <div className='person2 mt-2'>         
                                          <h3 className='card-title'>Khách 2</h3>
                                        
                                              {
                                               (() => {
                                                 if(dataBill.nguoi2 ) {
                                                   return <div className='d-flex justify-content-between  '>
                                                     <div>
                                                      <h6 className='ml-2'><strong>Combo:</strong></h6>
                                                       {
                                                      dataBill.nguoi2.combo === null ? ('')
                                                      :
                                                       dataBill.nguoi2.combo.map(item => (
                                                        <div key={item.id} className='ml-2'>
                                                        <p>{ item.name_combo}.</p>
                                                        <p> {  item.total_time_work} phút.</p>
                                                        <p> {  item.total_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}.</p>
                                                       </div>
                                                       )) 
                                                     }
                                                     </div>
                                                   
                                                     <div>
                                                     <h6 className='ml-2'><strong>Dịch vụ:</strong></h6>
                                                      { 
                                                      dataBill.nguoi2.service === null ? ('')
                                                      :
                                                      dataBill.nguoi2.service.map(item => (
                                                       <div key={item.id} className='ml-2'>
                                                       <span>{ item.name_service}.</span>
                                                       <p> {  item.total_time_work} phút.</p>
                                                        <p> {  item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}.</p>
                                                      </div>
                                                      )) 
                                                    }
                                                     </div>
                                                    
                                                      
                                                    <div>
                                                    <h6 className='ml-2'><strong>Nhân viên:</strong></h6>
                                                       <div className='ml-2'>
                                                       <p>{dataBill.nguoi2.staff === null ? ('') : dataBill.nguoi2.staff.full_name}.</p>
                                                      </div>
                                                    </div>
                                                   </div>
                                                 }

                                               })()
                                            }    
                                       </div>
                                          )
                                       }
                                         {
                                         dataBill.nguoi3 === null ? ('') 
                                         :
                                          (
                                            <div className='person3 mt-2'>
                                            <h3 className='card-title'>Khách 3</h3>
                                                   {
                                                    (() => {
                                                      if(dataBill.nguoi3 ) {
                                                        return <div className='d-flex justify-content-between  '>
                                                          <div>
                                                           <h6 className='ml-2'><strong>Combo:</strong></h6>
                                                            {
                                                              dataBill.nguoi3.combo === null ?
                                                              ('')
                                                              :
                                                            dataBill.nguoi3.combo.map(item => (
                                                             <div key={item.id} className='ml-2'>
                                                             <p>{ item.name_combo}.</p>
                                                             <p> {  item.total_time_work} phút.</p>
                                                        <p> {  item.total_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}.</p>
                                                            </div>
                                                            ))
                                                          }
                                                          </div>
                                                          <div>
                                                          <h6 className='ml-2'><strong>Dịch vụ:</strong></h6>
                                                           {
                                                             dataBill.nguoi3.service === null ?('')
                                                             :
                                                           dataBill.nguoi3.service.map(item => (
                                                            <div key={item.id} className='ml-2'>
                                                            <p>{ item.name_service}.</p>
                                                            <p> {  item.total_time_work} phút.</p>
                                                        <p> {  item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}.</p>
                                                           </div>
                                                           ))
                                                         }
                                                          </div>
                                                           
                                                         <div>
                                                         <h6 className='ml-2'><strong>Nhân viên:</strong></h6>
                                                            <div className='ml-2'>
                                                            <p>{dataBill.nguoi3.staff === null ? ('') : dataBill.nguoi3.staff.full_name}.</p>
                                                           </div>
                                                         </div>
                                                        </div>
                                                      }
     
                                                    })()
                                                 }    
                                            </div>    
                                          )
                                       }
                                  </div>
                            
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
                  Đang xem {page} trong {HistoryBook.length} mục
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
