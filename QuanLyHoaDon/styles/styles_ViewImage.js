import {
    StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{
        margin:6,
    },
    buttonModalView:{
        flexDirection:'row',
        padding:10,
        justifyContent:'space-around',
        backgroundColor:'white',
    },
    modalView:{
        position:'absolute',
        bottom:2,
        width:'100%',
        height:120,
    }
})

export default styles