import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './style/Contact-Stylesheet';

export default class ContactInfo extends Component {

  render() {
    return (
      <View>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.info}>(123) 456-7890 / email@email.email</Text>
              <Text style={styles.description}>Bio here, this can be more than one line if you write enough stuff!!</Text>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text> Emergency Contact 1 </Text>
                <Text> Relation: Mom </Text>
                <Text> Name: Tammy </Text>
                <Text> (123) 456-7890</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Emergency Contact 2 </Text>
                <Text> Relation: Dad </Text>
                <Text> Name: Nate </Text>
                <Text> (123) 456-7890</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}
