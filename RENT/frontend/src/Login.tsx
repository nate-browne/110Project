  /*
  Name: Login.tsx
  Description: This file renders the login page and handles sign up and logging in
  of user.
*/

import React, {Component} from 'react';
import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import { TextInput, Text, View, Alert, Image, ImageBackground } from 'react-native';
import {Button, Overlay } from 'react-native-elements';
//import sjcl from 'sjcl';
import axios from 'axios';

const serverURL = 'http://localhost:5000' // I think this is the default flask one
const server = axios.create({
  baseURL: serverURL
});

type Props = {};
export default class Login extends Component<Props> {

  state = {
    loginVisible: false,
    signupVisible: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };


  setLoginVisible(visible: boolean) {
    this.setState({loginVisible: visible});
  }

  setSignupVisible(visible: boolean) {
    this.setState({signupVisible: visible});
  }

  signupPressed(): void{
    Alert.alert("Sign up here");
  }

  render() {
    return (
    <ImageBackground source={{uri: 'https://i.pinimg.com/originals/8c/af/9e/8caf9e448b13665f7922b97ce8cadd3b.jpg'}} style={styles.background}>
<<<<<<< HEAD
      <Modal
        animationType="fade"
        visible={this.state.loginVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
=======
      <Overlay
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        isVisible={this.state.loginVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
>>>>>>> 1a38aa53c76253fdfeedd4e00a0b7b78456fc93b
        >
        <View style={styles.container}>
            <Text style={{fontSize: 48}}>Login Here</Text>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="something@something.something"
                onChangeText={(text) => this.setState({text})}
              />
            </View>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="Password"
                onChangeText={(text) => this.setState({text})}
              />
            </View>

            <View style={styles.button}>
              <Button
                raised={true}
                title="Done"
                onPress={() => {
                  this.setLoginVisible(false);
                }}
              />
            </View>
        </View>
      </Overlay>

<<<<<<< HEAD
      <Modal
        animationType="fade"
        visible={this.state.signupVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
=======
      <Overlay
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        isVisible={this.state.signupVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
>>>>>>> 1a38aa53c76253fdfeedd4e00a0b7b78456fc93b
        >
        <View style={styles.container}>
            <Text style={{fontSize: 48}}>Signup Here</Text>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="First Name"
                onChangeText={(text) => this.setState({text})}
              />
            </View>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="Last Name"
                onChangeText={(text) => this.setState({text})}
              />
            </View>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="something@something.something"
                onChangeText={(text) => this.setState({text})}
              />
            </View>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="Password"
                onChangeText={(text) => this.setState({text})}
              />
            </View>

            <View style={styles.button}>
              <Button
                raised={true}
                title="Done"
                onPress={() => {
                  server.post('/createuser', {
                  });
                }}
                //add navigate to home page if success
              />
            </View>
        </View>
        </Overlay>


      <Image
          style={styles.image}
          source={require('../assets/logo.png')}
        />

      <Text style={styles.text}>
        Welcome to RENT!
      </Text>

      <View style={styles.button}>
        <Button
          raised={true}
          title="Login"
          onPress={() => {
            this.setLoginVisible(true);
          }}
        />
      </View>

      <View style={styles.button}>
        <Button
          raised={true}
          title="Sign up"
          onPress={() =>{
            this.setSignupVisible(true);
          }}
        />
      </View>

      <View style={styles.button}>
        <Button
          raised={true}
          title="Rental Main"
          onPress={() => this.props.navigation.push('RentalMain')}
        />
      </View>

    </ImageBackground>
    );
  }
}
