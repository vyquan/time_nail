import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import historyBookAPI from '../../api/historyBook';
import { historyBookStaff, historyBillDetail } from '../../redux/actions/historyBook';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Pagination } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
const ListBooking = () => {
  const [historyBook, setHistoryBook] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleFuture, setisModalVisibleFuture] = useState(false);
  // panigation
  const [total, setTotal] = useState('');
  const [totaltomorow, setTotaltomorow] = useState('');

  const [page, setPage] = useState(1);
  const [pagefuture, setPagefuture] = useState(1);
  const [postPerPage] = useState(5);
  const [postPagefuture] = useState(5);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const setHistoryss = async () => {
      try {
        const { data } = await historyBookAPI.getHistoryMember(id);
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
    setisModalVisibleFuture(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleOkFuture = () => {
    setisModalVisibleFuture(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCancelFuture = () => {
    setisModalVisibleFuture(false);
  };

  const { TabPane } = Tabs;
  const callback = (key) => {
    // console.log(key);
  };
  // Panagition today
  const firstPageIndex = (page - 1) * postPerPage;
  const lastPageIndex = firstPageIndex + postPerPage;
  const curentPosts = historyBook.today?.slice(firstPageIndex, lastPageIndex);
  // panagition future
  const firstPage = (pagefuture - 1) * postPagefuture;
  const lastPage = firstPage + postPagefuture;
  const curentput = historyBook.future?.slice(firstPage, lastPage);
  const dataBill = useSelector((state) => state.listbookHistory.billDetail);
  const showDetailBill = async (item) => {
    dispatch(historyBillDetail(item));
  };
  return (
    <div className="col-lg-12 ">
      <div className="form-box">
        <div className="form-title-wrap">
          <Tabs defaultActiveKey="1" onChange={callback} size={1000}>
            <TabPane tab="L???ch ?????t h??m nay" key="1">
              {historyBook.today && historyBook.today.length > 0 ? (
                <div className="form-contents">
                  <div className="table-form table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Ng??y</th>
                          <th scope="col">Th???i gian</th>
                          <th scope="col">S??? ??i???n tho???i </th>
                          <th scope="col">Trang th??i</th>
                          <th scope="col" className="text-center">
                            Chi ti???t
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {curentPosts &&
                          curentPosts.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.date_work}</td>
                              <td>{item.time_work} </td>

                              <td>{item.phone}</td>
                              <td>
                                {(() => {
                                  if (item.status_bill === 1) {
                                    return <span className="badge badge-warning py-1 px-2">Ch??? x??c nh???n</span>;
                                  } else if (item.status_bill === 2) {
                                    return <span className="badge badge-primary py-1 px-2">X??c nh???n th??nh c??ng</span>;
                                  } else if (item.status_bill === 3) {
                                    return <span className="badge badge-info py-1 px-2">??ang l??m</span>;
                                  } else if (item.status_bill === 4) {
                                    return <span className="badge badge-success py-1 px-2">Ho??n th??nh</span>;
                                  } else if (item.status_bill === 5) {
                                    return <span className="badge badge-danger py-1 px-2">H???y</span>;
                                  }
                                })()}
                              </td>
                              <td>
                                <div onClick={() => showDetailBill(item.id)}>
                                  <div className="table-contents" onClick={showModal}>
                                    <MoreOutlined />
                                  </div>
                                </div>
                                <Modal
                                  title="Chi ti???t"
                                  visible={isModalVisible}
                                  onOk={handleOk}
                                  onCancel={handleCancel}
                                  width={800}
                                  height={100}
                                  footer={false}
                                >
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="card-item user-card card-item-list mt-4 mb-0">
                                        <div className="card-body">
                                          <ul className="list-items list-items-2 flex-grow-1" key={item.id}>
                                            <li>
                                              <span>
                                                <strong>Tr???ng th??i bill:</strong>
                                              </span>
                                              {(() => {
                                                if (dataBill.bill ? dataBill.bill.status_bill === 1 : '') {
                                                  return <span className="ml-2">Ch??? x??c nh???n</span>;
                                                } else if (dataBill.bill ? dataBill.bill.status_bill === 2 : '') {
                                                  return <span className="ml-2">X??c nh???n th??nh c??ng</span>;
                                                } else if (dataBill.bill ? dataBill.bill.status_bill === 3 : '') {
                                                  return <span className="ml-2">??ang l??m</span>;
                                                } else if (dataBill.bill ? dataBill.bill.status_bill === 4 : '') {
                                                  return <span className="ml-2">Ho??n th??nh</span>;
                                                } else if (dataBill.bill ? dataBill.bill.status_bill === 5 : '') {
                                                  return <span className="ml-2">H???y</span>;
                                                }
                                              })()}
                                            </li>
                                            {(() => {
                                              if (dataBill.bill && dataBill.bill.status_bill) {
                                                return (
                                                  <>
                                                    <li>
                                                      <span>
                                                        <strong>Ng??y l??m: </strong>
                                                        {dataBill.bill.date_work}.
                                                      </span>
                                                    </li>
                                                    <li>
                                                      <span>
                                                        <strong>Gi??? l??m: </strong>
                                                        {dataBill.bill.time_work}.
                                                      </span>
                                                    </li>
                                                    <li>
                                                      <span>
                                                        <strong>T???ng ti???n: </strong>
                                                        {dataBill.bill.total_bill.toLocaleString('it-IT', {
                                                          style: 'currency',
                                                          currency: 'VND',
                                                        })}
                                                        .
                                                      </span>
                                                    </li>
                                                    <li>
                                                      <span>
                                                        <strong>Ghi ch??: </strong>
                                                        {dataBill.bill.note_bill}.
                                                      </span>
                                                    </li>
                                                  </>
                                                );
                                              }
                                            })()}
                                          </ul>
                                          <div className="person1 border-top mt-2">
                                            <h3 className="card-title mt-2">Kh??ch 1</h3>
                                            {(() => {
                                              if (dataBill.nguoi1 && dataBill.nguoi1.staff) {
                                                return (
                                                  <div className="d-flex justify-content-between">
                                                    <div className="w-40">
                                                      <h6 className="ml-2">
                                                        <strong>Combo:</strong>
                                                      </h6>
                                                      {dataBill.nguoi1.combo === null
                                                        ? ''
                                                        : dataBill.nguoi1.combo.map((item) => (
                                                            <div key={item.id} className="ml-2">
                                                              <p>{item.name_combo}.</p>
                                                              <p> {item.total_time_work} ph??t.</p>
                                                              <p>
                                                                {' '}
                                                                {item.total_price.toLocaleString('it-IT', {
                                                                  style: 'currency',
                                                                  currency: 'VND',
                                                                })}
                                                                .
                                                              </p>
                                                            </div>
                                                          ))}
                                                    </div>
                                                    <div className="w-40">
                                                      <h6 className="ml-2">
                                                        <strong>D???ch v???:</strong>
                                                      </h6>
                                                      {dataBill.nguoi1.service === null
                                                        ? ''
                                                        : dataBill.nguoi1.service.map((item) => (
                                                            <div key={item.id} className="ml-2">
                                                              <p>{item.name_service}.</p>
                                                              <p> {item.total_time_work} ph??t.</p>
                                                              <p>
                                                                {' '}
                                                                {item.price.toLocaleString('it-IT', {
                                                                  style: 'currency',
                                                                  currency: 'VND',
                                                                })}
                                                                .
                                                              </p>
                                                            </div>
                                                          ))}
                                                    </div>

                                                    <div className="w-20">
                                                      <h6 className="ml-2">
                                                        <strong>Nh??n vi??n:</strong>
                                                      </h6>
                                                      <div className="ml-2">
                                                        <p>{dataBill.nguoi1.staff.full_name}</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            })()}
                                          </div>
                                          {dataBill.nguoi2 === null ? (
                                            ''
                                          ) : (
                                            <div className="person2 mt-2 border-top mt-2">
                                              <h3 className="card-title mt-2">Kh??ch 2</h3>
                                              {(() => {
                                                if (dataBill.nguoi2 && dataBill.nguoi2.staff) {
                                                  return (
                                                    <div className="d-md-flex justify-content-between ">
                                                      <div className="w-40">
                                                        <h6 className="ml-2">
                                                          <strong>Combo:</strong>
                                                        </h6>
                                                        {dataBill.nguoi2.combo === null
                                                          ? ''
                                                          : dataBill.nguoi2.combo.map((item) => (
                                                              <div key={item.id} className="ml-2">
                                                                <p>{item.name_combo}.</p>
                                                                <p> {item.total_time_work} ph??t.</p>
                                                                <p>
                                                                  {' '}
                                                                  {item.total_price.toLocaleString('it-IT', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                  })}
                                                                  .
                                                                </p>
                                                              </div>
                                                            ))}
                                                      </div>
                                                      <div className="w-40">
                                                        <h6 className="ml-2">
                                                          <strong>D???ch v???:</strong>
                                                        </h6>
                                                        {dataBill.nguoi2.service === null
                                                          ? ''
                                                          : dataBill.nguoi2.service.map((item) => (
                                                              <div key={item.id} className="ml-2">
                                                                <p>{item.name_service}.</p>
                                                                <p> {item.total_time_work} ph??t.</p>
                                                                <p>
                                                                  {' '}
                                                                  {item.price.toLocaleString('it-IT', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                  })}
                                                                  .
                                                                </p>
                                                              </div>
                                                            ))}
                                                      </div>

                                                      <div className="w-20">
                                                        <h6 className="ml-2">
                                                          <strong>Nh??n vi??n:</strong>
                                                        </h6>
                                                        <div className="ml-2">
                                                          <p>{dataBill.nguoi2.staff.full_name}</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                }
                                              })()}
                                            </div>
                                          )}
                                          {dataBill.nguoi3 === null ? (
                                            ''
                                          ) : (
                                            <div className="person3 mt-2 border-top mt-2">
                                              <h3 className="card-title mt-2">Kh??ch 3</h3>
                                              {(() => {
                                                if (dataBill.nguoi3 && dataBill.nguoi3.staff) {
                                                  return (
                                                    <div className="d-md-flex justify-content-between ">
                                                      <div className="w-40">
                                                        <h6 className="ml-2">
                                                          <strong>Combo:</strong>
                                                        </h6>
                                                        {dataBill.nguoi3.combo === null
                                                          ? ''
                                                          : dataBill.nguoi3.combo.map((item) => (
                                                              <div key={item.id} className="ml-2">
                                                                <p>{item.name_combo}.</p>
                                                                <p> {item.total_time_work} ph??t.</p>
                                                                <p>
                                                                  {' '}
                                                                  {item.total_price.toLocaleString('it-IT', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                  })}
                                                                  .
                                                                </p>
                                                              </div>
                                                            ))}
                                                      </div>
                                                      <div className="w-40">
                                                        <h6 className="ml-2">
                                                          <strong>D???ch v???:</strong>
                                                        </h6>
                                                        {dataBill.nguoi3.service === null
                                                          ? ''
                                                          : dataBill.nguoi3.service.map((item) => (
                                                              <div key={item.id} className="ml-2">
                                                                <p>{item.name_service}.</p>
                                                                <p> {item.total_time_work} ph??t.</p>
                                                                <p>
                                                                  {' '}
                                                                  {item.price.toLocaleString('it-IT', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                  })}
                                                                  .
                                                                </p>
                                                              </div>
                                                            ))}
                                                      </div>

                                                      <div className="w-20">
                                                        <h6 className="ml-2">
                                                          <strong>Nh??n vi??n:</strong>
                                                        </h6>
                                                        <div className="ml-2">
                                                          <p>{dataBill.nguoi3.staff.full_name}</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                }
                                              })()}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Modal>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <> H??m nay kh??ng c?? l???ch ?????t n??o</>
              )}
              {historyBook.today && historyBook.today.length > 0 ? (
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3 show-left" style={{ paddingLeft: '10px' }}>
                      <p>
                        ??ang xem {page} trong {historyBook.today.length} m???c
                      </p>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3  show-right"
                      style={{ paddingRight: '40px' }}
                    >
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
            </TabPane>
            <TabPane tab="L???ch ?????t h??m sau" key="2">
              {historyBook.future && historyBook.future.length > 0 ? (
                <div className="form-contents">
                  <div className="table-form table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Ng??y </th>
                          <th scope="col">Th???i gian </th>
                          <th scope="col">S??? ??i???n tho???i </th>
                          <th scope="col">Trang th??i</th>
                          <th scope="col" className="text-center">
                            Chi ti???t
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {curentput &&
                          curentput.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.date_work}</td>
                              <td>{item.time_work} </td>
                              <td>{item.phone}</td>
                              <td>
                                {(() => {
                                  if (item.status_bill === 1) {
                                    return <span className="badge badge-warning py-1 px-2">Ch??? x??c nh???n</span>;
                                  } else if (item.status_bill === 2) {
                                    return <span className="badge badge-primary py-1 px-2">X??c nh???n th??nh c??ng</span>;
                                  } else if (item.status_bill === 3) {
                                    return <span className="badge badge-info py-1 px-2">??ang l??m</span>;
                                  } else if (item.status_bill === 4) {
                                    return <span className="badge badge-success py-1 px-2">Ho??n th??nh</span>;
                                  } else if (item.status_bill === 5) {
                                    return <span className="badge badge-danger py-1 px-2">H???y</span>;
                                  }
                                })()}
                              </td>
                              <td>
                                <div onClick={() => showDetailBill(item.id)}>
                                  <div className="table-contents" onClick={showModalfuture}>
                                    <MoreOutlined />
                                  </div>
                                </div>
                                <Modal
                                  title="Chi ti???t"
                                  visible={isModalVisibleFuture}
                                  onOk={handleOkFuture}
                                  onCancel={handleCancelFuture}
                                  width={800}
                                  height={100}
                                  footer={false}
                                >
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="card-item user-card card-item-list mt-4 mb-0">
                                        <div className="card-body">
                                          <ul className="list-items list-items-2 flex-grow-1" key={item.id}>
                                            <li>
                                              <span>
                                                <strong>Tr???ng th??i bill:</strong>
                                              </span>
                                              {(() => {
                                                if (dataBill.bill ? dataBill.bill.status_bill === 1 : '') {
                                                  return <span className="ml-2">Ch??? x??c nh???n</span>;
                                                } else if (dataBill.bill ? dataBill.bill.status_bill === 2 : '') {
                                                  return <span className="ml-2">X??c nh???n th??nh c??ng</span>;
                                                } else if (dataBill.bill ? dataBill.bill.status_bill === 3 : '') {
                                                  return <span className="ml-2">??ang l??m</span>;
                                                } else if (dataBill.bill ? dataBill.bill.status_bill === 4 : '') {
                                                  return <span className="ml-2">Ho??n th??nh</span>;
                                                } else if (dataBill.bill ? dataBill.bill.status_bill === 5 : '') {
                                                  return <span className="ml-2">H???y</span>;
                                                }
                                              })()}
                                            </li>
                                            {(() => {
                                              if (dataBill.bill && dataBill.bill.status_bill) {
                                                return (
                                                  <>
                                                    <li>
                                                      <span>
                                                        <strong>Ng??y l??m: </strong>
                                                        {dataBill.bill.date_work}.
                                                      </span>
                                                    </li>
                                                    <li>
                                                      <span>
                                                        <strong>Gi??? l??m: </strong>
                                                        {dataBill.bill.time_work}.
                                                      </span>
                                                    </li>
                                                    <li>
                                                      <span>
                                                        <strong>T???ng ti???n: </strong>
                                                        {dataBill.bill.total_bill.toLocaleString('it-IT', {
                                                          style: 'currency',
                                                          currency: 'VND',
                                                        })}
                                                        .
                                                      </span>
                                                    </li>
                                                    <li>
                                                      <span>
                                                        <strong>Ghi ch??: </strong>
                                                        {dataBill.bill.note_bill}.
                                                      </span>
                                                    </li>
                                                  </>
                                                );
                                              }
                                            })()}
                                          </ul>
                                          <div className="person1 border-top mt-2">
                                            <h3 className="card-title mt-2">Kh??ch 1</h3>
                                            {(() => {
                                              if (dataBill.nguoi1 && dataBill.nguoi1.staff) {
                                                return (
                                                  <div className="d-flex justify-content-between ">
                                                    <div>
                                                      <h6 className="ml-2">
                                                        <strong>Combo:</strong>
                                                      </h6>
                                                      {dataBill.nguoi1.combo === null
                                                        ? ''
                                                        : dataBill.nguoi1.combo.map((item) => (
                                                            <div key={item.id} className="ml-2">
                                                              <p>{item.name_combo}.</p>
                                                              <p> {item.total_time_work} ph??t.</p>
                                                              <p>
                                                                {' '}
                                                                {item.total_price.toLocaleString('it-IT', {
                                                                  style: 'currency',
                                                                  currency: 'VND',
                                                                })}
                                                                .
                                                              </p>
                                                            </div>
                                                          ))}
                                                    </div>
                                                    <div>
                                                      <h6 className="ml-2">
                                                        <strong>D???ch v???:</strong>
                                                      </h6>
                                                      {dataBill.nguoi1.service === null
                                                        ? ''
                                                        : dataBill.nguoi1.service.map((item) => (
                                                            <div key={item.id} className="ml-2">
                                                              <p>{item.name_service}.</p>
                                                              <p> {item.total_time_work} ph??t.</p>
                                                              <p>
                                                                {' '}
                                                                {item.price.toLocaleString('it-IT', {
                                                                  style: 'currency',
                                                                  currency: 'VND',
                                                                })}
                                                                .
                                                              </p>
                                                            </div>
                                                          ))}
                                                    </div>

                                                    <div>
                                                      <h6 className="ml-2">
                                                        <strong>Nh??n vi??n:</strong>
                                                      </h6>
                                                      <div className="ml-2">
                                                        <p>{dataBill.nguoi1.staff.full_name}.</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            })()}
                                          </div>
                                          {dataBill.nguoi2 === null ? (
                                            ''
                                          ) : (
                                            <div className="person2 mt-2 border-top mt-2">
                                              <h3 className="card-title mt-2">Kh??ch 2</h3>
                                              {(() => {
                                                if (dataBill.nguoi2 && dataBill.nguoi2.staff) {
                                                  return (
                                                    <div className="d-md-flex justify-content-between ">
                                                      <div className="w-40">
                                                        <h6 className="ml-2">
                                                          <strong>Combo:</strong>
                                                        </h6>
                                                        {dataBill.nguoi2.combo === null
                                                          ? ''
                                                          : dataBill.nguoi2.combo.map((item) => (
                                                              <div key={item.id} className="ml-2">
                                                                <p>{item.name_combo}.</p>
                                                                <p> {item.total_time_work} ph??t.</p>
                                                                <p>
                                                                  {' '}
                                                                  {item.total_price.toLocaleString('it-IT', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                  })}
                                                                  .
                                                                </p>
                                                              </div>
                                                            ))}
                                                      </div>
                                                      <div>
                                                        <h6 className="ml-2">
                                                          <strong>D???ch v???:</strong>
                                                        </h6>
                                                        {dataBill.nguoi2.service === null
                                                          ? ''
                                                          : dataBill.nguoi2.service.map((item) => (
                                                              <div key={item.id} className="ml-2">
                                                                <p>{item.name_service}.</p>
                                                                <p> {item.total_time_work} ph??t.</p>
                                                                <p>
                                                                  {' '}
                                                                  {item.price.toLocaleString('it-IT', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                  })}
                                                                  .
                                                                </p>
                                                              </div>
                                                            ))}
                                                      </div>

                                                      <div>
                                                        <h6 className="ml-2">
                                                          <strong>Nh??n vi??n:</strong>
                                                        </h6>
                                                        <div className="ml-2">
                                                          <p>{dataBill.nguoi2.staff.full_name}.</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                }
                                              })()}
                                            </div>
                                          )}
                                          {dataBill.nguoi3 === null ? (
                                            ''
                                          ) : (
                                            <div className="person3 mt-2 border-top mt-2">
                                              <h3 className="card-title mt-2">Kh??ch 3</h3>
                                              {(() => {
                                                if (dataBill.nguoi3 && dataBill.nguoi3.staff) {
                                                  return (
                                                    <div className="d-md-flex justify-content-between ">
                                                      <div className="w-40">
                                                        <h6 className="ml-2">
                                                          <strong>Combo:</strong>
                                                        </h6>
                                                        {dataBill.nguoi3.combo === null
                                                          ? ''
                                                          : dataBill.nguoi3.combo.map((item) => (
                                                              <div key={item.id} className="ml-2">
                                                                <p>{item.name_combo}.</p>
                                                                <p> {item.total_time_work} ph??t.</p>
                                                                <p>
                                                                  {' '}
                                                                  {item.total_price.toLocaleString('it-IT', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                  })}
                                                                  .
                                                                </p>
                                                              </div>
                                                            ))}
                                                      </div>
                                                      <div>
                                                        <h6 className="ml-2">
                                                          <strong>D???ch v???:</strong>
                                                        </h6>
                                                        {dataBill.nguoi3.service === null
                                                          ? ''
                                                          : dataBill.nguoi3.service.map((item) => (
                                                              <div key={item.id} className="ml-2">
                                                                <p>{item.name_service}.</p>
                                                                <p> {item.total_time_work} ph??t.</p>
                                                                <p>
                                                                  {' '}
                                                                  {item.price.toLocaleString('it-IT', {
                                                                    style: 'currency',
                                                                    currency: 'VND',
                                                                  })}
                                                                  .
                                                                </p>
                                                              </div>
                                                            ))}
                                                      </div>

                                                      <div>
                                                        <h6 className="ml-2">
                                                          <strong>Nh??n vi??n:</strong>
                                                        </h6>
                                                        <div className="ml-2">
                                                          <p>{dataBill.nguoi3.staff.full_name}.</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                }
                                              })()}
                                            </div>
                                          )}
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
                  </div>
                </div>
              ) : (
                <>Ch??a c?? l???ch ?????t cho nh???ng ng??y t???i</>
              )}
              {historyBook.future && historyBook.future.length > 0 ? (
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3 show-left" style={{ paddingLeft: '10px' }}>
                      <p>
                        ??ang xem {pagefuture} trong {historyBook.future.length} m???c
                      </p>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3  show-right"
                      style={{ paddingRight: '40px' }}
                    >
                      <nav aria-label="Page navigation example">
                        <Pagination
                          onChange={(value) => setPagefuture(value)}
                          pageSize={postPagefuture}
                          total={totaltomorow}
                          current={pagefuture}
                        />
                      </nav>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default ListBooking;
