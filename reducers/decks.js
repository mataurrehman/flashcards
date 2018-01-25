import { ADD_CARD_TO_DECK, ADD_DECK, GET_ALL_DECKS, GET_SINGLE_DECK } from '../actions'
const decks = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_DECKS:
            return action.decks
        case ADD_DECK:
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case ADD_CARD_TO_DECK:
            const { title } = action
            const { question, answer } = action.card
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: [...state[title].questions, { question: question, answer: answer }]
                }
            }
        default:
            return state
    }
}
export default decks;
