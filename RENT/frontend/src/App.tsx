import React, {Component} from 'react';
import styles from './style/Stylesheet'; // This is how you can import stuff from other folders
import { Text, View, Alert, Vibration } from 'react-native';
import {Button, Icon} from 'react-native-elements';

type Props = {};
export default class App extends Component<Props> {

  buttonPressed() {
    Alert.alert("Ahhh!", "Sup lol you found me dude");
    Vibration.vibrate(300);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello group, this is much better than the simulator</Text>
        <Button
          icon={<Icon name='g-translate' size={15} color="white"/>}
          raised={true}
          title="Press Me, I do nothing!"
          onPress={this.buttonPressed}
        />
      </View>
    );
  }
}

