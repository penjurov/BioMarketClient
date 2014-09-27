'use strict';

app.controller('EditProductCtrl', ['$scope', '$location', 'bioFarm', 'notifier', 'identity',
    function EditProductCtrl($scope, $location, bioFarm, notifier, identity) {
        (function getProducts() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .getAllProducts()
                    .then(function (data) {
                        $scope.products = data;
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    });
            }
        })();

        $scope.change = function() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .getProductById($scope.selectedProduct)
                    .then(function (product) {
                        $scope.product = {
                            Id: product.Id,
                            Name: product.Name,
                            Price: product.Price,
                            FarmId: product.FarmId
                        };
                    }, function (err) {
                        notifier.error(response.Message);
                        $location.path('/');
                    })
            }
        };

        $scope.editProduct = function() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .editProduct($scope.product)
                    .then(function () {
                        notifier.success('Update successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    })
            }
        };
    }]);
