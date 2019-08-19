import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "my_key",
  authDomain: "my_domain",
  databaseURL: "my_database_url",
  projectId: "project_id",
  storageBucket: "storage_bucket",
  messagingSenderId: "_id"
}

firebase.initializeApp(config)

const setPersistence = async fun => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  return fun()
}

const signIn = (email, password) => {
  return setPersistence(() => firebase.auth().signInWithEmailAndPassword(email, password))
}

const signUp = (email, password) => {
  return setPersistence(() => firebase.auth().createUserWithEmailAndPassword(email, password))
}

const getDB = () => {
  const db = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  db.settings(settings)
  return db
}

const auth = {
  signIn,
  signUp,
}

export { auth, getDB }
