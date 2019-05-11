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


const RootStack = createStackNavigator(
  {
    Login: Login,
    Example: ExamplePage,
    RentalMain: RentalMain,

  },
  {
    initialRouteName: "Login",
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
      return <AppContainer />;
    }
}
