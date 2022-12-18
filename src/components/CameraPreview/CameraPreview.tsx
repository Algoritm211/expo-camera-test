import React from 'react';
import {CameraCapturedPicture} from "expo-camera";
import {ImageBackground, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {useCameraContext} from "../../contexts/CameraContext";

interface Props {
  photo: CameraCapturedPicture | undefined
}

const CameraPreview: React.FC<Props> = ({photo}) => {
  const {retakePicture, savePhoto} = useCameraContext();
  console.log('Photo info', photo)
  return (
    <View style={styles.previewWrapper}>
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={styles.previewImg}
      >
        <View style={styles.actionSurface}>
          <View style={styles.previewActions}>
            <TouchableOpacity onPress={retakePicture} style={styles.previewBtnWrapper}>
              <Text style={styles.previewBtnText}>
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePhoto} style={styles.previewBtnWrapper}>
              <Text style={styles.previewBtnText}>
                Save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  previewWrapper: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  previewImg: {
    flex: 1
  },
  actionSurface: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end'
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  previewBtnWrapper: {
    width: 130,
    height: 40,
    alignItems: 'center',
    borderRadius: 4
  },
  previewBtnText: {
    color: '#fff',
    fontSize: 20
  }
})

export default CameraPreview;
