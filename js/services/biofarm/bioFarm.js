'use strict';

app.factory('bioFarm', ['$http', '$q', '$location', 'identity', 'authorization', 'notifier', 'baseServiceUrl',
    function($http, $q, $location, identity, authorization, notifier, baseServiceUrl) {
        var farmsApi = baseServiceUrl + '/api/Farms/',
            clientsApi = baseServiceUrl + '/api/Clients/',
            productsApi = baseServiceUrl + '/api/Product/';

        return {
            populateClientProfile: function (user) {
                var deferred = $q.defer();

                if (identity.getCurrentUser() === undefined) {
                    notifier.error('Please login!');
                    $location.path('/');
                } else {
                    $http.get(clientsApi + 'ByAccount/' + identity.getCurrentUser()['userName'])
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function (response) {
                            notifier.error(response.Message);
                            $location.path('/');
                        });
                }

                return deferred.promise;
            },
            populateFarmProfile: function (user) {
                var deferred = $q.defer();

                if (identity.getCurrentUser() === undefined) {
                    notifier.error('Please login!');
                    $location.path('/');
                } else {
                    $http.get(farmsApi + 'ByName/' + identity.getCurrentUser()['userName'])
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function (response) {
                            notifier.error(response.Message);
                            $location.path('/');
                        });
                }

                return deferred.promise;
            },
            updateFarm: function(user) {
                var deferred = $q.defer();

                if (identity.getCurrentUser() === undefined) {
                    notifier.error('Please login!');
                    $location.path('/');
                } else {
                    var headers = authorization.getAuthorizationHeader();

                    $http.put(farmsApi + 'Update?name=' + identity.getCurrentUser()['userName'], user, { headers: headers })
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function (response) {
                            notifier.error(response.Message);
                            $location.path('/');
                        });
                }

                return deferred.promise;
            },
            updateClient: function(user) {
                var deferred = $q.defer();

                if (identity.getCurrentUser() === undefined) {
                    notifier.error('Please login!');
                    $location.path('/');
                } else {
                    var headers = authorization.getAuthorizationHeader();

                    $http.put(clientsApi + 'Update?name=' + identity.getCurrentUser()['userName'], user, { headers: headers })
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function (response) {
                            notifier.error(response.Message);
                            $location.path('/');
                        });
                }

                return deferred.promise;
            },
            addProduct: function(product) {
                var deferred = $q.defer();

                if (identity.getCurrentUser() === undefined) {
                    notifier.error('Please login!');
                    $location.path('/');
                } else {
                    var headers = authorization.getAuthorizationHeader();

                    $http.post(productsApi + 'CreateProduct', product, { headers: headers })
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function (response) {
                            notifier.error(response.Message);
                            $location.path('/');
                        });
                }

                return deferred.promise;
            },
            getAllProducts : function() {
                var deferred = $q.defer();


                if (identity.getCurrentUser() === undefined) {
                    notifier.error('Please login!');
                    $location.path('/');
                } else {
                    var headers = authorization.getAuthorizationHeader();

                    $http.get(productsApi + 'All',
                        {
                            transformRequest: function (obj) {
                                var str = [];
                                for (var p in obj)
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'authorization': 'Bearer ' + identity.getCurrentUser()['access_token']
                            }
                        })
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function (response) {
                            notifier.error(response.Message);
                            $location.path('/');
                        });
                }

                return deferred.promise;
            },
            getProductById: function(id) {
                var deferred = $q.defer();

                if (identity.getCurrentUser() === undefined) {
                    notifier.error('Please login!');
                    $location.path('/');
                } else {
                    var headers = authorization.getAuthorizationHeader();
                    $http.get(productsApi + 'ById/' + id,
                        {
                            transformRequest: function (obj) {
                                var str = [];
                                for (var p in obj)
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'authorization': 'Bearer ' + identity.getCurrentUser()['access_token']
                            }
                        })
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function (response) {
                            notifier.error(response.Message);
                            $location.path('/');
                        });
                }

                return deferred.promise;
            },
            editProduct: function(product) {
                var deferred = $q.defer();

                if (identity.getCurrentUser() === undefined) {
                    notifier.error('Please login!');
                    $location.path('/');
                } else {
                    var headers = authorization.getAuthorizationHeader();
                    $http.put(productsApi + 'Update/' + product.Id, product, { headers: headers })
                        .success(function (data) {
                            deferred.resolve(data);
                        })
                        .error(function (response) {
                            notifier.error(response.Message);
                            $location.path('/');
                        });
                }

                return deferred.promise;
            }
        }
}]);

