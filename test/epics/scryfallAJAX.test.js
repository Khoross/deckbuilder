import {TestScheduler} from 'rxjs/testing'
import {ActionsObservable, StateObservable} from 'redux-observable'
import {urlFromQuery, scryfallToList, queryEpic} from '../../app/epics'
import {setFilter, startLoading, setData} from '../../app/reducers'

const getJSONBoilerplate = (cold) => ((url) => {
        switch(url){
          case urlFromQuery("TEST"):
            return cold('--a|', {a: {
              has_more: true,
              next_page: urlFromQuery("TEST2"),
              data: [
                {arena_id: 1}
              ]
            }})
          case urlFromQuery("TEST2"):
            return cold('--a|', {a: {
              has_more: true,
              next_page: urlFromQuery("TEST3"),
              data: [
                {arena_id: 2}
              ]
            }})
          default:
            return cold('--a|', {a: {
              has_more: false,
              data: [
                {arena_id: 3}
              ]
            }})
        }
      })

describe('queryEpic', () => {
  let testScheduler
  beforeEach(() => {testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected))})
  it('Cancels requests correctly', () => {
    testScheduler.run(({hot, cold, expectObservable}) => {
      const values = {filters: {loading: false, query: '', results: []}, deck: {}}
      const action$ = hot('-a---b', {a: setFilter('TEST'), b: setFilter('TEST2')})
      const state$ = hot('s', {s: values})

      const getJSON = getJSONBoilerplate(cold)

      const output$ = queryEpic(action$, state$, {getJSON})

      expectObservable(output$).toBe('-a---b----c', {a: startLoading('TEST'), b: startLoading('TEST2'), c: setData([2,3])})
    })
  })

  it('Follows paginated JSON responses and combines results', () => {
    testScheduler.run(({hot, cold, expectObservable}) => {
      const values = {filters: {loading: false, query: '', results: []}, deck: {}}
      const action$ = hot('-a', {a: setFilter('TEST')})
      const state$ = hot('s', {s: values})

      const getJSON = getJSONBoilerplate(cold)

      const output$ = queryEpic(action$, state$, {getJSON})

      expectObservable(output$).toBe('-a------b', {a: startLoading('TEST'), b: setData([1,2,3])})
    })
  })

  it(`Doesn't run if the existing query is for this data`, () => {
    testScheduler.run(({hot, cold, expectObservable}) => {
      const values = {filters: {loading: false, query: 'TEST', results: []}, deck: {}}
      const action$ = hot('-a', {a: setFilter('TEST')})
      const state$ = hot('s', {s: values})

      const getJSON = getJSONBoilerplate(cold)

      const output$ = queryEpic(action$, state$, {getJSON})

      expectObservable(output$).toBe('--')
    })
  })

})