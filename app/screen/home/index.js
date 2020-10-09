import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  setBanners,
  setWilayahPopuler,
  setWilayah,
  setDestinasi,
  setVideos,
  setBacaan,
  setWisata,
  setAkomodasi,
  setTour,
  setInfo,
  setTentang,
} from '../../redux/actions/dataActions';
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ListRenderItemInfo,
  ScrollView
} from "react-native";
import {
  Input,
  Button,
  Card,
  CardElement,
  CardProps,
  List,
  Divider,
  Layout,
  Avatar,
  Icon,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction
} from "@ui-kitten/components";
import {
  LogoutIcon,
  InfoIcon,
  MenuIcon,
  LogoIcon,
  searchIcon
} from '../../component/icon';
import { ImageOverlay } from '../../component/ImageOverlay';
import axios from 'axios';
import { Endpoint } from '../../config';
import { WebView } from "react-native-webview";
import LinearGradient from 'react-native-linear-gradient';
//---

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get("window").height;

const width_proportion = '50%';
const items = [{
    id: 1,
    src: require('../../assets/icon2.png'),
    text: 'Destinasi Wisata',
    routes: 'Wisata',
  },
  {
    id: 2,
    src: require('../../assets/icon1.png'),
    text: 'Akomodasi',
    routes: 'Akomodasi',
  },
  {
    id: 3,
    src: require('../../assets/icon3.png'),
    text: 'Agen Tour',
    routes: 'Tour',
  },
  {
    id: 4,
    src: require('../../assets/icon5.png'),
    text: 'Sewa',
    routes: 'Pengembangan',
  },
  {
    id: 5,
    src: require('../../assets/icon4.png'),
    text: 'Money Changer',
    routes: 'Pengembangan',
  },
  {
    id: 6,
    src: require('../../assets/icon6.png'),
    text: 'Rumah Sakit',
    routes: 'Pengembangan',
  },
  {
    id: 7,
    src: require('../../assets/icon8.png'),
    text: 'Restoran',
    routes: 'Pengembangan',
  },
  {
    id: 8,
    src: require('../../assets/icon7.png'),
    text: 'Pasar',
    routes: 'Pengembangan',
  },
  {
    id: 9,
    src: require('../../assets/icon9.png'),
    text: 'Transportasi',
    routes: 'Pengembangan',
  },
];

const dummySearch = { places: [] };
//---

