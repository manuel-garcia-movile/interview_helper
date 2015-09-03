'use strict';

(function() {
	// Interviews Controller Spec
	describe('Interviews Controller Tests', function() {
		// Initialize global variables
		var InterviewsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Interviews controller.
			InterviewsController = $controller('InterviewsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one interview object fetched from XHR', inject(function(Interviews) {
			// Create sample interview using the Interviews service
			var sampleInterview = new Interviews({
				title: 'An Interview about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample interviews array that includes the new interview
			var sampleInterviews = [sampleInterview];

			// Set GET response
			$httpBackend.expectGET('interviews').respond(sampleInterviews);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.interviews).toEqualData(sampleInterviews);
		}));

		it('$scope.findOne() should create an array with one interview object fetched from XHR using a interviewId URL parameter', inject(function(Interviews) {
			// Define a sample interview object
			var sampleInterview = new Interviews({
				title: 'An Interview about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.interviewId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/interviews\/([0-9a-fA-F]{24})$/).respond(sampleInterview);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.interview).toEqualData(sampleInterview);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Interviews) {
			// Create a sample interview object
			var sampleInterviewPostData = new Interviews({
				title: 'An Interview about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample interview response
			var sampleInterviewResponse = new Interviews({
				_id: '525cf20451979dea2c000001',
				title: 'An Interview about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Interview about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('interviews', sampleInterviewPostData).respond(sampleInterviewResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the interview was created
			expect($location.path()).toBe('/interviews/' + sampleInterviewResponse._id);
		}));

		it('$scope.update() should update a valid interview', inject(function(Interviews) {
			// Define a sample interview put data
			var sampleInterviewPutData = new Interviews({
				_id: '525cf20451979dea2c000001',
				title: 'An Interview about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock interview in scope
			scope.interview = sampleInterviewPutData;

			// Set PUT response
			$httpBackend.expectPUT(/interviews\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/interviews/' + sampleInterviewPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid interviewId and remove the interview from the scope', inject(function(Interviews) {
			// Create new interview object
			var sampleInterview = new Interviews({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new interviews array and include the interview
			scope.interviews = [sampleInterview];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/interviews\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInterview);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.interviews.length).toBe(0);
		}));
	});
}());
