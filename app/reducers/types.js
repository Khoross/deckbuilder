import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

/**
 * ACTIONS:
 * Alter filters
 * Hydrate cards
 * Add to deck
 * Remove from deck
 * change card sort
 * TYPES:
 * atomic filter
 * developed filter
 * sort
 * card
 * deck
 **/

export type atomicFilter = {
    +key: cardKey,
    +values: [any],
    +comp: (any, any) => boolean
};

export type filter = [atomicFilter];

export gteFilter = (card, val) => card !== undefined && card >= val
export lteFilter = (card, val) => gteFilter(val, card)
export exactFilter = (card, val) => card === val
export neqFilter = (card, val) => card !== undefined && card !== val
export incFilter = (card, val) => card.includes(val)
//filter creation:
//each filter is made of a collection of atomic filters. All atomic filters must hold true for an entry to return.
//Each atomic filter consists of a key the filter applies to, a comparison function, and a set of possible values
//An atomic filter holds true for a card if the comparison function evaluates to true for some value in the values array and the value of the card at the key
//Example filters:
//CMC>=4
//{key: "cmc", values: [4], comp: gteFilter}
//power between 4 and 6
//[{key: "power", values[4], comp: gteFilter}, {key: "power", values: [6], comp: lteFilter}]
//
export applyFilter = (state: ReduxStore, filter: filter) => 
    state.cards.filter(card => 
        filter.every(atom => 
            atom.values.some(val => 
                atom.comp(card[atom.key], val)
            )
        )
    )


export type deck = {[number]: number};

export type atomicSort = {+key: cardKey, +mapping: (any) => number}
export type sort = [atomicSort]

//this will need to be memoized to prevent rerenders on changing filters
//also for my sanity
export deckIds = createSelector((state) => state.deck, (deck) => Object.keys(deck));

export type counterStateType = {
  +counter: number
};

export type Action = {
  +type: string
};

export type GetState = () => counterStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
