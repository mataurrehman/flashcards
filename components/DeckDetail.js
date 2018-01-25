import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Animated } from 'react-native'
import { connect } from 'react-redux'
import { getSingleDeck } from './../actions'
import { Ionicons } from '@expo/vector-icons'
import { gray,blue,pink, white } from '../utils/colors'
import TextButton from './TextButton'

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title,
            headerLeft: (
                <Ionicons
                    name='md-arrow-back'
                    size={25}
                    color="#fff"
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.navigate('DeckList')}
                />
            )
        }
    }
    state = {
        color: new Animated.Value(0),
    }
    componentDidMount() {
        const { color } = this.state
        Animated.timing(color, {
            toValue: 1500,
            duration: 1000
        }).start();
    }
    render() {
        const deckTitle = this.props.navigation.state.params.entryId
        const { decks } = this.props
        var color = this.state.color.interpolate({
            inputRange: [0, 400,1000,1500],
            outputRange: [gray, blue,pink,white]
        });
        return (
            <Animated.View style={[{backgroundColor:color},styles.container]}>
                {decks[deckTitle] !== undefined &&
                    <View>
                        <Text style={styles.deckTitleText}>{deckTitle}</Text>
                        <Text style={styles.questionCountText}>{decks[deckTitle].questions.length} Cards</Text>
                        <TextButton style={styles.addCard} onPress={() => this.props.navigation.navigate('AddCard', { entryId: deckTitle, title: deckTitle })}>Add Card</TextButton>
                        {decks[deckTitle].questions.length > 0 &&
                            <TextButton style={styles.startQuiz} onPress={() => this.props.navigation.navigate('Quiz', { entryId: deckTitle, title: deckTitle })}>Start Quiz</TextButton>
                        }
                    </View>
                }
            </Animated.View>
        );
    }
}
const mapStateToProps = ({ decks }) => ({ decks })
export default connect(mapStateToProps)(DeckDetail)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40
    },
    deckTitleText: {
        fontWeight: 'bold',
        fontSize: 25
    },
    questionCountText: {
        color: gray,
        fontSize: 25,
        marginTop: 20,
        marginBottom: 40
    },
    addCard: {
        borderColor: '#2e6da4',
        backgroundColor: '#337ab7',
        color: white,
        width: 100 * 2,
        marginBottom: 10
    },
    startQuiz: {
        borderColor: '#2e6da4',
        backgroundColor: '#337ab7',
        color: white,
        width: 100 * 2
    }
});