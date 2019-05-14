  /*
  Name: Login.tsx
  Description: This file renders the login page and handles sign up and logging in
  of user.
*/

import React, {Component} from 'react';
import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import { Text, View, Alert, Image, ImageBackground } from 'react-native';
import {Button, Overlay, Input, Icon} from 'react-native-elements';
import axios from 'axios';
// @ts-ignore
import configInfo from './url';

const serverURL = configInfo['serverURL'];
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
          onBackdropPress={() => this.setState({ loginVisible: false })}
          >
          <View style={styles.container}>
              <Text style={{fontSize: 48}}>Login</Text>

              <Input
                  inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  keyboardType="email-address"
                  returnKeyType="next"
                  leftIcon={
                    <Icon name="email-outline" type="material-community" color="black" size={25} />
                  }
                  onChangeText={(text: string) => this.setState({email: text})}
                />

              <Input
                  inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  returnKeyType="done"
                  placeholder="Password"
                  leftIcon={<Icon name="lock" type="simple-line-icon" color="black" size={25} />}
                  onChangeText={(text: string) => this.setState({password: text})}
              />
              <View style={styles.button}>
                <Button
                  raised={true}
                  title="Login"
                  onPress={() => {
                    server.post('/login', {
                      email: this.state.email,
                      password: this.state.password
                    }).then(resp => {
                      //login successful
                      if(resp.status === 200) {
                        this.props.navigation.navigate('RentalMain',{
                          userName: resp.data.firstName,
                          loggedIn: resp.data.loggedIn
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
                    .catch(err => {
                      console.log('Error occurred',err);
                    })
                  }}
                />
              </View>
          </View>
        </Overlay>

        <Overlay
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          isVisible={this.state.signupVisible}
          onBackdropPress={() => this.setState({ signupVisible: false })}
          >
          <View style={styles.container}>
              <Text style={{fontSize: 48}}>Signup</Text>

              <Input
                inputContainerStyle={styles.textinput}
                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                placeholder="First Name"
                autoCapitalize="words"
                autoCorrect={false}
                keyboardAppearance="light"
                returnKeyType="next"
                leftIcon={
                  <Icon
                    name="user"
                    type="simple-line-icon"
                    color="black"
                    size={25}
                  />
                }
                onChangeText={(text) => this.setState({firstName: text})}
              />

              <Input
                inputContainerStyle={styles.textinput}
                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                placeholder="Last Name"
                autoCapitalize="words"
                autoCorrect={false}
                keyboardAppearance="light"
                returnKeyType="next"
                leftIcon={
                  <Icon
                    name="user"
                    type="simple-line-icon"
                    color="black"
                    size={25}
                  />
                }
                onChangeText={(text) => this.setState({lastName: text})}
              />


              <Input
                inputContainerStyle={styles.textinput}
                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardAppearance="light"
                keyboardType="email-address"
                returnKeyType="next"
                leftIcon={
                  <Icon name="email-outline" type="material-community" color="black" size={25} />
                }
                onChangeText={(text) => this.setState({email: text})}
              />



              <Input
                inputContainerStyle={styles.textinput}
                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardAppearance="light"
                returnKeyType="done"
                secureTextEntry={true}
                leftIcon={<Icon name="lock" type="simple-line-icon" color="black" size={25} />}
                onChangeText={(text) => this.setState({password: text})}
              />

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
                          userName: this.state.firstName,
                          loggedIn: true
                        })
                        console.log("Account created");
                        this.setSignupVisible(false);
                      } else {
                        Alert.alert('Account Exists', "We found an account with that email. Please sign in.");
                        this.props.navigation.navigate('Login')
                        console.log("Exists");
                      }
                    }).catch(err => {
                      console.log('Error occurred',err);
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
