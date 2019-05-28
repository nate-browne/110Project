import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Overlay, Input, Icon, Button, ListItem, Text } from 'react-native-elements'
import styles from '../style/Grocery-Stylesheet';

export default class Grocery extends Component {
  state = {
    // this list is actually stored in backend - it's only here for viewing purposes
    editVisible: false,
    addVisible: false,
    currentID: 0,
    tmp: {
      name: '',
      subtitle: '',
      done: '',
    },
    list: [
      {
        name: 'Toilet Paper',
        subtitle: 'Only 1 roll left!!!',
        done: false
      },
      {
        name: 'Apples',
        subtitle: 'Need 7 for pie recipe',
        done: false
      },
      {
        name: 'White sugar',
        subtitle: 'For apple pie :P',
        done: true
      },
      {
        name: 'Cinnamon',
        subtitle: 'For apple pie recipe',
        done: false
      },
      {
        name: 'Flour',
        subtitle: 'For apple pie - yummmmm',
        done: true
      },
      {
        name: 'Butter',
        subtitle: 'For apple pie!!!',
        done: true
      },
      {
        name: 'Soy milk',
        subtitle: 'I think Ralph\'s is having a promotion',
        done: false
      },
      {
        name: 'Whipped cream',
        subtitle: 'This is happiness',
        done: false
      },
      {
        name: 'Ice cream',
        subtitle: 'Topping for apple pie',
        done: true
      },
      {
        name: 'Balloons',
        subtitle: 'For Surprise Party',
        done: true
      },
      {
        name: 'Cups',
        subtitle: 'Also for party',
        done: false
      },
      {
        name: 'Eggs',
        subtitle: '2 dozen please',
        done: false
      },
    ]
  };

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
                      this.state.currentID = i;
                      this.state.tmp.name = this.state.list[i].name;
                      this.state.tmp.subtitle = this.state.list[i].subtitle;
                      this.state.tmp.done = this.state.list[i].done;
                      this.setState({editVisible: true});
                    }}
                    onPress={() => {
                      let list = [ ...this.state.list];
                      list[i].done = !list[i].done;
                      this.setState( { list } );
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
