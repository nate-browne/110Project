/*
  Name: ExamplePage.tsx
  Description: This page is the main entry point of our app.
  Contains main navagation stack
*/

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./Login";
import ExamplePage from "./ExamplePage";
import RentalMain from "./RentalMain";
import Grocery from "./Grocery";
import ExpensesHome from "./ExpensesHome";
import ExpensesOwed from "./ExpensesOwed";
import ExpensesPaid from "./ExpensesPaid";
import Bulletin from "./Bulletin";
import Logistics from "./Logistics";
import ContactInfo from "./ContactInfo";
import Home from "./Home";

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
