import {
    StyleSheet,
} from 'react-native';

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
        fontSize:18,
        marginLeft:8,
        marginTop:7
    },
    info_text:{
        fontSize:20,
        paddingBottom:10,
        textAlign:'left',
        alignSelf: 'stretch', 
    }
})

export default styles;