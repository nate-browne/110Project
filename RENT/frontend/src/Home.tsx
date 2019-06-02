import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button,Input, Overlay, Text} from 'react-native-elements';
import axios from 'axios';

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
    numRentals: 0,
    currentID: 0,
    pastID: 0,
    name: "",
    address: "",
    landlord: "",
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
  }

  createRental(userID: any): void{
    server.post('/createrental', {
      address: this.state.address,
      userID: userID
    }).then(resp => {
        if(resp.status == 201) {
            this.setState({currentID: resp.data['currentRental']});
            this.setState({pastID: resp.data['pastRental']});
            console.log('create')
            console.log('currentID: ', this.state.currentID);
            console.log('pastID: ', this.state.pastID);
        }
    }).catch (err => {
        console.log('Error', err);
    })
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
          <ScrollView>
              <Button
                raised={true}
                type='clear'
                title="x"
                onPress={() =>{
                  this.setState({ visible: false })
                }}
              />
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
                    placeholder="Landlord's name"
                    keyboardAppearance="light"
                    returnKeyType="next"
                    ref = {(input) => {this.input2 = input}}
                    blurOnSubmit = {false}
                    onSubmitEditing = {() => {this.input3.focus()}}
                    onChangeText={(text: string) => this.setState({landlord: text})}
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

                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Start Date"
                      keyboardAppearance="light"
                      returnKeyType="next"
                      ref = {(input) => {this.input4 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input5.focus()}}
                      onChangeText={(text: string) => this.setState({start: text})}
                  />
                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="End Date"
                      keyboardAppearance="light"
                      returnKeyType="next"
                      ref = {(input) => {this.input5 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input6.focus()}}
                      onChangeText={(text: string) => this.setState({end: text})}
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


                  <Text style={{fontSize: 24}}>Roommate Invite</Text>

                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Roommate email"
                      keyboardAppearance="light"
                      keyboardType="email-address"
                      returnKeyType="next"
                      ref = {(input) => {this.input7 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {this.input8.focus()}}
                      onChangeText={(text: string) => this.setState({email: text})}
                  />
                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Roommate email"
                      keyboardAppearance="light"
                      keyboardType="email-address"
                      returnKeyType="next"
                      ref = {(input) => {this.input8 = input}}
                      blurOnSubmit = {false}
                      onSubmitEditing = {() => {
                        this.createRental(userID);
                        this.setVisible(false);
                      }}
                      onChangeText={(text: string) => this.setState({email: text})}
                  />

                  <Text style={{fontSize: 24, margin: 20}}>Documents and Images</Text>
                </View>
              <View>
                <Button
                  raised={true}
                  style = {{margin: 20}}
                  title="Create"
                  onPress={() => {
                    this.createRental(userID);
                    this.setVisible(false);
                  }}
                />
              </View>
          </ScrollView>
        </Overlay>

      </View>
    )
  }
}
