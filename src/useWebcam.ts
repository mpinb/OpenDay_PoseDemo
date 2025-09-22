import { useEffect, useRef } from "react";

export function useWebcam(videoRef: React.RefObject<HTMLVideoElement>) {
  useEffect(() => {
    let stream: MediaStream | null = null;
    const getWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.style.transform = 'scaleX(-1)'; // Mirror the webcam
        }
      } catch (err) {
        console.error("Webcam error:", err);
      }
    };
    getWebcam();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef]);
}