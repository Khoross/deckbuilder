// @flow

import {UPDATE_FILTER, RESET_FILTERS, Action} from '../actions'
import type {Filter} from '../types'


export default function filterReducer(state: Filter = {type: [{key: "type", values: ["Land"], comp: (a, b)=>a.includes(b)}]}, action: Action) {
    switch(action.type) {
        case UPDATE_FILTER:
            return Object.assign({}, state, {[action.key]: action.filter})
        case RESET_FILTERS:
            return {}
        default:
            return state
    }
}