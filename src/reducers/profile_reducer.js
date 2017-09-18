// import { REHYDRATE } from 'redux-persist/constants';
import {
  GET_PROFILE_INFO,
  PROFILE_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  error: null,
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PROFILE_INFO:
      return { ...state, user: action.user, loading: true };
    case PROFILE_ERROR:      
        return { ...state, error: action.error, loading: false } 

    default:
      return state;
  }
}
