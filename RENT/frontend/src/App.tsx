import React, {Component} from 'react';
import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import { Text, View, Alert, Vibration, Image, ImageBackground, ImageBackgroundBase } from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {Login} from './Login';

import sha256 from 'sjcl';
import axios from 'axios';

const serverURL = 'http://localhost:5000' // I think this is the default flask one
const server = axios.create({
  baseURL: serverURL
});

type Props = {};
export default class App1 extends Component<Props> {

  buttonPressed(): void {
    Alert.alert("Test2");
    Vibration.vibrate(300);
    <Login />
  }

  render() {
    return (
      <View style={styles.container}>

        <Image 
          style={styles.image}
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png'}} 
        />

        <Text style={styles.text}>
          Welcome to RENT! 
        </Text>

        <View style={styles.button}>
          <Button
            raised={true}
            title="Login"
            onPress={this.buttonPressed}
          />
        </View>

        <View style={styles.button}>
          <Button
            style={styles.button}
            raised={true}
            title="Sign up"
            onPress={this.buttonPressed}
          />
        </View>

      </View>
    );
  }
}
