import React, { Component } from 'react';
import { Alert, View, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Text } from 'react-native-elements';
import styles from '../style/Bulletin-Stylesheet';
import axios from 'axios';

//@ts-ignore
import configInfo from '../url';

interface IAppProps {
    navigation?: any;
}
  
interface IAppState {
    isLoading: boolean,
    items: any[],
}

const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});

export default class RentalMain extends Component<IAppProps, IAppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: true,
            items: [],
        }
    }

    componentDidMount() {
        server.get('',{
          params: {
          }
        }).then(resp => {
          if(resp.status === 200) {
            this.setState({
              isLoading: false,
              items: [] // TODO: need to fill after nate/shiv updates server routes
            });
          }
        }).catch(err => {
          console.log(err)
        });
      }
    /*state = {
        // TODO this list is stored in the backend
        items: [
            { num: '1', title: 'Chores', note: '-Take out the trash \n -Wash the dishes \n a \n b \n c \n d \n e \n f \n g' },
            { num: '2', title: 'Happy thoughts', note: 'The sun' },
            { num: '3', title: 'Preferred name', note: 'Call James Jamie' },
          ]
    };*/
  render() {

    if (this.state.isLoading) {
        return(
            <View style = {{backgroundColor:"#666666", flex: 1}}>
              <ScrollView style={{marginTop: 80, marginBottom: 40, marginHorizontal: 40,
                  backgroundColor: "#FFFFFF", flex:1}}>
                <ActivityIndicator size="large" color="#0000ff" />
              </ScrollView>
          </View>
        );
    } else {
        return (
            <FlatGrid
                itemDimension={130}
                items={this.state.items}
                style={styles.gridView}
                renderItem={({ item }) => (
                    <TouchableHighlight onPress={()=> {
                        switch(item.num){
                            case '1':
                            Alert.alert("You pressed personal info!");
                            break;
                            case '2':
                            Alert.alert("You pressed leasing info!");
                            break;
                            case '3':
                            Alert.alert("You pressed leasing info!");
                            break;
                            default:
                            Alert.alert("This should not happen");
                        }
                    }
                    }
                        activeOpacity= {0.5} style={[styles.itemContainer, { backgroundColor: "purple" }]}>
                        <View>
                            <Text style={styles.textTitle}>{item.title}</Text>
                        </View>
                    </TouchableHighlight>
            )}
            />
        );
    }
    
  }
}
