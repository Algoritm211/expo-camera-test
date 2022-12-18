import React, {RefObject, useContext, useRef, useState} from 'react';
import {Camera, CameraCapturedPicture} from "expo-camera";
import {Alert} from "react-native";

interface CameraContextProps {
  cameraRef: RefObject<Camera>
  isCameraWorking: boolean,
  previewVisible: boolean,
  capturedImage: CameraCapturedPicture | null;
  setIsCameraWorking: (val: boolean) => void,
  onStartCamera: () => void,
  takePicture: () => void,
  retakePicture: () => void,
  savePhoto: () => void,
}

const CameraContext = React.createContext<CameraContextProps>({} as CameraContextProps)
CameraContext.displayName = 'CameraContext'

export const CameraContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isCameraWorking, setIsCameraWorking] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | null>(null)
  const cameraRef = useRef<Camera>(null)

  const onStartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      setIsCameraWorking(true)
    } else {
      Alert.alert("Access denied")
    }
  }

  const takePicture = async () => {
    if (!cameraRef.current) return
    const photo = await cameraRef.current.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    void onStartCamera()
  }

  const savePhoto = () => {
    setIsCameraWorking(false)
    console.log('Photo was saved')
  }

  const contextValue = {
    cameraRef,
    isCameraWorking,
    previewVisible,
    capturedImage,
    setIsCameraWorking,
    onStartCamera,
    takePicture,
    retakePicture,
    savePhoto,
  }

  return (
    <CameraContext.Provider value={contextValue}>
      {children}
    </CameraContext.Provider>
  )
}

export const useCameraContext = () => useContext(CameraContext);
