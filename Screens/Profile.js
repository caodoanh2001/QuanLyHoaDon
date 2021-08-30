import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Alert
} from 'react-native';
import config from '../configs/config'
import Pie from 'react-native-pie'
import { Card, FAB, CardItem, Portal, Button} from 'react-native-paper';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import {
  LineChart,
} from "react-native-chart-kit";

var background = require('../img/background.jpg');
var background_user = require('../img/background_user.jpg');

class Profile extends Component {
    _handlePress_ChangePass () {
      this.props.navigation.navigate("ChangePass", {username: this.props.route.params.username})
    }

    constructor(props) {
        super(props);
        this.state = {
          url_avatar: 'https://lh3.googleusercontent.com/proxy/1MvI48lp6tndS6LTGUBjTlRMMrCmWWCAqyau7fBPqfcbSc4pjUSFP_aDB036Ixxt3jSwMO-dXtOrq7-LkQh3hUzvBMchWXY',
          url_cover: 'https://tuyensinh.uit.edu.vn/sites/default/files/uploads/images/201803/uit_dsc_0002_1-1.jpg',
          refreshing: false,
          loading: false,
          data: [
              {id: 1, image: require('../img/change-pass.png'), username:"Đổi mật khẩu"},
              {id: 2, image: require('../img/change-ava.png'), username:"Đổi avatar"},
              {id: 3, image: require('../img/statistic.png'), username:"Thống kê hóa đơn"},
          ],
          isModalVisible: false,
          isModalVisibleProfile: false,
          isModalVisibleUpdateAvatar: false,
          isModalVisibleUpdateCover: false,
          query_day: '',
          query_month: '',
          query_year: '',
          total_receipts: '',
          total_cost: '',
          percentage_market: 1,
          percentage_coffee: 1,
          percentage_others: 1,
          data_bar_chart: {
            labels: ["Tháng 1"],
            datasets: [
              {
                data: [20],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
              }
            ],
            legend: ["Tổng tiền"] // optional
          },
          chartConfig: {
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          },
        };

    }

    componentDidMount() {
      this._getInfoUser();
      this._getInfoBarChart();
      this._getAvatar();
      this._getCover();
    }

    _clickModal () {
      this.setState({isModalVisible: !this.state.isModalVisible})
    }

    _clickModalProfile () {
      this.setState({isModalVisibleProfile: !this.state.isModalVisibleProfile})
    }

    _clickModalUpdateAvatar () {
      this.setState({isModalVisibleUpdateAvatar: !this.state.isModalVisibleUpdateAvatar})
    }

    _clickModalUpdateCover () {
      this.setState({isModalVisibleUpdateCover: !this.state.isModalVisibleUpdateCover})
    }

    _handleModal() {
        // Set về mặc định
        fetch("http://103.195.236.219:5000/query", {
          method:'POST',
          headers:{
              'Content-Type' : 'application/json'
          },
          body:JSON.stringify({
              username: this.props.route.params.username,
              query_day : this.state.query_day,
              query_month : this.state.query_month,
              query_year : this.state.query_year,
          })
        }).then(res => res.json())
        .then(data => {
          this.setState({total_receipts: data.total_receipts})
          this.setState({total_cost: data.total_cost})
          this.setState({percentage_market: parseInt(data.market)})
          this.setState({percentage_coffee: parseInt(data.coffee)})
          this.setState({percentage_others: parseInt(data.others)})
        }).catch(err => {
            Alert.alert("Lỗi truy xuất thông tin người dùng")
        })

        this.setState({query_day: ''})
        this.setState({query_month: ''})
        this.setState({query_year: ''})

        this.setState({isModalVisible: !this.state.isModalVisible})
    }

