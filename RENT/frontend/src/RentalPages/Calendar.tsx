/*
Name: Login.tsx
Description: This file renders the login page and handles sign up and logging in
of user.
*/

import React, {Component} from 'react';
//import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import {Text, Alert, View, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';

import {Button, Icon, Image, Input, Overlay} from 'react-native-elements';
import Calendar from 'react-native-calendario';
import DatePicker from 'react-native-datepicker';
import styles from '../style/Calendar-Stylesheet';
import axios from 'axios';

// @ts-ignore
import configInfo from '../url';
import { eventNames } from 'cluster';
import { timingSafeEqual } from 'crypto';

const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});

interface IAppProps {
  navigation?: any;
}

interface IAppState {
  isLoading: boolean,
  isVisible: boolean,
  items: any[],
  formControls: {
    startDateTime: string,
    endDateTime: string,
    eventName: string,
    eventDesc: string,
  },
  displayCalendarEvents: boolean,

  calendarEvents: [],
}

export default class EventCalendar extends Component<IAppProps, IAppState> {
  [x: string]: any;

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      isVisible: false,
      items:[],
      formControls: {
        startDateTime: '',
        endDateTime: '',
        eventName: '',
        eventDesc: '',
      },
      displayCalendarEvents: false,
      
      calendarEvents: [],
    };

  }
  
  setDisplayCalendarEvents(value: boolean) {
    this.setState({
      displayCalendarEvents: value,
      isVisible: !value,
    })
  }
  
  setFormVisible(value: boolean) {
    this.setState({
      isVisible: value,
      displayCalendarEvents: !value,
    });
  }
  
  componentDidMount() {
    
    
    server.get('/getcalendarevents',{
      params: {
        rentalID: this.navigation.getParam("rentalID", "")
      }
    }).then(resp => {
      if(resp.status === 200) {

        this.setState({
          isLoading: false,
          calendarEvents: resp.data['events'],
        });

      }
    }).catch(err => {
      console.log(err)
    });
  }

  createNewCalendarEvent() {

    server.post('/addcalendarevent',{
      params: {
        rentalID: this.props.navigation.getParam("rentalID", 0),
        eventName: this.state.formControls['eventName'],
        eventDescription: this.state.formControls['eventDesc'],
        eventStartDT: this.state.formControls['startDateTime'],
        eventEndDT: this.state.formControls['endDateTime'],
      }
    }).then(resp => {
      if(resp.status === 200) {

        this.setState({
          isLoading: false,
          calendarEvents: resp.data['events'],
        });
      }
    }).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err)
    });
  }

  updateCalendarEvents(events: any) {
  }

  render() {

    if (this.state.isLoading) {
      return(
        <View style = {{backgroundColor:"#666666", flex: 1}}>
          <ScrollView style={{marginTop: 80, marginBottom: 40, marginHorizontal: 40,
              backgroundColor: "#FFFFFF", flex:1}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View>

          <Calendar
            onChange={() => {this.setDisplayCalendarEvents(true)}}
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
                color: 'red',
              },
              nonTouchableLastMonthDayTextStyle: {},
            }}
          />
          
          <Overlay
            isVisible={this.state.displayCalendarEvents}
            fullScreen={true}
          >
            <View>
              <Text>
                June 1, 2019
              </Text>
              <Button
                title="Add event"
                onPress={() => 
                  {
                    this.setFormVisible(true); 
                  }
                }
              >
              </Button>
            </View>
          </Overlay>

          <Overlay
            isVisible={this.state.isVisible}
            containerStyle={styles.addEventForm}
          >
            <ScrollView>
              <Text>Add Event</Text>

              <View
                style={styles.dateTimeGroup}
              >
                <View
                  style={styles.dateTimeTitle}
                >
                  <Text>Start date</Text>
                </View>

                <DatePicker
                  style={styles.dateTimeButton}
                  customStyles={{
                    dateTouchBody: {
                      borderColor: '#000',
                      borderRadius: 2,
                      borderWidth: 1,
                    },
                    dateInput: {
                      borderWidth: 0,
                    }
                  }}
                  date={this.state.formControls['startDate']}
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  mode='date'
                  placeholder='Start date'
                  showIcon={false}
                  onDateChange={(date: any) => {
                    const updatedControls = this.state.formControls;
                    updatedControls['startDate'] = date;
                    this.setState({
                      formControls: updatedControls,
                    });
                  }}
                  >
                </DatePicker>
                <DatePicker
                  style={styles.dateTimeButton}
                  customStyles={{
                    dateTouchBody: {
                      borderColor: '#000',
                      borderRadius: 2,
                      borderWidth: 1,
                    },
                    dateInput: {
                      borderWidth: 0,
                    }
                  }}
                  date={this.state.formControls['startTime']}
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  mode='time'
                  placeholder='Start time'
                  showIcon={false}
                  onDateChange={(date: any) => {
                    const updatedControls = this.state.formControls;
                    updatedControls['startTime'] = date;
                    this.setState({
                      formControls: updatedControls,
                    });
                  }}
                  >
                </DatePicker>
              </View>

              <View
                style={styles.dateTimeGroup}
              >
                <View
                  style={styles.dateTimeTitle}
                >
                <Text>End Date</Text>
                </View>

                <DatePicker
                  style={styles.dateTimeButton}
                  customStyles={{
                    dateTouchBody: {
                      borderColor: '#000',
                      borderRadius: 2,
                      borderWidth: 1,
                    },
                    dateInput: {
                      borderWidth: 0,
                    }
                  }}
                  date={this.state.formControls['endDate']}
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  mode='date'
                  placeholder='End date'
                  showIcon={false}
                  onDateChange={(date: any) => {
                    const updatedControls = this.state.formControls;
                    updatedControls['endDate'] = date;
                    this.setState({
                      formControls: updatedControls,
                    });
                  }}
                  >
                </DatePicker>
                <DatePicker
                  style={styles.dateTimeButton}
                  customStyles={{
                    dateTouchBody: {
                      borderColor: '#000',
                      borderRadius: 2,
                      borderWidth: 1,
                    },
                    dateInput: {
                      borderWidth: 0,
                    }
                    }
                  }
                  date={this.state.formControls['endTime']}
                  confirmBtnText='Confirm'
                  cancelBtnText='Cancel'
                  mode='time'
                  placeholder='End time'
                  showIcon={false}
                  onDateChange={(date: any) => {
                    const updatedControls = this.state.formControls;
                    updatedControls['endTime'] = date;
                    this.setState({
                      formControls: updatedControls,
                    });
                  }}
                  >
                </DatePicker>
              </View>
              
              <Input
                  placeholder="Event Name"
                  autoCorrect={true}
                  keyboardAppearance="light"
                  inputStyle={{marginTop:20}}
                  blurOnSubmit = {false}
                  onSubmitEditing = {() => {this.input1.focus()}}
                  returnKeyType="next"
                  onChangeText={(text) => {
                    const updatedControls = this.state.formControls;
                    updatedControls['eventName'] = text;
                    this.setState({
                      formControls: updatedControls,
                    });
                  }}
              />

              <Input
                  placeholder="Event Description"
                  multiline={true}
                  numberOfLines={8}
                  autoCorrect={true}
                  keyboardAppearance="light"
                  inputStyle={{marginTop:20}}
                  blurOnSubmit = {false}
                  returnKeyType="next"
              />
              
            </ScrollView>
            <Button
              title="Create"
              onPress={this.createNewCalendarEvent}
            ></Button>
          </Overlay>
          
        </View>
      );
    }
  }
}
