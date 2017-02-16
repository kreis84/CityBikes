angular.module('git')

.controller('mainController', function($scope, bikesFactory, helperFactory)
{
	$scope.data = [];
	$scope.countries = [];
	$scope.cities = [];
	$scope.byCountrySelect = false;
	$scope.selectedCountry = '';
	$scope.selectedCity = '';
	$scope.showCompanyList = '';

	$scope.$watch('selectedCountry', function(){ 
		if($scope.selectedCountry !== '') 
			{
				$scope.byCountrySelect = true;
				$scope.showCompanyList = true;				
				$scope.cities = helperFactory.getCities($scope.data, $scope.selectedCountry);
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
