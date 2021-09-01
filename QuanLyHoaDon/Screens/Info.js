import React, { Component, useState } from 'react';
import { View, Image,Text,Linking,Platform, Alert, ImageBackground, TouchableOpacity, TouchableHighlight  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import styles from '../styles/styles_info'
import config from '../configs/config'
import ViewImage from '../Screens/ViewImage';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';

var background = require('../img/background.jpg');
var logo = require('../img/logo.png');

const Info = (props)=>{

    const { _id,name, buyer, picture, seller, address, timestamp, totalcost } = props.route.params.item;
    // console.log(_id)
    const deleteReceipt = () =>{
        fetch("http://103.195.236.219:5000/delete",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id : _id,
                username : props.route.params.username
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
        { text: "OK", onPress: () => {deleteReceipt(), props.navigation.navigate("Homepage")}}
      ],
      { cancelable: false }
    );
    
    const images = [{
            url: picture,
        }]
    
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };

    return(
        <View style={styles.container}>
             {/* <LinearGradient colors={['#8A2BE2', '#4B0082']}
              style={styles.linearGradient}
             /> */}

            <TouchableHighlight style={{width: config.deviceWidth, height: config.deviceHeight*0.3}} onPress={() => toggleModal()}>
                <Image source={{uri:picture}} style={{flex: 1}}/>
            </TouchableHighlight>
        
            <ImageBackground source = {background} style={{flex:1}}>

                <Modal 
                    style={styles.PopupModal}
                    visible={isModalVisible} 
                    transparent={true}
                    onBackdropPress={() => toggleModal()}>
                    <ImageViewer imageUrls={images}/>
                </Modal>

                <View style={{alignItems:"center"}}>
                    <Title style = {{paddingBottom:10}}>Hóa đơn {name == 'market' ? 'Đi chợ' : name =='coffee' ? 'Cà phê' : 'Khác'}</Title>
                    {/* <Button color = "#8A2BE2" icon="eye" mode="contained" onPress={() => {props.navigation.navigate("ViewImage",{picture})}}>
                        Xem ảnh
                    </Button> */}
                    
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.text}>Tên cửa hàng:</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.text_info}>{seller}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.text}>Địa chỉ:</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.text_info}>{address}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.text}>Thời gian:</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.text_info}>{timestamp}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.text}>Tổng tiền:</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.text_info}>{totalcost}</Text>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection:'row',padding:10,justifyContent:'space-around'}}>
                    <Button color = "#8A2BE2" icon="account-edit" mode="contained" onPress={() => {props.navigation.navigate("Create",
                    {_id,name,buyer,picture,seller,address,timestamp,totalcost,edit:1,username:props.route.params.username})}}>
                        Chỉnh sửa
                    </Button>
                    <Button color = "#8A2BE2" icon="delete" mode="contained" onPress={() => AlertDelete()}>
                        Xóa
                    </Button>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Info;