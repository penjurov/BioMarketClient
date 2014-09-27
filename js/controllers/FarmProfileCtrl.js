'use strict';

app.controller('FarmProfileCtrl', ['$scope', '$location', 'bioFarm', 'notifier',
    function FarmProfileCtrl($scope, $location, bioFarm, notifier) {
        (function populateFarmProfile() {
            bioFarm
                .populateFarmProfile()
                .then(function(data) {
                    $scope.user = data;
                });
        })();

        $scope.updateFarm = function(farm) {
            bioFarm
                .updateFarm(farm)
                .then(function() {
                    notifier.success('Update successful!');
                    $location.path('/');
                })
        }
    }]);

