import {
    StyleSheet,
} from 'react-native';

import config from '../configs/config'

const styles = StyleSheet.create({
    linearGradient:{
        height:'20%'
    },
    container:{
        flex:1
    },
    img:{
        height:140,
        width:140,
        borderRadius:140/2,
        marginTop:-50
    },
    viewCard:{
       flexDirection:"row"
    },
    myCard:{
        margin:6,
        height:45
    },
    icon:{
        fontSize:32,
        marginLeft:10,
        marginTop:5,
        color:'blue'
    },
    text:{
        paddingTop:10,
        fontSize:20,
        paddingBottom:10,
        textAlign:'left',
        alignSelf:'stretch', 
        paddingLeft: config.deviceWidth * 0.02,
    },
    text_info:{
        paddingTop:10,
        fontSize:20,
        paddingBottom:5,
        alignSelf:'stretch', 
        textAlign: 'right',
        paddingRight: config.deviceWidth * 0.02,
        fontWeight: "bold"
    },
    info_text:{
        fontSize:20,
        paddingBottom:10,
        textAlign:'left',
        alignSelf: 'stretch', 
    },
    PopupModal: {
        borderRadius: 20,
        marginTop:config.deviceHeight*0.1,
        marginBottom:config.deviceHeight*0.1,
      },
})

export default styles;