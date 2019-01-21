// @flow
import { combineReducers } from 'redux';
import filters from './filters'
import deck from './deck'

export default function createRootReducer() {
  return combineReducers({
    filters,
    deck
  });
}
