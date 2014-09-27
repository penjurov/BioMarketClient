'use strict';

app.controller('EditProductCtrl', ['$scope', '$location', 'bioFarm', 'notifier',
    function EditProductCtrl($scope, $location, bioFarm, notifier) {
        (function populateFarmProfile() {
            bioFarm
                .getAllProducts()
                .then(function(data) {
                    $scope.products = data;
                });
        })();

        $scope.change = function() {
            bioFarm
                .getProductById($scope.selectedProduct)
                .then(function(product) {
                    $scope.product = {
                        Id : product.Id,
                        Name : product.Name,
                        Price : product.Price,
                        FarmId: product.FarmId
                    };
                })
        };

        $scope.editProduct = function() {
            bioFarm
                .editProduct($scope.product)
                .then(function() {
                    notifier.success('Update successful!');
                    $location.path('/');
                })
        };
    }]);
