import {StyleSheet} from 'react-native';
import { ClientRequest } from 'http';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 36,
    color: 'teal',
    alignItems: 'stretch',
    textAlign: 'center',
    padding: 20,
  },
  textbox: {
    borderColor: '#000'
  },
  textinput: {
    //fontSize: 18,
    height: 36,
    width: 375 * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imageIcon: {
    width: 150,
    height: 150,
    alignItems: 'stretch',
  },
  button: {
    width: '30%',
    margin: 10
  },
  flexContainer: {
    flexDirection: "column",
    padding: 100,
  },
  centerText : {
    alignItems: "center",
  },
  iconBox : {
    justifyContent: "center",
  },
});

export default styles;