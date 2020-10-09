import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { setWilayahPopuler, setBacaan } from '../../redux/actions/dataActions';
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
import HTMLView from 'react-native-htmlview';

//---

const width_proportion = '100%';
const height_proportion = '100%';

export const ScreenMain = (props) => {

  const onItemPress = (passData): void => {
    props.navigation.navigate('BacaanDetail', { paramData: passData });
  };

  const [mounted, setMounted] = React.useState(true);
  //---
  
  useEffect(() => {
    if (mounted == true && props.dataBacaan.length == 0) {
      axios.get(Endpoint.Main+'api/app/posts/inspiration')
      .then(response => {
        props.setBacaan(response.data.data);
      }).catch(error => { });

      setMounted(false);
    }
  });

  //---

  const renderItemHeader = (info: ListRenderItemInfo<GetData>): React.ReactElement => (
    <TouchableOpacity key={info.item.id} onPress={() => onItemPress(info.item)}>
      <ImageBackground
        style={styles.itemHeader}
        source={{ uri: Endpoint.Main+'uploads/'+info.item.thumb}}
      />
    </TouchableOpacity>
  );

  const renderItem = (info: ListRenderItemInfo<GetData>): React.ReactElement => (
    <Card
      style={styles.item}
      header={() => renderItemHeader(info)}>
      <TouchableOpacity key={info.item.id} onPress={() => onItemPress(info.item)}>
        <Text style={{fontSize:13}}>{info.item.title}</Text>
      </TouchableOpacity>
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
              Bacaan Menarik
            </Text>
          </ImageOverlay>

          <List style={{backgroundColor:'transparent'}}
            contentContainerStyle={styles.list}
            data={props.dataBacaan}
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
});

const mapStateToProps = (state) => {
  return {
    dataWilayahPopuler: state.dataReducer.dataWilayahPopuler,
    dataBacaan: state.dataReducer.dataBacaan,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      setWilayahPopuler:(payload) => dispatch(setWilayahPopuler(payload)),
      setBacaan:(payload) => dispatch(setBacaan(payload)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMain);