/*import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import Dashboard from 'react-native-dashboard';
 
const items = [
  { name: 'Me', background: '#3498db', icon: 'user' },
  { name: 'Logistics', background: '#ef0202', icon: 'archive' },
  { name: 'Grocery List', background: '#efcf02', icon: 'list-alt' },
  { name: 'Roommates', background: '#02ef1d', icon: 'users' },
  { name: 'Bulletin Board', background: '#02cbef', icon: 'group' },
  { name: 'Calendars', background: '#ef5802', icon: 'calendar' },
];
 
export default class App extends Component {
  _card = (el: { name: string; }) => {
    switch(el.name){
      case 'Me':
        Alert.alert("You pressed me!")
        break;
      case 'Logistics':
        Alert.alert("You pressed logistics!")
        break;
      case 'Grocery List':
        Alert.alert("You pressed grocery list!")
        break;
      case 'Roommates':
        Alert.alert("You pressed roommates!")
        break;
      case 'Friends':
        Alert.alert("You pressed friends!")
        break;
      case 'Calendars':
        Alert.alert("You pressed calendars!")
        break;
      default:
        Alert.alert("This should not happen")
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Dashboard items={items} background={true} card={this._card} column={2} />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});

*/

import React, { Component } from 'react';
import styles from './style/RentalMain-Stylesheet'; // This is how you can import stuff from other folders
import { Text, View, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            raised={true}
            title="Button 1"
            onPress={() =>{
              Alert.alert("Button 1");
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            raised={true}
            title="Button 1"
            onPress={() =>{
              Alert.alert("Button 1");
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            raised={true}
            title="Button 1"
            onPress={() =>{
              Alert.alert("Button 1");
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            raised={true}
            title="Button 1"
            onPress={() =>{
              Alert.alert("Button 1");
            }}
          />
        </View>
      </View>
    );
  }
}
