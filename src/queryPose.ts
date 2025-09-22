// handRaiseDetection.ts
// Module to detect if a person is raising both hands using pose landmarks

export interface PoseLandmark {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

export function isBothHandsRaised(landmarks: PoseLandmark[]): boolean {

  const nose = landmarks[0];
  const leftElbow = landmarks[7];
  const rightElbow = landmarks[8];

  if (!nose || !leftElbow || !rightElbow) return false;

  // Check if both wrists are above their respective shoulders (y is smaller when higher)
  const leftHandRaised = nose.y > leftElbow.y;
  const rightHandRaised = nose.y > rightElbow.y;

  return leftHandRaised && rightHandRaised;
}

  // Calculate the angle at the right elbow
export function getAngle(a: PoseLandmark, b: PoseLandmark, c: PoseLandmark): number {
    const ab = { x: a.x - b.x, y: a.y - b.y };
    const cb = { x: c.x - b.x, y: c.y - b.y };
    const dot = ab.x * cb.x + ab.y * cb.y;
    const magAB = Math.sqrt(ab.x * ab.x + ab.y * ab.y);
    const magCB = Math.sqrt(cb.x * cb.x + cb.y * cb.y);
    const angle = Math.acos(dot / (magAB * magCB));
    return angle * (180 / Math.PI);
  }

export function isTPose(landmarks: PoseLandmark[]): boolean {
    const ls = landmarks[5], le = landmarks[7], lw = landmarks[9];
    const rs = landmarks[6], re = landmarks[8], rw = landmarks[10];
    const reye = landmarks[1], leye = landmarks[2];
    const buffer = 2 * (reye.x - leye.x); // Allow some buffer for arm position

    if (![ls, le, lw, rs, re, rw, reye, leye].every(Boolean)) return false;

    const rightElbowAngle = getAngle(rs, re, rw);
    const leftElbowAngle = getAngle(ls, le, lw);

    const elbowsStraight = rightElbowAngle > 150 && rightElbowAngle < 210
      && leftElbowAngle > 150 && leftElbowAngle < 210;

    const rightArm = rw.y < (rs.y - buffer) && rw.y > reye.y;
    const leftArm = lw.y < (ls.y - buffer) && lw.y > leye.y;

    return elbowsStraight && rightArm && leftArm;
  }

export function isToesTouched(landmarks: PoseLandmark[]): boolean {

    const rightWrist = landmarks[10];
    const leftWrist = landmarks[9];
    const rightKnee = landmarks[13];
    const leftKnee = landmarks[14];

    if (!rightWrist || !leftWrist || !rightKnee || !leftKnee) return false;

    // Check if the wrists are below the knees (y is larger when lower)
    const rightWristTouching = rightWrist.y > rightKnee.y;
    const leftWristTouching = leftWrist.y > leftKnee.y;

    return rightWristTouching && leftWristTouching;
}

export function isRightSide(landmarks: PoseLandmark[]): boolean {
  const nose = landmarks[0];
  if (!nose) return false;
  return nose.x < 900; // Assuming normalized coordinates (0 to 1)
}


export function isTouchingObject(landmarks: PoseLandmark[], objectX: number, objectY: number, threshold: number = 50): boolean {
  const rightWrist = landmarks[10];
  const leftWrist = landmarks[9];
  if (!rightWrist || !leftWrist) return false;

  const rightTouching = Math.abs(rightWrist.x - objectX) < threshold && Math.abs(rightWrist.y - objectY) < threshold;
  const leftTouching = Math.abs(leftWrist.x - objectX) < threshold && Math.abs(leftWrist.y - objectY) < threshold;

  return rightTouching || leftTouching;
}