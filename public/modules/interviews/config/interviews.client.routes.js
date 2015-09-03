'use strict';

// Setting up route
angular.module('interviews').config(['$stateProvider',
	function($stateProvider) {
		// Interviews state routing
		$stateProvider.
		state('listInterviews', {
			url: '/interviews',
			templateUrl: 'modules/interviews/views/list-interviews.client.view.html'
		}).
		state('createInterview', {
			url: '/interviews/create',
			templateUrl: 'modules/interviews/views/create-interview.client.view.html'
		}).
		state('viewInterview', {
			url: '/interviews/:interviewId',
			templateUrl: 'modules/interviews/views/view-interview.client.view.html'
		}).
		state('editInterview', {
			url: '/interviews/:interviewId/edit',
			templateUrl: 'modules/interviews/views/edit-interview.client.view.html'
		});
	}
]);
