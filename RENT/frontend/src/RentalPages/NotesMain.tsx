import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Overlay, Input, Icon, Button, ListItem, Text } from 'react-native-elements'
import styles from '../style/Grocery-Stylesheet';
import axios from 'axios';

// @ts-ignore
import configInfo from '../url';
import {string} from "prop-types";

const serverURL = configInfo['serverURL'];
const server = axios.create({
    baseURL: serverURL
});

export default class NotesMain extends Component {
  [x: string]: any;
  state = {
    // this list is actually stored in backend - it's only here for viewing purposes
    currentName:"",
    tmp: [] as string [],
    currentSubtitle:"",
    editVisible: false,
    addVisible: false,
    list: [],
    keys:[] as string [],
    rentalID: "",
    tmpDescription: "",
    tmpTitle: "",
    tmpCategory: "",

  };

  constructor(props){
      super(props);
      this.getNotes();
  }
  componentDidMount() {

        this.state.rentalID = this.props.navigation.getParam("rentalID","");
        server.get('/getnotes', {
            params: {
                rentalID: this.state.rentalID,
            }
        }).then(resp => {
            this.state.list = resp.data["notes"];
            if(this.state.list === undefined || this.state.list === null){
                this.state.list = [];
            }

            for (const key in Object.keys(this.state.list)){
                console.log("1 the key is "+key);
                if (this.state.keys.findIndex(x => x === Object.keys(this.state.list)[key]) == -1) {
                    this.state.tmp = [...this.state.keys, Object.keys(this.state.list)[key]];
                    this.state.keys = this.state.tmp;
                    console.log("1 Just added "+Object.keys(this.state.list)[key]);
                }
                console.log("1 keys: "+this.state.keys);
            }
            //console.log("list ", this.state.list);
            //console.log("data ", resp.data);
            console.log('mount notes')
            console.log('notes rental ID: ', this.state.rentalID);
        }).catch(err => {
            console.log('Error occurred in mount notes',err);
        })
    }


    addNote(): any {
        server.post('/addnote', {
            rentalID: this.state.rentalID,
            description: this.state.tmpDescription,
            title: this.state.tmpTitle,
            category: this.state.tmpCategory,
        }).then(resp => {
            /* Success */
            if(resp.status === 201) {
                console.log("Note Added!");
            }
            this.getNotes();
        }).catch(err => {
            console.log('Error occurred in addNote: ', err.response.data['Reason']);
        })
    }

    getNotes(): any{
        this.state.rentalID = this.props.navigation.getParam("rentalID","");
        server.get('/getnotes', {
            params: {
                rentalID: this.state.rentalID,
            }
        }).then(resp => {

            this.state.list = resp.data["notes"];
            if(this.state.list === undefined || this.state.list === null){
                this.state.list = [];
            }

            for (const key in Object.keys(this.state.list)) {
                console.log("the key is " + key); //TODO need to account for empty string categories later
                if (this.state.keys.findIndex(x => x === Object.keys(this.state.list)[key]) == -1) {
                    this.state.tmp = [...this.state.keys, Object.keys(this.state.list)[key]];
                    this.state.keys = this.state.tmp;
                    console.log("Just added "+Object.keys(this.state.list)[key]);
                }
                console.log("keys: "+ this.state.keys);
            }
            //console.log("list ", this.state.list);
            //console.log("data ", resp.data);
            console.log('get notes')
            console.log('notes rental ID: ', this.state.rentalID);
        }).catch(err => {
            console.log('Error occurred in get notes',err);
        })
    }

    render() {
        this.getNotes();
          return (
              <View style= {{width:'100%', height:'100%'}}>
              <ScrollView style={styles.itemContainer}>
              {
                this.state.keys.map((l,i) => (
                    <ListItem
                        key={i}
                        onLongPress={() => {
                            //edit item
                            this.state.currentName="the";
                            this.state.currentSubtitle="tlek";
                            this.setEditVisible(true);
                        }}
                        onPress={() => {
                            this.props.navigation.push('Notes',{
                                rentalID: this.props.navigation.getParam("rentalID",""), //trying to get parameters from navigation
                                category: l,
                            });
                        }}
                        title={
                            <Text >
                                {l}
                            </Text>
                        }
                        subtitle="random subtitle"
                    />
                ))

              }
            </ScrollView>
            <View style={styles.button}>
            <Button
              title="+"
              buttonStyle={{height: 65, width: 65, borderRadius: 50}}
              // TODO add item to data base onPress
              onPress={() => { this.setState({ addVisible: true }); }}
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
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Item Name"
                    defaultValue={this.state.currentName}
                    autoCorrect={false}
                    keyboardAppearance="light"
                    leftIcon={
                      <Icon name="account" type="material-community" color="black" size={25} />
                    }
                    blurOnSubmit = {false}
                    onSubmitEditing = {() => {this.input1.focus()}}
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({firstName: text})}
                />

                <Input
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Item Description"
                    defaultValue={this.state.currentSubtitle}
                    autoCorrect={false}
                    multiline={true}
                    keyboardAppearance="light"
                    leftIcon={
                      <Icon name="account" type="material-community" color="black" size={25} />
                    }
                    ref = {(input) => {this.input1 = input}}
                    blurOnSubmit = {false}
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({firstName: text})}
                />

                <Button
                  title="Save"
                  buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                  onPress={() => {this.setState({ editVisible: false }); Alert.alert("contact backend"); this.getNotes();}}
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
                    onChangeText={(text: string) => this.setState({tmpTitle: text})}
                />

                <Input
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Item Description"
                    autoCorrect={false}
                    keyboardAppearance="light"
                    leftIcon={
                      <Icon name="account" type="material-community" color="black" size={25} />
                    }
                    ref = {(input) => {this.input1 = input}}
                    blurOnSubmit = {false}
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({tmpDescription: text})}
                />

                <Input
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    placeholder="Category"
                    autoCorrect={false}
                    keyboardAppearance="light"
                    leftIcon={
                        <Icon name="account" type="material-community" color="black" size={25} />
                    }
                    ref = {(input) => {this.input1 = input}}
                    blurOnSubmit = {false}
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({tmpCategory: text})}
                />

                <Button
                  title="Save"
                  buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                  onPress={() => {
                      this.setState({addVisible: false});
                      this.addNote();
                      this.getNotes();
                  }}
                />

              </ScrollView>

          </Overlay>

        </View>
          )
    }
}
