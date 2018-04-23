import { GET_HELLO_REQUEST, GET_HELLO_SUCCESS, GET_HELLO_FAILURE } from '../actions/actionTypes';

const initialState = {
  isWaiting: false,
  error: {
    code: '',
    message: '',
  },
};

export default function hello(state = initialState, action) {
  switch (action.type) {
    case GET_HELLO_REQUEST:
      return Object.assign({}, state, {
        isWaiting: true,
        error: initialState.error,
      });
    case GET_HELLO_SUCCESS:
      return Object.assign({}, state, action, {
        payload: action.payload,
        isWaiting: false,
        error: initialState.error,
      });
    case GET_HELLO_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isWaiting: false,
      });
    default:
      return state;
  }
}
