import React, { Component } from 'react';
import { Alert, ScrollView, Text, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { Button, Overlay, Input, Icon, Card, Divider } from 'react-native-elements';
import styles from '../style/Contact-Stylesheet';
import axios from 'axios';

// @ts-ignore
import configInfo from '../url';

const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});


// Interfaces needed for navigation.
interface IAppProps {
  navigation?: any;
}

interface IAppState {
  canEdit: boolean,
  addVisible: boolean,
  nameVisible: boolean,
  phoneVisible: boolean,
  contact1Visible: boolean,
  contact2Visible: boolean,
  changePasswordVisible: boolean,
  passwordLengthError: boolean,
  passwordMatchError: boolean,
  passwordIncorrectError: boolean,

  editVisible: boolean,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,

  e1Relation: string,
  e1Name: string,
  e1Phone: string,
  e1: boolean,
  e2: boolean,

  e2Relation: string,
  e2Name: string,
  e2Phone: string,

  tmpFirstName: string,
  tmpLastName: string,
  tmpRelation: string,
  tmpEmail: string,
  tmpPhoneNumber: string,

  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}

export default class Profile extends Component<IAppProps, IAppState> {
  [x: string]: any;
  constructor(props: any) {
    super(props);

    this.state = {
      canEdit: false,
      addVisible: false,
      editVisible: false,
      nameVisible: false,
      phoneVisible: false,
      contact1Visible: false,
      contact2Visible: false,
      changePasswordVisible: false,
      passwordLengthError: false,
      passwordMatchError: false,
      passwordIncorrectError: false,

      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",

      e1Relation: "",
      e1Name: "",
      e1Phone: "",
      e1: false,
      e2: false,

      e2Relation: "",
      e2Name: "",
      e2Phone: "",

      tmpFirstName: "",
      tmpLastName: "",
      tmpRelation: "",
      tmpEmail: "",
      tmpPhoneNumber: "",

      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
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
          firstName: resp.data['firstName'],
          lastName: resp.data['lastName'],
          email: resp.data['email'],
          phoneNumber: resp.data['phoneNumber'],
          e1Relation : resp.data['contact0']['relation'],
          e1Name : resp.data['contact0']['name'],
          e1Phone : resp.data['contact0']['phoneNumber'],
          e2Relation : resp.data['contact1']['relation'],
          e2Name : resp.data['contact1']['name'],
          e2Phone : resp.data['contact1']['phoneNumber']
        });
        if(resp.data['contact0']['name'] !== "Default Name" ) { this.setState({e1: true})}
        if(resp.data['contact1']['name'] !== "Default Name" ) { this.setState({e2: true})}
      }
    }).catch(err => {
      console.log(err)
    });
    this.setState({canEdit: this.props.navigation.getParam("canEdit", false)})
  }

  getInfo(){
      server.get('/getinfo',{
          params: {
              userID: this.props.navigation.getParam("userID", "")
          }
      }).then(resp => {
          if(resp.status === 200) {
              this.state.firstName = resp.data['firstName'];
              this.state.lastName = resp.data['lastName'];
              this.state.email = resp.data['email'];
              this.state.phoneNumber = resp.data['phoneNumber'];

              this.state.e1Relation = resp.data['contact1']['relation'];
              this.state.e1Name = resp.data['contact1']['name'];
              this.state.e1Phone = resp.data['contact1']['phoneNumber'];

              this.state.e2Relation = resp.data['contact0']['relation'];
              this.state.e2Name = resp.data['contact0']['name'];
              this.state.e2Phone = resp.data['contact0']['phoneNumber'];
          }
          if(resp.data['contact0']['name'] !== "Default Name" ) { this.setState({e1: true})}
          if(resp.data['contact1']['name'] !== "Default Name" ) { this.setState({e2: true})}
      }).catch(err => {
          console.log(err.response.data['reason'])
      });
  }

  changeUserInfo(): any {
    server.post('/changeuserinfo', {
      userID: this.props.navigation.getParam("userID",0),
      email: this.state.email,
      change: null,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
    }).then(resp => {
        // Success
        console.log("Change Successful");
    })
    .catch(err => {
      console.log('Error occurred', err);
    })
  }

  changeContact1Info(): any {
    server.post('/addcontactinfo', {
      userID: this.props.navigation.getParam("userID",""),
      email: "",
      name: this.state.e1Name,
      relationship: this.state.e1Relation,
      phoneNumber: this.state.e1Phone,
    }).then(resp => {
        // Success
        this.setState({e1: true})
        console.log("Change contact 1 Successful");
    })
    .catch(err => {
      console.log('Error occurred in contact 1', err);
    })
  }

  changeContact2Info(): any {
    server.post('/addcontactinfo', {
      userID: this.props.navigation.getParam("userID",""),
      email: "",
      name: this.state.e2Name,
      relationship: this.state.e2Relation,
      phoneNumber: this.state.e2Phone,
    }).then(resp => {
        // Success
        this.setState({e2: true})
        console.log("Change contact 2 Successful");
    })
    .catch(err => {
      console.log('Error occurred in contact 2', err);
    })
  }

  changePassword(): any {
    server.post('/resetpassword', {
      email: this.state.email,
      old: this.state.oldPassword,
      password: this.state.newPassword,
    }).then(resp => {
      // Success
      if (resp.status === 201) {
        console.log("Change password Successful");
        this.setState({changePasswordVisible: false});
      }
    })
    .catch (err => {
      this.setState({passwordIncorrectError: true});
      console.log('Error occurred in change password', err);
    })
  }

  displayChangePasswordError(): any {
    if (this.state.passwordMatchError) {
      return "Passwords do not match";
    } else if (this.state.passwordLengthError) {
      return "Password must contain at least 5 characters";
    }
    return "";
  }

  displayOldPasswordError(): any {
    if (this.state.passwordIncorrectError) {
      return "Old password is incorrect";
    }
    return "";
  }

  onTextChange(text: string) {
    var cleaned = ('' + text).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : ''),
            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

        this.setState({
            tmpPhoneNumber: number
        });

        return;
    }

    this.setState({
        tmpPhoneNumber: text,
    });
  }

  render() {

    let changePassword
    let displayE1
    let displayE2
    if(this.state.canEdit) {

      changePassword = <TouchableOpacity onPress={ () => this.setState({changePasswordVisible: true})}>
                          <Text style={styles.emergency}>Change Password</Text>
                       </TouchableOpacity>
    }

    if(!this.state.canEdit && !this.state.e1){
      displayE1 = <Text style={styles.contactInfo}> Roommate does not a emergency contact 1 </Text>
    }
    else if(this.state.canEdit && !this.state.e1) {
      displayE1 =       <TouchableOpacity onPress={ () => this.setState({contact1Visible: true})} >
                            <Text style={styles.contactInfo}> Create Emergency Contact </Text>
                        </TouchableOpacity>
    }
    else {
      displayE1 =       <TouchableOpacity onPress={ () => this.setState({contact1Visible: true})} >
                          <Text style={styles.contactInfo}> Name: {this.state.e1Name} </Text>
                          <Text style={styles.contactInfo}> Relationship: {this.state.e1Relation} </Text>
                          <Text style={styles.contactInfo}> Phone Number: {this.state.e1Phone} </Text>
                        </TouchableOpacity>
    }

    if(!this.state.canEdit && !this.state.e2){
      displayE2 = <Text style={styles.contactInfo}> Roommate does not a emergency contact 2 </Text>
    }
    else if(this.state.canEdit && !this.state.e2) {
          displayE2 = <TouchableOpacity onPress={ () => this.setState({contact2Visible: true})} >
                                <Text style={styles.contactInfo}> Create Emergency Contact </Text>
                      </TouchableOpacity>
    }
    else {
      displayE2 = <TouchableOpacity onPress={ () => this.setState({contact2Visible: true})} >
                          <Text style={styles.contactInfo}> Name: {this.state.e2Name} </Text>
                          <Text style={styles.contactInfo}> Relationship: {this.state.e2Relation} </Text>
                          <Text style={styles.contactInfo}> Phone Number: {this.state.e2Phone} </Text>
                  </TouchableOpacity>
    }
      return (
          <View style = {{backgroundColor:"#f6f7f8", flex: 1}}>
              <Overlay
                  windowBackgroundColor="rgba(255, 255, 255, .5)"
                  isVisible={this.state.nameVisible && this.state.canEdit}
                  onBackdropPress={() => this.setState({ nameVisible: false })}
                  height={'50%'}
              >

                  <ScrollView style={{backgroundColor:'f6f7f8'}}>
                      <Text style={{fontSize: 48}}>Edit Name</Text>

                      <Input
                          //inputContainerStyle={styles.textinput}
                          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                          placeholder="John"
                          defaultValue = {this.state.firstName}
                          autoCorrect={false}
                          keyboardAppearance="light"
                          leftIcon={
                              <Icon name="account" type="material-community" color="black" size={25} />
                          }
                          blurOnSubmit = {false}
                          returnKeyType="done"
                          onChangeText={(text: string) => {this.setState({tmpFirstName : text})}}
                      />

                      <Input
                          //inputContainerStyle={styles.textinput}
                          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                          placeholder="Smith"
                          defaultValue = {this.state.lastName}
                          autoCorrect={false}
                          keyboardAppearance="light"
                          leftIcon={
                              <Icon name="account" type="material-community" color="black" size={25} />
                          }
                          blurOnSubmit = {false}
                          returnKeyType="done"
                          onChangeText={(text: string) => {this.setState({tmpLastName : text})}}
                      />

                      <Button
                          title="Save"
                          buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                          onPress={() => {
                              this.state.firstName = this.state.tmpFirstName;
                              this.state.lastName = this.state.tmpLastName;
                              this.setState({nameVisible: false});
                              this.changeUserInfo();
                          }}
                      />

                  </ScrollView>

              </Overlay>

              <Overlay
                  windowBackgroundColor="rgba(255, 255, 255, .5)"
                  isVisible={this.state.phoneVisible && this.state.canEdit}
                  onBackdropPress={() => this.setState({ phoneVisible: false })}
                  height={'50%'}
              >

                  <ScrollView>
                      <Text style={{fontSize: 48}}>Edit Phone Number</Text>

                      <Input
                          //inputContainerStyle={styles.textinput}
                          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                          placeholder="(123) 456-7890"
                          defaultValue = {this.state.phoneNumber}
                          value = {this.state.tmpPhoneNumber}
                          autoCorrect={false}
                          keyboardAppearance="light"
                          leftIcon={
                              <Icon name="phone" type="material-community" color="black" size={25} />
                          }
                          blurOnSubmit = {false}
                          returnKeyType="done"
                          keyboardType="number-pad"
                          textContentType='telephoneNumber'
                          dataDetectorTypes='phoneNumber'
                          maxLength={14}
                          onSubmitEditing={() => Keyboard.dismiss()}
                          onChangeText={(text) => this.onTextChange(text)}
                      />


                      <Button
                          title="Save"
                          buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                          onPress={() => {
                              this.state.phoneNumber = this.state.tmpPhoneNumber;
                              this.setState({phoneVisible: false});
                              this.changeUserInfo();
                          }}
                      />

                  </ScrollView>

              </Overlay>

              <Overlay
                  windowBackgroundColor="rgba(255, 255, 255, .5)"
                  isVisible={this.state.contact1Visible && this.state.canEdit}
                  onBackdropPress={() => this.setState({ contact1Visible: false })}
                  height={'50%'}
              >

                  <ScrollView>
                      <Text style={{fontSize: 48}}>Edit Contact 1 Info</Text>

                      <Input
                          //inputContainerStyle={styles.textinput}
                          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                          placeholder="Name"
                          autoCorrect={false}
                          keyboardAppearance="light"
                          leftIcon={
                              <Icon name="account" type="material-community" color="black" size={25} />
                          }
                          blurOnSubmit = {false}
                          returnKeyType="done"
                          onChangeText={(text: string) => {this.setState({tmpFirstName : text})}}
                      />
                      <Input
                          //inputContainerStyle={styles.textinput}
                          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                          placeholder="Relationship"
                          autoCorrect={false}
                          keyboardAppearance="light"
                          leftIcon={
                              <Icon name="account-multiple" type="material-community" color="black" size={25} />
                          }
                          blurOnSubmit = {false}
                          returnKeyType="done"
                          onChangeText={(text: string) => {this.setState({tmpRelation : text})}}
                      />
                      <Input
                          //inputContainerStyle={styles.textinput}
                          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                          placeholder="Phone Number"
                          autoCorrect={false}
                          defaultValue={this.state.e1Phone}
                          keyboardAppearance="light"
                          leftIcon={
                              <Icon name="phone" type="material-community" color="black" size={25} />
                          }
                          blurOnSubmit = {false}
                          keyboardType="number-pad"
                          returnKeyType="done"
                          value = {this.state.tmpPhoneNumber}
                          textContentType='telephoneNumber'
                          dataDetectorTypes='phoneNumber'
                          maxLength={14}
                          onSubmitEditing={() => Keyboard.dismiss()}
                          onChangeText={(text) => this.onTextChange(text)}
                      />

                      <Button
                          title="Save"
                          buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                          onPress={() => {
                              this.state.e1Name = this.state.tmpFirstName;
                              this.state.e1Relation = this.state.tmpRelation;
                              this.state.e1Phone = this.state.tmpPhoneNumber;
                              this.setState({contact1Visible: false});
                              this.changeContact1Info();
                          }}
                      />
                      </ScrollView>
                </Overlay>

                <Overlay
                    windowBackgroundColor="rgba(255, 255, 255, .5)"
                    isVisible={this.state.contact2Visible && this.state.canEdit}
                    onBackdropPress={() => this.setState({ contact2Visible: false })}
                    height={'50%'}
                >

                    <ScrollView>
                        <Text style={{fontSize: 48}}>Edit Contact 2 Info</Text>

                        <Input
                            //inputContainerStyle={styles.textinput}
                            leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                            placeholder="Name"
                            autoCorrect={false}
                            keyboardAppearance="light"
                            leftIcon={
                                <Icon name="account" type="material-community" color="black" size={25} />
                            }
                            blurOnSubmit = {false}
                            returnKeyType="done"
                            onChangeText={(text: string) => {this.setState({tmpFirstName : text})}}
                        />
                        <Input
                            //inputContainerStyle={styles.textinput}
                            leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                            placeholder="Relationship"
                            autoCorrect={false}
                            keyboardAppearance="light"
                            leftIcon={
                                <Icon name="account-multiple" type="material-community" color="black" size={25} />
                            }
                            blurOnSubmit = {false}
                            returnKeyType="done"
                            onChangeText={(text: string) => {this.setState({tmpRelation : text})}}
                        />
                        <Input
                            //inputContainerStyle={styles.textinput}
                            leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                            placeholder="Phone Number"
                            defaultValue={this.state.e2Phone}
                            autoCorrect={false}
                            keyboardAppearance="light"
                            leftIcon={
                                <Icon name="phone" type="material-community" color="black" size={25} />
                            }
                            blurOnSubmit = {false}
                            keyboardType="number-pad"
                            returnKeyType="done"
                            value = {this.state.tmpPhoneNumber}
                            textContentType='telephoneNumber'
                            dataDetectorTypes='phoneNumber'
                            onSubmitEditing={() => Keyboard.dismiss()}
                            maxLength={14}
                            onChangeText={(text) => this.onTextChange(text)}
                        />

                        <Button
                            title="Save"
                            buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                            onPress={() => {
                                this.state.e2Name = this.state.tmpFirstName;
                                this.state.e2Relation = this.state.tmpRelation;
                                this.state.e2Phone = this.state.tmpPhoneNumber;
                                this.setState({contact2Visible: false});
                                this.changeContact2Info();
                            }}
                        />
                  </ScrollView>
              </Overlay>

              <Overlay
                  windowBackgroundColor="rgba(255, 255, 255, .5)"
                  isVisible={this.state.changePasswordVisible}
                  onBackdropPress={() => this.setState({ changePasswordVisible: false })}
                  height={'50%'}
              >

                  <ScrollView>
                      <Text style={{fontSize: 48}}>Change Password</Text>

                      <Input
                          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                          placeholder="Old Password"
                          autoCorrect={false}
                          keyboardAppearance="light"
                          leftIcon={
                              <Icon name="account" type="material-community" color="black" size={25} />
                          }
                          blurOnSubmit = {false}
                          secureTextEntry={true}
                          returnKeyType="next"
                          errorStyle={{ color: 'red', alignSelf: "center" }}
                          errorMessage={this.displayOldPasswordError()}
                          onChangeText={(text: string) => {this.setState({oldPassword : text, passwordIncorrectError : false})}}
                      />

                      <Input
                          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                          placeholder="New Password"
                          autoCorrect={false}
                          keyboardAppearance="light"
                          leftIcon={
                              <Icon name="account" type="material-community" color="black" size={25} />
                          }
                          blurOnSubmit = {false}
                          secureTextEntry={true}
                          returnKeyType="next"
                          onChangeText={(text: string) => {this.setState({newPassword : text, passwordLengthError : false})}}
                      />

                      <Input
                          leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                          placeholder="Confirm Password"
                          autoCorrect={false}
                          keyboardAppearance="light"
                          leftIcon={
                              <Icon name="account" type="material-community" color="black" size={25} />
                          }
                          blurOnSubmit = {false}
                          secureTextEntry={true}
                          returnKeyType="done"
                          errorStyle={{ color: 'red', alignSelf: "center" }}
                          errorMessage={this.displayChangePasswordError()}
                          onChangeText={(text: string) => {this.setState({confirmPassword : text, passwordMatchError : false})}}
                      />


                      <Button
                          title="Save"
                          buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                          onPress={() => {
                              if (this.state.confirmPassword !== this.state.newPassword) {
                                this.setState({passwordMatchError: true});
                              }
                              else if (this.state.newPassword.length <= 4) {
                                this.setState({passwordLengthError: true});
                              }
                              else {
                                this.changePassword();
                              }
                          }}
                      />

                  </ScrollView>

              </Overlay>

              <ScrollView style={{marginTop: 80, marginBottom: 40, marginHorizontal: 40,
                  backgroundColor: "#FFFFFF", flex:1}}>
                  <Image style={styles.avatar} source={require('../../assets/admin_1246364.png')}/>


                  <TouchableOpacity onPress={ () => {
                      this.state.tmpFirstName = this.state.firstName;
                      this.state.tmpLastName = this.state.lastName;
                      this.setState({nameVisible: true})
                      }} >
                  <Text style={{textAlign: 'center', marginTop:20,marginBottom:25,
                                color: '#333333', fontWeight:"500", fontSize:35}}>
                      {this.state.firstName} {this.state.lastName}
                  </Text>
                  </TouchableOpacity>


                  <Divider style={styles.divider} />
                  <TouchableOpacity onPress={ () => {
                    this.state.tmpPhoneNumber = this.state.phoneNumber;
                    this.setState({phoneVisible: true})
                  }} >
                  <Text style={{textAlign: 'center', marginVertical:5, marginTop:10,
                      color: '#777777', fontWeight:"300", fontSize:14}}>
                    {this.state.phoneNumber}
                  </Text>
                  </TouchableOpacity>
                  <Text style={{textAlign: 'center', marginBottom:10,
                  color: '#777777', fontWeight:"300", fontSize:14}}>
                  {this.state.email}
                  </Text>
                  <Divider style={styles.divider} />
                  <Text style={styles.emergency}>Emergency Contact 1</Text>

                  {displayE1}

                  <Divider style={{ marginTop:20, backgroundColor: '#AAAAAA', height: 2,}} />
                  <Text style={styles.emergency}>Emergency Contact 2</Text>

                  {displayE2}

                  <Divider style={{ marginTop:20, backgroundColor: '#AAAAAA', height: 2,}} />

                  {changePassword}
              </ScrollView>

          </View>
      );
  }
}
