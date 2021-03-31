import React, { Component } from 'react';
import { View, Image,Text,Linking,Platform, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles_ViewImage'


const ViewImage = (props)=>{

    const picture = props.route.params.picture
    return(
        <View style = {styles.container}>
            <Image style={{flex:1}}
                source={{uri:picture}}/>
        </View>
    )
}

export default ViewImage