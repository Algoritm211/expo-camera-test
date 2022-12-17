import {StatusBar} from 'expo-status-bar'
import React, {useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native'
import {Camera} from "expo-camera";
import {CameraCapture} from "./src/components/Camera/Camera";

const App = () => {
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  const onStartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      setIsCameraStarted(true)
    } else {
      Alert.alert("Access denied")
    }
  }

  return (
    <>
      {isCameraStarted ? (
        <CameraCapture setIsCameraStarted={setIsCameraStarted} />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.takePictureBtn} onPress={onStartCamera}>
            <Text style={styles.takePictureBtnText}>
              Take picture
            </Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      )}
    </>
  )
}


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

export default App;
