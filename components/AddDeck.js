import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from './../actions'
import { gray, white } from '../utils/colors'
import TextButton from './TextButton'

class AddDeck extends Component {
  state = {
    title: ''
  }
  submitDeck = () => {
    const { title } = this.state
    this.props.addNewDeck(title)
    this.props.navigation.navigate('DeckDetail', { entryId: title, title: title });
    this.setState({ 'title': '' });
    Keyboard.dismiss();
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <Text style={styles.deckLabel}>Name your deck</Text>
          <TextInput
            style={styles.deckInput}
            value={this.state.title}
            placeholder={'Enter the title'}
            placeholderTextColor={gray}
            onChangeText={title => this.setState({ title: title })} />
          <TextButton onPress={this.submitDeck} style={styles.submitBtn}>Submit</TextButton>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = ({ decks }) => ({ decks })

export default connect(mapStateToProps, { addNewDeck })(AddDeck)

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
  deckInput: {
    height: 40,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center'
  },
  submitBtn: {
    borderColor: '#2e6da4',
    backgroundColor: '#337ab7',
    width:100*4
  }
});
