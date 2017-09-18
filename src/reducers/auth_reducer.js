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
  REG_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  loggedIn: false,
  signedIn: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload;
    case EMAIL_LOGIN_CHANGED:
      console.log(action);
      return { ...state, email: action.payload };
    case PASSWORD_LOGIN_CHANGED:
      console.log(action);
      return { ...state, password: action.payload };
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case REQUEST_LOGIN:      
      return {                
          ...state,
          loading: true,
          loggedIn: false,
      } 

    case REQUESTED_LOGIN_SUCCEEDED:      
        return {                
            ...state,
            loading: false,
            loggedIn: true,
            token:action.token
        } 

    case REQUESTED_LOGIN_FAILED:      
        return {                
            ...state,
            loading: false,
            loggedIn: false,
        } 
    case REQUEST_USER_REG:      
      return {                
          ...state,
          loading: true,
          signedIn: false,
      } 

    case REG_USER_SUCCESS:      
        return {                
            ...state,
            loading: false,
            signedIn: true,
            token:action.token
        } 

    case REG_USER_FAIL:      
        return {                
            ...state,
            loading: false,
            signedIn: false,
        } 

    default:
      return state;
  }
}
