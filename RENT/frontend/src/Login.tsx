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

const serverURL = 'http://192.168.1.102:5000'
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
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={(text: string) => this.setState({password: text})}
                />
              </View>

              <View style={styles.button}>
                <Button
                  raised={true}
                  title="Login"
                  onPress={() => {
                    server.post('/login', {
                      email: this.state.email,
                      password: this.state.password
                    })
                    .then (resp => {
                      //login successful
                      if(resp.status === 200) {
                        this.props.navigation.navigate('RentalMain',{
                          userName: this.state.firstName
                        })
                        console.log("Login Successful");
                        this.setLoginVisible(false);
                      }
                      //login failed
                      else if (resp.status === 404) {
                        Alert.alert("Login Failed","Username or Password incorrect");
                        console.log("Login Failed");
                      }
                    })
                    .catch (err => {

                    })
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
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({password: text})}
                />
              </View>

              <View style={styles.button}>
                <Button
                  raised={true}
                  title="Sign Up"
                  onPress={() => {
                    server.post('/createuser', {
                      email: this.state.email,
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      password: this.state.password

                    }).then(resp => {
                      if(resp.status === 201) {
                        this.props.navigation.navigate('RentalMain',{
                          userName: this.state.firstName
                        })
                        console.log("Account created");
                        this.setSignupVisible(false);
                      } else {
                        Alert.alert('Account Exists', "We found an account with that email. Please sign in");
                        console.log("Exists");
                      }
                    }).catch(err => {
                      this.props.navigation.navigate('Login')
                    });
                  }}
                />
              </View>
          </View>
        </Overlay>
      </ImageBackground>
    );
  }
}
