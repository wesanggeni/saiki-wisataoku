import React from "react";
import { View, ActivityIndicator, Text, Modal, StyleSheet } from "react-native";
const Loader = (props) =>{
    return(
        <Modal
        transparent={true}
        animationType={'none'}
        visible={props.loading}
        >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={props.loading} />
            <Text style={{fontSize: 12, textAlign: 'center'}}>Proses...</Text>
          </View>
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;