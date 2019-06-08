/*
  Name: ExamplePage.tsx
  Description: This page is the main entry point of our app.
  Contains main navagation stack
*/
import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Calendar from "./RentalPages/Calendar";
import Profile from "./RentalPages/Profile";
import NotesMain from "./RentalPages/NotesMain";
import Notes from "./RentalPages/Notes";
import Home from "./Home";
import LeasingInfo from "./RentalPages/LeasingInfo";
import Login from "./Login";
import RentalMain from "./RentalMain";
import Roommates from "./RentalPages/Roommates";

const RootStack = createStackNavigator(
  {
    Calendar: Calendar,
    Profile: Profile,
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
