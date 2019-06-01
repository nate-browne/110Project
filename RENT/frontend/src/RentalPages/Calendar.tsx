/*
Name: Login.tsx
Description: This file renders the login page and handles sign up and logging in
of user.
*/

import React, {Component} from 'react';
//import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import {Text, Alert, View, ScrollView, TouchableOpacity} from 'react-native';

import {Button, Icon, Image, Input, Overlay} from 'react-native-elements';
import Calendar from 'react-native-calendario';

import axios from 'axios';

// @ts-ignore
import configInfo from './url';
import { eventNames } from 'cluster';

const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});

interface IAppProps {
  navigation?: any;
}

interface IAppState {
  isLoading: boolean,
  editVisible: boolean,
  items: any[],
  formControls: {},
}

export default class EventCalendar extends Component<IAppProps, IAppState> {
  [x: string]: any;

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      editVisible: false,
      items:[],
      formControls: {},
    };
  }

  componentDidMount() {
    server.get('/getinfo',{
      params: {
        userID: this.props.navigation.getParam("userID", 0)
      }
    }).then(resp => {
      if(resp.status === 200) {

        // update calendar information with stuff from get request
      }
    }).catch(err => {
      console.log(err)
    });
  }

  createNewCalendarEvent() {
  }

  changeHandler = (event: any) => {

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        [name]: value,
      }
    });
  }

  render() {

    if (this.state.isLoading) {

    } else {

    }

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
            <Text style={{fontSize: 48, marginTop:30, marginLeft:20}}>Add Event</Text>

            <Input
                //inputContainerStyle={styles.textinput}
                leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                placeholder="Event Name"
                autoCorrect={false}
                keyboardAppearance="light"
                inputStyle={{marginTop:20}}
                blurOnSubmit = {false}
                onSubmitEditing = {() => {this.input1.focus()}}
                returnKeyType="next"
                onChangeText={(text: string) => this.setState({firstName: text})}
            />
            <Input
              //inputContainerStyle={styles.textinput}
              leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
              placeholder="Location"
              autoCorrect={false}
              keyboardAppearance="light"
              ref = {(input) => {this.input1 = input}}

              inputStyle={{marginTop:20}}
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

                inputStyle={{marginTop:20}}
                keyboardAppearance="light"
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

                inputStyle={{marginTop:20}}
                keyboardAppearance="light"
                ref = {(input) => {this.input3 = input}}
                blurOnSubmit = {false}
                returnKeyType="next"
                onChangeText={(text: string) => this.setState({firstName: text})}
            />
            <TouchableOpacity onPress={ () => Alert.alert("Edit stuff")}>
                <Text style={{color:"#333333", textDecorationLine: "underline", textAlign:"right", marginTop: 50, marginRight:20, fontSize:20, fontWeight:"200"}}>Done</Text>
            </TouchableOpacity>
          </ScrollView>
        </Overlay>
      </View>
    );
  }
}
