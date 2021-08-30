import React from 'react';
import { View, Text, ImageBackground, Image, Dimensions } from 'react-native';

var background = require('../img/background.jpg');
var logo = require('../img/logo_full.png');

class Loading extends React.Component {
    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        )
    }

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();
        console.log(data)
        if (data !== null) {
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        return (
        // <ImageBackground source = {background} style={{flex:1}}>
        <View style={styles.viewStyles}>
            {/* <Text style={styles.textStyles}>
            HOON
            </Text> */}
            <Image
                style={{
                    width: Dimensions.get('window').width*0.7,
                    height: Dimensions.get('window').height*0.7,
                    resizeMode:'contain'
                }}
                source={logo}
            />
        </View>
        // </ImageBackground>
        );
    }
}

const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'orange'
    },
    textStyles: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold'
    }
}
export default Loading;