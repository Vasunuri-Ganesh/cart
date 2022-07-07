import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTBBp303cFKw2_xmCyo-XmsirVCOsRReA",
  authDomain: "cart-277e4.firebaseapp.com",
  projectId: "cart-277e4",
  storageBucket: "cart-277e4.appspot.com",
  messagingSenderId: "675313293181",
  appId: "1:675313293181:web:86bb9d1b88f39bdf395e14"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



