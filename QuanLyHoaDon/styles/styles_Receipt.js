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
        // backgroundColor:'white',
    },
    modalView:{
        position:'absolute',
        bottom:2,
        width:'100%',
        height:120,
        backgroundColor:'#6495ED'
    },
    select:{
        borderColor: "#20B2AA", 
        borderWidth: 2, 
        margin:6
    }
})

export default styles