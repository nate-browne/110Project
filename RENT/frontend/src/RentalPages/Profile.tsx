import React, { Component } from 'react';
import { Alert, ScrollView, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Overlay, Input, Icon, Card, Divider } from 'react-native-elements';
import styles from '../style/Contact-Stylesheet';
import axios from 'axios';

// @ts-ignore
import configInfo from '../url';

const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});

// Interfaces needed for navigation
interface IAppProps {
  navigation?: any;
}

interface IAppState {
  isLoading: boolean,
  
  editVisible: boolean,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,

  e1Relation: string,
  e1FirstName: string,
  e1LastName: string,
  e1Phone: string,

  e2Relation: string,
  e2FirstName: string,
  e2LastName: string,
  e2Phone: string,

  tmpFirstName: string,
  tmpLastName: string,
  tmpEmail: string,
  tmpPhoneNumber: string,

  tmpE1Relation: string,
  tmpE1FirstName: string,
  tmpE1LastName: string,
  tmpE1Phone: string,

  tmpE2Relation: string,
  tmpE2FirstName: string,
  tmpE2LastName: string,
  tmpE2Phone: string,
}

export default class Profile extends Component<IAppProps, IAppState> {
  [x: string]: any;
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,

      editVisible: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",

      e1Relation: "",
      e1FirstName: "",
      e1LastName: "",
      e1Phone: "",

      e2Relation: "",
      e2FirstName: "",
      e2LastName: "",
      e2Phone: "",

      tmpFirstName: "",
      tmpLastName: "",
      tmpEmail: "",
      tmpPhoneNumber: "",

      tmpE1Relation: "",
      tmpE1FirstName: "",
      tmpE1LastName: "",
      tmpE1Phone: "",

      tmpE2Relation: "",
      tmpE2FirstName: "",
      tmpE2LastName: "",
      tmpE2Phone: "",
    };
  }
  static navigationOptions = {
    headerTransparent: true,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount() {
    server.get('/getinfo',{
      params: {
        userID: this.props.navigation.getParam("userID", 0)
      }
    }).then(resp => {
      if(resp.status === 200) {

        this.setState({
          firstName: resp.data.firstName,
          lastName: resp.data.lastName,
          email: resp.data.email,
          phoneNumber: resp.data.phoneNumber,
          isLoading: false,
        });
      }
    }).catch(err => {
      console.log(err)
    });

    // server.get('/getemergencyinfo',{
    //   params: {
    //     userID: this.props.navigation.getParam("userID", 0)
    //   }
    // }).then(resp => {
    //   this.setState({
    //     firstName: resp.data['firstName'],
    //     lastName: resp.data['lastName'],
    //     phoneNumber: resp.data['phoneNumber'],
    //     email: resp.data['email'],
    //   });
    // }).catch(err => {
    //   Alert.alert(err);
    // });
  }


  render() {

    // When the component is constructed, the fields in the state are
    // initially empty. We display a loader while the async GET
    // request is being performed.
    if (this.state.isLoading == true) {

      return(
        <View style = {{backgroundColor:"#666666", flex: 1}}>
              <ScrollView style={{marginTop: 80, marginBottom: 40, marginHorizontal: 40,
                  backgroundColor: "#FFFFFF", flex:1}}>
                <ActivityIndicator size="large" color="#0000ff" />
              </ScrollView>
          </View>
      );
    } 
    
    // Otherwise, all the information from the GET request should be
    // populated in the fields via componentDidMount, so we return
    // the page as should be formatted normally.
    else {

      return (
          <View style = {{backgroundColor:"#666666", flex: 1}}>
              <ScrollView style={{marginTop: 80, marginBottom: 40, marginHorizontal: 40,
                  backgroundColor: "#FFFFFF", flex:1}}>
                  <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                  <Text style={{textAlign: 'center', marginTop:20,marginBottom:25,
                                color: '#333333', fontWeight:"500", fontSize:35}}>
                      {this.state.firstName} {this.state.lastName}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text style={{textAlign: 'center', marginVertical:5, marginTop:10,
                      color: '#777777', fontWeight:"300", fontSize:14}}>
                    ({this.state.phoneNumber})
                  </Text>
                  <Text style={{textAlign: 'center', marginBottom:10,
                  color: '#777777', fontWeight:"300", fontSize:14}}>
                  {this.state.email}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text style={styles.emergency}>Emergency Contact 1</Text>
                  <TouchableOpacity onPress={ () => Alert.alert("Edit stuff")} >
                      <Text style={styles.contactInfo}> {this.state.e1FirstName} {this.state.e1LastName} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => Alert.alert("Edit stuff")}>
                      <Text style={styles.contactInfo}> Relationship: {this.state.e1Relation} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => Alert.alert("Edit stuff")}>
                      <Text style={styles.contactInfo}> {this.state.e1Phone} </Text>
                  </TouchableOpacity>
                  <Divider style={{ marginTop:20, backgroundColor: '#AAAAAA', height: 2,}} />
                  <Text style={styles.emergency}>Emergency Contact 2</Text>
                  <TouchableOpacity onPress={ () => Alert.alert("Edit stuff")}>
                      <Text style={styles.contactInfo}> {this.state.e2FirstName} {this.state.e2LastName} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => Alert.alert("Edit stuff")}>
                      <Text style={styles.contactInfo}> Relationship: {this.state.e2Relation} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => Alert.alert("Edit stuff")}>
                      <Text style={styles.contactInfo}> {this.state.e2Phone} </Text>
                  </TouchableOpacity>
                  <Divider style={{ marginTop:20, marginBottom:20, backgroundColor: '#AAAAAA', height: 2,}} />
                  <TouchableOpacity onPress={ () => Alert.alert("Edit stuff")}>
                  <Text style={{
                      textAlign:"center",
                      fontSize: 14,
                      color:'#777777', textDecorationLine:"underline"}}> edit </Text>
                  </TouchableOpacity>
              </ScrollView>

          </View>
      );
    }
  }
}
