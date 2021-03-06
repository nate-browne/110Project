/*
  Name: Login.tsx
  Description: This file renders the login page and handles sign up and logging in
  of user..
*/
// Library Imports
import React, {Component} from 'react';
import styles from './style/App-Stylesheet';
import { Alert, ScrollView, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {Button , Image, Input, Overlay, CheckBox, Icon} from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import * as EmailValidator from 'email-validator';
import axios from 'axios';

// @ts-ignore
import configInfo from './url';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});

// Used to get rid of keyboard
var dismissKeyboard = require('dismissKeyboard');

// Thing needed for navigation
interface IAppProps {
  navigation?: any;
}

// Yep
interface IAppState {
}


export default class Login extends Component<IAppProps, IAppState> {
  [x: string]: any;
  // This contains styling for the navigation
  static navigationOptions = {
    headerTransparent: true,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  // The state dict holds all locally stored info for access later
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    created: false,

    firstError: false,
    lastError: false,
    phoneError: false,
    emailError: false,
    passwordError: false,
    passwordLengthError: false,

    loginError: false,
    signupError: false,

    isRemembered: false,

    signupVisible: false,
    forgotVisible: false,
  };

  resetNavigation(targetRoute: string) {
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  toggleIsRemembered() {
    this.setState({isRemembered: !this.state.isRemembered});
  }

  displayFirstError() : string {
    if(this.state.firstError) {
      return "Please enter your first name"
    }
    return ""
  }
  displayLastError() : string {
    if(this.state.lastError) {
      return "Pleas enter your last name"
    }
    return ""
  }
  /* Displaying Error messages here */
  displayEmailError(): string {
    if(this.state.emailError) {
      return "Please enter a valid email";
    }
    return "";
  }
  displayPhoneError(): string {
    if (this.state.phoneError) {
      return "Please enter a valid phone number";
    }
    return "";
  }
  displayPasswordError(): string {
  if(this.state.passwordError) {
    return "Passwords did not match"
  } else if (this.state.passwordLengthError === true) {
    return "Password must contain at least 5 characters"
  }
  return "";
  }

  displayLoginError(): string {
    if(this.state.loginError) {
      return "Username or Password incorrect";
    }
    return "";
  }
  displaySignupError(): string {
    if(this.state.signupError) {
      return "Account with above email exists. Please sign in.";
    }
    return "";
  }

  /* POST requests start here */
  createUser(): any {
    server.post('/createuser', {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
    }).then(resp => {
      if(resp.status === 201) {
        console.log("Account created");
        this.setState({signupVisible: false, created:true});
      }
    }).catch(err => {
      this.setState({signupError: true})
      console.log('Error occurred',err);
    });
  }

  login(): any {
    if(this.state.email === "" || this.state.password === "") {
      this.setState({loginError: true})
    } else {
      server.post('/login', {
        email: this.state.email,
        password: this.state.password,
        remember: this.state.isRemembered ? 'true' : 'false',
      }).then(resp => {
        // Success
        if(resp.status === 200) {
          this.props.navigation.navigate('Home',{
            userName: resp.data.firstName,
            userID: resp.data.userID,
            loggedIn: resp.data.loggedIn
          })
          console.log("Login Successful");
        }
        this.setState({
                        firstError: false,
                        lastError: false,
                        signupVisible: false,
                        passwordError: false,
                        emailError: false,
                        phoneError: false,
                        signupError: false,
                        passwordLengthError: false,
                        created:false })
      })
      .catch(err => {
        this.setState({loginError: true})
        console.log('Error occurred',err);
      })
    }
  }

  forgotPassword(): any {
    console.log(serverURL)
    server.post('/forgotpassword', {
      email: this.state.email,
    }).then(resp => {
      //forgot password is successful
      if(resp.status === 200) {
        Alert.alert('Temporary password sent to: ' + this.state.email)
        console.log("Forgot password email sent");
      }
    })
    .catch(err => {
      Alert.alert('Invalid email');
      console.log('Error occurred',err);
    })
  }
  onTextChange(text: string) {
    var cleaned = ('' + text).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : ''),
            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

        this.setState({
            phoneNumber: number
        });

        return;
    }

