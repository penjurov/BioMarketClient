'use strict';

app.controller('ViewOffersCtrl', ['$rootScope', '$scope', '$location', 'bioFarm', 'notifier', 'identity',
    function ViewOffersCtrl($rootScope, $scope, $location, bioFarm, notifier, identity) {
        (function getOffers() {
            bioFarm
                .getAllOffers()
                .then(function (data) {
                    $scope.offers = data;
                    $scope.numPerPage = 10;
                    $scope.currentPage = 1;
                    $scope.totalItems = data.length;
                    $scope.maxSize = 15;

                    $scope.$watch('currentPage + numPerPage', function() {
                        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                            , end = begin + $scope.numPerPage;

                        $scope.filteredOffers = $scope.offers.slice(begin, end);
                    });
                }, function (err) {
                    notifier.error(err.Message);
                    $location.path('/');
                });
        })();

        $scope.buyProduct = function(id) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                bioFarm
                    .buyProduct(id)
                    .then(function () {
                        notifier.success('You bought the product!');
                        $location.path('/');
                    }, function (err) {
                        notifier.error(err.Message);
                        $location.path('/');
                    })
            }
        };

        $scope.showFarm = function(lat, long) {
            if (identity.getCurrentUser() === undefined) {
                notifier.error('Please login!');
                $location.path('/');
            } else {
                $rootScope.lat = lat;
                $rootScope.long = long;
                $location.path('/map');
            }
        };
    }]);
