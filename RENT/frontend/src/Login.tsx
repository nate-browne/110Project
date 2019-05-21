  /*
  Name: Login.tsx
  Description: This file renders the login page and handles sign up and logging in
  of user.
*/

import React, {Component} from 'react';
import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import { Alert, View } from 'react-native';
import {Button , Image, Input, Overlay, CheckBox} from 'react-native-elements';

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
    phoneNumber: "",
    phoneError: false,
    emailError: false,
    passwordError: false,
    isRemembered: false,
  };

  setSignupVisible(visible: boolean) {
    this.setState({signupVisible: visible});
  }

  toggleIsRemembered() {
    this.setState({isRemembered: !this.state.isRemembered});
  }

  displayEmailError(): string {
    if(this.state.emailError === true ) {
      return "Please enter a valid email";
    }
    return "";
  }

  displayPhoneError(): string {
    if (this.state.phoneError === true) {
      return "Please enter a valid phone number";
    }
    return "";
  }

  displayPasswordError(): string {
    if(this.state.passwordError === true) {
      return "Passwords did not match"
    }
    return "";
  }

  createUser(): any {
    server.post('/createuser', {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
    }).then(resp => {
      if(resp.status === 201) {
        this.props.navigation.navigate('Home',{
          userName: this.state.firstName,
          loggedIn: true
        })
        console.log("Account created");
        this.setSignupVisible(false);
      } else {
        Alert.alert('Account Exists', "We found an account with that email. Please sign in");
        this.props.navigation.navigate('Login')
        console.log("Exists");
      }
    }).catch(err => {
      console.log('Error occurred',err);
    });
  }
  login(): any {
    server.post('/login', {
      email: this.state.email,
      password: this.state.password
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
        Alert.alert("Login Failed","Username or Password incorrect");
        console.log("Login Failed");
      }
    })
    .catch(err => {
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
                  onChangeText={(text: string) => this.setState({email: text})}
            />

          <Input
                  inputContainerStyle={styles.textinput}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  returnKeyType="done"
                  placeholder="Password"
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

      <CheckBox 
        center title="Remember me" 
        checked={this.state.isRemembered}
        containerStyle={styles.clearCheckbox}
        textStyle={styles.checkboxText}
        onPress={() => {this.toggleIsRemembered()}}
      />

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
        onBackdropPress={() => this.setState({ signupVisible: false, passwordError: false, emailError: false, phoneError: false })}
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
              errorStyle={{ color: 'red' }}
              errorMessage={this.displayEmailError()}
              onChangeText={(text) => this.setState({email: text, emailError: false})}
            />

            <Input
              inputContainerStyle={styles.textinput}
              placeholder="Phone (optional)"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="light"
              keyboardType="phone-pad"
              returnKeyType="next"
              errorStyle={{ color: 'red' }}
              errorMessage={this.displayPhoneError()}
              onChangeText={(text) => this.setState({phoneNumber: text, phoneError: false})}
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
              errorStyle={{ color: 'red' }}
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
