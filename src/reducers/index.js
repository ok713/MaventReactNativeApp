import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import profileReducer from './profile_reducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer
});
