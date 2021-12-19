import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setting } from '../../redux/actions/setting';
const Address = () => {
    const getSetting = useSelector((state) => state.setting.setting);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setting());
      //eslint-disable-next-line
    }, []);
  return (
    <div className="col-lg-4">
      <div className="form-box">
        <div className="form-title-wrap">
          <h3 className="title">Liên Hệ Với Chúng Tôi</h3>
        </div>
        <div className="form-content">
          <div className="address-book">
          {getSetting.slice(0, 1).map((item) => (
            <ul className="list-items contact-address" key={item.id}>
              <li>
                <i className="la la-map-marker icon-element" />
                <h5 className="title font-size-16 pb-1">Địa Chỉ </h5>
                <p className="map__desc">
                  {item.address}
                </p>
              </li>
              <li>
                <i className="la la-phone icon-element" />
                <h5 className="title font-size-16 pb-1">Điện Thoại</h5>
                <p className="map__desc">{item.phone}</p>
              </li>
              <li>
                <i className="la la-envelope-o icon-element" />
                <h5 className="title font-size-16 pb-1">Email</h5>
                <p className="map__desc">{item.email}</p>
              </li>
            </ul> 
            ))}
            <ul className="social-profile text-center">
              <li>
                <a href="#/">
                  <i className="lab la-facebook-f" />
                </a>
              </li>
              <li>
                <a href="#/">
                  <i className="lab la-twitter" />
                </a>
              </li>
              <li>
                <a href="#/">
                  <i className="lab la-instagram" />
                </a>
              </li>
              <li>
                <a href="#/">
                  <i className="lab la-linkedin-in" />
                </a>
              </li>
              <li>
                <a href="#/">
                  <i className="lab la-youtube" />
                </a>
              </li>
            </ul>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
