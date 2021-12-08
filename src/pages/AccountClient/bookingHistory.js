import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import historyBookAPI from '../../api/historyBook';
import { historyBookInfo } from '../../redux/actions/historyBook';

const BookingHistory = () => {
  const [HistoryBook, setHistoryBook] = useState([]);
  console.log(HistoryBook);
  // const arr = Array.from(HistoryBook)
  // const [listBook, setListBook] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  // const { TabPane } = Tabs;

  // const callback = (key) => {
  //   console.log(key);
  // }

  useEffect(() => {
    const setHistoryss = async () => {
      try {
        const { data } = await historyBookAPI.getHistoryMember(id);
        console.log(data);
        setHistoryBook(data);
        dispatch(historyBookInfo(id));
      } catch (error) {
        console.log(error);
      }
    };
    setHistoryss();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="col-lg-9">
      <div className="form-box">
        <div className="form-title-wrap">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h3 className="title">Lịch sử của tôi</h3>
              {/* <p className="font-size-14">Showing 1 to 7 of 17 entries</p> */}
            </div>
            {/* <span>
              Tổng số đặt trước <strong className="color-text">(5)</strong>
            </span> */}
          </div>
        </div>
        <div className="form-content">
          <div className="table-form table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Ngày</th>
                  <th scope="col">Thời gian</th>
                  <th scope="col">Nhân viên</th>
                  <th scope="col">Dịch vụ</th>
                  <th scope="col">Combo</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {HistoryBook &&
                  HistoryBook.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date_work}</td>
                      <td>{item.time_work}</td>
                      <td>
                        <div className="table-content">
                          <h3 className="title">Chu Thị Quỳnh</h3>
                        </div>
                      </td>
                      <td>Sơn móng</td>
                      <td>Sơn Móng + Sơn Gel Gelish+Chà Lớp Bóng Trên Móng</td>
                      <td>{item.total_bill.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                      <td>
                        <span className="badge badge-warning py-1 px-2">Chờ xác nhận</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
