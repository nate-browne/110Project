import React, { Component } from 'react';
import { Alert, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import styles from './style/Contact-Stylesheet';

export default class ContactInfo extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.info}>(123) 456-7890 / email@email.email</Text>
              <Text style={styles.description}>Bio here, this can be more than one line if you write enough stuff!!</Text>
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text> Emergency Contact 1 </Text>
                <Text> Mom </Text>
                <Text> Tammy </Text>
                <Text> (123) 456-7890</Text>
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Emergency Contact 2 </Text> 
                <Text> Dad </Text>
                <Text> Nate </Text>
                <Text> (123) 456-7890</Text>
              </TouchableOpacity>
              <Button
              title="+"
              buttonStyle={{height: 65, width: 65, borderRadius: 50}}
              // TODO add item to data base onPress
              onPress={() => { Alert.alert('TODO: add item to database') }}
            />
            </View>
        </View>
      </ScrollView>
    );
  }
}
