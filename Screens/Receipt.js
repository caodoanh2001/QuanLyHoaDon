import React, { useState } from 'react';
import { View,Alert, Modal,ScrollView, ImageBackground } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import styles from '../styles/styles_Receipt'
import RNPickerSelect from 'react-native-picker-select';

var background = require('../img/background.jpg');
var logo = require('../img/logo.png');

const Receipt = ({navigation, route}) =>{
    // Thông tin hóa đơn
    const getDetails = (type) =>{
        if (route.params) {
            switch(type){
                case "name_receipt":
                    return route.params.name
                case "name_buyer":
                    return route.params.buyer
                case "url_picture":
                    return route.params.picture
                case "seller":
                    return route.params.seller
                case "address":
                    return route.params.address
                case "timestamp":
                    return route.params.timestamp
                case "totalcost":
                    return route.params.totalcost
            }
        }
        return ""
    }
    const [name, setName] = useState(getDetails("name_receipt"))
    const [buyer, setBuyer] = useState(getDetails("name_buyer"))
    const [seller, setSeller] = useState(getDetails("seller"))
    const [address, setAddress] = useState(getDetails("address"))
    const [timestamp, setTimestamp] = useState(getDetails("timestamp"))
    const [totalcost, setTotalcost] = useState(getDetails("totalcost"))
    const [picture, setPicture] = useState(getDetails("url_picture"))
    const [modal, setModal] = useState(false)
    
    const _submitData = () =>{
        fetch("http://103.195.236.219:3000/predict" , {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                url: picture
            })
        }).then(res_img => res_img.json())
        .then(data => {
            fetch("http://103.195.236.219:5000/send-data", {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({
                    username: route.params.username,
                    name : name,
                    buyer : buyer,
                    picture : picture,
                    seller : data.seller,
                    address : data.address,
                    timestamp: data.timestamp,
                    totalcost : data.totalcost
                })
            }).then(res => res.json())
            .then(data =>{
                Alert.alert(`Đã thêm hóa đơn thành công`)
                navigation.navigate("Homepage", {username: route.params.username})
            }).catch(err =>{
                console.log("error",err)
            })
        }).catch(err =>{
            console.log("error",err)
        })
    }

    const updateData = ()=>{
        fetch("http://103.195.236.219:5000/update", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                username : route.params.username,
                id : route.params._id,
                name : name,
                buyer : buyer,
                picture : picture,
                seller : seller,
                address : address,
                timestamp : timestamp,
                totalcost : totalcost,
            })
        }).then(res => res.json())
        .then(data =>{
            Alert.alert(`${data.name} được cập nhật thành công!!`)
            navigation.navigate("Homepage")
        }).catch(err =>{
            console.log("error",err)
        })
    }

    const _uploadImage = () => {
        const options ={
            title : 'Chọn ảnh',
            storageOptions: {
                skipBackup: true,
                path:'_ImageReceipt'
            }
        }
        ImagePicker.launchImageLibrary(options,(response) =>{
            console.log('Response=', response);
            if(response.didCancel){
                console.log("User cancelled image picker");
            }else if(response.error){
                console.log("Image Picker Error",response.error);
            }else{
                const uri = response.uri
                const type = "image/jpg"
                const name = response.fileName
                const source = {uri,type,name}
                handleUpdata(source)
            }
        })
    }

    const _takePhoto = () => {
        const options ={
            title : 'Chọn ảnh',
            storageOptions: {
                skipBackup: true,
                path:'CS526_OCR'
            }
        }
        ImagePicker.launchCamera(options,(response) =>{
            console.log('Response=',response);
            if(response.didCancel){
                console.log("User cancelled image picker");
            }else if(response.error){
                console.log("Image Picker Error",response.error);
            } else{
                const uri = response.uri
                const type = "image/jpg"
                const name = response.fileName
                const source = {uri,type,name}
                handleUpdata(source)
            }
        })
    }

    const handleUpdata = (photo) => {
        console.log('Vào đây')
        const data = new FormData()
        data.append('file', photo)
        data.append("upload_preset", "receipt_imgs")
        data.append("cloud_name", "cs-526-doanh-bc")
        data.append("api_key", "885336143474268")
        data.append("api_secret", "BIaSxlwvuSjvu8KKBun2qvU9uOc")
        console.log('Tới đây')
        fetch("https://api.cloudinary.com/v1_1/cs-526-doanh-bc/image/upload", {
            method:"post",
            body:data
        }).then(res => res.json())
        .then(data => {
            setPicture(data.url)
            setModal(false)
        }).catch(err => {
            Alert.alert("Lỗi upload ảnh")
        })
    }

    return(
        <ImageBackground source = {background} style={{flex:1}}>
        <ScrollView>
        <View style={styles.container}>
            <View style = {{
                    borderColor: "black", 
                    borderWidth: 1, 
                    margin:6,
                    backgroundColor:"white",
                    borderRadius: 5
                }}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Chọn loại hóa đơn',
                        value: null,
                    }}
                    onValueChange={(value) => setName(value)}
                    items={[
                        { label: 'Đi chợ', value: 'market' },
                        { label: 'Đi cà phê', value: 'coffee' },
                        { label: 'Khác', value: 'others' },
                    ]}
                />
            </View>

            {/* <TextInput style = {{borderColor: "#20B2AA"}}
                label = 'Tên hóa đơn'
                style = {styles.input}
                value = {name}
                theme = {theme}
                mode="outlined"
                onChangeText={text => setName( text )}
            /> */}

            <TextInput style = {{borderColor: "#20B2AA"}}
                label = 'Tên người mua'
                style = {styles.input}
                value = {buyer}
                theme = {theme}
                mode = "outlined"
                onChangeText={text => setBuyer( text )}
            />

            <TextInput style = {{borderColor: "#20B2AA"}}
                label = 'Tên cửa hàng'
                style = {styles.input}
                value = {seller}
                theme = {theme}
                mode = "outlined"
                onChangeText={text => setSeller( text )}
            />

            <TextInput style = {{borderColor: "#20B2AA"}}
                label = 'Địa chỉ'
                style = {styles.input}
                value = {address}
                theme = {theme}
                mode = "outlined"
                onChangeText={text => setAddress( text )}
            />

            <TextInput style = {{borderColor: "#20B2AA"}}
                label = 'Thời gian'
                style = {styles.input}
                value = {timestamp}
                theme = {theme}
                mode = "outlined"
                onChangeText={text => setTimestamp( text )}
            />

            <TextInput style = {{borderColor: "#20B2AA"}}
                label = 'Tổng tiền'
                style = {styles.input}
                value = {totalcost}
                theme = {theme}
                mode = "outlined"
                onChangeText={text => setTotalcost( text )}
            />

            <Button color="#8A2BE2" icon={picture == "" ? "upload" : "check-bold"} style={styles.input} mode="contained" onPress={() => setModal(true)}>
                Nhập ảnh hóa đơn
            </Button>

            {route.params.edit?
                <Button color="#8A2BE2" icon="content-save" style={styles.input} mode="contained" onPress={() => updateData()}>
                Cập nhật
                </Button>
                :
                <Button color = "#8A2BE2" icon="content-save" style={styles.input} mode="contained" onPress={() => _submitData()}>
                Lưu
                </Button>
            }
            <Modal
             animationType='slide'
             transparent={true}
             visible={modal}
             onRequestClose= {() => {setModal(false)}}
            >
                <View style={styles.modalView}>
                    <View style={styles.buttonModalView}>
                        <Button color = "#8A2BE2" icon="camera" style={styles.input} mode="contained" onPress={() => _takePhoto()}>
                            Chụp ảnh
                        </Button>
                        <Button color = "#8A2BE2" icon="folder-image" style={styles.input} mode="contained" onPress={() => _uploadImage()}>
                            Tải lên từ máy
                        </Button>
                    </View>
                    <Button color = "#8A2BE2" icon="cancel" style={styles.input} mode="contained" onPress={() => setModal(false)}>
                        Thoát
                    </Button>
                </View>

            </Modal>
        </View>
        </ScrollView>
        </ImageBackground>
    )
}

const theme = {
    colors: {  
      primary: '#20B2AA',
    },
  };

export default Receipt;