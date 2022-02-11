let questions = [
  [
    [2, 1],
    [8, 6],
    [8, 3],
    [14, 7],
    [16, 8],
  ],
  [
    [4, 3],
    [9, 7],
    [10, 5],
    [11, 7],
    [12, 5],
  ],
  [
    [6, 5],
    [10, 8],
    [10, 4],
    [12, 3],
    [18, 9],
  ],
  [
    [8, 8],
    [6, 3],
    [10, 6],
    [12, 8],
    [16, 9],
  ],
  [
    [9, 8],
    [9, 6],
    [10, 3],
    [13, 5],
    [13, 9],
  ],
  [
    [8, 7],
    [7, 4],
    [12, 6],
    [17, 9],
    [17, 8],
  ],
  [
    [4, 2],
    [8, 5],
    [11, 9],
    [13, 6],
    [14, 9],
  ],
  [
    [5, 3],
    [10, 7],
    [11, 6],
    [12, 4],
    [12, 7],
  ],
  [
    [7, 5],
    [8, 4],
    [11, 5],
    [14, 8],
    [15, 8],
  ],
  [
    [6, 4],
    [9, 4],
    [11, 8],
    [15, 7],
    [16, 7],
  ],
];

let modifiedQuestions = [];

for (let column = 0; column < questions[0].length; column++) {
  for (let row = 0; row < questions.length; row++) {
    let question = questions[row][column];
    modifiedQuestions.push({
      prompt: question[0] + ' - ' + question[1],
      answer: question[0] - question[1],
      column: column + 1,
    });
  }
}

export default {
  id: 'subtraction',
  type: 'interview',
  attributes: {
    operator: '-',
    questions: modifiedQuestions,
  },
};
