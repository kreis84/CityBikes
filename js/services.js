angular.module('git')

.factory('bikesFactory', function($http)
{
	return{
		bikes: function()
		{
			return $http.get('http://api.citybik.es/v2/networks?fields=id,name,href,location,company');
		}
	}
});
