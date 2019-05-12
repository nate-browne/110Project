import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements'

export default class ExpensesOwed extends Component {
    render() {
          return (
                <View>
                    <Button
                        raised={true}
                        title="Expenses Paid"
                        onPress={() => {
                        this.props.navigation.push('ExpensesPaid') }}
                    />
                    <Button
                        raised={true}
                        title="Expenses Owed"
                        onPress={() => {
                        this.props.navigation.push('ExpensesOwed') }}
                    />

                </View>
          )
    }
}