    _getInfoUser() {
      // lay thong tin 
      fetch("http://103.195.236.219:5000/query", {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            username: this.props.route.params.username,
            query_day : '',
            query_month : '',
            query_year : '',
        })
      }).then(res => res.json())
      .then(data => {
        this.setState({total_receipts: data.total_receipts})
        this.setState({total_cost: data.total_cost})
        this.setState({percentage_market: parseInt(data.market)})
        this.setState({percentage_coffee: parseInt(data.coffee)})
        this.setState({percentage_others: parseInt(data.others)})
      }).catch(err => {
          Alert.alert("Lỗi truy xuất thông tin người dùng")
      })
    }

    _getInfoBarChart() {
      // lay thong tin bar chart
      fetch("http://103.195.236.219:5000/chart", {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'},
            body:JSON.stringify({
              username: this.props.route.params.username,
          })
      }).then(res => res.json())
      .then(data => {
        let new_data_bar_chart = {
          labels: data.labels,
          datasets: [
            {
              data: data.final_queries,
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
              strokeWidth: 2 // optional
            }
          ],
          legend: ["Tổng tiền"] // optional
        }
        this.setState({data_bar_chart: new_data_bar_chart})
      }).catch(err => {
          Alert.alert("Lỗi truy xuất thông tin người dùng")
      })
    }

    _getAvatar() {
      fetch("http://103.195.236.219:5000/getavatar", {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'},
            body:JSON.stringify({
              username: this.props.route.params.username,
          })
        }).then(res => res.json())
        .then(data => {
          this.setState({url_avatar: data.img_url})
        }).catch(err => {
            Alert.alert("Lỗi truy xuất thông tin người dùng")
        })
    }

    _getCover() {
      fetch("http://103.195.236.219:5000/getcover", {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'},
            body:JSON.stringify({
              username: this.props.route.params.username,
          })
        }).then(res => res.json())
        .then(data => {
          this.setState({url_cover: data.img_url})
        }).catch(err => {
            Alert.alert("Lỗi truy xuất thông tin người dùng")
        })
    }

    _uploadImage = (type_img) => {
      const options ={
          title : 'Chọn ảnh',
          storageOptions: {
              skipBackup: true,
              path:'_ImageReceipt'
          }
      }
      ImagePicker.launchImageLibrary(options,(response) =>{
          console.log('Response=', response);
          if(response.didCancel){
              console.log("User cancelled image picker");
          } else if(response.error){
              console.log("Image Picker Error",response.error);
          } else{
              const uri = response.uri
              const type = "image/jpg"
              const name = response.fileName
              const source = {uri,type,name}
              if (type_img == 'avatar')
                this.handleUpdata(source)
              else
                this.handleUpdata_cover(source)
          }
      })
    }

    _takePhoto = (type_img) => {
        const options ={
            title : 'Chọn ảnh',
            storageOptions: {
                skipBackup: true,
                path:'CS526_OCR'
            }
        }

        ImagePicker.launchCamera(options,(response) =>{
            console.log('Response=',response);
            if (response.didCancel){
                console.log("User cancelled image picker");
            } else if(response.error){
                console.log("Image Picker Error",response.error);
            } else{
                const uri = response.uri
                const type = "image/jpg"
                const name = response.fileName
                const source = {uri,type,name}
                if (type_img == 'avatar')
                  this.handleUpdata(source)
                else
                  this.handleUpdata_cover(source)
            }
        })
    }

    handleUpdata = (photo) => {
        const data = new FormData()
        data.append('file', photo)
        data.append("upload_preset", "receipt_imgs")
        data.append("cloud_name", "cs-526-doanh-bc")
        data.append("api_key", "885336143474268")
        data.append("api_secret", "BIaSxlwvuSjvu8KKBun2qvU9uOc")
        fetch("https://api.cloudinary.com/v1_1/cs-526-doanh-bc/image/upload", {
            method:"post",
            body:data
        }).then(res => res.json())
        .then(data => {
            fetch("http://103.195.236.219:5000/changeavatar", {
              method:'POST',
              headers:{
                  'Content-Type' : 'application/json'},
                  body:JSON.stringify({
                    username: this.props.route.params.username,
                    img_url: data.url
                })
            })
            this._clickModalUpdateAvatar()
            this._getAvatar();
        }).catch(err => {
            Alert.alert("Lỗi upload ảnh")
        })
    }

    handleUpdata_cover = (photo) => {
        const data = new FormData()
        data.append('file', photo)
        data.append("upload_preset", "receipt_imgs")
        data.append("cloud_name", "cs-526-doanh-bc")
        data.append("api_key", "885336143474268")
        data.append("api_secret", "BIaSxlwvuSjvu8KKBun2qvU9uOc")
        fetch("https://api.cloudinary.com/v1_1/cs-526-doanh-bc/image/upload", {
            method:"post",
            body:data
        }).then(res => res.json())
        .then(data => {
            fetch("http://103.195.236.219:5000/changecover", {
              method:'POST',
              headers:{
                  'Content-Type' : 'application/json'},
                  body:JSON.stringify({
                    username: this.props.route.params.username,
                    img_url: data.url
                })
            })
            this._clickModalUpdateCover()
            this._getCover();
        }).catch(err => {
            Alert.alert("Lỗi upload ảnh")
        })
    }

    render() {
        const username = this.props.route.params.username;
        // this._getInfoUser()
        return (
          <ImageBackground source = {background} style={{flex:1}}>
            <View>
                <ImageBackground source = {{uri:this.state.url_cover}} style={{width: config.deviceWidth}}>
                  <View style={styles.header}>
                      <View style={styles.headerContent}>
                          <Image style={styles.profileImage} source={{uri:this.state.url_avatar}}/>
                          <Button color = "#8A2BE2" icon="account" mode="contained" onPress={() => this._clickModalProfile()} style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}}>
                          {username}
                          </Button>
                      </View>
                  </View>
                </ImageBackground>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{this.state.total_receipts}</Text>
                        <Text style={[styles.text, styles.subText]}>Số HĐ</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#696969", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{this.state.total_cost}</Text>
                        <Text style={[styles.text, styles.subText]}>Tổng tiền</Text>
                    </View>
                </View>
                <View>
                  <Modal 
                      isVisible={this.state.isModalVisibleProfile}
                      onBackdropPress={() => this._clickModalProfile()}
                      style={styles.PopupModalProfile}>
                      <View style={{alignItems: "center"}}>
                        <Text style={[styles.text, styles.subText]}>Quản lý tài khoản của bạn</Text>
                      </View>
                      <Button onPress={() => {this._clickModalProfile(); this._clickModalUpdateAvatar()}} color = "#8A2BE2" icon="account-circle-outline" mode="contained" style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}}>
                          Đổi ảnh đại diện
                      </Button>
                      <Button onPress={() => {this._clickModalProfile(); this._clickModalUpdateCover()}} color = "#8A2BE2" icon="image-edit-outline" mode="contained" style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}}>
                          Đổi ảnh bìa
                      </Button>
                      <Button onPress={() => {this._clickModalProfile(); this.props.navigation.navigate("ChangePass", {username: this.props.route.params.username})}} color = "#8A2BE2" icon="key-outline" mode="contained" style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}}>
                          Đổi mật khẩu
                      </Button>
                  </Modal>

                  <Modal 
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this._clickModal()}
                    style={styles.PopupModal}>
                    <View>
                      <View style={{alignItems: "center"}}>
                        <Text style={[styles.text, styles.subText]}>Chọn ngày bạn muốn xem thống kê hóa đơn</Text>
                      </View>
                      <View style = {styles.DropDown}>
                          <RNPickerSelect
                              placeholder={{
                                  label: 'Chọn ngày',
                                  value: null,
                              }}
                              onValueChange={(value) => this.setState({query_day: value})}
                              items={[
                                  { label: 'Ngày 1', value: '1' }, { label: 'Ngày 2', value: '2' }, { label: 'Ngày 3', value: '3' },
                                  { label: 'Ngày 4', value: '4' }, { label: 'Ngày 5', value: '5' }, { label: 'Ngày 6', value: '6' }, { label: 'Ngày 7', value: '7' }, { label: 'Ngày 8', value: '8' },
                                  { label: 'Ngày 9', value: '9' }, { label: 'Ngày 10', value: '10' }, { label: 'Ngày 11', value: '11' }, { label: 'Ngày 12', value: '12' }, { label: 'Ngày 13', value: '13' },
                                  { label: 'Ngày 14', value: '14' }, { label: 'Ngày 15', value: '15' }, { label: 'Ngày 16', value: '16' }, { label: 'Ngày 17', value: '17' }, { label: 'Ngày 18', value: '18' },
                                  { label: 'Ngày 19', value: '19' }, { label: 'Ngày 20', value: '20' }, { label: 'Ngày 21', value: '21' }, { label: 'Ngày 22', value: '22' }, { label: 'Ngày 23', value: '23' },
                                  { label: 'Ngày 24', value: '24' }, { label: 'Ngày 25', value: '25' }, { label: 'Ngày 26', value: '26' }, { label: 'Ngày 27', value: '27' }, { label: 'Ngày 28', value: '28' },
                                  { label: 'Ngày 29', value: '29' }, { label: 'Ngày 30', value: '30' }
                              ]}
                          />
                      </View>

                      <View style = {styles.DropDown}>
                          <RNPickerSelect
                              placeholder={{
                                  label: 'Chọn tháng',
                                  value: null,
                              }}
                              onValueChange={(value) => this.setState({query_month: value})}
                              items={[
                                { label: 'Tháng 1', value: '1' }, { label: 'Tháng 2', value: '2' }, { label: 'Tháng 3', value: '3' },
                                { label: 'Tháng 4', value: '4' }, { label: 'Tháng 5', value: '5' }, { label: 'Tháng 6', value: '6' }, { label: 'Tháng 7', value: '7' }, { label: 'Tháng 8', value: '8' },
                                { label: 'Tháng 9', value: '9' }, { label: 'Tháng 10', value: '10' }, { label: 'Tháng 11', value: '11' }, { label: 'Tháng 12', value: '12' },
                              ]}
                          />
                      </View>

                      <View style = {styles.DropDown}>
                          <RNPickerSelect
                              placeholder={{
                                  label: 'Chọn năm',
                                  value: null,
                              }}
                              onValueChange={(value) => this.setState({query_year: value})}
                              items={[
                                { label: 'Năm 2020', value: '2020' }, { label: 'Năm 2021', value: '2021' }
                              ]}
                          />
                      </View>

                      <Button color = "#8A2BE2" icon="database-search" mode="contained" onPress={() => this._handleModal()} style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}}>
                          Tìm
                      </Button>

                      <Button color = "#8A2BE2" icon="circle-outline" mode="contained" onPress={() => this._getInfoUser()} style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}}>
                          Mặc định
                      </Button>

                    </View>
                  </Modal>
                </View>
                <View style={{flexDirection: "row"}}>
                  <View style={{marginLeft:config.deviceWidth*0.1, marginTop:20}}>
                    <Pie
                      radius={80}
                      sections={[
                        {
                          percentage: this.state.percentage_market,
                          color: '#404FCD',
                        },
                        {
                          percentage: this.state.percentage_coffee,
                          color: '#44CD40',
                        },
                        {
                          percentage: this.state.percentage_others,
                          color: '#C70039',
                        },
                      ]}
                      dividerSize={3}
                      strokeCap={'butt'}
                    />
                  </View>
                  
                  <View style={{marginLeft:config.deviceWidth*0.05, marginTop:20}}>
                      <View style={{marginTop:10, flexDirection:'row', marginBottom:20}}>
                        <View style={styles.squareMarket}></View>
                        <Text style={styles.note}>Đi chợ</Text>
                      </View>

                      <View style={{flexDirection:'row', marginBottom:20}}>
                        <View style={styles.squareCoffee}></View>
                        <Text style={styles.note}>Đi cà phê</Text>
                      </View>

                      <View style={{flexDirection:'row', marginBottom:20}}>
                        <View style={styles.squareOthers}></View>
                        <Text style={styles.note}>Khác</Text>
                      </View>
                  </View>

                </View>
            </View>
            <LineChart
              data={this.state.data_bar_chart}
              width={config.deviceWidth}
              height={170}
              chartConfig={this.state.chartConfig}
            />
            <Button color = "#8A2BE2" icon="eye" mode="contained" onPress={() => this._clickModal()} style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}}>
                          Xem ngày khác
            </Button>

            <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.isModalVisibleUpdateAvatar}
                onBackdropPress = {() => this._clickModalUpdateAvatar()}>

                <View style={styles.modalView}>
                        <Button color = "#8A2BE2" icon="camera" style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}} mode="contained" onPress={() => this._takePhoto('avatar')}>
                            Chụp ảnh
                        </Button>
                        <Button color = "#8A2BE2" icon="folder-image" style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}} mode="contained" onPress={() => this._uploadImage('avatar')}>
                            Tải lên từ máy
                        </Button>
                </View>

            </Modal>

            <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.isModalVisibleUpdateCover}
                onBackdropPress = {() => this._clickModalUpdateCover()}>

                <View style={styles.modalView}>
                        <Button color = "#8A2BE2" icon="camera" style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}} mode="contained" onPress={() => this._takePhoto('cover')}>
                            Chụp ảnh
                        </Button>
                        <Button color = "#8A2BE2" icon="folder-image" style={{marginTop:config.deviceHeight*0.02, marginLeft:config.deviceWidth*0.2, marginRight:config.deviceWidth*0.2}} mode="contained" onPress={() => this._uploadImage('cover')}>
                            Tải lên từ máy
                        </Button>
                </View>

            </Modal>

          </ImageBackground>
        );
    }
}

