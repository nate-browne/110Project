import React, { Component } from 'react';
import { Alert, ScrollView, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';


import CountDown from 'react-native-countdown-component';
import styles from '../style/Logistics-Stylesheet';
import {Divider, Overlay} from "react-native-elements";

const endDate = 25; // Number of days away

export default class Logistics extends Component {
  state={
    image1Visible: false,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "8875 Costa Verde, La Jolla",
      headerStyle: {
        backgroundColor: '#2bc0cd',

      },

      headerBackTitle: "Rental Home",
      headerTitleStyle: {
        fontWeight: 'bold',
        color: "white",
      },
      headerTintColor: "white",

    };
  };
  render() {
    return (
      <ImageBackground imageStyle={{opacity: 0.4}} style={styles.background}>
        <ScrollView style={styles.container}>

          <Text style={styles.countdownHeader}> Lease ends in: </Text>

          <CountDown
              until={24 * 60 * 60 * endDate}
              size={30}
              onFinish={() => Alert.alert('Finished')}
              digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#555555'}}
              digitTxtStyle={{color: '#555555'}}
              timeLabelStyle={{color: '#555555', fontWeight: 'bold'}}
              timeToShow={['D']}

              timeLabels={{d: 'Days',}}
              style={{padding: 10}}
          />
          <Text style={styles.lease}>  (Ends 05/12/19) </Text>

          <Text> </Text>
          <Text> </Text>
          <Divider style={{ backgroundColor: '#2bc0cd', height: 10}} />


          <Text style={styles.otherHeader}> Images: </Text>
          <ScrollView style={styles.imageScroll} horizontal={true} minimumZoomScale={1} maximumZoomScale={5}>
            <TouchableOpacity onPress={() => { <Image style={styles.image} source = {{uri: 'http://cdn.home-designing.com/wp-content/uploads/2014/06/marble-finish-room-divider.jpeg'}}/> }}>
              <Image style={{margin: 4, width: 225, height: 150, borderColor: "#000000", borderWidth:10}} source={{uri: 'http://cdn.home-designing.com/wp-content/uploads/2014/06/marble-finish-room-divider.jpeg'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 225, height: 150, borderColor: "#000000", borderWidth:10}} source={{uri: 'https://cdn.interiorzine.com/wp-content/uploads/2017/11/interior-design-for-small-studio-apartment.jpg'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 225, height: 150, borderColor: "#000000", borderWidth:10}} source={{uri: 'https://cdn.interiorzine.com/wp-content/uploads/2017/11/modern-studio-apartment-interior-design-ideas-hang-things.jpg'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 225, height: 150, borderColor: "#000000", borderWidth:10}} source={{uri: 'https://cdn.interiorzine.com/wp-content/uploads/2017/11/tiny-apartment-design-ideas-folding-glass-walls.jpg'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 225, height: 150, borderColor: "#000000", borderWidth:10}} source={{uri: 'http://davescosmicsubsatl.com/wp-content/uploads/parser/one-bedroom-apartment-interior-design-1.jpg'}}/>

            </TouchableOpacity>

          </ScrollView>

          <Text> </Text>
          <Text> </Text>
          <Divider style={{ backgroundColor: '#2bc0cd', height: 10}} />


          <Text style={styles.otherHeader}> Contract: </Text>
          <ScrollView style={styles.imageScroll} horizontal={true}>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220, borderColor: "#000000", borderWidth:5}} source={{uri: 'https://images.template.net/wp-content/uploads/2017/05/House-Lease-Contract-Template.jpg'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220, borderColor: "#000000", borderWidth:5}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYj2Oswq-uLmtJpYAs-oAPaaF9dqvUUr2KCQxZamLyLM8Uz5oxjw'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220, borderColor: "#000000", borderWidth:5}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYj2Oswq-uLmtJpYAs-oAPaaF9dqvUUr2KCQxZamLyLM8Uz5oxjw'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220, borderColor: "#000000", borderWidth:5}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYj2Oswq-uLmtJpYAs-oAPaaF9dqvUUr2KCQxZamLyLM8Uz5oxjw'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220, borderColor: "#000000", borderWidth:5}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYj2Oswq-uLmtJpYAs-oAPaaF9dqvUUr2KCQxZamLyLM8Uz5oxjw'}}/>
            </TouchableOpacity>
          </ScrollView>
          <Text style={styles.countdownHeader}></Text>

        </ScrollView>
      </ImageBackground>
    );
  }
}
