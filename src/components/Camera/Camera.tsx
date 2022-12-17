import React, {useRef} from 'react';
import { StyleSheet, TouchableOpacity, View} from "react-native";
import {Camera} from "expo-camera";

interface Props {
  setIsCameraStarted: (val: boolean) => void;
}

export const CameraCapture: React.FC<Props> = ({ setIsCameraStarted }) => {
  const cameraRef = useRef<Camera>(null)

  const takePicture = async () => {
    setIsCameraStarted(false)
    if (!cameraRef.current) return
    const photo = await cameraRef.current.takePictureAsync()
    console.log(photo)
  }

  return (
    <>
      <Camera
        style={styles.camera}
        ref={cameraRef}
      />
      <View style={styles.bottomCameraPanel}>
        <View style={styles.cameraBtnWrapper}>
          <TouchableOpacity onPress={takePicture} style={styles.snapshotBtn} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
