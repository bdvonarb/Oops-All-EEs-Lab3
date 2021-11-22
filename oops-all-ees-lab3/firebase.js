const config = {
    apiKey: process.env.GATSBY_FIREBASE_API_KEY,
    databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
    projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
}

let firebaseInstance
export const getFirebase = firebase => {
  if (firebaseInstance) {
    return firebaseInstance
  } 

  firebaseInstance = firebase.initializeApp(config)

  return firebaseInstance
}

export default getFirebase