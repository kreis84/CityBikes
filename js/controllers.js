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
	$scope.stations = [];
	$scope.showed = [];

	$scope.$watch('selectedCountry', function(){ 
		if($scope.selectedCountry !== '') 
			{
				$scope.selectedCity = '';
				$scope.byCountrySelect = true;
				$scope.showCompanyList = true;				
				$scope.cities = helperFactory.getCities($scope.data, $scope.selectedCountry);
				$scope.showed = Array($scope.cities).fill(false);
			}
	});

	$scope.$watch('selectedCity', function()
	{
		$scope.showed = Array($scope.cities).fill(false);
	});

	$scope.showStations = function(url, index)
	{
		
		$scope.showed = Array($scope.cities).fill(false);
		bikesFactory.stations(url)
		.then(
		function(response)
		{
			$scope.stations = response.data.network.stations;
			$scope.showed[index] = true;
		},
		function(error)
		{

		});
	};

	$scope.stationSelect = function($event,element)
	{
		$event.stopPropagation();
		console.log(element);
	};


	bikesFactory.bikes()
	.then(
		function(response)
		{
			$scope.data = response.data.networks;
			$scope.countries = helperFactory.getCountries($scope.data);
		},
		function(error)
		{
			alert('REQUEST FAILD');
		});
});
