import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Camera, CameraType} from "expo-camera";
import {useCameraContext} from "../../contexts/CameraContext";
import CameraPreview from "../CameraPreview/CameraPreview";
import {FlashMode} from "expo-camera/src/Camera.types";

export const CameraCapture: React.FC = () => {
  const {cameraRef, takePicture, previewVisible, capturedImage} = useCameraContext();
  const [flashMode, setFlashMode] = useState<FlashMode>(FlashMode.off)
  const [cameraType, setCameraType] = React.useState(CameraType.back)

  const handleFlashMode = () => {
    switch (flashMode) {
      case 'on':
        setFlashMode(FlashMode.off)
        break;
      case 'off':
        setFlashMode(FlashMode.on)
        break;
      default:
        setFlashMode(FlashMode.auto)
        break;
    }
  }

  const switchCamera = () => {
    if (cameraType === CameraType.back) {
      setCameraType(CameraType.front)
    } else {
      setCameraType(CameraType.back)
    }
  }

  return (
    <>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} />
      ) : (
        <>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.camera}
            ref={cameraRef}
          >
            <View style={styles.flashLightWrapper}>
              <TouchableOpacity
                onPress={handleFlashMode}
                style={{
                  backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                  ...styles.additionalFunctionsBtn
                }}
              >
                <Text style={styles.additionalFunctionsText}>
                  💡
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={switchCamera}
                style={{
                  marginTop: 20,
                  ...styles.additionalFunctionsBtn
                }}
              >
                <Text
                  style={styles.additionalFunctionsText}
                >
                  {cameraType === 'front' ? '🤳' : '📷'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomCameraPanel}>
              <View style={styles.cameraBtnWrapper}>
                <TouchableOpacity onPress={takePicture} style={styles.snapshotBtn} />
              </View>
            </View>
          </Camera>
        </>
      )}
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
  },
  flashLightWrapper: {
    position: 'absolute',
    left: 20,
    bottom: 150
  },
  additionalFunctionsBtn: {
    borderRadius: 50,
    height: 30,
    width: 30
  },
  additionalFunctionsText: {
    fontSize: 27
  }
})
