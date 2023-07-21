import { createReducer, createAction } from '@reduxjs/toolkit';

const initialValue = {
  statusAuth: false,
  userDatas:[],
  state: false,
  mainUser:[],
  user :{
    "token":'',
    "status":'',
    "stateEdit":false
  }
};

export const setStatusAuth  = createAction('SET_STATUS');
export const getUser = createAction('GET_USER');
export const getStatus = createAction('GET_STATUS_USER');
export const setUserData = createAction('SET_USER_DATA');
export const setStateEdit = createAction('SET_STATE_EDIT');
export const setState = createAction('SET_STATE');

export const getMainUser = createAction('GET_MAIN_USER');

const reducer = createReducer(initialValue, (builder) => {
  builder
    .addCase(setStatusAuth , (state, action) => {
      state.statusAuth = action.payload;
    })
    .addCase(getUser, (state, action) => {
      state.user.token = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userDatas = action.payload;
    })
    .addCase(setStateEdit, (state, action) => {
      state.user.stateEdit = action.payload;
    })
    .addCase(setState, (state, action) => {
      state.state = !action.payload;
    })
    .addCase(getMainUser, (state, action) => {
      state.mainUser = action.payload;
    });
});

export default reducer;