import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    gridView: {
      marginTop: 20,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      padding: 10,
      height: 250,
    },
    textTitle: {
      fontSize: 25,
      alignItems: 'center',
      color: '#000',
      fontWeight: '600',
    },
    textNote: {
        fontSize: 12,
        alignItems: 'center',
        color: '#000',
        fontWeight: '600',
      },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });

  export default styles;
