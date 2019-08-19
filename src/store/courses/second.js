function content(...value) {
  return {
    metatype: 'content',
    metavalue: value,
  }
}

function quizz(question, answers, right, wrong, ...questions) {
  return {
    metatype: 'quizz',
    metavalue: {
      answers,
      right,
      wrong,
      question,
      questions,
    },
  }
}

function questionPicture(picture, value) {
  return {
    picture,
    value,
  }
}

function picture(value) {
  return {
    type: 'picture',
    value,
  }
}

function text(value) {
  return {
    type: 'content',
    value,
  }
}

module.exports = {
  id: "course-2",
  data: {
    badge: require('./first/Badge2.png'),
    categories: [
      "Design Thinking"
    ],
    duration: 10,
    numberConcepts: 2,
    picture: require("./2/2.jpg"),
    title: "Define & Generalize the problem",
    description: {
      title: 'What is management?',
      subTitle: 'Basics and introduction',
    },
    exerciseDescription: {
      title: 'Lorem',
      subTitle: 'Ipsum',
      subSubTitle: 'Dolor Sit Amet',
    }
  },
  introduction: `This part will allow you to understand how to define the problem, the second step of the Design Thinking method.\n\nAt this point, the aim is to better understanding the topic, understanding the context surrounding a problem to avoid going in the wrong direction.`,
  cards: [
    content(
      picture(require('./2/entretien.jpg')),
      text('The first step in designing a digital product is to understand the user’s needs.'),
    ),
    content(
      picture(require('./2/jambes.jpg')),
      text('A problem is not experienced by everyone the same way.'),
    ),
    content(
      picture(require('./2/panneaux.jpg')),
      text('Also, note that users’ needs are not necessarily similar to your own!'),
    ),
    content(
      picture(require('./2/lentillephoto.jpg')),
      text('It is crucial to successfully understand the user and first of all to observe their behovior.'),
    ),
    content(
      picture(require('./2/whywhy.jpg')),
      text('Often the real problem is not the one that users first mention. Hence, it is necessary to look at the user’s environment and explore the "why", in order to discover the origin of the problem.'),
    ),
    content(
      picture(require('./2/why.jpg')),
      text('One of the UX tools is the “5-why protocol”. This method helps to determine the root cause of a problem by repeating the question "Why?". Each answer forms the basis of the next question.')
    ),
    quizz(
      'Imagine you are building a new social network. How would you better define problems users are facing?',
      [ 0, 2 ],
      'Yes! Friends and people in the street are your direct users! They will guide you to the path of enlightment.',
      'Asking your dinosaur does not seem like a good idea. It would probably be fun but unhelpful. Obi-Wan Kenobi died a long time ago in a galaxy far far away…',
      questionPicture(require('./second/FRIENDS.jpeg'), 'Ask your friends'),
      questionPicture(require('./second/DINO2.jpeg'), 'Ask your domestic pet dinosaur'),
      questionPicture(require('./second/STREET.jpeg'), 'Ask random users in the street'),
      questionPicture(require('./second/OBIWAN.jpg'), 'Ask Obi-Wan Kenobi'),
    ),
    content(
      picture(require('./2/whychamps.jpg')),
      text('So, the real question is not “what” users want, but “why”.'),
    ),
    content(
      picture(require('./2/date.jpg')),
      text('However, it’s true that often most people don’t have a grasp of their own real needs...'),
    ),
    content(
      picture(require('./2/ford.jpg')),
      text('Henry Ford said:\n“If I had asked people what they wanted, they would have said "faster horses"”.'),
    ),
    content(
      picture(require('./2/hmw.jpg')),
      text('In order to properly define the problem, you can formulate the question "How might we...?"'),
    ),
    content(
      picture(require('./2/singe.jpg')),
      text('These short questions will allow you to think about solutions. They will be a basis for work at the ideation stage.'),
    ),
    content(
      picture(require('./2/nounours.jpg')),
      text('Be careful, however, not all problems can be solved at the same time.'),
    ),
    content(
      picture(require('./2/chess.jpg')),
      text('As a UX Designer, you will also need to learn how to prioritize based on the attitude of your interlocutors, not just what they say or think.'),
    ),
  ],
  exercise: {
    metatype: 'exercise',
    metavalue: {
      title: 'Identify the problem by proposing several How Might We.',
      explanations: '',
      hints: 'E.g.: How might we reduce the impact of wild deposits in the city? How might we bring a new pedagogy to the neighbourhood?',
      response: 'text',
    },
  },
}
//         {
//           metatype: "exercise",
//           metavalue: {
//               title: "Problem Statement!",
//               explanations: "Find a problem around you and take picture to justify the existence of this problem!",
//               hints: "E.g.: Wild waste deposits. Although solutions exist, the problem persists. (need to include a picture)",
//               response: "pictures",
//           },
//         },
//         {
//           metatype: "exercise",
//           metavalue: {
//               title: "How might we…?",
//               explanations: "Find a problem around you and take picture to justify the existence of this problem!",
//               hints: "E.g.: Wild waste deposits. Although solutions exist, the problem persists. (need to include a picture)",
//               response: "text",
//           },
//         },
//         {
//           metatype: "exercise",
//           metavalue: {
//               title: "Competitor analysis",
//               explanations: "Find a problem around you and take picture to justify the existence of this problem!",
//               hints: "E.g.: Wild waste deposits. Although solutions exist, the problem persists. (need to include a picture)",
//               response: "links",
//               numberOfLinks: 3,
//           },
//         },
//         {
//           metatype: "exercise",
//           metavalue: {
//               title: "Ideation",
//               explanations: "Find a problem around you and take picture to justify the existence of this problem!",
//               hints: "E.g.: Wild waste deposits. Although solutions exist, the problem persists. (need to include a picture)",
//               response: "pictures",
//               timer: 480000,
//           },
//         },
//       ],
