import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import MainNavigator from './app/router';
import { store, persistor } from './app/redux/store/store';

import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from '@ui-kitten/components';

export const App = (props) => {

  return (
    <Provider store={store}>
      <PersistGate 
        loading={(<View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>)}
        persistor={persistor}
        >
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <MainNavigator/>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default App;