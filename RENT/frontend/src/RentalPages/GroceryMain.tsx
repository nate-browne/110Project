import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Overlay, Input, Icon, Button, ListItem, Text } from 'react-native-elements'
import styles from '../style/Grocery-Stylesheet';

export default class Grocery extends Component {
  state = {
    // this list is actually stored in backend - it's only here for viewing purposes
    currentName:"",
    currentSubtitle:"",
    editVisible: false,
    addVisible: false,
    list: [
      {
        name: 'Grocery',
        subtitle: 'Things to buy for apartment',
      },
      {
        name: 'Chores',
        subtitle: 'Things to do for apartment',
      },
      {
        name: 'Notes',
        subtitle: 'Things to know for apartment',
      },
    ]

  };

  setEditVisible(visible: boolean) {
    this.setState({editVisible: visible});
  }
  setAddVisible(visible: boolean) {
    this.setState({addVisible: visible});
  }

    render() {
          return (
            <View style= {{width:'100%', height:'100%'}}>
              <ScrollView style={styles.itemContainer}>
              {
                this.state.list.map((l, i) => (
                  <ListItem
                    key={i}
                    onLongPress={() => {
                      //edit item
                      this.state.currentName=l.name;
                      this.state.currentSubtitle=l.subtitle;
                      this.setEditVisible(true);
                    }}
                    onPress={() => {
                      this.props.navigation.push(l.name);
                    }}
                    title={
                      <Text style={[styles.text, l.done ? styles.text_crossed : styles.text]}>
                        {l.name}
                      </Text>
                    }
                    subtitle={l.subtitle}
                  />
                ))
              }
            </ScrollView>
            <View style={styles.button}>
            <Button
              title="+"
              buttonStyle={{height: 65, width: 65, borderRadius: 50}}
              // TODO add item to data base onPress
              onPress={() => { this.setAddVisible(true); }}
            />
          </View>
          <Overlay
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            isVisible={this.state.editVisible}
            onBackdropPress={() => this.setState({ editVisible: false })}
            height={'50%'}
            >

            <ScrollView>
                <Text style={{fontSize: 48}}>Edit Item</Text>

                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Item Name"
                    defaultValue={this.state.currentName}
                    autoCorrect={false}
                    keyboardAppearance="light"
                    leftIcon={
                      <Icon name="account" type="material-community" color="black" size={25} />
                    }
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({firstName: text})}
                />

                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Item Description"
                    defaultValue={this.state.currentSubtitle}
                    autoCorrect={false}
                    multiline={true}
                    keyboardAppearance="light"
                    leftIcon={
                      <Icon name="account" type="material-community" color="black" size={25} />
                    }
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({firstName: text})}
                />

                <Button
                  title="Save"
                  buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                  onPress={() => {this.setState({ editVisible: false }); Alert.alert("contact backend");}}
                />

              </ScrollView>

          </Overlay>


          <Overlay
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            isVisible={this.state.addVisible}
            onBackdropPress={() => this.setState({ addVisible: false })}
            height={'50%'}
            >

            <ScrollView>
                <Text style={{fontSize: 48}}>Add Item</Text>

                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Item Name"
                    autoCorrect={false}
                    keyboardAppearance="light"
                    leftIcon={
                      <Icon name="account" type="material-community" color="black" size={25} />
                    }
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({firstName: text})}
                />

                <Input
                    //inputContainerStyle={styles.textinput}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Item Description"
                    autoCorrect={false}
                    keyboardAppearance="light"
                    leftIcon={
                      <Icon name="account" type="material-community" color="black" size={25} />
                    }
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({firstName: text})}
                />

                <Button
                  title="Save"
                  buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                  onPress={() => {this.setState({ addVisible: false }); Alert.alert("contact backend");}}
                />

              </ScrollView>

          </Overlay>

        </View>
          )
    }
}
