'use strict';

angular.module('questionsApp')
.factory('Question', ['$resource', function Question($resource) {
	var Question = $resource('https://api.mongolab.com/api/1/databases/question/collections/questions/:id',
		{ apiKey: '50983e52e4b0200e9ba50a55'
		},
		{
			update: { method: 'PUT'}
		}
	);

	Question.prototype.update = function(cb) {
		return Question.update({id: this._id.$oid},
			angular.extend({}, this, {_id:undefined}), cb);
	};

	Question.prototype.destroy = function(cb) {
    return Question.remove({id: this._id.$oid}, cb);
  };
  
	return Question;
}]);
