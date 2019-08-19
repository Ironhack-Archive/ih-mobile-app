import { AsyncStorage } from 'react-native'

import msgs from './msgs'
import seeds from './seeds'
import { getDB } from '../firebase'
import * as firebase from 'firebase'

const getOrSetCompletion = async dispatch => {
  const completion = await AsyncStorage.getItem('completion')
  if (completion) {
    dispatch(updateCompletion(JSON.parse(completion)))
  } else {
    const basicCompletion = {}
    dispatch(updateCompletion(basicCompletion))
  }
  return Promise.resolve()
}

const getOrSetUserInfos = async (userID, dispatch) => {
  const userInfos = await AsyncStorage.getItem('userInfos')
  if (userInfos) {
    dispatch(updateUserInfos(userID, JSON.parse(userInfos)))
  } else {
    const result = await fetchUserInfos(userID)
    dispatch(updateUserInfos(userID, result))
  }
  return Promise.resolve()
}

const getOrSetCourses = async dispatch => {
  await AsyncStorage.removeItem('courses')
  const courses = await AsyncStorage.getItem('courses')
  if (courses) {
    dispatch(updateCourses(JSON.parse(courses)))
  } else {
    const courses = seeds
    dispatch(updateCourses(courses))
  }
  return Promise.resolve()
}

const fetchCompletion = async (userID, dispatch) => {
  const db = getDB()
  try {
    const doc = await db.collection('completion').doc(userID).get()
    const data = doc.data()
    if (data) {
      dispatch(updateCompletion(doc.data()))
    }
    return Promise.resolve()
  } catch(error) {
    console.error(error)
    return Promise.resolve()
  }
}

const fetchUserInfos = async (userID, dispatch) => {
  const db = getDB()
  const basicUserInfos = { email: '', name: '', emailNotifications: true }
  try {
    const doc = await db.collection('userInfos').doc(userID).get()
    const data = doc.data()
    if (data) {
      return doc.data()
    } else {
      return Promise.resolve(basicUserInfos)
    }
  } catch(error) {
    console.error(error)
    return Promise.resolve(basicUserInfos)
  }
}

const updateUserAndFetchData = (userID, name, email) => async dispatch => {
  dispatch(updateUserID(userID))
  await getOrSetUserInfos(userID, dispatch)
  await getOrSetCompletion(dispatch)
  await getOrSetCourses(dispatch)
  if (name) {
    dispatch(updateUserName(userID, name))
  }
  if (email) {
    dispatch(updateUserEmail(userID, email))
  }
  await fetchCompletion(userID, dispatch)
  await fetchUserInfos(userID, dispatch)
}

const updateUserID = userID => async dispatch => {
  await AsyncStorage.setItem('userID', JSON.stringify(userID))
  dispatch({
    type: msgs.UPDATE_USER_ID,
    userID,
  })
}

const updateUserBio = (userID, bio) => {
  const db = getDB()
  db.collection('userInfos').doc(userID).set({ bio: bio }, { merge: true })
  return {
    type: msgs.UPDATE_USER_BIO,
    value: bio,
  }
}

const updateUserInfos = (userID, userInfos) => async dispatch => {
  const db = getDB()
  db.collection('userInfos').doc(userID).set(userInfos, { merge: true })
  dispatch({
    type: msgs.UPDATE_USER_INFOS,
    value: userInfos,
  })
}

const updateCompletion = completion => async dispatch => {
  await AsyncStorage.setItem('completion', JSON.stringify(completion))
  dispatch({
    type: msgs.UPDATE_COMPLETION,
    value: completion,
  })
}

const updateUserName = (userID, name) => {
  const db = getDB()
  db.collection('userInfos').doc(userID).set({ name: name }, { merge: true })
  return {
    type: msgs.UPDATE_USER_NAME,
    value: name,
  }
}

const updateUserEmail = (userID, email) => {
  const db = getDB()
  db.collection('userInfos').doc(userID).set({ email: email }, { merge: true })
  return {
    type: msgs.UPDATE_USER_EMAIL,
    value: email,
  }
}

const updateCourses = courses => async dispatch => {
  await AsyncStorage.setItem('courses', JSON.stringify(courses))
  dispatch({
    type: msgs.UPDATE_COURSES,
    value: courses,
  })
}

const updateCompletionCard = (courseId, card) => {
  return {
    type: msgs.UPDATE_COMPLETION_CARD,
    courseId,
    card,
  }
}

const updateChapterAsCompleted = (courseId) => {
  return {
    type: msgs.UPDATE_CHAPTER_AS_COMPLETED,
    courseId,
  }
}

const resetChaptersCompletion = courseId => {
  return {
    type: msgs.RESET_CHAPTERS_COMPLETION,
    courseId,
  }
}

const updateKeyboard = keyboardVisible => {
  return {
    type: msgs.UPDATE_KEYBOARD,
    value: keyboardVisible,
  }
}

export {
  updateUserID,
  updateUserAndFetchData,
  updateUserBio,
  updateCompletion,
  updateUserInfos,
  updateUserName,
  updateCompletionCard,
  updateChapterAsCompleted,
  resetChaptersCompletion,
  updateKeyboard,
}
