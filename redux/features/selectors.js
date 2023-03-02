import { createSelector } from '@reduxjs/toolkit';
export const session = (state) => state.session
export const sessionSelector = createSelector(session, state => state)


