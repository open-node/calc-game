var _ = require('lodash');

var defaults = {
  max: 1000,
  method: 'add',
  length: 3
};

var methods = {
  add: ['+', '-'],
  times: ['x', '÷']
};

var getResults = function(question) {
  var body = question.join('').replace('x', '*').replace('÷', '/');
  var fn = new Function('return ' + body + ';');
  return fn();
};

module.exports = function(opt) {
  var options = _.extend({}, defaults, opt);
  var _methods = methods[options.method];
  var _mLen = _methods.length;
  return function calc() {
    /** 返回 game */
    var question;
    var results = 0;
    var answer = function(value) {
      return +value === results;
    };

    do {
      question = [];
      _.times(options.length, function() {
        question.push(Math.random() * options.max | 0);
        question.push(_methods[Math.random() * _mLen | 0])
      });
      question.pop();
      results = getResults(question);
    } while (results < 0);

    return {
      question: question,
      answer: answer
    }
  };
};
