import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from './../actions'
import { gray, white } from '../utils/colors';

class DeckList extends React.Component {
    componentDidMount() {
        this.props.getAllDecks();
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.decks !== null
    }
    render() {
        const { decks } = this.props
        return (
            <View style={styles.container}>
                {   <FlatList
                        data={Object.values(decks)}
                        renderItem={({ item }) => {
                            const { title, questions } = item[0]
                            return (
                                <TouchableOpacity key={title} onPress={() => this.props.navigation.navigate('DeckDetail', { entryId: title, title: title })} title="View Detail">
                                    <View style={styles.item}>
                                        <Text style={styles.titleText}>{title}</Text>
                                        <Text style={styles.cardText}>{questions && questions.length} Cards</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index) => index}
                    />
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    if (state.decks !== undefined) {
        const { decks } = state
        var deckArr = Array();
        var newDecks = Object.keys(decks).map((deck) => {
            return deckArr.concat(decks[deck]);
        })
        return { decks: newDecks };
    }
}

export default connect(mapStateToProps, { getAllDecks })(DeckList)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: 150,
        backgroundColor: gray,
        borderWidth: 4,
        borderRadius: 2,
        borderColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardText: {
        marginTop: 5,
        fontSize: 16
    }
});