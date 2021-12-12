import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { feedback } from '../../redux/actions/feedback';
import { isAuthenTicate } from '../Auth';
import { Rate } from 'antd';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FeedbackPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkbox: false,
    },
  });
  const dispatch = useDispatch();
  const data = isAuthenTicate();

  const onSubmit = (data) => {
    const datas = new FormData();
    datas.append('number_star', data.number_star);
    datas.append('comment', data.comment);
    datas.append('user_id', data.user_id);
    dispatch(feedback(datas));
    reset('');
       //eslint-disable-next-line
  };
  return (
    <div>
      <section className="tour-detail-area padding-bottom-90px">
        <div className="single-content-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                <div className="single-content-wrap padding-top-60px">
                  <div className="review-box">
                    <div className="single-content-item padding-top-40px">
                      <div className="comment-forum padding-top-40px">
                        <div className="form-box">
                          <div className="form-title-wrap text-center">
                            <h3 className="title">Đánh giá dịch vụ</h3>
                          </div>
                          <div className="form-content">
                            {/* end rate-option */}
                            <div className="contact-form-action">
                              <ToastContainer />
                              <form
                                method="post"
                                onSubmit={handleSubmit(onSubmit)}
                                className="MultiFile-intercepted"
                                encType="multipart/form-data"
                              >
                                <input
                                  type="hidden"
                                  value={data.user ? data.user.id : data.id}
                                  {...register('user_id')}
                                />
                                <div className="row">
                                  <div className="rate-option p-2">
                                    <div className="row">
                                      <div className="col-lg-12 responsive-column mx-auto">
                                        <div className="rate-option-item">
                                          <label>Đánh giá</label>
                                          <br />
                                          <Controller
                                            name="number_star"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => <Rate {...field} />}
                                          />
                                          <br />
                                          {errors.number_star && <span className="text-danger">Bạn chưa đánh giá</span>}
                                        </div>
                                      </div>
                                      {/* col-lg-4 */}
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div className="input-box">
                                      <label className="label-text">Message</label>
                                      <div className="form-group">
                                        <span className="la la-pencil form-icon" />
                                        <textarea
                                          className="message-control form-control"
                                          name="message"
                                          placeholder="Chị cho chúng em xin góp ý về trải nghiệm dùng dịch vụ để chúng em cải tiến thêm ạ!"
                                          {...register('comment', { required: true })}
                                        />
                                        {errors.comment && <span className="text-danger">Bạm chưa gửi thông tin</span>}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div className="btn-box text-center">
                                      {data.googleId ? (
                                        <button type="submit" className="theme-btn" disabled>
                                          GỬI ĐÁNH GIÁ
                                        </button>
                                      ) : (
                                        <button type="submit" className="theme-btn">
                                          GỬI ĐÁNH GIÁ
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-2"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeedbackPage;
