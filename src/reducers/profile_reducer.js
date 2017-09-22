// import { REHYDRATE } from 'redux-persist/constants';
import {
  GET_PROFILE_INFO,
  PROFILE_ERROR,
  SET_LOCATION,
  REGISTER_MAVEN,
  REGISTER_MAVEN_FAILED,
  REQUEST_REGISTER_MAVEN
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  error: null,
  loading: false,
  mavenLoading: true,
  mavenRegSuccess: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PROFILE_INFO:
      return { ...state, user: action.user, loading: true };
    case PROFILE_ERROR:      
        return { ...state, error: action.error, loading: false } 
    case SET_LOCATION:
      return { ...state, location: action.location };
    case REQUEST_REGISTER_MAVEN:
      return { ...state, mavenLoading: true };
    case REGISTER_MAVEN:
      return { ...state, mavenLoading: false, msg: action.msg, mavenRegSuccess: true };
      case REGISTER_MAVEN_FAILED:      
      return { ...state, mavenLoading: false, msg: action.msg, mavenRegSuccess: false } 

    default:
      return state;
  }
}
