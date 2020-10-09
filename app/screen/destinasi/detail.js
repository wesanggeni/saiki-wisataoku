import React, { Component, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ListRenderItemInfo,
  ScrollView,
  ImageBackground,
  Modal,
  TouchableHighlight,
} from "react-native";
import {
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
  TopNavigationAction,
} from "@ui-kitten/components";
import {
  LogoutIcon,
  InfoIcon,
  MenuIcon,
  LogoIcon,
  BackIcon
} from '../../component/icon';
import { ImageOverlay } from '../../component/card';
import axios from 'axios';
import { Endpoint } from '../../config';
import FastImage from 'react-native-fast-image';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { showLocation } from 'react-native-map-link';
//---

const DeviceWidth = Dimensions.get('window').width
const dummy = {
        "place": {
            "id": null,
            "user_id": null,
            "country_id": null,
            "city_id": null,
            "category": [],
            "place_type": [],
            "name": null,
            "slug": null,
            "description": null,
            "price_range": null,
            "amenities": [],
            "address": null,
            "lat": 0,
            "lng": 0,
            "latitudeDelta": 0.09,
            "longitudeDelta": 0.035,
            "email": null,
            "phone_number": null,
            "website": null,
            "social": [],
            "opening_hour": [],
            "thumb": null,
            "gallery": null,
            "video": null,
            "booking_type": null,
            "link_bookingcom": null,
            "status": null,
            "priority": null,
            "seo_title": null,
            "seo_description": null,
            "created_at": null,
            "updated_at": null,
            "translations": []
        },
        "city": {},
        "amenities": [],
    };

const width_proportion = '100%';
const height_proportion = '100%';

