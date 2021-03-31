import React, { createContext,useReducer } from 'react';
import { View,StyleSheet } from 'react-native';
import Home from './Screens/Home';
import Receipt from './Screens/Receipt';
import Info from './Screens/Info';
import ViewImage from './Screens/ViewImage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from './reducers/reducer'

const store  = createStore(reducer)

// export const MyContext = createContext()
const Drawer = createDrawerNavigator();
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
            name="Home" 
            component={Home} 
            options={myOptions}
          />
          <Stack.Screen 
            name="Create" 
            component={Receipt} 
            options={{...myOptions, title:"Thêm mới hóa đơn"}}
          />
          <Stack.Screen 
            name="Receipt_info" 
            component={Info}
            options={{...myOptions, title:"Thông tin hóa đơn"}}
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
