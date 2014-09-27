'use strict';

app.controller('AddOfferCtrl', ['$scope', '$location', 'bioFarm', 'notifier', 'identity',
    function AddOfferCtrl($scope, $location, bioFarm, notifier, identity) {
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
                $scope.offer = {
                    ProductId: $scope.selectedProduct
                }
            }
        };

        $scope.addOffer = function() {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .addOffer($scope.offer)
                    .then(function () {
                        notifier.success('Added successful!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    })
            }
        };
    }]);

