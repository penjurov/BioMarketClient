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

        $scope.deleteFarm = function(farm) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .deleteFarm(farm)
                    .then(function () {
                        auth.logout().then(function () {
                            notifier.success('Close successful!');
                            if ($scope.user) {
                                $scope.user.email = '';
                                $scope.user.username = '';
                                $scope.user.password = '';
                            }

                            $location.path('/');
                        }, function (err) {
                            notifier.error(err.Message);
                        })
                    }, function (err) {
                        notifier.error(err.Message);
                    });
            }
        };
    }]);

