import React, { useEffect,useContext,useState } from 'react';
import { View,Text,Image, FlatList, ImageBackground, Alert, DrawerContentScrollView, DrawerItemList, DrawerItem, DeviceInfo } from 'react-native';
import { Card, FAB, CardItem} from 'react-native-paper';
import {useSelector,useDispatch} from 'react-redux';
import {MyContext} from '../App'
import { createDrawerNavigator } from '@react-navigation/drawer';
import styles from '../styles/styles_home'
import AboutMe from './AboutMe';
// import { NetworkInfo } from "react-native-network-info";

background = require('../img/background.jpg');
logo = require('../img/logo.png');

const Home = ({navigation}) =>{
    const dispatch  = useDispatch()
    const {data,loading} =  useSelector((state)=>{
        return state
    })

    const fetchData = () =>{
        fetch("http://1197a2051678.ngrok.io")
        .then(res => res.json())
        .then(results => {
            dispatch({type:"ADD_DATA",payload:results})
            dispatch({type:"SET_LOADING",payload:false})

        }).catch(err=>{
            Alert.alert("Xảy ra lỗi")
        })
    }
    useEffect (() => {
        fetchData()
    },[])

    const renderList = ((item) => {
        return(
        <Card style={styles.myCard} onPress={() => navigation.navigate("Receipt_info",{item})}>
            <View style={styles.cardViews}>
                <Image style={{width:80,height:80}}
                source={{uri:item.picture}}/>
                <View >
                    <Text style={styles.text}>Hóa đơn: {item.name}</Text>
                    <Text style={styles.text}>Người mua: {item.buyer}</Text>
                </View>
            </View>
        </Card>
        )
    })
    
    const Drawer = createDrawerNavigator()

    function MainHome(props) {
        return (
            <ImageBackground source = {background} style={{flex:1}}>
                {
                <FlatList
                    data = {data}
                    renderItem = {({item}) => {
                        return renderList(item)
                    }}
                    keyExtractor={item => item._id}
                    onRefresh = {() => fetchData()}
                    refreshing ={loading}
                />
                }
                <FAB
                    style = {styles.fab}
                    small = {false}
                    icon = "plus"
                    theme = {{colors:{accent:'blue'}}}
                    onPress ={() => props.navigation.navigate("Create")}
                />
            </ImageBackground>
        );
    }

    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Trang chủ" component={MainHome} />
            <Drawer.Screen 
                name="Liên hệ" 
                component={AboutMe}
                onPress ={() => props.navigation.navigate("AboutMe")}
                />
        </Drawer.Navigator>
    );
    
  }

export default Home;