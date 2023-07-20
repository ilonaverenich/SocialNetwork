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

export const setStatusAuth  = createAction('GET_STATUS');
export const getUser = createAction('GET_USER');
export const getStatus = createAction('GET_STATUS_USER');
export const getUserData = createAction('GET_USER_DATA');
export const setStateEdit = createAction('SET_STATE_EDIT');
export const setState = createAction('SET_STATE');

const reducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(setStatusAuth , (state, action) => {
      state.statusAuth = action.payload;
    })
    .addCase(getUser, (state, action) => {
      state.user.token = action.payload;
    })
    .addCase(getUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setStateEdit, (state, action) => {
      state.user.stateEdit = action.payload;
    })
    .addCase(setState, (state, action) => {
      state.state = !action.payload;
    });
});

export default reducer;