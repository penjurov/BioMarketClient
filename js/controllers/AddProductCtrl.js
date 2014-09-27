'use strict';

app.controller('AddProductCtrl', ['$scope', '$location', 'bioFarm', 'notifier',
    function AddProductCtrl($scope, $location, bioFarm, notifier) {
        $scope.addProduct = function(product) {
            bioFarm
                .addProduct(product)
                .then(function() {
                    notifier.success('Added successful!');
                    $location.path('/');
                })
        }
    }]);
