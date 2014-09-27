'use strict';

app.controller('FarmProfileCtrl', ['$scope', '$location', 'bioFarm', 'notifier', 'identity',
    function FarmProfileCtrl($scope, $location, bioFarm, notifier, identity) {
        (function populateFarmProfile() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .populateFarmProfile()
                    .then(function (data) {
                        $scope.user = data;
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    });
            }
        })();

        $scope.updateFarm = function(farm) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .updateFarm(farm)
                    .then(function () {
                        notifier.success('Update successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    })
            }
        }
    }]);

