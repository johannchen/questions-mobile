'use strict';

angular.module('questionsApp')
  .controller('AdminCtrl', function ($scope, Question) {
    $scope.header = "Waiting for approval";
    $scope.approved = false;
    $scope.statusFilter = {approved: false};
    $scope.questions = Question.query();

    $scope.filterApproved = function () {
      //toggle
      if ($scope.approved) {
        $scope.statusFilter = {approved: false};        
        $scope.header = "Waiting for approval" 
      } else {
        $scope.statusFilter = {approved: true};
        $scope.header = "Approved"; 
      }
    };

    $scope.deleteQuestion = function(question) {
    	if (confirm("Are you sure to remove this question?")) {
    		question.destroy(function() {
    			var i = $scope.questions.indexOf(question);
    		  $scope.questions.splice(i, 1);	
    		});
    	}
    };

    $scope.approve = function(question) {
      question.approved = true;
      var now = new Date();
      question.created_at = now.toString();
      question.update(function() {
        console.log("approved question");
      });
    };

    $scope.updateQuestion = function(question) {
      var now = new Date();
      question.created_at = now.toString();
      question.update(function() {
          console.log("updated question");
      });
      this.editing = false
    };

    $scope.showEditForm = function() {
        this.editing = true;
    };

    $scope.hideEditForm = function() {
        this.editing = false;
    };

  });
