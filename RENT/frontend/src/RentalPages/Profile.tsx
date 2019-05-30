import React, { Component } from 'react';
import { Alert, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, Overlay, Input, Icon, Card, Divider } from 'react-native-elements';
import styles from '../style/Contact-Stylesheet';
import axios from 'axios';

// @ts-ignore
import configInfo from '../url';

const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});

export default class Profile extends Component {
  [x: string]: any;
  constructor(props) {
    super(props);
    server.get('/getinfo',{
      params: {
        userID: this.props.navigation.getParam("userID", 0)
      }
    }).then(resp => {
      this.state = {
        firstName: resp.data['firstName'],
        lastName: resp.data['lastName'],
        phoneNumber: resp.data['phoneNumber'],
        email: resp.data['email'],
      }
    }).catch(err => {
      Alert.alert("error");
    });

    server.get('/getemergencyinfo',{
      params: {
        userID: this.props.navigation.getParam("userID", 0)
      }
    }).then(resp => {
      this.state = {
        firstName: resp.data['firstName'],
        lastName: resp.data['lastName'],
        phoneNumber: resp.data['phoneNumber'],
        email: resp.data['email'],
      }
    }).catch(err => {
      Alert.alert("error");
    });
  }
  static navigationOptions = {
    headerTransparent: true,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    editVisible: false,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",

    e1Relation: "Mother",
    e1FirstName: "Tammy",
    e1LastName: "Mok",
    e1Phone: "(123) 456-7890",

    e2Relation: "Father",
    e2FirstName: "Nate",
    e2LastName: "Browne",
    e2Phone: "(098) 765-4321",

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

  componentDidMount() {
    server.get('/getinfo',{
      params: {
        userID: this.props.navigation.getParam("userID", 0)
      }
    }).then(resp => {
      if(resp.status === 200) {
        this.setState({firstName: resp.data.firstName})
        this.setState({lastName: resp.data.lastName})
        this.setState({email: resp.data.email})
        this.setState({phoneNumber: resp.data.phoneNumber})
      }
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
        <View style = {{backgroundColor:"#666666", flex: 1}}>
            <ScrollView style={{marginTop: 80, marginBottom: 40, marginHorizontal: 40,
                backgroundColor: "#FFFFFF", flex:1}}>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <Text style={{textAlign: 'center', marginTop:20,marginBottom:25,
                              color: '#333333', fontWeight:"500", fontSize:35}}>
                    {this.state.firstName} Name Namesss {this.state.lastName}
                </Text>
                <Divider style={styles.divider} />
                <Text style={{textAlign: 'center', marginVertical:5, marginTop:10,
                    color: '#777777', fontWeight:"300", fontSize:14}}>
                   ({this.state.phoneNumber} temp phone)
                </Text>
                <Text style={{textAlign: 'center', marginBottom:10,
                color: '#777777', fontWeight:"300", fontSize:14}}>
                {this.state.email} tempEmail@someaddress
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

        /*
      <ScrollView style={styles.container}>
          <View style={{ backgroundColor: "#2bc0cd",
              height:200,
              alignItems: 'flex-end',
                flex: .25,}}>
          </View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}> {this.state.firstName} {this.state.lastName}</Text>
              <Text style={styles.info}>{this.state.phoneNumber} / {this.state.email}</Text>


              <TouchableOpacity style={styles.buttonContainer}>
                <Text> Emergency Contact 1 </Text>
                <Text> {this.state.e1Relation} </Text>
                <Text> {this.state.e1FirstName} {this.state.e1LastName} </Text>
                <Text> {this.state.e1Phone} </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text> Emergency Contact 2 </Text>
                <Text> {this.state.e2Relation} </Text>
                <Text> {this.state.e2FirstName} {this.state.e2LastName} </Text>
                <Text> {this.state.e2Phone} </Text>
              </TouchableOpacity>
              <Button
                title="edit"
                buttonStyle={{height: 65, width: 65, borderRadius: 50}}
                // TODO add item to data base onPress
                onPress={() => {
                  this.setState({editVisible: true});

                  this.state.tmpFirstName = this.state.firstName;
                  this.state.tmpLastName = this.state.lastName;
                  this.state.tmpEmail = this.state.email;
                  this.state.tmpPhoneNumber = this.state.phoneNumber;

                  this.state.tmpE1Relation = this.state.e1Relation;
                  this.state.tmpE1FirstName = this.state.e1FirstName;
                  this.state.tmpE1LastName = this.state.e1LastName;
                  this.state.tmpE1Phone = this.state.e1Phone;

                  this.state.tmpE2Relation = this.state.e2Relation;
                  this.state.tmpE2FirstName = this.state.e2FirstName;
                  this.state.tmpE2LastName = this.state.e2LastName;
                  this.state.tmpE2Phone = this.state.e2Phone;
                }}
              />
            </View>
        </View>


        <Overlay
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          isVisible={this.state.editVisible}
          onBackdropPress={() => this.setState({ editVisible: false })}
          >
          <ScrollView style={styles.container}>
              <Text style={{fontSize: 48}}>Contact Info</Text>

              <Input
                  inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="First Name"
                  defaultValue = {this.state.firstName}
                  autoCorrect={false}
                  keyboardAppearance="light"
                  leftIcon={
                    <Icon name="account" type="material-community" color="black" size={25} />
                  }
                  returnKeyType="next"
                  blurOnSubmit = {false}
                  onSubmitEditing = {() => {this.input1.focus()}}
                  onChangeText={(text: string) => {this.state.tmpFirstName = text;}}
              />
              <Input
                  inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Last Name"
                  defaultValue = {this.state.lastName}
                  autoCorrect={false}
                  keyboardAppearance="light"
                  leftIcon={
                    <Icon name="account" type="material-community" color="black" size={25} />
                  }
                  returnKeyType="next"
                  ref = {(input) => {this.input1 = input}}
                  blurOnSubmit = {false}
                  onSubmitEditing = {() => {this.input2.focus()}}
                  onChangeText={(text: string) => {this.state.tmpLastName = text;}}
              />

              <Input
                  inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Email"
                  defaultValue = {this.state.email}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  keyboardType="email-address"
                  returnKeyType="next"
                  ref = {(input) => {this.input2 = input}}
                  blurOnSubmit = {false}
                  onSubmitEditing = {() => {this.input3.focus()}}
                  leftIcon={
                    <Icon name="email-outline" type="material-community" color="black" size={25} />
                  }
                  onChangeText={(text: string) => {this.state.tmpEmail = text;}}
                />

              <Input
                  inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Phone"
                  defaultValue = {this.state.phoneNumber}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  ref = {(input) => {this.input3 = input}}
                  blurOnSubmit = {false}
                  onSubmitEditing = {() => {this.input4.focus()}}
                  leftIcon={
                    <Icon name="phone" type="material-community" color="black" size={25} />
                  }
                  onChangeText={(text: string) => {this.state.tmpPhoneNumber = text;}}
                />

                <Text style={{paddingTop: 10, fontSize: 26}}>Emergency Contact 1</Text>
                <Input
                    inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Relation"
                    defaultValue = {this.state.e1Relation}
                    keyboardAppearance="light"
                    returnKeyType="next"
                    ref = {(input) => {this.input4 = input}}
                    blurOnSubmit = {false}
                    onSubmitEditing = {() => {this.input5.focus()}}
                    leftIcon={
                      <Icon name="account-multiple-outline" type="material-community" color="black" size={25} />
                    }
                    onChangeText={(text: string) => {this.state.tmpE1Relation = text;}}
                  />
                  <Input
                      inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="First Name"
                      defaultValue = {this.state.e1FirstName}
                      autoCorrect={false}
                      keyboardAppearance="light"
                      leftIcon={
                        <Icon name="account" type="material-community" color="black" size={25} />
                      }
                      returnKeyType="next"
                      ref = {(input) => {this.input5 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input6.focus()}}
                      onChangeText={(text: string) => {this.state.tmpE1FirstName = text;}}
                  />

                  <Input
                      inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Last Name"
                      defaultValue = {this.state.e1LastName}
                      autoCorrect={false}
                      keyboardAppearance="light"
                      leftIcon={
                        <Icon name="account" type="material-community" color="black" size={25} />
                      }
                      returnKeyType="next"
                      ref = {(input) => {this.input6 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input7.focus()}}
                      onChangeText={(text: string) => {this.state.tmpE1LastName = text;}}
                  />

                  <Input
                      inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Phone"
                      defaultValue = {this.state.e1Phone}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardAppearance="light"
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      ref = {(input) => {this.input7 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input8.focus()}}
                      leftIcon={
                        <Icon name="phone" type="material-community" color="black" size={25} />
                      }
                      onChangeText={(text: string) => {this.state.tmpE1Phone = text;}}
                 />

                 <Text style={{paddingTop: 10, fontSize: 26}}>Emergency Contact 2</Text>
                 <Input
                     inputContainerStyle={styles.textinput}
                     leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                     placeholder="Relation"
                     defaultValue = {this.state.e2Relation}
                     keyboardAppearance="light"
                     returnKeyType="next"
                     ref = {(input) => {this.input8 = input}}
                     blurOnSubmit = {false}
                     onSubmitEditing = {() => {this.input9.focus()}}
                     leftIcon={
                       <Icon name="account-multiple-outline" type="material-community" color="black" size={25} />
                     }
                     onChangeText={(text: string) => {this.state.tmpE2Relation = text;}}
                   />
                   <Input
                       inputContainerStyle={styles.textinput}
                       leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                       placeholder="First Name"
                       defaultValue = {this.state.e2FirstName}
                       autoCorrect={false}
                       keyboardAppearance="light"
                       leftIcon={
                         <Icon name="account" type="material-community" color="black" size={25} />
                       }
                       returnKeyType="next"
                       ref = {(input) => {this.input9 = input}}
                       blurOnSubmit = {false}
                       onSubmitEditing = {() => {this.input10.focus()}}
                       onChangeText={(text: string) => {this.state.tmpE2FirstName = text;}}
                   />
                   <Input
                       inputContainerStyle={styles.textinput}
                       leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                       placeholder="Last Name"
                       defaultValue = {this.state.e2LastName}
                       autoCorrect={false}
                       keyboardAppearance="light"
                       leftIcon={
                         <Icon name="account" type="material-community" color="black" size={25} />
                       }
                       returnKeyType="next"
                       ref = {(input) => {this.input10 = input}}
                       blurOnSubmit = {false}
                       onSubmitEditing = {() => {this.input11.focus()}}
                       onChangeText={(text: string) => {this.state.tmpE2LastName = text;}}
                   />

                   <Input
                       inputContainerStyle={styles.textinput}
                       leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                       placeholder="Phone"
                       defaultValue = {this.state.e2Phone}
                       autoCapitalize="none"
                       autoCorrect={false}
                       keyboardAppearance="light"
                       keyboardType="phone-pad"
                       returnKeyType="next"
                       ref = {(input) => {this.input11 = input}}
                       blurOnSubmit = {false}
                       onSubmitEditing = {() => {this.input12.focus()}}
                       leftIcon={
                         <Icon name="phone" type="material-community" color="black" size={25} />
                       }
                       onChangeText={(text: string) => {this.state.tmpE2Phone = text;}}
                  />


              <View style={styles.button}>
                <Button
                  raised={true}
                  title="Done"
                  onPress={() => {
                    this.state.firstName = this.state.tmpFirstName;
                    this.state.lastName = this.state.tmpLastName;
                    this.state.email = this.state.tmpEmail;
                    this.state.phoneNumber = this.state.tmpPhoneNumber;

                    this.state.e1Relation = this.state.tmpE1Relation;
                    this.state.e1FirstName = this.state.tmpE1FirstName;
                    this.state.e1LastName = this.state.tmpE1LastName;
                    this.state.e1Phone = this.state.tmpE1Phone;

                    this.state.e2Relation = this.state.tmpE2Relation;
                    this.state.e2FirstName = this.state.tmpE2FirstName;
                    this.state.e2LastName = this.state.tmpE2LastName ;
                    this.state.e2Phone = this.state.tmpE2Phone;

                    this.setState({editVisible: false})
                  }}
                />
              </View>
          </ScrollView>
        </Overlay>
      </ScrollView>*/
    );
  }
}
