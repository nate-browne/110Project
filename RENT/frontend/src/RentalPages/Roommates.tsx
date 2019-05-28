import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
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
        color1: '#00ddff',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color2: '#0c54f2',
      },
      {
        name: 'Maria',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#770ba5',
        color2: '#e100ff',
      },
      {
        name: 'James',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#FF9800',
        color2: '#F44336',
      },
      {
        name: 'Roommate #4',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#770ba5',
        color2: '#e100ff',
      },
      {
        name: 'Roommate #5',
        avatar_url: "https://bootdey.com/img/Content/avatar/avatar6.png",
        color1: '#00ddff',
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
              containerStyle={{margin: 5}}
              onPress={() => {
                this.props.navigation.push('Profile');
              }}
              onLongPress = {() => {
                this.state.currentID = i;
                this.setState({deleteVisible: true});
              }}
              Component={TouchableScale}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              linearGradientProps={{
                colors: [ l.color1 , l.color2],
                start: [1, 0],
                end: [0.2, 0],
              }}
              leftAvatar={{ rounded: true, source: { uri: l.avatar_url } }}
              title={l.name}
              titleStyle={{ color: 'white', fontWeight: 'bold' }}
              subtitleStyle={{ color: 'white' }}
              chevronColor="white"
              chevron
            />
          ))
        }
          </ScrollView>
          <View style={{alignItems: 'flex-end', padding: 20}}>
            <Button
              title="+"
              buttonStyle={{height: 65, width: 65, borderRadius: 50}}
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

            <Overlay
              windowBackgroundColor="rgba(255, 255, 255, .5)"
              height='50%'
              isVisible={this.state.deleteVisible}
              onBackdropPress={() => this.setState({ deleteVisible: false })}
              >

              <ScrollView>
                <Text style={{fontSize: 48}}>Remove Roommate</Text>

                <Button
                  title="Remove Roommate"
                  onPress={() => {
                    this.state.list.splice(this.state.currentID, 1);
                    this.setState({deleteVisible: false});
                  }}
                />
              </ScrollView>
            </Overlay>
          </View>
        )
    }
}
