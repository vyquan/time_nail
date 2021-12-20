import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userInfo } from '../../redux/actions/auth';
import { isAuthenTicate } from '../Auth';
import { RegexConstants } from '../../helpers/regex';
const ProfileSetting = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const data = isAuthenTicate();
  const [image, setImage] = useState(null);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSubmit = (data) => {
    const uploads = new FormData();
    uploads.append('id', data.id);
    uploads.append('full_name', data.full_name);
    uploads.append('email', data.email);

    if(data.avatar[0]) {
      uploads.append('avatar', data.avatar[0]);
    }
  

    uploads.append('phone', data.phone);
    uploads.append('address', data.address);
    dispatch(userInfo(uploads));
  };

  return (
    <div className="col-lg-9">
      <div className="form-box">
        <div className="form-title-wrap">
          <h3 className="title">Hồ Sơ Của Tôi </h3>
          <p className="card-meta">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div className="form-content">
          <div className="contact-form-action">
            <ToastContainer />
            <form action="#" className="MultiFile-intercepted" onSubmit={handleSubmit(onSubmit)}>
              <div className="profile_page">
                <div className="col-left">
                  <div className="avatar">
                    {data.user || image ? (
                      <img src={image ? image : data.user.avatar} alt="true" max-width="600" height="250" />
                    ) : (
                      <img src={data.avatar.includes(`https`) ? data.avatar : 'http://localhost:8000/storage/'+data.avatar } alt="true" />
                    )}
                    <span>
                      <i className="fas fa-camera"></i>
                      <p>Change</p>
                      <input
                        type="file"
                        name="files"
                        className="multi file-upload-input with-preview MultiFile-applied"
                        maxLength={1}
                        id="file_up"
                        {...register('avatar')}
                        onChange={onImageChange}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <input type="hidden" value={data.user ? data.user.id : data.id} {...register('id')} />
                <div className="col-lg-6 responsive-column">
                  <div className="input-box">
                    <label className="label-text">Tên</label>
                    <div className="form-group">
                      <span className="la la-user form-icon" />
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={data.user ? data.user.full_name : data.full_name || data.givenName}
                        {...register('full_name',{
                          required: true
                        })}
                      />
                        {errors.full_name && <span className='text-danger'>Bạn chưa nhập tên</span>}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 responsive-column">
                  <div className="input-box">
                    <label className="label-text">Email </label>
                    <div className="form-group">
                      <span className="la la-envelope form-icon" />
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={data.user ? data.user.email : data.email}
                        {...register('email',{
                          required: true,
                          pattern: {
                            value: RegexConstants.EMAIL
                          }
                        })}
                      />
                   
                      {errors?.email?.type === "pattern" && (
                          <p className='text-danger'>Email không đúng định dạng</p>
                        )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 responsive-column">
                  <div className="input-box">
                    <label className="label-text">Số Điện Thoại </label>
                    <div className="form-group">
                      <span className="la la-phone form-icon" />
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={data.user ? data.user.phone : data.phone}
                        {...register('phone', {
                          required: true,
                          pattern: {
                            value: RegexConstants.PHONE
                        },
                        })}
                      />
                      {errors?.phone?.type === "pattern" && (
                          <p className='text-danger'>Số điện thoại không đúng định dạng</p>
                        )}
                    </div>
                  </div>
                </div>
               <div className="col-lg-6 responsive-column">
                  <div className="input-box">
                    <label className="label-text">Địa chỉ</label>
                    <div className="form-group">
                      <span className="la la-map form-icon" />
                      <input
                        className="form-control"
                        type="text"
                        defaultValue={data.user ? data.user.address : data.address}
                        {...register('address', {
                          required: true,
                        })}
                      />
                        {errors.address && <span className='text-danger'>Bạn chưa nhập địa chỉ</span>}
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="btn-box">
                    <button className="theme-btn" type="submit">
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
