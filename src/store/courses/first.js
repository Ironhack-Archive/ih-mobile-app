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
  id: "course-1",
  data: {
    badge: require('./first/Badge1.png'),
    categories: [
      "Design Thinking"
    ],
    duration: 10,
    numberConcepts: 2,
    picture: require("./1/1.jpg"),
    title: "Empathize & Identify the Problem",
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
  introduction: `Design thinking is a way of thinking, a human-centred approach.\n\nA method has been defined based on these values to solve all kinds of problems.\n\nThe UX methodology can be divided into 5 steps, the first one is Empathize.`,
  cards: [
    content(
      picture(require('./first/1.png')),
      text('A designer must learn to be empathetic. It means that they design for people, also known as \'users\' because they will use your product or service.'),
    ),
    content(
      picture(require('./first/2.png')),
      text('Their first step is to identify a problem and then think about the solution based on the users’ needs.'),
    ),
    content(
      picture(require('./1/cubes.jpg')),
      text('Identifying a problem and users’ needs involves opening up to the world around you, looking at everything surrounding you with a different perspective, being attentive and starting to question things.'),
    ),
    content(
      picture(require('./1/rue.jpg')),
      text('To help you identify a problem, start with what is around you.'),
    ),
    content(
      picture(require('./1/smarties.jpg')),
      text('· What things are not working?\n· What is it that causes you problems in your daily life?\n· What’s complicated to do?'),
    ),
    content(
      picture(require('./1/cahier.jpg')),
      text('This is an opportunity to think about areas for improvement.'),
    ),
    quizz(
      'Superheroes are great, but people get bored by so many superhero movies. How would you identify the underlying problem?',
      [ 0, 1, 3 ],
      'You’re super-strong! Meeting super-fans, talking with super-people and watching super-movies will quickly make you a super-designer !',
      'We love dinosaurs too. Unfortunately, they don’t like Marvel or DC. Yeah, we agree, they don’t know good movies...',
      questionPicture(require('./first/popcorn.jpg'), 'Go to cinema and watch superheroes movies'),
      questionPicture(require('./first/talk.jpeg'), 'Talk with people at a cinema'),
      questionPicture(require('./first/dino.jpeg'), 'Paint a colorful dinosaur'),
      questionPicture(require('./first/tee-shirt.jpeg'), 'Meet with all those incredible superheroes fans'),
    ),
    content(
      picture(require('./1/interrogation.jpg')),
      text('But how can you determine when a problem is a design problem?'),
    ),
    content(
      picture(require('./1/puzzle.jpg')),
      text('A design problem is a problem shared by several users, but to which there is no perfectly adapted solution at the moment.'),
    ),
    content(
      picture(require('./1/rubikscube.jpg')),
      text('Therefore, it is crucial to clearly describe the problem in order to provide the most appropriate solution possible.'),
    ),
    content(
      picture(require('./first/3.png')),
      text('Albert Einstein once said:\n\n“If I had an hour to solve a problem, I would spend fifty-five minutes defining the problem and only five minutes finding the solution.”'),
    ),
    content(
      picture(require('./1/jumelle.jpg')),
      text('You must do the same: analyze the context of the problem you are trying to solve!'),
    ),
    content(
      picture(require('./1/bonhommes.jpg')),
      text('· Whose problem is this?\n· Why is that a problem for them?\n· The context of the problem: where and when?\n· What are the causes?\n· What are the benefits of solving this problem?'),
    ),
  ],
  exercise: {
    metatype: 'exercise',
    metavalue: {
      title: 'Find a problem around you and take picture to justify the existence of this problem!',
      explanations: '',
      hints: 'E.g.: Wild waste deposits. Although solutions exist, the problem persists. (need to include a picture)',
      response: 'pictures',
    }
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
