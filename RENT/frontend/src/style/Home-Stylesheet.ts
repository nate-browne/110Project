import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    cardColorBox: {
        width: '80%', 
        height: 230, 
        flexDirection: 'row', 
        backgroundColor: '#2bc0cd',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
    },

    cardColorBoxAlternate: {
        width: '80%', 
        height: 230, 
        flexDirection: 'row', 
        backgroundColor: '#2aa9cd',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
    },

    buttonBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },

    buttonBarElement: {
        backgroundColor: '#2bc0cd',
        borderRadius:5,
    },
});

export default styles;
