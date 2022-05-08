import { firestore } from './firebase.init.js'

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData
    })
  };
  return userRef
}

export const fetchCollection = async (collectionName) => {
  const state = {}
  let data = ''
  await firestore.collection(collectionName).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data = doc.data()
      state[data.title] = data
    })
    localStorage.setItem(collectionName, JSON.stringify(state))
  }).catch(
    (error) => {
      console.log(error)
    }
  )
}
