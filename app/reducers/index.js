// @flow
import { combineReducers } from 'redux';
import counter from './counter';
import filters from './filters'

export default function createRootReducer() {
  return combineReducers({
    counter,
    filters
  });
}
