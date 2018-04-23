import * as types from './actionTypes';

export function getHelloRequest() {
  return {
    type: types.GET_HELLO_REQUEST,
  };
}

export function getHelloSuccess(payload) {
  return {
    type: types.GET_HELLO_SUCCESS,
    payload,
  };
}

export function getHelloFailure(error) {
  return {
    type: types.GET_HELLO_FAILURE,
    error,
  };
}
