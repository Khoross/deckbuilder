// @flow 

export const ADD_CARD : "ADD_CARD" = "ADD_CARD"
export const REMOVE_CARD : "REMOVE_CARD" = "REMOVE_CARD"
export const RESET_DECK : "RESET_DECK" = "RESET_DECK"
export const CHANGE_NAME : "CHANGE_NAME" = "CHANGE_NAME"

export const addCard = (mtgaID: Number) => {
    return {
        type: ADD_CARD,
        mtgaID
    }
}

export const removeCard = (mtgaID: Number) => {
    return {
        type: REMOVE_CARD,
        mtgaID
    }
}

export const nameDeck = (name: String) => {
    return {
        type: CHANGE_NAME,
        name
    }
}

export const resetDeck = () => {
    return {
        type: RESET_DECK
    }
}

export type DeckAction = $Call<addCard, any> | $Call<removeCard, any> | $Call<nameDeck, any> | $Call<resetDeck>