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
  static navigationOptions = {
      headerLeft: null
  };
  state = {
    visible: false,
    userRentals: 0,
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

  render() {
    const userID = this.props.navigation.getParam("userID","NO-ID");
    console.log(userID);
    server.get('/get_rental_IDs', {
      params: {
        userID: userID
      }
    }).then(resp => {
        console.log(resp.data.currentRental)
    }).catch(err => {
        console.log('Error occurred',err);
    })
    return(
      <View>
        <Text>
          First time using RENT? Add a rental below and start managing your properties right away
        </Text>

        <View>
          <Button
            raised={true}
            title="Add Rental"
            onPress={() =>{
              this.setVisible(true);
            }}
          />
        </View>

        <Overlay
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          isVisible={this.state.visible}
          onBackdropPress={() => this.setState({ visible: false })}
          fullScreen={true}
          >
          <ScrollView>
              <Button
                raised={true}
                type='clear'
                title="x"
                onPress={() =>{
                  this.setVisible(false);
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
                    onChangeText={(text: string) => this.setState({name: text})}
                  />
                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Address"
                    keyboardAppearance="light"
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({address: text})}
                  />

                <Text style={{fontSize: 24}}>Landlord Information</Text>


                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Landlord's name"
                    keyboardAppearance="light"
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({landlord: text})}
                  />
                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Phone number"
                    keyboardAppearance="light"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({phoneNumber: text})}
                  />

                  <Text style={{fontSize: 24}}>Leasing Information</Text>

                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Start Date"
                      keyboardAppearance="light"
                      returnKeyType="next"
                      onChangeText={(text: string) => this.setState({start: text})}
                  />
                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="End Date"
                      keyboardAppearance="light"
                      returnKeyType="next"
                      onChangeText={(text: string) => this.setState({end: text})}
                  />
                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Rent per month"
                      keyboardAppearance="light"
                      keyboardType="numeric"
                      returnKeyType="next"
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
                      onChangeText={(text: string) => this.setState({email: text})}
                  />
                  <Input
                      //inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Roommate email"
                      keyboardAppearance="light"
                      keyboardType="email-address"
                      returnKeyType="next"
                      onChangeText={(text: string) => this.setState({email: text})}
                  />

                  <Text style={{fontSize: 24}}>Documents and Images</Text>
                </View>
              <View>
                <Button
                  raised={true}
                  title="Create"
                  onPress={() => {
                    this.setVisible(false);
                    server.post('/createrental', {
                      address: this.state.address,
                      userID: userID
                    }).then(resp => {
                        console.log("Rental Created")
                    })
                  }}
                />
              </View>
          </ScrollView>
        </Overlay>

      </View>
    )}
}
