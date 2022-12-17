import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useCameraContext} from "../../contexts/CameraContext";

export const StartCameraView = () => {
  const { onStartCamera } = useCameraContext();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.takePictureBtn} onPress={onStartCamera}>
        <Text style={styles.takePictureBtnText}>
          Take picture
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  takePictureBtn: {
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  takePictureBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
})
