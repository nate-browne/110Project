import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    divider:{
        backgroundColor: '#AAAAAA',
        height: 2,
    },
    emergency:{
        marginHorizontal:15,
        marginTop: 20,
        fontSize:20,
        fontWeight:"500",
        color:"#222222",
        textDecorationLine: 'underline',
    },
    contactInfo:{
        marginHorizontal:25,
        fontSize: 14,
        marginTop: 5,
        fontWeight:"200",
        color:'#444444',
    },
    container:{
      borderRadius: 5
    },
    header:{
      backgroundColor: "#2bc0cd",
      height:200,
      alignItems: 'flex-end',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 63,
      marginTop: 30,
      alignSelf:'center',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    button: {
      padding: 10,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#2bc0cd",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:90,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#ffffff",
    },
    textinput: {
      //fontSize: 18,
      height: 36
    },
  });

  export default styles;
