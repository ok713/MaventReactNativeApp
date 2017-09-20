import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import request from '../services/getData';
import {
  GET_PROFILE_INFO,
  PROFILE_ERROR
} from './types';

export const getProfileInfo = (token) => {
  let option = { 
    method: 'GET',
    headers: {
      'Authorization': `JWT ${token}`,
    },
  };
  return dispatch => {
    const url = `user/getProfileDetails`;
    request(url, option)
    .then(res => {   
      console.log("profile res=>", res);
      if (res.status === 200) {
        dispatch({ type: GET_PROFILE_INFO, user: res.result });   
      }
      else dispatch({ type: PROFILE_ERROR, error: 'error' });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: PROFILE_ERROR, error: err });  
    })  
  }
}

