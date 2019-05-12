/*
  Name: Login.tsx
  Description: This file renders the login page and handles sign up and logging in
  of user.
*/

import React, {Component} from 'react';
import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import { TextInput, Text, View, Alert, Image, ImageBackground } from 'react-native';
import {Button, Overlay } from 'react-native-elements';
import axios from 'axios';

// change the ip address below to be the one for your computer
const serverURL = 'http://100.81.38.211:5000' // I think this is the default flask one
const server = axios.create({
  baseURL: serverURL
});


interface IAppProps {
  navigation?: any;
}

interface IAppState {
}

export default class Login extends Component<IAppProps, IAppState> {
  static navigationOptions = {
    headerTransparent: true,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  
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
      <Overlay
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        isVisible={this.state.loginVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
        >
        <View style={styles.container}>
            <Text style={{fontSize: 48}}>Login Here</Text>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="something@something.something"
                onChangeText={(text: string) => this.setState({email: text})}
              />
            </View>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="Password"
                onChangeText={(text: string) => this.setState({password: text})}
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

      <Overlay
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        isVisible={this.state.signupVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
        >
        <View style={styles.container}>
            <Text style={{fontSize: 48}}>Signup Here</Text>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="First Name"
                onChangeText={(text) => this.setState({firstName: text})}
              />
            </View>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="Last Name"
                onChangeText={(text) => this.setState({lastName: text})}
              />
            </View>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="something@something.something"
                onChangeText={(text) => this.setState({email: text})}
              />
            </View>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="Password"
                onChangeText={(text) => this.setState({password: text})}
              />
            </View>

            <View style={styles.button}>
              <Button
                raised={true}
                title="Done"
                onPress={() => {
                  server.post('/createuser', {
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    password: this.state.password
                  }).then(resp => {
                    if(resp.status === 201) {
                      {this.props.navigation.navigate('Example')}
                      console.log("Account created");
                    } else {
                      Alert.alert('Account Exists', "We found an account with that email. Please sign in");
                      console.log("Exists");
                    }
                  }).catch(err => {
                    {this.props.navigation.navigate('Login')}
                  });
                  this.setSignupVisible(false);
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
          title="Test Page"
          onPress={() => this.props.navigation.push('Example')}
        />
      </View>

    </ImageBackground>
    );
  }
}
