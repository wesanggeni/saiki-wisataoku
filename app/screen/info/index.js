import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { setInfo } from '../../redux/actions/dataActions';
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

  const [mounted, setMounted] = React.useState(true);
  //---
  
  useEffect(() => {
    if (mounted == true && props.dataInfo == '') {
      axios.get(Endpoint.Main+'page/info')
      .then(response => {
        props.setInfo(response.data);
      }).catch(error => { });

      setMounted(false);
    }
  });

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
      <Layout style={styles.container}>
        <ScrollView>

          <ImageOverlay
            style={styles.headerContainer}
            source={require('../../assets/images/banner4.jpg')}>
            <Text
              style={{fontSize:18, paddingTop:15}}
              status='control'>
              Info
            </Text>
          </ImageOverlay>

          <View style={styles.containerWrap}>

            <View style={styles.containerHtml}>
              <HTMLView
                stylesheet={styles}
                value={props.dataInfo}
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

const mapStateToProps = (state) => {
  return {
    dataInfo: state.dataReducer.dataInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setInfo:(payload) => dispatch(setInfo(payload)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMain);