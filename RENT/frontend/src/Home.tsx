import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native';
import { Button,Input, Icon, Overlay, Text, Image } from 'react-native-elements';
import axios from 'axios';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as EmailValidator from 'email-validator';
import DatePicker from 'react-native-datepicker'
import styles from './style/Home-Stylesheet';


var dismissKeyboard = require('dismissKeyboard');

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

export default class Home extends Component<IAppProps, IAppState> {
  [x: string]: any;
  static navigationOptions = ({ navigation }) => {
      return {
      headerLeft: null,
      headerBackTitle: "Rentals",
      title: "Welcome back, " + navigation.getParam('userName', '') + "!",
      headerStyle: {
        backgroundColor: '#2bc0cd',
      },
      headerRight:  <TouchableOpacity
          style={{
            alignItems:'center',
            justifyContent:'center',
            width:45,
            height:45,
            backgroundColor:'#fff',
            borderRadius:40,
            marginTop: 2,
            marginBottom: 3,
            marginLeft:2,
            marginRight: 10
          }} onPress={ () => navigation.push('Profile', {
            userID: navigation.getParam("userID",""),
            userName: navigation.getParam("userName",""),
            canEdit: true
          })}
      >
        <Icon name={"face"}  size={30}  />
      </TouchableOpacity>
    };
  };
  state = {
    visible: false,
    formError: false,
    currentID: 0,
    pastID: 0,
    name: "",
    address: "",
    landlordFirstName: "",
    landlordLastName:"",
    landlordEmail:"",
    phoneNumber: "",
    emailError: false,
    phoneError: false,
    start: "",
    end: "",
    rent: 0,

    currentAddress: "",
    pastAddress: "",

    isLoading: true,
  };
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
  setVisible(visible: boolean) {
    this.setState({visible: visible});
  }

  getCurrentLeaseInfo = () => {
    
  }
  
  getPastLeaseInfo = () => {
    
  }

