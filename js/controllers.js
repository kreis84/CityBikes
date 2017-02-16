angular.module('git')

.controller('mainController', function($scope, bikesFactory, helperFactory)
{
	$scope.data = [];
	$scope.countries = [];
	bikesFactory.bikes()
	.then(
		function(response)
		{
			$scope.data = response.data.networks;
			countries = helperFactory.getCountries($scope.data));
		},
		function(error)
		{

		});
	$scope.elementClick = function(arg)
	{
		console.log(arg.item.location.city);
	}
});
