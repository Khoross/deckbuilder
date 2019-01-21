// @flow
import { combineReducers } from 'redux';
import { createSlice } from 'redux-starter-kit'
//import deck from './deck'
//import filters from './filters'

const filters = createSlice({
  slice: 'filterString',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {console.log(state);console.log(action);return action.payload}
  }
})

const filterData = createSlice({
  slice: 'filterResults',
  initialState: false,
  reducers: {
    startLoading: () => false,
    setData: (state, action) => action.payload
  }
})

const deck = createSlice({
  slice: 'deck',
  initialState: {},
  reducers: {
    addCard: (state, action) => {
      if(state[action.payload] === undefined) {
        state[action.payload] = 1
      } else if(state[action.payload] < 4) {
        state[action.payload] = state[action.payload] + 1
      }
    },
    removeCard: (state, action) => {
      if(state[action.payload] === 1) {
        delete state[action.payload]
      } else if(state[action.payload] !== undefined) {
        state[action.payload] = state[action.payload] - 1
      }
    }
  }
})

export default function createRootReducer() {
  return combineReducers({
    filters: filters.reducer,
    filterData: filterData.reducer,
    deck: deck.reducer
  });
}

export const {setFilter} = filters.actions
export const {startLoading, setData} = filterData.actions
export const {addCard, removeCard} = deck.actions