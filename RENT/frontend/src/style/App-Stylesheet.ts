import {StyleSheet} from 'react-native';
import { UrlTile } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    color: 'teal',
    alignItems: 'stretch',
    textAlign: 'center',
    padding: 20,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  image: {
    width: 150,
    height: 150,
    alignItems: 'stretch',
  },
  button: {
    width: '20%',
    margin: 10
  },
});

export default styles;