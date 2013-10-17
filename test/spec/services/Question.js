'use strict';

describe('Service: Question', function () {

  // load the service's module
  beforeEach(module('questionsApp'));

  // instantiate service
  var Question;
  beforeEach(inject(function (_Question_) {
    Question = _Question_;
  }));

  it('should do something', function () {
    expect(!!Question).toBe(true);
  });

});
