// @flow
import { combineReducers } from 'redux';
import { createSlice } from 'redux-starter-kit'
//import deck from './deck'
//import filters from './filters'

//setFilter is a no-op - the logic is handled in redux-observable
//this is to avoid starting AJAX when the filter hasn't changed
const filters = createSlice({
  slice: 'filters',
  initialState: {loading: false, query: '', results: []},
  reducers: {
    setFilter: () => {},
    startLoading: (state, action) => {
      state.loading = true
      state.query = action.payload
    },
    setData: (state, action) => {
      state.loading = false
      state.results = action.payload
    }
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
    deck: deck.reducer
  });
}

export const {setFilter, startLoading, setData} = filters.actions
export const {addCard, removeCard} = deck.actions