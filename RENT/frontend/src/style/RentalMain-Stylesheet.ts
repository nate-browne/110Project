import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
    color: 'white',
    alignItems: 'stretch',
    textAlign: 'center',
    padding: 20,
  },
  background: {
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    alignItems: 'stretch',
  },
  button: {
    width: '30%',
    margin: 10
  },
});

export default styles;