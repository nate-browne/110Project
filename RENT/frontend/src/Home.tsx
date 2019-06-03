import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Button,Input, Overlay, Text} from 'react-native-elements';
import axios from 'axios';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as EmailValidator from 'email-validator';
import DatePicker from 'react-native-datepicker'

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
  static navigationOptions = {
      headerLeft: null,
      headerBackTitle: "Rentals"
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
    start: "",
    end: "",
    rent: 0,
  };

  setVisible(visible: boolean) {
    this.setState({visible: visible});
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
    }).catch(err => {
        console.log('Error occurred',err);
    })
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

  render() {
    const userID = this.props.navigation.getParam("userID","NO-ID");
    let displayErr;
    let displayCurr;
    let displayPast;
    let button;
    if( this.state.currentID === 0) {
        displayErr = <Text> First time using RENT? Add a rental below and start managing your properties right away </Text>
    }
    else{
      if( this.state.currentID !== 0 && this.state.currentID !== null && this.state.currentID !== undefined ) {
        displayCurr = <Button raised={true} title="View Current Rental" onPress={() =>{ this.props.navigation.navigate('RentalMain',{
          userName: this.props.navigation.getParam("userName",""), //trying to get parameters from navigation
          userID: userID,
          rentalID: this.state.currentID
        })}} />
      }
      if( this.state.pastID !== 0 && this.state.pastID !== null && this.state.pastID !== undefined  ) {
        displayPast = <Button raised={true} title="View Past Rental" onPress={() =>{ this.props.navigation.navigate('RentalMain',{
          userName: this.props.navigation.getParam("userName",""),
          userID: userID,
          rentalID: this.state.pastID
        })}} />
      }
    }
    return(
      <View>
        {displayErr}
        {displayCurr}
        {displayPast}
        {button}
        <View>
          <Button
            raised={true}
            title="Add Rental"
            onPress={() =>{
              this.setVisible(true);
            }}
          />
          <Button
            raised={true}
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
                    ref = {(input) => {this.input2 = input}}
                    blurOnSubmit = {false}
                    onSubmitEditing = {() => {this.input3.focus()}}
                    onChangeText={(text: string) => this.setState({landlordLastName: text})}
                  />
                <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Landlord's email"
                      keyboardAppearance="light"
                      keyboardType="email-address"
                      returnKeyType="next"
                      ref = {(input) => {this.input7 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input8.focus()}}
                      onChangeText={(text: string) => this.setState({landlordEmail: text})}
                 />
                 <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Phone number"
                    keyboardAppearance="light"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    ref = {(input) => {this.input3 = input}}
                    blurOnSubmit = {false}
                    onSubmitEditing = {() => {this.input4.focus()}}
                    onChangeText={(text: string) => this.setState({phoneNumber: text})}
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
                      ref = {(input) => {this.input6 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input7.focus()}}
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
                    } else {
                      this.createRental(userID);
                      this.setVisible(false);
                    }
                  }}
                />
              </View>
          </KeyboardAwareScrollView>
        </Overlay>

      </View>
    )
  }
}
