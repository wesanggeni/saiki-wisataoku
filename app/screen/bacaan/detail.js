import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
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
import { ImageOverlay } from '../../component/card';
import axios from 'axios';
import { Endpoint } from '../../config';
import HTMLView from 'react-native-htmlview';

//---

const width_proportion = '100%';
const height_proportion = '100%';

export const ScreenMain = (props) => {

  const [getData, setGetData] = React.useState(props.route.params?.paramData ?? []);

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
        <ScrollView>

          <ImageBackground
            style={styles.headerContainer}
            source={{uri : Endpoint.Main+'uploads/'+getData.thumb}}>
          </ImageBackground>

          <View style={styles.containerWrap}>
            <Text style={styles.title}>{getData.title}</Text>

            <View style={styles.containerHtml}>
              <HTMLView
                stylesheet={styles}
                value={getData.content}
              />
            </View>
          </View>

        </ScrollView>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  p: {
    color: '#555',
    fontSize: 13,
    fontWeight: "normal",
    fontFamily: "System",
    lineHeight:18
  },
  h1: {
    color: '#444',
    fontSize: 22,
  },
  h2: {
    color: '#444',
    fontSize: 20,
  },
  h3: {
    color: '#444',
    fontSize: 18,
  },
  h4: {
    color: '#444',
    fontSize: 16,
  },
  h5: {
    color: '#444',
    fontSize: 15,
  },
  h6: {
    color: '#555',
    fontSize: 14,
  },
  blockquote: {
    color: '#444',
    fontSize: 13,
    fontWeight: "normal",
    fontFamily: "System",
    lineHeight:18
  },
  //---
  headerContainer: {
    height: 192,
    zIndex: 1,
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
    backgroundColor:'#F7F9FC',
    paddingBottom:120
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 15,
    color: '#444'
  }
});

export default ScreenMain;