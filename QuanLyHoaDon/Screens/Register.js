import React, {Component} from 'react';
import { StyleSheet, Alert, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

var logo = require('../img/logo_full.png');
class Register extends Component {
    
    constructor(props){
      super(props)

      this.state = {
        username: '',
        password: '',
        password2: '',
      }
    }

    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }

    _handlePress () {
        fetch("http://103.195.236.219:5000/register", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                username : this.state.username,
                password : this.state.password,
                password2 : this.state.password2
            })
        }).then(res => res.json())
        .then((data) => {
          if (data.status === 'done') {
            Alert.alert(`Đăng ký thành công`);
            this.props.navigation.navigate("Home")
          }
          else {
            if (data.status === 'mis username') {
              Alert.alert(`Bạn ơi chưa nhập tài khoản`);
            }
            else {
              if (data.status === 'mis pass') {
                Alert.alert(`Chưa nhập đủ pass`);
              }
              else {
                if (data.status === 'mis match') {
                    Alert.alert(`Hai mật khẩu không giống nhau`);
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
            <TextInput  
              style={styles.inputText}
              placeholder="Nhập tài khoản" 
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({username:text})}/>
          </View>
          <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Nhập mật khẩu" 
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({password:text})}/>
          </View>
          <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Nhập lại mật khẩu" 
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({password2:text})}/>
          </View>
          <TouchableOpacity 
            onPress={() => this._handlePress()}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
    
        </View>
        // </ImageBackground>
        );
    }
}

export default Register

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