import {
  GET_NEARBY_LIST,
  GET_NEARBY_LIST_FAILED,
  GET_CAT_LIST,
  GET_CAT_LIST_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  nearbyList: [],
  catList: [],
  error: null,
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_NEARBY_LIST:
      return { ...state, nearbyList: action.list, loading: true };
    case GET_NEARBY_LIST_FAILED:
      return { ...state, error: action.error };
    case GET_CAT_LIST:
      return { ...state, catList: action.list, loading: true };
    case GET_CAT_LIST_FAILED:
      return { ...state, error: action.error };
    default:
      return state;

  }
}
