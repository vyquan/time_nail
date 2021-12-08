import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getAllService } from '../../redux/actions/allService';
import { Discount } from '../../redux/actions/discount';
import { getCombo } from '../../redux/actions/combo';
import { getStaff } from '../../redux/actions/staff';
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Radio, Row, Select } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { settings, time } from './constant';
import { isAuthenTicate } from '../Auth';
import { RegexConstants } from '../../helpers/regex';
import { AppRoutes } from '../../helpers/app.routes';
import moment from 'moment';
import { Booking } from '../../redux/actions/booking.js';
import { Link } from 'react-router-dom';

const BookingPage = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [guest, setGuest] = useState(1);
  const [loading, setLoading] = useState(false);
  const allService = useSelector((state) => state.services.services);
  const combos = useSelector((state) => state.combos.combos);
  const staff = useSelector((state) => state.staff.staff);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const dataUser = isAuthenTicate();

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

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleVoucher = () => {
    setLoading(true);
    dispatch(Discount({ code_discount: form.getFieldValue('voucher') }));
  };

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
      code_discount: '12THANG12',
      total_bill: '100000',
      total_time_execution: '120',
      // message: data.message,
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
    console.log(dataSubmit);
    // onBooking({ variables: { input: { ...dataSubmit } } });
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
                <div className="form-box">
                  <div className="form-title-wrap">
                    <h3 className="title">Vui lòng nhập thông tin của bạn bên dưới</h3>
                  </div>
                  <div className="form-content contact-form-action">
                    <Form onFinish={onFinish} form={form} requiredMark={false} className="row" layout="vertical">
                      <div className="col-lg-6 responsive-column">
                        <Form.Item name="name" label={<label className="label-text">Họ và tên</label>}>
                          <Input size="large" placeholder="Họ tên" />
                        </Form.Item>
                      </div>

                      <div className="col-lg-6 responsive-column">
                        <Form.Item
                          name="phone"
                          label={<label className="label-text">Số điện thoại</label>}
                          rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại của bạn' },
                            { pattern: RegexConstants.PHONE, message: 'Số điện thoại không đúng định dạng.' },
                          ]}
                        >
                          <Input size="large" placeholder="Số điện thoại" />
                        </Form.Item>
                      </div>

                      <div className="col-lg-6 responsive-column">
                        <Form.Item
                          name="date"
                          {...config}
                          label={<label className="label-text">Chọn ngày</label>}
                          rules={[{ required: true, message: 'Vui lòng nhập ngày đặt!' }]}
                        >
                          <DatePicker
                            size="large"
                            placeholder="dd/mm/yyyy"
                            disabledDate={(current) => {
                              return (current && current < moment().add(-1, 'day')) || current > moment().add(6, 'day');
                            }}
                            className="w-100"
                          />
                        </Form.Item>
                      </div>

                      <div className="col-lg-6 responsive-column">
                        <Form.Item
                          name="time"
                          label={<label className="label-text w-100">Chọn khung giờ</label>}
                          rules={[{ required: true, message: 'Vui lòng nhập giờ  đặt!' }]}
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
                          {staff.map((item, index) => (
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
                            onChange={handleChange}
                            className="form-group select-contain w-100"
                          >
                            {allService.map((item, index) => (
                              <Option key={index} value={item.id}>
                                <div className="d-flex align-items-center justify-content-between">
                                  <span className="w-lg">{item.name_service}</span>
                                  <span className="w-sm">({item.total_time_work} phút)</span>
                                  <span className="w-sm">{item.price} đ</span>
                                </div>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-lg-12 responsive-column">
                        <Form.Item name="combosGuest1" label={<label className="label-text">Chọn các gói Combo</label>}>
                          <Select
                            size="large"
                            mode="multiple"
                            placeholder="Chọn combo"
                            showArrow
                            showSearch={true}
                            onChange={handleChange}
                            className="form-group select-contain w-100"
                          >
                            {combos.map((combo, index) => (
                              <Option key={index} value={combo.id}>
                                <div className="d-flex align-items-center justify-content-between">
                                  <span className="w-lg">{combo.name_combo}</span>
                                  <span className="w-sm">{combo.total_time_work} phút</span>
                                  <span className="w-sm">{combo.total_price} đ</span>
                                </div>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <div className="float-right">
                          Tổng giá Khách 1: <span className="font-medium">100.000 vnđ</span>
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
                            className="form-group select-contain w-100"
                          >
                            {allService.map((item, index) => (
                              <Option key={index} value={item.id}>
                                <div className="d-flex align-items-center justify-content-between">
                                  <span className="w-lg">{item.name_service}</span>
                                  <span className="w-sm">{item.total_time_work} phút</span>
                                  <span className="w-sm">{item.price} đ</span>
                                </div>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                      <div
                        className="col-lg-12 responsive-column"
                        style={{ display: guest === 2 || guest === 3 ? ' block' : 'none' }}
                      >
                        <Form.Item name="combosGuest2" label={<label className="label-text">Chọn các gói Combo</label>}>
                          <Select
                            size="large"
                            mode="multiple"
                            placeholder="Chọn combo"
                            showArrow
                            showSearch={true}
                            className="form-group select-contain w-100"
                          >
                            {combos.map((combo, index) => (
                              <Option key={index} value={combo.id}>
                                <div className="d-flex align-items-center justify-content-between">
                                  <span className="w-lg">{combo.name_combo}</span>
                                  <span className="w-sm">{combo.total_time_work} phút</span>
                                  <span className="w-sm">{combo.total_price} đ</span>
                                </div>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <div className="float-right">
                          Tổng giá Khách 2: <span className="font-medium">100.000 vnđ</span>
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
                      <div className="col-lg-12 responsive-column" style={{ display: guest === 3 ? ' block' : 'none' }}>
                        <Form.Item name="serviceGuest3" label={<label className="label-text">Các dịch vụ lẻ</label>}>
                          <Select
                            size="large"
                            mode="multiple"
                            placeholder="Chọn dịch vụ"
                            showArrow
                            showSearch={true}
                            className="form-group select-contain w-100"
                          >
                            {allService.map((item, index) => (
                              <Option key={index} value={item.id}>
                                <div className="d-flex align-items-center justify-content-between">
                                  <span className="w-lg">{item.name_service}</span>
                                  <span className="w-sm">{item.total_time_work} phút</span>
                                  <span className="w-sm">{item.price} đ</span>
                                </div>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-lg-12 responsive-column" style={{ display: guest === 3 ? ' block' : 'none' }}>
                        <Form.Item name="combosGuest3" label={<label className="label-text">Chọn các gói Combo</label>}>
                          <Select
                            size="large"
                            mode="multiple"
                            placeholder="Chọn combo"
                            showArrow
                            showSearch={true}
                            className="form-group select-contain w-100"
                          >
                            {combos.map((combo, index) => (
                              <Option key={index} value={combo.id}>
                                <div className="d-flex align-items-center justify-content-between">
                                  <span className="w-lg">{combo.name_combo}</span>
                                  <span className="w-sm">{combo.total_time_work} phút</span>
                                  <span className="w-sm">{combo.total_price} đ</span>
                                </div>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <div className="float-right">
                          Tổng giá Khách 3: <span className="font-medium">100.000 vnđ</span>
                        </div>
                      </div>

                      <div className="col-lg-12 responsive-column">
                        <Divider />
                        <Form.Item
                          extra="Nhập mã Voucher để nhận ưu đãi giảm giá."
                          label={<label className="label-text">Voucher của cửa hàng</label>}
                        >
                          <Row gutter={12}>
                            <Col span={12}>
                              <Form.Item name="code_discount" noStyle>
                                <Input
                                  size="large"
                                  placeholder="Nhập Voucher"
                                  suffix={<CheckCircleTwoTone twoToneColor="#52c41a" />}
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

                      <div className="col-lg-12">
                        <Form.Item name="message" label={<label className="label-text">Ghi chú</label>}>
                          <Input.TextArea style={{ height: '100px' }} placeholder="VD: Mình cần tư vấn" />
                        </Form.Item>
                      </div>
                      <div className="col-lg-12  ">
                        <ul className="list-items list-items-2 py-3">
                          <li>
                            Voucher: <span style={{ opacity: 0.7 }}>-100.000 vnđ</span>
                          </li>
                          <li>
                            <h3 className="total-bill">
                              Tổng giá: <span>1.500.000 vnđ</span>
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
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={
          <div className="d-flex">
            <Button type="primary" block className="modal-action-login">
              <Link to={AppRoutes.login}>ĐĂNG NHẬP</Link>
            </Button>
          </div>
        }
        centered
        width={400}
      >
        <h3 className="text-center title pt-5">Vui lòng đăng nhập để đặt lịch</h3>
      </Modal>
    </>
  );
};

export default BookingPage;
