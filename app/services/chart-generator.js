import Ember from 'ember';

let Cell = Ember.Object.extend({
  prompt: '',
  hasAnswer: false,
  shouldShow: false,

  isInteractive: Ember.computed('hasAnswer', 'shouldShow', function () {
    return this.get('shouldShow') && !this.get('hasAnswer');
  })
});

export default Ember.Service.extend({
  createChartForInterviewAndResults(interview, results) {
    let operation = interview.get('operator');

    let chart = [];

    let rhsRange = this.getRhsRangeForOperation(operation);
    let lhsRange = this.getLhsRangeForOperation(operation);
    for (let rhs = rhsRange[0]; rhs <= rhsRange[1]; rhs++) {
      let row = [];
      for (let lhs = lhsRange[0]; lhs <= lhsRange[1]; lhs++) {
        let shouldShow = this.shouldShow(interview, operation, lhs, rhs);
        let prompt = this.createPromptForOperation(operation, lhs, rhs).join(' ');
        let printablePrompt = prompt;
        if (operation === '/') {
          let apart = prompt.split(' ');
          apart[1] = '&divide;';
          printablePrompt = Ember.String.htmlSafe(apart.join(' '));
        }
        let questionIndex = this.indexOfQuestionByPrompt(interview, prompt);
        if (questionIndex < 0) {
          row.push(Cell.create({ prompt: printablePrompt, shouldShow }));
          continue;
        }

        let answer = results.get('answers').objectAt(questionIndex);
        let isCorrect = answer ? answer.get('isCorrect') : false;
        let isWrong = answer ? answer.get('isWrong') : false;
        let isOverTime = answer ? answer.get('isOverTime') : false;
        let response = answer && answer.get('answer');

        row.push(Cell.create({
          hasAnswer: !!response,
          prompt: printablePrompt,
          isCorrect,
          isWrong,
          isOverTime,
          isWrongOrOverTime: isWrong || isOverTime,
          response,
          shouldShow
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
  },

  shouldShow(interview, operation, lhs, rhs) {
    // Only have a custom chart for addition-c
    if (interview.get('id') !== 'addition-c') { return true; }

    // Always show if one of the numbers is 10, but not both
    if (((rhs === 10) || (lhs === 10)) && (lhs !== rhs)) {
      return true;
    }

    // Otherwise, only show if the sum of the numbers is less than 11
    return ((lhs + rhs) < 11);
  }
});


