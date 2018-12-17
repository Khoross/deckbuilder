// @flow 

import type {AtomicFilter, CardKey} from '../types'

export const UPDATE_FILTER : "UPDATE_FILTER" = "UPDATE_FILTER"
export const RESET_FILTERS : "RESET_FILTERS" = "RESET_FILTERS"

export const updateFilter = (filter: [AtomicFilter], key: CardKey) => {
    return {
        type: UPDATE_FILTER,
        key,
        filter
    }
}

export const resetFilter = () => {
    return {
        type: RESET_FILTERS
    }
}

export type FilterAction = $Call<updateFilter, any, any> | $Call<resetFilter>