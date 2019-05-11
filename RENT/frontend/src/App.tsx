import React, {Component} from 'react';
import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import { TextInput, Modal, Text, View, Alert, Image, ImageBackground } from 'react-native';
import {Button } from 'react-native-elements';

import sjcl from 'sjcl';
import axios from 'axios';

const serverURL = 'http://localhost:5000' // I think this is the default flask one
const server = axios.create({
  baseURL: serverURL
});

type Props = {};
export default class App extends Component<Props> {
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
      <Modal
        animationType="fade"
        visible={this.state.loginVisible}
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
      </Modal>

      <Modal
        animationType="fade"
        visible={this.state.signupVisible}
        >
        <View style={styles.container}>
            <Text style={{fontSize: 48}}>Signup Here</Text>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="First Name"
                onChangeText={(text: string) => this.setState({firstName: text})}
              />
            </View>

            <View style={styles.textbox}>
              <TextInput
                style={styles.textinput}
                placeholder="Last Name"
                onChangeText={(text: string) => this.setState({lastName: text})}
              />
            </View>

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
                onChangeText={(text: string) => this.setState({password: sjcl.hash.sha256.hash(text)})}
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
                    // redirect user to different page
                  }).catch(err => {
                    // catch errors such as user logged in, account already exists, etc
                  });
                }}
              />
            </View>
        </View>
        </Modal>


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

    </ImageBackground>
    );
  }
}
