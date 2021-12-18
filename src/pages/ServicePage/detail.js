import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getIdService} from '../../redux/actions/service';
import CallToAction from '../../components/client/callToAction';
import { AppRoutes } from '../../helpers/app.routes';
import ServiceCategoryAPI from '../../api/serviceAPI';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await ServiceCategoryAPI.get(id);
        setService(data);
        dispatch(getIdService(id));
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
     //eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className="breadcrumb-area bread-bg-4">
        <div className="breadcrumb-wrap padding-right-100px padding-left-100px">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="breadcrumb-content">
                  <div className="section-heading">
                    <h2 className="sec__title text-white">Dịch vụ {service.name_cate_service}</h2>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="breadcrumb-list text-right">
                  <ul className="list-items">
                    <li>
                    <Link to={AppRoutes.home}>Home</Link>
                    </li>
                    <li>{service.name_cate_service}</li>
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
                    <h2 className="sec__title">{service.name_cate_service}</h2>
                    <h3 className="title font-size-20 pt-3 px-5">{service.note}</h3>
                  </div>
                <div className="form-content">
                  <table className="table">
                    <tbody>
                      {service.services &&
                        service.services.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="table-content d-flex align-items-center">
                                <h3 className="title font-size-16">{item.name_service}</h3>
                              </div>
                              <span className="font-size-14">{item.short_description}</span>
                            </td>
                            <td className="w-sm ">{item.total_time_work} phút</td>
                            <td>
                              <div className="table-content d-flex align-items-center">
                                <h3 className="title">{item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h3>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </div>
  );
};

export default ServiceDetail;
