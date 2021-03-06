import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import historyBookAPI from '../../api/historyBook';
import { historyBillDetail, historyBookInfo } from '../../redux/actions/historyBook';
import { Button, Modal, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../helpers/app.routes';
import { MoreOutlined } from '@ant-design/icons';

const BookingHistory = React.memo(() => {
  const [HistoryBook, setHistoryBook] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModalCconfirm, setShowModalConfirm] = useState(false);
  const [idCancel, setIdCancel] = useState();
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
  const curentPosts = HistoryBook && HistoryBook.length > 0 ? HistoryBook?.slice(firstPageIndex, lastPageIndex) : "";

  const dataBill = useSelector((state) => state.listbookHistory.billDetail);
  const showDetailBill = async (item) => {
    dispatch(historyBillDetail(item));
  };

  
  const handelCancelBile = () => {
    setShowModalConfirm(false);
    historyBookAPI.CancelBill(idCancel).then(result => {dispatch(historyBookInfo(id));window.location.reload()})
    // window.location.reload()
  };
  return (
    <>
      <div className="col-lg-9">
        <div className="form-box">
          <div className="form-title-wrap">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="title">L???ch ?????t c???a t??i</h3>
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
                      <th scope="col">Ng??y</th>
                      <th scope="col">Th???i gian</th>
                      <th scope="col">S??? ??i???n tho???i</th>
                      <th scope="col"></th>
                      <th scope="col">Tr???ng th??i</th>
                      <th scope="col">Chi ti???t</th>
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
                                <Link to={`/feedback/${item.id}`} hidden style={{ textDecoration: 'underline' }}>
                                  ????nh gi?? d???ch v???
                                </Link>
                              ) : (
                                <Link to={`/feedback/${item.id}`} style={{ textDecoration: 'underline' }}>
                                  ????nh gi?? d???ch v???
                                </Link>
                              )
                            ) : (
                              ''
                            )}
                            {item.status_bill === 1 ? (
                              <div
                                onClick={() => {setIdCancel(item.id);setShowModalConfirm(true)}}
                                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                              >
                                H???y l???ch ?????t
                              </div>
                            ) : ""}
                          </td>
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
                              footer={true}
                              style={{ width: '100%', resize: 'none' }}
                            >
                              <div className="card-item user-card card-item-list mt-2 mb-0">
                                <div className="card-body">
                                  <ul className="list-items list-items-2 flex-grow-1" key={item.id}>
                                    <li>
                                      <span>
                                        <strong>Tr???ng th??i bill:</strong>
                                      </span>

                                      {(() => {
                                        if (dataBill.bill ? dataBill.bill.status_bill === 1 : '') {
                                          return <span className="ml-2">Ch??? x??c nh???n.</span>;
                                        } else if (dataBill.bill ? dataBill.bill.status_bill === 2 : '') {
                                          return <span className="ml-2">X??c nh???n th??nh c??ng.</span>;
                                        } else if (dataBill.bill ? dataBill.bill.status_bill === 3 : '') {
                                          return <span className="ml-2">??ang l??m.</span>;
                                        } else if (dataBill.bill ? dataBill.bill.status_bill === 4 : '') {
                                          return <span className="ml-2">Ho??n th??nh.</span>;
                                        } else if (dataBill.bill ? dataBill.bill.status_bill === 5 : '') {
                                          return <span className="ml-2">H???y.</span>;
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
                                  <div className="person1 mt-2 border-top">
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
                                    <div className="person2 mt-2 border-top">
                                      <h3 className="card-title mt-2">Kh??ch 2</h3>

                                      {(() => {
                                        if (dataBill.nguoi2 && dataBill.nguoi2.staff) {
                                          return (
                                            <div className="d-flex justify-content-between  ">
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
                                                        <span>{item.name_service}.</span>
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
                                    <div className="person3 mt-2 border-top">
                                      <h3 className="card-title mt-2">Kh??ch 3</h3>
                                      {(() => {
                                        if (dataBill.nguoi3 && dataBill.nguoi3.staff) {
                                          return (
                                            <div className="d-flex justify-content-between  ">
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
                            </Modal>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>
                  B???n ch??a c?? l???ch ?????t n??o! <Link to={AppRoutes.booking}>?????t L???ch</Link> ngay ????? tr???i nghi???m nhi???u d???ch v??? l??m ?????p ch???t l?????ng ?????n t??? Times Nail
                </p>
              )}
            </div>
          </div>
          {HistoryBook && HistoryBook.length > 0 ? (
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 show-left" style={{ paddingLeft: '40px' }}>
                  <p>
                    ??ang xem {page} - {postPerPage * page} trong {HistoryBook.length} m???c
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
      <Modal
        visible={showModalCconfirm}
        onCancel={()=> setShowModalConfirm(false)}
        footer={
          <div className="d-flex">
            <Button block className="modal-action-login" onClick={()=> setShowModalConfirm(false)}>
              Tho??t
            </Button>
            <Button type="primary" block className="modal-action-login" onClick={handelCancelBile}>
              Hu???
            </Button>
          </div>
        }
        centered
        width={350}
      >
        <p className="text-center title pt-5">B???n vui c?? mu???n hu??? l???ch ???? ?????t ?</p>
      </Modal>
    </>
  );
});

export default BookingHistory;
