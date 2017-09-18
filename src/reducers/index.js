import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import regReducer from './reg_reducer';
import profileReducer from './profile_reducer';

export default combineReducers({
  auth: authReducer,
  reg: regReducer,
  profile: profileReducer
});