export default Profile;

const styles = StyleSheet.create({
  header:{
    // backgroundColor: "#F0F8FF",
  },
  DropDown: {
    borderColor: "black", 
    borderWidth: 1, 
    margin:6,
    backgroundColor:"white",
    borderRadius: 5
  },
  PopupModalProfile: {
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
    marginTop:config.deviceHeight*0.35,
    marginBottom:config.deviceHeight*0.35,
  },
  PopupModal: {
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
    marginTop:config.deviceHeight*0.25,
    marginBottom:config.deviceHeight*0.25,
  },
  squareMarket: {
    display: "flex",
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#C70039"
  },
  squareCoffee: {
    display: "flex",
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#44CD40"
  },
  squareOthers: {
    display: "flex",
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#404FCD"
  },
  header2:{
    backgroundColor: "#F0FFFF",
  },
  headerContent:{
    padding:5,
    alignItems: 'center',
  },
  image:{
    width: 60,
    height: 60,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  note:{
    fontSize:22,
    color:"black",
    fontWeight:'600',
    marginLeft:10,
  },
  body: {
    padding:30,
  },
  box: {
    borderRadius: 10,
    padding:5,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  option:{
    color: "#696969",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  text: {
      fontFamily: "HelveticaNeue",
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#000000",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 120,
      height: 120,
      borderRadius: 100,
      overflow: "hidden"
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 0,
      backgroundColor: "#F0F8FF"
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  },
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
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
    marginTop:config.deviceHeight*0.25,
    marginBottom:config.deviceHeight*0.25,
    height: 120
  },
  select:{
      borderColor: "#20B2AA", 
      borderWidth: 2, 
      margin:6
  }
});

