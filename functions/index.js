const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const sgMail = require('@sendgrid/mail')
const admin = require('firebase-admin')
const { google } = require('googleapis')
const fs = require('fs')

const serviceAccount = require('./service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ironboost-wolfox-cloud.firebaseio.com",
})

const firestore = admin.firestore()
firestore.settings({
  timestampsInSnapshots: true,
})

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

const oAuth2Client = new google.auth.OAuth2(
  functions.config().sheets.client_id,
  functions.config().sheets.client_secret,
  'https://us-central1-ironboost-wolfox-cloud.cloudfunctions.net/OauthCallback'
)

const syllabusMail = fs.readFileSync('./syllabus_request.html', 'utf8')
const admissionResponse = fs.readFileSync('./admission_response.html', 'utf8')

function sendEmailHelp(request, response) {
  cors(request, response, () => {
    // Set SendGrid API Key
    sgMail.setApiKey(functions.config().sendgrid.key)
    // Get the content body
    const content = request.body
    console.log(content)
    if (content.email === null || content.email === undefined) {
      response.status(500).send('Malformed email')
    } else {
      const msg = {
        to: content.email,
        from: functions.config().sendgrid.from,
        subject: "Syllabus Request :)",
        html: syllabusMail.replace('##username##', content.name)
      }

      // Send and go!
      sgMail.send(msg)
        .then(result => {
          console.log(result)
          response.status(200).send()
          return
        })
        .catch(error => {
          console.log(error)
          response.status(500).send('SGMail don’t work')
          return
        })
    }
  })
}

const extractCourseContent = (id, completion = {}) => {
  if (completion[id]) {
    const course = completion[id] || {}
    const { exercise } = course
    if (exercise) {
      if (exercise === 'skipped') {
        return 'skipped'
      } else {
        return exercise.text
      }
    } else {
      return 'Not done'
    }
  } else {
    return 'Not done'
  }
}

const extractCourseImage = (id, completion = {}) => {
  if (completion[id]) {
    const course = completion[id] || {}
    const { exercise } = course
    if (exercise) {
      if (exercise === 'skipped') {
        return 'skipped'
      } else {
        return exercise.image
      }
    } else {
      return 'Not done'
    }
  } else {
    return 'Not done'
  }
}

const extractCourseLinks = (id, completion = {}) => {
  if (completion[id]) {
    const course = completion[id] || {}
    const { exercise } = course
    if (exercise) {
      if (exercise === 'skipped') {
        return [ 'skipped', 'skipped', 'skipped' ]
      } else {
        return [ exercise.link1, exercise.link2, exercise.link3 ]
      }
    } else {
      return [ 'Not done', 'Not done', 'Not done' ]
    }
  } else {
    return [ 'Not done', 'Not done', 'Not done' ]
  }
}

const receivedText = (completion) => {
  const first = extractCourseImage('course-1', completion)
  const second = extractCourseContent('course-2', completion)
  const third = extractCourseLinks('course-3', completion)
  const fourth = extractCourseImage('course-4', completion)
  const fifth = extractCourseContent('course-5', completion)
  return (
    `
    Exercise 1: Find a problem around you and take picture to justify the existence of this problem!
      Answer: ${first}
    Exercise 2: Identify the problem by proposing several How Might We.
      Answer: ${second}
    Exercise 3: Look for 3 references of solutions already on the market to see what is currently being done.
      Answer:
        First ${third[0]}
        Second ${third[1]}
        Third ${third[2]}
    Exercise 4: Generate 8 ideas in 8 minutes: 1 min, 1 idea! And upload a picture of your work!
      Answer: ${fourth}
    Exercise 5: Present the 3 ideas you have selected to 3 people and let them choose the one they find most relevant. Don’t hesitate to ask them why ;)
      Answer: ${fifth}
    `
  )
}

const applyingStatus = (postulate = {}) => {
  const {
    city,
    partOrFullTime,
    editions,
    firstName,
    lastName,
    email,
    phone,
    gender,
  } = postulate
  return (`
    City: ${city}
    Part or Full Time: ${partOrFullTime}
    Editions: ${editions.join(' ')}
    First Name: ${firstName}
    Last Name: ${lastName}
    Email: ${email}
    Phone: ${phone}
    Gender: ${gender}
  `)
}

function postulateHelp(request, response) {
  cors(request, response, async () => {
    // Set SendGrid API Key
    sgMail.setApiKey(functions.config().sendgrid.key)
    // Get the content body
    const content = request.body
    console.log(content)
    if (!content.userID || !content.email) {
      response.status(500).send('Wrong ID')
    } else {
      const completionDoc = await firestore.collection('completion').doc(content.userID).get()
      const completion = completionDoc.data()
      const userInfosDoc = await firestore.collection('userInfos').doc(content.userID).get()
      const userInfos = userInfosDoc.data()

      const receiverMsg = {
        to: functions.config().postulate.sender, // 'internal-paris@ironhack.com'
        from: functions.config().sendgrid.from, // 'paris@ironhack.com'
        subject: "A new person applied through the app!",
        text: 'Here’s what he did\n\n' + receivedText(completion) + '\n\n' + applyingStatus(content.postulate),
      }

      const postulantMsg = {
        to: content.email,
        from: functions.config().sendgrid.from,
        subject: '##username##, you just applied to Ironhack. Get ready to change your life!'.replace('##username##', userInfos.name),
        html: admissionResponse.replace(/##username##/g, userInfos.name)
      }

      // Send and go!
      const receiverSent = sgMail.send(receiverMsg)
      const postulantSent = sgMail.send(postulantMsg)
      Promise.all([ receiverSent, postulantSent ])
        .then(result => {
          console.log(result)
          response.status(200).send()
          return
        })
        .catch(error => {
          console.log(error)
          response.status(500).send('SGMail don’t work')
          return
        })
    }
  })
}

function authGoogleAPIHelp(request, response) {
  response.redirect(oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  }))
}

