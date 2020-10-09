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
  ScrollView
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
  TopNavigationAction
} from "@ui-kitten/components";
import {
  LogoutIcon,
  InfoIcon,
  MenuIcon,
  LogoIcon,
  BackIcon
} from './../component/icon';
import { ImageOverlay } from './../component/card';
import axios from 'axios';
import { Endpoint } from './../config';

//---

const width_proportion = '100%';
const height_proportion = '100%';

export const ScreenMain = (props) => {

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

          <Image
            style={{width:width_proportion, height:200}}
            source={require('./../assets/images/comming-soon.png')}/>
          <Text style={{textAlign: 'center', paddingTop: 20, fontSize:18}}>Akan Segera Hadir</Text>
          <Text style={{textAlign: 'center'}}>Menu ini dalam pengembangan</Text>

        </ScrollView>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height_proportion,
    marginTop:0,
    backgroundColor:'#F7F9FC',
    paddingBottom:120
  },
});

export default ScreenMain;