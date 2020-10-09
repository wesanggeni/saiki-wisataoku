import React, { Component, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
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
  Icon,
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
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import LinearGradient from 'react-native-linear-gradient';
//---

const width_proportion = '100%';
const height_proportion = '100%';

export const ScreenMain = (props) => {

  const [getDataParam, setGetDataParam] = React.useState(props.route.params?.paramData ?? []);
  const [getData, setGetData] = React.useState([]);
  const markerRef = useRef(null);

  const onItemPress = (passData): void => {
    props.navigation.navigate('WilayahZoom', { paramData: passData });
  };

  const onItemPressDetail = (passData): void => {
    props.navigation.navigate('DestinasiDetail', { paramData: passData });
  };

  const onItemPressDestinasi = (passData): void => {
    if (passData == 'see-do') {
      props.navigation.navigate('Destinasi');
    } else if (passData == 'stay') {
      props.navigation.navigate('Akomodasi');
    } else if (passData == 'tour-and-travel-agent') {
      props.navigation.navigate('Tour');
    }
  };

  const [mounted, setMounted] = React.useState(true);
  //---
  
  useEffect(() => {
    if (mounted == true) {
      axios.get(Endpoint.Main+'api/app/cities/'+getDataParam.id)
      .then(response => {
        setGetData(response.data.data);
      }).catch(error => { });

      setMounted(false);
    }
  });

  //---

  interface SetDestinasiProps extends Omit<CardProps, 'children'> {
    getdata: dataDestinasi;
  }

  const onRegionChangeComplete = () => {
    if (markerRef && markerRef.current && markerRef.current.showCallout) {
      markerRef.current.showCallout();
    }
  };

  const CardDestinasi = (props: SetDestinasiProps): CardElement => {
    const { style, getdata, ...cardProps } = props;
    let cardImg = getdata?getdata.place.thumb:null;
    let cardName = getdata?getdata.place.name:null;
    let cardId = getdata?getdata.place.id:null;
    return (
      <Card style={[styles.containerCardList, style]}>
        <ImageOverlay
          style={styles.imageCard}
          source={{ uri: Endpoint.Main+'uploads/'+cardImg}}>
          <TouchableOpacity key={getdata.id} onPress={() => onItemPressDetail(cardId)}
          >
            <Text
              style={styles.title}
              category='h6'
              status='control'>
              {cardName}
            </Text>
          </TouchableOpacity>
        </ImageOverlay>
      </Card>
    );
  };

  const renderItemDestinasi = (info: ListRenderItemInfo<ListData>): React.ReactElement => (
    <CardDestinasi
      style={styles.horizontalItem}
      getdata={info.item}
    />
  );

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
            source={{uri : Endpoint.Main+'uploads/'+getDataParam.thumb}}>
            <Text
              style={{fontSize:18, paddingTop:15}}
              status='control'>
              {getDataParam.name}
            </Text>
          </ImageOverlay>

          <Layout style={styles.container}>

          <View style={{marginTop:10, marginBottom:5}}>
            <Text
              style={styles.headerTitle}
              appearance='hint'>
              Lihat Peta
            </Text>
          </View>

          <View style={styles.containerMap}>
            <MapView onPress={() => onItemPress(getData)}
              zoomEnabled={true}
              //pitchEnabled={true}
              //showsCompass={true}
              //showsBuildings={true}
              //showsTraffic={true}
              //showsIndoors={true}
              //onRegionChangeComplete={() => markerRef.current.showCallout()}
              onRegionChangeComplete={onRegionChangeComplete}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: getDataParam.lat,
                longitude: getDataParam.lng,
                latitudeDelta: 0.4,
                longitudeDelta: 0.5,
               }} >
              <Marker
                ref={markerRef}
                coordinate={{
                  latitude: getDataParam.lat,
                  longitude: getDataParam.lng,
                }}
                image={{uri: 'https://img.icons8.com/officexs/16/000000/circled-dot.png'}}
                showsCalloutOnLoad
              >
                <Callout style={{height:30}} onPress={() => onItemPress(getData)}>
                  <View style={styles.containerCard}>
                    <View style={styles.leftCallout}>
                      <Image
                      style={{height:30,width:40}}
                      source={{ uri: Endpoint.Main+'uploads/'+getDataParam.thumb}}
                      resizeMode="cover"
                      />
                    </View>
                    <View style={styles.rightCallout}>
                      <Text
                        style={styles.titleCallout}>
                        {getDataParam.name}
                      </Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            </MapView>
          </View>

          {getData?
          <View style={{marginTop:10}}>
              <FlatList
                data={getData.features}
                renderItem={({ item }) => (
                  <React.Fragment>
                  {item.places.length > 0?
                  <View style={styles.alignContainer}>
                      <Text
                      style={[styles.headerTitle, {textAlign: 'left'}]}
                        appearance='hint'>
                        {item.category_name}
                      </Text>
                  </View>
                  : null}
                  {item.places.length > 0?
                  <List style={{backgroundColor:'transparent'}}
                    contentContainerStyle={styles.horizontalList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={item.places}
                    renderItem={renderItemDestinasi}
                  />
                  : null}
                  {item.places.length > 0?
                  <TouchableOpacity  onPress={() => onItemPressDestinasi(item.category_slug)}>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#33a14a', '#2b87d0']} style={styles.linearGradient}>
                      <Text style={styles.buttonText}>
                        Lihat semua
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  : null}
                  </React.Fragment>
                )}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
              />
          </View>
          : null}

          </Layout>
        </ScrollView>
      </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 4,
    marginVertical:8,
    marginHorizontal:7
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
    margin: 8,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

   containerMap: {
    marginHorizontal:8,
    paddingTop:10,
     height: 170,
     alignItems: 'center',
   },
   map: {
     ...StyleSheet.absoluteFillObject,
   },

  containerCard: {
    height: 50,
    width: 150,
    flex:1,
    flexDirection: 'row',
  },
  leftCallout: {
    width: 40,
    height: 30,
    paddingVertical: 3,
  },
  rightCallout: {
    justifyContent: 'flex-start',
    width: 100,
    height: 30,
    paddingHorizontal:6,
    paddingVertical:3,
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
    color: '#777'
  },
  //---
  list: {
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 13,
    marginHorizontal: 5,
    marginVertical:5,
    fontWeight:'bold',
    color:'#777',
    paddingHorizontal:2
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
    marginHorizontal: 5,
  },
  imageCard: {
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
  containerCardList: {
    height: 100,
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
    width: width_proportion
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: width_proportion
  },
  //---
});

export default ScreenMain;