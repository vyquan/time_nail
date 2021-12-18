import React, { useState } from 'react';
import { isAuthenTicate } from '../Auth';
import { useForm } from "react-hook-form";
import { staffInfo } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProfileStaff = () => {
  const { register, handleSubmit} = useForm();
   const dispatch = useDispatch();
  const data = isAuthenTicate();
  const [image, setImage] = useState(null)
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
   }
   const onSubmit = (data) => {
    const uploads = new FormData();
    uploads.append("id", data.id);
    uploads.append("full_name", data.full_name);
    uploads.append("email", data.email);
    if(data.avatar[0]){
      uploads.append("avatar", data.avatar[0]);
    }
    uploads.append("phone", data.phone);
    uploads.append("address", data.address)
      dispatch(staffInfo(uploads));
   }

  return (
    <div className="col-lg-12">
      <div className="form-box">
        <div className="form-title-wrap">
          <h3 className="title">Hồ Sơ Của Tôi</h3>
          <p className="card-meta">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div className="form-content">
          <div className="contact-form-action">
            <ToastContainer/>
            <form action="#" className="MultiFile-intercepted" onSubmit={handleSubmit(onSubmit)}>
           <div className="profile_page">
            <div className="col-left">
            <div className="avatar">
            <img src={image ? (image) : (data.user.avatar)} alt="true" max-width="600" height="250"/>
            <span>
            <i className="fas fa-camera"></i>
            <p>Change</p>
            <input
              type="file"
              name="files"
              className="multi file-upload-input with-preview MultiFile-applied"
              maxLength={1}
              id="file_up"
              {...register("avatar")}
              onChange={onImageChange}
          />
            </span>
                </div>
              </div>
              </div>  

              <div className="row">
                <input type="hidden" value={data.user.id} {...register("id")}/>
                <div className="col-lg-6 responsive-column">
                  <div className="input-box">
                    <label className="label-text">Tên</label>
                    <div className="form-group">
                      <span className="la la-user form-icon" />
                <input className="form-control" type="text"
                 defaultValue={data.user.full_name} 
                 {...register("full_name")}/>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-6 responsive-column">
                  <div className="input-box">
                    <label className="label-text">Email</label>
                    <div className="form-group">
                      <span className="la la-envelope form-icon" />
                      <input className="form-control" type="text"  
                      defaultValue={data.user.email} 
                      {...register("email")} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 responsive-column">
                  <div className="input-box">
                    <label className="label-text">Số Điện Thoại</label>
                    <div className="form-group">
                      <span className="la la-phone form-icon" />
                      <input className="form-control" type="text" 
                      defaultValue={data.user.phone}
                      {...register("phone")} />
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-6 responsive-column">
                  <div className="input-box">
                    <label className="label-text">Địa chỉ</label>
                    <div className="form-group">
                      <span className="la la-map form-icon" />
                      <input className="form-control" type="text"  
                      defaultValue={data.user.address} 
                      {...register("address")}/>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-6 responsive-column">
                  <div className="input-box">
                    <label className="label-text">Kinh nghiệm</label>
                    <div className="form-group">
                      <span className="la la-history form-icon" />
                      <input className="form-control" type="text"  
                      defaultValue={data.user.experience_staff} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-12">
                  <div className="input-box messenger-box-input-wrap">
                    <label className="label-text" htmlFor="desc">
                      Giới thiệu
                    </label>
                    <div className="form-group">
                      <span className="la la-pencil form-icon" />
                      <textarea
                        className="desc-control form-control"
                        name="desc"
                        id="desc"
                        placeholder="Giới thiệu bản thân"
                        required
                        {...register("description_staff")}
                        defaultValue={data.user.description_staff}
                      />
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

export default ProfileStaff;
