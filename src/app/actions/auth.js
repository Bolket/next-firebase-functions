import * as types from './actionTypes';

export function onClientSide() {
  return {
    type: types.CLIENT_ONLY,
  };
}

export function authLoginRequest(payload) {
  return {
    type: types.AUTH_LOGIN_REQUEST,
    payload,
  };
}

export function authLoginSuccess(payload) {
  return {
    type: types.AUTH_LOGIN_SUCCESS,
    payload,
  };
}

export function authLoginFailure(error) {
  return {
    type: types.AUTH_LOGIN_FAILURE,
    error,
  };
}

export function authLogoutRequest() {
  return {
    type: types.AUTH_LOGOUT_REQUEST,
  };
}

export function authLogoutFailure(error) {
  return {
    type: types.AUTH_LOGOUT_FAILURE,
    error,
  };
}

export function authLogoutSuccess() {
  return {
    type: types.AUTH_LOGOUT_SUCCESS,
  };
}
