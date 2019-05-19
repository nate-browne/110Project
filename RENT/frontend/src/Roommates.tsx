import React, { Component } from 'react';
import { Text, ScrollView, View, Alert } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import styles from './style/GroceryMain-Stylesheet';

export default class Roommates extends Component {
  state = {
    // this list is actually stored in backend - it's only here for viewing purposes
    list: [
      {
        name: 'John Doe',
        subtitle: 'Apple Pie Ingrediants',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#00ddff',
        color2: '#0c54f2',
        done: false
      },
      {
        name: 'Maria',
        subtitle: 'Surprise Party items',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#770ba5',
        color2: '#e100ff',
        done: false
      },
      {
        name: 'James',
        subtitle: 'Household items',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#FF9800',
        color2: '#F44336',
        done: true
      },
    ]
  };

    render() {
          return (
            <View style= {{width:'100%', height:'100%'}}>
            {
                this.state.list.map((l, i) => (
                  <ListItem
                    key={i}
                    containerStyle={{margin: 5}}
                    onPress={() => {
                      this.props.navigation.push('ContactInfo');
                    }}
                    Component={TouchableScale}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    linearGradientProps={{
                      colors: [ l.color1 , l.color2],
                      start: [1, 0],
                      end: [0.2, 0],
                    }}
                    leftAvatar={{ rounded: true, source: { uri: l.avatar_url } }}
                    title={l.name}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    subtitleStyle={{ color: 'white' }}
                    chevronColor="white"
                    chevron
                  />
                ))
              }
            </View>
          )
    }
}
