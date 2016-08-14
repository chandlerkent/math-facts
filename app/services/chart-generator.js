import Ember from 'ember';

export default Ember.Service.extend({
  createChartForInterviewAndResults(interview, results) {
    let operation = interview.get('operator');

    let chart = [];

    let rhsRange = this.getRhsRangeForOperation(operation);
    let lhsRange = this.getLhsRangeForOperation(operation);
    for (let rhs = rhsRange[0]; rhs <= rhsRange[1]; rhs++) {
      let row = [];
      for (let lhs = lhsRange[0]; lhs <= lhsRange[1]; lhs++) {
        let prompt = this.createPromptForOperation(operation, lhs, rhs).join(' ');
        let printablePrompt = prompt;
        if (operation === '/') {
          let apart = prompt.split(' ');
          apart[1] = '&divide;';
          printablePrompt = Ember.String.htmlSafe(apart.join(' '));
        }
        let questionIndex = this.indexOfQuestionByPrompt(interview, prompt);
        if (questionIndex < 0) {
          row.push(Ember.Object.create({ prompt: printablePrompt, hasAnswer: false }));
          continue;
        }

        let answer = results.get('answers').objectAt(questionIndex);
        let isCorrect = answer ? answer.get('isCorrect') : false;
        let isWrong = answer ? answer.get('isWrong') : false;
        let isOverTime = answer ? answer.get('isOverTime') : false;
        let response = answer && answer.get('answer');

        row.push(Ember.Object.create({
          hasAnswer: !!response,
          prompt: printablePrompt,
          isCorrect,
          isWrong,
          isOverTime,
          isWrongOrOverTime: isWrong || isOverTime,
          response
        }));
      }
      chart.push(row);
    }

    return chart;
  },

  getLhsRangeForOperation(/* operation */) {
    return [0, 10];
  },

  getRhsRangeForOperation(operation) {
    if (operation === '/') {
      return [1, 10];
    }

    return [0, 10];
  },

  createPromptForOperation(operation, lhs, rhs) {
    switch (operation) {
      case '+':
      case 'x':
        return [lhs, operation, rhs];
      case '-':
        return [lhs + rhs, operation, rhs];
      case '/':
        if (lhs === 0) {
          return [rhs, operation, lhs];
        }
        return [lhs * rhs, operation, rhs];
    }

    return [];
  },

  indexOfQuestionByPrompt(interview, prompt) {
    for (let i = 0; i < interview.get('questions.length'); i++) {
      let question = interview.get('questions').objectAt(i);
      if (question.get('prompt') === prompt) {
        return i;
      }
    }

    return -1;
  }
});
