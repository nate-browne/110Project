import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Overlay, Input, Icon, Button, ListItem, Text } from 'react-native-elements'
import styles from '../style/Grocery-Stylesheet';
import axios from 'axios';

// @ts-ignore
import configInfo from '../url';

const serverURL = configInfo['serverURL'];
const server = axios.create({
    baseURL: serverURL
});

export default class Notes extends Component {
  [x: string]: any;
  state = {
    // this list is actually stored in backend - it's only here for viewing purposes
    currentName:"",
    noteID:"",
    category: "",
    currentSubtitle:"",
    editVisible: false,
    addVisible: false,
    rentalID: "",
    list: [],
    tmpDescription: "",
    tmpTitle: "",
    tmpCategory: "",

  };

  constructor(props:any){
      super(props);
      this.getNotes();
  }

  setEditVisible(visible: boolean) {
    this.setState({editVisible: visible});
  }

  setAddVisible(visible: boolean) {
    this.setState({addVisible: visible});
  }
  componentWillMount() {
    this.setState({tmpTitle:"hello"})
  }
    componentDidMount() {

        this.setState({rentalID:this.props.navigation.getParam("rentalID","")});
        this.state.category = this.props.navigation.getParam("category","");
        console.log("first "+ this.props.navigation.getParam("category",""));
        server.get('/getnotes', {
            params: {
                rentalID: this.state.rentalID,
            }
        }).then(resp => {
            this.state.list = resp.data["notes"];
            if(this.state.list === undefined || this.state.list === null){
                this.state.list = [];
            }else{
                this.state.list = resp.data["notes"][this.state.category];
                if(this.state.list === undefined || this.state.list === null){
                    this.state.list = [];
                }
            }

            console.log(" 1 category is "+this.state.category);
            console.log('mount notes')
            console.log('notes rental ID: ', this.state.rentalID);
        }).catch(err => {
            console.log('Error occurred in mount item notes',err);
        })
    }

    addNote(): any {
        server.post('/addnote', {
            rentalID: this.state.rentalID,
            description: this.state.tmpDescription,
            title: this.state.tmpTitle,
            category: this.state.category,
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
        this.state.category = this.props.navigation.getParam("category","");
        console.log("second  "+ this.props.navigation.getParam("category",""));
        console.log("rentalid  "+ this.props.navigation.getParam("rentalID",""));
        server.get('/getnotes', {
            params: {
                rentalID: this.state.rentalID,
            }
        }).then(resp => {
            this.state.list = resp.data["notes"];
            if(this.state.list === undefined || this.state.list === null){
                this.state.list = [];
            }else{
                console.log("original list "+resp.data);
                this.state.list = resp.data["notes"][this.state.category];
                if(this.state.list === undefined || this.state.list === null){
                    this.state.list = [];
                }
            }
            console.log("category is "+this.state.category);
            console.log("items include " + this.state.list);
            console.log("a title is "+this.state.list[2]['title']);
            console.log('notes rental ID: ', this.state.rentalID);
        }).catch(err => {
            console.log('Error occurred in mount item notes',err);
        })
    }

    changeNote(isDeleted:boolean): any {
        server.post('/changenoteinfo', {
            noteID: this.state.noteID,
            title: this.state.tmpTitle,
            description : this.state.tmpDescription,
            isDeleted : isDeleted,
            category: this.state.category,
        }).then(resp => {
            // Success
            console.log("Change Successful");
        })
            .catch(err => {
                console.log('Error occurred', err);
            })
    }

    render() {
        this.getNotes();
          return (
            <View style= {{width:'100%', height:'100%'}}>
              <ScrollView style={styles.itemContainer}>
              {
                this.state.list.map((l, i) => (
                  <ListItem
                    key={i}
                    onLongPress={() => {
                      //edit item
                      this.state.currentName=l['title'];
                      this.state.currentSubtitle=l['description'];
                      this.state.tmpTitle = this.state.currentName;
                      this.state.tmpDescription = this.state.currentSubtitle;
                      this.state.noteID = l['noteID'];
                      this.setEditVisible(true);
                    }}
                    onPress={() => {
                      let list = [ ...this.state.list];
                      list[i].done = !list[i].done;
                      this.setState( { list } );
                    }}
                    title={
                      <Text style={[styles.text, l.done ? styles.text_crossed : styles.text]}>
                        {l['title']}
                      </Text>
                    }
                    subtitle={l['description']}
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
                    blurOnSubmit = {false}
                    onChangeText={(text: string) => this.setState({tmpTitle: text})}
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
                    blurOnSubmit = {false}
                    onChangeText={(text: string) => this.setState({tmpDescription: text})}
                />

                <Button
                  title="Save"
                  buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                  onPress={() => {this.setState({ editVisible: false }); this.changeNote(false);}}
                />

                <Button
                    title="Delete Note"
                    buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                    onPress={() => {this.setState({ editVisible: false }); this.changeNote(true);}}
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
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({tmpTitle: text})}
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
                    blurOnSubmit = {false}
                    returnKeyType="next"
                    onChangeText={(text: string) => this.setState({tmpDescription: text})}
                />

                <Button
                  title="Save"
                  buttonStyle={{backgroundColor:"#2bc0cd", marginTop:20, marginRight:10, marginLeft:10}}
                  onPress={() => {this.setState({ addVisible: false }); this.addNote();}}
                />

              </ScrollView>

          </Overlay>

        </View>
          )
    }
}
