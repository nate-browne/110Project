  /*
  Name: Login.tsx
  Description: This file renders the login page and handles sign up and logging in
  of user.
*/

import React, {Component} from 'react';
import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import { View } from 'react-native';
import {Button , Image, Input, Overlay} from 'react-native-elements';

import * as EmailValidator from 'email-validator';
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
    signupVisible: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailError: false,
    passwordError: false,
    loginError: false,
    signupError: false
  };

  setSignupVisible(visible: boolean) {
    this.setState({signupVisible: visible});
  }

  displayEmailError(): string {
    if(this.state.emailError === true ) {
      return "Please enter a valid email";
    }
    return "";
  }

  displayPasswordError(): string {
    if(this.state.passwordError === true) {
      return "Passwords did not match"
    }
    return "";
  }
  displayLoginError(): string {
    if(this.state.loginError === true ) {
      return "Username or Password incorrect";
    }
    return "";
  }
  displaySignupError(): string {
    if(this.state.signupError === true ) {
      return "Account with above email exists. Please sign in.";
    }
    return "";
  }
  createUser(): any {
    server.post('/createuser', {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      phoneNumber: 7074301465
    }).then(resp => {
      if(resp.status === 201) {
        console.log("Account created");
        this.setSignupVisible(false);
      } else {
      }
    }).catch(err => {
      this.setState({signupError: true})
      console.log('Error occurred',err);
    });
  }

  login(): any {
    server.post('/login', {
      email: this.state.email,
      password: this.state.password,
      remember: true
    }).then(resp => {
      //login successful
      if(resp.status === 200) {
        this.props.navigation.navigate('Home',{
          userName: resp.data.firstName,
          userID: resp.data.userID,
          loggedIn: resp.data.loggedIn
        })
        console.log("Login Successful");
      }
      //login failed
      else if (resp.status === 400) {
        this.setState({loginError: true})
        console.log("Login Failed");
      }
    })
    .catch(err => {
      this.setState({loginError: true})
      console.log('Error occurred',err);
    })
  }
  render() {
    return (
      <View style={styles.loginContainer}>

        <Image source={require('../assets/rent-final.png')} style={styles.imageIcon}></Image>

        <View style={styles.formFields}>
          <Input
                  inputContainerStyle={styles.textinput}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onChangeText={(text: string) => this.setState({email: text, loginError: false})}
            />

          <Input
                  inputContainerStyle={styles.textinput}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  returnKeyType="done"
                  placeholder="Password"
                  errorStyle={{ color: 'red' }}
                  errorMessage={this.displayLoginError()}
                  onChangeText={(text: string) => this.setState({password: text})}
          />
      </View>

      <View style={styles.loginButton}>
              <Button
                title="Login"
                buttonStyle={{backgroundColor:"#2bc0cd"}}
                onPress={() => {this.login()}}
              />
        </View>

        <View style={styles.serviceBar}>

          <View style={styles.button}>
            <Button
              raised={true}
              type="clear"
              title="Forgot password?"
              titleStyle={styles.linkText}
            />
          </View>

          <View style={styles.button}>
            <Button
              raised={true}
              type={"clear"}
              title="Register"
              onPress={() => {
                this.setSignupVisible(true);
              }}
              titleStyle={styles.linkText}
            />
          </View>
        </View>

        <Overlay
        isVisible={this.state.signupVisible}
        onBackdropPress={() => this.setState({ signupVisible: false, passwordError: false, emailError: false, signupError: false })}
        containerStyle={styles.container}
        >
        <View style={styles.container}>

            <Input
              inputContainerStyle={styles.textinput}
              placeholder="First Name"
              autoCapitalize="words"
              autoCorrect={false}
              keyboardAppearance="light"
              returnKeyType="next"
              onChangeText={(text) => this.setState({firstName: text})}
            />

            <Input
              inputContainerStyle={styles.textinput}
              placeholder="Last Name"
              autoCapitalize="words"
              autoCorrect={false}
              keyboardAppearance="light"
              returnKeyType="next"
              onChangeText={(text) => this.setState({lastName: text})}
            />


            <Input
              inputContainerStyle={styles.textinput}
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="light"
              keyboardType="email-address"
              returnKeyType="next"
              errorStyle={{ color: 'red', alignSelf: "center" }}
              errorMessage={this.displayEmailError() + this.displaySignupError()}
              onChangeText={(text) => this.setState({email: text, emailError: false, signupError: false})}
            />

            <Input
              inputContainerStyle={styles.textinput}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="light"
              returnKeyType="done"
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
            />
            <Input
              inputContainerStyle={styles.textinput}
              placeholder="Confirm Password"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="light"
              returnKeyType="done"
              errorStyle={{ color: 'red', alignSelf: "center" }}
              errorMessage={this.displayPasswordError()}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({confirmPassword: text, passwordError: false})}
            />

            <View style={styles.button}>
              <Button
                buttonStyle={{backgroundColor:"#2bc0cd"}}
                raised={false}
                title="Sign Up"

                onPress={() => {
                  if(EmailValidator.validate(this.state.email) &&
                    this.state.password === this.state.confirmPassword) {
                    this.createUser();
                  }
                  if( !EmailValidator.validate(this.state.email) ) {
                    this.setState({emailError: true})
                  }
                  if( this.state.password !== this.state.confirmPassword) {
                    this.setState({passwordError:true})
                  }
                }}
              />
            </View>
        </View>
        </Overlay>
      </View>

    );
  }
}
