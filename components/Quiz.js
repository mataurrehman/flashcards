import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { dangerborderColor, dangerbackgroundColor, primaryborderColor, primarybackgroundColor, successborderColor, successbackgroundColor, white, blue, gray } from './../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title
        }
    }
    state = {
        correctCount: 0,
        inCorrectCount: 0,
        currentQuestion: 0,
        showAnswer: false
    }
    submitAnswer = (answer) => {
        this.setState((prevState) => {
            return {
                correctCount: prevState.correctCount + answer,
                inCorrectCount: prevState.inCorrectCount + answer,
                currentQuestion: prevState.currentQuestion + 1,
                showAnswer: false
            }
        })
        if (this.state.currentQuestion+1 == this.props.decks[this.props.navigation.state.params.entryId].questions.length) {
            clearLocalNotification().then(setLocalNotification);
        }
    }
    restartQuiz = () => {
        this.setState({
            correctCount: 0,
            inCorrectCount: 0,
            currentQuestion: 0,
            showAnswer: false
        })
    }
    toggleQuestionShow = () => {
        this.setState((prevState) => {
            return {
                showAnswer: !prevState.showAnswer
            }
        })
    }
    render() {
        const deckTitle = this.props.navigation.state.params.entryId
        const deck = this.props.decks[deckTitle]
        const { currentQuestion, showAnswer } = this.state
        if (currentQuestion == deck.questions.length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.finishTxt}>{(this.state.correctCount / deck.questions.length * 100).toFixed(2)} % are correct</Text>
                    <TextButton onPress={() => this.restartQuiz()} style={styles.restartBtn}>Restart Quiz</TextButton>
                    <TextButton onPress={() => this.props.navigation.navigate('DeckList')} style={styles.goBackListBtn}>Deck List</TextButton>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.cardNumber}>showing card {currentQuestion + 1}/{deck.questions.length}</Text>
                {showAnswer ? <Text style={styles.questionTxt}>{deck.questions[currentQuestion].answer}</Text> : <Text style={styles.questionTxt}>{deck.questions[currentQuestion].question}</Text>}
                <Text onPress={() => this.toggleQuestionShow()} style={styles.toggleTxt}>Show {showAnswer ? 'Question' : 'Answer'}</Text>
                <TextButton onPress={() => this.submitAnswer(1)} style={styles.correctBtn}>Correct</TextButton>
                <TextButton onPress={() => this.submitAnswer(0)} style={styles.incorrectBtn}>Incorrect</TextButton>
            </View>
        );
    }
}

const mapStateToProps = ({ decks }) => ({ decks })

export default connect(mapStateToProps)(Quiz)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    restartBtn: {
        borderColor: successborderColor,
        backgroundColor: successbackgroundColor,
        color: white,
        width: 100 * 2
    },
    goBackListBtn: {
        borderColor: primaryborderColor,
        backgroundColor: primarybackgroundColor,
        color: white,
        width: 100 * 2,
        marginTop: 20
    },
    toggleTxt: {
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'blue'
    },
    incorrectBtn: {
        borderColor: dangerborderColor,
        backgroundColor: dangerbackgroundColor,
        color: white,
        width: 100 * 3,
        marginTop: 20
    },
    correctBtn: {
        borderColor: successborderColor,
        backgroundColor: successbackgroundColor,
        color: white,
        width: 100 * 3,
        marginTop: 20
    },
    questionTxt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    finishTxt: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 40,
        color: 'green',
        marginBottom: 50
    },
    cardNumber: {
        color: gray,
        fontSize: 20,
        alignSelf: 'flex-start',
        marginBottom: 20
    }
});