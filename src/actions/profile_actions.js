import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import request from '../services/getData';
import {
  GET_PROFILE_INFO,
  PROFILE_ERROR
} from './types';

export const getProfileInfo = (token) => {
  return dispatch => {
    const url = `user/getProfileDetails`;
    request(url, 'GET', {}, `JWT ${token}`)
    .then(res => {    
      if (res.status === 200) dispatch({ type: GET_PROFILE_INFO, user: res.result });    
      else dispatch({ type: PROFILE_ERROR, error: 'error' });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: PROFILE_ERROR, error: err });  
    })  
  }
}

