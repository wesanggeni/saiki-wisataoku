import React from 'react';
import { StyleSheet } from "react-native";
import {
  Text,
  Icon,
  Layout,
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);

const Screen = (props) => {

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={()=> { props.navigation.navigate('Beranda'); }}/>
  );

  return (
    <Layout>
      <Layout>
        <TopNavigation
          title='Blank'
          alignment='center'
          leftControl={BackAction()}
        />
        <Divider/>
      </Layout>
      <Layout style={styles.screen}>
        <Text>Blank</Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight:400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  }
});

export default Screen;