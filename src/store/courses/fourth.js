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
  id: "course-4",
  data: {
    badge: require('./first/Badge4.png'),
    categories: [
      "Design Thinking"
    ],
    duration: 10,
    numberConcepts: 2,
    picture: require("./4/4.jpg"),
    title: "Ideation & Generation of ideas",
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
  introduction: `For the Ideate part, it is important to be open-minded.\n\nThe purpose of this part is to allow you to learn how to put yourself in a state that encourages creation.`,
  cards: [
    content(
      picture(require('./4/crayons.jpg')),
      text('The designer’s job is to solve problems with creative solutions.'),
    ),
    content(
      picture(require('./4/dessin.jpg')),
      text('We can foster creativity by using different techniques, called ideation techniques, that encourage divergent thinking.'),
    ),
    content(
      picture(require('./4/bureau.jpg')),
      text('They are used to create ideas that serve the same objective: to differentiate oneself.'),
    ),
    content(
      picture(require('./4/box.jpg')),
      text('To find THE MOST adapted solution for your users, don’t hesitate to think outside the box and never stop at the first idea you have.'),
    ),
    content(
      picture(require('./4/balloon.jpg')),
      text('The goal of ideation is to always think further: no censorship, allow yourself extravagance and humor!'),
    ),
    quizz(
      'Imagine you love Kinder Surprise. How could you improve it?',
      [ 1, 2, 3 ],
      'Those three answers are great! Of course, it’s hard to carry your favorite Kinder anywhere, and they’re probably not suited for adults taste. It’s time to think about these questions and find answers! Well done!',
      'Of course, Kinder Surprise is perfect, nobody’s doubting that. But it can still be improved! One more thing: imagine if Steve Jobs had settled for the iPhone edge, you would not be able to use animoji!',
      questionPicture(require('./fourth/KINDER1.jpeg'), 'Kinder Surprise is perfect. Stop searching for ideas.'),
      questionPicture(require('./fourth/PACKAGING.jpg'), 'Kinder Surprise is not the problem! But it’s hard to take it with you and keep it fresh and in perfect state, why not think of a new packaging?'),
      questionPicture(require('./fourth/TOYS.jpeg'), 'Kinder Surprise is great but they can’t be sold in the US. Maybe change the toy to be able to sell them in the US?'),
      questionPicture(require('./fourth/ADULT.jpg'), 'Kinder Surprise is wonderful but adults don’t buy it. Maybe change the marketing target?'),
    ),
    content(
      picture(require('./4/smarties.jpg')),
      text('The important thing is to produce a volume of alternatives. Here, we focus on quantity and not quality.'),
    ),
    content(
      picture(require('./4/pommes.jpg')),
      text('The goal is to diversify the ideas as much as possible because in the end, it is the users who will choose, via interviews or surveys, etc.'),
    ),
    content(
      picture(require('./4/cours4.jpg')),
      text('Therefore, as a UX designer it is interesting to do these ideation exercises with several people: the ideas are multiplied, and you have the possibility to bounce off others’ ideas, thus creating more new ideas.'),
    ),
    content(
      picture(require('./4/immeuble.jpg')),
      text('Ideation exercises can be very varied in nature.'),
    ),
    content(
      picture(require('./4/postit.jpg')),
      text('Here we will discover the Crazy 8 technique.'),
    ),
    content(
      picture(require('./4/crazy8.jpg')),
      text('Just take a sheet of paper and divide it into 8 sections.'),
    ),
    content(
      picture(require('./4/wireframe.jpg')),
      text('Each section will have an idea. And you will have one minute to write, draw, schematize this idea, and then immediately move on to the next one.'),
    ),
    content(
      picture(require('./4/chrono.jpg')),
      text('Putting time constraints on yourself allows you to push your limits, resulting in new ideas.'),
    ),
  ],
  exercise: {
    metatype: 'exercise',
    metavalue: {
      title: 'Generate 8 ideas in 8 minutes: 1 min, 1 idea! And upload a picture of your work!',
      explanations: '',
      hints: 'E.g.: For wild deposits: satellite image analysis / Neighbourhood whistleblower network / Making works of art out of them...',
      response: 'pictures',
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
