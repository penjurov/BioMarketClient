'use strict';

app.controller('ClientProfileCtrl', ['$scope', '$location', 'bioFarm', 'notifier', 'auth', 'identity',
    function ClientProfileCtrl($scope, $location, bioFarm, notifier, auth, identity) {
        (function populateClientProfile() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .populateClientProfile()
                    .then(function (data) {
                        $scope.user = data;
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    });
            }
        })();

        $scope.updateClient = function(client) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .updateClient(client)
                    .then(function () {
                        notifier.success('Update successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    })
            }
        };

        $scope.deleteClient = function(client) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .deleteClient(client)
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

