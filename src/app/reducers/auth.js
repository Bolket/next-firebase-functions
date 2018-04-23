import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  isWatched: false,
  isWaiting: false,
  error: {
    code: '',
    message: '',
  },
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return Object.assign({}, state, {
        isWaiting: true,
        error: initialState.error,
      });
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isWaiting: false,
        error: initialState.error,
      });
    case AUTH_LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isWaiting: false,
      });
    case AUTH_LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isWaiting: true,
        error: initialState.error,
      });
    case AUTH_LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState);
    case AUTH_LOGOUT_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isWaiting: false,
      });
    default:
      return state;
  }
}
