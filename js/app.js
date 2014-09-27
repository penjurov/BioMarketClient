'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/register-client', {
                templateUrl: 'views/partials/register-client.html',
                controller: 'SignUpCtrl'
            })
            .when('/register-farm', {
                templateUrl: 'views/partials/register-farm.html',
                controller: 'SignUpCtrl'
            })
            .when('/profile-farm', {
                templateUrl: 'views/partials/profile-farm.html',
                controller: 'FarmProfileCtrl'
            })
            .when('/profile-client', {
                templateUrl: 'views/partials/profile-client.html',
                controller: 'ClientProfileCtrl'
            })
            .when('/add-product', {
                templateUrl: 'views/partials/add-product.html',
                controller: 'AddProductCtrl'
            })
            .when('/edit-product', {
                templateUrl: 'views/partials/edit-product.html',
                controller: 'EditProductCtrl'
            })
            .when('/add-offer', {
                templateUrl: 'views/partials/add-offer.html',
                controller: 'AddOfferCtrl'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .value('toastr', toastr)
    //.constant('baseServiceUrl', 'http://localhost:6022');
    .constant('baseServiceUrl', 'http://biomarketserver.apphb.com');
