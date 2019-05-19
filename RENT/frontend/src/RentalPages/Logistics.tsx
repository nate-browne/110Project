import React, { Component } from 'react';
import { Alert, ScrollView, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import CountDown from 'react-native-countdown-component';
import styles from '../style/Logistics-Stylesheet';

export default class Logistics extends Component {

  render() {
    return (
      <ImageBackground imageStyle={{opacity: 0.4}} source={{uri: 'https://img.heypik.com/background-image/20190122/psd-beautiful-blue-dreamy-starry-watercolor-background-heypik-7WU4487.jpg?x-oss-process=image/quality,q_70/watermark,image_c2h1aXlpbl9uZXcucG5n,g_center'}} style={styles.background}>
        <ScrollView style={styles.container}>
          <Text style={styles.countdownHeader}> Address: </Text>
          <Text style={styles.address1}> 8875 Costa Verde Blvd Apt.807 </Text>
          <Text style={styles.address2}> La Jolla, CA 92210 </Text>
          <Text style={styles.countdownHeader}> Lease Ends In: </Text>
          <CountDown
              until={24 * 60 * 10 + 30}
              size={30}
              onFinish={() => Alert.alert('Finished')}
              digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#555555'}}
              digitTxtStyle={{color: '#555555'}}
              timeLabelStyle={{color: '#555555', fontWeight: 'bold'}}
              timeToShow={['D','H', 'M', 'S']}
              timeLabels={{d: 'Days', h: 'Hour', m: 'Minute', s: 'Second'}}
              style={{padding: 10}}
          />
          <Text style={styles.lease}> Lease ends on: 05/12/19 </Text>
          <Text style={styles.countdownHeader}> Images: </Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 225, height: 150}} source={{uri: 'http://cdn.home-designing.com/wp-content/uploads/2014/06/marble-finish-room-divider.jpeg'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 225, height: 150}} source={{uri: 'https://cdn.interiorzine.com/wp-content/uploads/2017/11/interior-design-for-small-studio-apartment.jpg'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 225, height: 150}} source={{uri: 'https://cdn.interiorzine.com/wp-content/uploads/2017/11/modern-studio-apartment-interior-design-ideas-hang-things.jpg'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 225, height: 150}} source={{uri: 'https://cdn.interiorzine.com/wp-content/uploads/2017/11/tiny-apartment-design-ideas-folding-glass-walls.jpg'}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 225, height: 150}} source={{uri: 'http://davescosmicsubsatl.com/wp-content/uploads/parser/one-bedroom-apartment-interior-design-1.jpg'}}/>
            </TouchableOpacity>

          </ScrollView>

          <Text style={styles.countdownHeader}> Contract: </Text>
          <ScrollView horizontal={true}>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220}} source={{uri: 'https://images.template.net/wp-content/uploads/2017/05/House-Lease-Contract-Template.jpg'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYj2Oswq-uLmtJpYAs-oAPaaF9dqvUUr2KCQxZamLyLM8Uz5oxjw'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYj2Oswq-uLmtJpYAs-oAPaaF9dqvUUr2KCQxZamLyLM8Uz5oxjw'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYj2Oswq-uLmtJpYAs-oAPaaF9dqvUUr2KCQxZamLyLM8Uz5oxjw'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Alert.alert("Make me bigger") }}>
              <Image style={{margin: 4, width: 160, height: 220}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYj2Oswq-uLmtJpYAs-oAPaaF9dqvUUr2KCQxZamLyLM8Uz5oxjw'}}/>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </ImageBackground>
    );
  }
}
