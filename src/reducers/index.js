import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import profileReducer from './profile_reducer';
import exploreReducer from './explore_reducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  explore: exploreReducer
});
