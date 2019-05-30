import React, { Component } from 'react';
import { Alert, Text, ScrollView, View } from 'react-native';
import { Overlay, Icon, Button, Input, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import styles from '../style/Grocery-Stylesheet';

interface IAppProps {
  navigation?: any;
}

interface IAppState {
}
export default class Roommates extends Component<IAppProps,IAppState> {
  [x: string]: any;

  static navigationOptions = ({ navigation }) => {
        return {
            title: "Your Roommates!",
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
  state = {
    addVisible: false,
    deleteVisible: false,
    currentID: 0,
    // this list is actually stored in backend - it's only here for viewing purposes
    tmp: {
      name: '',
      avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
      color1: '#00ddff',
      color2: '#0c54f2',
    },
    list: [
      {
        name: 'John Doe',
        color1: '#93b7be',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color2: '#0c54f2',
      },
      {
        name: 'Maria',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#6e8898',
        color2: '#e100ff',
      },
      {
        name: 'James',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#9fb1bc',
        color2: '#F44336',
      },
      {
        name: 'Roommate #4',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#3f6377',
        color2: '#e100ff',
      },
      {
        name: 'Roommate #5',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#9fb1bc',
        color2: '#0c54f2',
      },
    ]
  };

  render() {
    return (
        <View style = {{width:'100%', height:'100%'}}>
          <ScrollView>
            {
              this.state.list.map((l, i) => (
                  <ListItem
                      key={i}
                      onPress={() => {
                        this.props.navigation.push('Profile');
                      }}
                      onLongPress = {() => {
                        this.state.currentID = i;
                        this.setState({deleteVisible: true});
                        Alert.alert(
                            'Delete Roommate?',
                            'This will permanently delete this roommate.',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: 'OK', onPress: () =>  {
                                  this.state.list.splice(this.state.currentID, 1);
                                  this.setState({deleteVisible: false});
                                }},
                            ],
                            {cancelable: false},
                        );
                      }}/*
                      Component={TouchableScale}
                      friction={90} //
                      tension={100} // These props are passed to the parent component (here TouchableScale)
                      activeScale={0.95} //
                      linearGradientProps={{
                        colors: [ l.color1 , l.color1],
                        start: [1, 0],
                        end: [0.2, 0],
                      }}*/
                      style = {{borderColor: "#BBBBBB", borderBottomWidth:1}}
                      leftAvatar={{ rounded: true, source: { uri: l.avatar_url } }}
                      title={l.name}
                      titleStyle={{ color: '#555555', fontSize: 20}}
                      subtitleStyle={{ color: '#555555' }}
                      chevronColor="#555555"
                      chevron
                  />
              ))
            }
          </ScrollView>
          <View style={{alignItems: 'flex-end', padding: 20}}>
            <Button
                title="+"
                titleStyle={{color: "#999999", fontSize:25}}
                type="outline"
                buttonStyle={{height: 65, width: 65, borderRadius: 50,  borderColor: "#999999", borderWidth:2}}
                // TODO add item to data base onPress
                onPress={() => { this.setState({addVisible: true}); }}
            />
          </View>
          <Overlay
              windowBackgroundColor="rgba(255, 255, 255, .5)"
              isVisible={this.state.addVisible}
              onBackdropPress={() => this.setState({ addVisible: false })}
          >

            <ScrollView>
              <Text style={{fontSize: 48}}>Add Roommate</Text>

              <Input
                  //inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Roommate Email"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  keyboardType="email-address"
                  leftIcon={
                    <Icon name="account" type="material-community" color="black" size={25} />
                  }
                  blurOnSubmit = {false}
                  onSubmitEditing = {() => {this.input1.focus()}}
                  returnKeyType="next"
                  onChangeText={(text: string) => {this.state.tmp.name = text}}
              />

              <Input
                  //inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Message"
                  multiline={true}
                  autoCorrect={true}
                  autoCapitalize="words"
                  keyboardAppearance="light"
                  leftIcon={
                    <Icon name="account" type="material-community" color="black" size={25} />
                  }
                  ref = {(input) => {this.input1 = input}}
                  blurOnSubmit = {false}
                  returnKeyType="done"
                  onChangeText={() => {}}
              />

              <Button
                  title="Add Roommate"
                  onPress={() => {
                    this.setState({list: [...this.state.list, this.state.tmp]});
                    this.setState({addVisible: false});
                  }}
              />
            </ScrollView>
          </Overlay>

        </View>
    )
  }
}