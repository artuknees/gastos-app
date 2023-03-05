import { createReducer } from '@reduxjs/toolkit';
import { setUser, setSession } from '../actions/session';

const initialState = {
  logged: false,
  user: {
    username: '',
    password: ''
  }
}; 

export const sessionReducer = createReducer(initialState, builder => {
  builder
    .addCase(setSession, (state, action) => {
      state.logged = action.payload
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload
    })
});