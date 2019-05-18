import React, { Component } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements'
import styles from './style/Grocery-Stylesheet';

export default class Grocery extends Component {
  state = {
    // this list is actually stored in backend - it's only here for viewing purposes
    list: [
      {
        name: 'Toilet Paper',
        subtitle: 'Only 1 roll left!!!',
        done: false
      },
      {
        name: 'Apples',
        subtitle: 'Need 7 for pie recipe',
        done: false
      },
      {
        name: 'White sugar',
        subtitle: 'For apple pie :P',
        done: true
      },
      {
        name: 'Cinnamon',
        subtitle: 'For apple pie recipe',
        done: false
      },
      {
        name: 'Flour',
        subtitle: 'For apple pie - yummmmm',
        done: true
      },
      {
        name: 'Butter',
        subtitle: 'For apple pie!!!',
        done: true
      },
      {
        name: 'Soy milk',
        subtitle: 'I think Ralph\'s is having a promotion',
        done: false
      },
      {
        name: 'Whipped cream',
        subtitle: 'This is happiness',
        done: false
      },
      {
        name: 'Ice cream',
        subtitle: 'Topping for apple pie',
        done: true
      },
      {
        name: 'Balloons',
        subtitle: 'For Surprise Party',
        done: true
      },
      {
        name: 'Cups',
        subtitle: 'Also for party',
        done: false
      },
      {
        name: 'Eggs',
        subtitle: '2 dozen please',
        done: false
      },
    ]
  };

    render() {
          return (
            <View style= {{width:'100%', height:'100%'}}>
              <ScrollView style={styles.itemContainer}>
              {
                this.state.list.map((l, i) => (
                  <ListItem
                    key={i}
                    onLongPress={() => {
                      //edit item
                      Alert.alert("TODO: edit item")
                    }}
                    onPress={() => {
                      let list = [ ...this.state.list];
                      list[i].done = !list[i].done;
                      this.setState( { list } );
                    }}
                    title={
                      <Text style={[styles.text, l.done ? styles.text_crossed : styles.text]}>
                        {l.name}
                      </Text>
                    }
                    subtitle={l.subtitle}
                  />
                ))
              }
            </ScrollView>
            <View style={styles.button}>
            <Button
              title="+"
              buttonStyle={{height: 65, width: 65, borderRadius: 50}}
              // TODO add item to data base onPress
              onPress={() => { Alert.alert('TODO: add item to database') }}
            />
          </View>
        </View>
          )
    }
}
