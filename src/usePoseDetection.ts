
import { useEffect, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

export async function loadDetector() {
  await tf.setBackend("webgl");
  await tf.ready();
  return poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
  });
}

export function usePoseDetection(videoRef: React.RefObject<HTMLVideoElement>) {
  const [poses, setPoses] = useState<poseDetection.Pose[]>([]);

  useEffect(() => {
    let detector: poseDetection.PoseDetector | null = null;
    let isMounted = true;
    const runPose = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            {
              modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
              modelUrl: '/movenet/multipose-lightning/model.json', // local path
            }
          );
      detect();

      async function detect() {
        if (!detector || !videoRef.current) return;
        const poseList = await detector.estimatePoses(videoRef.current);

        // Mirror output: flip x coordinates horizontally
        let mirrored: poseDetection.Pose[] = poseList;
        const video = videoRef.current;
        if (video && video.videoWidth > 0) {
          mirrored = poseList.map(pose => ({
            ...pose,
            keypoints: pose.keypoints.map(kp => ({
              ...kp,
              x: video.videoWidth - kp.x
            }))
          }));
        }
        if (isMounted) setPoses(mirrored);
        requestAnimationFrame(detect);
      }
    };

    runPose();

    return () => {
      isMounted = false;
      detector?.dispose();
    };
  }, [videoRef]);

  return poses;
}