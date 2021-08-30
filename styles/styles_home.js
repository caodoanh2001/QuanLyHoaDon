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
        borderRadius: 18,
    },
    text:{
        fontSize:16,
        marginLeft:10,
        paddingTop:5,
        fontFamily: 'Roboto'
    },
    fab: {
        backgroundColor: "#ffffff",
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fab_about: {
        backgroundColor: "#ffffff",
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 80,
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