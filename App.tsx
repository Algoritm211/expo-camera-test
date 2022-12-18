import React from 'react'
import {CameraContextProvider, useCameraContext} from "./src/contexts/CameraContext";
import {SnapshotPage} from "./src/pages/Snapshot";

const App = () => {
  return (
    <CameraContextProvider>
      <SnapshotPage />
    </CameraContextProvider>
  )
}

export default App;
