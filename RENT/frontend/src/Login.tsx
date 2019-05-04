import React, {Component} from 'react';
import styles from './style/Login-Stylesheet'; // This is how you can import stuff from other folders
import { Text, View, Alert, Vibration } from 'react-native';
import {Button, Icon} from 'react-native-elements';


import axios from 'axios';

const serverURL = 'http://localhost:5000' // I think this is the default flask one
const server = axios.create({
  baseURL: serverURL
});


type Props = {};
export default class Login extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is login</Text>
      </View>
    );
  }
}
