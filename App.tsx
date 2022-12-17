import {StatusBar} from 'expo-status-bar'
import React, {useRef, useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native'
import {Camera} from "expo-camera";

const App = () => {
  const [startCamera, setStartCamera] = useState(false);

  const cameraRef = useRef<Camera>(null)

  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert("Access denied")
    }
  }

  const __takePicture = async () => {
    setStartCamera(false);
    if (!cameraRef.current) return
    const photo = await cameraRef.current.takePictureAsync()
    console.log(photo)
  }

  return (
    <>
      {startCamera ? (
        <>
          <Camera
            style={styles.camera}
            ref={cameraRef}
          />
          <View style={styles.bottomCameraPanel}>
            <View style={styles.cameraBtnWrapper}>
              <TouchableOpacity onPress={__takePicture} style={styles.snapshotBtn} />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity style={styles.takePictureBtn} onPress={__startCamera}>
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
  camera: {flex: 1, width: "100%"},
  bottomCameraPanel: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  cameraBtnWrapper: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center'
  },
  snapshotBtn: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff'
  }
})

export default App;
