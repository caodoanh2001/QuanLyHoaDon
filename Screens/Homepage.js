import React, { useEffect,useContext,useState,Component } from 'react';
import { View,Text,Image, FlatList, ImageBackground, Alert, DrawerContentScrollView, DrawerItemList, DrawerItem, DeviceInfo, ActivityIndicator } from 'react-native';
import { Card, FAB, CardItem, Portal} from 'react-native-paper';
import styles from '../styles/styles_home'
import { SearchBar } from 'react-native-elements';


var background = require('../img/background.jpg');
var logo = require('../img/logo.png');

class Homepage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false,
        };
    
        this.arrayholder = [];
    }
  
    componentDidMount() {
        this.makeRemoteRequest();
    }
  
    makeRemoteRequest = () => {
        // console.log('Username', this.props.route.params.username)
        const url = `http://103.195.236.219:5000/get_user`;
        // const url = `http://103.195.236.219:3000`;
        this.setState({ loading: true });
    
        fetch(url, {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                username : this.props.route.params.username
            }
            )})
        // fetch(url)
        .then(res => res.json())
        .then(res => {
            this.setState({
                data: res.receipts,
                error: res.error || null,
                loading: false,
                refreshing: false,
            });
            this.arrayholder = res.receipts;
        })
        .catch(error => {
            this.setState({ error, loading: false, refreshing: false });
        });
    };
    
    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true,
            seed: this.state.seed + 1, 
        }, () => {
            this.makeRemoteRequest();
        })
    }

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '86%',
            backgroundColor: '#CED0CE',
            marginLeft: '14%',
          }}
        />
      );
    };
  
    searchFilterFunction = text => {
        this.setState({
            value: text,
        });
    
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name_show.toUpperCase()} 
                                ${item.seller.toUpperCase()} 
                                ${item.buyer.toUpperCase()} 
                                ${item.timestamp.toUpperCase()} 
                                ${item.address.toUpperCase()}`;
            const textData = text.toUpperCase();
    
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };
  
    renderHeader = () => {
      return (
        <SearchBar
            placeholder="Tìm hóa đơn"
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
      />
      );
    };

    render() {
        if (this.state.loading) {
            return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
            );
        }

        // console.log(this.state.data)
        // const username = this.props.route.params.username
        return (
            <ImageBackground source = {background} style={{flex:1}}>
                <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <Card style={styles.myCard} onPress={() => {this.props.navigation.navigate("Receipt_info",{ item, username: this.props.route.params.username})}}>
                            <View 
                                key={item._id}
                                style={styles.cardViews}>
                                <Image style={{width:80,height:100,borderRadius:5}}
                                source={{uri:item.picture}}/>
                                <View>
                                    <Text style={styles.text}>Hóa đơn: {item.name_show}</Text>
                                    <Text style={styles.text}>Người mua: {item.buyer}</Text>
                                    <Text style={styles.text}>Tổng tiền: {item.totalcost}</Text>
                                </View>
                            </View>
                        </Card>
                    )}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={this.renderHeader}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
                {/* <FAB
                    style = {styles.fab}
                    small = {false}
                    icon = "plus"
                    theme = {{colors:{accent:'blue'}}}
                    onPress ={() => this.props.navigation.navigate("Create", {username: this.props.route.params.username})}
                /> */}
                <FAB.Group
                    color="purple"
                    open={this.state.open}
                    icon={this.state.open ? 'chevron-up' : 'chevron-up'}
                    actions={[
                        { icon: "account-supervisor-outline", label: 'Người dùng', onPress: () => this.props.navigation.navigate("Profile", {username: this.props.route.params.username})},
                        { icon: "location-exit", label: 'Đăng xuất', onPress: () => this.props.navigation.navigate("Home")},
                        { icon: "image-plus", label: 'Thêm ảnh mới', onPress: () => this.props.navigation.navigate("Create", {username: this.props.route.params.username})},
                        // { icon: 'plus', label: 'Email', onPress: () => console.log('Pressed email') },
                        // { icon: 'plus', label: 'Remind', onPress: () => console.log('Pressed notifications') },
                    ]}
                    onStateChange={({ open }) => this.setState({ open })}
                    onPress={() => {
                        if (this.state.open) {
                        // do something if the speed dial is open
                        }
                }}
                />
                </View>
            </ImageBackground>
        );
    }
}

export default Homepage;