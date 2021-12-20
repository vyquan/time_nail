import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { Discount } from '../../redux/actions/discount';
import { checkUnavailable, getStaff } from '../../redux/actions/staff';
import { Button, Col, Collapse, DatePicker, Divider, Form, Input, Modal, Radio, Row, Select, Spin } from 'antd';
import { CheckCircleTwoTone, CaretRightOutlined, UserOutlined } from '@ant-design/icons';
import { time, settings } from './constant';
import { isAuthenTicate } from '../Auth';
import { RegexConstants } from '../../helpers/regex';
import { AppRoutes } from '../../helpers/app.routes';
import moment from 'moment';
import { Booking } from '../../redux/actions/booking.js';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertMinsToHrsMins } from '../../helpers/format';
import AllServiceAPI from '../../api/allServiceAPI';
import ComboAPI from '../../api/comboAPI';

const BookingPage = () => {
  const { Option } = Select;
  const { Panel } = Collapse;
  const history = useHistory();
  const [form] = Form.useForm();
  const [guest, setGuest] = useState(1);
  const [loading, setLoading] = useState(false);
  const staff = useSelector((state) => state.staff.staff);
  const [errorhandle, setErrorhandle] = useState({
    error: false,
    message: '',
  });

  const dispatch = useDispatch();
  const dataUser = isAuthenTicate();

  const [showModal, setShowModal] = useState(dataUser ? false : true);
  const [showModalStaff, setShowModalStaff] = useState(false);
  const handleCancelModalStaff = () => {
    setShowModalStaff(false);
  };
  const handleCancelModal = () => {
    history.goBack();
  };

  const [allService, setAllService] = useState([])
  useEffect(() => {
    const getAllService = async () => {
      try {
        const { data: allService } = await AllServiceAPI.getAll();
        setAllService(allService);
      } catch (error) {
        console.log(error);
      }
    };
    getAllService();
  }, []);

  const [combos, setCombos] = useState([])
  useEffect(() => {
    const getCombos = async () => {
      try {
        const { data: combos } = await ComboAPI.getAll();
        setCombos(combos);
      } catch (error) {
        console.log(error);
      }
    };
    getCombos();
  }, []);

  useEffect(() => {
    dispatch(getStaff());
  },[]);
  // ID nhân viên mặc định
  const idStaffDefault = 198;
  //Handle Check Staff
  const [checked1, setChecked1] = useState(idStaffDefault);
  const [checked2, setChecked2] = useState(idStaffDefault);
  const [checked3, setChecked3] = useState(idStaffDefault);
  const [timeUnavailable, setTimeUnavailable] = useState({});
  const arrUnavailable = Object.values(timeUnavailable);
  const [dateWork, setDateWork] = useState();

  const handleCheckUnavailable = () => {
    if (form.getFieldValue('date')) {
      setDateWork(form.getFieldValue('date'));
      dispatch(
        checkUnavailable(
          { date: form.getFieldValue('date').format('YYYY-MM-DD'), time: form.getFieldValue('time') },
          setTimeUnavailable,
        ),
      );
    } else {
      return;
    }
  };
  const today = new Date();
  const currentTime = today.getHours() + ':' + today.getMinutes();
  const currentDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  //handle payment
  const [paymentServiceG1, setPaymentServiceG1] = useState([]);
  const [paymentServiceG2, setPaymentServiceG2] = useState([]);
  const [paymentServiceG3, setPaymentServiceG3] = useState([]);
  const [paymentComboG1, setPaymentComboG1] = useState([]);
  const [paymentComboG2, setPaymentComboG2] = useState([]);
  const [paymentComboG3, setPaymentComboG3] = useState([]);

  const validation1 = () => (paymentServiceG1.length || paymentComboG1.length) ===0 ? true : false
  const validation2 = () => guest === 2 && ( paymentServiceG2.length || paymentComboG2.length) === 0 ? true : false
  const validation3 = () => guest === 3 && ( paymentServiceG3.length || paymentComboG3.length) === 0 ? true : false
  
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
  const [dataDiscount, setDataDiscount] = useState([]);
  const [quoteIndex] = useState(0);
  const code_discount = dataDiscount[quoteIndex] ? dataDiscount[quoteIndex].code_discount : null;
  const percent = dataDiscount[quoteIndex] ? dataDiscount[quoteIndex].percent : null;

  const handleVoucher = () => {
    // setLoading(true);
    dispatch(Discount({ code_discount: form.getFieldValue('code_discount') }, setErrorhandle, setDataDiscount));
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
      user_id: dataUser.id || dataUser.user.id,
      name: data.name,
      phone: data.phone,
      date_work: data.date.format('YYYY-MM-DD'),
      time_work: data.time,
      total_people: guest,
      code_discount: code_discount,
      total_bill: totalPaymentFinal,
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
                        <div className="col-lg-6 ">
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

                        <div className="col-lg-6 ">
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

                        <div className="col-lg-6 ">
                          <Form.Item
                            name="date"
                            {...config}
                            label={<label className="label-text">Chọn ngày</label>}
                            rules={[{ required: true, message: 'Vui lòng nhập ngày đặt.' }]}
                          >
                            <DatePicker
                              onChange={handleCheckUnavailable}
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

                        <div className="col-lg-6 ">
                          <Form.Item
                            name="time"
                            label={<label className="label-text w-100">Chọn khung giờ</label>}
                            rules={[{ required: true, message: 'Vui lòng nhập giờ  đặt.' }]}
                          >
                            <Select
                              onChange={handleCheckUnavailable}
                              size="large"
                              placeholder="Chọn giờ"
                              className="w-100"
                            >
                              {time.map((time, i) => {
                                const str1 = currentTime.split(':');
                                const str2 = time.value.split(':');
                                const totalSeconds1 = parseInt(str1[0] * 3600 + str1[1]);
                                const totalSeconds2 = parseInt(str2[0] * 3600 + str2[1]);
                                // compare them

                                if (form.getFieldValue('date')) {
                                  if (form.getFieldValue('date').format('YYYY-MM-DD') === currentDay) {
                                    if (totalSeconds1 < totalSeconds2) {
                                      return (
                                        <Option key={i} value={time.value}>
                                          {time.label}
                                        </Option>
                                      );
                                    }
                                  } else {
                                    return (
                                      <Option key={i} value={time.value}>
                                        {time.label}
                                      </Option>
                                    );
                                  }
                                } else {
                                  return (
                                    <Option key={i} value={time.value}>
                                      {time.label}
                                    </Option>
                                  );
                                }
                              })}
                            </Select>
                          </Form.Item>
                        </div>
                        <Divider />
                        <div className="col-lg-12 mb-2  ">
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

                        <div className="col-lg-12  section-tab check-mark-tab pb-4">
                          <h4 className="label-text mb-2 mt-3">KHÁCH 1</h4>

                          <Collapse
                            ghost
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            expandIconPosition="right"
                          >
                            <Panel
                              header={
                                <label className="label-text mb-4 d-flex align-items-center">
                                  <UserOutlined className="mr-1" /> Chọn Nhân viên
                                </label>
                              }
                            >
                              <Slider {...settings}>
                                {staff.map((item, index) => (
                                  <div
                                    key={index}
                                    className={`${
                                      (item.id !== checked2 &&
                                        item.id !== checked3 &&
                                        arrUnavailable.indexOf(item.id) === -1) ||
                                      item.id === idStaffDefault
                                        ? 'cursor-pointern'
                                        : 'cursor-not-allowed disabled'
                                    } staff-content d-flex justify-content-center pt-2 pb-2`}
                                    onClick={() =>
                                      (item.id !== checked2 &&
                                        item.id !== checked3 &&
                                        arrUnavailable.indexOf(item.id) === -1) ||
                                      item.id === idStaffDefault
                                        ? setChecked1(item.id)
                                        : setShowModalStaff(true)
                                    }
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
                            </Panel>
                          </Collapse>
                        </div>
                        <div className="col-lg-12 ">
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
                        <div className="col-lg-12 ">
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
                              &nbsp;{totalPaymentGuest1?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                              </span>
                            </p>
                            <p>
                              Thời gian ước tính:{' '}
                              <span className="font-medium float-right">&nbsp;{convertMinsToHrsMins(totalTimeGuest1)}</span>
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <Form.Item
                            name="guest1"
                            className='text-center'
                            rules={[
                              {
                                required: validation1(),
                                message: 'Vui lòng chọn dịch vụ hoặc combo.',
                              },
                            ]}
                          >
                            <Input bordered={false} disabled={true}/>
                          </Form.Item>
                        </div>
                        <div
                          className="col-lg-12  section-tab check-mark-tab pb-4"
                          style={{ display: guest === 2 || guest === 3 ? ' block' : 'none' }}
                        >
                          <Divider />
                          <h4 className="label-text mb-2 mt-3">KHÁCH 2</h4>
                          <Collapse
                            ghost
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            expandIconPosition="right"
                          >
                            <Panel
                              header={
                                <label className="label-text mb-4 d-flex align-items-center">
                                  <UserOutlined className="mr-1" /> Chọn Nhân viên
                                </label>
                              }
                            >
                              <Slider {...settings}>
                                {staff.map((item, index) => (
                                  <div
                                    key={index}
                                    className={`${
                                      (item.id !== checked1 &&
                                        item.id !== checked3 &&
                                        arrUnavailable.indexOf(item.id) === -1) ||
                                      item.id === idStaffDefault
                                        ? 'cursor-pointern'
                                        : 'cursor-not-allowed disabled'
                                    } staff-content d-flex justify-content-center pt-2 pb-2`}
                                    onClick={() =>
                                      (item.id !== checked1 &&
                                        item.id !== checked3 &&
                                        arrUnavailable.indexOf(item.id) === -1) ||
                                      item.id === idStaffDefault
                                        ? setChecked2(item.id)
                                        : setShowModalStaff(true)
                                    }
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
                            </Panel>
                          </Collapse>
                        </div>
                        <div className="col-lg-12 " style={{ display: guest === 2 || guest === 3 ? ' block' : 'none' }}>
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
                                          {item.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                        </span>
                                      </div>
                                    </Option>
                                  ))
                                : ''}
                            </Select>
                          </Form.Item>
                        </div>
                        <div className="col-lg-12 " style={{ display: guest === 2 || guest === 3 ? ' block' : 'none' }}>
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
                              Tổng giá Khách 2:
                              <span className="font-medium float-right">
                              &nbsp;{totalPaymentGuest2?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                              </span>
                            </p>
                            <p>
                              Thời gian ước tính:
                              <span className="font-medium float-right">&nbsp;{convertMinsToHrsMins(totalTimeGuest2)}</span>
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12" style={{ display: guest === 2 || guest === 3 ? ' block' : 'none' }}>
                          <Form.Item
                            name="guest2"
                            className='text-center'
                            rules={[
                              {
                                required: validation2(),
                                message: 'Vui lòng chọn dịch vụ hoặc combo.',
                              },
                            ]}
                          >
                            <Input bordered={false} disabled={true}/>
                          </Form.Item>
                        </div>
                        <div
                          className="col-lg-12  section-tab check-mark-tab pb-4"
                          style={{ display: guest === 3 ? ' block' : 'none' }}
                        >
                          <Divider />
                          <h4 className="label-text mb-2 mt-3">KHÁCH 3</h4>
                          <Collapse
                            ghost
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            expandIconPosition="right"
                          >
                            <Panel
                              header={
                                <label className="label-text mb-4 d-flex align-items-center">
                                  <UserOutlined className="mr-1" /> Chọn Nhân viên
                                </label>
                              }
                            >
                              <Slider {...settings}>
                                {staff.map((item, index) => (
                                  <div
                                    key={index}
                                    className={`${
                                      (item.id !== checked1 &&
                                        item.id !== checked2 &&
                                        arrUnavailable.indexOf(item.id) === -1) ||
                                      item.id === idStaffDefault
                                        ? 'cursor-pointern'
                                        : 'cursor-not-allowed disabled'
                                    } staff-content d-flex justify-content-center pt-2 pb-2`}
                                    onClick={() =>
                                      (item.id !== checked1 &&
                                        item.id !== checked2 &&
                                        arrUnavailable.indexOf(item.id) === -1) ||
                                      item.id === idStaffDefault
                                        ? setChecked3(item.id)
                                        : setShowModalStaff(true)
                                    }
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
                            </Panel>
                          </Collapse>
                        </div>
                        <div className="col-lg-12 " style={{ display: guest === 3 ? ' block' : 'none' }}>
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
                        <div className="col-lg-12 " style={{ display: guest === 3 ? ' block' : 'none' }}>
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
                              &nbsp;{totalPaymentGuest3?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                              </span>
                            </p>
                            <p>
                              Thời gian ước tính:
                              <span className="font-medium float-right">&nbsp;{convertMinsToHrsMins(totalTimeGuest3)}</span>
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12" style={{ display: guest === 3 ? ' block' : 'none' }}>
                          <Form.Item
                            name="guest3"
                            className='text-center'
                            rules={[
                              {
                                required: validation3(),
                                message: 'Vui lòng chọn dịch vụ hoặc combo.',
                              },
                            ]}
                          >
                            <Input bordered={false} disabled={true}/>
                          </Form.Item>
                        </div>
                        <div className="col-lg-12 ">
                          <Divider />
                          <Form.Item
                            help={errorhandle.message}
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

                        <div className="col-lg-12 ">
                          <Form.Item
                            name="message"
                            label={<label className="label-text">Ghi chú</label>}
                          >
                            <Input.TextArea style={{ height: '100px' }} placeholder="VD: Mình cần tư vấn" />
                          </Form.Item>
                        </div>
                        <div className="col-lg-12">
                          <ul className="list-items list-items-2 py-3">
                            <li style={{ display: percent === null ? 'none' : 'block' }}>
                              Tổng:
                              <span className="font-medium float-right" style={{ opacity: 0.7 }}>
                              &nbsp;{totalPayment?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
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
                                &nbsp;{totalPaymentFinal?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
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
      <Modal
        visible={showModalStaff}
        onCancel={handleCancelModalStaff}
        footer={
          <Button type="primary" block className="modal-action-login" onClick={() => setShowModalStaff(false)}>
            Thoát
          </Button>
        }
        centered
        width={350}
      >
        <h4 className="text-center pt-5 pb-3">Nhân viên được khách khác chọn</h4>
        <p className="text-center">Nếu bạn muốn chọn cùng 1 nhân viên bạn vui lòng note vào ghi chú </p>
      </Modal>
    </>
  );
};

export default BookingPage;
