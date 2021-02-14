import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type ActionCreator<ReturnType = void> = ThunkAction<
  ReturnType,
  any,
  any,
  Action
>;
