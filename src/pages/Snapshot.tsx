import React from 'react';
import { CameraCapture } from '../components/Camera';
import { StartCameraView } from '../components/StartCameraView';
import {useCameraContext} from "../contexts/CameraContext";

export const SnapshotPage = () => {
  const { isCameraWorking } = useCameraContext();

  return (
    <>
      {isCameraWorking ? <CameraCapture /> :<StartCameraView />}
    </>
  );
};