    this.setState({
        phoneNumber: text,
        phoneError: false
    });
  }

  render() {
    let displayCreated
    if( this.state.created ) {
      displayCreated = <Text style={{color: 'green'}}> (User Created successfully) </Text>
    }
    return (
      <TouchableWithoutFeedback onPress = {dismissKeyboard}>
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
            onSubmitEditing={() => {this.nextInput.focus();}}
            blurOnSubmit = {false}
            onChangeText={(text: string) => this.setState({email: text, loginError: false})}
            />

          <Input
            inputContainerStyle={styles.textinput}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="light"
            returnKeyType="done"
            ref = {(input) => {this.nextInput = input;}}
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
          onPress={() => {this.login()} }
          />
      </View>
      {displayCreated}
      <CheckBox
        center title="Remember me"
        checked={this.state.isRemembered}
        containerStyle={styles.clearCheckbox}
        textStyle={styles.checkboxText}
        onPress={() => {this.setState({isRemembered: !this.state.isRemembered})}}
        />

      <View style={styles.serviceBar}>
        <View style={styles.button}>
          <Button
            raised={true}
            type="clear"
            title="Forgot password?"
            titleStyle={styles.linkText}
            onPress={() => {
              this.setState({forgotVisible: true, created:false });
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            raised={true}
            type={"clear"}
            title="Register"
            onPress={() => {
              this.setState({signupVisible: true, created:false });
            }}
            titleStyle={styles.linkText}
          />
        </View>
      </View>

      <Overlay
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        isVisible={this.state.forgotVisible}
        onBackdropPress={() => this.setState({ forgotVisible: false })}
        height={'50%'}
        >
        <TouchableWithoutFeedback onPress = {dismissKeyboard}>
        <KeyboardAwareScrollView>
          <View>
          <Text style={{fontSize: 48}}>Forgot password</Text>
          <Input
              //inputContainerStyle={styles.textinput}
              leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
              placeholder="email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              keyboardAppearance="light"
              leftIcon={
                <Icon name="email" type="material-community" color="black" size={25} />
              }
              returnKeyType="done"
              onSubmitEditing = {() => {this.setState({ addVisible: false }); this.forgotPassword();}}
              onChangeText={(text: string) => this.setState({email: text})}
          />
          <Button
            title="Send recovery email"
            buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
            onPress={() => {
              this.setState({ addVisible: false });
              this.forgotPassword();
              }
            }
          />
          </View>
        </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </Overlay>

        <Overlay
        isVisible={this.state.signupVisible}
        onBackdropPress={() => this.setState({
                                      firstError: false,
                                      lastError: false,
                                      signupVisible: false,
                                      passwordError: false,
                                      emailError: false,
                                      phoneError: false,
                                      signupError: false,
                                      passwordLengthError: false })}
        containerStyle={styles.container}
        >
        <TouchableWithoutFeedback onPress = {dismissKeyboard}>
        <View style={styles.container}>
          <Input
            inputContainerStyle={styles.textinput}
            placeholder="First Name"
            autoCapitalize="words"
            autoCorrect={false}
            keyboardAppearance="light"
            returnKeyType="next"
            blurOnSubmit = {false}
            errorStyle={{ color: 'red', alignSelf: "center" }}
            errorMessage={this.displayFirstError()}
            onSubmitEditing = {() => {this.input1.focus()}}
            onChangeText={(text) => this.setState({firstName: text, firstError:false})}
          />

          <Input
            inputContainerStyle={styles.textinput}
            placeholder="Last Name"
            autoCapitalize="words"
            autoCorrect={false}
            keyboardAppearance="light"
            returnKeyType="next"
            ref = {(input) => {this.input1 = input}}
            blurOnSubmit = {false}
            errorStyle={{ color: 'red', alignSelf: "center" }}
            errorMessage={this.displayLastError()}
            onSubmitEditing = {() => {this.input2.focus()}}
            onChangeText={(text) => this.setState({lastName: text, lastError: false})}
          />

          <Input
            inputContainerStyle={styles.textinput}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="light"
            keyboardType="email-address"
            returnKeyType="next"
            ref = {(input) => {this.input2 = input}}
            blurOnSubmit = {false}
            onSubmitEditing = {() => {this.input3.focus()}}
            errorStyle={{ color: 'red', alignSelf: "center" }}
            errorMessage={this.displayEmailError() + this.displaySignupError()}
            onChangeText={(text) => this.setState({email: text, emailError: false, signupError: false})}
          />

          <Input
            inputContainerStyle={styles.textinput}
            placeholder="(###) ### ####"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="light"
            keyboardType="phone-pad"
            returnKeyType="next"
            value={this.state.phoneNumber}
            ref = {(input) => {this.input3 = input}}
            blurOnSubmit = {false}
            onSubmitEditing = {() => {this.input4.focus()}}
            errorStyle={{ color: 'red', alignSelf: "center" }}
            errorMessage={this.displayPhoneError()}
            textContentType='telephoneNumber'
            dataDetectorTypes='phoneNumber'
            maxLength={14}
            onChangeText={(text) => this.onTextChange(text)}
          />

          <Input
            inputContainerStyle={styles.textinput}
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="light"
            returnKeyType="next"
            ref = {(input) => {this.input4 = input}}
            blurOnSubmit = {false}
            onSubmitEditing = {() => {this.input5.focus()}}
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
            ref = {(input) => {this.input5 = input}}
            blurOnSubmit = {false}
            onSubmitEditing = {() => Keyboard.dismiss()}
            errorStyle={{ color: 'red', alignSelf: "center" }}
            errorMessage={this.displayPasswordError()}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({confirmPassword: text, passwordError: false, passwordLengthError: false})}
          />

          <View style={styles.button}>
            <Button
              buttonStyle={{backgroundColor:"#2bc0cd"}}
              raised={false}
              title="Sign Up"

              onPress={() => {
                if(this.state.firstName === "") {
                  this.setState({firstError: true})
                }
                if(this.state.lastName === "") {
                  this.setState({lastError: true})
                }
                if(this.state.email === "") {
                  this.setState({emailError: true})
                }
                if(this.state.phoneNumber === "" || this.state.phoneNumber.length < 14) {
                  this.setState({phoneError: true})
                }
                if( !EmailValidator.validate(this.state.email) ) {
                  this.setState({emailError: true})
                }
                else if( this.state.password !== this.state.confirmPassword) {
                  this.setState({passwordError:true})
                }
                else if( this.state.password.length <= 4 ) {
                  this.setState({passwordLengthError:true})
                }
                else {
                  this.createUser();
                }
              }}
            />
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Overlay>
    </View>
    </TouchableWithoutFeedback>
    );
  }
}
