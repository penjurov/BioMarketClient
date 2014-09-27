'use strict';

app.controller('AddProductCtrl', ['$scope', '$location', 'bioFarm', 'notifier', 'identity',
    function AddProductCtrl($scope, $location, bioFarm, notifier, identity) {
        if (identity.getCurrentUser() === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.addProduct = function(product) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .addProduct(product)
                    .then(function () {
                        notifier.success('Added successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    })
            }
        }
    }]);
