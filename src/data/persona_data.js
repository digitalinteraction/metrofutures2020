export default [
  {
    pId: 5, 
    name: "Mary",
    stages: [
      {id: 0, }
    ],
    questions: [
      {id: 0, text: "", options: "bike", comment: true},
    ]
  },
  {
    pId: 3, 
    name: "Polly",
    stages: [
      {id: 0, videoUrl: "Polly1.mp4", nextId: 1, questionId: 0},
      {id: 1, videoUrl: "Polly2.mp4", nextId: 2, questionId: 1},
      {id: 2, videoUrl: "Polly3.mp4", nextId: 3, questionId: 2},
      {id: 3, videoUrl: "Polly4.mp4", nextId: 4, questionId: 3},
      {id: 4, videoUrl: "Polly5.mp4", nextId: 5, questionId: 4},
      {id: 5, videoUrl: "Polly6.mp4", nextId: null, questionId: null},
    ],
    questions: [
      {id: 0, text: "How well is the multipurpose space indicated?", options: "", comment: true, likert: true},
      {id: 1, text: "Which bike stand is best for where Polly likes to stand? ", options: "bike", comment: true, likert: false},
      {id: 2, text: "How clear is the passenger information screen?", options: "", comment: true, likert: true},
      {id: 3, text: "Which combination of pole and door colours, and floor markings are best for Polly?", options: "colours", comment: true, likert: false},
      {id: 4, text: "How clear are the door light and sound indications?", options: "", comment: true, likert: true},
    ]
  }
]