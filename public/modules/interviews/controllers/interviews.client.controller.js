'use strict';

// Interviews controller
angular.module('interviews').controller('InterviewsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Interviews',
	function($scope, $stateParams, $location, Authentication, Interviews) {
		$scope.authentication = Authentication;

		Interviews.defaultContent().then(function(content) {
			$scope.content = content;
		});

		// Create new interview
		$scope.create = function() {
			// Create new interview object
			var interview = new Interviews({
				title: this.title,
				content: this.content
			});

			// Redirect after save
			interview.$save(function(response) {
				$location.path('interview/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Interviews
		$scope.remove = function(interview) {
			if (interview) {
				interview.$remove();

				for (var i in $scope.interviews) {
					if ($scope.interviews[i] === interview) {
						$scope.interviews.splice(i, 1);
					}
				}
			} else {
				$scope.interview.$remove(function() {
					$location.path('interviews');
				});
			}
		};

		// Update existing Interviews
		$scope.update = function() {
			var interview = $scope.interview;

			interview.$update(function() {
				$location.path('interviews/' + interview._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of interviews
		$scope.find = function() {
			$scope.interviews = Interviews.query();
		};

		// Find existing interviewx
		$scope.findOne = function() {
			$scope.interview = Interviews.get({
				articleId: $stateParams.interviewId
			});
		};
	}
]);
