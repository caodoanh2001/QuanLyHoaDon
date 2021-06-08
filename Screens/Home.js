import React, { useEffect,useContext,useState,Component } from 'react';
import { View,Text,Image, FlatList, ImageBackground, Alert, DrawerContentScrollView, DrawerItemList, DrawerItem, DeviceInfo, ActivityIndicator } from 'react-native';
import { Card, FAB, CardItem} from 'react-native-paper';
import {useSelector,useDispatch} from 'react-redux';
import {MyContext} from '../App'
import { createDrawerNavigator } from '@react-navigation/drawer';
import styles from '../styles/styles_home'
import AboutMe from '../Screens/AboutMe';
import { TextInput } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';
import { SearchBar } from 'react-native-elements';
import Info from '../Screens/Info';
import ViewImage from '../Screens/ViewImage';
import { createStackNavigator } from '@react-navigation/stack';

var background = require('../img/background.jpg');
var logo = require('../img/logo.png');

class Home extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false,
        };
    
        this.arrayholder = [];
    }
  
    componentDidMount() {
        this.makeRemoteRequest();
    }
  
    makeRemoteRequest = () => {
        const url = `https://d47a6b56120c.ngrok.io`;
        this.setState({ loading: true });
    
        fetch(url)
        .then(res => res.json())
        .then(res => {
            this.setState({
                data: res,
                error: res.error || null,
                loading: false,
                refreshing: false,
            });
            this.arrayholder = res;
        })
        .catch(error => {
            this.setState({ error, loading: false, refreshing: false });
        });
    };
    
    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true,
            seed: this.state.seed + 1, 
        }, () => {
            this.makeRemoteRequest();
        })
    }

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '86%',
            backgroundColor: '#CED0CE',
            marginLeft: '14%',
          }}
        />
      );
    };
  
    searchFilterFunction = text => {
        this.setState({
            value: text,
        });
    
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.seller.toUpperCase()} ${item.buyer.toUpperCase()}`;
            const textData = text.toUpperCase();
    
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };
  
    renderHeader = () => {
      return (
        <SearchBar
            placeholder="Tìm hóa đơn"
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
      />
      );
    };

    render() {
        if (this.state.loading) {
            return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
            );
        }
        return (
            <ImageBackground source = {background} style={{flex:1}}>
                <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <Card style={styles.myCard} onPress={() => {this.props.navigation.navigate("Receipt_info",{ item })}}>
                            <View style={styles.cardViews}>
                                <Image style={{width:80,height:100}}
                                source={{uri:item.picture}}/>
                                <View>
                                    <Text style={styles.text}>Hóa đơn: {item.name}</Text>
                                    <Text style={styles.text}>Người mua: {item.buyer}</Text>
                                    <Text style={styles.text}>Địa chỉ: {item.seller}</Text>
                                </View>
                            </View>
                        </Card>
                    )}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={this.renderHeader}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
                <FAB
                    style = {styles.fab}
                    small = {false}
                    icon = "plus"
                    theme = {{colors:{accent:'blue'}}}
                    onPress ={() => this.props.navigation.navigate("Create")}
                />
                </View>
            </ImageBackground>
        );
    }
}
  
  export default Home;