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
  ImageBackground
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
  BackIcon,
  CloseIcon
} from '../../component/icon';
import { ImageOverlay } from '../../component/card';
import axios from 'axios';
import { Endpoint } from '../../config';
import HTMLView from 'react-native-htmlview';

import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
//---

const width_card_left = '30%';
const width_card_right = '70%';
const height_proportion = '100%';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ScreenMain = (props) => {

  const [getData, setGetData] = React.useState(props.route.params?.paramData ?? []);
  const [getRegion, setGetRegion] = React.useState([]);

  const [menuVisible, setMenuVisible] = React.useState(false);
  const [getMarker, setGetMarker] = React.useState(null);
  const [getSlider, setGetSlider] = React.useState(null);
  const [getMap, setGetMap] = React.useState(null);
  const [dataPlaces, setDataPlaces] = React.useState([]);
  const [mounted, setMounted] = React.useState(true);

  const markerRef = useRef(null);
  const sliderRef = useRef(null);

  const onItemPress = (passData): void => {
    props.navigation.navigate('DestinasiDetail', { paramData: passData });
  };

  useEffect(() => {
    if (mounted == true && getData.features.length > 0) {

      let tempArray = [];
      getData.features.map((features, key) => {
        if (features.places.length > 0) {
          features.places.map((places, key) => {
            tempArray.push(places.place);
          });
        }
      });

      setDataPlaces(tempArray);
      setMounted(false);
    }
  });
  //---

  const renderSlider = ({item}) => (
    <View>
      <TouchableOpacity style={styles.containerCard} onPress={() => onItemPress(item.id)}>
        <View style={styles.leftContainer}>
          <Image
          style={styles.sliderImage}
          source={{ uri: Endpoint.Main+'uploads/'+item.thumb}}/>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.sliderTitle}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const onPressMarker = (lock, index) => {
    let location = lock[index];
    getMap.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    })
    getSlider.snapToItem(index);
  }

  const onCarouselItemChange = (index) => {
    let location = dataPlaces[index];
    getMap.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    })

    setGetMarker(index); 
  }

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
      <Layout style={styles.container}>

          <View style={styles.containerMap}>

            <MapView
            ref={ref => setGetMap(ref)}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={getData.features?
              {
                  latitude: -4.129970,
                  longitude: 104.177887,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.035,
              }
              :{
                  latitude: getData.city.lat,
                  longitude: getData.city.lng,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.035,
                }
              }
            >

            {dataPlaces?dataPlaces.map((marker, index) => (
              <Marker
                ref={ref => setGetMarker(ref)}
                key={index}
                onPress={() => onPressMarker(marker, index)}
                coordinate={{
                  latitude: marker.lat,
                  longitude: marker.lng,
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.035,
                }}
              >
              <Callout>
                <Text style={{fontSize:13}}>{marker.name}</Text>
              </Callout>
              </Marker>
            )): null}

           </MapView>

            {dataPlaces?
            <Carousel
              layout={'default'}
              ref={ref => setGetSlider(ref)}
              data={dataPlaces}
              renderItem={renderSlider}
              sliderWidth={windowWidth}
              itemWidth={200}
              containerCustomStyle={styles.carousel}
              onSnapToItem={(index) => onCarouselItemChange(index)}
            />
            :null}

          </View>

      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  containerMap: {
    height: windowHeight - 50,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  //---
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48,
  },
  sliderTitle: {
    fontSize: 13,
  },
  sliderImage: {
    width:70,
    height:60
  },
  containerCard: {
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: 200,
    height:70,
    margin:15,
    padding:5,
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 70,
  },
  rightContainer: {
    flexDirection: 'row',
    width: 130,
    paddingHorizontal:6,
    paddingVertical:4,
  },
  //---

});

export default ScreenMain;