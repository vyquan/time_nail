import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getAllService } from '../../redux/actions/allService';
import { Discount } from '../../redux/actions/discount';
import { getCombo } from '../../redux/actions/combo';
import { getStaff } from '../../redux/actions/staff';
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Radio, Row, Select, Space, Spin } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { settings, time } from './constant';
import { isAuthenTicate } from '../Auth';
import { RegexConstants } from '../../helpers/regex';
import { AppRoutes } from '../../helpers/app.routes';
import moment from 'moment';
import { Booking } from '../../redux/actions/booking.js';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingPage = () => {
  const { Option } = Select;
  const history = useHistory();
  const [form] = Form.useForm();
  const [guest, setGuest] = useState(1);
  const [loading, setLoading] = useState(false);
  const allService = useSelector((state) => state.services.services);

  const combos = useSelector((state) => state.combos.combos);

  const staff = useSelector((state) => state.staff.staff);
  const [errorhandle, setErrorhandle] = useState({
    error: false,
    message: '',
  });

  const dispatch = useDispatch();
  const dataUser = isAuthenTicate();

  const [showModal, setShowModal] = useState(dataUser ? false : true);
  const handleCancelModal = () => {
    history.goBack();
  };
  useEffect(() => {
    dispatch(getAllService());
    dispatch(getCombo());
    dispatch(getStaff());
    //eslint-disable-next-line
  }, []);

  //Handle Check Staff
  const [checked1, setChecked1] = useState(0);
  const [checked2, setChecked2] = useState(0);
  const [checked3, setChecked3] = useState(0);

  //handle payment
  const [paymentServiceG1, setPaymentServiceG1] = useState([]);
  const [paymentServiceG2, setPaymentServiceG2] = useState([]);
  const [paymentServiceG3, setPaymentServiceG3] = useState([]);
  const [paymentComboG1, setPaymentComboG1] = useState([]);
  const [paymentComboG2, setPaymentComboG2] = useState([]);
  const [paymentComboG3, setPaymentComboG3] = useState([]);

  const handleChangeServiceG1 = (value) => {
    setPaymentServiceG1(value);
  };
  const handleChangeServiceG2 = (value) => {
    setPaymentServiceG2(value);
  };
  const handleChangeServiceG3 = (value) => {
    setPaymentServiceG3(value);
  };
  const handleChangeComboG1 = (value) => {
    setPaymentComboG1(value);
  };
  const handleChangeComboG2 = (value) => {
    setPaymentComboG2(value);
  };
  const handleChangeComboG3 = (value) => {
    setPaymentComboG3(value);
  };

  //guest 1
  const resultPaymentServiceG1 = allService.filter((service) => {
    return paymentServiceG1.some((id) => {
      return id === service.id;
    });
  });
  const payServiceG1 = resultPaymentServiceG1.reduce((prev, item) => {
    return prev + item.price;
  }, 0);
  const timeServiceG1 = resultPaymentServiceG1.reduce((prev, item) => {
    return prev + item.total_time_work;
  }, 0);
  const resultPaymentComboG1 = combos.filter((combo) => {
    return paymentComboG1.some((id) => {
      return id === combo.id;
    });
  });
  const payComboG1 = resultPaymentComboG1.reduce((prev, item) => {
    return prev + item.total_price;
  }, 0);
  const timeComboG1 = resultPaymentComboG1.reduce((prev, item) => {
    return prev + item.total_time_work;
  }, 0);
  const totalPaymentGuest1 = payServiceG1 + payComboG1;
  const totalTimeGuest1 = timeServiceG1 + timeComboG1;

  //guest 2
  const resultPaymentServiceG2 = allService.filter((service) => {
    return paymentServiceG2.some((id) => {
      return id === service.id;
    });
  });
  const payServiceG2 = resultPaymentServiceG2.reduce((prev, item) => {
    return prev + item.price;
  }, 0);
  const timeServiceG2 = resultPaymentServiceG2.reduce((prev, item) => {
    return prev + item.total_time_work;
  }, 0);

  const resultPaymentComboG2 = combos.filter((combo) => {
    return paymentComboG2.some((id) => {
      return id === combo.id;
    });
  });
  const payComboG2 = resultPaymentComboG2.reduce((prev, item) => {
    return prev + item.total_price;
  }, 0);
  const timeComboG2 = resultPaymentComboG2.reduce((prev, item) => {
    return prev + item.total_time_work;
  }, 0);

  const totalPaymentGuest2 = payServiceG2 + payComboG2;
  const totalTimeGuest2 = timeServiceG2 + timeComboG2;

  //guest 3
  const resultPaymentServiceG3 = allService.filter((service) => {
    return paymentServiceG3.some((id) => {
      return id === service.id;
    });
  });
  const payServiceG3 = resultPaymentServiceG3.reduce((prev, item) => {
    return prev + item.price;
  }, 0);
  const timeServiceG3 = resultPaymentServiceG3.reduce((prev, item) => {
    return prev + item.total_time_work;
  }, 0);
  const resultPaymentComboG3 = combos.filter((combo) => {
    return paymentComboG3.some((id) => {
      return id === combo.id;
    });
  });
  const payComboG3 = resultPaymentComboG3.reduce((prev, item) => {
    return prev + item.total_price;
  }, 0);
  const timeComboG3 = resultPaymentComboG3.reduce((prev, item) => {
    return prev + item.total_time_work;
  }, 0);
  const totalPaymentGuest3 = payServiceG3 + payComboG3;
  const totalTimeGuest3 = timeServiceG3 + timeComboG3;
  const totalPayment = totalPaymentGuest1 + totalPaymentGuest2 + totalPaymentGuest3;

  //handle discount
  const [data, setData] = useState([]);
  const [quoteIndex] = useState(0);
  const code_discount = data[quoteIndex] ? data[quoteIndex].code_discount : null;
  const percent = data[quoteIndex] ? data[quoteIndex].percent : null;

  const handleVoucher = () => {
    // setLoading(true);
    dispatch(Discount({ code_discount: form.getFieldValue('code_discount') }, setErrorhandle, setData));
  };

  const discount = percent / 100;
  const totalPaymentFinal = totalPayment - totalPayment * discount;

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Please select time!',
      },
    ],
  };
  const onFinish = (data) => {
    const dataSubmit = {
      user_id: dataUser.id,
      name: data.name,
      phone: data.phone,
      date_work: data.date.format('YYYY-MM-DD'),
      time_work: data.time,
      total_people: guest,
      code_discount: code_discount,
      total_bill: totalPaymentFinal,
      total_time_execution: '120',
      note_bill: data.message,
      member_1: 1,
      staff_1: checked1,
      service_id1: data.serviceGuest1,
      combo_id1: data.combosGuest1,
      member_2: 2,
      staff_2: checked2,
      service_id2: data.serviceGuest2,
      combo_id2: data.combosGuest2,
      member_3: 3,
      staff_3: checked3,
      service_id3: data.serviceGuest3,
      combo_id3: data.combosGuest3,
    };
    dispatch(Booking(dataSubmit));
    setLoading(true);
    window.scrollTo(0, 0);
    setTimeout(() => history.push(AppRoutes.bookingResult), 3000);
    // console.log(dataSubmit);
  };

  return (
    <>
      <div>
        <section className="breadcrumb-area bread-bg-7">
          <div className="breadcrumb-wrap">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-content text-center">
                    <div className="section-heading">
                      <h2 className="sec__title text-white">Đặt lịch giữ chỗ</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="listing-form section--padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 mx-auto">
                <ToastContainer />
                <Spin spinning={loading} tip="Đang gửi thông tin đặt lịch..." size="large">
                  <div className="form-box">
                    <div className="form-title-wrap">
                      <h3 className="title">Vui lòng nhập thông tin của bạn bên dưới</h3>
                    </div>
                    <div className="form-content contact-form-action">
                      <Form onFinish={onFinish} form={form} requiredMark={false} className="row" layout="vertical">
                        <div className="col-lg-6 responsive-column">
                          <Form.Item
                            name="name"
                            label={<label className="label-text">Họ và tên</label>}
                            initialValue={dataUser.user ? dataUser.user.full_name : dataUser.full_name}
                          >
                            <Input
                              size="large"
                              placeholder="Họ tên"
                              defaultValue={dataUser.user ? dataUser.user.full_name : dataUser.full_name}
                            />
                          </Form.Item>
                        </div>

                        <div className="col-lg-6 responsive-column">
                          <Form.Item
                            name="phone"
                            label={<label className="label-text">Số điện thoại</label>}
                            initialValue={dataUser.user ? dataUser.user.phone : dataUser.phone}
                            rules={[
                              { required: true, message: 'Vui lòng nhập số điện thoại của bạn.' },
                              { pattern: RegexConstants.PHONE, message: 'Số điện thoại không đúng định dạng.' },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Số điện thoại"
                              defaultValue={dataUser.user ? dataUser.user.phone : dataUser.phone}
                            />
                          </Form.Item>
                        </div>

                        <div className="col-lg-6 responsive-column">
                          <Form.Item
                            name="date"
                            {...config}
                            label={<label className="label-text">Chọn ngày</label>}
                            rules={[{ required: true, message: 'Vui lòng nhập ngày đặt.' }]}
                          >
                            <DatePicker
                              size="large"
                              placeholder="dd/mm/yyyy"
                              disabledDate={(current) => {
                                return (
                                  (current && current < moment().add(-1, 'day')) || current > moment().add(6, 'day')
                                );
                              }}
                              className="w-100"
                            />
                          </Form.Item>
                        </div>

                        <div className="col-lg-6 responsive-column">
                          <Form.Item
                            name="time"
                            label={<label className="label-text w-100">Chọn khung giờ</label>}
                            rules={[{ required: true, message: 'Vui lòng nhập giờ  đặt.' }]}
                          >
                            <Select size="large" placeholder="Chọn giờ" className="w-100" options={time} />
                          </Form.Item>
                        </div>
                        <Divider />
                        <div className="col-lg-12 mb-2 responsive-column ">
                          <Form.Item name="total_people" label={<h4 className="label-text mb-2">SỐ KHÁCH</h4>}>
                            <Radio.Group
                              name="total_people"
                              defaultValue={1}
                              buttonStyle="solid"
                              size="large"
                              onChange={(e) => {
                                setGuest(e.target.value);
                              }}
                            >
                              <Radio.Button value={1}>Một</Radio.Button>
                              <Radio.Button value={2}>Hai</Radio.Button>
                              <Radio.Button value={3}>Ba</Radio.Button>
                            </Radio.Group>
                          </Form.Item>
                        </div>

                        <div className="col-lg-12 responsive-column section-tab check-mark-tab pb-4">
                          <h4 className="label-text mb-2 mt-3">KHÁCH 1</h4>
                          <label className="label-text mb-4">Chọn Nhân viên</label>
                          <Slider {...settings}>
                            {staff.filter((item, index) => (
                              <div
                                key={index}
                                className="staff-content d-flex justify-content-center"
                                onClick={() => setChecked1(item.id)}
                              >
                                <div className={`${checked1 === item.id ? 'active' : ''} staff-options`}>
                                  <i
                                    className="la la-check icon-element"
                                    style={{ display: checked1 === item.id ? 'block' : 'none' }}
                                  ></i>
                                  <img className="staff-img" src={item.avatar} alt="avatar" />
                                  <div className="staff-bio text-center">
                                    <h4 className="staff__title">{item.full_name}</h4>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                        <div className="col-lg-12 responsive-column">
                          <Form.Item name="serviceGuest1" label={<label className="label-text">Các dịch vụ lẻ</label>}>
                            <Select
                              size="large"
                              mode="multiple"
                              placeholder="Chọn dịch vụ"
                              showArrow
                              showSearch={true}
                              onChange={handleChangeServiceG1}
                              className="form-group select-contain w-100"
                            >
                              {allService && allService.length > 0
                                ? allService.map((item, index) => (
                                    <Option key={index} value={item.id}>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <span className="w-lg">{item.name_service}</span>
                                        <span className="w-sm">({item.total_time_work} phút)</span>
                                        <span className="w-sm">
                                          {item.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                        </span>
                                      </div>
                                    </Option>
                                  ))
                                : 0}
                            </Select>
                          </Form.Item>
                        </div>
                        <div className="col-lg-12 responsive-column">
                          <Form.Item
                            name="combosGuest1"
                            label={<label className="label-text">Chọn các gói Combo</label>}
                          >
                            <Select
                              size="large"
                              mode="multiple"
                              placeholder="Chọn combo"
                              showArrow
                              showSearch={true}
                              onChange={handleChangeComboG1}
                              className="form-group select-contain w-100"
                            >
                              {combos && combos.length > 0
                                ? combos.map((combo, index) => (
                                    <Option key={index} value={combo.id}>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <span className="w-lg">{combo.name_combo}</span>
                                        <span className="w-sm">{combo.total_time_work} phút</span>
                                        <span className="w-sm">
                                          {combo.total_price?.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                          })}
                                        </span>
                                      </div>
                                    </Option>
                                  ))
                                : ''}
                            </Select>
                          </Form.Item>
                          <div className="float-right">
                            <p>
                              Tổng giá Khách 1:{' '}
                              <span className="font-medium float-right">
                                {totalPaymentGuest1?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                              </span>
                            </p>
                            <p>
                              Thời gian ước tính:{' '}
                              <span className="font-medium float-right">{totalTimeGuest1} phút</span>
                            </p>
                          </div>
                        </div>

                        <div
                          className="col-lg-12 responsive-column section-tab check-mark-tab pb-4"
                          style={{ display: guest === 2 || guest === 3 ? ' block' : 'none' }}
                        >
                          <Divider />
                          <h4 className="label-text mb-2 mt-3">KHÁCH 2</h4>
                          <label className="label-text mb-4">Chọn Nhân viên</label>
                          <Slider {...settings}>
                            {staff.map((item, index) => (
                              <div
                                key={index}
                                className="staff-content d-flex justify-content-center"
                                onClick={() => setChecked2(item.id)}
                              >
                                <div className={`${checked2 === item.id ? 'active' : ''} staff-options`}>
                                  <i
                                    className="la la-check icon-element"
                                    style={{ display: checked2 === item.id ? 'block' : 'none' }}
                                  ></i>
                                  <img className="staff-img" src={item.avatar} alt="avatar" />
                                  <div className="staff-bio text-center">
                                    <h4 className="staff__title">{item.full_name}</h4>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                        <div
                          className="col-lg-12 responsive-column"
                          style={{ display: guest === 2 || guest === 3 ? ' block' : 'none' }}
                        >
                          <Form.Item name="serviceGuest2" label={<label className="label-text">Các dịch vụ lẻ</label>}>
                            <Select
                              size="large"
                              mode="multiple"
                              placeholder="Chọn dịch vụ"
                              showArrow
                              showSearch={true}
                              onChange={handleChangeServiceG2}
                              className="form-group select-contain w-100"
                            >
                              {allService && allService.length > 0
                                ? allService.map((item, index) => (
                                    <Option key={index} value={item.id}>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <span className="w-lg">{item.name_service}</span>
                                        <span className="w-sm">{item.total_time_work} phút</span>
                                        <span className="w-sm">
                                          {item.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}{' '}
                                        </span>
                                      </div>
                                    </Option>
                                  ))
                                : ''}
                            </Select>
                          </Form.Item>
                        </div>
                        <div
                          className="col-lg-12 responsive-column"
                          style={{ display: guest === 2 || guest === 3 ? ' block' : 'none' }}
                        >
                          <Form.Item
                            name="combosGuest2"
                            label={<label className="label-text">Chọn các gói Combo</label>}
                          >
                            <Select
                              size="large"
                              mode="multiple"
                              placeholder="Chọn combo"
                              showArrow
                              showSearch={true}
                              onChange={handleChangeComboG2}
                              className="form-group select-contain w-100"
                            >
                              {combos && combos.length > 0
                                ? combos.map((combo, index) => (
                                    <Option key={index} value={combo.id}>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <span className="w-lg">{combo.name_combo}</span>
                                        <span className="w-sm">{combo.total_time_work} phút</span>
                                        <span className="w-sm">
                                          {combo.total_price?.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                          })}
                                        </span>
                                      </div>
                                    </Option>
                                  ))
                                : ''}
                            </Select>
                          </Form.Item>
                          <div className="float-right">
                            <p>
                              Tổng giá Khách 2:{' '}
                              <span className="font-medium float-right">
                                {totalPaymentGuest2?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                              </span>
                            </p>
                            <p>
                              Thời gian ước tính:{' '}
                              <span className="font-medium float-right">{totalTimeGuest2} phút</span>
                            </p>
                          </div>
                        </div>

                        <div
                          className="col-lg-12 responsive-column section-tab check-mark-tab pb-4"
                          style={{ display: guest === 3 ? ' block' : 'none' }}
                        >
                          <Divider />
                          <h4 className="label-text mb-2 mt-3">KHÁCH 3</h4>
                          <label className="label-text mb-4">Chọn Nhân viên</label>
                          <Slider {...settings}>
                            {staff.map((item, index) => (
                              <div
                                key={index}
                                className="staff-content d-flex justify-content-center"
                                onClick={() => setChecked3(item.id)}
                              >
                                <div className={`${checked3 === item.id ? 'active' : ''} staff-options`}>
                                  <i
                                    className="la la-check icon-element"
                                    style={{ display: checked3 === item.id ? 'block' : 'none' }}
                                  ></i>
                                  <img className="staff-img" src={item.avatar} alt="avatar" />
                                  <div className="staff-bio text-center">
                                    <h4 className="staff__title">{item.full_name}</h4>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </div>
                        <div
                          className="col-lg-12 responsive-column"
                          style={{ display: guest === 3 ? ' block' : 'none' }}
                        >
                          <Form.Item name="serviceGuest3" label={<label className="label-text">Các dịch vụ lẻ</label>}>
                            <Select
                              size="large"
                              mode="multiple"
                              placeholder="Chọn dịch vụ"
                              showArrow
                              showSearch={true}
                              onChange={handleChangeServiceG3}
                              className="form-group select-contain w-100"
                            >
                              {allService && allService.length > 0
                                ? allService.map((item, index) => (
                                    <Option key={index} value={item.id}>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <span className="w-lg">{item.name_service}</span>
                                        <span className="w-sm">{item.total_time_work} phút</span>
                                        <span className="w-sm">
                                          {item.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                        </span>
                                      </div>
                                    </Option>
                                  ))
                                : 0}
                            </Select>
                          </Form.Item>
                        </div>
                        <div
                          className="col-lg-12 responsive-column"
                          style={{ display: guest === 3 ? ' block' : 'none' }}
                        >
                          <Form.Item
                            name="combosGuest3"
                            label={<label className="label-text">Chọn các gói Combo</label>}
                          >
                            <Select
                              size="large"
                              mode="multiple"
                              placeholder="Chọn combo"
                              showArrow
                              showSearch={true}
                              onChange={handleChangeComboG3}
                              className="form-group select-contain w-100"
                            >
                              {combos && combos.length > 0
                                ? combos.map((combo, index) => (
                                    <Option key={index} value={combo.id}>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <span className="w-lg">{combo.name_combo}</span>
                                        <span className="w-sm">{combo.total_time_work} phút</span>
                                        <span className="w-sm">
                                          {combo.total_price?.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                          })}
                                        </span>
                                      </div>
                                    </Option>
                                  ))
                                : ''}
                            </Select>
                          </Form.Item>
                          <div className="float-right">
                            <p>
                              Tổng giá Khách 3:{' '}
                              <span className="font-medium float-right">
                                {totalPaymentGuest3?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                              </span>
                            </p>
                            <p>
                              Thời gian ước tính:
                              <span className="font-medium float-right">{totalTimeGuest3} phút</span>
                            </p>
                          </div>
                        </div>

                        <div className="col-lg-12 responsive-column">
                          <Divider />
                          <Form.Item
                            help={errorhandle.message}
                            validateStatus={percent === null ? 'error' : ''}
                            extra={percent !== null ? `Mã giảm giá ${percent} %` : ``}
                            label={<label className="label-text">Voucher của cửa hàng</label>}
                          >
                            <Row gutter={12}>
                              <Col span={12}>
                                <Form.Item name="code_discount" noStyle>
                                  <Input
                                    size="large"
                                    placeholder="Nhập Voucher"
                                    suffix={percent === null ? '' : <CheckCircleTwoTone twoToneColor="#52c41a" />}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Button type="primary" size="large" onClick={handleVoucher}>
                                  Áp dụng
                                </Button>
                              </Col>
                            </Row>
                          </Form.Item>
                        </div>

                        <div className="col-lg-12 responsive-column">
                          <Form.Item name="                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    " label={<label className="label-text">Ghi chú</label>}>
                            <Input.TextArea style={{ height: '100px' }} placeholder="VD: Mình cần tư vấn" />
                          </Form.Item>
                        </div>
                        <div className="col-lg-12">
                          <ul className="list-items list-items-2 py-3">
                            <li style={{ display: percent === null ? 'none' : 'block' }}>
                              Tổng:
                              <span className="font-medium float-right" style={{ opacity: 0.7 }}>
                                {totalPayment?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                              </span>
                            </li>
                            <li style={{ display: percent === null ? 'none' : 'block' }}>
                              Voucher:{' '}
                              <span className="font-medium float-right" style={{ opacity: 0.7 }}>
                                {percent} %
                              </span>
                            </li>
                            <li>
                              <h3 className="total-bill">
                                Tổng giá:{' '}
                                <span className="font-medium float-right">
                                  {totalPaymentFinal?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </span>
                              </h3>
                            </li>
                          </ul>
                        </div>
                        <div className="col-lg-12  pt-3 ">
                          <button type="submit" className="theme-btn m-auto w-100">
                            ĐẶT LỊCH <i className="la la-arrow-right ml-1" />
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        visible={showModal}
        onCancel={handleCancelModal}
        footer={
          <div className="d-flex">
            <Button block className="modal-action-login">
              <Link to={AppRoutes.home}>TRANG CHỦ</Link>
            </Button>
            <Button type="primary" block className="modal-action-login">
              <Link to={AppRoutes.login}>ĐĂNG NHẬP</Link>
            </Button>
          </div>
        }
        centered
        width={350}
      >
        <h3 className="text-center title pt-5">Bạn vui lòng đăng nhập để đặt lịch</h3>
      </Modal>
    </>
  );
};

export default BookingPage;
