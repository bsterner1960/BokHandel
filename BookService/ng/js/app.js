//app declaration and dependency injection
var app = angular.module("myAppName", ["ngRoute", "ui.bootstrap", "ngResource"]);

//app config
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  //route config
  $routeProvider
    .when("/", {
      templateUrl: "partials/home.html",
      controller: "homeController"
    })
    .when("/add-book", {
        templateUrl: "partials/bookform.html",
        controller: "bookformController"
    })
      .when("/ui-bootstrap",
      {
          templateUrl: "partials/ui-bootstrap.html",
          controller: "uiController"
      })
      .when("/navbar",
      {
          templateUrl: "partials/navbar.html"
      })
      .when("/NewAuthorModal",
      {
          templateUrl: "partials/NewAuthorModal.html"
      })
      .when("/genredetails/:id?",
      {
          templateUrl: "partials/genredetails.html",
          controller: "genreController",

      })
      .when("/bookList",
      {
          templateUrl: "partials/bookList.html",
          controller: "bookListController"
      })
      .when("/cookie",
      {
          templateUrl: "partials/testingListBooksViewController.html"
      })
      .when("/sidebar",
      {
          templateUrl: "partials/sidebarView.html"
      })
    .otherwise({
      redirectTo: "/"
    });
    // Cookies
  //$locationProvider.html5Mode(true);
}]);