import React from 'react'
import {CameraCapture} from "./src/components/Camera";
import {CameraContextProvider, useCameraContext} from "./src/contexts/CameraContext";
import {StartCameraView} from "./src/components/StartCameraView";

const App = () => {
  const { isCameraWorking } = useCameraContext();
  return (
    <CameraContextProvider>
      {isCameraWorking ? <CameraCapture /> :<StartCameraView />}
    </CameraContextProvider>
  )
}

export default App;
