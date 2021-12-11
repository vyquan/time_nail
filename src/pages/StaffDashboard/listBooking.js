import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import historyBookAPI from '../../api/historyBook';
import { historyBookStaff } from '../../redux/actions/historyBook';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Modal, Pagination} from 'antd';
const ListBooking = () => {
  const [historyBook, setHistoryBook] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleFuture, setisModalVisibleFuture] = useState(false);
   // panigation
   const [total, setTotal] = useState("");
   const [totaltomorow, setTotaltomorow] = useState("");
   const [page, setPage] = useState(1);
   const [pagefuture, setPagefuture] = useState(1);
   const [postPerPage] = useState(5);
   const [postPagefuture] = useState(5);
     const {id} = useParams();
     const dispatch = useDispatch();
  useEffect (() => {
    const setHistoryss = async () => {
      try {
        const { data } = await historyBookAPI.getHistoryMember(id)
        setHistoryBook(data);
        setTotal(data.today.length);
        setTotaltomorow(data.future.length);
        dispatch(historyBookStaff(id));
      } catch (error) {
        console.log(error);
      }
    };
    setHistoryss();
     //eslint-disable-next-line
  }, []);


  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModalfuture = () => {
    setisModalVisibleFuture(true)
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleOkFuture = () => {
    setisModalVisibleFuture(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCancelFuture = () => {
    setisModalVisibleFuture(false);
  };

  const { TabPane } = Tabs;
  const callback = (key) => {
  // console.log(key);
}
   // Panagition today
   const firstPageIndex = (page - 1) * postPerPage;
   const lastPageIndex = firstPageIndex + postPerPage;
   const curentPosts =historyBook.today?.slice(firstPageIndex, lastPageIndex);
   // panagition future
   const firstPage = (pagefuture - 1) * postPagefuture;
   const lastPage = firstPage + postPagefuture;
   const curentput = historyBook.future?.slice(firstPage, lastPage)

   const [data, setData] = useState([]);
   const openDetails = id => e  => {
     e.preventDefault();
    const foundToday = historyBook.today.find(element => element.id === id);
    setData(foundToday);
    }
    const [datafuture, setDatfuture] = useState([]);
    const openDetail = id => e  => {
      e.preventDefault();
     const foundFuture = historyBook.future.find(element => element.id === id);
     setDatfuture(foundFuture);
     }
  return (
    <div className="col-lg-12">
      <div className="form-box">
        <div className="form-title-wrap">
          <div className="d-flex align-items-center justify-content-between">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Lịch đặt hôm nay" key="1">
                {
                  historyBook.today && historyBook.today.length > 0 ? 
                  (
                    <div className="form-contents">
                    <div className="table-form table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Ngày</th>
                          <th scope="col">Thời gian</th>
                          <th scope="col">Dịch vụ</th>
                          <th scope="col">Combo</th>
                          <th scope="col">Trang thái</th>
                          <th scope="col">Xem thêm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                         curentPosts &&
                         curentPosts.map(item => (
                           <tr key={item.id}>
                           <td >{item.date_work}</td>
                           <td >{item.time_work} </td>
                           {/* <td>{item.total_time_execution} phút</td> */}
                           <td >
                            Tẩy lông chân tay
                         </td> 
                         <td  >
                            Combo sơn móng tay mịn rất phù hợp với túi tiền 
                         </td> 
                         <td >
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
                         <td>
                    <div className="table-contents" onClick={openDetails(item.id)}>
                      <a href="#/" onClick={showModal}>
                        <i className="la la-eye" />
                      </a>
                    </div>
                    <Modal title="Chi tiết" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                    <div className="row">
                <div className="col-lg-12">
              <div className="card-item user-card card-item-list mt-4 mb-0">
                <div className="card-body">
                  <h3 className="card-title">Xem thêm </h3>
                  <div className="d-flex justify-content-between pt-3">
                    <ul className="list-items list-items-2 flex-grow-1">
                      <li><span>Tổng thời gian:</span>{data.total_time_execution} phút</li>
                      <li><span>Số lượng người:</span>{data.total_people} người</li>
                      <li><span>Giá:</span>{data.total_bill?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</li>
                      <li><span>Số điện thoại:</span>{data.phone}</li>
                      <li><span>Combo:</span>Sơn Móng + Sơn Gel Gelish+Chà Lớp Bóng Trên Móng </li>
                      <li><span>Mã giảm giá:</span><a href="#">{data.code_discount}</a></li>
                      <li><span>Mã hóa đơn:</span><a href="#">{data.code_bill}</a></li>
                    </ul>
                  </div>
                </div>
              </div>{/* end card-item */}
            </div>{/* end col-lg-12 */}
          </div>
                </Modal>
                </td>
                       </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                 ) : (<> Hôm nay không có lịch đặt nào</>)
                }
                {
                   historyBook.today && historyBook.today.length > 0 ? (
                    <div className='container'>
                    <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12 mt-3 show-left' style={{paddingLeft: "10px"}}>
                         <p>Showing {page} to {postPerPage * page} of {historyBook.today.length} entries</p>
                       </div>
                       <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3  show-right" style={{paddingRight: "40px"}}>
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
              </TabPane>
              <TabPane tab="Lịch đặt hôm sau" key="2">
                {
                   historyBook.today && historyBook.today.length > 0 ? 
                   (
                    <div className="form-contents">
                    <div className="table-form table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                        <th scope="col">Ngày </th>
                          <th scope="col">Thời gian </th>
                          <th scope="col">Dịch vụ</th>
                          <th scope="col">Combo</th>
                          <th scope="col">Trang thái</th>
                          <th scope="col">Xem thêm</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          curentput &&
                          curentput.map(item => (
                              <tr key={item.id}>
                                <td >{item.date_work}</td>
                                <td >{item.time_work} </td>
                                <td >
                                 Tẩy lông chân
                              </td> 
                              <td  >
                                 Combo sơn móng tay mịn rất phù hợp với túi tiền 
                              </td> 
                              <td >
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
                              <td>
                    <div className="table-contents" onClick={openDetail(item.id)}>
                      <a href="#/" onClick={showModalfuture}>
                        <i className="la la-eye" />
                      </a>
                    </div>
                    <Modal title="Chi tiết" visible={isModalVisibleFuture} onOk={handleOkFuture}  onCancel={handleCancelFuture } width={1000}>
                    <div className="row">
                    <div className="col-lg-12">
                      <div className="card-item user-card card-item-list mt-4 mb-0">
                        <div className="card-body">
                          <h3 className="card-title">Xem thêm </h3>
                          <div className="d-flex justify-content-between pt-3">
                            <ul className="list-items list-items-2 flex-grow-1">
                              <li><span>Tổng thời gian:</span>{datafuture.total_time_execution} phút</li>
                              <li><span>Số lượng người:</span>{datafuture.total_people} người</li>
                              <li><span>Giá:</span>{datafuture.total_bill?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</li>
                              <li><span>Số điện thoại:</span>{datafuture.phone}</li>
                              <li><span>Combo:</span>Sơn Móng + Sơn Gel Gelish+Chà Lớp Bóng Trên Móng </li>
                              <li><span>Mã giảm giá:</span><a href="#">{datafuture.code_discount}</a></li>
                              <li><span>Mã hóa đơn:</span><a href="#">{datafuture.code_bill}</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>{/* end card-item */}
                    </div>{/* end col-lg-12 */}
                  </div>
                      </Modal>
                      </td>              
                      </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </div>
              </div>
                   ) : (<>Chưa có lịch đặt cho những ngày tới</>)
                }
            {
                  historyBook.today && historyBook.today.length > 0 ? (
                    <div className='container'>
                    <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12 mt-3 show-left' style={{paddingLeft: "10px"}}>
                         <p>Showing {pagefuture} to {pagefuture * postPagefuture} of {historyBook.future.length} entries</p>
                       </div>
                       <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3  show-right" style={{paddingRight: "40px"}}>
                     <nav aria-label="Page navigation example">
                     <Pagination
                     onChange={(value) => setPagefuture(value)}
                     pageSize={pagefuture}
                     total={totaltomorow}
                     current={page}
                     />
                     </nav>
                   </div>
                    </div>
                     </div>
                    ) : ('')
                }

             
            </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ListBooking;
