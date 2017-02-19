angular.module('git')

.controller('mainController', function($scope, $window, bikesFactory, helperFactory, $element)
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
	$scope.loading = false;

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
		$scope.loading = true;
		$scope.showed = Array($scope.cities).fill(false);
		bikesFactory.stations(url)
		.then(
		function(response)
		{
			$scope.stations = response.data.network.stations;
			$scope.showed[index] = true;
			$scope.loading = false;
		},
		function(error)
		{
			alert('error'+error.statusText);
		});

	};

	$scope.stationSelect = function($event, latitude, longitude)
	{
		$event.stopPropagation();
	//	console.log(latitude +'/'+ longitude);

		$window.map = new google.maps.Map(document.getElementById('map'), {
	        center: {
	            lat: latitude,
	            lng: longitude
	        },
	        zoom: 15
	    });

    	var marker = new google.maps.Marker({
	   		position: {lat: latitude, lng: longitude},
		    map: map,
		    title: 'Hello World!'
  		});
	};

	$scope.mapClick = function($event)
	{
		$event.stopPropagation();
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
