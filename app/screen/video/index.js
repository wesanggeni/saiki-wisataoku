import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { setVideos } from '../../redux/actions/dataActions';
import {
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
import { WebView } from "react-native-webview";
//---

const width_proportion = '100%';
const height_proportion = '100%';

export const ScreenMain = (props) => {
  const [mounted, setMounted] = React.useState(true);
  //---
  
  useEffect(() => {
    if (mounted == true && props.dataVideos.length == 0) {
      axios.get(Endpoint.Main+'api/app/videos')
      .then(response => {
        props.setVideos(response.data.data);
      }).catch(error => { });

      setMounted(false);
    }
  });

  //---

  const renderItemHeader = (info: ListRenderItemInfo<GetData>): React.ReactElement => (
    <View style={styles.containerCardYt}>
      <WebView
        style={styles.WebViewStyle}
        javaScriptEnabled={true}
        source={{uri: info.item.link+'?rel=0&autoplay=0&showinfo=0&controls=0'}}
      />
    </View>
  );

  const renderItem = (info: ListRenderItemInfo<GetData>): React.ReactElement => (
    <Card
      style={styles.item}
      header={() => renderItemHeader(info)}>
      <Text style={{fontSize:13}}>{info.item.judul}</Text>
    </Card>
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
              Keindahan Wisata OKU
            </Text>
          </ImageOverlay>

          <List style={{backgroundColor:'transparent'}}
            contentContainerStyle={styles.list}
            data={props.dataVideos}
            renderItem={renderItem}
          />

        </ScrollView>
      </ImageBackground>
    </Layout>
  );
};

const styles = StyleSheet.create({
  WebViewStyle: {
    height:150,
  },
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
    paddingHorizontal:10,
    marginBottom:120
  },
  item: {
    borderRadius: 0,
    marginVertical: 8,
  },
  itemHeader: {
    height: 120,
  },

  containerCardYt: {
    paddingHorizontal:0
  },
});

const mapStateToProps = (state) => {
  return {
    dataVideos: state.dataReducer.dataVideos,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setVideos:(payload) => dispatch(setVideos(payload)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMain);