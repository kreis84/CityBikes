angular.module('git')

.controller('mainController', function($scope, bikesFactory, helperFactory)
{
	$scope.data = [];
	$scope.countries = [];
	$scope.byCountrySelect = false;
	$scope.selectedCountry = '';
	$scope.showCompanyList = '';

	$scope.$watch('selectedCountry', function(){ 
		if($scope.selectedCountry !== '') 
			{
				$scope.byCountrySelect = true;
				$scope.showCompanyList = true;				
			}
	});

	bikesFactory.bikes()
	.then(
		function(response)
		{
			$scope.data = response.data.networks;
			$scope.countries = helperFactory.getCountries($scope.data);
		},
		function(error)
		{

		});
	$scope.elementClick = function(arg)
	{
		console.log(arg.item.location.city);
	}
});
