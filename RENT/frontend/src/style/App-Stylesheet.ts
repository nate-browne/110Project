import {StyleSheet} from 'react-native';


/**
 *  Color scheme:
 * 
 * #2bc0cd  - maximum blue green (icon color)
 * #f6f7f8  - white smoke (background)
 * 
 */




const styles = StyleSheet.create({

  loginContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f7f8",
  },

  formFields: {
    marginBottom: 40,
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
    marginBottom: 50,
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
    marginTop: 5,
    marginBottom: 5,
    height: 36,
    width: '80%',
    justifyContent: "center",
    alignItems: "center",
  },

  imageIcon: {
    width: 150,
    height: 150,
    alignItems: 'stretch',
    marginTop: 130,
    marginBottom: 35,
  },

  button: {
    width: '40%',
    margin: 10,
  },

});

export default styles;