const { createSlice } = require("@reduxjs/toolkit");

const productSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    isAuthenticated: false,
  },
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    loginSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },

    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    registerRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    registerSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },

    registerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    loadUserRequest(state, action) {
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    },

    loadUserSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },

    loadUserFail(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    logoutSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
        user: action.payload.user,
      };
    },

    logoutFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },

    updateProfileRequest(state, action) {
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    },
    updateProfileSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isUpdated: true,
      };
    },
    updateProfileFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearUpdateProfile(state,action){
      return{
        ...state,
        isUpdated : false
      }
    },
    updatePasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };
    },

    updatePasswordSuccess(state, action) {
      return {
        loading: false,
        user: action.payload.user,
        isUpdated: true,
        
      };
    },

    updatePasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    forgotPasswordRequest(state, action){
      return{
        ...state,
        loading:true,
        message:null,
      }
    },

    forgotPasswordSuccess(state,action){
      return{
        ...state,
        loading:false,
        message : action.payload.message
      }
    },

    forgotPasswordFail(state,action){
      return{
        ...state,
        loading:false,
        error : action.payload

      }
    },
    resetPasswordRequest(state,action){
      return{
        ...state,
        loading: true,
      }
    },
    resetPasswordSuccess(state,action){
      return{
        ...state,
        loading:false,
        isAuthenticated:true,
        user: action.payload.user
      }
    },
    resetPasswordFail(state,action){
      return{
        ...state,
        loading: true,
        error: action.payload
      }
    }

  },
});

const { actions, reducer } = productSlice;

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  clearError,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  clearUpdateProfile,
  updateProfileFail,
  updateProfileSuccess,
  updateProfileRequest,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  forgotPasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess
} = actions;

export default reducer;