function getToken(request, response) {
  const code = request.query.code
  return oAuth2Client.getToken(code, (error, tokens) => {
    if (error) {
      return response.status(400).send(error)
    } else {
      return firestore.collection('tokens').doc('token').set(tokens)
        .then(() => response.redirect('/exportUserData'))
        .catch(error => {
          console.error(error)
          response.status(500).send('Unable to save the token into firestore. Wrong setup of Firebase?')
        })
    }
  })
}

function OauthCallbackHelp(request, response) {
  return getToken(request, response)
}

function reduceNumberOfExercisesAndCards(completion) {
  return function([ cards, exercises ], val) {
    const complete = completion[val]
    if (!complete.card) {
      return [ cards, exercises ]
    } else {
      return [
        cards + (complete.card || 0),
        exercises + (complete.exercise === 'skipped' ? 0 : 1),
      ]      
    }
  }
}

function computeNumberOfExercisesAndCards(completion) {
  return Object.keys(completion).reduce(
    reduceNumberOfExercisesAndCards(completion),
    [ 0, 0 ]
  )
}

function computeBeginningLine(user, completion) {
  if (completion) {
    const [ cards, exercises ] = computeNumberOfExercisesAndCards(completion)
    return [
      user.email,
      cards,
      exercises,
    ].join(';')
  } else {
    return user.email
  }
}

async function getUserInfosAndCompletion(user) {
  try {
    const completionDoc = await firestore.collection('completion').doc(user.uid).get()
    const completion = completionDoc.data()
    const userInfosDoc = await firestore.collection('userInfos').doc(user.uid).get()
    const userInfos = userInfosDoc.data()
    const start = computeBeginningLine(user, completion)
    if (userInfos) {
      return [ userInfos.name, start ].join(';')
    } else {
      return ';' + start
    }
  } catch (error) {
    console.error(error)
    return ''
  }
}

async function dumpUsers() {
  try {
    console.log('testeset')
    const snapshots = await firestore.collection('userInfos').get()
    console.log('aurstauenenrsernseunrsaieun');
    console.log(snapshots);
    let users = []
    snapshots.forEach(doc => {
      console.log(doc)
      console.log(doc.data())
      users.push({
        uid: doc.id,
        email: doc.data().email,
      })
    })
    console.log(users);
    return await Promise.all(users.map(getUserInfosAndCompletion))
  } catch (error) {
    return []
  }
}

async function generateResults() {
  const headRow = [
    'User Name',
    'User Email',
    'Cards Read', // TODO
    'Exercises Done',
    'Apply', // TODO Bool
  ].join(';')
  const results = await dumpUsers()
  const joinedResults = results.join('\n')
  const finalResults = [ headRow, joinedResults ].join('\n')
  return finalResults
}

function generateBatchUpdateRequests(data) {
  return {
    requests: [{
      pasteData: {
        coordinate: {
          sheetId: 0,
          rowIndex: 0,
          columnIndex: 0,
        },
        data,
        type: 'PASTE_NORMAL',
        delimiter: ';',
      }
    }]
  }
}

async function writeInGoogleSheet() {
  const doc = await firestore.collection('tokens').doc('token').get()
  const token = doc.data()
  oAuth2Client.setCredentials(token)

  const finalResults = await generateResults()
  const batchUpdateRequests = generateBatchUpdateRequests(finalResults)

  const sheets = google.sheets({ version: 'v4', auth: oAuth2Client })
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.batchUpdate({
      spreadsheetId: functions.config().sheets.sheet_id,
      resource: batchUpdateRequests,
    }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

async function exportUserDataHelp(request, response) { // eslint-disable-line
  try {
    const sheetsResponse = await writeInGoogleSheet()
    console.log(sheetsResponse)
    response.redirect(`https://docs.google.com/spreadsheets/d/${functions.config().sheets.sheet_id}`)
  } catch (error) {
    console.error(error)
    response.status(500).send('Unable to write to Google Sheets. Did you granted access and given to give API access?')
  }
}

exports.authGoogleAPI = functions.https.onRequest(authGoogleAPIHelp)
exports.exportUserData = functions.runWith({ timeoutSeconds: 540, memory: '2GB' }).https.onRequest(exportUserDataHelp)
exports.OauthCallback = functions.https.onRequest(OauthCallbackHelp)
exports.postulate = functions.https.onRequest(postulateHelp)
exports.sendEmail = functions.https.onRequest(sendEmailHelp)
