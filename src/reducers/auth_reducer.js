// import { REHYDRATE } from 'redux-persist/constants';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  EMAIL_LOGIN_CHANGED,
  PASSWORD_LOGIN_CHANGED,
  REQUEST_LOGIN,
  REQUESTED_LOGIN_SUCCEEDED,
  REQUESTED_LOGIN_FAILED,
  REQUEST_USER_REG,
  REG_USER_SUCCESS,
  REG_USER_FAIL,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAIL,
  REQUEST_VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  loginLoading: false,
  signupLoading: false,
  loggedIn: false,
  signedUp: false,
  verifyOtp: false,
  verifyLoading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload;

    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.token };
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case REQUEST_LOGIN:      
      return {                
          ...state,
          loginLoading: true,
          loggedIn: false,
      } 

    case REQUESTED_LOGIN_SUCCEEDED:      
        return {                
            ...state,
            loginLoading: false,
            loggedIn: true,
            token:action.token
        } 

    case REQUESTED_LOGIN_FAILED:      
        return {                
            ...state,
            loginLoading: false,
            loggedIn: false,
        } 
    case REQUEST_USER_REG:      
      return {                
          ...state,
          signupLoading: true,
          signedUp: false,
      } 

    case REG_USER_SUCCESS:      
        return {                
            ...state,
            signupLoading: true,
            signedUp: true,
            signupMsg: action.msg
        } 

    case REG_USER_FAIL:      
        return {                
            ...state,
            signupLoading: false,
            signedUp: false,
            signupMsg: action.msg
        }
    case GENERATE_OTP_SUCCESS:      
        return {                
            ...state,
            signedUp: true,
            signupLoading: false,
            signupMsg: action.msg,
            phoneNumber: action.phoneNumber
        }
    case GENERATE_OTP_FAIL:      
        return {                
            ...state,
            signupLoading: false,
            signedUp: false,
            signupMsg: action.msg
        } 
    case REQUEST_VERIFY_OTP:      
      return {                
          ...state,
          verifyLoading: true
      } 
    case VERIFY_OTP_SUCCESS:      
        return {                
            ...state,
            verifyOtp: true,
            verifyLoading: false,
            verifyMsg: action.msg
            
        }
    case VERIFY_OTP_FAIL:      
        return {                
            ...state,
            verifyOtp: false,
            verifyLoading: false,
            verifyMsg: action.msg

        }       

    default:
      return state;
  }
}
