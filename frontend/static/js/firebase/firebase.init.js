/* eslint-disable no-undef */
/* eslint-disable camelcase */

const config = {
  apiKey: 'AIzaSyBTfJEdTTo6088uldIhM9xapCouLYkLQ_I',
  authDomain: 'crwn-db-83de3.firebaseapp.com',
  projectId: 'crwn-db-83de3',
  storageBucket: 'crwn-db-83de3.appspot.com',
  messagingSenderId: '659742886412',
  appId: '1:659742886412:web:f819d6dccc41ac8f7ebc29',
  measurementId: 'G-5VP94WSY0L'
}

export const firebase_app = firebase.initializeApp(config)

export const auth = firebase_app.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
