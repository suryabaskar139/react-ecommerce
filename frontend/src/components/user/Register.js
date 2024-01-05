import { Fragment, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { register, clearAuthError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [userData, setUserData] = useState({
    name:"",
    email: "",
    password: ""

  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview,setAvatarPreview] = useState("./images/profile.jpg");
  const {loading, error, isAuthenticated} = useSelector(state => state.authState);


  const onChange = (e) => {
    if(e.target.name === 'avatar'){
      const reader = new FileReader();     //Important Image File Reader
      reader.onload = () => {
        if(reader.readyState === 2){
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
          console.log("New Avatar",setAvatar);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
      console.log("reader",reader);
    }
    setUserData({...userData,[e.target.name]:e.target.value})
    console.log("setUserData",setUserData);
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',userData.name);
    formData.append('email',userData.email);
    formData.append('password',userData.password);
    formData.append("avatar",avatar);
    dispatch(register(formData))
    console.log("Final Data",formData);
  }

  useEffect( () => {

    if(isAuthenticated === true){
      navigate('/')
    }

    if(error){
      toast(error, {
        position: toast.POSITION.TOP_RIGHT,
        type:'error',
        onOpen : () =>{dispatch(clearAuthError)},
      })
      return
    }
  },[error])



  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    onChange={onChange}
                    className="custom-file-input"
                    id="customFile"
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
