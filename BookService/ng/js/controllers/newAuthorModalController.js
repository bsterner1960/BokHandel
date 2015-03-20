app.controller("newAuthorModalController", ["$scope", "Authors", "$modalInstance", function ($scope, Authors, $modalInstance) {

    $scope.authorError = false;

    console.log("Create författare controllern är igång! routeParams är nu: ");

    $scope.newAuthor = {};

    // klickevent Create
     $scope.Create = function (authorname) {

        if   ($scope.newAuthor.Name)  {


            Authors.create($scope.newAuthor, 
                function(data){
                    //for successful calls
                    $modalInstance.close(data);
                }, 
                function () {
                    //for unsuccessful calls
                    console.log("Fel vid Create författare. ");
                    $scope.alert = { type: 'danger', msg: 'Fel vid create Författare' };
                    $scope.authorError = true;

                }
                );

        }
    }

    // klickevent Cancel
     $scope.Cancel = function () {
         $modalInstance.close();

     };
}]);