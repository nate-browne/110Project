import React, { Component } from 'react';
import { Alert, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Icon, Text } from 'react-native-elements';
import styles from './style/RentalMain-Stylesheet';

interface IAppProps {
  navigation?: any;
}

interface IAppState {
}
export default class RentalMain extends Component<IAppProps, IAppState> {
  static navigationOptions = ({ navigation }) => {
      return {
        title: "Welcome back " + navigation.getParam('userName', '') + "!",
        headerStyle: {
          backgroundColor: '#89cff0',
        },
        headerRight:  <TouchableOpacity
            style={{
              alignItems:'center',
              justifyContent:'center',
              width:50,
              height:50,
              backgroundColor:'#fff',
              borderRadius:50,
              marginRight: 10
            }} onPress={ () => navigation.push('ContactInfo', {
              userID: navigation.getParam("userID",""),
              userName: navigation.getParam("userName","")
            })}
        >
          <Icon name={"face"}  size={30}  />
        </TouchableOpacity>,
        headerBackTitle: "Rental Home",
        headerTitleStyle: {
          fontWeight: 'bold',
        },

      };
    };
  render() {
    const items = [
      { name: 'Leasing Info', code: '#2ecc71', icon:'info' },
      { name: 'Grocery List', code: '#3498db', icon:'assignment' },
      { name: 'Roommates', code: '#9b59b6', icon:'group' },
      { name: 'Bulletin Board', code: '#34495e', icon:'mode-edit' },
      { name: 'Calendar', code: '#16a085', icon:'insert-invitation' },
      { name: 'Expenses', code: '#16a085', icon:'attach-money' },
    ];

    return (
      <FlatGrid
        itemDimension={160}

        items={items}
        style={styles.gridView}
        renderItem={({ item, index }) => (
          //<View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <TouchableHighlight onPress={()=> {
              switch(item.name){
                case 'Leasing Info':
                  this.props.navigation.push('Logistics');
                  break;
                case 'Grocery List':
                  this.props.navigation.push('Grocery');
                  break;
                case 'Roommates':
                  this.props.navigation.push('Roommates');
                  break;
                case 'Bulletin Board':
                  this.props.navigation.push('Bulletin')
                  break;
                case 'Calendar':
                  this.props.navigation.push('Calendar');
                  break;
                case 'Expenses':
                  this.props.navigation.push('ExpensesHome');
                  break;
                default:
                  Alert.alert("This should not happen");
              }
            }}
            activeOpacity= {0.5} style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <View>
                <Icon name={item.icon} color='white' size={49}/>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            </TouchableHighlight>
          //</View>
        )}
      />
    );
  }
}
