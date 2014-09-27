'use strict';

app.controller('AddProductCtrl', ['$scope', '$location', 'bioFarm', 'notifier', 'identity',
    function AddProductCtrl($scope, $location, bioFarm, notifier, identity) {
        if (identity.getCurrentUser() === undefined) {
            notifier.error('Please login!');
            $location.path('/');
        }

        $scope.addProduct = function(product) {
            bioFarm
                .addProduct(product)
                .then(function() {
                    notifier.success('Added successful!');
                    $location.path('/');
                })
        }
    }]);
