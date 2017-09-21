import {
  GET_NEARBY_LIST,
  GET_NEARBY_LIST_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  nearbyList: [],
  error: null,
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_NEARBY_LIST:
      return { ...state, nearbyList: action.list, loading: true };
    case GET_NEARBY_LIST_FAILED:
      return { ...state, error: action.error };
    default:
      return state;

  }
}