  componentDidMount() {
    const userID = this.props.navigation.getParam("userID","NO-ID");
    server.get('/getrentalIDs', {
      params: {
        userID: userID
      }
    }).then(resp => {
        if (resp.data['currentRental'] !== undefined || resp.data['currentRental'] !== null) {
          this.setState({currentID: resp.data['currentRental']})
        }
        else{
            this.setState({currentID: 0})
        }
        if (resp.data['pastRental'] !== undefined || resp.data['pastRental'] !== null) {
          this.setState({pastID: resp.data['pastRental']})
        }
        else{
            this.setState({pastID: 0})
        }
        console.log('mount')
        console.log('currentID: ', this.state.currentID);
        console.log('pastID: ', this.state.pastID);
    }).then(resp => {

      server.get('/getleaseinfo', {
        params: {
          rentalID: this.state.currentID
        }
      }).then(resp => {
        this.setState({
          currentAddress: resp.data['address']
        })
      }).catch(err => {
        console.log(err);
      }).then( resp => {
        server.get('/getleaseinfo', {
          params: {
            rentalID: this.state.pastID
          }
        }).then(resp => {
          this.setState({
            pastAddress: resp.data['address']
          })
        }).catch(err => {
          console.log(err);
        });
      }).then( resp => {
        this.setState({
          isLoading: false
        })
      });
      
    }).catch(err => {
        console.log('Error occurred',err);
    });

    var day = new Date().getDate(); //Current Date
    var day2 = new Date().getDate() + 1; //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    this.setState({
      //Setting the value of the date time
      start: year + '-' + month + '-' + day,
      end: year + '-' + month + '-' + day2
    });
  }

  createRental(userID: any): void{
    server.post('/createrental', {
      address: this.state.address,
      userID: userID
    }).then(resp => {
        if(resp.status == 201) {
            this.setState({currentID: resp.data['currentRental']});
            this.setState({pastID: resp.data['pastRental']});
            console.log('create');
            console.log('currentID: ', this.state.currentID);
            console.log('pastID: ', this.state.pastID);
            this.createLease(resp.data['currentRental']);
        }
    }).catch (err => {
        console.log('Error', err);
    })
  }
  createLease( rentalID: any): void {
    server.post('/addlease', {
      rentalID: rentalID,
      landlordFirstName: this.state.landlordFirstName,
      landlordLastName: this.state.landlordLastName,
      landlordPhoneNumber: this.state.phoneNumber,
      landlordEmail: this.state.landlordEmail,
      rentCost: this.state.rent,
      startDT: this.state.start,
      endDT: this.state.end,
      rentDueDate: ""
    }).then(resp => {}).catch(err =>{})
  }
  logout(): any {
    server.post('/logout', {
    }).then(resp => {
      //login successful
      if(resp.status === 200) {
        this.props.navigation.navigate('Login',{
        })
        console.log("Logout Successful");
      }
      //login failed
      else if (resp.status === 400) {
        console.log("Login Failed");
      }
    })
    .catch(err => {
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
            phoneNumber: number,
            phoneError: false
        });

        return;
    }

    this.setState({
        phoneNumber: text,
        phoneError: false
    });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style = {{backgroundColor:"#f6f7f8", flex: 1}}>
          <ScrollView style={{marginTop: 80, marginBottom: 40, marginHorizontal: 40,
              backgroundColor: "#f6f7f8", flex:1}}>
            <ActivityIndicator size="large" color="#2bc0cd" />
          </ScrollView>
        </View>
      );

    } else {

      const userID = this.props.navigation.getParam("userID","NO-ID");
      let displayErr;
      let displayCurr;
      let displayPast;
      let button;
      let currentText;
      let pastText;
      if( this.state.currentID === null) {
          displayErr = <Text style={{fontSize:24, textAlign:"center"}}>First time using RENT? Add a rental below and start managing your properties right away! </Text>
      }
      else{
        if( this.state.currentID !== 0 && this.state.currentID !== null && this.state.currentID !== undefined ) {

          currentText = (
          <Text
            style={{fontSize: 14, color:'#bababa', opacity:80, alignSelf:'center', marginTop:20}}
          >Current Rentals
          </Text>
          );

          displayCurr = (
            <TouchableHighlight 
            underlayColor='#2bc0cd'
            activeOpacity={0.90}
            style={styles.cardColorBox}
            onPress={() => { 
              this.props.navigation.navigate('RentalMain',{
                userName: this.props.navigation.getParam("userName",""), //trying to get parameters from navigation
                userID: userID,
                rentalID: this.state.currentID,
                address: this.state.currentAddress
              })
            }}
            >
              <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignSelf: 'flex-end', borderBottomRightRadius:5, borderBottomLeftRadius:5 }}>
                <Text style={{ color: 'white', fontSize: 16, margin: 20 }}>{this.state.currentAddress}</Text>
              </View>
            </TouchableHighlight>
            );
        }
        if( this.state.pastID !== 0 && this.state.pastID !== null && this.state.pastID !== undefined  ) {

          pastText = (
            <Text
              style={{fontSize: 14, color:'#bababa', opacity:80, alignSelf:'center',}}
            >Past Rentals
            </Text>
          );

          displayPast = (
            <TouchableHighlight 
            underlayColor='#2bc0cd'
            activeOpacity={0.90}
            style={styles.cardColorBoxAlternate}
            onPress={() => { 
              this.props.navigation.navigate('RentalMain',{
                userName: this.props.navigation.getParam("userName",""), //trying to get parameters from navigation
                userID: userID,
                rentalID: this.state.pastID,
                address: this.state.pastAddress
              })
            }}
            >
              <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignSelf: 'flex-end', borderBottomRightRadius:5, borderBottomLeftRadius:5 }}>
                <Text style={{ color: 'white', fontSize: 16, margin: 20 }}>{this.state.pastAddress}</Text>
              </View>
            </TouchableHighlight>
            );
        }
      }

      return(
        <ScrollView 
          style={{ display: 'flex', flexDirection: 'column'}}
          contentContainerStyle={{justifyContent:'center', alignContent:'center', backgroundColor:'#f6f7f8'}}
        >
          {displayErr}
          {currentText}
          {displayCurr}
          {pastText}
          {displayPast}
          {button}
          <View style={styles.buttonBar}>
            
            <Button
              containerStyle={styles.buttonBarElement}
              buttonStyle={{backgroundColor:'#2bc0cd'}}
              raised={false}
              title="Add Rental"
              onPress={() =>{
                this.setVisible(true);
              }}
            />
            <Button
              containerStyle={styles.buttonBarElement}
              buttonStyle={{backgroundColor:'#2bc0cd'}}
              raised={false}
              title="Logout"
              onPress={() =>{
                this.logout();
              }}
            />
          </View>

          <Overlay
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            isVisible={this.state.visible}
            onBackdropPress={() => this.setState({ visible: false })}
            fullScreen={false}
            >
            <KeyboardAwareScrollView>
                <View>
                  <Text style={{fontSize: 24}}>Create New Rental</Text>

                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Enter a name for your rental"
                      keyboardAppearance="light"
                      returnKeyType="next"
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input1.focus()}}
                      onChangeText={(text: string) => this.setState({name: text})}
                    />
                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Address"
                      keyboardAppearance="light"
                      returnKeyType="next"
                      ref = {(input) => {this.input1 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input2.focus()}}
                      onChangeText={(text: string) => this.setState({address: text})}
                    />

                  <Text style={{fontSize: 24}}>Landlord Information</Text>


                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Landlord's First name"
                      keyboardAppearance="light"
                      returnKeyType="next"
                      ref = {(input) => {this.input2 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input3.focus()}}
                      onChangeText={(text: string) => this.setState({landlordFirstName: text})}
                    />
                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Landlord's Last name"
                      keyboardAppearance="light"
                      returnKeyType="next"
                      ref = {(input) => {this.input3 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input4.focus()}}
                      onChangeText={(text: string) => this.setState({landlordLastName: text})}
                    />
                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Landlord's email"
                      keyboardAppearance="light"
                      keyboardType="email-address"
                      returnKeyType="next"
                      ref = {(input) => {this.input4 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input5.focus()}}
                      errorStyle={{ color: 'red', alignSelf: "center" }}
                      errorMessage={this.displayEmailError()}
                      onChangeText={(text: string) => this.setState({landlordEmail: text, emailError:false})}
                  />
                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      value={this.state.phoneNumber}
                      placeholder="Phone number"
                      keyboardAppearance="light"
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      ref = {(input) => {this.input5 = input}}
                      blurOnSubmit = {false}
                      textContentType='telephoneNumber'
                      dataDetectorTypes='phoneNumber'
                      maxLength={14}
                      errorStyle={{ color: 'red', alignSelf: "center" }}
                      errorMessage={this.displayPhoneError()}
                      onChangeText={(text) => this.onTextChange(text)}
                    />

                    <Text style={{fontSize: 24}}>Leasing Information</Text>
                    <Text style={{fontSize: 18}}>Start Date</Text>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.start}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        onDateChange={(date: any) => {this.setState({start: date})}}
                    />
                    <Text style={{fontSize: 18}}>End Date</Text>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.end}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        onDateChange={(date: any) => {this.setState({end: date})}}
                    />
                    <Input
                        //inputContainerStyle={styles.textinput}
                        leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                        placeholder="Rent per month"
                        keyboardAppearance="light"
                        keyboardType="numeric"
                        returnKeyType="next"
                        blurOnSubmit = {false}
                        onChangeText={(text: string) => this.setState({rent: text})}
                    />
                  </View>
                <View>
                  <Button
                    raised={true}
                    style = {{margin: 20}}
                    title="Create"
                    onPress={() => {
                      if(this.state.name === "" || this.state.address === "" || this.state.landlordFirstName === ""
                        || this.state.landlordLastName === "" || this.state.landlordEmail === ""
                        || this.state.phoneNumber === "" || this.state.start === "" || this.state.end === "" || this.state.rent === 0) {
                          this.setState({formError:true})
                          Alert.alert("Please complete all the fields")
                      }
                      else if( !EmailValidator.validate(this.state.landlordEmail) ) {
                        this.setState({emailError: true})
                      }
                      else if( this.state.phoneNumber.length !== 14) {
                        this.setState({phoneError: true})
                      }
                      else {
                        this.createRental(userID);
                        this.setVisible(false);
                      }
                    }}
                  />
                </View>
            </KeyboardAwareScrollView>
          </Overlay>

        </ScrollView>
      ) 
    }
  }
}
