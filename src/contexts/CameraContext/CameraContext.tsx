import React, {RefObject, useContext, useRef, useState} from 'react';
import {Camera} from "expo-camera";
import {Alert} from "react-native";

interface CameraContextProps {
  cameraRef: RefObject<Camera>
  isCameraWorking: boolean,
  setIsCameraWorking: (val: boolean) => void,
  onStartCamera: () => void,
  takePicture: () => void,
}

const CameraContext = React.createContext<CameraContextProps>({} as CameraContextProps)
CameraContext.displayName = 'CameraContext'

export const CameraContextProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isCameraWorking, setIsCameraWorking] = useState(false);
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
    setIsCameraWorking(false)
    if (!cameraRef.current) return
    const photo = await cameraRef.current.takePictureAsync()
    console.log(photo)
  }

  const contextValue = {
    cameraRef,
    isCameraWorking,
    setIsCameraWorking,
    onStartCamera,
    takePicture,
  }

  return (
    <CameraContext.Provider value={contextValue}>
      {children}
    </CameraContext.Provider>
  )
}

export const useCameraContext = () => useContext(CameraContext);