export const ScreenMain = (props) => {

  const onItemPress = (passData): void => {
    props.navigation.navigate('BacaanDetail', { paramData: passData });
  };

  const onItemWilayah = (passData): void => {
    props.navigation.navigate('WilayahDetail', { paramData: passData });
  };

  const onItemDestinasi = (): void => {
    props.navigation.navigate('Destinasi');
  };

  const onItemDestinasiDetail = (passData): void => {
    props.navigation.navigate('DestinasiDetail', { paramData: passData });
  };

  const onItemVideos = (): void => {
    props.navigation.navigate('Video');
  };

  const onItemMore = (): void => {
    props.navigation.navigate('Wilayah');
  };

  const onItemRead = (): void => {
    props.navigation.navigate('Bacaan');
  };

  const onItemIcons = (): void => {
    props.navigation.navigate('Pengembangan');
  };

  const [value, setValue] = React.useState('');
  const [searchData, setSearchData] = React.useState(dummySearch);
  const [showSearch, setShowSearch] = React.useState(false);
  const [mounted, setMounted] = React.useState(true);
  //---
  
  useEffect(() => {
    if (mounted == true) {
      //--- start first load, save all data to redux states
      if (props.dataBanners.length == 0) {
        axios.get(Endpoint.Main+'api/app/banners')
        .then(response => {
          props.setBanners(response.data.data);
        }).catch(error => { });
      }
      if (props.dataWilayahPopuler.length == 0) {
        axios.get(Endpoint.Main+'api/app/cities/popular')
        .then(response => {
          props.setWilayahPopuler(response.data.data);
        }).catch(error => { });
      }
      if (props.dataDestinasi.length == 0) {
        axios.post(Endpoint.Main+'api/app/places/search', { })
        .then(response => {
          props.setDestinasi(response.data.data);
        }).catch(error => { });
      }
      if (props.dataVideos.length == 0) {
        axios.get(Endpoint.Main+'api/app/videos')
        .then(response => {
          props.setVideos(response.data.data);
        }).catch(error => { });
      }
      if (props.dataBacaan.length == 0) {
        axios.get(Endpoint.Main+'api/app/posts/inspiration')
        .then(response => {
          props.setBacaan(response.data.data);
        }).catch(error => { });
      }
      //--- end home data
      if (props.dataWilayah.length == 0) {
        axios.get(Endpoint.Main+'api/app/cities')
        .then(response => {
          props.setWilayah(response.data.data);
        }).catch(error => { });
      }
      if (props.dataWisata.length == 0) {
        axios.get(Endpoint.Main+'api/app/places/touristDestinations')
        .then(response => {
          props.setWisata(response.data.data);
        }).catch(error => { });
      }
      if (props.dataAkomodasi.length == 0) {
        axios.get(Endpoint.Main+'api/app/places/accommodations')
        .then(response => {
          props.setAkomodasi(response.data.data);
        }).catch(error => { });
      }
      if (props.dataTour.length == 0) {
        axios.get(Endpoint.Main+'api/app/places/travelAgent')
        .then(response => {
          props.setTour(response.data.data);
        }).catch(error => { });
      }
      if (props.dataInfo == '') {
        axios.get(Endpoint.Main+'page/info')
        .then(response => {
          props.setInfo(response.data);
        }).catch(error => { });
      }
      if (props.dataTentang == '') {
        axios.get(Endpoint.Main+'page/tentang')
        .then(response => {
          props.setTentang(response.data);
        }).catch(error => { });
      }
      setMounted(false);
    }
  });

  //---

  const onSearch = (getSearchParam): void => {
    getSearch(getSearchParam);
  };

  const getSearch = (getSearchParam): void => {
    axios.post(Endpoint.Main+'api/app/places/search', {
      keyword: getSearchParam
    })
    .then(response => {
      setSearchData(response.data.data);
    }).catch(error => { });
  }

  //---

  const renderItemWilayah = (info: ListRenderItemInfo<ListData>): React.ReactElement => (
    <CardWilayah
      style={styles.horizontalItem}
      getdata={info.item}
    />
  );

  const renderItemDestinasi = (info: ListRenderItemInfo<ListData>): React.ReactElement => (
    <CardDestinasi
      style={styles.horizontalItem}
      getdata={info.item}
    />
  );

  const renderItemVideo = (info: ListRenderItemInfo<ListData>): React.ReactElement => (
    <CardVideo
      style={styles.horizontalItem}
      getdata={info.item}
    />
  );

  const renderItemBacaan = (info: ListRenderItemInfo<ListData>): React.ReactElement => (
    <CardBacaan
      style={styles.horizontalItem}
      getdata={info.item}
    />
  );

  interface SetWilayahProps extends Omit<CardProps, 'children'> {
    getdata: dataWilayah;
  }

  interface SetDestinasiProps extends Omit<CardProps, 'children'> {
    getdata: dataDestinasi;
  }

  interface SetVideoProps extends Omit<CardProps, 'children'> {
    getdata: dataVideos;
  }

  interface SetBacaanProps extends Omit<CardProps, 'children'> {
    getdata: dataBacaan;
  }

  const CardWilayah = (props: SetWilayahProps): CardElement => {
    const { style, getdata, ...cardProps } = props;
    return (
      <Card style={[styles.containerCard, style]}>
        <ImageOverlay
          style={styles.image}
          source={{ uri: Endpoint.Main+'uploads/'+getdata.banner}}>
          <TouchableOpacity key={getdata.id} onPress={() => onItemWilayah(getdata)}>
            <Text
              style={styles.title}
              category='h6'
              status='control'>
              {getdata.name}
            </Text>
            <Text
              style={styles.level}
              category='s2'
              status='control'>
              {getdata.places_count + ' tempat'}
            </Text>
          </TouchableOpacity>
        </ImageOverlay>
      </Card>
    );
  };

  const CardDestinasi = (props: SetWilayahProps): CardElement => {
    const { style, getdata, ...cardProps } = props;
    return (
      <Card style={[styles.containerCard, style]}>
        <ImageOverlay
          style={styles.image}
          source={{ uri: Endpoint.Main+'uploads/'+getdata.thumb}}>
          <TouchableOpacity key={getdata.id} onPress={() => onItemDestinasiDetail(getdata.id)}>
            <Text
              style={styles.title}
              category='h6'
              status='control'>
              {getdata.name}
            </Text>
          </TouchableOpacity>
        </ImageOverlay>
      </Card>
    );
  };

  const CardVideo = (props: SetBacaanProps): CardElement => {
    const { style, getdata, ...cardProps } = props;

    return (
      <View
        style={styles.containerCardYt}>

      <WebView
        style={styles.WebViewStyle}
        javaScriptEnabled={true}
        source={{uri: getdata.link+'?modestbranding=1&rel=0&autoplay=0&showinfo=0&controls=0&iv_load_policy=3&cc_load_policy=1'}}
      />

      </View>
    );
  };

  const CardBacaan = (props: SetBacaanProps): CardElement => {
    const { style, getdata, ...cardProps } = props;
    return (
      <Card
        style={[styles.containerCard, style]}>
        <ImageOverlay
          style={styles.image}
          source={{ uri: Endpoint.Main+'uploads/'+getdata.thumb}}>
          <TouchableOpacity key={getdata.id} onPress={() => onItemPress(getdata)}>
            <Text
              style={styles.title}
              category='h6'
              status='control'>
              {getdata.title}
            </Text>
          </TouchableOpacity>
        </ImageOverlay>
      </Card>
    );
  };

  //---

  const renderTitle = (props) => (
    <View>
      {LogoIcon()}
    </View>
  );

  //---

  return (
    <Layout>
    <TopNavigation
      title={renderTitle}
      alignment='center'
    />
    <Divider/>

      <ImageBackground
        resizeMode="cover"
        source={require('../../assets/g40.png')} 
        style={styles.bgDef}>

        <ScrollView
        onScroll={() => setShowSearch(false)}>

          <ImageOverlay
            style={styles.headerContainer}
            source={require('../../assets/images/banner.jpg')}>
            <Text
              style={{
                fontSize:18,
                textShadowOffset: { width: 2, height: 2 }, 
                textShadowRadius: 1, 
                textShadowColor: '#444',
              }}
              status='control'
              >
              Jelajahi Wisata OKU
            </Text>
            <Text
              style={{
                fontSize:13,
                textShadowOffset: { width: 2, height: 2 }, 
                textShadowRadius: 1, 
                textShadowColor: '#444',
              }}
              status='control'
              >
              kemudahan informasi melalui genggaman
            </Text>

            <Input //---
              onFocus={() => setShowSearch(true)}
              status='basic'
              accessoryLeft={searchIcon}
              style={{marginHorizontal:30, marginTop:10,backgroundColor:'#fff'}}
              size='small'
              placeholder='Pencarian lokasi'
              onChangeText={searchThis => onSearch(searchThis)}
            />
          </ImageOverlay>
        <Layout style={styles.container}>
          

            {showSearch?
              <View>
              {searchData.places.length > 0?
                <View style={styles.searchBox}>
                  <FlatList
                    style={styles.searchList}
                    data={searchData.places}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.id} onPress={() => onItemDestinasiDetail(item.id)}>
                          <View style={styles.searchField}>
                            <Text>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                    )}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              :null}
              </View>
            :null}

      <ImageBackground
      imageStyle={{ borderRadius: 4 }}
      source={require('../../assets/bg-jumbo.png')} style={styles.imageBg}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin:3 }}>
              <TouchableOpacity key={item.id} onPress={() => props.navigation.navigate(item.routes)}>
                <View style={styles.imageIconsWrap}>
                  <Image style={styles.imageIcons} source={item.src} />
                  <Text style={styles.fontIcons}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </ImageBackground>

        <View style={styles.list}>
          <View>
            <Text
            style={[styles.headerTitle, {textAlign: 'left'}]}
            appearance='hint'>
              Wilayah Populer
            </Text>
            <Text
            style={[styles.headerTitleSmall, {textAlign: 'left'}]}
            appearance='hint'>
              Wilayah yang paling sering dikunjungi pengunjung
            </Text>
          </View>

          <List style={{backgroundColor:'transparent', marginBottom:7}}
            contentContainerStyle={styles.horizontalList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={props.dataWilayahPopuler}
            renderItem={renderItemWilayah}
          />

          <TouchableOpacity onPress={() => onItemMore()}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#33a14a', '#2b87d0']} style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                Lihat semua wilayah
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <View>
            <Text
            style={[styles.headerTitle, {textAlign: 'left'}]}
            appearance='hint'>
              Destinasi Wisata Populer
            </Text>
            <Text
            style={[styles.headerTitleSmall, {textAlign: 'left'}]}
            appearance='hint'>
              Tempat Wisata yang sering di kunjungi
            </Text>
          </View>

          <List style={{backgroundColor:'transparent', marginBottom:7}}
            contentContainerStyle={styles.horizontalList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={props.dataDestinasi.places}
            renderItem={renderItemDestinasi}
          />

          <TouchableOpacity onPress={() => onItemDestinasi()}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#33a14a', '#2b87d0']} style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                Lihat semua wisata
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <View>
            <Text
            style={[styles.headerTitle, {textAlign: 'left'}]}
            appearance='hint'>
              Keindahan Wisata Oku
            </Text>
            <Text
            style={[styles.headerTitleSmall, {textAlign: 'left'}]}
            appearance='hint'>
              Video perjalanan wisata OKU dari pengunjung
            </Text>
          </View>
          <List style={{backgroundColor:'transparent', marginBottom:7}}
            contentContainerStyle={styles.horizontalList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={props.dataVideos}
            renderItem={renderItemVideo}
          />
          <TouchableOpacity onPress={() => onItemVideos()}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#33a14a', '#2b87d0']} style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                Lihat semua video
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <View>
            <Text
            style={[styles.headerTitle, {textAlign: 'left'}]}
            appearance='hint'>
            Bacaan Menarik
            </Text>
            <Text
            style={[styles.headerTitleSmall, {textAlign: 'left'}]}
            appearance='hint'>
              Wadah cerita menarik dan tips untuk pengunjung
            </Text>
          </View>
          <List style={{backgroundColor:'transparent', marginBottom:7}}
            contentContainerStyle={styles.horizontalList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={props.dataBacaan}
            renderItem={renderItemBacaan}
          />
          <TouchableOpacity onPress={() => onItemRead()}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#33a14a', '#2b87d0']} style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                Lihat semua bacaan
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        </Layout>
        
        </ScrollView>
        </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  WebViewStyle: {
    width:198,
    height:100,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 4,
    marginVertical:8
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    margin: 8,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

  bgDef: {
    resizeMode: "repeat",
  },
  imageBg: {
    resizeMode: "cover",
    flex: 1,
    marginBottom:10,
    marginTop:-20,
    borderRadius:4,
    padding:5,
    margin:2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  searchBox: {
    paddingBottom:5,
    position:'absolute',
    marginTop:-20,
    borderRadius:4,
    width:DeviceWidth - 20,
    marginHorizontal:2,
    minHeight:10,
    zIndex:4,
    elevation: 3,
    backgroundColor:'#fff'
  },
  searchField: {
    borderBottomWidth :1,
    borderBottomColor: '#eee',
    paddingVertical:4,
    paddingHorizontal:10
  },
  searchList: {
    zIndex:10000
  },
  //---
  headerContainer: {
    alignItems: 'center',
    height: 180,
    paddingTop: 40,
  },
  container: {
    minHeight: 600,
    marginTop:0,
    padding:8,
    marginBottom:110,
    backgroundColor: 'transparent'
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageIconsWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor:'#fff',
    borderColor:'#eee',
    borderRadius:4,
    borderWidth:1,
    padding:4,
    minHeight:84
  },
  imageIcons: {
    height:32,
    width:32,
    margin:5
  },
  fontIcons: {
    textAlign:'center',
    fontSize:11,
    color: '#777'
  },
  //---
  list: {
    paddingVertical: 5,
    backgroundColor:'transparent'
  },
  headerTitle: {
    fontSize: 13,
    color:'#777',
    fontWeight:'bold'
  },
  headerTitleSmall: {
    fontSize: 11,
    marginBottom:5,
    color:'#777'
  },
  horizontalList: {
    marginVertical: 0,
    paddingHorizontal: 0,
  },
  verticalItem: {
    marginVertical: 0,
    marginHorizontal: 0,
  },
  horizontalItem: {
    width: 200,
    marginRight:8
  },
  //---
  alignContainer: {
    flex:1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width_proportion,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: width_proportion
  },
  //---
  containerCard: {
    height: 100,
  },
  containerCardYt: {
    marginRight:10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: 100,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  level: {
    zIndex: 1,
  },
  title: {
    paddingTop: 30,
    lineHeight:16,
    fontSize: 14,
    zIndex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    dataBanners: state.dataReducer.dataBanners,
    dataWilayahPopuler: state.dataReducer.dataWilayahPopuler,
    dataWilayah: state.dataReducer.dataWilayah,
    dataDestinasi: state.dataReducer.dataDestinasi,
    dataVideos: state.dataReducer.dataVideos,
    dataBacaan: state.dataReducer.dataBacaan,
    dataWisata: state.dataReducer.dataWisata,
    dataAkomodasi: state.dataReducer.dataAkomodasi,
    dataTour: state.dataReducer.dataTour,
    dataInfo: state.dataReducer.dataInfo,
    dataTentang: state.dataReducer.dataTentang,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setBanners:(payload) => dispatch(setBanners(payload)),
      setWilayahPopuler:(payload) => dispatch(setWilayahPopuler(payload)),
      setWilayah:(payload) => dispatch(setWilayah(payload)),
      setDestinasi:(payload) => dispatch(setDestinasi(payload)),
      setVideos:(payload) => dispatch(setVideos(payload)),
      setBacaan:(payload) => dispatch(setBacaan(payload)),
      setWisata:(payload) => dispatch(setWisata(payload)),
      setAkomodasi:(payload) => dispatch(setAkomodasi(payload)),
      setTour:(payload) => dispatch(setTour(payload)),
      setInfo:(payload) => dispatch(setInfo(payload)),
      setTentang:(payload) => dispatch(setTentang(payload)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMain);