import React, { createContext,useReducer } from 'react';
import { View,StyleSheet } from 'react-native';
import Homepage from './Screens/Homepage';
import Receipt from './Screens/Receipt';
import Info from './Screens/Info';
import ViewImage from './Screens/ViewImage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from './reducers/reducer'
import AboutMe from './Screens/AboutMe';
import Home from './Screens/Login'
import Register from './Screens/Register'
import Profile from './Screens/Profile';
import Loading from './Screens/Loading';
import ChangePass from './Screens/ChangePass';

const store  = createStore(reducer)
const Stack = createStackNavigator();


const myOptions = {
  title:"Quản lý hóa đơn v1.0",
  headerTintColor:"#333",
  headerStyle:{
    backgroundColor:"white"
  }
}

function App(){
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen 
          name="Loading" 
          component={Loading} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={myOptions}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{...myOptions, title:"Đăng ký"}}
        />
        <Stack.Screen 
          name="ChangePass" 
          component={ChangePass} 
          options={{...myOptions, title:"Đổi mật khẩu"}}
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{...myOptions, title:"Người dùng"}}
        />
        <Stack.Screen 
          name="Homepage" 
          component={Homepage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Create" 
          component={Receipt} 
          options={{...myOptions, title:"Thêm mới hóa đơn"}}
        />
        <Stack.Screen 
          name="Receipt_info" 
          component={Info}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AboutMe" 
          component={AboutMe}
          options={{...myOptions, title:"Về chúng tôi"}}
        />
        <Stack.Screen 
          name="ViewImage" 
          component={ViewImage}
          options={{...myOptions, title:"Xem hóa đơn"}}
        />
      </Stack.Navigator>
    </View>
  );
}

  
export default ()=>{
  return (
    <Provider store={store}>
    <NavigationContainer>
      <App/>
    </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#ddd'
  }
})