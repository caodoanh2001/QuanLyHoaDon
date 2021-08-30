import React, { Component } from 'react';
import { View, Image,Text,Linking,Platform, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from '../styles/styles_AboutMe';
import config from '../configs/config'
import { Dimensions } from 'react-native';

var logo = require('../img/logo.png')
const AboutMe = (props)=>{
    return(
        <View style = {styles.container}>
            <LinearGradient colors={['#70B1FD', '#3b5998']}
              style={styles.linearGradient}
            />

            <View style={{alignItems:"center"}}>
                {/* <Image
                    style={{
                        width: Dimensions.get('window').width*0.3,
                        height: Dimensions.get('window').height*0.3,
                        resizeMode:'contain'
                    }}
                    source={logo}
                /> */}
                 <Title style = {{paddingBottom:10}}>Đồ án môn học CS526.L21</Title>
                 {/* <Image></Image> */}
                 <Text style={{
                     paddingTop:10,
                     fontSize:20,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingLeft: config.deviceWidth * 0.1
                     }}>1. Bùi Cao Doanh</Text>
                 <Text style={{
                     fontSize:15,
                     paddingTop:10,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingBottom:10,
                     paddingLeft: config.deviceWidth * 0.1}}>
                     Email: 19521366@gm.uit.edu.vn
                 </Text>
                 <Text style={{
                     fontSize:20,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingLeft: config.deviceWidth * 0.1
                     }}>2. Nguyễn Như Long</Text>
                 <Text style={{
                     fontSize:15,
                     paddingTop:10,
                     paddingBottom:10,
                     textAlign:'left',
                     alignSelf:'stretch',
                     paddingLeft: config.deviceWidth * 0.1}}>
                     Email: 19521790@gm.uit.edu.vn
                 </Text>
                 <Text style={{
                     fontSize:20,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingLeft: config.deviceWidth * 0.1
                     }}>3. Phan Lê Phú </Text>
                 <Text style={{
                     fontSize:15,
                     paddingTop:10,
                     paddingBottom:10,
                     textAlign:'left',
                     alignSelf:'stretch',
                     paddingLeft: config.deviceWidth * 0.1}}>
                     Email: 18521247@gm.uit.edu.vn
                 </Text>
                 <Text style={{
                     fontSize:20,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingLeft: config.deviceWidth * 0.1
                     }}>4. Trần Văn Thục </Text>
                 <Text style={{
                     fontSize:15,
                     paddingTop:10,
                     paddingBottom:10,
                     textAlign:'left',
                     alignSelf:'stretch',
                     paddingLeft: config.deviceWidth * 0.1}}>
                     Email: 18521474@gm.uit.edu.vn
                 </Text>
             </View>
        </View>
    )
}

export default AboutMe