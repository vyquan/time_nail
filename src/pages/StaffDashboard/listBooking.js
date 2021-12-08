import React, { useEffect, useState } from 'react';
// import Select from 'react-select';
import { Tabs } from 'antd';
import historyBookAPI from '../../api/historyBook';
import { historyBookStaff } from '../../redux/actions/historyBook';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
const ListBooking = () => {
  const [historyBook, setHistoryBook] = useState([]);
  // console.log(historyBook.today.length);
     const {id} = useParams();
     const dispatch = useDispatch();
  useEffect (() => {
    const setHistoryss = async () => {
      try {
        const { data } = await historyBookAPI.getHistoryMember(id)
        setHistoryBook(data);
        dispatch(historyBookStaff(id));
      } catch (error) {
        console.log(error);
      }
    };
    setHistoryss();
     //eslint-disable-next-line
  }, []);
  

  const { TabPane } = Tabs;
const callback = (key) => {
  // console.log(key);
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
                          <th scope="col">Tổng thời gian</th>
                          <th scope="col">Dịch vụ</th>
                          <th scope="col">Combo</th>
                          <th scope="col">Trang thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          historyBook.today &&
                          historyBook.today.map(item => (
                           <tr key={item.id}>
                           <td >{item.date_work}</td>
                           <td >{item.time_work} </td>
                           <td>{item.total_time_execution} phút</td>
                           <td >
                            Tẩy lông chân
                         </td> 
                         <td  >
                            Combo sơn móng tay mịn rất phù hợp với túi tiền chị em
                         </td> 
                         <td >
                           <span className="badge badge-warning py-1 px-2">Chờ xác nhận</span>
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
         
              </TabPane>
              <TabPane tab="Lịch đặt hôm sau" key="2">
              <div className="form-contents">
             <div className="table-form table-responsive">
            <table className="table">
              <thead>
                <tr>
                <th scope="col">Ngày </th>
                  <th scope="col">Thời gian </th>
                  <th scope="col">Tổng thời gian </th>
                  <th scope="col">Dịch vụ</th>
                  <th scope="col">Combo</th>
                  {/* <th scope="col">Giá</th>
                  <th scope="col" width="145px">Số lượng người</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col" width="130px">Mã giảm giá</th>
                  <th scope="col" width="130px">Mã Hóa dơn</th> */}
                  <th scope="col">Trang thái</th>
                </tr>
              </thead>
              <tbody>
              {
                          historyBook.future &&
                          historyBook.future.map(item => (
                              <tr key={item.id}>
                                <td >{item.date_work}</td>
                                <td >{item.time_work} </td>
                                <td>{item.total_time_execution} phút</td>
                                <td >
                                 Tẩy lông chân
                              </td> 
                              <td  >
                                 Combo sơn móng tay mịn rất phù hợp với túi tiền chị em
                              </td> 
                              <td >
                                <span className="badge badge-warning py-1 px-2">Chờ xác nhận</span>
                              </td>
                            </tr>
                            ))
                          }
              </tbody>
            </table>
          </div>
        </div>
              </TabPane>
            </Tabs>
        
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link page-link-nav" href="#/" aria-label="Previous">
                  <span aria-hidden="true">
                    <i className="la la-angle-left" />
                  </span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link page-link-nav" href="#/">
                  1
                </a>
              </li>
              <li className="page-item Hoàn thành">
                <a className="page-link page-link-nav" href="#/">
                  2 <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link page-link-nav" href="#/">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link page-link-nav" href="#/" aria-label="Next">
                  <span aria-hidden="true">
                    <i className="la la-angle-right" />
                  </span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ListBooking;
