import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { setDestinasi } from '../../redux/actions/dataActions';
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
  BackIcon
} from '../../component/icon';
import { ImageOverlay } from '../../component/ImageOverlay';
import axios from 'axios';
import { Endpoint } from '../../config';
import HTMLView from 'react-native-htmlview';

//---

const width_proportion = '100%';
const height_proportion = '100%';

export const ScreenMain = (props) => {

  const onItemPress = (passData): void => {
    props.navigation.navigate('DestinasiDetail', { paramData: passData });
  };

  const [mounted, setMounted] = React.useState(true);
  //---
  
  useEffect(() => {
    if (mounted == true && props.dataDestinasi.length == 0) {
      axios.post(Endpoint.Main+'api/app/places/search', { })
      .then(response => {
        props.setDestinasi(response.data.data);
      }).catch(error => { });

      setMounted(false);
    }
  });

  //---

  const renderItem = (info: ListRenderItemInfo<GetData>): React.ReactElement => (
    <ImageOverlay
    imageStyle={{ borderRadius: 4 }}
    style={styles.item}
    source={{ uri: Endpoint.Main+'uploads/'+info.item.thumb}}
    >
      <TouchableOpacity key={info.item.id} onPress={() => onItemPress(info.item.id)}>
        <Text style={{fontSize:14, color:'#fff', paddingTop:25, paddingHorizontal:10}}>
        {info.item.name}
        </Text>
      </TouchableOpacity>
    </ImageOverlay>
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
            source={require('../../assets/images/banner4.jpg')}>
            <Text
              style={{fontSize:18, paddingTop:15}}
              status='control'>
              Destinasi Wisata
            </Text>
          </ImageOverlay>

          <List style={{backgroundColor:'transparent'}}
            contentContainerStyle={styles.list}
            data={props.dataDestinasi.places}
            numColumns={2}
            renderItem={renderItem}
          />

        </ScrollView>
      </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    height: 120,
    paddingVertical: 24,
  },
  headerTitle: {
    textAlign: 'center',
    marginVertical: 35,
    fontSize: 24,
    zIndex: 1,
  },
  headerDescription: {
    zIndex: 1,
  },
  //---
  list: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal:5,
    marginBottom:120
  },
  item: {
    flex:1,
    borderRadius: 0,
    marginVertical: 5,
    marginHorizontal: 5,
    maxWidth: Dimensions.get('window').width / 2 - 15,
    height:85,
  },
  itemHeader: {
    height: 120,
  },
});

const mapStateToProps = (state) => {
  return {
    dataDestinasi: state.dataReducer.dataDestinasi,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setDestinasi:(payload) => dispatch(setDestinasi(payload)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMain);