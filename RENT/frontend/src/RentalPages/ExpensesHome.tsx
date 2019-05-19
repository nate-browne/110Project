import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements'
interface IAppProps {
  navigation?: any;
}

interface IAppState {
}
export default class ExpensesOwed extends Component<IAppProps, IAppState> {
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
