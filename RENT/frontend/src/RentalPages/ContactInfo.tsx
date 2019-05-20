import React, { Component } from 'react';
import { Alert, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, Overlay, Input, Icon } from 'react-native-elements';
import styles from '../style/Contact-Stylesheet';

export default class ContactInfo extends Component {

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
    password: "",

    e1FirstName: "",
    e1LastName: "",
    e1Phone: "",

    e2FirstName: "",
    e2LastName: "",
    e2Phone: "",
  };


  setEditVisible(visible: boolean) {
    this.setState({editVisible: visible});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
          <View style={styles.header}>
          </View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.info}>(123) 456-7890 / email@email.email</Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text> Emergency Contact 1 </Text>
                <Text> Mom </Text>
                <Text> Tammy </Text>
                <Text> (123) 456-7890</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Emergency Contact 2 </Text>
                <Text> Dad </Text>
                <Text> Nate </Text>
                <Text> (123) 456-7890</Text>
              </TouchableOpacity>
              <Button
                title="edit"
                buttonStyle={{height: 65, width: 65, borderRadius: 50}}
                // TODO add item to data base onPress
                onPress={() => { this.setEditVisible(true) }}
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
                  autoCorrect={false}
                  keyboardAppearance="light"
                  leftIcon={
                    <Icon name="account" type="material-community" color="black" size={25} />
                  }
                  returnKeyType="next"
                  onChangeText={(text: string) => this.setState({firstName: text})}
              />
              <Input
                  inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Last Name"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  leftIcon={
                    <Icon name="account" type="material-community" color="black" size={25} />
                  }
                  returnKeyType="next"
                  onChangeText={(text: string) => this.setState({lastName: text})}
              />

              <Input
                  inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  keyboardType="email-address"
                  returnKeyType="next"
                  leftIcon={
                    <Icon name="email-outline" type="material-community" color="black" size={25} />
                  }
                  onChangeText={(text: string) => this.setState({email: text})}
                />

              <Input
                  inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Phone"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  leftIcon={
                    <Icon name="phone" type="material-community" color="black" size={25} />
                  }
                  onChangeText={(text: string) => this.setState({email: text})}
                />

                <Text style={{paddingTop: 10, fontSize: 26}}>Emergency Contact 1</Text>
                <Input
                    inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Relation"
                    keyboardAppearance="light"
                    returnKeyType="next"
                    leftIcon={
                      <Icon name="account-multiple-outline" type="material-community" color="black" size={25} />
                    }
                    onChangeText={(text: string) => this.setState({email: text})}
                  />
                  <Input
                      inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="First Name"
                      autoCorrect={false}
                      keyboardAppearance="light"
                      leftIcon={
                        <Icon name="account" type="material-community" color="black" size={25} />
                      }
                      returnKeyType="next"
                      onChangeText={(text: string) => this.setState({email: text})}
                  />

                  <Input
                      inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Last Name"
                      autoCorrect={false}
                      keyboardAppearance="light"
                      leftIcon={
                        <Icon name="account" type="material-community" color="black" size={25} />
                      }
                      returnKeyType="next"
                      onChangeText={(text: string) => this.setState({email: text})}
                  />

                  <Input
                      inputContainerStyle={styles.textinput}
                      leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                      placeholder="Phone"
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardAppearance="light"
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      leftIcon={
                        <Icon name="phone" type="material-community" color="black" size={25} />
                      }
                      onChangeText={(text: string) => this.setState({email: text})}
                 />

                 <Text style={{paddingTop: 10, fontSize: 26}}>Emergency Contact 2</Text>
                 <Input
                     inputContainerStyle={styles.textinput}
                     leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                     placeholder="Relation"
                     keyboardAppearance="light"
                     returnKeyType="next"
                     leftIcon={
                       <Icon name="account-multiple-outline" type="material-community" color="black" size={25} />
                     }
                     onChangeText={(text: string) => this.setState({email: text})}
                   />
                   <Input
                       inputContainerStyle={styles.textinput}
                       leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                       placeholder="First Name"
                       autoCorrect={false}
                       keyboardAppearance="light"
                       leftIcon={
                         <Icon name="account" type="material-community" color="black" size={25} />
                       }
                       returnKeyType="next"
                       onChangeText={(text: string) => this.setState({email: text})}
                   />
                   <Input
                       inputContainerStyle={styles.textinput}
                       leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                       placeholder="Last Name"
                       autoCorrect={false}
                       keyboardAppearance="light"
                       leftIcon={
                         <Icon name="account" type="material-community" color="black" size={25} />
                       }
                       returnKeyType="next"
                       onChangeText={(text: string) => this.setState({email: text})}
                   />

                   <Input
                       inputContainerStyle={styles.textinput}
                       leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                       placeholder="Phone"
                       autoCapitalize="none"
                       autoCorrect={false}
                       keyboardAppearance="light"
                       keyboardType="phone-pad"
                       returnKeyType="next"
                       leftIcon={
                         <Icon name="phone" type="material-community" color="black" size={25} />
                       }
                       onChangeText={(text: string) => this.setState({email: text})}
                  />


              <View style={styles.button}>
                <Button
                  raised={true}
                  title="Done"
                  /*
                  onPress={() => {
                    server.post('/login', {
                      email: this.state.email,
                      password: this.state.password
                    }).then(resp => {
                      //login successful
                      if(resp.status === 200) {
                        this.props.navigation.navigate('RentalMain',{
                          userName: resp.data.firstName,
                          loggedIn: resp.data.loggedIn
                        })
                        console.log("Login Successful");
                        this.setLoginVisible(false);
                      }
                      //login failed
                      else if (resp.status === 404) {
                        Alert.alert("Login Failed","Username or Password incorrect");
                        console.log("Login Failed");
                      }
                    })
                    .catch(err => {
                      console.log('Error occurred',err);
                    })
                  }}
                  */
                />
              </View>
          </ScrollView>
        </Overlay>
      </ScrollView>
    );
  }
}
