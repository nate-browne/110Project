import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    background: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container:{
      marginTop: 20,
    },
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    addressHeader: {
      fontSize: 24,
      color: '#000',
      fontWeight: "700",
      paddingTop: 20,
    },
    countdownHeader: {
      fontSize: 24,
      color: '#000',
      textAlign: 'center',
      fontWeight: "700",
      paddingTop: 20,
    },
    address1:{
        fontSize:22,
        color: "#555555",
        textAlign: 'center',
        fontWeight: "600",
        marginBottom: 5,
    },
    address2:{
        fontSize:20,
        color: "#555555",
        textAlign: 'center',
        fontWeight: "500"
    },
    lease:{
      fontSize:20,
      color: "#555555",
      fontWeight: "500",
      textAlign: 'center',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
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
      backgroundColor: "#00BFFF",
    },
  });

  export default styles;
