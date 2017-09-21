import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import request from '../services/getData';
import {
  GET_PROFILE_INFO,
  PROFILE_ERROR,
  SET_LOCATION,
  REGISTER_MAVEN,
  REGISTER_MAVEN_FAILED,
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

export const setLocation = (location) => {
  return dispatch => {
      dispatch({ type: SET_LOCATION, location: location });  
  }
}

export const registerMaven = (mavenData, token) => {
  let mainCategory = mavenData.mainCategory;
  let category = mavenData.category;
  let title = mavenData.title;
  let description = mavenData.description;
  let postalCode = mavenData.postalCode;
  let dayAvailable = mavenData.dayAvailable;
  let timeAvailable = mavenData.timeAvailable;
  let price = mavenData.price;
  let idPictures = mavenData.idPictures;
  let pictures = mavenData.pictures;
  let formData = new FormData();
  formData.append('mainCategory', mainCategory);
  formData.append('category', category);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('postalCode', postalCode);
  formData.append('dayAvailable', dayAvailable);
  formData.append('timeAvailable', timeAvailable);
  formData.append('price', price);
  if(pictures && pictures.length > 0){
    let files = [];
    pictures.map((e) => {
      let uriParts = e.split('.');
      let fileType = uriParts[1];
      let file = { uri: e, name: _generateUUID() + `.${fileType}`, type: `image/${fileType}`};
      files.push(file)
    })
    formData.append('pictures', files);
  }
  if(idPictures && idPictures.length > 0){
    let files = [];
    idPictures.map((e) => {
      let uriParts = e.split('.');
      let fileType = uriParts[1];
      let file = { uri: e, name: _generateUUID() + `.${fileType}`, type: `image/${fileType}`};
      files.push(file)
    })
    formData.append('idPictures', files);
  }
  let option = { 
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
    },
  };
  return dispatch => {
    const url = `maven/registerMaven`;
    request(url, option)
    .then(res => {   
      console.log("maven res=>", res);
      if (res.status === 200) {
        dispatch({ type: REGISTER_MAVEN, user: res.result });   
      }
      else dispatch({ type: REGISTER_MAVEN_FAILED, error: res.msg });
    })
    .catch(err => {
      console.log("ERROR=>", err);
      dispatch({ type: REGISTER_MAVEN_FAILED, error: err });  
    })  
  }
}

_generateUUID = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
};


