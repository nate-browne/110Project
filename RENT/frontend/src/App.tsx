/*
  Name: ExamplePage.tsx
  Description: This page is the main entry point of our app.
  Contains main navagation stack
*/

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Bulletin from "./RentalPages/Bulletin";
import Calendar from "./RentalPages/Calendar";
import ContactInfo from "./RentalPages/ContactInfo";
import ExpensesHome from "./RentalPages/ExpensesHome";
import ExpensesOwed from "./RentalPages/ExpensesOwed";
import ExpensesPaid from "./RentalPages/ExpensesPaid";
import Grocery from "./RentalPages/Grocery";
import Home from "./Home";
import LeasingInfo from "./RentalPages/LeasingInfo";
import Login from "./Login";
import Logistics from "./RentalPages/Logistics";
import RentalMain from "./RentalMain";
import Roommates from "./RentalPages/Roommates";

const RootStack = createStackNavigator(
  {
    Bulletin: Bulletin,
    Calendar: Calendar,
    ContactInfo: ContactInfo,
    ExpensesHome: ExpensesHome,
    ExpensesOwed: ExpensesOwed,
    ExpensesPaid: ExpensesPaid,
    Grocery: Grocery,
    Home: Home,
    LeasingInfo: LeasingInfo,
    Login: Login,
    Logistics: Logistics,
    RentalMain: RentalMain,
    Roommates: Roommates,
  },
  {
    initialRouteName: "Login",
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
      return <AppContainer />;
    }
}
