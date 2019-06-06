/*
Name: Login.tsx
Description: This file renders the login page and handles sign up and logging in
of user.
*/

import React, {Component} from 'react';
//import styles from './style/App-Stylesheet'; // This is how you can import stuff from other folders
import {Text, Alert, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';

import {Button, Icon, Image, Input, Overlay, ListItem} from 'react-native-elements';
import Calendar from 'react-native-calendario';
import DatePicker from 'react-native-datepicker';
import styles from '../style/Calendar-Stylesheet';
import axios from 'axios';

// @ts-ignore
import configInfo from '../url';
import { any } from 'prop-types';

const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});

interface IAppProps {
  navigation?:any,
}

interface IAppState {
  isLoading: boolean,
  isVisible: boolean,
  items: any[],

  formControls: {
    eventName: string,
    eventDesc: string,

    startDate: string,
    startTime: string,

    endDate: string,
    endTime: string,
  },

  displayCalendarEvents: boolean,

  calendarEvents: any[],
  currentDayCalendarEvents: any[],
  selectedDate: string,
}

export default class EventCalendar extends Component<IAppProps, IAppState> {
  [x: string]: any;

  constructor(props: any){
    super(props);

    this.state = {
      isLoading: true,
      isVisible: false,
      items:[],
      formControls: {
        eventName: '',
        eventDesc: '',

        startDate: '',
        startTime: '',

        endDate: '',
        endTime: '',
      },
      displayCalendarEvents: false,

      calendarEvents: [],
      currentDayCalendarEvents: [],
      selectedDate: '',
    };

  }

  setDisplayCalendarEvents = (value: boolean, date: any) => {

    //console.log("date formats as " + date.slice(0,10));
    const formattedDate = date.slice(0,10);

    this.setState({
      selectedDate: formattedDate,
      currentDayCalendarEvents: this.getCurrentDayCalendarEvents(formattedDate),
      isVisible: !value,
      displayCalendarEvents: value,
    });
  }

  setEventsVisible = (value: boolean) => {
    this.setState({
      displayCalendarEvents: value
    });
  }

  setFormVisible = (value: boolean) => {
    this.setState({
      isVisible: value,
      displayCalendarEvents: !value,
    });
  }

  getCurrentDayCalendarEvents = (date: string) => {
    const calendarEvents = this.state.calendarEvents;
    const currentDayCalendarEvents :any[] = [];

    let isWithinLeftBound = false;
    let isWithinRightBound = false;

    calendarEvents.forEach(element => {

      var sDate = new Date(element.eventStartDate);
      var mDate = new Date(date);
      var eDate = new Date(element.eventEndDate);

      if (sDate <= mDate && mDate <= eDate) {
        isWithinLeftBound=true;
        isWithinRightBound=true;
      }

      if (isWithinLeftBound && isWithinRightBound) {
        currentDayCalendarEvents.push(element);
      }

      isWithinLeftBound = false;
      isWithinRightBound = false;

    });

    return currentDayCalendarEvents;
  }

  updateCurrentDayCalendarEvents = (events: any) => {
    
    const currentDayCalendarEvents = this.state.currentDayCalendarEvents;
    currentDayCalendarEvents.push(events[0]);


    this.setState({
      currentDayCalendarEvents: currentDayCalendarEvents,
    });

  }

  keyExtractor = (item:any) => item.eventID.toString();

  getEvents = () => {
    server.get('/getcalendarevents',{
      params: {
        rentalID: this.props.navigation.getParam("rentalID", ""),
      }
    }).then(resp => {
      if(resp.status === 200) {
        this.updateCalendarEvents(resp.data['events']);
      }
    }).catch(err => {
      console.log(err)
    });
  }


  componentDidMount() {
    server.get('/getcalendarevents',{
      params: {
        rentalID: this.props.navigation.getParam("rentalID", ""),
      }
    }).then(resp => {
      if(resp.status === 200) {
        this.updateCalendarEvents(resp.data['events']);
      }
    }).catch(err => {
      console.log(err)
    });
  }

