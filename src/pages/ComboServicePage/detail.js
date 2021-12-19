import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getIdCombo } from '../../redux/actions/combo';
import comboAPI from '../../api/comboAPI';
import CallToAction from '../../components/client/callToAction';
import { AppRoutes } from '../../helpers/app.routes';
import { useEffect } from 'react';
import { truncateString } from '../../helpers/format';
const ComboServiceDetail = () => {
  const { id } = useParams();
  const [combo, setcombo] = useState([]);
  const [totalMinute, setTotalMinute] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCombo = async () => {
      try {
        const { data } = await comboAPI.get(id);
        setcombo(data);
        const Arr = Array.from(data.services);
        // Tổng thời gian
        const getTotalMinute = Arr.reduce((prev, item) => {
          return prev + item.total_time_work;
        }, 0);
        // Tổng tiền
        const getTotalPrice = Arr.reduce((prev, item) => {
          return prev + item.price;
        }, 0);

        setTotalMinute(getTotalMinute);
        setTotalPrice(getTotalPrice);
        dispatch(getIdCombo(id));
      } catch (error) {
        console.log(error);
      }
    };
    getCombo();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <div>
        <section className="breadcrumb-area bread-bg-4">
          <div className="breadcrumb-wrap padding-right-100px padding-left-100px">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="breadcrumb-content">
                    <div className="section-heading">
                      <h2 className="sec__title text-white">{truncateString(combo.name_combo || '', 20)}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="breadcrumb-list text-right">
                    <ul className="list-items">
                      <li>
                        <Link to={AppRoutes.home}>Home</Link>
                      </li>
                      <li>{combo.name_combo}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="booking-area padding-top-100px padding-bottom-70px">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-box">
                  <div className="pt-4 text-center">
                    <h2 className="sec__title">{combo.name_combo}</h2>
                    <h3 className="title font-size-20 pt-3 px-5">{combo.short_description}</h3>
                  </div>
                  <div className="form-content">
                    <table className="table">
                      <tbody>
                        {combo.services &&
                          combo.services.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="table-content d-flex align-items-center">
                                  <h3 className="title font-size-16">{item.name_service}</h3>
                                </div>
                                <span className="font-size-14">{item.short_description}</span>
                              </td>
                              <td className="w-sm">{item.total_time_work} phút</td>
                              <td>
                                <div className="table-content d-flex align-items-center">
                                  <h3 className="title">
                                    {item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                  </h3>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div>
                      <p className="text-right" style={{ color: 'black' }}>Tổng thời gian: {totalMinute} phút</p>
                      <p className="text-right" style={{ color: 'black' }}>Tổng tiền: {totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CallToAction />
      </div>
    </div>
  );
};

export default ComboServiceDetail;
