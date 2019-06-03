import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  viewEventForm: {
    backgroundColor: '#f6f7f8',
  },

  addEventForm: {
    backgroundColor: '#f6f7f8',
  },

  dateTimeGroup: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
  },

  dateTimeButton: {
    width: '30%',
    marginLeft: 2,
    marginRight: 2,
    borderColor: '#000',
    borderRadius: 3,
  },
  
  addEventButton: {
    width: '40%',
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#000',
    borderRadius: 3,
  },

  dateTimeTitle: {
    width: '30%',
    marginLeft: 2,
    marginRight: 2,
  }
});

export default styles;
