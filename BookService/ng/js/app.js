//app declaration and dependency injection
var app = angular.module("myAppName", ["ngRoute", "ui.bootstrap", "ngResource"]);

//Inkluderar vyer (partials) i angular med $routeProvider 
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
      .when("/admin",
      {
          templateUrl: "partials/navbarViewAdmin.html",
          controller: "navbarControllerAdmin"
      })

      .when("/genredetails/:id?",
      {
          templateUrl: "partials/genredetails.html",
          controller: "genreController",
      })
      .when("/bookList",
      {
          templateUrl: "partials/bookList.html",

      })
      .when("/bookdetails/:id?",
      {
          templateUrl: "partials/bookdetails.html",
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