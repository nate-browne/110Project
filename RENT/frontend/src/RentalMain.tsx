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
        title: navigation.getParam('address', ''),
        headerStyle: {
          backgroundColor: '#2bc0cd',
        },
        headerRight:  <TouchableOpacity
            style={{
              alignItems:'center',
              justifyContent:'center',
              width:45,
              height:45,
              backgroundColor:'#fff',
              borderRadius:50,
              marginRight: 10
            }} onPress={ () => navigation.push('Profile', {
              userID: navigation.getParam("userID",""),
              userName: navigation.getParam("userName",""),
              canEdit: true
            })}
        >
          <Icon name={"face"}  size={30}  />
        </TouchableOpacity>,
        headerBackTitle: "Rental Home",
        headerTitleStyle: {
          fontWeight: 'bold',
          color: "white",
        },

      };
    };
  render() {
    const items = [
      { name: 'Leasing Info', code: '#919f98', icon:'info' },
      { name: 'Bulletin Board', code: '#4d5057', icon:'assignment' },
      { name: 'Roommates', code: '#34495e', icon:'group' },
      { name: 'Calendar', code: '#a2d0d4', icon:'insert-invitation' },
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
                  this.props.navigation.push('LeasingInfo',{
                      rentalID: this.props.navigation.getParam("rentalID",""),
                      address: "Loading..."
                  });
                  break;
                case 'Bulletin Board':
                  this.props.navigation.push('NotesMain',{
                      userID: this.props.navigation.getParam("userID",""), //trying to get parameters from navigation
                      rentalID: this.props.navigation.getParam("rentalID",""), //trying to get parameters from navigation
                  });
                  break;
                case 'Roommates':
                  this.props.navigation.push('Roommates',{
                        userID: this.props.navigation.getParam("userID",""), //trying to get parameters from navigation
                        rentalID: this.props.navigation.getParam("rentalID",""), //trying to get parameters from navigation
                    });
                  break;
                case 'Calendar':

                  console.log("Rental ID:" + this.props.navigation.getParam("rentalID", ""));
                  this.props.navigation.push('Calendar', {
                    rentalID: this.props.navigation.getParam("rentalID", ""),
                  });
                  break;

                default:
                  Alert.alert("This should not happen");
              }
            }}
            activeOpacity= {0.5} style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <View>
                <Icon name={item.icon} color='white' size={45}/>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
            </TouchableHighlight>
          //</View>
        )}
      />
    );
  }
}
