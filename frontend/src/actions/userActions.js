import {clearError, loginFail, loginRequest, loginSuccess, registerFail, registerSuccess, registerRequest, loadUserRequest, loadUserSuccess, loadUserFail, logoutFail,logoutSuccess, updateProfileSuccess, updateProfileRequest, updateProfileFail, updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, resetPasswordRequest, resetPasswordSuccess, resetPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail, clearUpdateProfile} from '../slices/authSlice';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try{
        dispatch(loginRequest())
        const {data} = await axios.post(`/api/v1/login`,{email,password});
        console.log("Login Sucess",data);
        dispatch(loginSuccess(data));
    }
    catch(error){
        dispatch(loginFail(error.response.data.message));
    }
}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const clearUpdate = dispatch => {
    dispatch(clearUpdateProfile())
}


export const register = (userData) => async (dispatch) => {
    try{
        dispatch(registerRequest())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'  //IMportant MultipartFormData
            }
        }
        const {data} = await axios.post(`/api/v1/register`,userData,config);
        dispatch(registerSuccess(data));
        console.log("Register Sucess",data);
    }
    catch(error){
        dispatch(registerFail(error.response.data.message));
    }
}

export const loadUser = async(dispatch) => {
    try{
        dispatch(loadUserRequest())
        const {data} = await axios.get(`/api/v1/myprofile`);
        dispatch(loadUserSuccess(data));
        console.log("User Profile",data);
    }
    catch(error){
        dispatch(loadUserFail(error.response.data.message));
    }
}

export const logout = async(dispatch) => {
    try{
       await axios.get(`/api/v1/logout`);
        dispatch(logoutSuccess());
    }
    catch(error){
        dispatch(logoutFail(error.response.data.message));
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try{
        dispatch(updateProfileRequest())
        const config = {
            headers : {
                'Content-type' : 'multipart/form-data'  //IMportant MultipartFormData
            }
        }
        const {data} = await axios.put(`/api/v1/update`,userData,config);
        dispatch(updateProfileSuccess(data));
        console.log("Updated",data);
    }
    catch(error){
        dispatch(updateProfileFail(error.response.data.message));
    }
}
export const updatePassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.put(`/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(error.response.data.message))
    }

}

export const resetPassword = (formData,token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post(`/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }

}

export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post(`/api/v1/password/forgot`, formData, config);
        console.log("After Forgot Password",data);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error))
    }

}


