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
  id: "course-3",
  data: {
    badge: require('./first/Badge3.png'),
    categories: [
      "Design Thinking"
    ],
    duration: 10,
    numberConcepts: 2,
    picture: require("./3/3.jpg"),
    title: "Benchmarking",
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
  introduction: `In this section, we will discuss benchmarking.\n\nThis part replaces the Prototype step of Design Thniking because it is difficult to afford for an introduction.\n\nBut we can then approach the essential notions when creating a project: business issues.`,
  cards: [
    content(
      picture(require('./3/ampoules.jpg')),
      text('You will rarely be innovative; people have often already looked at the problem and sometimes even created solutions.'),
    ),
    content(
      picture(require('./3/happy.jpg')),
      text('Good news a designer is inspired by what has already been done. And its objective is to do better...'),
    ),
    content(
      picture(require('./3/perdu.jpg')),
      text('It is important to research what is being done on your subject or in the realm of that subject.'),
    ),
    content(
      picture(require('./3/babyfoot.jpg')),
      text('The main objective is to know the strengths and weaknesses of your main competitors and thus anticipate the best practices.'),
    ),
    content(
      picture(require('./3/tel.jpg')),
      text('It is necessary to compare and to be inspired, based on what already exists, e.g. what is good or not so good on the market today.'),
    ),
    quizz(
      'Imagine you want to build a luxury smartphone. Where should you look and take inspiration?',
      [ 0, 3 ],
      'Apple iPhone X and Huawei Mate 20 Pro are solid competitors in the smartphone market in 2019! They probably are your source of inspiration. Nokia 3310 is so good and so old. Leave it in the cemetery, it deserves rest. :)',
      'Nokia 3310? BlackBerry Q10? Think about it twice. There’s probably a reason if they are no longer around. ;)',
      questionPicture(require('./third/IPHONE.jpeg'), 'Apple iPhone X'),
      questionPicture(require('./third/NOKIA.jpeg'), 'Nokia 3310'),
      questionPicture(require('./third/BLACKBERRY.jpeg'), 'BlackBerry Q10'),
      questionPicture(require('./third/HUAWEI.jpeg'), 'Huawei Mate 20 Pro'),
    ),
    content(
      picture(require('./3/meufs.jpg')),
      text('The specific approach of UX benchmarking is to pay particular attention to the user experience that your competitors offer.'),
    ),
    content(
      picture(require('./3/tablette.jpg')),
      text('In UX, it is not the product that must be designed but the user experience.'),
    ),
    content(
      picture(require('./3/ux.jpg')),
      text('Otherwise you might create a product that people will not use… no matter how good it is.'),
    ),
    content(
      picture(require('./3/question.jpg')),
      text('Let’s look at an example!'),
    ),
    content(
      picture(require('./3/chargeur.jpg')),
      text('Yes, you’re right, this is a basic computer charger.'),
    ),
    content(
      picture(require('./3/mac.jpg')),
      text('Computer chargers are generally similar. When you see one, you know what it’s for. It has a design specific to its function, it plugs in and you understand how to use it. This is the User Interface (UI).'),
    ),
    content(
      picture(require('./3/magsafe.jpg')),
      text('Then let’s take Apple’s MagSafe charger.'),
    ),
    content(
      picture(require('./3/cable.jpg')),
      text('It always has a familiar design, we know what it is used for… but its usability has been designed to make using the product a new and pleasant experience: this charger has a magnetic tip that hangs easily and protects the computer if the cable is pulled out suddenly. It is called the User Experience (UX).'),
    ),
    content(
      picture(require('./3/piletel.jpg')),
      text('Benchmarking is, therefore, searching for information about other products to better contextualize your problem and control your positioning, while not forgetting to consider the user.'),
    ),
  ],
  exercise: {
    metatype: 'exercise',
    metavalue: {
      title: 'Look for 3 references of solutions already on the market to see what is currently being done.',
      explanations: '',
      hints: 'E.g.: Applications, information sites, books, etc. ',
      response: 'links',
      numberOfLinks: 3,
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
