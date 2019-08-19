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
  id: "course-5",
  data: {
    badge: require('./first/Badge5.png'),
    categories: [
      "Design Thinking"
    ],
    duration: 10,
    numberConcepts: 2,
    picture: require("./5/5.jpg"),
    title: "Tests of ideas",
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
  introduction: `The Test part will allow you to understand an important phase: interactions with your users.\n\nThe notion of discussion and listening to learn from people is essential and intersects with the Empathize part.\n\nThe design thinking method can then start again to improve what you have started to do.`,
  cards: [
    content(
      picture(require('./5/flechette.jpg')),
      text('Remember throughout the design process, you need to keep users at the center of your thinking!'),
    ),
    content(
      picture(require('./5/portable.jpg')),
      text('Therefore, it is important that the decision does not come from the designer but directly from the users.'),
    ),
    content(
      picture(require('./5/coffee.jpg')),
      text('That is why, presenting several cases, several ideas, allows you to have different opinions in order to compare and balance results based on your insight.'),
    ),
    content(
      picture(require('./5/interview.jpg')),
      text('Having people in front of you testing your solutions gives you a privileged moment to analyze their behavior towards the product.'),
    ),
    content(
      picture(require('./5/foret.jpg')),
      text('You are then able to eliminate options that do not work and improve those that get the best feedback.'),
    ),
    quizz(
      'When is the best moment during a project to ask your users for feedback about your design?',
      [ 1, 2, 3 ],
      'Well done! Users are key, consult them often as possible to be sure you’re designing an accurate project, consistent with the needs of your users.',
      `Oh well, the right answer was all the time, your user is king! Asking feedback from your user throughout the project is really important.
Think about making a tailored suit: the tailor takes the client’s size during a first meeting, then the client tries out the suit through the design process, and finally, also tries it on when it’s done, to be sure it fits perfectly!`,
      questionPicture(require('./fifth/BEGIN.jpeg'), 'At the beginning, better to prevent than heal!'),
      questionPicture(require('./fifth/MIDDLE.jpeg'), 'Midway through your work, to be sure you’re heading in the right direction'),
      questionPicture(require('./fifth/END.jpeg'), 'In the end, to be sure your smooth design is accurate'),
      questionPicture(require('./fifth/KING.jpeg'), 'All the time, the user is king!'),
    ),
    content(
      picture(require('./5/vr.jpg')),
      text('Designing digital solutions gives you the chance to easily iterate and change details, even at the later stages of the process.'),
    ),
    content(
      picture(require('./5/cours5.jpg')),
      text('You will constantly be testing with users at several stages of the design process. These tests allow you to lead your project in a direction that is best suited to the users, while meeting your business goals.'),
    ),
    content(
      picture(require('./5/work.jpg')),
      text('The first step to becoming a good designer is being a good observer, listener, and communicator.'),
    ),
    content(
      picture(require('./5/lentille.jpg')),
      text('But it is still important to be able to step back on insights.'),
    ),
    content(
      picture(require('./5/carnet.jpg')),
      text('It is your role to dig deeper and ask follow-up questions to your users.'),
    ),
    content(
      picture(require('./5/punaise.jpg')),
      text('Finally, when the product is validated, it is time to launch the interface design!'),
    ),
    content(
      picture(require('./5/lowfi.jpg')),
      text('However, your work will not stop there: more tests can be carried out with a prototype.'),
    ),
  ],
  exercise: {
    metatype: 'exercise',
    metavalue: {
      title: 'Present the 3 ideas you have selected to 3 people and let them choose the one they find most relevant. Don’t hesitate to ask them why ;)',
      explanations: '',
      hints: 'E.g.: Making works of art with wild deposits because it would put waste in the spotlight, people would become aware of it.',
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
