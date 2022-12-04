import { AxiosResponse } from 'axios';
import React from 'react';
import { createAction } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createReducer } from 'typesafe-actions';
import { LoginInput, MyInfo } from '../App';
import * as api from '../lib/api';
import client from '../lib/client';

const SET_ACCESS_TOKEN = 'auth/SET_ACCESS_TOKEN';
const LOGIN = 'auth/LOGIN';

export const setAccessToken = createAction(
  SET_ACCESS_TOKEN,
  (accessToken: string) => accessToken,
);
export const login = createAction(
  LOGIN,
  ({ userId, password }: LoginInput) => ({ userId, password }),
);

function* loginSaga(action: ReturnType<typeof login>) {
  try {
    const { userId, password } = action.payload;
    const response: AxiosResponse = yield call(api.signIn, userId, password);
    const { authorization } = response.headers;
    const accessToken = authorization!.substring(7);

    yield put(setAccessToken(accessToken));

    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } catch (e) {
    console.log(e);
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
}

export interface AuthState {
  accessToken: string;
  myInfo: MyInfo | null;
}

const initialState: AuthState = {
  accessToken: '',
  myInfo: null,
};

const auth = createReducer(initialState, {
  [SET_ACCESS_TOKEN]: (state, action) => ({
    ...state,
    accessToken: action.payload,
  }),
});

export default auth;
