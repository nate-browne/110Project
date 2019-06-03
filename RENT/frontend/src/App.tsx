/*
  Name: ExamplePage.tsx
  Description: This page is the main entry point of our app.
  Contains main navagation stack
*/
import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
//import Bulletin from "./RentalPages/Bulletin";
import Calendar from "./RentalPages/Calendar";
//import Chat from "./RentalPages/Chat";
import Profile from "./RentalPages/Profile";
//import ExpensesHome from "./RentalPages/ExpensesHome";
//import ExpensesOwed from "./RentalPages/ExpensesOwed";
//import ExpensesPaid from "./RentalPages/ExpensesPaid";
//import Grocery from "./RentalPages/Grocery";
import NotesMain from "./RentalPages/NotesMain";
import Notes from "./RentalPages/Notes";
import Home from "./Home";
import LeasingInfo from "./RentalPages/LeasingInfo";
import Login from "./Login";
import RentalMain from "./RentalMain";
import Roommates from "./RentalPages/Roommates";

const RootStack = createStackNavigator(
  {
    //Bulletin: Bulletin,
    Calendar: Calendar,
    //Chat: Chat,
    Profile: Profile,
    //ExpensesHome: ExpensesHome,
    //ExpensesOwed: ExpensesOwed,
    //ExpensesPaid: ExpensesPaid,
    //Grocery: Grocery,
    NotesMain: NotesMain,
    Notes: Notes,
    Home: Home,
    LeasingInfo: LeasingInfo,
    Login: Login,
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
      return <AppContainer/>;
    }
}
