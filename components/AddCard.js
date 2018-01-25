import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView,Keyboard } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { addCardToDeck } from './../actions'


class AddCard extends Component {
  state = {
    deckTitle: '',
    question: '',
    answer: ''
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    }
  }
  componentDidMount() {
    this.setState({ 'deckTitle': this.props.navigation.state.params.entryId });
  }
  submitCard = () => {
    const { deckTitle, question, answer } = this.state
    const card = { question, answer };
    this.props.addCardToDeck(deckTitle, card)
    this.props.navigation.navigate('DeckDetail', { entryId: deckTitle, title: deckTitle });
    this.setState({ 'question': '', 'answer': '' });
    Keyboard.dismiss();
  };
  render() {
    const {deckTitle} = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <View style={styles.container}>
          <Text style={styles.deckLabel}>{deckTitle}</Text>
          <TextInput
            style={styles.input}
            value={this.state.question}
            placeholder={'Question'}
            onChangeText={question => this.setState({ question: question })} />
          <TextInput
            style={styles.input}
            value={this.state.answer}
            placeholder={'Answer'}
            onChangeText={answer => this.setState({ answer: answer })} />
          <TextButton onPress={this.submitCard} style={styles.submitBtn}>Submit</TextButton>
        </View>
      </KeyboardAvoidingView>

    );
  }
}
const mapStateToProps = ({ decks }) => ({ decks })
export default connect(mapStateToProps, { addCardToDeck })(AddCard)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  },
  deckLabel: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    height: 40,
    marginTop: 30,
    marginBottom: 30
  },
  submitBtn: {
    borderColor: '#2e6da4',
    backgroundColor: '#337ab7',
    width:100*4
  }
});
