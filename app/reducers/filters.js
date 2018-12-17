// @flow

import {UPDATE_FILTER, RESET_FILTERS, Action} from '../actions'
import type {Filter} from '../types'


export default function filterReducer(state: Filter = {type_line: {key: "type_line", values: ["Legendary Land"], comp: (a, b)=>a===b}}, action: Action) {
    switch(action.type) {
        case UPDATE_FILTER:
            return Object.assign({}, state, {[action.key]: action.filter})
        case RESET_FILTERS:
            return {}
        default:
            return state
    }
}