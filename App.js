import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import { purple, white } from './utils/colors'
import { setLocalNotification } from './utils/api'

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='decks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: white,
      animationEnabled: true,
      style: {
        height: 65,
        backgroundColor: purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      tabBarLabel: 'Deck Detail',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      tabBarLabel: 'New Question',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    },

  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      tabBarLabel: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    },
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
