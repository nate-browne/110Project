import {StyleSheet} from 'react-native';

/**
 *  Color scheme:
 *
 * #2bc0cd  - maximum blue green (icon color)
 * #f6f7f8  - white smoke (background)
 *
 */




const styles = StyleSheet.create({

  clearCheckbox : {
    backgroundColor: '#f6f7f8',
    borderWidth: 0,
  },

  checkboxText: {
    fontWeight: '100',
  },

  loginContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f7f8",
    height: '100%',
  },

  formFields: {
    marginBottom: 30,
  },

  mainButton: {
    width: '50%',
    margin: 10,
    marginBottom: 50,
    backgroundColor: '#2bc0cd',
  },

  loginButton: {
    width: '50%',
    margin: 10,
  },

  serviceBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderColor: 'grey',
  },

  text: {
    fontSize: 36,
    color: 'teal',
    alignItems: 'stretch',
    textAlign: 'center',
    padding: 20,
  },

  linkText: {
    fontSize: 14,
    color: '#292f36',
  },

  textinput: {
    height: 36,
    width: '80%',
    alignSelf: "center",
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
    marginTop: 100,
    marginBottom: 35,
  },

  button: {
    width: '40%',
    margin: 10,
  },

});

export default styles;