export const ScreenMain = (props) => {

  const [getDataParam, setGetDataParam] = React.useState(props.route.params?.paramData ?? []);
  const [getData, setGetData] = React.useState(dummy);
  const markerRef = useRef(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalImage, setModalImage] = React.useState('');

  const onItemLink = (lat, lng): void => {
    showLocation({
        latitude: lat,
        longitude: lng,
        //sourceLatitude: -8.0870631,  // optionally specify starting location for directions
        //sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
        //title: 'The White House',  // optional
        googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
        //googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
        alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
        //dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
        //dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
        //cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
        appsWhiteList: ['google-maps'] // optionally you can set which apps to show (default: will show all supported apps installed on device)
        // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
        // app: 'uber'  // optionally specify specific app to use
    });
  };

  const [mounted, setMounted] = React.useState(true);
  //---
  
  useEffect(() => {
    if (mounted == true) {
      axios.get(Endpoint.Main+'api/app/places/'+getDataParam)
      .then(response => {
        setGetData(response.data.data);
      }).catch(error => { });

      setMounted(false);
    }
  });

  //---

  interface SetCardProps extends Omit<CardProps, 'children'> {
    getdata: getData;
  }

  const CardCallout = (props: SetCardProps): CardElement => {
    const { style, getdata, ...cardProps } = props;
    return (
      <View style={[styles.containerCard, style]}>
          <View style={styles.leftContainer}>
            <Image
            style={styles.image}
            source={{ uri: Endpoint.Main+'uploads/'}}/>
          </View>
          <View style={styles.rightContainer}>
            <Text
              style={styles.titleCallout}>
              Lorem Ipsum Dolor Sit Amet
            </Text>
          </View>
      </View>
    );
  };

  //---

  const renderLeftMenu = () => (
    <TopNavigationAction icon={BackIcon} onPress={()=> { props.navigation.goBack(null); }}/>
  );

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
      accessoryLeft={renderLeftMenu}
    />
    <Divider/>
      <ImageBackground
        resizeMode="cover"
        source={require('../../assets/g40.png')} 
        style={{resizeMode: "repeat",}}>

        <ScrollView>

          <ImageOverlay
            style={styles.headerContainer}
            source={{uri : Endpoint.Main+'uploads/'+getData.place.thumb}}>
            <Text
              style={{fontSize:18, paddingTop:15}}
              status='control'>
              {getData.place.name}
            </Text>
          </ImageOverlay>

          <Layout style={styles.container}>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.imageGaleriShow}
            source={{ uri: modalImage }} />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Tutup</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

          {getData.amenities.length > 0?
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              marginHorizontal:8,
              marginTop:15,
              marginBottom:5,
              padding:5,
              flexDirection: 'row',
              backgroundColor: "#eaeaea",
              borderRadius:5
            }}>
              <FlatList
                data={getData.amenities}
                renderItem={({ item }) => (
                  <View style={{ alignItems:'center', width: DeviceWidth*0.21, margin:4, height: DeviceWidth*0.2}}
                  >
                    <View style={{ padding:8, marginVertical:6, width:35, backgroundColor:'#ccc', borderRadius:50}}>
                      <Image style={{width:18, height:18}} source={{uri: Endpoint.Main+'uploads/'+item.icon}} />
                    </View>
                    <Text style={{fontSize:10,textAlign:'center'}}>{item.name}</Text>
                  </View>
                )}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
          : null}

          <View style={{marginHorizontal:8, marginTop:10, marginBottom:5}}>
            <Text
              style={styles.titleBefore}
              appearance='hint'>
              Deskripsi
            </Text>
            <Text
              style={{textAlign: 'left', fontSize:13, color:'#777'}}
              appearance='hint'>
              {getData.place.description}
            </Text>
          </View>

          {getData.place.gallery? 
          <View style={styles.containerGaleri}>
            <Text
              style={styles.titleBefore}
              appearance='hint'>
              Galeri
            </Text>
            <FlatList
              data={getData.place.gallery}
              renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                  <TouchableOpacity
                    key={item.id}
                    style={{ flex: 1 }}
                    onPress={() => {
                      setModalVisible(true);
                      setModalImage(Endpoint.Main+'uploads/'+item);
                    }}
                    >
                    <FastImage
                      style={styles.imageGaleri}
                      source={{
                        uri: Endpoint.Main+'uploads/'+item,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          : null}

          <View style={{marginHorizontal:8, marginTop:10, marginBottom:5}}>
            <Text
              style={styles.titleBefore}
              appearance='hint'>
              Lokasi
            </Text>
          </View>

          <View style={styles.containerMap}>
           <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: getData.place.lat,
              longitude: getData.place.lng,
              latitudeDelta: 0.4,
              longitudeDelta: 0.5,
             }} >
            <Marker
              ref={markerRef}
              coordinate={{
                latitude: getData.place.lat,
                longitude: getData.place.lng,
              }}
            >
            </Marker>
           </MapView>
          </View>

          <View style={{marginHorizontal:8, marginTop:10, marginBottom:5}}>
            <Text
              style={{textAlign: 'left', fontSize:13, color:'#777'}}
              appearance='hint'>
              {getData.place.address}
            </Text>
          </View>

          <View style={{marginHorizontal:8, marginTop:10, marginBottom:5}}>
            <Button status='info' size='small' onPress={() => onItemLink(getData.place.lat, getData.place.lng)}>
              Lihat Petunjuk
            </Button>
          </View>

          <View style={{marginHorizontal:8, marginTop:10, marginBottom:5}}>
            <Text
              style={styles.titleBefore}
              appearance='hint'>
              Contact
            </Text>
            <Text
              style={{textAlign: 'left', fontSize:13, color:'#777'}}
              appearance='hint'>
              Phone : {getData.place.phone_number==null?'-':getData.place.phone_number}
            </Text>
            <Text
              style={{textAlign: 'left', fontSize:13, color:'#777'}}
              appearance='hint'>
              Email : {getData.place.email==null?'-':getData.place.email}
            </Text>
          </View>

          </Layout>

        </ScrollView>
      </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 4,
    padding: 10,
    elevation: 1,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontSize:13,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  containerGaleri: {
    flex: 1,
    paddingHorizontal:8,
    marginTop:5
  },
  imageGaleri: {
    height: 100,
    width: '100%',
    maxWidth: 100
  },
  imageGaleriShow: {
    height: 300,
    width: 300,
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute',
  },


   containerMap: {
    marginHorizontal:8,
    paddingTop:10,
     height: 130,
     alignItems: 'center',
   },
   map: {
     ...StyleSheet.absoluteFillObject,
   },

  titleBefore: {
    textAlign: 'left',
    color:'#777',
    fontSize:13,
    fontWeight:'bold'
  },

  containerCard: {
    height: 50,
    width: 150,
    flex:1,
    flexDirection: 'row',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 40,
    paddingVertical: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 110,
    paddingHorizontal:6,
    paddingVertical:4,
  },
  image: {
    height: 45,
    width: 40,
  },
  level: {
    zIndex: 1,
  },
  titleCallout: {
    lineHeight:13,
    fontSize: 10,
    zIndex: 1,
  },
  //---

  //---
  headerContainer: {
    alignItems: 'center',
    height: 120,
    paddingVertical: 24,
  },
  containerWrap: {
    padding:10,
  },
  containerHtml: {
    minHeight: 300,
    backgroundColor:'transparent',
    color:'#999'
  },
  container: {
    minHeight: 200,
    marginTop:0,
    backgroundColor:'transparent',
    paddingBottom:120
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 15,
    color: '#444'
  },
  //---
  listIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal:4
  },
  itemIcons: {
    backgroundColor: '#CCC',
    width: 100,
    height: 100,
    margin:2
  }
});

export default ScreenMain;