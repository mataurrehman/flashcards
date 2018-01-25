import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo';
const FLASHCARS_STORAGE_KEY = "FlashCard:storage"
const NOTIFICATION_KEY = 'FlashCard:notifications'
const dummyData = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}
export function saveTitle(title) {
    return AsyncStorage.mergeItem(FLASHCARS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }))
}

export function getDecks() {
    return AsyncStorage.getItem(FLASHCARS_STORAGE_KEY)
        .then(result => {
            if (result == null) {
                AsyncStorage.setItem(FLASHCARS_STORAGE_KEY, JSON.stringify(dummyData))
                return dummyData
            } else {
                return JSON.parse(result)
            }
        })
}
export function addCardAPI(title, card) {
    return AsyncStorage.getItem(FLASHCARS_STORAGE_KEY)
        .then((results) => {
            const decks = JSON.parse(results)
            const questions = decks[title].questions
            questions.push(card);
            AsyncStorage.mergeItem(FLASHCARS_STORAGE_KEY, JSON.stringify({
                [title]: {
                    questions: questions
                }
            }))
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Take a Quiz!',
        body: "👋 don't forget to take quiz for today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate()+1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
