import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { useWebcam } from "./useWebcam";
import { usePoseDetection } from "./usePoseDetection";

interface WebcamPoseContextType {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoReady: boolean;
  poses: any;
}

const WebcamPoseContext = createContext<WebcamPoseContextType | undefined>(undefined);

export const WebcamPoseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [canDetect, setCanDetect] = useState(false);
  useWebcam(videoRef);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => setVideoReady(true);
    video.addEventListener('loadedmetadata', onReady);
    if (video.readyState >= 1) setVideoReady(true);
    return () => video.removeEventListener('loadedmetadata', onReady);
  }, []);
  // Only allow pose detection when video is ready and has valid dimensions
  useEffect(() => {
    const checkDims = () => {
      const v = videoRef.current;
      if (v && v.videoWidth > 0 && v.videoHeight > 0) setCanDetect(true);
      else setCanDetect(false);
    };
    if (videoReady) {
      checkDims();
      const id = setInterval(checkDims, 100);
      return () => clearInterval(id);
    } else {
      setCanDetect(false);
    }
  }, [videoReady]);
  const poses = usePoseDetection(canDetect ? videoRef : { current: null } as any);
  return (
    <WebcamPoseContext.Provider value={{ videoRef, videoReady: canDetect, poses }}>
      {children}
    </WebcamPoseContext.Provider>
  );
};

export function useWebcamPose() {
  const ctx = useContext(WebcamPoseContext);
  if (!ctx) throw new Error("useWebcamPose must be used within WebcamPoseProvider");
  return ctx;
}
