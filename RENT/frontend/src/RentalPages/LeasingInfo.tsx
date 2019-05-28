import React, { Component } from 'react';
import axios from 'axios';

// @ts-ignore
import configInfo from '../url';
const serverURL = configInfo['serverURL'];
const server = axios.create({
  baseURL: serverURL
});

export default class LeasingInfo extends Component {

}
