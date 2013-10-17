'use strict';

angular.module('questionsApp')
.factory('Question', function Question($resource) {
  	return $resource('https://api.mongolab.com/api/1/databases/question/collections/questions/:id',
		{ apiKey: '50983e52e4b0200e9ba50a55'
   		}
  	);
  });
