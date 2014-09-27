'use strict';

app.controller('ClientProfileCtrl', ['$scope', '$location', 'bioFarm', 'notifier',
    function ClientProfileCtrl($scope, $location, bioFarm, notifier) {
        (function populateClientProfile() {
            bioFarm
                .populateClientProfile()
                .then(function(data) {
                    $scope.user = data;
                });
        })();

        $scope.updateClient = function(client) {
            bioFarm
                .updateClient(client)
                .then(function() {
                    notifier.success('Update successful!');
                    $location.path('/');
                })
        }
    }]);

