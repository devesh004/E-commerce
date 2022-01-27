// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8TcZv_u9dK-cXcELlMcZe26keCSr8-lA",
  authDomain: "shopping-app-df1d9.firebaseapp.com",
  databaseURL:
    "https://shopping-app-df1d9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shopping-app-df1d9",
  storageBucket: "shopping-app-df1d9.appspot.com",
  messagingSenderId: "486159152966",
  appId: "1:486159152966:web:0c27c83e0b4a6d70611747",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
