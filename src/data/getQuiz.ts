import { Quiz } from "./quizdb.types";

export const quizzesDB: Quiz[] = [
  {
    quizName: "Indian Space Program",
    _id: "1",
    categoryId: { _id: "11", name: "ISRO" },
    highScore: [
      {
        id: "2000",
        userId: { username: "Madhushree" },
        score: 20,
      },
    ],

    questions: [
      {
        question:
          'Who is known as the "Founding Father" of the Indian Space Programme?',
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "A.P.J. Abdul Kalam",
            isRight: false,
          },
          {
            text: "Vikram Sarabhai",
            isRight: true,
          },
          {
            text: "Homi J. Bhabha",
            isRight: false,
          },
          {
            text: "Satish Dhawan",
            isRight: false,
          },
        ],
      },
      {
        question:
          "India's first sounding rocket was launched from which place?",
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "Thumba, Kerala",
            isRight: true,
          },
          {
            text: "Sriharikota, Andhra Pradesh",
            isRight: false,
          },
          {
            text: "Bhadrak, Odisha",
            isRight: false,
          },
          {
            text: "Jhelum District, Punjab",
            isRight: false,
          },
        ],
      },
      {
        question: "In what programme did Homi Jahangir Bhabha contribute?",
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "India's Education Programme",
            isRight: false,
          },
          {
            text: "India's Agriculture Programme",
            isRight: false,
          },
          {
            text: "India's Literature Programme",
            isRight: false,
          },
          {
            text: "India's Nuclear Programme",
            isRight: true,
          },
        ],
      },
      {
        question:
          "Which satellite is used for resources monitoring and management by ISRO?",
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "IRIS",
            isRight: false,
          },
          {
            text: "IRS",
            isRight: true,
          },
          {
            text: "INSAT",
            isRight: false,
          },
          {
            text: "None of the above",
            isRight: false,
          },
        ],
      },
      {
        question:
          "What is the name of the humanoid robot, which was unveiled by ISRO in 2020?",
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "Vayumitra",
            isRight: false,
          },
          {
            text: "Gaganmitra",
            isRight: false,
          },
          {
            text: "Vyommitra",
            isRight: true,
          },
          {
            text: "None of the above",
            isRight: false,
          },
        ],
      },
    ],
  },

  {
    quizName: "Space and Stars",
    _id: "2",
    categoryId: { _id: "12", name: "Outer Space" },
    highScore: [
      {
        id: "2001",
        userId: { username: "Natasha" },
        score: 20,
      },
    ],

    questions: [
      {
        question:
          "What is a region of space time where gravity is so strong that not even light can escape from it?",
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "White hole",
            isRight: false,
          },
          {
            text: "Supernova",
            isRight: false,
          },
          {
            text: "Worm hole",
            isRight: false,
          },
          {
            text: "Black hole",
            isRight: true,
          },
        ],
      },
      {
        question: "Which star other than the Sun is the closest to the Earth?",
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "Proxima Centauri b",
            isRight: false,
          },
          {
            text: "Alpha Centauri",
            isRight: false,
          },
          {
            text: "Proxima Centauri",
            isRight: true,
          },
          {
            text: "Alpha Centauri A",
            isRight: false,
          },
        ],
      },
      {
        question: "In the life of a star,at what element does the fusion stop?",
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "Iron",
            isRight: true,
          },
          {
            text: "Silicon",
            isRight: false,
          },
          {
            text: "Oxygen",
            isRight: false,
          },
          {
            text: "Carbon",
            isRight: false,
          },
        ],
      },

      {
        question:
          "What is the name of the thermal radiation emitted outside a black hole's event horizon?",
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "Hawking Radiation",
            isRight: true,
          },
          {
            text: "Gamma Radiation",
            isRight: false,
          },
          {
            text: "Alpha Radiation",
            isRight: false,
          },
          {
            text: "Neutron Radiation",
            isRight: false,
          },
        ],
      },

      {
        question:
          "Which space telescope launched in 1990, have scientists used to explore the universe(most distant stars, galaxies and planets in our solar system)?",
        points: 5,
        negativePoints: 2,
        options: [
          {
            text: "James Webb Space Telescope",
            isRight: false,
          },
          {
            text: "Nancy Grace Roman Space Telescope",
            isRight: false,
          },
          {
            text: "Hubble Space Telescope",
            isRight: true,
          },
          {
            text: "AstroSat-2",
            isRight: false,
          },
        ],
      },
    ],
  },
];
