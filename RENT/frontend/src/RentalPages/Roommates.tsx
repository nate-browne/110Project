import React, { Component } from 'react';
import {Alert, Text, ScrollView, View, ActivityIndicator} from 'react-native';
import { Overlay, Icon, Button, Input, ListItem } from 'react-native-elements';
import axios from 'axios';

//@ts-ignore
import configInfo from '../url';

const serverURL = configInfo['serverURL'];
const server = axios.create({baseURL: serverURL});

interface IAppProps {
    navigation?: any;
}

interface IAppState {
    isLoading: boolean,
    email: string,
    userID: number,
    rentalID: number,
    list:[],
    addVisible: boolean,
    deleteVisible: boolean,
    currentID: number,
    // this list is actually stored in backend - it's only here for viewing purposes
    tmpemail:string,
}


export default class Roommates extends Component<IAppProps,IAppState> {
    [x: string]: any;

    static navigationOptions = ({navigation}) => {
        return {
            title: "Your Roommates!",
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

    constructor(props: any) {
        super(props);

        this.state = {
            // this list is actually stored in backend - it's only here for viewing purposes
            isLoading: true,
            email: "",
            userID: 0,
            rentalID: 0,
            list: [],
            addVisible: false,
            deleteVisible: false,
            currentID: 0,
            // this list is actually stored in backend - it's only here for viewing purposes
            tmpemail: "",
        };
    }
    componentDidMount(): void {
        this.getRoommate();
    }
    getEmail(): any {
        server.get('/getinfo', {
            params: {
                userID: this.props.navigation.getParam("userID", ""),
            }
        }).then(resp => {
            this.state.email = resp.data.email;
            this.getRoommate();
        }).catch(err => {
            console.log("ERROR getting email", err.response.data['Reason']);
        })
    }

    addRoommate(): any {
        server.post('/addroommate', {
            rentalID: this.props.navigation.getParam("rentalID", ""),
            email: this.state.tmpemail,
        }).then(resp => {
            /* Success */
            if (resp.status === 201) {
                console.log("Roommate Added!");
            }
            this.getRoommate();
            this.setState({isLoading: false});
        }).catch(err => {
            console.log('Error occurred ', err.response.data['Reason']);
        })
    }

    deleteRoommate(roommateEmail:string): any{
        server.post('/deleteroommate', {
            rentalID: this.props.navigation.getParam("rentalID", ""),
            email: roommateEmail,
        }).then(resp => {
            /* Success */
            if (resp.status === 201) {
                console.log("Roommate Deleted!");
            }
            this.getRoommate();
            this.setState({isLoading: false});
        }).catch(err => {
            console.log('Error occurred ', err.response.data['Reason']);
        })
    }
    getRoommate(): any {
        this.state.rentalID = this.props.navigation.getParam("rentalID", "");
        this.state.userID = this.props.navigation.getParam("userID", "");
        server.get('/getroommates', {
            params: {
                userID: this.props.navigation.getParam("userID", ""),
                rentalID: this.props.navigation.getParam("rentalID", ""),
            }
        }).then(resp => {
            var tmp = [];
            if (resp.data["roommate0"] !== undefined) {
                tmp.push(resp.data['roommate0'])
            }
            if (resp.data["roommate1"] !== undefined) {
                tmp.push(resp.data['roommate1'])
            }
            if (resp.data["roommate2"] !== undefined) {
                tmp.push(resp.data['roommate2'])
            }
            if (resp.data["roommate3"] !== undefined) {
                tmp.push(resp.data['roommate3'])
            }
            if (resp.data["roommate4"] !== undefined) {
                tmp.push(resp.data['roommate4'])
            }
            this.state.list = tmp;
            console.log("data ", this.state.list);
            console.log('get roommates');
            console.log('roommates rental ID: ', this.state.rentalID);
            this.setState({isLoading: false});
        }).catch(err => {
            console.log("ERROR getting roommate", err.response.data['Reason']);
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );

        } else {
            return (
                <View style={{width: '100%', height: '100%'}}>
                    <Overlay
                        windowBackgroundColor="rgba(255, 255, 255, .5)"
                        isVisible={this.state.addVisible}
                        onBackdropPress={() => this.setState({addVisible: false})}
                    >

                        <ScrollView>
                            <Text style={{fontSize: 48}}>Add Roommate</Text>

                            <Input
                                leftIconContainerStyle={{marginLeft: 0, marginRight: 10}}
                                placeholder="Roommate Email"
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardAppearance="light"
                                keyboardType="email-address"
                                leftIcon={
                                    <Icon name="account" type="material-community" color="black" size={25}/>
                                }
                                blurOnSubmit={false}
                                returnKeyType="done"
                                onChangeText={(text: string) => {
                                    this.state.tmpemail = text
                                }}
                            />

                            <Button
                                title="Add Roommate"
                                onPress={() => {
                                    this.setState({isLoading:true});
                                    this.addRoommate();
                                    this.setState({addVisible: false});
                                }}
                            />
                        </ScrollView>
                    </Overlay>
                    <ScrollView>
                        {
                            this.state.list.map((l, i) => (
                                <ListItem
                                    key={i}
                                    onPress={() => {
                                        this.props.navigation.push('Profile');
                                    }}
                                    onLongPress={() => {
                                        this.state.currentID = i;
                                        this.setState({deleteVisible: true});
                                        Alert.alert(
                                            'Delete Roommate?',
                                            'This will permanently delete this roommate.',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'OK', onPress: () => {
                                                        this.deleteRoommate(l.email);
                                                        this.setState({deleteVisible: false});
                                                    }
                                                },
                                            ],
                                            {cancelable: false},
                                        );
                                    }}
                                    style={{borderColor: "#BBBBBB", borderBottomWidth: 1}}
                                    leftAvatar={{
                                        rounded: true,
                                        source: {uri: "https://bootdey.com/img/Content/avatar/avatar6.png"}
                                    }}
                                    title={l.name}
                                    titleStyle={{color: '#555555', fontSize: 20}}
                                    subtitleStyle={{color: '#555555'}}
                                    chevronColor="#555555"
                                    chevron
                                />
                            ))
                        }
                    </ScrollView>
                    <View style={{alignItems: 'flex-end', padding: 20}}>
                        <Button
                            title="+"
                            titleStyle={{color: "#999999", fontSize: 25}}
                            type="outline"
                            buttonStyle={{
                                height: 65,
                                width: 65,
                                borderRadius: 50,
                                borderColor: "#999999",
                                borderWidth: 2
                            }}
                            // TODO add item to data base onPress
                            onPress={() => {
                                this.setState({addVisible: true}
                                );
                            }}
                        />
                    </View>
                </View>
            )
        }
    }
}
