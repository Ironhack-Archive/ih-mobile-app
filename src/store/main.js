import { AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import msgs from './msgs'
import { getDB } from '../firebase'
import NavigationService from '../NavigationService'

const t = {
  completion: {
    'course-1': {
      chapters: {
        'chapter-1': {
          card: 5,
          isCompleted: false,
        },
      },
      isCompleted: false,
    },
  },
}

const INITIAL_STATE = {
  userID: null,
  courses: null,
  completion: null,
  userInfos: null,
  actualExercise: null,
  keyboardVisible: false,
}

const updateCompletion = async (userID, completion) => {
  await AsyncStorage.setItem('completion', JSON.stringify(completion))
  const db = getDB()
  db.collection('completion').doc(userID).set(completion, { merge: true })
}

const updateUserNameState = (state, name) => {
  const userInfos = {
    ...state.userInfos,
    name: name,
  }
  // console.log(JSON.stringify(userInfos))
  AsyncStorage.setItem('userInfos', JSON.stringify(userInfos)).then(console.log).catch(console.log)
  return {
    ...state,
    userInfos,
  }
}

const updateUserEmailState = (state, email) => {
  const userInfos = {
    ...state.userInfos,
    email: email,
  }
  // console.log(JSON.stringify(userInfos))
  AsyncStorage.setItem('userInfos', JSON.stringify(userInfos)).then(console.log).catch(console.log)
  return {
    ...state,
    userInfos,
  }
}

const updateUserBioState = (state, userBio) => {
  const userInfos = {
    ...state.userInfos,
    bio: userBio,
  }
  AsyncStorage.setItem('userInfos', JSON.stringify(userInfos))
  return {
    ...state,
    userInfos,
  }
}

const updateUserInfosState = (state, userInf) => {
  const userInfos = {
    ...state.userInfos,
    ...userInf,
  }
  AsyncStorage.setItem('userInfos', JSON.stringify(userInfos))
  return {
    ...state,
    userInfos,
  }
}

const updateEmailNotifications = (state, action) => {
  const userInfos = {
    ...state.userInfos,
    emailNotifications: action.value,
  }
  AsyncStorage.setItem('userInfos', JSON.stringify(userInfos))
  const db = getDB()
  db.collection('userInfos').doc(state.userID).set(userInfos, { merge: true })
  return {
    ...state,
    userInfos,
  }
}

const updateCompletionCard = (state, { courseId, card }) => {
  const completion = state ? state.completion || {} : {}
  const course = completion[courseId] || {}
  const newCompletion = {
    ...completion,
    [courseId]: {
      ...course,
      card
    }
  }
  // console.log(newCompletion)
  updateCompletion(state.userID, newCompletion)
  return {
    ...state,
    completion: newCompletion,
  }
}

const updateChapterAsCompleted = (state, { courseId }) => {
  const completion = state ? state.completion || {} : {}
  const course = completion[courseId] || {}
  const newCompletion = {
    ...completion,
    [courseId]: {
      ...course,
      isCompleted: true
    }
  }
  // console.log(newCompletion)
  updateCompletion(state.userID, newCompletion)
  return {
    ...state,
    completion: newCompletion,
  }
}

const resetChaptersCompletion = (state, courseId) => {
  const completion = {
    ...state.completion,
    [courseId]: {
      ...state.completion[courseId],
      card: 0,
    }
  }
  // console.log(completion)
  updateCompletion(state.userID, completion)
  return {
    ...state,
    completion,
  }
}

const updateExerciseCompletion = (state, action) => {
  const completion = {
    ...state.completion,
    [action.courseId]: {
      ...state.completion[action.courseId],
      exercise: action.state,
      isCompleted: true,
      completionDate: Date.now()
    },
  }
  if (action.state === 'skipped' || state.completion.twoExercisesDone) {
    updateCompletion(state.userID, completion)
    return {
      ...state,
      completion
    }
  } else {
    const lastExerciseDid = state.completion.lastExerciseDid
    if (lastExerciseDid) {
      const now = Date.now()
      if (Math.floor((now - lastExerciseDid) / 1000) < 86400) {
        const newCompletion = {
          ...completion,
          lastExerciseDid: now,
          twoExercisesDone: true,
        }
        updateCompletion(state.userID, newCompletion)
        return {
          ...state,
          completion: newCompletion,
        }
      } else {
        const newCompletion = {
          ...completion,
          lastExercisesDid: now,
        }
        updateCompletion(state.userID, newCompletion)
        return {
          ...state,
          completion: newCompletion,
        }
      }
    } else {
      console.log('there')
      const newCompletion = {
        ...completion,
        lastExerciseDid: Date.now()
      }
      updateCompletion(state.userID, newCompletion)
      return {
        ...state,
        completion: newCompletion
      }
    }
  }
  // console.log(completion)
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case msgs.UPDATE_USER_ID: return { ...state, userID: action.userID }
    case msgs.UPDATE_USER_BIO: return updateUserBioState(state, action.value)
    case msgs.UPDATE_COMPLETION: return { ...state, completion: action.value }
    case msgs.UPDATE_USER_INFOS: return updateUserInfosState(state, action.value)
    case msgs.UPDATE_COURSES: return { ...state, courses: action.value }
    case msgs.UPDATE_USER_NAME: return updateUserNameState(state, action.value)
    case msgs.UPDATE_USER_EMAIL: return updateUserEmailState(state, action.value)
    case msgs.UPDATE_COMPLETION_CARD: return updateCompletionCard(state, action)
    case msgs.UPDATE_CHAPTER_AS_COMPLETED: return updateChapterAsCompleted(state, action)
    case msgs.RESET_CHAPTERS_COMPLETION: return resetChaptersCompletion(state, action.courseId)
    case msgs.UPDATE_ACTUAL_EXERCISE: return { ...state, actualExercise: action.value }
    case 'UPDATE_EXERCISE_COMPLETION': return updateExerciseCompletion(state, action)
    case 'UPDATE_EMAIL_NOTIFICATIONS': return updateEmailNotifications(state, action)
    case msgs.UPDATE_KEYBOARD: return { ...state, keyboardVisible: action.value }
    case 'UPDATE_BADGE': {
      console.log(action)
      const completion = { ...state.completion, [action.badgeName]: true }
      console.log(completion)
      updateCompletion(state.userID, completion)
      return { ...state, completion }
    }
    default: return state
  }
}

export default reducer
