/**
 * Main page for the application. This is where the magic happens.
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Header} from 'react-native-elements';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{text: "RENT", style: {color: '#fff'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <Text style={styles.welcome}>This is the app for Team RENT's app, RENT</Text>
        <Text style={styles.instructions}>To get started, edit src/App.tsx</Text>
        <Text style={styles.instructions}>
          This app is using Typescript and Flask
        </Text>
        <Button title="Outline button" type="outline" raised={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
