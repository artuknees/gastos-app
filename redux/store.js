import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { sessionReducer } from './features/reducers/session';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
    },
});