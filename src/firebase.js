

import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDnaoIlB-d04LW0zPk8M2AWHFRCg970Eto",
    authDomain: "instagram-react-tpn.firebaseapp.com",
    databaseURL: "https://instagram-react-tpn.firebaseio.com",
    projectId: "instagram-react-tpn",
    storageBucket: "instagram-react-tpn.appspot.com",
    messagingSenderId: "540491965555",
    appId: "1:540491965555:web:9b7d944ee1154083f27606",
    measurementId: "G-GPES4ZZZKC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {auth, storage,db};
//   export default db