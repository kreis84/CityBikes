angular.module('git')

.controller('mainController', function($scope, bikeFactory)
{
	bikeFactory.bikes()
	.then(
		function(response)
		{
			console.log(response);
		},
		function(error)
		{

		});
});
