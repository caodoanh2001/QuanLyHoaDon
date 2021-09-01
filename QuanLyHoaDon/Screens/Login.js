import React, {Component} from 'react';
import { StyleSheet, Alert, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import { Card, FAB, CardItem, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

var background = require('../img/background.jpg');
var logo = require('../img/logo_full.png');
class Home extends Component {
    
    constructor(props){
      super(props)

      this.state = {
        username: '',
        password: '',
      }
    }

    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }

    _handlePress () {
        fetch("http://103.195.236.219:5000/login", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                username : this.state.username,
                password : this.state.password
            })
        }).then(res => res.json())
        .then((data) => {
          if (data.status === 'success') {
            Alert.alert(`Đăng nhập thành công`);
            this.props.navigation.navigate("Homepage", {username: this.state.username})
          }
          else {
            if (data.status === 'mis password') {
              Alert.alert(`Chưa nhập mật khẩu`);
            }
            else {
              if (data.status === 'mis username') {
                Alert.alert(`Chưa nhập tài khoản`);
              }
              else {
                if (data.status === 'wrong pass') {
                  Alert.alert(`Sai mật khẩu`);
                }
                else {
                  if (data.status === 'not register') {
                    Alert.alert(`Tài khoản này chưa đăng ký`);
                  }
                }
              }
            }
          }
        }).catch(err =>{
          console.log("error",err)
      })
    }
    
    render(){
      return (
        // <ImageBackground source = {background} style={{flex:1}}>
        <View style={styles.container}>
          {/* <Text style={styles.logo}>HOON</Text> */}
          <Image
                style={{
                    marginTop:-Dimensions.get('window').width*0.3,
                    width: Dimensions.get('window').width*0.6,
                    height: Dimensions.get('window').height*0.6,
                    marginBottom:-Dimensions.get('window').width*0.2,
                    resizeMode:'contain',
                }}
                source={logo}
            />
          <View style={styles.inputView} >
            <Icon style={styles.LoginIcon} name="user-circle" size={25} color="#3f3f3f" />
            <TextInput  
              style={styles.inputText}
              placeholder="Nhập tài khoản" 
              placeholderTextColor="#3f3f3f"
              onChangeText={text => this.setState({username:text})}/>
          </View>
          <View style={styles.inputView} >
          <Icon style={styles.LoginIcon} name="key" size={25} color="#3f3f3f" />
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Nhập mật khẩu" 
              placeholderTextColor="#3f3f3f"
              onChangeText={text => this.setState({password:text})}/>
          </View>
          <TouchableOpacity 
            onPress={() => this._handlePress()}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={styles.forgot}>Đăng ký</Text>
          </TouchableOpacity>
          <FAB
            style = {styles.fab}
            small = {false}
            icon = "information-variant"
            theme = {{colors:{accent:'blue'}}}
            onPress ={() => this.props.navigation.navigate("AboutMe")}
            />
          </View>
          // </ImageBackground>
        );
    }
}

export default Home

const styles = StyleSheet.create({

    LoginIcon: {
      padding: 10,
    },
    container: {
      flex: 1,
      // backgroundColor: '#1E90FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#808080",
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#DCDCDC",
      borderRadius:10,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputText:{
      flex:1, 
      height:50,
      color:"#3f3f3f",
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
    },
    forgot:{
      color:"#6495ED",
      fontSize:18,
      marginBottom:20,
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#8A2BE2",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"#F8F8FF",
      fontSize: 16,
    },
    fab: {
      backgroundColor: "#ffffff",
      position: 'absolute',
      margin: 16,
      right: 0,
      top: Dimensions.get('window').height*0.02
    },
  });