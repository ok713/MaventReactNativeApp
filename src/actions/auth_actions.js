import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import request from '../services/getData';
var RNUploader = require('NativeModules').RNUploader;
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
} from './types';

export const requestSignup = (userData, token) => {
  let email = userData.email;
  let password = userData.password;
  let firstName = userData.firstName;
  let lastName = userData.lastName;
  let dob = userData.dob;
  let gender = userData.gender;
  let phoneNumber = userData.phoneNumber;
  let pic = userData.pic;

  return dispatch => {
    dispatch({ type: REQUEST_USER_REG });
    const url = `user/register?email=${email}&password=${password}&firstName=${firstName}&lastName=${lastName}&dob=${dob}&gender=${gender}&phoneNumber=${phoneNumber}`;
    request(url, 'POST', {photo: null})
    .then(res => {   
      console.log("RES=>", res); 
      if (res.status === 200) dispatch({ type: REG_USER_SUCCESS });    
      else dispatch({ type: REG_USER_FAIL });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: REG_USER_FAIL });  
    })  
  }
}
uploadProfileImage = () => {
  const serverUrl = 'http://ec2-54-179-160-81.ap-southeast-1.compute.amazonaws.com:3000/';
    const url = `user/register?email=B@B.com&password=1&firstName=kar wai&lastName=lee&dob=23/1/1991&gender=1&phoneNumber=65938332935`;
    let files = [
      {
        name: 'upload_file',
        filename: this._generateUUID() + '.png',
        filepath: pic,  // image from camera roll/assets library 
        filetype: 'image/png',
      },
    ];

    let opts = {
      url: serverUrl + url,
      files: files,
      method: 'POST',                             // optional: POST or PUT 
      headers: { 'Accept': 'application/json', 'Authorization': token},  // optional 
    };

    RNUploader.upload(opts, (err, res) => {
      this.setState({ loading: false });
      if (err) {
        alert(err);
        return;
      }
      dispatch({ type: 'REQUESTED_LOGIN_SUCCEEDED', token:res.token });      
    });

}
_generateUUID = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}

export const requestLogin = (email, password) => {
  return dispatch => {
    dispatch({ type: REQUEST_LOGIN });
    const url = `user/login?email=${email}&password=${password}`;
    request(url, 'GET', {})
    .then(res => {    
      if (res.status === 200) dispatch({ type: 'REQUESTED_LOGIN_SUCCEEDED', token:res.token });    
      else dispatch({ type: 'REQUESTED_LOGIN_FAILED' });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: 'REQUESTED_LOGIN_FAILED' });  
    })  
  }
}

export const emailLoginChanged = (text) => {
  return {
    type: EMAIL_LOGIN_CHANGED,
    payload: text
  };
};

export const passwordLoginChanged = (text) => {
  return {
    type: PASSWORD_LOGIN_CHANGED,
    payload: text
  };
};

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB Login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('265644483900185', {
    permissions: ['public_profile', 'email']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  // console.log(token);
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
