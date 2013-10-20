'use strict';

angular.module('questionsApp')
  .controller('MainCtrl', function ($scope, $filter, Question) {    
    $scope.dropdown = "";
    $scope.selectedAdd = false;
    $scope.selectedAbout = false;
    $scope.selectedQuestion = true;
    $scope.readQuestions = [];
    $scope.filteredQuestions = [];
    $scope.category = "Light";
    $scope.questions = Question.query({q: '{"approved": true}'}, function() {
        var i = $scope.questions.length - 1;
        $scope.mainQuestion = $scope.questions[i];
        $scope.readQuestions.push($scope.mainQuestion);
        $scope.filteredQuestions = angular.copy($scope.questions);
        $scope.filteredQuestions.splice(i, 1);
    });
     
    function randomize() {
    	if ($scope.filteredQuestions.length === 0) {
    		alert("no more questions");
    	} else {
			var randomIndex = Math.floor(Math.random() * $scope.filteredQuestions.length);
	    	$scope.mainQuestion = $scope.filteredQuestions[randomIndex];
		    $scope.readQuestions.push($scope.mainQuestion);
		    $scope.filteredQuestions.splice(randomIndex, 1);
		}
    };

    function resetQuestions() {
        $scope.readQuestions = [];
        var i = $scope.filteredQuestions.length - 1;
        $scope.mainQuestion = $scope.filteredQuestions[i];
        $scope.readQuestions.push($scope.mainQuestion);
        $scope.filteredQuestions.splice(i, 1);
    }

    $scope.changeDropdown = function() {
        if ($scope.dropdown === "Add") {
          $scope.selectedAdd = true;
          $scope.selectedAbout = false;
          $scope.selectedQuestion = false;
        } else if ($scope.dropdown === 'About') {
          $scope.selectedAdd = false;
          $scope.selectedAbout = true;
          $scope.selectedQuestion = false;
        } else if ($scope.dropdown === 'Light' || 
          $scope.dropdown === 'Deep' ||
          $scope.dropdown === 'Faith') {
          var categoryFilter = {"category": $scope.dropdown};
          $scope.filteredQuestions = $filter('filter')($scope.questions, categoryFilter);
          resetQuestions();
          $scope.selectedAdd = false;
          $scope.selectedAbout = false;
          $scope.selectedQuestion = true;
        } else {
          // TODO: reset to questions
          /*
          $scope.filteredQuestions = $filter('filter')($scope.questions, '');
          resetQuestions();
          $scope.selectedAdd = false;
          $scope.selectedAbout = false;
          $scope.selectedQuestion = true;
          */
          location.reload();
        }
    };

    $scope.nextQuestion = function() {
    	var index = $scope.readQuestions.indexOf($scope.mainQuestion);
    	if (index === $scope.readQuestions.length - 1) {
    		//add random question
    		randomize();
    	} else {
        //show next question 
    		$scope.mainQuestion = $scope.readQuestions[++index];
    	}

    }

    $scope.prevQuestion = function() {
    	var index = $scope.readQuestions.indexOf($scope.mainQuestion);
    	if (index === 0) {
    		alert("no more previous question.");
    	} else {
    		$scope.mainQuestion = $scope.readQuestions[--index];
    	}
    };
    
    $scope.submitQuestion = function() {
      var newQuestion = {
        question: $scope.question,
        category: $scope.category,
        approved: false,
        popularity: 1,
        created_at: new Date()
      }

      // save in mongo
      Question.save(newQuestion, function() {
        alert("Thank you for the new question. It's waiting for approval.")
      });

      $scope.question = "";

    };
  });
