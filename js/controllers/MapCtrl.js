'use strict';

app.controller('MapCtrl', ['$rootScope', '$scope', '$location', 'bioFarm', 'notifier', 'identity',
    function MapCtrl($rootScope, $scope, $location, bioFarm, notifier, identity) {
        $scope.map = {
            center: {
                latitude: $rootScope.lat,
                longitude:  $rootScope.long
            },
            zoom: 16
        };
    }]);
