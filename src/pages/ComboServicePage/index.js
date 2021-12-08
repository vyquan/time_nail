import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CallToAction from '../../components/client/callToAction';
import { AppRoutes } from '../../helpers/app.routes';
import { getCombo } from '../../redux/actions/combo';
const ComboService = () => {
  const combos = useSelector((state) => state.combos.combos);
  let dataArr = Array.from(combos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCombo());
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <section className="breadcrumb-area bread-bg">
        <div className="breadcrumb-wrap padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="breadcrumb-content">
                  <div className="section-heading">
                    <h2 className="sec__title text-white">Combo tại TIME NAILS</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="breadcrumb-list text-right">
                  <ul className="list-items">
                    <li>
                      <Link to={AppRoutes.home}>Trang chủ</Link>
                    </li>
                    <li>
                      <Link to={AppRoutes.comboService}>Combo</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="destination-area section--padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading text-center">
                <h2 className="sec__title">
                  COMBO <span style={{ color: '#ffadad' }}>HOT</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row padding-top-50px">
            {dataArr &&
              dataArr.map((item) => (
                <div className="col-lg-4 responsive-column" key={item.id}>
                  <div className="card-item ">
                    <div className="card-img">
                      <Link to={`/combo-services/${item.id}`} className="d-block">
                        <img src={item.image} alt="Destination-img" />
                      </Link>
                    </div>
                    <div className="card-body text-center">
                      <h3 className="card-title">
                        <Link to={`/combo-services/${item.id}`}>{item.name_combo}</Link>
                      </h3>
                      <div className="card-rating">
                        <span className="rating__text">{item.short_description}</span>
                      </div>
                      <div className="nav-btn">
                        <Link to={AppRoutes.booking} className="theme-btn">
                          ĐẶT LỊCH
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
};

export default ComboService;
