import { createReducer, createAction } from '@reduxjs/toolkit';

const initialValue = {
  statusAuth: false,
  userData:[],
  state:false,
  user :{
    "token":'',
    "status":'',
    "stateEdit":false
  }
};

export const getStatusAuth = createAction('GET_STATUS');
export const getUser = createAction('GET_USER');
export const getStatus = createAction('GET_STATUS_USER');
export const getUserData = createAction('GET_USER_DATA');
export const setStateEdit = createAction('SET_STATE_EDIT');
export const setState = createAction('SET_STATE');


export default createReducer(initialValue, {
  [getStatusAuth]: function (state, action) {
    state.statusAuth = action.payload;
  },
  [getUser]: function (state, action) {
    state.user.token = action.payload;
  },
  [getUserData]: function (state, action) {
    state.userData = action.payload;
  },
  [setStateEdit]: function (state, action) {
    state.user.stateEdit = action.payload;
  
  },
  [setState]: function (state, action) {
    state.state = !action.payload;
  },
});
