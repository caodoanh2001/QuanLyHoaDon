import React, { useState } from 'react';
import { View,Alert, Modal,ScrollView } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import styles from '../styles/styles_Receipt'

// var cloudinary = require('cloudinary');


const Receipt = ({navigation,route}) =>{
    const getDetails = (type) =>{
        if(route.params){
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
    const [picture, setPicture] = useState(getDetails("url_picture"))
    const [modal, setModal] = useState(false)

    const _submitData = () =>{

        fetch("http://5d58294789a7.ngrok.io/predict" , {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                url: picture
            })
        }).then(res_img => res_img.json())
        .then(data => {
            fetch("http://1197a2051678.ngrok.io/send-data", {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({
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
                console.log(data)
                Alert.alert(`Đã thêm hóa đơn "${data.name}" thành công`)
                navigation.navigate("Home")
            }).catch(err =>{
                console.log("error",err)
            })
        }).catch(err =>{
            console.log("error",err)
        })
    }

    const updateData = ()=>{
        fetch("http://1197a2051678.ngrok.io/update", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id : route.params._id,
                name : name,
                buyer : buyer,
            })
        }).then(res => res.json())
        .then(data =>{
            Alert.alert(`${data.name} được cập nhật thành công!!`)
            navigation.navigate("Home")
        }).catch(err =>{
            console.log("error",err)
        })
    }

    const _uploadImage = () => {
        const options ={
            title : 'Select Image',
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
                // console.log(source)
                handleUpdata(source)
            }
        })
    }

    const _takePhoto = () => {
        const options ={
            title : 'Select Image',
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
        const data = new FormData()
        data.append('file', photo)
        data.append("upload_preset", "receipt_imgs")
        data.append("cloud_name","cs-526-doanh-bc")
        data.append("api_key","885336143474268")
        data.append("api_secret", "BIaSxlwvuSjvu8KKBun2qvU9uOc")
        console.log(data)
        fetch("https://api.cloudinary.com/v1_1/cs-526-doanh-bc/image/upload",{
            method:'POST',
            body:data,
            headers:{
                'Accept':'application/json',
                'Content-Type':'multipart/form-data'
            }
        }).then(res => res.json())
        .then(data => {
            setPicture(data.url)
            setModal(false)
            console.log(data)
        }).catch(err => {
            Alert.alert(err.message)
        })
    }

    return(
        <ScrollView>
        <View style={styles.container}>
            <TextInput style = {{borderColor: "#000011"}}
                label='Tên hóa đơn'
                style={styles.input}
                value={name}
                theme = {theme}
                mode="outlined"
                onChangeText={text => setName( text )}
            />

            <TextInput style = {{borderColor: "#000011"}}
                label='Tên người mua'
                style={styles.input}
                value={buyer}
                theme = {theme}
                mode="outlined"
                onChangeText={text => setBuyer( text )}
            />

            <Button color="#4169e1" icon={picture == ""?"upload":"check-bold"} style={styles.input} mode="contained" onPress={() => setModal(true)}>
                Nhập ảnh hóa đơn
            </Button>

            {route.params?
                <Button color="#4169e1" icon="content-save" style={styles.input} mode="contained" onPress={() => updateData()}>
                    Cập nhật
                </Button>
                :
                <Button color = "#4169e1" icon="content-save" style={styles.input} mode="contained" onPress={() => _submitData()}>
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
                        <Button color = "#4169e1" icon="camera" style={styles.input} mode="contained" onPress={() => _takePhoto()}>
                            Chụp ảnh
                        </Button>
                        <Button color = "#4169e1" icon="folder-image" style={styles.input} mode="contained" onPress={() => _uploadImage()}>
                            Tải lên từ máy
                        </Button>
                    </View>
                    <Button color = "#4169e1" icon="cancel" style={styles.input} mode="contained" onPress={() => setModal(false)}>
                        Thoát
                    </Button>
                </View>

            </Modal>
        </View>
        </ScrollView>
    )
}

const theme = {
    colors: {  
      primary: 'red',
    },
  };

export default Receipt;