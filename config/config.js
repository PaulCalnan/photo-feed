import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCvsMahmgReF3r7PD0PLXoJBZFV7mUc5HY",
    authDomain: "photo-feed-e3e26.firebaseapp.com",
    databaseURL: "https://photo-feed-e3e26.firebaseio.com",
    projectId: "photo-feed-e3e26",
    storageBucket: "photo-feed-e3e26.appspot.com",
    messagingSenderId: "698520228856"
  };
  firebase.initializeApp(config);

  export const f = firebase;
  export const database = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();
