let questions = [
  [[1, 5], [3, 5], [6, 4], [8, 3], [9, 4]],
  [[2, 4], [5, 3], [3, 4], [3, 8], [8, 8]],
  [[7, 1], [4, 5], [4, 3], [3, 9], [6, 9]],
  [[3, 0], [8, 5], [4, 6], [4, 7], [7, 7]],
  [[6, 2], [5, 4], [7, 4], [5, 9], [7, 8]],
  [[2, 8], [5, 5], [4, 8], [6, 6], [9, 9]],
  [[7, 2], [5, 7], [3, 3], [4, 9], [8, 9]],
  [[2, 9], [6, 5], [6, 3], [7, 5], [6, 7]],
  [[8, 2], [5, 8], [3, 7], [8, 4], [9, 7]],
  [[0, 6], [4, 4], [7, 3], [8, 7], [8, 6]]
];

let modifiedQuestions = [];

for (let column = 0; column < questions[0].length; column++) {
  for (let row = 0; row < questions.length; row++) {
    let question = questions[row][column];
    modifiedQuestions.push({
      prompt: question[0] + ' x ' + question[1],
      answer: question[0] * question[1],
      column: column + 1
    });
  }
}

export default {
  id: 'multiplication',
  type: 'interview',
  attributes: {
    operator: 'x',
    questions: modifiedQuestions
  }
};