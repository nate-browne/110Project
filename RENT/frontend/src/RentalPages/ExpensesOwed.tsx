import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements'
import styles from '../style/Expenses-Stylesheet';

export default class ExpensesOwed extends Component {
  state = {
    list: [
      {
        name: 'Unpaid',
        subtitle: 'Only 1 roll left!!!',
        color: '#ff4444',
        done: false
      },
      {
        name: 'Payment Sent',
        subtitle: 'Need 7 for pie recipe',
        color: 'green',
        done: false
      },
      {
        name: 'Payment Received',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Need 7 for pie recipe',
        color: '#55ff55',
        done: false
      },
    ],
    // TODO: this list is actually stored in backend - it's only here for viewing purposes (limit reason to some number of characters)
listMaria: [
    {
      amount: '$20.00',
      reason: 'WIFI May',
      date: '05/11/19',
      paid: false
    },
    {
        amount: '$50.00',
        reason: 'Water May',
        date: '05/11/19',
        paid: false
      },
  ],
  listJames: [
    {
      amount: '$90.00',
      reason: 'Electricity May',
      date: '05/11/19',
      paid: false
    },
    {
        amount: '$5.00',
        reason: 'Paper Towels',
        date: '05/11/19',
        paid: false
    },
    {
        amount: '$75.00',
        reason: 'SDGE May',
        date: '05/11/19',
        paid: false
    },
    {
        amount: '$90.00',
        reason: 'Electricity May',
        date: '05/11/19',
        paid: false
      },
      {
          amount: '$5.00',
          reason: 'Paper Towels',
          date: '05/11/19',
          paid: false
      },
      {
          amount: '$75.00',
          reason: 'SDGE May',
          date: '05/11/19',
          paid: false
      },
      {
        amount: '$90.00',
        reason: 'Electricity May',
        date: '05/11/19',
        paid: false
      },
      {
          amount: '$5.00',
          reason: 'Paper Towels',
          date: '05/11/19',
          paid: false
      },
      {
          amount: '$75.00',
          reason: 'SDGE May',
          date: '05/11/19',
          paid: false
      },

  ],
  listJenny: [
    {
      amount: '$20.00',
      reason: 'WIFI May',
      date: '05/11/19',
      paid: false
    },
    {
        amount: '$50.00',
        reason: 'Water May',
        date: '05/11/19',
        paid: false
    },
    {
        amount: '$50.00',
        reason: 'Water May',
        date: '05/11/19',
        paid: false
    },
  ],
  listBonnie: [
    {
      amount: '$20.00',
      reason: 'WIFI May',
      date: '05/11/19',
      paid: false
    },
  ],
};
    render() {
          return (
            <ScrollView horizontal={true} style= {{width: '100%', height:'100%', flexDirection: 'row'}}>
              <View style={{height:'100%', flexDirection: 'column', padding: 5}}>
                <Text style={styles.text_name}> Maria </Text>
                <ScrollView style={styles.itemContainer}>
              {
                this.state.listMaria.map((l, i) => (
                  <ListItem
                    containerStyle={[l.paid ? {backgroundColor: '#55ff55', margin: 2} : {backgroundColor: '#ff4444', margin: 2}]}
                    key={i}
                    onPress={() => {
                      let listMaria = [ ...this.state.listMaria];
                      listMaria[i].paid = !listMaria[i].paid;
                      this.setState( { listMaria } );
                    }}
                    title={
                      <Text style={styles.text}>
                        {l.amount}
                            </Text>
                        }
                        subtitle={<Text style={styles.text}> {l.reason} </Text>}
                    />
                    ))}
                </ScrollView>
                <Text style= {styles.text_total}> Total: $70 </Text>
              </View>
              <View style={{height:'100%', flexDirection: 'column', padding: 5}}>
                  <Text style={styles.text_name}> James </Text>
                  <ScrollView style={styles.itemContainer}>
              {
                this.state.listJames.map((l, i) => (
                  <ListItem
                    containerStyle={l.paid ? {backgroundColor: '#55ff55', margin: 2} : {backgroundColor: '#ff4444', margin: 2}}
                    key={i}
                    onPress={() => {
                      let listJames = [ ...this.state.listJames];
                      listJames[i].paid = !listJames[i].paid;
                      this.setState( { listJames } );
                    }}
                    title={
                      <Text style={styles.text}>
                        {l.amount}
                      </Text>
                    }
                    subtitle={<Text style={styles.text}> {l.reason} </Text>}
                  />
                ))
              }
            </ScrollView>
            <Text style= {styles.text_total}> Total: $510 </Text>
            </View>

            <View style={{height:'100%', flexDirection: 'column', padding: 5}}>
                <Text style={styles.text_name}> Jenny </Text>
                <ScrollView style={styles.itemContainer}>
              {
                this.state.listJenny.map((l, i) => (
                  <ListItem
                    containerStyle={l.paid ? {backgroundColor: '#55ff55', margin: 2} : {backgroundColor: '#ff4444', margin: 2}}
                    key={i}
                    onPress={() => {
                      let listJenny = [ ...this.state.listJenny];
                      listJenny[i].paid = !listJenny[i].paid;
                      this.setState( { listJenny } );
                    }}
                    title={
                      <Text style={styles.text}>
                        {l.amount}
                            </Text>
                        }
                        subtitle={<Text style={styles.text}> {l.reason} </Text>}
                    />
                    ))}
                </ScrollView>
                <Text style= {styles.text_total}> Total: $120 </Text>
              </View>

              <View style={{height:'100%', flexDirection: 'column', padding: 5}}>
                <Text style={styles.text_name}> Bonnie </Text>
                <ScrollView style={styles.itemContainer}>
              {
                this.state.listBonnie.map((l, i) => (
                  <ListItem
                    containerStyle={l.paid ? {backgroundColor: '#55ff55', margin: 2} : {backgroundColor: '#ff4444', margin: 2}}
                    key={i}
                    onPress={() => {
                      let listBonnie = [ ...this.state.listBonnie];
                      listBonnie[i].paid = !listBonnie[i].paid;
                      this.setState( { listBonnie } );
                    }}
                    title={
                      <Text style={styles.text}>
                        {l.amount}
                            </Text>
                        }
                        subtitle={<Text style={styles.text}> {l.reason} </Text>}
                    />
                    ))}
                </ScrollView>
                <Text style= {styles.text_total}> Total: $20 </Text>
              </View>

              <ScrollView style={styles.legendContainer}>
                    <Text style= {styles.text_name}> Legend </Text>
                    <View>
                    {
                    this.state.list.map((l, i) => (
                    <ListItem
                        badge={{ badgeStyle: {backgroundColor: l.color, width: 30, height: 30} }}
                        key={i}
                        title={
                        <Text style={styles.text_legend}>
                            {l.name}
                        </Text>
                        }
                    />
                    ))
                    }
                    </View>
                </ScrollView>

        </ScrollView>
          )
    }
}
