import React, { Component } from 'react';
import { Alert, View, TouchableHighlight } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Text } from 'react-native-elements';
import styles from '../style/Bulletin-Stylesheet';

type Props = {};
export default class RenatlMain extends Component<Props> {
    state = {
        // TODO this list is stored in the backend
        items: [
            { num: '1', title: 'Chores', note: '-Take out the trash \n -Wash the dishes \n a \n b \n c \n d \n e \n f \n g' },
            { num: '2', title: 'Happy thoughts', note: 'The sun' },
            { num: '3', title: 'Preferred name', note: 'Call James Jamie' },
          ]
    };
  render() {
    return (
        <FlatGrid
            itemDimension={130}
            items={this.state.items}
            style={styles.gridView}
            renderItem={({ item, index }) => (
            //<View style={[styles.itemContainer, { backgroundColor: item.code }]}>
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
                }}
                activeOpacity= {0.5} style={[styles.itemContainer, { backgroundColor: "purple" }]}>
                <View>
                    <Text style={styles.textTitle}>{item.title}</Text>
                </View>
                </TouchableHighlight>
            //</View>
            )}
        />
    );
  }
}
