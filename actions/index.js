export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const GET_SINGLE_DECK = 'GET_SINGLE_DECK'

import { getDecks, saveTitle,addCardAPI } from './../utils/api'

export function addNewDeck(title) {
    return dispatch => {
        saveTitle(title).then(() => {
            dispatch({ type: ADD_DECK, title });
        })
    }
}
export function addCardToDeck(title, card) {
    return dispatch => {
        addCardAPI(title,card).then(() => {
            dispatch({ type: ADD_CARD_TO_DECK, title,card });
        })
    }
}
export function getAllDecks() {
    return dispatch => {
        return getDecks().then(decks => {
            dispatch({ type: GET_ALL_DECKS, decks });
        });
    };
}
export function getSingleDeck(title) {
    return dispatch => {
        return getDeck(title).then(deck => {
            dispatch({ type: GET_SINGLE_DECK, deck });
        });
    };

}