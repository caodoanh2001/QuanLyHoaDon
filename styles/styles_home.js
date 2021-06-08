import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    myCard:{
        flex: 1,
        margin:7,
        borderRadius:5
    },
    cardViews:{
        flexDirection:'row',
        backgroundColor: '#fff',
        borderRadius: 16,
    },
    text:{
        fontSize:20,
        marginLeft:10,
        paddingTop:5
    },
    fab: {
        backgroundColor: "#ffffff",
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        // borderColor = '#009688'
    }
})

export default styles;