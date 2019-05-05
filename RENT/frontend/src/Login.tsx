import React, {Component} from 'react';
import styles from './style/Login-Stylesheet'; // This is how you can import stuff from other folders
import {Modal, Text, View, TouchableWithoutFeedback } from 'react-native';
import {Button, Icon} from 'react-native-elements';


import axios from 'axios';

const serverURL = 'http://localhost:5000' // I think this is the default flask one
const server = axios.create({
  baseURL: serverURL
});

export class Login extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  constructor(props: Props) {
    super(props);
    this.buttonPressed = this.buttonPressed.bind(this);
  }

  render() {
    return (
      <View>
        
      </View>
    );
  }
}
