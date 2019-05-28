import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Overlay, Input, Icon, Button, ListItem, Text } from 'react-native-elements'
import styles from '../style/Grocery-Stylesheet';

export default class Grocery extends Component {
  // State of this instance
  state = {
    // Need to retrieve all of this from the backend
    editVisible: false,
    addVisible: false,
    currentID: 0,

    // Temporary item for same/edits
    tmp: {
      name: '',
      subtitle: '',
      done: '',
    },

    // List of items
    items: []
  };

  render() {
    return (
      <View style = {{width:'100%', height:'100'}}>
        <ScrollView style={styles.itemContainer}>
          {
            this.state.items.map((l, i) => (
              <ListItem
                key={i}
                // Edit item
                onLongPress={() => {
                  this.state.currentID = i;
                  this.state.tmp.name = this.state.list[i].name;
                  this.state.tmp.subtitle = this.state.list[i].subtitle;
                  this.state.tmp.done = this.state.list[i].done;
                  this.setState({editVisible: true});
                }}
                // Cross off item
                onPress={() => {
                  let items = [...this.state.items]; // Deep copy of list
                  items[i].done = !items[i].done; // Flip doneness
                  this.setState( { items } ); // Assign new list
                }}
                title={
                  // Display title either crossed out or not
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
                onPress={() => {this.setState({addVisible: true})}}
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
                  defaultValue={this.state.list[this.state.currentID].name}
                  autoCorrect={false}
                  keyboardAppearance="light"
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
                  placeholder="Item Description"
                  defaultValue={this.state.list[this.state.currentID].subtitle}
                  autoCorrect={false}
                  multiline={true}
                  keyboardAppearance="light"
                  leftIcon={
                    <Icon name="account" type="material-community" color="black" size={25} />
                  }
                  ref = {(input) => {this.input1 = input}}
                  blurOnSubmit = {false}
                  returnKeyType="next"
                  onChangeText={(text: string) => {this.state.tmp.subtitle = text}}
              />

              <Button
                title="Save"
                buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                onPress={() => {
                  this.state.list[this.state.currentID] = this.state.tmp;
                  this.setState({ editVisible: false });
                }}
              />

              <Button
                title="Delete"
                buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                onPress={() => {
                  this.state.list.splice(this.state.currentID, 1);
                  this.setState({ editVisible: false });
                }}
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
                  blurOnSubmit = {false}
                  onSubmitEditing = {() => {this.input1.focus()}}
                  returnKeyType="next"
                  onChangeText={(text: string) => {this.state.tmp.name = text}}
              />

              <Input
                  //inputContainerStyle={styles.textinput}
                  leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                  placeholder="Item Description"
                  autoCorrect={false}
                  keyboardAppearance="light"
                  multiline = {true}
                  leftIcon={
                    <Icon name="account" type="material-community" color="black" size={25} />
                  }
                  ref = {(input) => {this.input1 = input}}
                  blurOnSubmit = {false}
                  returnKeyType="next"
                  onChangeText={(text: string) => {this.state.tmp.subtitle = text}}
              />

              <Button
                title="Save"
                buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                onPress={() => {
                  this.setState({list: [...this.state.list, this.state.tmp]});
                  this.setState({tmp: {name: '', subtitle: ''}})
                  this.setState({ addVisible: false });
                }}
              />

            </ScrollView>
        </Overlay>
      </View>
    )
  }
}
