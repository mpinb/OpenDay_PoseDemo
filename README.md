# OpenScienceDay Pose Demo

This project is a MoveNet-based pose estimation demo built with React and Node.js. It uses TensorFlow.js for in-browser pose detection and provides a modular, interactive frontend.

## Features
- Real-time pose estimation using MoveNet (MultiPose)
- Modular React frontend
- Offline model loading (no internet required at runtime)
- Multiple interactive demo pages
  - Stick Figure Disco
  - Simon Says : Do a pose and get a reward
  - Short Term Memory : Find the previously shown object
  - Long Term Memory : Find the previously shown object
  - Evade the Bear : Identify aversive auditory stimulus and move away
  - Evade the Owl : Identify aversive visual stimulus and move away
  - Quz : Answer Questions with options by making a certain posture
  
More interactive demonstrations are welcome!

## Prerequisites
- Node.js (v16 or newer recommended)
- npm (comes with Node.js)

## Installation
1. Clone this repository or download the source code.
2. Open a terminal in the project directory.
3. Install dependencies:
   ```sh
   npm install
   ```

## Running the App (Development)
Start the development server:
```sh
npm run dev
```

- The app will be available at `http://localhost:3000` (or the port shown in your terminal).
- Make sure your webcam is connected and allowed in your browser.


## Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm start` — Start the production server (after build)


## Disclaimer
This project was created with the assistance of GitHub Copilot and GPT-4.1.

## Acknowledgements

This demo was made by Peter Christ and Aditya Iyer, for the MPINB Bonn Open Day. Thanks to Laurin Büld, Eric Jelli, Anja Günther for assistance with debugging and setting up the demonmstration. 

Images for this demo were either generated with Gemini, or obtained from flaticons (Freepik, NajumNahar, pocike)

## License
Feel free to use with attribution.
