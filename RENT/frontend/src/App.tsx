/*
  Name: ExamplePage.tsx
  Description: This page is the main entry point of our app.
  Contains main navagation stack
*/

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Bulletin from "./Bulletin";
import ContactInfo from "./ContactInfo";
import ExpensesHome from "./ExpensesHome";
import ExpensesOwed from "./ExpensesOwed";
import ExpensesPaid from "./ExpensesPaid";
import Grocery from "./Grocery";
import Home from "./Home";
import Login from "./Login";
import Logistics from "./Logistics";
import RentalMain from "./RentalMain";
import Roommates from "./Roommates";

const RootStack = createStackNavigator(
  {
    Bulletin: Bulletin,
    ContactInfo: ContactInfo,
    ExpensesHome: ExpensesHome,
    ExpensesOwed: ExpensesOwed,
    ExpensesPaid: ExpensesPaid,
    Grocery: Grocery,
    Home: Home,
    Login: Login,
    Logistics: Logistics,
    RentalMain: RentalMain,
    Roommates: Roommates
  },
  {
    initialRouteName: "Logistics",
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
      return <AppContainer />;
    }
}
