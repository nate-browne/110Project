/*
  Name: ExamplePage.tsx
  Description: This file serves as an example for testing navigation features of
  react-navigation library
*/
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

interface IAppProps {
  navigation?: any;
}

interface IAppState {
}
export default class ExamplePage extends Component<IAppProps, IAppState> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Example... again"
          onPress={() => this.props.navigation.push('Example')}
        />
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
