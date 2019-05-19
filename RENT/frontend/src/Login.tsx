  /*
  Name: Login.tsx
  Description: This file renders the login page and handles sign up and logging in
  of user.
*/

import React, {Component} from 'react';
import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import { Alert, View } from 'react-native';
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
    loginVisible: false,
    signupVisible: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailError: false,
    passwordError: false
  };

  setLoginVisible(visible: boolean) {
    this.setState({loginVisible: visible});
  }

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

  createUser(): any {
    server.post('/createuser', {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password
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
        this.setLoginVisible(false);
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
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
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
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
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
                raised={false}
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
        onBackdropPress={() => this.setState({ signupVisible: false, passwordError: false, emailError: false })}
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

/*<ImageBackground source={{uri: 'https://i.pinimg.com/originals/8c/af/9e/8caf9e448b13665f7922b97ce8cadd3b.jpg'}} style={styles.background}>
        <Image
            style={styles.imageIcon}
            source={require('../assets/rent_final.png')}
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
                  onPress={() => {this.login()}}
                />
              </View>
          </View>
        </Overlay>
        <Overlay
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          isVisible={this.state.signupVisible}
          onBackdropPress={() => this.setState({ signupVisible: false, passwordError: false, emailError: false })}
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
                errorStyle={{ color: 'red' }}
                errorMessage={this.displayEmailError()}
                leftIcon={
                  <Icon name="email-outline" type="material-community" color="black" size={25} />
                }
                onChangeText={(text) => this.setState({email: text, emailError: false})}
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
              <Input
                inputContainerStyle={styles.textinput}
                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                placeholder="Confirm Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardAppearance="light"
                returnKeyType="done"
                errorStyle={{ color: 'red' }}
                errorMessage={this.displayPasswordError()}
                secureTextEntry={true}
                leftIcon={<Icon name="lock" type="simple-line-icon" color="black" size={25} />}
                onChangeText={(text) => this.setState({confirmPassword: text, passwordError: false})}
              />

              <View style={styles.button}>
                <Button
                  raised={true}
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
      </ImageBackground>*/
