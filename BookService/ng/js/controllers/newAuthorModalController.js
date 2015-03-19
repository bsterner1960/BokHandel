app.controller("newAuthorModalController", ["$scope", "Authors", "$modalInstance", function ($scope, Authors, $modalInstance) {

    $scope.authorError = false;

    console.log("Skapa författare controllern är igång! routeParams är nu: ");

    $scope.newAuthor = {};

    // klickevent Skapa
     $scope.Skapa = function (authorname) {

        if   ($scope.newAuthor.Name)  {


            Authors.create($scope.newAuthor, 
                function(data){
                    //for successful calls
                    $modalInstance.close(data);
                }, 
                function () {
                    //for unsuccessful calls
                    console.log("Fel vid skapa författare. ");
                    $scope.alert = { type: 'danger', msg: 'Fel vid create Författare' };
                    $scope.authorError = true;

                }
                );

        }
    }

    // klickevent Avbryt
     $scope.Avbryt = function () {
         $modalInstance.close();

     };
}]);