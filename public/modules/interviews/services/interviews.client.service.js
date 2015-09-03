'use strict';
(function() {
	//Interview service used for communicating with the articles REST endpoints
	var DEFAULT_TEMPLATE_URL = '/modules/interviews/resources/basic-interview-template.txt';

	angular.module('interviews').factory('Interviews', ['$resource', '$http',
		function ($resource, $http) {
			var resource = $resource('articles/:articleId', {
				articleId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});

			resource.defaultContent = function() {
                return $http.get(DEFAULT_TEMPLATE_URL)
					.then(function(response) {
						return response.data;
					});
			};

			return resource;
		}
	]);


})();
