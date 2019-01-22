// @flow 

import {of, empty} from 'rxjs'
import {expand, switchMap, merge, withLatestFrom, filter, map, reduce} from 'rxjs/operators'
import {ofType} from 'redux-observable'
import {setFilter, startLoading, setData} from '../reducers'

export const urlFromQuery = (query) => {
  return `https://api.scryfall.com/cards/search/?order=cmc&q=${
    [...query.split(" "), "game:arena", "f:s"]
      .map((c)=>encodeURIComponent(c))
      .join("+")
  }`
}

export const scryfallToList = (resp) => {
  return resp.data ? resp.data.map((card) => card.arena_id) : []
}

//Observable logic:
//first, check we're dealing with a filter update
//then, check it's actually an update
//after this, start an abortable process
//emit a startLoading action, to begin navigation
//query scryfall for the first batch of data
//if this query indicates there's more data, recursively ask for it
//for each of these responses, extract the list of ids we care about
//gather these into one final list as we go
//once we're done with getting more data, emit it as a setData action
export const queryEpic = (action$, state$, {getJSON}) => {
  return action$.pipe(
    ofType(setFilter),
    withLatestFrom(state$),
    filter(([action, state]) => action.payload !== state.filters.query),
    switchMap(([filterAction, ]) => {
      return of(startLoading(filterAction.payload))
        .pipe(
          merge(getJSON(urlFromQuery(filterAction.payload))
            .pipe(
              expand((resp) => resp.has_more ? getJSON(resp.next_page) : empty()),
              map((resp) => scryfallToList(resp)),
              reduce((acc, cur) => [...acc, ...cur], []),
              map((ids) => setData(ids))
            )
          )
        )
    })
  )
}