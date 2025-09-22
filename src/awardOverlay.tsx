import React, { useRef, useEffect } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";

import "./App.css";

type Props = {
  poses: poseDetection.Pose[];
  videoRef: React.RefObject<HTMLVideoElement>;
  awardFunction: (keypoints: poseDetection.Keypoint[]) => boolean;
  awardImage: HTMLImageElement;
  punishImage?: HTMLImageElement;
  alpha?: number;
};

const drawAwardImage = (ctx: CanvasRenderingContext2D, pose: poseDetection.Pose, image: HTMLImageElement ) => {
  const nose = pose.keypoints[0];
  const leftEye = pose.keypoints[1];
  const rightEye = pose.keypoints[2];
  if (nose && nose.score && nose.score > 0.3) {
    // Use absolute value for offset, fallback to -30 if eyes are not detected
    let offsetY = -30;
    if (
      leftEye && rightEye &&
      leftEye.score !== undefined && leftEye.score > 0.3 &&
      rightEye.score !== undefined && rightEye.score > 0.3
    ) {
      offsetY = 2 * Math.abs(leftEye.x - rightEye.x);
    }
    ctx.save();
    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = 10;
    ctx.drawImage(image, nose.x - 20, nose.y - offsetY - 20, 100, 100);
    ctx.restore();
  }
};

export const AwardOverlay: React.FC<Props> = ({ poses, videoRef, awardFunction, awardImage, punishImage, alpha }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Ensure canvas matches video size and position
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.style.width = video.style.width;
    canvas.style.height = video.style.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    poses.forEach(pose => {
      // Draw a medal image over the head if both hands are raised
      if (awardFunction(pose.keypoints)) {
        drawAwardImage(ctx, pose, awardImage);
      }
      else {
        if (punishImage && punishImage.complete) {
          drawAwardImage(ctx, pose, punishImage);
        }
      }
    });
  }, [poses, videoRef]);

  return (
    <canvas
      ref={canvasRef}
      className="overlay award-overlay"
      aria-hidden="true"
      style={{ opacity: alpha !== undefined ? alpha : 1 }}
    />
  );
};