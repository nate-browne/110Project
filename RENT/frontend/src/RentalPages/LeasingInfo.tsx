import React, { Component } from 'react';
import { Alert, ScrollView, Text, ImageBackground } from 'react-native';


import CountDown from 'react-native-countdown-component';
import styles from '../style/Logistics-Stylesheet';
import {Divider} from "react-native-elements";
import axios from 'axios';

// @ts-ignore
import configInfo from '../url';
const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});

export default class Logistics extends Component {
  state={
    image1Visible: false,
    daysLeft: 0,
    endDate: "",
    landlordFirstName: "",
    landlordLastName:"",
    landlordEmail:"",
    phoneNumber: "",
    rent: 0,
  }
  static navigationOptions = ({ navigation }) => {
    const {params} = navigation.state;
    return {
      title: params.address,
      headerStyle: {
        backgroundColor: '#2bc0cd',

      },

      headerBackTitle: "Rental Home",
      headerTitleStyle: {
        fontWeight: 'bold',
        color: "white",
      },
      headerTintColor: "white",

    };
  };
  componentDidMount() {
    let id = this.props.navigation.getParam("rentalID","");
    server.get('/getleaseenddate', {
      params: {
        //name of json field requested: value,
        rentalID: id
      }
    }).then(resp => {
        this.setState({daysLeft:resp.data['daysTill']})
        this.setState({endDate:resp.data['endDT']})
    }).catch(err => {
      console.log('Error occurred',err);

    })
    server.get('/getleaseinfo',{
      params: {
        //name of json field requested: value,
        rentalID: id
      }
    }).then(resp => {
        this.props.navigation.setParams({address:resp.data['address']})
        this.setState({landlordFirstName:resp.data['landlordFirstName']})
        this.setState({landlordLastName:resp.data['landlordLastName']})
        this.setState({landlordEmail:resp.data['landlordEmail']})
        this.setState({phoneNumber:resp.data['landlordPhoneNumber']})
        this.setState({rent:resp.data['rentCost']})
    }).catch(err => {
      console.log('Error occurred',err);
    })
  }

  render() {
    return (
      <ImageBackground imageStyle={{opacity: 0.4}} style={styles.background}>
        <ScrollView style={styles.container}>

          <Text style={styles.countdownHeader}> Lease Timer: </Text>

          <CountDown
              until={24 * 60 * 60 * this.state.daysLeft + 2 * 60 * 60 * 24}
              size={30}
              onFinish={() => Alert.alert('Finished')}
              digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#555555'}}
              digitTxtStyle={{color: '#555555'}}
              timeLabelStyle={{color: '#555555', fontWeight: 'bold'}}
              timeToShow={['D']}

              timeLabels={{d: 'Days',}}
              style={{padding: 10}}
          />
          <Text style={styles.lease}> End Date: {this.state.endDate.slice(0,17)} </Text>

          <Divider style={{ backgroundColor: '#2bc0cd', height: 10}} />
          <Text style={styles.countdownHeader}> Rental Payment Info </Text>
          <Text style={{fontSize:24,textAlign:"center"}}> Monthly Rent: ${this.state.rent} </Text>
          <Divider style={{ backgroundColor: '#2bc0cd', height: 10}} />

          <Text style={styles.countdownHeader}> Landlord Info </Text>
          <Text style={{fontSize:24,textAlign:"center"}}> {this.state.landlordFirstName}{this.state.landlordLastName} </Text>
          <Text style={{fontSize:24,textAlign:"center"}}> Email: {this.state.landlordEmail} </Text>
          <Text style={{fontSize:24,textAlign:"center"}}> PhoneNumber: {this.state.phoneNumber} </Text>
          <Divider style={{ backgroundColor: '#2bc0cd', height: 10}} />

        </ScrollView>
      </ImageBackground>
    );
  }
}