  createNewCalendarEvent = () => {

    let formControls = this.state.formControls;

    let startDateTime = formControls['startDate'] + " " + formControls['startTime'] + ":00";
    let endDateTime = formControls['endDate'] + " " + formControls['endTime'] + ":00";

    const newEvent = [{
      eventID: 9999,
      eventName:formControls['eventName'],
      eventDescription: formControls['eventDesc'],
      eventStartDate: formControls['startDate'],
      eventEndDate: formControls['endDate'],
      eventStartTime: formControls['startTime'],
      eventEndTime: formControls['endTime'],
    }];

    this.setState({
      isLoading: true
    });

    server.post('/addcalendarevent',{
        rentalID: this.props.navigation.getParam("rentalID", ""),
        eventName: formControls['eventName'],
        eventDescription: formControls['eventDesc'],
        eventStartDT: startDateTime,
        eventEndDT: endDateTime,
    }).then((response) => {
      if(response.status === 201) {
        this.updateCurrentDayCalendarEvents(newEvent); 
      }
    }).then(resp => {
      this.setFormVisible(false);
    }).then(resp => {
      this.getEvents();
    }).then(resp => {
      this.setState({
        isLoading: false,
      });
    }).catch(err => {
      console.log(err)
    });

  }

  updateCalendarEvents = (events: any) => {

    let updatedEvents : any[] = [];

    events.forEach((element:any) => {
      let eventName = element.eventName;
      let eventDescription = element.eventDescription;

      let startDate = element.eventStartDT.slice(0, 10);
      let startTime = element.eventStartDT.slice(10);
      let endDate = element.eventEndDT.slice(0, 10);
      let endTime = element.eventEndDT.slice(10);

      let eventID = element.eventID;

      //TODO: add deletion handling

      updatedEvents.push({
        eventID: eventID,
        eventName: eventName,
        eventDescription: eventDescription,
        eventStartDate: startDate,
        eventEndDate: endDate,
        eventStartTime: startTime,
        eventEndTime: endTime,
      });
    });

    this.setState({
      calendarEvents: updatedEvents,
      isLoading: false,
    });

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
            onChange={(event: any) => {
              this.setDisplayCalendarEvents(true, event.startDate.toISOString());
            }}
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
            windowBackgroundColor='#f6f7f8'
            overlayBackgroundColor='#f6f7f8'
          >
            <View
              style={styles.viewEventForm}
            >
              <Text
                style={{fontSize:24, textAlign:'center', marginTop: 40, marginBottom: 40}}
              >
                {this.state.selectedDate.toString()}
              </Text>

              <FlatList
                data={this.state.currentDayCalendarEvents}
                renderItem={( {item} ) => (
                  <View>
                    <Text>{item.eventName}</Text>
                    <Text>{item.eventDescription}</Text>
                  </View>
                )}
                keyExtractor={this.keyExtractor}
              ></FlatList>

              <View
                style={{display:'flex', justifyContent:'center', flexDirection:'row'}}
              >
                <Button
                  title="Add event"
                  containerStyle={styles.dateTimeButton}
                  onPress={() =>
                    {
                      this.setFormVisible(true);
                    }
                  }
                >
                </Button>

                <Button
                  title="Back to calendar"
                  onPress={() =>
                    {
                      this.setEventsVisible(false);
                    }
                  }
                >
                </Button>
              </View>
            </View>
          </Overlay>

          <Overlay
            isVisible={this.state.isVisible}
            containerStyle={styles.addEventForm}
          >
            <ScrollView>
              <Text
                style={{fontSize:24, textAlign:'center', marginBottom:30}}
              >Add Event</Text>

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
                  autoCorrect={true}
                  keyboardAppearance="light"
                  inputStyle={{marginTop:20, marginBottom:20}}
                  blurOnSubmit = {false}
                  returnKeyType="next"
                  onChangeText={(desc) => {
                    const updatedControls = this.state.formControls;
                    updatedControls['eventDesc'] = desc;
                    this.setState({
                      formControls: updatedControls,
                    });
                  }}
              />

            <View
              style={{display:'flex', justifyContent:'center', flexDirection:'row'}}
            >
              <Button
                title="Create"
                onPress={this.createNewCalendarEvent}
                containerStyle={styles.dateTimeButton}
              ></Button>

              <Button
                title="Cancel"
                onPress={() => this.setFormVisible(false) }
                containerStyle={styles.dateTimeButton}
              ></Button>
            </View>
            </ScrollView>
          </Overlay>

        </View>
      );
    }
  }
}
