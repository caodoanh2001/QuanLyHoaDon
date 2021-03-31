import React, { Component } from 'react';
import { View, Image,Text,Linking,Platform, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from '../styles/styles_info'
import config from '../configs/config'

const Info = (props)=>{

    const {_id,name,buyer,picture, seller, address, timestamp, totalcost} = props.route.params.item;
    console.log(_id)
    const deleteEmployee = () =>{
        fetch("http://1197a2051678.ngrok.io/delete",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id : _id
            })
        }).then(res => res.json())
        .then(deleteEmp => {
            Alert.alert(`${deleteEmp.name} xóa hóa đơn thành công!`)
        }).catch(err =>{
            console.log("ERROR",err)
        })
    }
    const AlertDelete = () =>
    Alert.alert(
      "Thông báo",
      "Bạn có chắc muốn xóa hóa đơn này?",
      [
        {
          text: "Thoát",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {deleteEmployee(), props.navigation.navigate("Home")}}
      ],
      { cancelable: false }
    );

    return(
        <View style={styles.container}>
             <LinearGradient colors={['#70B1FD', '#3b5998']}
              style={styles.linearGradient}
             />
             <View style={{alignItems:"center"}}>
                 {/* <Image
                   source={{uri:picture}}
                   style={styles.img}
                 /> */}
             </View>
             <View style={{alignItems:"center"}}>
                 <Title style = {{paddingBottom:10}}>Tên hóa đơn: {name}</Title>
                 <Button color = "#4169e1" icon="eye" mode="contained" onPress={() => {props.navigation.navigate("ViewImage",{picture})}}>
                    Xem ảnh
                </Button>
                 <Text style={{
                     paddingTop:10,
                     fontSize:20,
                     paddingBottom:10,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingLeft: config.deviceWidth * 0.1
                     }}>Người mua: {buyer}</Text>
                 <Text style={{
                     fontSize:20,
                     paddingBottom:10,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingLeft: config.deviceWidth * 0.1
                     }}>Tên cửa hàng: {seller}</Text>
                 <Text style={{
                     fontSize:20,
                     paddingBottom:10,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingLeft: config.deviceWidth * 0.1
                     }}>Địa chỉ: {address}</Text>
                 <Text style={{
                     fontSize:20,
                     paddingBottom:10,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingLeft: config.deviceWidth * 0.1
                     }}>Thời gian: {timestamp}</Text>
                 <Text style={{
                     fontSize:20,
                     paddingBottom:10,
                     textAlign:'left',
                     alignSelf:'stretch', 
                     paddingLeft: config.deviceWidth * 0.1
                     }}>Tổng tiền: {totalcost}</Text>
             </View>

             <View style={{flexDirection:'row',padding:10,justifyContent:'space-around'}}>
                <Button color = "#4169e1" icon="account-edit" mode="contained" onPress={() => {props.navigation.navigate("Create",
                {_id,name,buyer,picture})}}>
                    Chỉnh sửa
                </Button>
                <Button color = "#4169e1" icon="delete" mode="contained" onPress={() => AlertDelete()}>
                    Xóa
                </Button>
             </View>
        </View>
    )
}

export default Info;