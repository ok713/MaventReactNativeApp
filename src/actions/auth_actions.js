import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import request from '../services/getData';
var RNUploader = require('NativeModules').RNUploader;
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
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
} from './types';

export const requestSignup = (userData, token) => {
  let email = userData.email;
  let password = userData.password;
  let firstName = userData.firstName;
  let lastName = userData.lastName;
  let dob = userData.dob;
  let gender = userData.gender;
  let phoneNumber = userData.phoneNumber;
  let photo = userData.photo;
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('dob', dob);
  formData.append('gender', gender);
  formData.append('phoneNumber', phoneNumber);
  if(photo){
    let uriParts = photo.split('.');
    let fileType = uriParts[1];
    formData.append('photo', { uri: photo, name: `photo.${fileType}`, type: `image/${fileType}`});
  }

  let option = { 
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return dispatch => {
    dispatch({ type: REQUEST_USER_REG });
    const url = `user/register`;
    request(url, option)
    .then(res => {   
      if (res.status === 200) {
        dispatch({ type: REG_USER_SUCCESS, msg: res.msg });    
        dispatch(generateOTP(phoneNumber));
      }
      else dispatch({ type: REG_USER_FAIL, msg: res.msg });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: REG_USER_FAIL, msg: 'error' });  
    })  
  }
}

const generateOTP = (phoneNumber) => {
  let option = { 
    method: 'GET',
  };
  let realPhoneNumber = '65' + phoneNumber;
  return dispatch => {
    const url = `user/generateOtp?phoneNumber=${realPhoneNumber}`;
    request(url, option)
    .then(res => {   
      if (res.status === 200) {
        dispatch({ type: GENERATE_OTP_SUCCESS, msg: res.msg, phoneNumber });    
      }
      else dispatch({ type: GENERATE_OTP_FAIL, msg: res.msg });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: GENERATE_OTP_FAIL, msg: 'error' });  
    })  
  }

}

export const verifyOtp = (phoneNumber, otp) => {
  let option = { 
    method: 'GET',
  };
  return dispatch => {
    dispatch({ type: REQUEST_VERIFY_OTP });
    const url = `user/verifyOtp?phoneNumber=${phoneNumber}&otp=${otp}`;
    request(url, option)
    .then(res => {   
      if (res.status === 200) {
        dispatch({ type: VERIFY_OTP_SUCCESS, msg: res.msg });    
      }
      else dispatch({ type: VERIFY_OTP_FAIL, msg: res.msg });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: VERIFY_OTP_FAIL, msg: 'error' });  
    })  
  }

}

export const requestLogin = (email, password) => {
  let data = {email: email, password: password};
  let option = { 
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    const url = `user/login`;
    request(url, option)
    .then(res => {    
      if (res.status === 200) dispatch({ type: REQUESTED_LOGIN_SUCCEEDED, token:res.token });    
      else dispatch({ type: REQUESTED_LOGIN_FAILED });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: REQUESTED_LOGIN_FAILED });  
    })  
  }
}

export const facebookLogin = () => async dispatch => {
    doFacebookLogin(dispatch);
};

export const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('1201211719949057', {
    permissions: ['public_profile', 'email']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  return dispatch(loginWithToken(token));
};

const loginWithToken = (token) => {
  let option = { 
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },

  };
  console.log(token);
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    const url = `user/login/Facebook`;
    request(url, option)
    .then(res => {   
       console.log(res);
      if (res.status === 200) {
        dispatch({ type: REQUESTED_LOGIN_SUCCEEDED, token:res.token });    
      }
      else dispatch({ type: VERIFY_OTP_FAIL, msg: res.msg });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: VERIFY_OTP_FAIL, msg: 'error' });  
    })  
  }
  // dispatch({ type: FACEBOOK_LOGIN_SUCCESS, token: token });
  
}
