let questions = [
  [
    [4, 2],
    [40, 5],
    [21, 3],
    [56, 7],
    [36, 9],
  ],
  [
    [10, 2],
    [15, 5],
    [32, 4],
    [35, 7],
    [48, 8],
  ],
  [
    [20, 4],
    [30, 5],
    [27, 3],
    [27, 9],
    [42, 7],
  ],
  [
    [14, 2],
    [45, 5],
    [24, 3],
    [54, 6],
    [64, 8],
  ],
  [
    [25, 5],
    [12, 3],
    [36, 4],
    [36, 6],
    [72, 8],
  ],
  [
    [18, 2],
    [16, 4],
    [30, 6],
    [40, 8],
    [63, 9],
  ],
  [
    [5, 5],
    [24, 4],
    [18, 6],
    [56, 8],
    [63, 7],
  ],
  [
    [16, 2],
    [18, 3],
    [28, 7],
    [49, 7],
    [81, 9],
  ],
  [
    [12, 6],
    [9, 3],
    [32, 8],
    [42, 6],
    [48, 6],
  ],
  [
    [35, 5],
    [28, 4],
    [21, 7],
    [45, 9],
    [54, 9],
  ],
];

let modifiedQuestions = [];

for (let column = 0; column < questions[0].length; column++) {
  for (let row = 0; row < questions.length; row++) {
    let question = questions[row][column];
    modifiedQuestions.push({
      prompt: question[0] + ' / ' + question[1],
      answer: question[0] / question[1],
      column: column + 1,
    });
  }
}

export default {
  id: 'division',
  type: 'interview',
  attributes: {
    operator: '/',
    questions: modifiedQuestions,
  },
};
