/*
Name: Login.tsx
Description: This file renders the login page and handles sign up and logging in
of user.
*/

import React, {Component} from 'react';
//import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import { Text, Alert, View, ScrollView } from 'react-native';
import {Button, Icon, Image, Input, Overlay} from 'react-native-elements';
import Calendar from 'react-native-calendario';

import axios from 'axios';

// @ts-ignore
import configInfo from './url';

export default class Login extends Component {

  state = {
    editVisible: false,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",

    e1FirstName: "",
    e1LastName: "",
    e1Phone: "",

    e2FirstName: "",
    e2LastName: "",
    e2Phone: "",
  };

  setEditVisible(visible: boolean) {
    this.setState({editVisible: visible});
  }

render() {
  return (
    <View>
      <Calendar
        onChange={() => {this.setEditVisible(true)}}
        minDate="2018-04-20"
        startDate="2018-04-30"
        endDate="2018-05-05"
        theme={{
          activeDayColor: {},
          monthTitleTextStyle: {
            color: '#6d95da',
            fontWeight: '300',
            fontSize: 16,
          },
          emptyMonthContainerStyle: {},
          emptyMonthTextStyle: {
            fontWeight: '200',
          },
          weekColumnsContainerStyle: {},
          weekColumnStyle: {
            paddingVertical: 10,
          },
          weekColumnTextStyle: {
            color: '#b6c1cd',
            fontSize: 13,
          },
          nonTouchableDayContainerStyle: {},
          nonTouchableDayTextStyle: {},
          startDateContainerStyle: {},
          endDateContainerStyle: {},
          dayContainerStyle: {},
          dayTextStyle: {
            color: '#2d4150',
            fontWeight: '200',
            fontSize: 15,
          },
          dayOutOfRangeContainerStyle: {},
          dayOutOfRangeTextStyle: {},
          todayContainerStyle: {},
          todayTextStyle: {
            color: '#6d95da',
          },
          activeDayContainerStyle: {
            backgroundColor: '#6d95da',
          },
          activeDayTextStyle: {
            color: 'white',
          },
          nonTouchableLastMonthDayTextStyle: {},
        }}
    />
    <Overlay
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      isVisible={this.state.editVisible}
      onBackdropPress={() => this.setState({ editVisible: false })}
      >

      <ScrollView>
          <Text style={{fontSize: 48}}>Add Event</Text>

          <Input
              //inputContainerStyle={styles.textinput}
              leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
              placeholder="Event Name"
              autoCorrect={false}
              keyboardAppearance="light"
              leftIcon={
                <Icon name="account" type="material-community" color="black" size={25} />
              }
              blurOnSubmit = {false}
              onSubmitEditing = {() => {this.input1.focus()}}
              returnKeyType="next"
              onChangeText={(text: string) => this.setState({firstName: text})}
          />
          <Input
              //inputContainerStyle={styles.textinput}
              leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
              placeholder="Location (Kitchen, Living Room, ...)"
              autoCorrect={false}
              keyboardAppearance="light"
              leftIcon={
                <Icon name="account" type="material-community" color="black" size={25} />
              }
              ref = {(input) => {this.input1 = input}}
              blurOnSubmit = {false}
              onSubmitEditing = {() => {this.input2.focus()}}
              returnKeyType="next"
              onChangeText={(text: string) => this.setState({firstName: text})}
          />
          <Input
              //inputContainerStyle={styles.textinput}
              leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
              placeholder="Start Time"
              autoCorrect={false}
              keyboardAppearance="light"
              leftIcon={
                <Icon name="account" type="material-community" color="black" size={25} />
              }
              ref = {(input) => {this.input2 = input}}
              blurOnSubmit = {false}
              onSubmitEditing = {() => {this.input3.focus()}}
              returnKeyType="next"
              onChangeText={(text: string) => this.setState({firstName: text})}
          />
          <Input
              //inputContainerStyle={styles.textinput}
              leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
              placeholder="End Time"
              autoCorrect={false}
              keyboardAppearance="light"
              leftIcon={
                <Icon name="account" type="material-community" color="black" size={25} />
              }
              ref = {(input) => {this.input3 = input}}
              blurOnSubmit = {false}
              returnKeyType="next"
              onChangeText={(text: string) => this.setState({firstName: text})}
          />
        </ScrollView>

    </Overlay>
  </View>
  )
}
}
