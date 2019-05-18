import React, { Component } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import { Button, Icon, Image, Input, Overlay, Text} from 'react-native-elements';
import axios from 'axios';

interface IAppProps {
  navigation?: any;
}

interface IAppState {
}

export default class Home extends Component<IAppProps, IAppState> {
  static navigationOptions = ({ navigation }) => {
      return {
        headerLeft: null
      };
  };
  state = {
    visible: false,
    userRentals: 0
  };

  setVisible(visible: boolean) {
    this.setState({visible: visible});
  }

  render() {
    return(
      <View>
        <Text>
          First time using RENT? Add a rental below and start managing your properties right away!
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
              <Text style={{fontSize: 24}}>Create New Rental</Text>

              <Input
                  //inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Enter a name for your rental"
                  keyboardAppearance="light"
                  returnKeyType="next"
                  onChangeText={(text: string) => this.setState({email: text})}
                />
              <Input
                  //inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Address"
                  keyboardAppearance="light"
                  returnKeyType="next"
                  onChangeText={(text: string) => this.setState({email: text})}
                />

              <Text style={{fontSize: 24}}>Landlord Information</Text>


              <Input
                  //inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Landlord's name"
                  keyboardAppearance="light"
                  returnKeyType="next"
                  onChangeText={(text: string) => this.setState({email: text})}
                />
              <Input
                  //inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Phone number"
                  keyboardAppearance="light"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onChangeText={(text: string) => this.setState({email: text})}
                />

                <Text style={{fontSize: 24}}>Leasing Information</Text>

                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Start Date"
                    keyboardAppearance="light"
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({email: text})}
                />
                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="End Date"
                    keyboardAppearance="light"
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({email: text})}
                />
                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Rent per month"
                    keyboardAppearance="light"
                    keyboardType="numeric"
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({email: text})}
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


                <View>
                  <Button
                    raised={true}
                    title="Create"
                    onPress={() => {
                      this.setVisible(false);
                    }}
                  />
                </View>

          </ScrollView>
        </Overlay>

      </View>
    )}
}
