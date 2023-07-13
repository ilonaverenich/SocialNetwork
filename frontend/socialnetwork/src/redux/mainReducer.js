import { createReducer, createAction } from '@reduxjs/toolkit';

const initialValue = {
  statusAuth: false,
  user :{
    "token":'',
    "status":''
  }
};

export const getStatusAuth = createAction('GET_STATUS');
export const getUser = createAction('GET_USER');
export const getStatus = createAction('GET_STATUS_USER');


export default createReducer(initialValue, {
  [getStatusAuth]: function (state, action) {
    state.statusAuth = action.payload;
  },
  [getUser]: function (state, action) {
    state.user.token = action.payload;
  },
  [getStatus]: function (state, action) {
    state.user.status = action.payload;
    console.log( state.user.status )
  },
});
