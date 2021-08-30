import React, {Component} from 'react';
import { StyleSheet, Alert, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

var logo = require('../img/logo.png')
var background = require('../img/background.jpg');
class ChangePass extends Component {
    
    constructor(props){
      super(props)

      this.state = {
        password_old: '',
        password: '',
        password2: '',
      }
    }

    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }

    _handlePress () {
        fetch("http://103.195.236.219:5000/changepass", {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                username: this.props.route.params.username,
                password_old : this.state.password_old,
                password : this.state.password,
                password2 : this.state.password2
            })
        }).then(res => res.json())
        .then((data) => {
          if (data.status === 'done') {
            Alert.alert(`Đổi mật khẩu thành công`);
            this.props.navigation.navigate("Home")
          }
          else {
                if (data.status === 'wrong pass') {
                    Alert.alert(`Sai mật khẩu cũ`);
                }
                else {
                    if (data.status === 'mis oldpass') {
                    Alert.alert(`Bạn ơi chưa nhập mật khẩu cũ`);
                    }
                    else {
                        if (data.status === 'mis pass') {
                            Alert.alert(`Chưa nhập đủ hai mật khẩu`);
                        }
                        else {
                            if (data.status === 'mis match') {
                                Alert.alert(`Hai mật khẩu không giống nhau`);
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
        <ImageBackground source = {background} style={{flex:1}}>
          <View style={styles.container}>
            <Text style={styles.logo}>Đổi mật khẩu</Text>
            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Nhập mật khẩu cũ" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({password_old:text})}/>
            </View>
            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Nhập mật khẩu mới" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({password:text})}/>
            </View>
            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Nhập lại mật khẩu mới" 
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({password2:text})}/>
            </View>
            <TouchableOpacity 
              onPress={() => this._handlePress()}
              style={styles.loginBtn}>
              <Text style={styles.loginText}>ĐỒNG Ý</Text>
            </TouchableOpacity>
      
          </View>
        </ImageBackground>
        );
    }
}

export default ChangePass

const styles = StyleSheet.create({
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
    backgroundColor:"#F0F8FF",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#000000"
  },
  forgot:{
    color:"#808080",
    fontSize:20,
    marginBottom:20,
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#F0F8FF",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"#808080"
  }
});